import { query, queryOne, execute } from '../db';

export interface DiseaseThreshold {
  id: string;
  diseaseName: string;
  casesPerWeek: number;
  description?: string;
  isActive: boolean;
  createdById: string;
  updatedById?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DiseaseThresholdCreateInput {
  diseaseName: string;
  casesPerWeek: number;
  description?: string;
  createdById: string;
}

export interface DiseaseThresholdUpdateInput {
  casesPerWeek?: number;
  description?: string;
  isActive?: boolean;
  updatedById: string;
}

/**
 * Get all active disease thresholds
 * Used by alert-system.ts for outbreak detection
 */
export async function getActiveThresholds(): Promise<DiseaseThreshold[]> {
  const sql = `
    SELECT
      id,
      disease_name as diseaseName,
      cases_per_week as casesPerWeek,
      description,
      is_active as isActive,
      created_by_id as createdById,
      updated_by_id as updatedById,
      created_at as createdAt,
      updated_at as updatedAt
    FROM disease_thresholds
    WHERE is_active = TRUE
    ORDER BY disease_name ASC
  `;

  return query<DiseaseThreshold>(sql);
}

/**
 * Get all disease thresholds (including inactive)
 * Used by admin UI
 */
export async function getAllThresholds(): Promise<DiseaseThreshold[]> {
  const sql = `
    SELECT
      id,
      disease_name as diseaseName,
      cases_per_week as casesPerWeek,
      description,
      is_active as isActive,
      created_by_id as createdById,
      updated_by_id as updatedById,
      created_at as createdAt,
      updated_at as updatedAt
    FROM disease_thresholds
    ORDER BY is_active DESC, disease_name ASC
  `;

  return query<DiseaseThreshold>(sql);
}

/**
 * Get a single threshold by disease name
 */
export async function getThresholdByDisease(diseaseName: string): Promise<DiseaseThreshold | null> {
  const sql = `
    SELECT
      id,
      disease_name as diseaseName,
      cases_per_week as casesPerWeek,
      description,
      is_active as isActive,
      created_by_id as createdById,
      updated_by_id as updatedById,
      created_at as createdAt,
      updated_at as updatedAt
    FROM disease_thresholds
    WHERE disease_name = ? AND is_active = TRUE
  `;

  return queryOne<DiseaseThreshold>(sql, [diseaseName]);
}

/**
 * Create a new disease threshold
 */
export async function createThreshold(data: DiseaseThresholdCreateInput): Promise<string> {
  const id = crypto.randomUUID();

  const sql = `
    INSERT INTO disease_thresholds (
      id, disease_name, cases_per_week, description, created_by_id
    ) VALUES (?, ?, ?, ?, ?)
  `;

  await execute(sql, [
    id,
    data.diseaseName,
    data.casesPerWeek,
    data.description || null,
    data.createdById
  ]);

  return id;
}

/**
 * Update an existing disease threshold
 */
export async function updateThreshold(id: string, data: DiseaseThresholdUpdateInput): Promise<void> {
  const updates: string[] = [];
  const params: (string | number | boolean | null)[] = [];

  if (data.casesPerWeek !== undefined) {
    updates.push('cases_per_week = ?');
    params.push(data.casesPerWeek);
  }

  if (data.description !== undefined) {
    updates.push('description = ?');
    params.push(data.description);
  }

  if (data.isActive !== undefined) {
    updates.push('is_active = ?');
    params.push(data.isActive);
  }

  updates.push('updated_by_id = ?');
  params.push(data.updatedById);

  params.push(id);

  const sql = `
    UPDATE disease_thresholds
    SET ${updates.join(', ')}
    WHERE id = ?
  `;

  await execute(sql, params);
}

/**
 * Delete a disease threshold
 */
export async function deleteThreshold(id: string): Promise<void> {
  const sql = 'DELETE FROM disease_thresholds WHERE id = ?';
  await execute(sql, [id]);
}

/**
 * Get list of diseases from medical records (for dropdown in UI)
 */
export async function getExistingDiseases(): Promise<string[]> {
  const sql = `
    SELECT DISTINCT disease_category as disease
    FROM medical_records
    WHERE disease_category IS NOT NULL AND disease_category != ''
    ORDER BY disease_category ASC
  `;

  const results = await query<{ disease: string }>(sql);
  return results.map(r => r.disease);
}

/**
 * Ensures a disease threshold exists, creating a default one if needed
 * Called automatically when a new disease is recorded
 *
 * @param diseaseName - Name of the disease
 * @param createdById - User ID who triggered the creation
 */
export async function ensureThresholdExists(
  diseaseName: string,
  createdById: string
): Promise<void> {
  try {
    // Check if threshold already exists (case-insensitive)
    const existing = await getThresholdByDisease(diseaseName);

    if (existing) {
      // Threshold already configured, nothing to do
      return;
    }

    // Create default threshold with conservative value
    await createThreshold({
      diseaseName: diseaseName.trim(),
      casesPerWeek: 5, // Default: 5 cases per week
      description: `Auto-generated threshold for ${diseaseName}. Please review and adjust as needed.`,
      createdById: createdById
    });

    console.log(`Auto-created threshold for new disease: ${diseaseName} (default: 5 cases/week)`);
  } catch (error: any) {
    // Handle duplicate key error (race condition)
    if (error.code === 'ER_DUP_ENTRY') {
      // Another request just created it, that's fine
      console.log(`Threshold for ${diseaseName} already exists (created by another request)`);
      return;
    }

    // Log other errors but don't block medical record creation
    console.error(`Failed to auto-create threshold for ${diseaseName}:`, error);
    // Don't throw - medical record creation should succeed even if threshold creation fails
  }
}

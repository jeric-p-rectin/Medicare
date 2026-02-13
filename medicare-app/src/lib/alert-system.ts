import { getDiseaseCount } from './queries/statistics';
import { createAlert, outbreakAlertExists } from './queries/alerts';
import { getActiveThresholds } from './queries/disease-thresholds';

/**
 * Outbreak detection thresholds interface (maintains compatibility)
 * When disease cases exceed these thresholds per week, an alert is triggered
 */
export interface OutbreakThreshold {
  disease: string;
  casesPerWeek: number;
}

/**
 * Check if a disease has exceeded the outbreak threshold
 * This function should be called after creating a new medical record
 */
export async function checkOutbreakThreshold(disease: string): Promise<void> {
  // Fetch active thresholds from database
  const thresholds = await getActiveThresholds();

  // Find threshold for this disease (case-insensitive)
  const threshold = thresholds.find(
    (t) => t.diseaseName.toLowerCase() === disease.toLowerCase()
  );

  if (!threshold) {
    // No threshold configured for this disease, skip check
    return;
  }

  // Check if we already created an alert for this disease recently (within 24 hours)
  const alertExists = await outbreakAlertExists(disease, 24);
  if (alertExists) {
    // Don't spam alerts - only create one per disease per 24 hours
    return;
  }

  // Count cases in the past week
  const caseCount = await getDiseaseCount(disease, 7);

  // If threshold exceeded, create an outbreak alert
  if (caseCount >= threshold.casesPerWeek) {
    await createAlert({
      alertType: 'OUTBREAK_SUSPECTED',
      title: `Suspected ${disease} Outbreak`,
      message: `${caseCount} cases of ${disease} detected in the past week (threshold: ${threshold.casesPerWeek}). Immediate attention may be required.`,
      severity: caseCount >= threshold.casesPerWeek * 2 ? 'CRITICAL' : 'HIGH',
      relatedDisease: disease,
    });
  }
}

/**
 * Get all configured outbreak thresholds (for admin configuration UI)
 * Returns in legacy format for backward compatibility
 */
export async function getOutbreakThresholds(): Promise<OutbreakThreshold[]> {
  const thresholds = await getActiveThresholds();

  // Convert to legacy format
  return thresholds.map(t => ({
    disease: t.diseaseName,
    casesPerWeek: t.casesPerWeek
  }));
}

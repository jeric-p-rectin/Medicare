import { getDiseaseCount } from './queries/statistics';
import { createAlert, outbreakAlertExists } from './queries/alerts';

/**
 * Outbreak detection thresholds
 * When disease cases exceed these thresholds per week, an alert is triggered
 */
interface OutbreakThreshold {
  disease: string;
  casesPerWeek: number;
}

const OUTBREAK_THRESHOLDS: OutbreakThreshold[] = [
  { disease: 'Flu', casesPerWeek: 5 },
  { disease: 'Dengue', casesPerWeek: 3 },
  { disease: 'COVID-19', casesPerWeek: 2 },
  { disease: 'Headache', casesPerWeek: 10 },
  { disease: 'Stomach Ache', casesPerWeek: 7 },
  { disease: 'Fever', casesPerWeek: 8 },
  { disease: 'Cough', casesPerWeek: 10 },
  { disease: 'Diarrhea', casesPerWeek: 5 },
];

/**
 * Check if a disease has exceeded the outbreak threshold
 * This function should be called after creating a new medical record
 */
export async function checkOutbreakThreshold(disease: string): Promise<void> {
  // Find threshold for this disease
  const threshold = OUTBREAK_THRESHOLDS.find(
    (t) => t.disease.toLowerCase() === disease.toLowerCase()
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
 */
export function getOutbreakThresholds(): OutbreakThreshold[] {
  return OUTBREAK_THRESHOLDS;
}

// Medical Record type definitions

export type Severity = 'MILD' | 'MODERATE' | 'SEVERE';

export interface MedicalRecord {
  id: string;
  studentId: string;

  // Visit Information
  visitDate: string; // ISO date string
  chiefComplaint: string;
  diagnosis?: string;
  treatment?: string;
  notes?: string;

  // Disease/Illness Categorization
  diseaseCategory?: string;
  illnessType?: string;
  severity: Severity;
  isOutbreakRelated: boolean;

  // System Fields
  recordedById: string;
  recordedByName?: string; // Joined from users table
  createdAt: string;
  updatedAt: string;
}

export interface MedicalRecordCreateInput {
  studentId: string;
  visitDate: Date;
  chiefComplaint: string;
  diagnosis?: string;
  treatment?: string;
  notes?: string;
  diseaseCategory?: string;
  illnessType?: string;
  severity?: Severity;
  recordedById: string;
}

export interface MedicalRecordUpdateInput {
  visitDate?: Date;
  chiefComplaint?: string;
  diagnosis?: string;
  treatment?: string;
  notes?: string;
  diseaseCategory?: string;
  illnessType?: string;
  severity?: Severity;
  isOutbreakRelated?: boolean;
}

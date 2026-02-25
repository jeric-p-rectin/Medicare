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
  diagnosis?: string | null;
  treatment?: string | null;
  notes?: string | null;
  diseaseCategory?: string | null;
  illnessType?: string | null;
  severity?: Severity;
  isOutbreakRelated?: boolean;
}

export interface MedicalRecordWithStudent extends MedicalRecord {
  studentName: string;   // "Dela Cruz, Juan M"
  gradeLevel: string;
  section: string;
}

export interface MedicalRecordListOptions {
  page?: number;
  limit?: number;
  search?: string;
  grade?: string;
  section?: string;
  diseaseCategory?: string;
  severity?: Severity;
  dateFrom?: string;  // YYYY-MM-DD
  dateTo?: string;    // YYYY-MM-DD
}

export interface MedicalRecordListResult {
  records: MedicalRecordWithStudent[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

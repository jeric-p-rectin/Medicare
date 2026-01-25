// Alert type definitions

export type AlertType = 'OUTBREAK_SUSPECTED' | 'DUPLICATE_DETECTED' | 'SYSTEM';
export type AlertSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface Alert {
  id: string;
  alertType: AlertType;
  title: string;
  message: string;
  severity: AlertSeverity;

  // Related Information
  relatedDisease?: string;
  relatedRecordId?: string;
  relatedStudentId?: string;

  // Alert Status
  isRead: boolean;
  isResolved: boolean;
  resolvedById?: string;
  resolutionNotes?: string;

  // Timestamps
  createdAt: string;
  readAt?: string;
  resolvedAt?: string;
}

export interface AlertCreateInput {
  alertType: AlertType;
  title: string;
  message: string;
  severity: AlertSeverity;
  relatedDisease?: string;
  relatedRecordId?: string;
  relatedStudentId?: string;
}

export interface DuplicateDetection {
  id: string;
  studentId1: string;
  studentId2: string;
  similarityScore: number;
  matchingFields: string[]; // Parsed from JSON
  isResolved: boolean;
  resolvedById?: string;
  resolutionAction?: 'MERGED' | 'KEPT_BOTH' | 'DELETED_ONE';
  resolutionNotes?: string;
  detectedAt: string;
  resolvedAt?: string;
}

// Re-export all types
export * from './user';

// Common types
export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type PatientCategory = 'INFANT' | 'MINOR' | 'ADULT' | 'SENIOR' | 'PWD' | 'PREGNANT';

export type StockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'EXPIRED';

export type AppointmentStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';

export type PrescriptionStatus = 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

export type AlertSeverity = 'INFO' | 'WARNING' | 'CRITICAL';

export type TransactionType = 'IN' | 'OUT' | 'ADJUSTMENT' | 'EXPIRED';

export type ItemType = 'MEDICINE' | 'VACCINE';

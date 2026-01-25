// Student/Patient type definitions

export type GradeLevel = '7' | '8' | '9' | '10' | '11' | '12';
export type Sex = 'MALE' | 'FEMALE';

export interface Student {
  id: string;
  userId: string;

  // Student Identification
  lrn: string; // Learner Reference Number
  studentNumber: string;

  // Personal Information
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: string; // ISO date string
  age: number;
  sex: Sex;

  // Academic Information
  gradeLevel: GradeLevel;
  section: string;

  // Contact Information
  address: string;
  parentGuardianName: string;
  parentGuardianContact: string;

  // Medical Information
  bmi?: number;
  healthHistory?: string;

  // System Fields
  createdById: string;
  updatedById?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentCreateInput {
  // User account info
  username: string;
  password: string;
  email?: string;

  // Personal Information
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: Date;
  age: number;
  sex: Sex;

  // Academic Information
  gradeLevel: GradeLevel;
  section: string;

  // Student Identification
  lrn: string;
  studentNumber: string;

  // Contact Information
  address: string;
  parentGuardianName: string;
  parentGuardianContact: string;

  // Medical Information
  bmi?: number;
  healthHistory?: string;

  // System
  createdById: string;
}

export interface StudentUpdateInput {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  dateOfBirth?: Date;
  age?: number;
  sex?: Sex;
  gradeLevel?: GradeLevel;
  section?: string;
  address?: string;
  parentGuardianName?: string;
  parentGuardianContact?: string;
  bmi?: number;
  healthHistory?: string;
  updatedById: string;
}

/**
 * Search options for student queries
 */
export interface StudentSearchOptions {
  /** Page number (minimum: 1, default: 1) */
  page?: number;
  /** Results per page (minimum: 1, maximum: 1000, default: 20) */
  limit?: number;
  /** Search term to filter by name, student number, or LRN */
  search?: string;
  /** Filter by grade level (7-12) */
  grade?: GradeLevel;
  /** Filter by section (e.g., "A", "B", "C", "D") */
  section?: string;
}

export interface StudentListResult {
  students: Student[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Section type definitions

export type SectionCategory = 'SPECIAL_EDUCATION' | 'JUNIOR_HIGH' | 'SENIOR_HIGH';

export interface Section {
  id: string;
  gradeLevel: string; // Can be '7'-'12' or 'Non-Graded'
  alternativeLevel: string | null; // e.g., 'Year I', 'Year II', etc.
  sectionName: string;
  displayName: string; // Title Case display name
  sectionCategory: SectionCategory;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SectionWithCount {
  id: string;
  gradeLevel: string;
  alternativeLevel: string | null;
  sectionName: string;
  displayName: string;
  sectionCategory: SectionCategory;
  studentCount: number;
}

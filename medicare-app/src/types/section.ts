// Section type definitions

import { GradeLevel } from './student';

export interface Section {
  id: string;
  gradeLevel: GradeLevel;
  sectionName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SectionWithCount {
  id: string;
  gradeLevel: GradeLevel;
  sectionName: string;
  studentCount: number;
}

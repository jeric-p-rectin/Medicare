// Statistics type definitions

export type TimePeriod = 'week' | 'month' | 'quarter' | 'year';

export interface DiseaseStats {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface TrendData {
  date: string;
  cases: number;
}

export interface StatisticsData {
  diseaseBreakdown: DiseaseStats[];
  trendData: TrendData[];
  totalCases: number;
  timePeriod: TimePeriod;
}

export interface GradeStats {
  grade: string;
  totalStudents: number;
}

export interface DashboardStats {
  totalStudents: number;
  gradeStats: GradeStats[];
}

export interface GradeLevelStats {
  totalStudents: number;
  sections: {
    sectionName: string;
    studentCount: number;
  }[];
}

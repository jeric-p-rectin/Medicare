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

// --- Disease Trend Types ---

export interface DiseaseMonthlyCount {
  disease: string;
  monthKey: string;   // "2025-01" format from DATE_FORMAT
  count: number;
}

export interface DiseaseTrendEntry {
  disease: string;
  months: { label: string; count: number }[];  // label = "Jan 2025"
  currentCount: number;   // count in the most recent month
  previousCount: number;  // count in the month before that
  percentChange: number | null;  // null when previousCount is 0
}

export interface DiseaseTrendsResponse {
  trends: DiseaseTrendEntry[];
}

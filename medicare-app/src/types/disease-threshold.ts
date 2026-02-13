export interface DiseaseThreshold {
  id: string;
  diseaseName: string;
  casesPerWeek: number;
  description?: string;
  isActive: boolean;
  createdById: string;
  updatedById?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DiseaseThresholdCreateInput {
  diseaseName: string;
  casesPerWeek: number;
  description?: string;
}

export interface DiseaseThresholdUpdateInput {
  casesPerWeek?: number;
  description?: string;
  isActive?: boolean;
}

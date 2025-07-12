export interface ProcedureMetrics {
  id: string;
  name: string;
  averageTime: number; // en jours
  steps: number;
  documents: number;
  administrations: number;
  cost: number; // en DA
  complexityScore: number;
  successRate: number;
  userSatisfaction: number;
  feedbackCount: number;
  trends: {
    timeChange: number;
    satisfactionChange: number;
  };
  description?: string;
  risks?: string[];
  recommendations?: string[];
  aiInsights?: string[];
}

export interface ComplexityLevel {
  level: string;
  color: string;
  bg: string;
}

export interface AverageMetrics {
  time: number;
  steps: number;
  documents: number;
  administrations: number;
  cost: number;
  complexity: number;
  satisfaction: number;
}
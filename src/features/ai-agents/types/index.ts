export interface TrainingPerformanceRecord {
  name: string;
  Accuracy: number;
  Useful: number;
  Time: number;
}

export interface TrainingCategoryRecord {
  name: string;
  value: number;
  color: string;
}

export interface TrainingRecord {
  id: string;
  title: string;
  type: string;
  category: string;
  records: string | number;
  lastUpdated: string;
  status: 'Trained' | 'Training' | 'Syncing';
}

export interface TrainingData {
  trainingPerformanceData: TrainingPerformanceRecord[];
  categoryData: TrainingCategoryRecord[];
  records: TrainingRecord[];
  metrics: {
    totalDocs: string;
    questionsTrained: string;
    aiAccuracy: string;
    responsesGenerated: string;
    avgResponseTime: string;
    usefulResponses: string;
  };
}

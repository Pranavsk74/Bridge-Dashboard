import {
  SensorReading,
  ContextualFeatures,
  Bridge,
  Prediction,
  Report,
  SimulationScenario,
  SystemStatus,
} from '@/models/types';

export interface ISensorProvider {
  getCurrentReading(): SensorReading;
  getContextualFeatures(): ContextualFeatures;
  updateContextualFeatures(overrides: Partial<ContextualFeatures>): ContextualFeatures;
  generateContextualFeatures(): ContextualFeatures;
  getHistoricalReadings(limit?: number): SensorReading[];
  subscribeToReadings(callback: (reading: SensorReading) => void): () => void;
  updateReading(overrides: Partial<SensorReading>): SensorReading;
  loadScenario(scenarioId: string): SensorReading;
  getScenarios(): SimulationScenario[];
}

export interface IMLProvider {
  assessHealth(reading: SensorReading, context?: ContextualFeatures): Promise<Prediction>;
  getModelMetadata(): {
    primaryModel: string;
    task: string;
    target: string;
    featuresCount: number;
    modelsComparison: Array<{
      name: string;
      type: string;
      strength: string;
      role: string;
      accuracy: number;
      rocAuc: number;
      f1Score: number;
      status: string;
    }>;
  };
}

export interface IBridgeProvider {
  getBridgeProfile(): Bridge;
  updateBridgeProfile(updated: Partial<Bridge>): Bridge;
}

export interface IReportProvider {
  generateReport(
    bridge: Bridge,
    prediction: Prediction,
    reading: SensorReading,
    context: ContextualFeatures,
    history: SensorReading[]
  ): Report;
}

export interface IDatabaseProvider {
  saveReading(reading: SensorReading): Promise<boolean>;
  getReadingsHistory(range: string): Promise<SensorReading[]>;
  saveReport(report: Report): Promise<string>;
  getSavedReports(): Promise<Report[]>;
  getSystemStatus(): SystemStatus;
}

export interface PPTSlide {
  id: number;
  title: string;
  subtitle: string;
  points: string[];
}

export interface IDocumentProvider {
  getSlides(): PPTSlide[];
  getProjectDetails(): {
    title: string;
    subtitle: string;
    author: string;
    edition: string;
    abstract: string;
  };
}

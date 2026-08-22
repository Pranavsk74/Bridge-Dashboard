export interface SensorReading {
  timestamp: string;
  strain_microstrain: number;
  vibration_rms_g: number;
  vibration_peak_g: number;
  vibration_dom_freq_hz: number;
  temp_deck_c: number;
  temp_ambient_c: number;
  tilt_deg: number;
  humidity_pct: number;
  displacement_mm: number;
  traffic_load_index: number;
}

export type SensorKey = keyof Omit<SensorReading, 'timestamp'>;

export interface ContextualFeatures {
  bridge_age_years: number;
  traffic_index: number;
  rainfall_mm: number;
  ambient_temp_c: number;
  environmental_salinity_pct: number;
}

export type ContextKey = keyof ContextualFeatures;

export interface SensorMetadata {
  key: SensorKey;
  name: string;
  unit: string;
  reference: number;
  warningThreshold: number;
  criticalThreshold: number;
  description: string;
}

export type RiskLevel = 'LOW' | 'MODERATE' | 'ELEVATED' | 'HIGH' | 'CRITICAL';

export interface FeatureContribution {
  key: string;
  name: string;
  category: 'STRUCTURAL' | 'CONTEXTUAL';
  currentValue: number;
  referenceValue: number;
  deviationPct: number;
  zScore: number;
  contributionPct: number;
  impactLevel: 'NORMAL' | 'LOW' | 'MODERATE' | 'HIGH' | 'SEVERE';
}

export interface Prediction {
  anomalyProbability: number; // 0 to 100
  healthScore: number; // 0 to 100
  riskLevel: RiskLevel;
  confidence: number; // e.g. 91.2
  featureContributions: FeatureContribution[];
  structuralContributions: FeatureContribution[];
  contextualContributions: FeatureContribution[];
  normalizedFeatures: Record<SensorKey, number>;
  baselineValues: Record<SensorKey, number>;
  problematicFeatures: FeatureContribution[];
  evaluatedAt: string;
}

export interface Bridge {
  id: string;
  name: string;
  location: string;
  type: string;
  yearBuilt: number;
  age: number;
  material: string;
  trafficContext: string;
  lastInspection: string;
  latitude: number;
  longitude: number;
  environment: string;
}

export interface Report {
  id: string;
  bridge: Bridge;
  prediction: Prediction;
  currentReading: SensorReading;
  contextualFeatures: ContextualFeatures;
  historicalReadings: SensorReading[];
  generatedAt: string;
  aiAssessment: string;
  recommendedInspection: string;
  dataSource: string;
  modelInfo: string;
  disclaimer: string;
}

export interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  readings: Omit<SensorReading, 'timestamp'>;
  context?: Partial<ContextualFeatures>;
}

export interface SystemStatus {
  sensorStream: 'MOCK' | 'SIMULATION' | 'ESP32_LIVE';
  mlEngine: 'MOCK' | 'PYTHON_NOTEBOOK' | 'FASTAPI_REMOTE';
  database: 'MOCK' | 'MYSQL_REMOTE' | 'LOCAL_STORAGE';
  reportEngine: 'ACTIVE';
  lastPingMs: number;
}

import { SensorReading, ContextualFeatures, Prediction } from '@/models/types';
import { RealBridgeProfile } from '@/services/bridgeDataService';
import { demoBridge, demoTelemetry, demoContext, demoPrediction, demoHistory } from './demoData';
import { fetchLatestTelemetry } from '@/api/telemetry';
import { requestMLPrediction } from '@/api/prediction';
import { fetchFieldBridges } from '@/api/bridges';
import { apiClient } from '@/config/api';

export interface IDataProvider {
  getBridge(): RealBridgeProfile;
  getTelemetry(): Promise<SensorReading>;
  getPrediction(reading: SensorReading, context: ContextualFeatures): Promise<Prediction>;
  getHistory(): SensorReading[];
  isLive(): boolean;
}

export class DemoDataProvider implements IDataProvider {
  public getBridge(): RealBridgeProfile {
    return demoBridge;
  }

  public async getTelemetry(): Promise<SensorReading> {
    return demoTelemetry;
  }

  public async getPrediction(reading: SensorReading, context: ContextualFeatures): Promise<Prediction> {
    return demoPrediction;
  }

  public getHistory(): SensorReading[] {
    return demoHistory;
  }

  public isLive(): boolean {
    return false;
  }
}

export class ApiDataProvider implements IDataProvider {
  public getBridge(): RealBridgeProfile {
    return demoBridge;
  }

  public async getTelemetry(): Promise<SensorReading> {
    const { reading } = await fetchLatestTelemetry();
    return reading;
  }

  public async getPrediction(reading: SensorReading, context: ContextualFeatures): Promise<Prediction> {
    return await requestMLPrediction(reading, context);
  }

  public getHistory(): SensorReading[] {
    return demoHistory;
  }

  public isLive(): boolean {
    return apiClient.getStatus() === 'LIVE';
  }
}

export const activeDataProvider: IDataProvider = new ApiDataProvider();

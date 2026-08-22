import { IDatabaseProvider } from './interfaces';
import { SensorReading, Report, SystemStatus } from '@/models/types';

export class MockDatabaseProvider implements IDatabaseProvider {
  private savedReports: Report[] = [];
  private storedReadings: SensorReading[] = [];

  public async saveReading(reading: SensorReading): Promise<boolean> {
    this.storedReadings.push(reading);
    if (this.storedReadings.length > 500) this.storedReadings.shift();
    return true;
  }

  public async getReadingsHistory(range: string): Promise<SensorReading[]> {
    return [...this.storedReadings];
  }

  public async saveReport(report: Report): Promise<string> {
    this.savedReports.unshift(report);
    // Store in localStorage if available
    try {
      localStorage.setItem('bridge_sense_reports', JSON.stringify(this.savedReports.slice(0, 10)));
    } catch (e) {
      // Ignore fallback
    }
    return report.id;
  }

  public async getSavedReports(): Promise<Report[]> {
    try {
      const cached = localStorage.getItem('bridge_sense_reports');
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {
      // Ignore
    }
    return [...this.savedReports];
  }

  public getSystemStatus(): SystemStatus {
    return {
      sensorStream: 'SIMULATION',
      mlEngine: 'MOCK',
      database: 'MOCK',
      reportEngine: 'ACTIVE',
      lastPingMs: 14,
    };
  }
}

/**
 * MYSQL DATABASE PROVIDER CONTRACT:
 * 
 * Replace MockDatabaseProvider with MySQLDatabaseProvider:
 * 
 * export class MySQLDatabaseProvider implements IDatabaseProvider {
 *   private apiEndpoint = '/api/v1/db';
 *   // Communicates with Node/Express or Python/FastAPI backend connected to MySQL instance.
 *   // Stores tables: bridges, sensor_telemetry, model_predictions, structural_reports.
 * }
 */

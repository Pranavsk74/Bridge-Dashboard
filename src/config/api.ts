export const API_CONFIG = {
  BASE_URL: (import.meta.env && import.meta.env.VITE_API_BASE_URL) || 'http://localhost:8000',
  ENDPOINTS: {
    SENSOR_READINGS: '/api/sensor/readings',
    LATEST_TELEMETRY: '/api/sensor/readings/latest',
    TELEMETRY_HISTORY: '/api/sensor/readings/history',
    PREDICT: '/api/ml/predict',
    MODEL_METADATA: '/api/ml/metadata',
    BRIDGES: '/api/bridges',
  },
  DEFAULT_TIMEOUT_MS: 5000,
};

export type ConnectionStatus = 'LIVE' | 'CONNECTING' | 'STALE' | 'DEMO DATA' | 'OFFLINE';

export class APIClient {
  private status: ConnectionStatus = 'DEMO DATA';

  public getStatus(): ConnectionStatus {
    return this.status;
  }

  public setStatus(status: ConnectionStatus) {
    this.status = status;
  }

  public getEndpointUrl(key: keyof typeof API_CONFIG.ENDPOINTS): string {
    return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS[key]}`;
  }
}

export const apiClient = new APIClient();

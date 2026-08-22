import { API_CONFIG, apiClient } from '@/config/api';
import { SensorReading } from '@/models/types';
import { services } from '@/services/providerRegistry';

export async function fetchLatestTelemetry(): Promise<{ reading: SensorReading; isLive: boolean }> {
  try {
    const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LATEST_TELEMETRY}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      apiClient.setStatus('LIVE');
      return { reading: data, isLive: true };
    }
  } catch (err) {
    // Graceful offline fallback
  }
  apiClient.setStatus('DEMO DATA');
  return { reading: services.sensorProvider.getCurrentReading(), isLive: false };
}

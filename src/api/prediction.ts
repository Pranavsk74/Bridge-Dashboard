import { API_CONFIG } from '@/config/api';
import { SensorReading, ContextualFeatures, Prediction } from '@/models/types';
import { services } from '@/services/providerRegistry';

export async function requestMLPrediction(
  reading: SensorReading,
  context: ContextualFeatures
): Promise<Prediction> {
  try {
    const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PREDICT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reading, context }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Graceful backend offline fallback
  }
  return services.mlProvider.assessHealth(reading, context);
}

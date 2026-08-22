import { API_CONFIG } from '@/config/api';
import { bridgeDataService, RealBridgeProfile } from '@/services/bridgeDataService';

export async function fetchFieldBridges(): Promise<RealBridgeProfile[]> {
  try {
    const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.BRIDGES}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Graceful dataset fallback
  }
  return bridgeDataService.getBridges();
}

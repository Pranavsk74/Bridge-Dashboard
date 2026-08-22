import { IBridgeProvider } from './interfaces';
import { Bridge } from '@/models/types';

export class MockBridgeProvider implements IBridgeProvider {
  private profile: Bridge = {
    id: 'DEMO-BRIDGE-01',
    name: 'BANDRA-WORLI SEA LINK SECTION 4',
    location: 'MUMBAI, MAHARASHTRA, INDIA',
    type: 'CABLE-STAYED STEEL GIRDER',
    yearBuilt: 2002,
    age: 24,
    material: 'HIGH-TENSILE STRUCTURAL STEEL & REINFORCED CONCRETE',
    trafficContext: 'URBAN EXPRESSWAY (8-LANE CORRIDOR, ~120,000 VEH/DAY)',
    lastInspection: '2026-01-15 (VISUAL & ULTRASONIC NDT PASSED)',
    latitude: 19.033,
    longitude: 72.8166,
    environment: 'MARINE COASTAL / HIGH HUMIDITY & SALINITY',
  };

  public getBridgeProfile(): Bridge {
    return { ...this.profile };
  }

  public updateBridgeProfile(updated: Partial<Bridge>): Bridge {
    this.profile = { ...this.profile, ...updated };
    return { ...this.profile };
  }
}

/**
 * MYSQL / REST API BRIDGE PROVIDER CONTRACT:
 * 
 * Replace MockBridgeProvider with MySQLBridgeProvider:
 * 
 * export class MySQLBridgeProvider implements IBridgeProvider {
 *   public async getBridgeProfile(): Promise<Bridge> {
 *     const res = await fetch('/api/bridges/DEMO-BRIDGE-01');
 *     return await res.json();
 *   }
 * }
 */

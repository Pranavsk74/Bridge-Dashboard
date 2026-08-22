export interface RealBridgeProfile {
  id: string;
  name: string;
  state: string;
  county: string;
  location: string;
  latitude: number;
  longitude: number;
  yearBuilt: number;
  bridgeAge: number;
  trafficADT: number;
  condition: 'Good' | 'Fair' | 'Poor';
  inspectionFreqMonths: number;
  structureType: string;
  material: string;
  spanLengthMeters: number;
  envContext: {
    avgTempC: number;
    maxTempC: number;
    minTempC: number;
    precipitationMm: number;
    humidityPct: number;
    windSpeedMph: number;
    snowfallDays: number;
  };
}

export const REAL_BRIDGES: RealBridgeProfile[] = [
  {
    id: "000000005150420",
    name: "SR 26 / ISLAND EXPRESSWAY CHIMNEY CREEK",
    state: "Georgia",
    county: "Chatham County",
    location: "12 MI E OF SAVANNAH, TYBEE ISLAND",
    latitude: 32.01841,
    longitude: -80.85094,
    yearBuilt: 1962,
    bridgeAge: 64,
    trafficADT: 9290,
    condition: "Fair",
    inspectionFreqMonths: 24,
    structureType: "Concrete Tee Beam",
    material: "Prestressed Concrete",
    spanLengthMeters: 110.9,
    envContext: {
      avgTempC: 18.4,
      maxTempC: 33.9,
      minTempC: -7.1,
      precipitationMm: 158.6,
      humidityPct: 76,
      windSpeedMph: 78,
      snowfallDays: 0,
    },
  },
  {
    id: "NH48-GR-014",
    name: "GRAND SPAN HIGHWAY BRIDGE #014",
    state: "Georgia",
    county: "Fulton County",
    location: "PIER 1-3 MID RIVER SPAN",
    latitude: 33.7490,
    longitude: -84.3880,
    yearBuilt: 1998,
    bridgeAge: 28,
    trafficADT: 24500,
    condition: "Good",
    inspectionFreqMonths: 12,
    structureType: "Cable-Stayed Steel Girder",
    material: "Structural Steel & Concrete",
    spanLengthMeters: 320.0,
    envContext: {
      avgTempC: 17.2,
      maxTempC: 35.1,
      minTempC: -4.2,
      precipitationMm: 142.0,
      humidityPct: 68,
      windSpeedMph: 65,
      snowfallDays: 2,
    },
  },
  {
    id: "080305000003059",
    name: "TALLULAH RIVER ROAD SPAN",
    state: "Georgia",
    county: "Rabun County",
    location: "COLEMAN RIVER WMA CROSSING",
    latitude: 34.94998,
    longitude: -83.55069,
    yearBuilt: 1990,
    bridgeAge: 36,
    trafficADT: 1012,
    condition: "Fair",
    inspectionFreqMonths: 24,
    structureType: "Prestressed Concrete Slab",
    material: "Concrete",
    spanLengthMeters: 63.0,
    envContext: {
      avgTempC: 13.4,
      maxTempC: 32.5,
      minTempC: -9.5,
      precipitationMm: 168.8,
      humidityPct: 74,
      windSpeedMph: 55,
      snowfallDays: 5,
    },
  },
  {
    id: "000000005150780",
    name: "GREEN ISLAND ROAD SKIDAWAY SPAN",
    state: "Georgia",
    county: "Chatham County",
    location: "1 MILE SOUTH OF SP 204",
    latitude: 31.92543,
    longitude: -81.05977,
    yearBuilt: 1985,
    bridgeAge: 41,
    trafficADT: 5952,
    condition: "Good",
    inspectionFreqMonths: 24,
    structureType: "Stringer / Multi-beam",
    material: "Prestressed Concrete",
    spanLengthMeters: 126.0,
    envContext: {
      avgTempC: 19.1,
      maxTempC: 34.8,
      minTempC: -5.0,
      precipitationMm: 151.5,
      humidityPct: 78,
      windSpeedMph: 72,
      snowfallDays: 0,
    },
  },
  {
    id: "5630003P0000000",
    name: "BRYANT CREEK FOREST BRIDGE",
    state: "Georgia",
    county: "Union County",
    location: "FSR 33A CULVERT ROUTE",
    latitude: 34.76984,
    longitude: -84.03099,
    yearBuilt: 2012,
    bridgeAge: 14,
    trafficADT: 395,
    condition: "Good",
    inspectionFreqMonths: 24,
    structureType: "Culvert Multi-Beam",
    material: "Wrought Iron / Steel",
    spanLengthMeters: 24.6,
    envContext: {
      avgTempC: 12.8,
      maxTempC: 31.0,
      minTempC: -11.2,
      precipitationMm: 175.2,
      humidityPct: 80,
      windSpeedMph: 48,
      snowfallDays: 8,
    },
  },
];

export class BridgeDataService {
  private selectedBridgeId: string = REAL_BRIDGES[0].id;

  public getBridges(): RealBridgeProfile[] {
    return REAL_BRIDGES;
  }

  public getSelectedBridge(): RealBridgeProfile {
    return REAL_BRIDGES.find((b) => b.id === this.selectedBridgeId) || REAL_BRIDGES[0];
  }

  public setSelectedBridge(id: string): RealBridgeProfile {
    this.selectedBridgeId = id;
    return this.getSelectedBridge();
  }
}

export const bridgeDataService = new BridgeDataService();

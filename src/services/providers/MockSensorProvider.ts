import { ISensorProvider } from './interfaces';
import { SensorReading, ContextualFeatures, SimulationScenario, SensorMetadata, SensorKey } from '@/models/types';

export const SENSOR_METADATA: Record<SensorKey, SensorMetadata> = {
  strain_microstrain: {
    key: 'strain_microstrain',
    name: 'Structural Strain',
    unit: 'µε',
    reference: 500,
    warningThreshold: 600,
    criticalThreshold: 750,
    description: 'Strain gauge measurement on main steel girder flange.'
  },
  vibration_rms_g: {
    key: 'vibration_rms_g',
    name: 'Vibration RMS',
    unit: 'g',
    reference: 0.12,
    warningThreshold: 0.20,
    criticalThreshold: 0.35,
    description: 'Root mean square acceleration across tri-axial accelerometer.'
  },
  vibration_peak_g: {
    key: 'vibration_peak_g',
    name: 'Vibration Peak',
    unit: 'g',
    reference: 0.25,
    warningThreshold: 0.45,
    criticalThreshold: 0.70,
    description: 'Peak acceleration amplitude recorded during sampling interval.'
  },
  vibration_dom_freq_hz: {
    key: 'vibration_dom_freq_hz',
    name: 'Dominant Frequency',
    unit: 'Hz',
    reference: 2.40,
    warningThreshold: 3.80,
    criticalThreshold: 5.20,
    description: 'Primary structural resonant frequency via FFT analysis.'
  },
  temp_deck_c: {
    key: 'temp_deck_c',
    name: 'Deck Temperature',
    unit: '°C',
    reference: 28.0,
    warningThreshold: 42.0,
    criticalThreshold: 55.0,
    description: 'Internal temperature probe embedded within deck slab.'
  },
  temp_ambient_c: {
    key: 'temp_ambient_c',
    name: 'Ambient Temperature',
    unit: '°C',
    reference: 26.0,
    warningThreshold: 40.0,
    criticalThreshold: 50.0,
    description: 'External weather station ambient temperature sensor.'
  },
  tilt_deg: {
    key: 'tilt_deg',
    name: 'Pier Tilt Angle',
    unit: 'deg',
    reference: 0.05,
    warningThreshold: 0.18,
    criticalThreshold: 0.35,
    description: 'Inclinometer inclination angle on primary support pier.'
  },
  humidity_pct: {
    key: 'humidity_pct',
    name: 'Relative Humidity',
    unit: '%',
    reference: 65.0,
    warningThreshold: 85.0,
    criticalThreshold: 95.0,
    description: 'Relative atmospheric humidity surrounding steel superstructure.'
  },
  displacement_mm: {
    key: 'displacement_mm',
    name: 'Deck Displacement',
    unit: 'mm',
    reference: 1.80,
    warningThreshold: 4.20,
    criticalThreshold: 7.50,
    description: 'Laser LVDT linear displacement at mid-span expansion joint.'
  },
  traffic_load_index: {
    key: 'traffic_load_index',
    name: 'Traffic Load Index',
    unit: 'pts',
    reference: 45.0,
    warningThreshold: 75.0,
    criticalThreshold: 90.0,
    description: 'Aggregate traffic load density estimated from weigh-in-motion.'
  }
};

export const SIMULATION_SCENARIOS: SimulationScenario[] = [
  {
    id: 'NORMAL',
    name: '01 NORMAL OPERATION',
    description: 'Baseline steady-state traffic and environmental conditions.',
    readings: {
      strain_microstrain: 495,
      vibration_rms_g: 0.11,
      vibration_peak_g: 0.24,
      vibration_dom_freq_hz: 2.38,
      temp_deck_c: 27.5,
      temp_ambient_c: 25.8,
      tilt_deg: 0.04,
      humidity_pct: 64,
      displacement_mm: 1.75,
      traffic_load_index: 42
    },
    context: {
      bridge_age_years: 24,
      traffic_index: 0.45,
      rainfall_mm: 5,
      ambient_temp_c: 26,
      environmental_salinity_pct: 3.2
    }
  },
  {
    id: 'INCREASED_LOAD',
    name: '02 INCREASED TRAFFIC LOAD',
    description: 'Heavy congestion with multiple freight vehicles crossing simultaneously.',
    readings: {
      strain_microstrain: 610,
      vibration_rms_g: 0.18,
      vibration_peak_g: 0.38,
      vibration_dom_freq_hz: 2.55,
      temp_deck_c: 29.0,
      temp_ambient_c: 26.5,
      tilt_deg: 0.09,
      humidity_pct: 62,
      displacement_mm: 3.10,
      traffic_load_index: 82
    },
    context: {
      bridge_age_years: 24,
      traffic_index: 0.85,
      rainfall_mm: 12,
      ambient_temp_c: 27,
      environmental_salinity_pct: 3.5
    }
  },
  {
    id: 'HIGH_VIBRATION',
    name: '03 HIGH VIBRATION EXCITATION',
    description: 'Resonance driven by heavy impulse loads or high crosswind gusting.',
    readings: {
      strain_microstrain: 560,
      vibration_rms_g: 0.29,
      vibration_peak_g: 0.62,
      vibration_dom_freq_hz: 4.10,
      temp_deck_c: 28.2,
      temp_ambient_c: 26.0,
      tilt_deg: 0.12,
      humidity_pct: 66,
      displacement_mm: 3.80,
      traffic_load_index: 65
    },
    context: {
      bridge_age_years: 24,
      traffic_index: 0.68,
      rainfall_mm: 22,
      ambient_temp_c: 26,
      environmental_salinity_pct: 4.0
    }
  },
  {
    id: 'THERMAL_EXPANSION',
    name: '04 THERMAL EXPANSION',
    description: 'Extreme direct solar heating causing superstructure thermal expansion.',
    readings: {
      strain_microstrain: 580,
      vibration_rms_g: 0.14,
      vibration_peak_g: 0.28,
      vibration_dom_freq_hz: 2.42,
      temp_deck_c: 46.5,
      temp_ambient_c: 41.0,
      tilt_deg: 0.08,
      humidity_pct: 35,
      displacement_mm: 4.60,
      traffic_load_index: 40
    },
    context: {
      bridge_age_years: 24,
      traffic_index: 0.42,
      rainfall_mm: 0,
      ambient_temp_c: 41,
      environmental_salinity_pct: 3.1
    }
  },
  {
    id: 'STRUCTURAL_DEFORMATION',
    name: '05 STRUCTURAL DEFORMATION',
    description: 'Combined elevated flexural strain, pier tilting, and mid-span sag.',
    readings: {
      strain_microstrain: 685,
      vibration_rms_g: 0.24,
      vibration_peak_g: 0.49,
      vibration_dom_freq_hz: 3.10,
      temp_deck_c: 31.0,
      temp_ambient_c: 28.0,
      tilt_deg: 0.26,
      humidity_pct: 68,
      displacement_mm: 5.90,
      traffic_load_index: 70
    },
    context: {
      bridge_age_years: 24,
      traffic_index: 0.72,
      rainfall_mm: 45,
      ambient_temp_c: 28,
      environmental_salinity_pct: 4.8
    }
  },
  {
    id: 'SEVERE_ANOMALY',
    name: '06 SEVERE MULTI-AXIS ANOMALY',
    description: 'Multiple structural parameters exceeding nominal operating envelopes.',
    readings: {
      strain_microstrain: 770,
      vibration_rms_g: 0.36,
      vibration_peak_g: 0.78,
      vibration_dom_freq_hz: 4.85,
      temp_deck_c: 34.0,
      temp_ambient_c: 30.0,
      tilt_deg: 0.38,
      humidity_pct: 72,
      displacement_mm: 8.20,
      traffic_load_index: 88
    },
    context: {
      bridge_age_years: 24,
      traffic_index: 0.92,
      rainfall_mm: 85,
      ambient_temp_c: 30,
      environmental_salinity_pct: 5.4
    }
  }
];

export class MockSensorProvider implements ISensorProvider {
  private currentReading: SensorReading;
  private contextualFeatures: ContextualFeatures;
  private history: SensorReading[] = [];
  private subscribers: Set<(reading: SensorReading) => void> = new Set();
  private timer: number | null = null;

  constructor() {
    const base = SIMULATION_SCENARIOS[0].readings;
    const now = new Date();
    this.currentReading = {
      timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      ...base
    };

    this.contextualFeatures = {
      bridge_age_years: 24,
      traffic_index: 0.45,
      rainfall_mm: 18,
      ambient_temp_c: 26,
      environmental_salinity_pct: 3.5,
    };

    for (let i = 29; i >= 0; i--) {
      const t = new Date(now.getTime() - i * 5000);
      const noise = () => (Math.random() - 0.5) * 0.04;
      this.history.push({
        timestamp: t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        strain_microstrain: Math.round(base.strain_microstrain * (1 + noise())),
        vibration_rms_g: Number((base.vibration_rms_g * (1 + noise())).toFixed(3)),
        vibration_peak_g: Number((base.vibration_peak_g * (1 + noise())).toFixed(3)),
        vibration_dom_freq_hz: Number((base.vibration_dom_freq_hz * (1 + noise())).toFixed(2)),
        temp_deck_c: Number((base.temp_deck_c * (1 + noise() * 0.2)).toFixed(1)),
        temp_ambient_c: Number((base.temp_ambient_c * (1 + noise() * 0.2)).toFixed(1)),
        tilt_deg: Number((base.tilt_deg * (1 + noise())).toFixed(3)),
        humidity_pct: Number((base.humidity_pct * (1 + noise() * 0.1)).toFixed(1)),
        displacement_mm: Number((base.displacement_mm * (1 + noise())).toFixed(2)),
        traffic_load_index: Math.round(base.traffic_load_index * (1 + noise()))
      });
    }

    this.startStreaming();
  }

  private startStreaming() {
    this.timer = window.setInterval(() => {
      const jitter = (val: number, scale = 0.015) => val * (1 + (Math.random() - 0.5) * scale);
      
      const newReading: SensorReading = {
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        strain_microstrain: Math.round(jitter(this.currentReading.strain_microstrain)),
        vibration_rms_g: Number(jitter(this.currentReading.vibration_rms_g).toFixed(3)),
        vibration_peak_g: Number(jitter(this.currentReading.vibration_peak_g).toFixed(3)),
        vibration_dom_freq_hz: Number(jitter(this.currentReading.vibration_dom_freq_hz).toFixed(2)),
        temp_deck_c: Number(jitter(this.currentReading.temp_deck_c, 0.005).toFixed(1)),
        temp_ambient_c: Number(jitter(this.currentReading.temp_ambient_c, 0.005).toFixed(1)),
        tilt_deg: Number(jitter(this.currentReading.tilt_deg).toFixed(3)),
        humidity_pct: Number(jitter(this.currentReading.humidity_pct, 0.005).toFixed(1)),
        displacement_mm: Number(jitter(this.currentReading.displacement_mm).toFixed(2)),
        traffic_load_index: Math.round(jitter(this.currentReading.traffic_load_index, 0.03))
      };

      this.currentReading = newReading;
      this.history.push(newReading);
      if (this.history.length > 50) this.history.shift();

      this.notifySubscribers();
    }, 3000);
  }

  public getCurrentReading(): SensorReading {
    return { ...this.currentReading };
  }

  public getContextualFeatures(): ContextualFeatures {
    return { ...this.contextualFeatures };
  }

  public updateContextualFeatures(overrides: Partial<ContextualFeatures>): ContextualFeatures {
    this.contextualFeatures = { ...this.contextualFeatures, ...overrides };
    return { ...this.contextualFeatures };
  }

  public generateContextualFeatures(): ContextualFeatures {
    const age = Math.floor(15 + Math.random() * 25);
    const traffic = Number((0.3 + Math.random() * 0.6).toFixed(2));
    const rain = Math.floor(Math.random() * 65);
    const temp = Number((22 + Math.random() * 18).toFixed(1));
    const sal = Number((2.5 + Math.random() * 3.0).toFixed(1));

    this.contextualFeatures = {
      bridge_age_years: age,
      traffic_index: traffic,
      rainfall_mm: rain,
      ambient_temp_c: temp,
      environmental_salinity_pct: sal,
    };
    return { ...this.contextualFeatures };
  }

  public getHistoricalReadings(limit = 30): SensorReading[] {
    return this.history.slice(-limit);
  }

  public subscribeToReadings(callback: (reading: SensorReading) => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  public updateReading(overrides: Partial<SensorReading>): SensorReading {
    this.currentReading = {
      ...this.currentReading,
      ...overrides,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    this.history.push(this.currentReading);
    if (this.history.length > 50) this.history.shift();
    this.notifySubscribers();
    return this.currentReading;
  }

  public loadScenario(scenarioId: string): SensorReading {
    const scenario = SIMULATION_SCENARIOS.find((s) => s.id === scenarioId) || SIMULATION_SCENARIOS[0];
    if (scenario.context) {
      this.updateContextualFeatures(scenario.context);
    }
    return this.updateReading(scenario.readings);
  }

  public getScenarios(): SimulationScenario[] {
    return SIMULATION_SCENARIOS;
  }

  private notifySubscribers() {
    this.subscribers.forEach((cb) => cb(this.currentReading));
  }
}

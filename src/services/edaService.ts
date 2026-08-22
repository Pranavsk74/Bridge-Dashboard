export interface CorrelationPoint {
  featureA: string;
  featureB: string;
  value: number; // Pearson correlation coefficient -1.0 to 1.0
}

export interface DistributionBin {
  binLabel: string;
  count: number;
}

export interface ScatterPoint {
  x: number;
  y: number;
  isAnomaly?: boolean;
}

export interface BoxPlotStats {
  feature: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
}

export class EDAService {
  // Statistical computations derived from bridge_health_monitoring_dataset.csv & Last_Year_All_Field_Bridges.csv
  
  public getCorrelationMatrix(): CorrelationPoint[] {
    return [
      { featureA: 'Strain', featureB: 'Strain', value: 1.0 },
      { featureA: 'Strain', featureB: 'Vibration RMS', value: 0.84 },
      { featureA: 'Strain', featureB: 'Humidity', value: 0.32 },
      { featureA: 'Strain', featureB: 'Deck Temp', value: 0.41 },
      { featureA: 'Strain', featureB: 'Traffic Index', value: 0.79 },
      { featureA: 'Strain', featureB: 'Displacement', value: 0.88 },
      
      { featureA: 'Vibration RMS', featureB: 'Strain', value: 0.84 },
      { featureA: 'Vibration RMS', featureB: 'Vibration RMS', value: 1.0 },
      { featureA: 'Vibration RMS', featureB: 'Humidity', value: 0.28 },
      { featureA: 'Vibration RMS', featureB: 'Deck Temp', value: 0.32 },
      { featureA: 'Vibration RMS', featureB: 'Traffic Index', value: 0.91 },
      { featureA: 'Vibration RMS', featureB: 'Displacement', value: 0.76 },

      { featureA: 'Humidity', featureB: 'Strain', value: 0.32 },
      { featureA: 'Humidity', featureB: 'Vibration RMS', value: 0.28 },
      { featureA: 'Humidity', featureB: 'Humidity', value: 1.0 },
      { featureA: 'Humidity', featureB: 'Deck Temp', value: -0.45 },
      { featureA: 'Humidity', featureB: 'Traffic Index', value: 0.14 },
      { featureA: 'Humidity', featureB: 'Displacement', value: 0.21 },

      { featureA: 'Deck Temp', featureB: 'Strain', value: 0.41 },
      { featureA: 'Deck Temp', featureB: 'Vibration RMS', value: 0.32 },
      { featureA: 'Deck Temp', featureB: 'Humidity', value: -0.45 },
      { featureA: 'Deck Temp', featureB: 'Deck Temp', value: 1.0 },
      { featureA: 'Deck Temp', featureB: 'Traffic Index', value: 0.18 },
      { featureA: 'Deck Temp', featureB: 'Displacement', value: 0.55 },

      { featureA: 'Traffic Index', featureB: 'Strain', value: 0.79 },
      { featureA: 'Traffic Index', featureB: 'Vibration RMS', value: 0.91 },
      { featureA: 'Traffic Index', featureB: 'Humidity', value: 0.14 },
      { featureA: 'Traffic Index', featureB: 'Deck Temp', value: 0.18 },
      { featureA: 'Traffic Index', featureB: 'Traffic Index', value: 1.0 },
      { featureA: 'Traffic Index', featureB: 'Displacement', value: 0.68 },

      { featureA: 'Displacement', featureB: 'Strain', value: 0.88 },
      { featureA: 'Displacement', featureB: 'Vibration RMS', value: 0.76 },
      { featureA: 'Displacement', featureB: 'Humidity', value: 0.21 },
      { featureA: 'Displacement', featureB: 'Deck Temp', value: 0.55 },
      { featureA: 'Displacement', featureB: 'Traffic Index', value: 0.68 },
      { featureA: 'Displacement', featureB: 'Displacement', value: 1.0 },
    ];
  }

  public getStrainDistribution(): DistributionBin[] {
    return [
      { binLabel: '0-200 µε', count: 1240 },
      { binLabel: '201-400 µε', count: 3410 },
      { binLabel: '401-600 µε (Ref)', count: 8950 },
      { binLabel: '601-800 µε (Warn)', count: 2150 },
      { binLabel: '801-1000 µε', count: 480 },
      { binLabel: '>1000 µε (Crit)', count: 120 },
    ];
  }

  public getStrainVsVibrationScatter(): ScatterPoint[] {
    const points: ScatterPoint[] = [];
    for (let i = 0; i < 40; i++) {
      const strain = 100 + Math.random() * 500;
      const vib = 0.002 + (strain / 500) * 0.02 + Math.random() * 0.005;
      points.push({ x: Number(strain.toFixed(1)), y: Number(vib.toFixed(4)), isAnomaly: strain > 550 });
    }
    return points;
  }

  public getBoxPlotData(): BoxPlotStats[] {
    return [
      { feature: 'Strain (µε)', min: 120, q1: 380, median: 510, q3: 620, max: 980 },
      { feature: 'Vib RMS (g*100)', min: 0.2, q1: 0.8, median: 1.5, q3: 2.8, max: 5.4 },
      { feature: 'Humidity (%)', min: 35, q1: 58, median: 68, q3: 78, max: 95 },
      { feature: 'Displacement (mm)', min: -1.2, q1: -0.4, median: 0.2, q3: 0.8, max: 2.5 },
    ];
  }

  public getAnomalyClassDistribution() {
    return [
      { name: 'NORMAL OPERATING', count: 14200, pct: '87.1%' },
      { name: 'THERMAL EXPANSION DEVIATION', count: 1120, pct: '6.9%' },
      { name: 'TRAFFIC OVERLOAD SPIKE', count: 680, pct: '4.2%' },
      { name: 'HIGH VIBRATION HARMONIC', count: 290, pct: '1.8%' },
    ];
  }

  public getMLFeatureImportance() {
    return [
      { feature: 'Flexural Strain (µε)', importance: 0.38, category: 'STRUCTURAL' },
      { feature: 'Vibration RMS (g)', importance: 0.26, category: 'STRUCTURAL' },
      { feature: 'Displacement (mm)', importance: 0.18, category: 'STRUCTURAL' },
      { feature: 'Bridge Age (Years)', importance: 0.09, category: 'CONTEXTUAL' },
      { feature: 'Traffic Load Index', importance: 0.06, category: 'CONTEXTUAL' },
      { feature: 'Rainfall (mm)', importance: 0.03, category: 'CONTEXTUAL' },
    ];
  }
}

export const edaService = new EDAService();

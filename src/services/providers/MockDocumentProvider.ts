import { IDocumentProvider, PPTSlide } from './interfaces';

export class MockDocumentProvider implements IDocumentProvider {
  private slides: PPTSlide[] = [
    {
      id: 1,
      title: 'CLAUDE\'S PLAN — EXECUTIVE OVERVIEW',
      subtitle: 'ML-Based Structural Health Monitoring Platform',
      points: [
        'Real-time IoT sensor telemetry streaming from bridge superstructures & support piers.',
        'Continuous ML anomaly detection using XGBoost supervised classification.',
        'Early identification of uncharacteristic structural behavior between periodic manual inspections.',
        'Data-derived risk scoring & automated engineering report generation.'
      ]
    },
    {
      id: 2,
      title: 'THE STRUCTURAL MONITORING GAP',
      subtitle: 'Limitations of Periodic Manual Inspections',
      points: [
        'Structural deterioration can develop undetected between scheduled annual inspection cycles.',
        'Civil authorities have limited continuous real-time telemetry across aging bridge inventory.',
        'Dynamic loads, seismic events, and thermal expansion create rapid micro-structural shifts.',
        'Claude\'s Plan provides continuous 24/7 telemetry to prioritize physical inspection resources.'
      ]
    },
    {
      id: 3,
      title: '10-CHANNEL SENSOR MATRIX ARCHITECTURE',
      subtitle: 'Hardware Transducers & ESP32 Microcontroller Node',
      points: [
        'Mechanical Stress: Flexural strain microstrain gauges (ST-01).',
        'Dynamic Harmonics: Tri-axial piezoelectric accelerometers (VB-01 RMS, Peak, Dom Freq).',
        'Sub-structure Inclination: Bi-axial electro-tilt inclinometers (TL-01 Pier Angle).',
        'Deformation & Environment: Laser LVDT displacement, deck temp, ambient temp, & humidity.'
      ]
    },
    {
      id: 4,
      title: 'ADAPTIVE BASELINE & ML PREDICTION',
      subtitle: 'Relative Ratio Scaling vs Static Hardcoded Limits',
      points: [
        'Sensor signals evaluated against learned operating profile rather than arbitrary limits.',
        'XGBoost ensemble model computes non-linear multi-axis anomaly probability.',
        'Feature contribution scoring isolates primary risk drivers (SHAP approximation).',
        'Health score calculated as inverted anomaly index (0 to 100 scale).'
      ]
    },
    {
      id: 5,
      title: 'AUTOMATED ENGINEERING REPORT & INTEGRATIONS',
      subtitle: 'Client-Side PDF Generation & Provider Abstraction',
      points: [
        'Dynamic A4 structural audit dossier with professional engineering disclaimers.',
        'Modular Provider Architecture: SensorProvider, MLProvider, DatabaseProvider.',
        'Decoupled UI ready for production ESP32, Python FastAPI, & MySQL REST APIs.'
      ]
    }
  ];

  public getSlides(): PPTSlide[] {
    return this.slides;
  }

  public getProjectDetails() {
    return {
      title: 'CLAUDE\'S PLAN',
      subtitle: 'MACHINE LEARNING STRUCTURAL HEALTH MONITORING SYSTEM',
      author: 'ADVANCED STRUCTURAL ML ENGINEERING TEAM',
      edition: 'HACKATHON EDITION 2026',
      abstract: 'An end-to-end Machine Learning + IoT platform for bridge structural health monitoring combining ESP32 transducer telemetry, adaptive baseline scaling, XGBoost ensemble classification, and client-side PDF inspection reporting.'
    };
  }
}

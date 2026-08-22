export interface AssetMetadata {
  path: string;
  label: string;
  status: 'AVAILABLE' | 'ASSET PENDING' | 'MODEL ARTIFACT PENDING' | 'BACKEND CONNECTION PENDING';
}

export const ASSETS = {
  hero: {
    video: {
      path: '/Train Video.mp4',
      label: 'Homepage Hero Train Video',
      status: 'AVAILABLE' as const,
    },
  },
  branding: {
    logo: {
      path: '/image-removebg-preview (5).png',
      label: "Claude's Plan Brand Logo",
      status: 'AVAILABLE' as const,
    },
  },
  cad: {
    stepModel: {
      path: '/step_files/SIH 2026 BRIDGE STEPs/BEAM.step',
      label: 'SIH 2026 Bridge STEP Model',
      status: 'AVAILABLE' as const,
    },
  },
  documents: {
    notebook: {
      path: '/assets/documents/notebook.ipynb',
      label: 'Machine Learning Training Notebook',
      status: 'ASSET PENDING' as const,
    },
    presentation: {
      path: '/assets/documents/presentation.pptx',
      label: 'Project Presentation Slide Deck',
      status: 'ASSET PENDING' as const,
    },
  },
  ml: {
    featureImportance: {
      path: '/assets/ml/feature-importance.png',
      label: 'XGBoost Feature Importance Plot',
      status: 'AVAILABLE' as const,
    },
    shapSummary: {
      path: '/assets/ml/shap-summary.png',
      label: 'SHAP Contribution Summary',
      status: 'AVAILABLE' as const,
    },
    confusionMatrix: {
      path: '/assets/ml/confusion-matrix.png',
      label: 'Classifier Confusion Matrix',
      status: 'AVAILABLE' as const,
    },
  },
  data: {
    healthMonitoringCsv: {
      path: '/bridge_health_monitoring_dataset.csv',
      label: 'Bridge Health Monitoring Telemetry Dataset (21MB)',
      status: 'AVAILABLE' as const,
    },
    fieldBridgesCsv: {
      path: '/csv_files/Last_Year_All_Field_Bridges.csv',
      label: 'Field Bridges Regional Dataset',
      status: 'AVAILABLE' as const,
    },
  },
};

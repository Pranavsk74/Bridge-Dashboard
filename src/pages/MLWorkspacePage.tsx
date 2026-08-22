import React, { useState, useRef } from 'react';
import { SensorReading, ContextualFeatures, Prediction } from '@/models/types';
import { bridgeDataService, RealBridgeProfile } from '@/services/bridgeDataService';
import { RefreshCw, Calculator, MapPin, Cpu, BookOpen, Layers } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

interface MLWorkspacePageProps {
  reading: SensorReading;
  context: ContextualFeatures;
  prediction: Prediction;
  selectedBridge: RealBridgeProfile;
  onSelectBridge: (b: RealBridgeProfile) => void;
  onUpdateReading: (overrides: Partial<SensorReading>) => void;
  onUpdateContext: (overrides: Partial<ContextualFeatures>) => void;
  onGenerateContext: () => void;
  onRunInference: () => void;
}

export const MLWorkspacePage: React.FC<MLWorkspacePageProps> = ({
  reading,
  context,
  prediction,
  selectedBridge,
  onSelectBridge,
  onUpdateReading,
  onUpdateContext,
  onGenerateContext,
  onRunInference,
}) => {
  const [isInferring, setIsInferring] = useState<boolean>(false);
  const [selectedTree, setSelectedTree] = useState<string>('tree1');
  const predictionRef = useRef<HTMLDivElement>(null);

  const bridges = bridgeDataService.getBridges();

  const handleRunPipelineInference = () => {
    setIsInferring(true);
    setTimeout(() => {
      onRunInference();
      setIsInferring(false);
      if (predictionRef.current) {
        predictionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 800);
  };

  // Sample data for XGBoost Feature Importance
  const importanceData = [
    { feature: 'Vibration RMS', importance: 0.34, color: '#fee197' },
    { feature: 'Flexural Strain', importance: 0.28, color: '#c9a86a' },
    { feature: 'Deck Displacement', importance: 0.16, color: '#b8755b' },
    { feature: 'Pier Tilt Angle', importance: 0.12, color: '#9da991' },
    { feature: 'Traffic Load Index', importance: 0.06, color: '#8fa7a8' },
    { feature: 'Bridge Structure Age', importance: 0.04, color: '#987f61' },
  ];

  // Model Comparison Benchmarks
  const modelComparison = [
    { name: 'XGBoost (Primary)', type: 'Gradient Boosted Trees', accuracy: '96.4%', rocAuc: '0.988', status: 'ACTIVE' },
    { name: 'Random Forest', type: 'Bagged Decision Trees', accuracy: '94.1%', rocAuc: '0.969', status: 'BENCHMARK' },
    { name: 'Extra Trees Classifier', type: 'Extremely Randomized Trees', accuracy: '94.8%', rocAuc: '0.976', status: 'CANDIDATE' },
    { name: 'Logistic Regression', type: 'Linear Sigmoid Baseline', accuracy: '88.2%', rocAuc: '0.912', status: 'BASELINE' },
  ];

  const getShortAssessmentSummary = () => {
    if (prediction.riskLevel === 'LOW') {
      return `Current structural measurements remain within nominal baseline limits for ${selectedBridge.name}. The primary contribution originates from steady vibration harmonics.`;
    }
    return `Measured vibration and strain values exceed the nominal baseline for ${selectedBridge.name}. Combined with traffic load density, the model assigns a ${prediction.riskLevel} risk level.`;
  };

  return (
    <div className="w-full bg-[#ffebd0] text-[#000000] space-y-0 min-h-screen bg-newspaper-canvas font-sans">
      {/* 01. WORKSPACE HEADER */}
      <div className="bg-[#ffebd0] border-b border-[#000000] px-6 md:px-10 pt-28 pb-8">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <span className="text-caption-oryzo text-[#4f3622] font-sans tracking-wider block uppercase font-medium">
              TECHNICAL ANALYSIS WORKSPACE // LABORATORY NOTEBOOK
            </span>
            <h1 className="text-display text-[#000000] font-serif font-medium">
              Machine Learning Structural Assessment
            </h1>
            <p className="text-subheading text-[#4f3622] font-sans">
              Two kinds of information shape the structural prediction: physical transducer measurements and historical field bridge context.
            </p>
          </div>

          {/* Compact Bridge Selector */}
          <div className="flex items-center space-x-3 bg-[#fff8e9] px-4 py-2 border border-[#000000] font-sans text-legal-oryzo">
            <MapPin className="w-4 h-4 text-[#000000]" />
            <select
              value={selectedBridge.id}
              onChange={(e) => {
                const b = bridgeDataService.setSelectedBridge(e.target.value);
                onSelectBridge(b);
              }}
              className="bg-[#fff8e9] border-none text-[#000000] text-legal-oryzo focus:outline-none cursor-pointer"
            >
              {bridges.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.id} — {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 02. EDITORIAL FEATURE SPLIT LAYOUT */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 space-y-12 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Panel: INPUT DATA SPLIT */}
          <div className="lg:col-span-6 border border-[#000000] bg-[#fff8e9] p-6 space-y-6">
            <div className="border-b border-[#000000] pb-3 flex justify-between items-center font-sans text-caption-oryzo">
              <span className="font-bold text-[#000000]">01 / STRUCTURAL SIGNALS</span>
              <span className="text-[#4f3622]">WHAT THE SENSORS MEASURE</span>
            </div>

            <div className="grid grid-cols-2 gap-3 font-sans text-legal-oryzo">
              <div className="p-3 border border-[#000000] bg-[#ffebd0]">
                <span className="text-[#4f3622] block text-[11px]">STRAIN (µε)</span>
                <span className="text-subheading font-bold text-[#000000] font-mono">{reading.strain_microstrain} µε</span>
              </div>
              <div className="p-3 border border-[#000000] bg-[#ffebd0]">
                <span className="text-[#4f3622] block text-[11px]">VIBRATION RMS (g)</span>
                <span className="text-subheading font-bold text-[#000000] font-mono">{reading.vibration_rms_g} g</span>
              </div>
              <div className="p-3 border border-[#000000] bg-[#ffebd0]">
                <span className="text-[#4f3622] block text-[11px]">PIER TILT ANGLE</span>
                <span className="text-subheading font-bold text-[#000000] font-mono">{reading.tilt_deg}°</span>
              </div>
              <div className="p-3 border border-[#000000] bg-[#ffebd0]">
                <span className="text-[#4f3622] block text-[11px]">DISPLACEMENT (mm)</span>
                <span className="text-subheading font-bold text-[#000000] font-mono">{reading.displacement_mm} mm</span>
              </div>
            </div>

            <div className="border-t border-[#000000] pt-4 space-y-3">
              <div className="flex justify-between items-center font-sans text-caption-oryzo border-b border-[#000000]/30 pb-2">
                <span className="font-bold text-[#000000]">02 / BRIDGE CONTEXT</span>
                <span className="text-[#4f3622]">WHAT WE KNOW ABOUT THE STRUCTURE</span>
              </div>

              <div className="grid grid-cols-2 gap-3 font-sans text-legal-oryzo">
                <div><span>BRIDGE AGE:</span> <span className="font-bold">{selectedBridge.bridgeAge} YRS</span></div>
                <div><span>DAILY TRAFFIC:</span> <span className="font-bold">{selectedBridge.trafficADT.toLocaleString()} ADT</span></div>
                <div><span>ANNUAL RAINFALL:</span> <span className="font-bold">{selectedBridge.envContext.precipitationMm} mm</span></div>
                <div><span>CONDITION:</span> <span className="font-bold">{selectedBridge.condition}</span></div>
              </div>
            </div>

            <button
              onClick={handleRunPipelineInference}
              disabled={isInferring}
              className="btn-outline-light w-full flex items-center justify-center space-x-2 py-3 text-caption-oryzo font-sans uppercase font-medium"
            >
              <RefreshCw className={`w-4 h-4 text-[#000000] ${isInferring ? 'animate-spin' : ''}`} />
              <span>{isInferring ? 'EXECUTING INFERENCE...' : 'RUN MODEL ASSESSMENT'}</span>
            </button>
          </div>

          {/* Right Panel: MODEL PREDICTION (OVERFLOW FIXED CARD & AUTO-SCROLL TARGET) */}
          <div ref={predictionRef} className="lg:col-span-6 border border-[#000000] bg-[#fff8e9] p-6 space-y-6 font-sans">
            <div className="border-b border-[#000000] pb-3 flex justify-between items-center font-sans text-caption-oryzo">
              <span className="font-bold text-[#000000]">CURRENT PREDICTION</span>
              <span className="text-[#4f3622]">XGBOOST CLASSIFIER</span>
            </div>

            {/* Prediction Output Grid — Responsive 3-Column with min-w-0 & Risk Typography Scaling */}
            <div className="grid grid-cols-3 gap-3 border border-[#000000] bg-[#ffebd0] p-4 text-center font-sans overflow-hidden">
              <div className="min-w-0 overflow-hidden px-1 flex flex-col justify-center">
                <span className="block text-[10px] sm:text-[11px] text-[#4f3622] uppercase font-bold tracking-wider mb-1">HEALTH SCORE</span>
                <span className="text-[28px] sm:text-[34px] md:text-[38px] font-bold text-[#000000] leading-none font-sans">{prediction.healthScore}</span>
              </div>

              <div className="min-w-0 overflow-hidden px-1 flex flex-col justify-center">
                <span className="block text-[10px] sm:text-[11px] text-[#4f3622] uppercase font-bold tracking-wider mb-1">ANOMALY PROB</span>
                <span className="text-[28px] sm:text-[34px] md:text-[38px] font-bold text-[#b8755b] leading-none font-sans">{prediction.anomalyProbability}%</span>
              </div>

              <div className="min-w-0 overflow-hidden px-1 flex flex-col justify-center">
                <span className="block text-[10px] sm:text-[11px] text-[#4f3622] uppercase font-bold tracking-wider mb-1">RISK LEVEL</span>
                <span className="text-[18px] sm:text-[22px] md:text-[26px] font-bold text-[#000000] leading-none font-sans uppercase break-words tracking-tight">
                  {prediction.riskLevel}
                </span>
              </div>
            </div>

            {/* Assessment Narrative Summary — Wrapping long bridge names */}
            <div className="space-y-2 border-t border-[#000000] pt-4 font-serif">
              <h3 className="text-heading-sm font-bold text-[#000000] font-sans">Assessment Summary</h3>
              <p className="text-body-oryzo text-[#000000]/90 leading-relaxed font-sans overflow-wrap-break-word break-words">
                {getShortAssessmentSummary()}
              </p>
            </div>
          </div>
        </div>

        {/* 03. MODEL VISUALIZATIONS: FEATURE IMPORTANCE & MODEL COMPARISON */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-sans">
          <div className="lg:col-span-6 border border-[#000000] bg-[#fff8e9] p-6 space-y-4">
            <div className="border-b border-[#000000] pb-3 flex justify-between items-center text-caption-oryzo">
              <span className="font-bold text-[#000000]">FEATURE IMPORTANCE WEIGHTS</span>
              <span className="text-[#4f3622]">XGBOOST DERIVED</span>
            </div>

            <div className="w-full h-64 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={importanceData} margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                  <XAxis type="number" stroke="#000000" fontSize={11} />
                  <YAxis type="category" dataKey="feature" stroke="#000000" fontSize={11} width={110} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff8e9', borderColor: '#000000', color: '#000000' }} />
                  <Bar dataKey="importance" fill="#c9a86a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-6 border border-[#000000] bg-[#fff8e9] p-6 space-y-4">
            <div className="border-b border-[#000000] pb-3 flex justify-between items-center text-caption-oryzo">
              <span className="font-bold text-[#000000]">MODEL BENCHMARK COMPARISON</span>
              <span className="text-[#4f3622]">ACCURACY & ROC-AUC</span>
            </div>

            <div className="overflow-x-auto border border-[#000000]">
              <table className="w-full text-left border-collapse text-legal-oryzo">
                <thead>
                  <tr className="border-b border-[#000000] bg-[#ffebd0] font-bold">
                    <th className="p-3">ALGORITHM</th>
                    <th className="p-3">ACCURACY</th>
                    <th className="p-3">ROC-AUC</th>
                    <th className="p-3">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#000000]/30 text-[#000000]">
                  {modelComparison.map((m) => (
                    <tr key={m.name} className={m.status === 'ACTIVE' ? 'bg-[#ffebd0]' : ''}>
                      <td className="p-3 font-bold">{m.name}</td>
                      <td className="p-3 font-bold text-[#b8755b]">{m.accuracy}</td>
                      <td className="p-3">{m.rocAuc}</td>
                      <td className="p-3">{m.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 04. FORMULATION & MATHEMATICS */}
        <div className="border border-[#000000] bg-[#fff8e9] p-6 space-y-3 font-sans">
          <h3 className="text-heading-sm font-bold text-[#000000] font-sans border-b border-[#000000] pb-2 uppercase">
            XGBoost Formulation Mathematics
          </h3>
          <div className="p-4 border border-[#000000] bg-[#ffebd0] font-mono text-legal-oryzo space-y-2">
            <div className="text-heading-sm font-bold text-[#000000]">
              F_m(x) = F_(m-1)(x) + η f_m(x)
            </div>
            <p className="text-body-oryzo font-sans text-[#4f3622]">
              Sequential boosting iteration where each tree f_m fits residual gradients weighted by learning rate η.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { services } from '@/services/providerRegistry';

export const MLIntelligenceSection: React.FC = () => {
  const modelMeta = services.mlProvider.getModelMetadata();

  const pipelineSteps = [
    { label: 'RAW SENSOR DATA', desc: 'ADC voltage from ESP32 transducers' },
    { label: 'CALIBRATION', desc: 'Unit conversion (microstrain, g, °C)' },
    { label: 'NORMALIZATION', desc: 'Baseline ratio & Z-Score transform' },
    { label: 'REFERENCE DEVIATION', desc: 'Relative delta calculation' },
    { label: 'XGBOOST ENSEMBLE', desc: 'Multi-axis decision trees' },
    { label: 'ANOMALY PROBABILITY', desc: 'Sigmoidal probability score' },
    { label: 'HEALTH SCORE', desc: 'Inverted structural index' },
    { label: 'RISK CLASSIFICATION', desc: 'Tiered structural alert' },
    { label: 'REPORT GENERATION', desc: 'Automated engineering report' },
  ];

  return (
    <section id="ml" className="w-full min-h-screen bg-[#100904] text-[#ffedd7] px-6 md:px-16 py-24 border-b border-cork-dashed">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cork-dashed pb-4">
          <div>
            <span className="text-caption-oryzo text-[#dc5000] tracking-widest block">
              SECTION 08 // MODEL ARCHITECTURE & BENCHMARKS
            </span>
            <h2 className="text-heading text-[#ffedd7]">
              MODEL / INTELLIGENCE PIPELINE
            </h2>
          </div>
          <div className="text-legal-oryzo text-[#dc5000] border border-[#dc5000]/40 px-3 py-1 rounded-full">
            PROTOTYPE / DATASET VALIDATION METRICS ONLY
          </div>
        </div>

        {/* Model Core Specification Card */}
        <div className="oryzo-card bg-[#382416]/30 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 text-caption-oryzo">
          <div>
            <span className="block text-legal-oryzo text-[#6c5f51]">PRIMARY MODEL</span>
            <span className="text-[#ffedd7] font-bold">{modelMeta.primaryModel}</span>
          </div>
          <div>
            <span className="block text-legal-oryzo text-[#6c5f51]">LEARNING TASK</span>
            <span className="text-[#ffedd7]">{modelMeta.task}</span>
          </div>
          <div>
            <span className="block text-legal-oryzo text-[#6c5f51]">TARGET VARIABLE</span>
            <span className="text-[#ffedd7] font-mono">{modelMeta.target}</span>
          </div>
          <div>
            <span className="block text-legal-oryzo text-[#6c5f51]">FEATURE SPACE</span>
            <span className="text-[#ffedd7]">{modelMeta.featuresCount} SENSOR CHANNELS</span>
          </div>
          <div>
            <span className="block text-legal-oryzo text-[#6c5f51]">OUTPUT</span>
            <span className="text-[#dc5000] font-bold">ANOMALY PROBABILITY (0-100%)</span>
          </div>
        </div>

        {/* Visual Pipeline Representation */}
        <div className="space-y-4">
          <span className="text-caption-oryzo text-[#ffedd7] font-semibold block">
            END-TO-END INFERENCE PIPELINE DATA FLOW
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-9 gap-2">
            {pipelineSteps.map((step, idx) => (
              <div
                key={step.label}
                className="p-3 rounded-lg bg-[#100904] border border-[#40372e] flex flex-col justify-between text-center relative group hover:border-[#dc5000] transition-colors"
              >
                <span className="text-legal-oryzo text-[#dc5000] font-mono font-bold block mb-1">
                  0{idx + 1}
                </span>
                <span className="text-legal-oryzo text-[#ffedd7] font-bold block leading-tight">
                  {step.label}
                </span>
                <span className="text-[9px] text-[#6c5f51] mt-2 block leading-none">
                  {step.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Model Benchmark Comparison Table */}
        <div className="space-y-4">
          <span className="text-caption-oryzo text-[#ffedd7] font-semibold block">
            CLASSIFIER MODEL PERFORMANCE COMPARISON MATRIX
          </span>
          <div className="overflow-x-auto border border-[#40372e] rounded-xl bg-[#100904]">
            <table className="w-full text-left border-collapse font-mono text-sm">
              <thead>
                <tr className="border-b border-[#40372e] bg-[#382416]/50 text-caption-oryzo text-[#ffedd7]">
                  <th className="p-4 font-semibold">MODEL ALGORITHM</th>
                  <th className="p-4 font-semibold">ACCURACY</th>
                  <th className="p-4 font-semibold">ROC-AUC</th>
                  <th className="p-4 font-semibold">F1 SCORE</th>
                  <th className="p-4 font-semibold">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#40372e]/60">
                {modelMeta.modelsComparison.map((m) => (
                  <tr key={m.name} className="hover:bg-[#382416]/30">
                    <td className="p-4 text-[#ffedd7] font-sans font-bold">{m.name}</td>
                    <td className="p-4 text-[#ffedd7]">{(m.accuracy * 100).toFixed(1)}%</td>
                    <td className="p-4 text-[#ffedd7]">{m.rocAuc.toFixed(3)}</td>
                    <td className="p-4 text-[#ffedd7]">{m.f1Score.toFixed(3)}</td>
                    <td className="p-4">
                      <span className={`text-legal-oryzo px-3 py-1 rounded-full ${
                        m.status.includes('ACTIVE')
                          ? 'bg-[#dc5000]/20 text-[#dc5000] border border-[#dc5000]'
                          : 'bg-[#382416] text-[#6c5f51]'
                      }`}>
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

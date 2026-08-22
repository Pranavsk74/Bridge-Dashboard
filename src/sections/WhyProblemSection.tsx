import React from 'react';
import { Activity, Layers, Cpu, ShieldCheck } from 'lucide-react';

export const WhyProblemSection: React.FC = () => {
  const panels = [
    {
      id: '01',
      title: 'CONTINUOUS TELEMETRY STREAM',
      subtitle: 'Capture micro-behavior between annual inspection cycles.',
      description: 'Transducers log 50Hz strain and vibration readings continuously, eliminating silent degradation blind spots.',
      icon: Activity,
    },
    {
      id: '02',
      title: 'MULTI-SENSOR VECTOR CONTEXT',
      subtitle: 'Correlate flexural strain, resonance, tilt, and deck temperature.',
      description: 'Single-sensor spikes are cross-validated against multi-axis environmental factors to eliminate false alarms.',
      icon: Layers,
    },
    {
      id: '03',
      title: 'ML-BASED DECISION SUPPORT',
      subtitle: 'Supervised XGBoost gradient boosting ensemble.',
      description: 'Machine learning flags complex non-linear anomaly patterns across 10 structural channels simultaneously.',
      icon: Cpu,
    },
    {
      id: '04',
      title: 'PRIORITIZED FIELD DISPATCH',
      subtitle: 'Targeted NDT engineering resource deployment.',
      description: 'Civil authorities receive prioritized inspection alerts identifying exact structural spans requiring attention.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="w-full min-h-screen bg-[#120B07] text-[#FFF1DE] px-6 md:px-16 py-24 border-b border-cork-dashed">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="text-caption-oryzo text-[#D95A0B] tracking-widest font-bold">
            SECTION 03 // WHY CONTINUOUS MONITORING?
          </div>
          <h2 className="text-heading text-[#FFF1DE]">
            ML-BASED DECISION SUPPORT
          </h2>
          <p className="text-subheading text-[#D6C6B3]">
            TRANSFORMING PASSIVE INFRASTRUCTURE INTO ACTIVE INTELLIGENCE.
          </p>
        </div>

        {/* 4 Technical Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {panels.map((panel) => {
            const Icon = panel.icon;
            return (
              <div
                key={panel.id}
                className="oryzo-card flex flex-col justify-between hover:border-[#FFF1DE] transition-all space-y-6 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-legal-oryzo text-[#D95A0B] font-mono font-bold">
                      PANEL // {panel.id}
                    </span>
                    <Icon className="w-5 h-5 text-[#A38F7C] group-hover:text-[#FFF1DE] transition-colors" />
                  </div>
                  <h3 className="text-caption-oryzo text-[#FFF1DE] font-bold mb-2">
                    {panel.title}
                  </h3>
                  <p className="text-xs text-[#A38F7C] font-mono mb-4 leading-normal">
                    {panel.subtitle}
                  </p>
                  <p className="text-xs text-[#FFF1DE]/80 leading-relaxed">
                    {panel.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-cork-dashed text-legal-oryzo text-[#A38F7C]">
                  DECISION SUPPORT // NON-REPLACEMENT
                </div>
              </div>
            );
          })}
        </div>

        {/* Framing Banner */}
        <div className="p-6 rounded-xl bg-[#21150E] border border-[#584538] flex flex-col md:flex-row items-center justify-between gap-4 text-caption-oryzo">
          <span className="text-[#FFF1DE]">
            NOTE: CLAUDE'S PLAN OPERATES AS AN <strong>ML-BASED DECISION SUPPORT SYSTEM</strong> TO EMPOWER QUALIFIED CIVIL ENGINEERS, NOT REPLACE THEM.
          </span>
          <span className="text-[#D95A0B] border border-[#D95A0B]/40 px-4 py-1.5 rounded-full text-legal-oryzo">
            ENGINEERING VALIDATION MANDATORY
          </span>
        </div>
      </div>
    </section>
  );
};

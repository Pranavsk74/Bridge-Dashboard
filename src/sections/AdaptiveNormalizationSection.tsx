import React from 'react';
import { SensorReading } from '@/models/types';

interface AdaptiveNormalizationSectionProps {
  reading: SensorReading;
}

export const AdaptiveNormalizationSection: React.FC<AdaptiveNormalizationSectionProps> = ({ reading }) => {
  const strainVal = reading.strain_microstrain;
  const refVal = 500;
  const ratio = (strainVal / refVal).toFixed(2);
  const devPct = (((strainVal - refVal) / refVal) * 100).toFixed(1);
  const zScore = (((strainVal - refVal) / (refVal * 0.15))).toFixed(2);

  return (
    <section className="w-full bg-[#2f2116] text-[#ffebd0] py-24 px-6 md:px-10 border-b border-[#4f3622] bg-cad-grid-dark">
      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-caption-oryzo text-[#fee197] font-mono tracking-wider block">
            BASELINE MATHEMATICS // ADAPTIVE REFERENCE SCALING
          </span>
          <h2 className="text-display text-[#ffebd0] font-medium">
            ADAPTIVE BASELINE NORMALIZATION
          </h2>
          <p className="text-subheading text-[#ffebd0]/80">
            EVALUATING SENSOR SIGNAL DEVIATION RELATIVE TO LEARNED REFERENCE PROFILE.
          </p>
        </div>

        {/* Engineering Notebook Sheet Styling */}
        <div className="p-8 border border-[#4f3622] bg-[#2f2116] space-y-8">
          <div className="border-b border-[#4f3622] pb-3 flex items-center justify-between font-mono text-caption-oryzo">
            <span className="text-[#fee197] font-medium">ENGINEERING NOTEBOOK // FORMULA SPECIFICATION</span>
            <span className="text-[#987f61]">DRAFTING NOTE #409</span>
          </div>

          <blockquote className="text-body-oryzo text-[#ffebd0] font-normal leading-relaxed italic border-l-2 border-[#fee197] pl-4">
            "Current sensor behavior is evaluated relative to the bridge's reference operating profile rather than relying purely on static failure thresholds."
          </blockquote>

          {/* Mathematical Transformation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center font-mono">
            <div className="p-4 border border-[#4f3622] bg-[#2f2116]">
              <span className="text-legal-oryzo text-[#987f61] block mb-1">01 CURRENT SIGNAL</span>
              <span className="text-subheading text-[#ffebd0] font-medium">{strainVal} µε</span>
            </div>

            <div className="p-4 border border-[#4f3622] bg-[#2f2116]">
              <span className="text-legal-oryzo text-[#987f61] block mb-1">02 BASELINE REFERENCE</span>
              <span className="text-subheading text-[#ffebd0]">{refVal} µε</span>
            </div>

            <div className="p-4 border border-[#4f3622] bg-[#2f2116]">
              <span className="text-legal-oryzo text-[#987f61] block mb-1">03 RELATIVE RATIO</span>
              <span className="text-subheading text-[#fee197] font-medium">{ratio}×</span>
            </div>

            <div className="p-4 border border-[#4f3622] bg-[#2f2116]">
              <span className="text-legal-oryzo text-[#987f61] block mb-1">04 DEVIATION %</span>
              <span className={`text-subheading font-medium ${Number(devPct) >= 0 ? 'text-[#fee197]' : 'text-[#ffebd0]'}`}>
                {Number(devPct) >= 0 ? `+${devPct}%` : `${devPct}%`}
              </span>
            </div>

            <div className="p-4 border border-[#4f3622] bg-[#2f2116]">
              <span className="text-legal-oryzo text-[#987f61] block mb-1">05 Z-SCORE TRANSFORM</span>
              <span className="text-subheading text-[#ffebd0] font-medium">{zScore}σ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

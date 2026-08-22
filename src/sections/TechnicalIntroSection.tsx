import React from 'react';
import { SensorReading } from '@/models/types';
import { BridgeVisualizer } from '@/components/BridgeVisualizer';

interface TechnicalIntroSectionProps {
  reading: SensorReading;
}

export const TechnicalIntroSection: React.FC<TechnicalIntroSectionProps> = ({ reading }) => {
  return (
    <section id="intro" className="w-full min-h-screen bg-[#100904] text-[#ffedd7] px-6 md:px-16 py-24 flex flex-col justify-between border-b border-cork-dashed">
      {/* Top Header Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        {/* Left Column - Display Headline */}
        <div className="lg:col-span-6 space-y-4">
          <div className="text-caption-oryzo text-[#dc5000] tracking-widest">
            SECTION 01 // TECHNICAL INTRODUCTION
          </div>
          <h2 className="text-heading text-[#ffedd7] leading-none">
            BRIDGE//SENSE
          </h2>
          <p className="text-subheading text-[#6c5f51] tracking-wider">
            FROM SENSOR SIGNAL TO STRUCTURAL INSIGHT.
          </p>
          <div className="h-[1px] w-24 bg-[#40372e] my-6" />
          <p className="text-legal-oryzo text-[#6c5f51] tracking-widest">
            ESP32 HARDWARE ARRAY → CALIBRATION → GRADIENT BOOSTING → REALTIME INSIGHT
          </p>
        </div>

        {/* Right Column - ORYZO Signature 29px Mixed-Case Body Copy */}
        <div className="lg:col-span-6 space-y-6">
          <p className="text-body-oryzo text-[#ffedd7] font-normal leading-relaxed">
            Bridge structures operate under continuous dynamic stress. Bridge//Sense replaces reactive periodic inspections with an intelligent, adaptive monitoring matrix. Every micro-strain variation, pier tilt, and harmonic resonance is transformed into predictive health scores.
          </p>
          <div className="flex items-center space-x-6 text-caption-oryzo text-[#6c5f51]">
            <span className="border-b border-[#40372e] pb-1">10 SENSOR CHANNELS</span>
            <span className="border-b border-[#40372e] pb-1">XGBoost ENSEMBLE</span>
            <span className="border-b border-[#40372e] pb-1">ADAPTIVE BASELINE</span>
          </div>
        </div>
      </div>

      {/* Centerpiece - Museum Grade Physical Artifact Presentation */}
      <div className="max-w-7xl mx-auto w-full">
        <BridgeVisualizer reading={reading} />
      </div>

      {/* Footer Specs Bar */}
      <div className="max-w-7xl mx-auto w-full mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-cork-dashed text-caption-oryzo text-[#6c5f51]">
        <div>
          <span className="block text-legal-oryzo text-[#6c5f51]">STRUCTURAL PROFILE</span>
          <span className="text-[#ffedd7]">CABLE-STAYED GIRDER</span>
        </div>
        <div>
          <span className="block text-legal-oryzo text-[#6c5f51]">ANOMALY ALGORITHM</span>
          <span className="text-[#ffedd7]">XGBOOST CLASSIFIER</span>
        </div>
        <div>
          <span className="block text-legal-oryzo text-[#6c5f51]">TELEMETRY LATENCY</span>
          <span className="text-[#ffedd7]">&lt; 50ms SAMPLING</span>
        </div>
        <div>
          <span className="block text-legal-oryzo text-[#6c5f51]">INTEGRATION LAYER</span>
          <span className="text-[#dc5000]">MOCK PROVIDER ACTIVE</span>
        </div>
      </div>
    </section>
  );
};

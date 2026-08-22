import React from 'react';
import { Layers, Activity, ShieldCheck } from 'lucide-react';

export const StructuralObservationSection: React.FC = () => {
  return (
    <section className="w-full bg-[#ffebd0] text-[#000000] py-24 px-6 md:px-10 border-b border-[#000000] bg-cad-grid-light">
      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#000000] pb-4">
          <div>
            <span className="text-caption-oryzo font-mono text-[#4f3622] tracking-wider block">
              FIELD OBSERVATION STUDY // DYNAMIC STRUCTURAL RESPONSE
            </span>
            <h2 className="text-display text-[#000000] font-medium">
              CONTINUOUS STRUCTURAL OBSERVATION
            </h2>
          </div>
          <div className="text-legal-oryzo font-mono text-[#4f3622]">
            STRUCTURAL METRICS // EDITION 2026
          </div>
        </div>

        {/* Architectural 2-Column Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border border-[#000000] bg-[#fff8e9] p-8">
          {/* Left Text Column */}
          <div className="md:col-span-6 space-y-4 font-sans">
            <span className="text-caption-oryzo font-mono text-[#4f3622] block uppercase">
              TRAFFIC LOAD & DYNAMIC HARMONICS STUDY
            </span>
            <h3 className="text-heading text-[#000000] font-medium">
              BRIDGING THE OBSERVATION GAP
            </h3>
            <p className="text-body-oryzo text-[#000000]/90 leading-relaxed">
              Heavy freight traffic and environmental thermal expansion generate multi-axis harmonic vibrations. Continuous transducer telemetry translates structural flexure into real-time risk scores.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4 font-mono text-legal-oryzo border-t border-[#000000]/20">
              <div>
                <span className="block text-[#4f3622] uppercase">OBSERVATION FREQUENCY</span>
                <span className="text-[#000000] font-medium">50 SAMPLES / SEC</span>
              </div>
              <div>
                <span className="block text-[#4f3622] uppercase">TELEMETRY CHANNELS</span>
                <span className="text-[#000000] font-medium">10 TRANSDUCERS</span>
              </div>
            </div>
          </div>

          {/* Right Architectural Diagram Panel */}
          <div className="md:col-span-6 border border-[#000000] bg-[#ffebd0] p-6 space-y-4 font-mono">
            <div className="flex items-center justify-between border-b border-[#000000] pb-2 text-legal-oryzo">
              <span className="font-medium text-[#000000]">FIGURE 2.0 // DEVIATION VECTOR</span>
              <span className="text-[#4f3622]">CAD-SCHEMATIC</span>
            </div>

            <div className="space-y-3 text-legal-oryzo">
              <div className="flex items-center justify-between p-3 border border-[#000000] bg-[#fff8e9]">
                <div className="flex items-center space-x-3">
                  <Layers className="w-4 h-4 text-[#000000]" />
                  <span>DECK FLEXURAL STRAIN</span>
                </div>
                <span className="font-medium">53.59 µε</span>
              </div>

              <div className="flex items-center justify-between p-3 border border-[#000000] bg-[#fff8e9]">
                <div className="flex items-center space-x-3">
                  <Activity className="w-4 h-4 text-[#000000]" />
                  <span>VIBRATION HARMONIC RMS</span>
                </div>
                <span className="font-medium">0.0036 g</span>
              </div>

              <div className="flex items-center justify-between p-3 border border-[#000000] bg-[#fff8e9]">
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="w-4 h-4 text-[#000000]" />
                  <span>DECK DISPLACEMENT METRIC</span>
                </div>
                <span className="font-medium">1.82 mm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

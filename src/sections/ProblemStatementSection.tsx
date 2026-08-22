import React from 'react';
import { AlertCircle, Clock, ShieldAlert, ArrowRight } from 'lucide-react';

export const ProblemStatementSection: React.FC = () => {
  return (
    <section id="problem" className="w-full bg-[#ffebd0] text-[#000000] py-24 px-6 md:px-10 border-b border-[#000000] bg-newspaper-canvas">
      <div className="max-w-[1200px] mx-auto space-y-12 font-serif">
        {/* Masthead Header Rule */}
        <div className="border-b-2 border-[#000000] pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4 font-mono text-legal-oryzo text-[#4f3622]">
          <div>
            <span className="font-bold text-[#000000]">ENGINEERING JOURNAL // EDITION 2026</span>
            <span className="block text-[11px]">STRUCTURAL AUDIT & REGULATORY DISCLOSURE</span>
          </div>
          <div>VOL. 42 // FIELD OBSERVATION DOSSIER</div>
        </div>

        {/* Newspaper Serif Headline */}
        <div className="space-y-4 max-w-4xl">
          <span className="text-caption-oryzo font-mono text-[#4f3622] tracking-wider block uppercase">
            STRUCTURAL DEGRADATION INSIGHT
          </span>
          <h2 className="text-display text-[#000000] font-serif font-medium leading-tight">
            THE PROBLEM BETWEEN INSPECTIONS
          </h2>
          <p className="text-subheading text-[#4f3622] font-serif italic">
            Physical bridge inspections occur every 12 to 24 months. Structural behavior changes continuously between those cycles.
          </p>
        </div>

        {/* Editorial Pull Quote */}
        <div className="border-y border-[#000000] py-8 my-6 text-center">
          <blockquote className="text-heading text-[#000000] font-serif italic max-w-3xl mx-auto">
            "A structure can undergo significant mechanical changes long before the next scheduled physical inspection."
          </blockquote>
        </div>

        {/* Multi-Column Newspaper Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 font-sans text-body-oryzo text-[#000000]/90">
          <div className="space-y-3 border-l border-[#000000]/30 pl-6">
            <div className="font-mono text-caption-oryzo font-bold text-[#000000]">01 / INSPECTION LATENCY</div>
            <h3 className="font-serif font-bold text-heading-sm text-[#000000]">Periodic Cycle Gaps</h3>
            <p className="leading-relaxed">
              Standard regulatory inspections rely on visual assessments spaced up to two years apart, missing transient fatigue and environmental load spikes.
            </p>
          </div>

          <div className="space-y-3 border-l border-[#000000]/30 pl-6">
            <div className="font-mono text-caption-oryzo font-bold text-[#000000]">02 / TRANSIENT EXCITATION</div>
            <h3 className="font-serif font-bold text-heading-sm text-[#000000]">Unmonitored Strain Spikes</h3>
            <p className="leading-relaxed">
              Heavy freight traffic, thermal expansion, and pier tilt introduce flexural stress events that accumulate unrecorded between inspection dates.
            </p>
          </div>

          <div className="space-y-3 border-l border-[#000000]/30 pl-6">
            <div className="font-mono text-caption-oryzo font-bold text-[#000000]">03 / MODEL EVALUATION</div>
            <h3 className="font-serif font-bold text-heading-sm text-[#000000]">Continuous Assessment</h3>
            <p className="leading-relaxed">
              Integrating live transducer telemetry with supervised XGBoost decision trees provides continuous risk scoring to highlight early structural deviation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { SensorReading } from '@/models/types';
import { SENSOR_METADATA } from '@/services/providers/MockSensorProvider';

interface TelemetryNarrativeSectionProps {
  reading: SensorReading;
}

export const TelemetryNarrativeSection: React.FC<TelemetryNarrativeSectionProps> = ({ reading }) => {
  const [scrollStep, setScrollStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById('narrative-sticky-container');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll ratio within section
      const totalScroll = rect.height - windowHeight;
      if (totalScroll <= 0) return;
      
      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScroll));
      
      if (progress < 0.25) setScrollStep(0);
      else if (progress < 0.5) setScrollStep(1);
      else if (progress < 0.75) setScrollStep(2);
      else setScrollStep(3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const narrativeSteps = [
    {
      step: '01',
      title: 'PRIMARY FLEXURAL DECK INSPECTION',
      subtitle: 'STRAIN GAUGE & DISPLACEMENT LVDT',
      description: 'As heavy dynamic loads traverse the span, strain gauges evaluate tensile stress along lower girder flanges while LVDT laser sensors measure millimeter-scale sag.',
      activeKey: 'strain_microstrain',
      rotation: 0,
    },
    {
      step: '02',
      title: 'DYNAMIC HARMONIC VIBRATION SPECTRUM',
      subtitle: 'TRI-AXIAL ACCELEROMETER ARRAY',
      description: 'High-frequency accelerometers sample vertical and lateral vibration peaks. Fast Fourier Transforms isolate structural resonance frequency shifts.',
      activeKey: 'vibration_rms_g',
      rotation: 12,
    },
    {
      step: '03',
      title: 'SUB-STRUCTURE PIER INCLINATION',
      subtitle: 'BI-AXIAL ELECTRO-TILT INCLINOMETER',
      description: 'Precision inclinometers mounted to main concrete support piers measure angular inclination drift caused by foundation settlement or lateral tide thrust.',
      activeKey: 'tilt_deg',
      rotation: -10,
    },
    {
      step: '04',
      title: 'ENVIRONMENTAL & THERMAL EXPANSION',
      subtitle: 'EMBEDDED TEMPERATURE & HUMIDITY PROBES',
      description: 'Deck temperature variations drive natural thermal expansion. The baseline model accounts for ambient weather cycles to prevent false anomaly triggers.',
      activeKey: 'temp_deck_c',
      rotation: 5,
    },
  ];

  const currentNarrative = narrativeSteps[scrollStep];

  return (
    <div id="narrative-sticky-container" className="relative w-full h-[300vh] bg-[#100904] text-[#ffedd7]">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-between p-6 md:p-16 overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-cork-dashed pb-4 z-10">
          <div>
            <span className="text-caption-oryzo text-[#dc5000] tracking-widest block">
              SECTION 03 // SCROLL NARRATIVE
            </span>
            <h2 className="text-heading-sm text-[#ffedd7]">
              INSPECTING STRUCTURAL TELEMETRY
            </h2>
          </div>
          <div className="text-subheading font-mono text-[#dc5000]">
            STAGE {currentNarrative.step} / 04
          </div>
        </div>

        {/* Central Rotating Physical Artifact Container */}
        <div className="relative flex-1 flex items-center justify-center my-4">
          {/* Main Visual Representation */}
          <div
            className="w-full max-w-4xl aspect-[16/9] relative transition-transform duration-700 ease-out flex items-center justify-center"
            style={{ transform: `rotate(${currentNarrative.rotation}deg) scale(1.02)` }}
          >
            {/* SVG Engineering Model Focus */}
            <svg viewBox="0 0 800 350" className="w-full h-full">
              {/* Outer Reference Ring */}
              <circle cx="400" cy="175" r="160" stroke="#40372e" strokeWidth="1" strokeDasharray="6 6" fill="none" />
              <circle cx="400" cy="175" r="120" stroke="#382416" strokeWidth="1" fill="none" />

              {/* Girder Flange Cross Section Model */}
              <rect x="250" y="110" width="300" height="20" fill="#382416" stroke="#ffedd7" strokeWidth="1.5" />
              <rect x="380" y="130" width="40" height="90" fill="#382416" stroke="#ffedd7" strokeWidth="1.5" />
              <rect x="250" y="220" width="300" height="20" fill="#382416" stroke="#ffedd7" strokeWidth="1.5" />

              {/* Dynamic Target Point */}
              <circle cx="400" cy="175" r="8" fill="#dc5000" className="animate-pulse" />
              <circle cx="400" cy="175" r="22" stroke="#dc5000" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />

              {/* Telemetry Vector Annotations */}
              <line x1="400" y1="175" x2="560" y2="90" stroke="#dc5000" strokeWidth="1.5" strokeDasharray="4 2" />
              <circle cx="560" cy="90" r="4" fill="#dc5000" />
            </svg>

            {/* Floating Live Telemetry Callout Card */}
            <div className="absolute top-8 right-8 bg-[#100904]/90 border border-[#dc5000] p-4 rounded-xl space-y-1 shadow-2xl backdrop-blur-md">
              <span className="text-legal-oryzo text-[#dc5000] block tracking-widest">ACTIVE TRANSDUCER</span>
              <span className="text-caption-oryzo text-[#ffedd7] block font-bold">
                {SENSOR_METADATA[currentNarrative.activeKey as keyof typeof SENSOR_METADATA]?.name}
              </span>
              <div className="text-subheading font-mono text-[#ffedd7]">
                {reading[currentNarrative.activeKey as keyof SensorReading]} {SENSOR_METADATA[currentNarrative.activeKey as keyof typeof SENSOR_METADATA]?.unit}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Technical Narrative Explainer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-6 border-t border-cork-dashed z-10">
          <div className="lg:col-span-8 space-y-2">
            <span className="text-caption-oryzo text-[#dc5000] tracking-widest block">
              {currentNarrative.subtitle}
            </span>
            <h3 className="text-heading-sm text-[#ffedd7]">
              {currentNarrative.title}
            </h3>
            <p className="text-sm text-[#ffedd7]/80 leading-relaxed max-w-3xl">
              {currentNarrative.description}
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-end">
            <div className="flex items-center space-x-2 text-legal-oryzo text-[#6c5f51]">
              <span>SCROLL TO INSPECT NEXT STAGE</span>
              <div className="w-1.5 h-1.5 bg-[#dc5000] rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

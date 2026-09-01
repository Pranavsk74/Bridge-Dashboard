import React, { useState } from 'react';
import { SensorReading, Prediction } from '@/models/types';
import { SIMULATION_SCENARIOS } from '@/services/providers/MockSensorProvider';
import { BridgeVisualizer } from '@/components/BridgeVisualizer';
import { Sliders, Eye } from 'lucide-react';

interface BridgeSimulationSectionProps {
  reading: SensorReading;
  prediction: Prediction;
  onSelectScenario: (scenarioId: string) => void;
  onManualInputChange: (overrides: Partial<SensorReading>) => void;
  onRunAIAssessment?: () => void;
}

export const BridgeSimulationSection: React.FC<BridgeSimulationSectionProps> = ({
  reading,
  prediction,
  onSelectScenario,
  onManualInputChange,
}) => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('NORMAL');

  const handleScenarioClick = (id: string) => {
    setActiveScenarioId(id);
    onSelectScenario(id);
  };

  return (
    <section id="simulation" className="w-full bg-[#2f2116] text-[#ffebd0] py-24 px-6 md:px-10 border-b border-[#4f3622] bg-cad-grid-dark">
      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl font-serif">
          <span className="text-caption-oryzo text-[#fee197] font-mono tracking-wider block uppercase">
            PHYSICAL CAD ENGINE // STEP MODEL ASSEMBLY
          </span>
          <h2 className="text-display text-[#ffebd0] font-serif font-medium">
            3D STRUCTURAL SIMULATION
          </h2>
          <p className="text-subheading text-[#ffebd0]/80 font-serif">
            Interactive structural CAD model rendering continuous strain flexure, pier tilt inclination, and thermal deck mapping.
          </p>
        </div>

        {/* Live ML Reading Display connected to 3D Visualizer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 border border-[#fee197]/40 bg-[#3a291b] rounded-lg font-sans">
          <div className="space-y-1">
            <span className="text-legal-oryzo font-mono text-[#fee197] block uppercase font-bold">
              ML HEALTH SCORE
            </span>
            <div className="text-display font-bold text-[#ffebd0]">
              {prediction.healthScore} <span className="text-subheading text-[#ffebd0]/60">/ 100</span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-legal-oryzo font-mono text-[#fee197] block uppercase font-bold">
              ANOMALY PROBABILITY
            </span>
            <div className="text-display font-bold text-[#fee197]">
              {prediction.anomalyProbability}%
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-legal-oryzo font-mono text-[#fee197] block uppercase font-bold">
              RISK CLASSIFICATION
            </span>
            <div className="text-display font-bold text-[#ffebd0] uppercase">
              {prediction.riskLevel}
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-legal-oryzo font-mono text-[#fee197] block uppercase font-bold">
              DEFORMATION STATE
            </span>
            <div className="text-caption-oryzo font-mono text-[#ffebd0]/90">
              STRAIN: {reading.strain_microstrain} µε<br />
              TILT: {reading.tilt_deg}° · TEMP: {reading.temp_deck_c}°C
            </div>
          </div>
        </div>

        {/* 3D CAD Viewport Component */}
        <BridgeVisualizer reading={reading} />

        {/* Interactive 3D Model Control Sliders & Textboxes */}
        <div className="border border-[#4f3622] bg-[#281c12] p-6 space-y-6 font-mono rounded-lg">
          <div className="border-b border-[#4f3622] pb-3 flex justify-between items-center text-caption-oryzo">
            <span className="text-[#fee197] font-medium flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-[#fee197]" />
              <span>INTERACTIVE 3D CAD MODEL CONTROLS (TEXTBOX & SLIDER)</span>
            </span>
            <span className="text-[#987f61]">ADJUST TO WATCH 3D MODEL DEFORM & ML READINGS UPDATE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            {/* Flexural Strain */}
            <div className="bg-[#1c130c] border border-[#4f3622] p-4 rounded space-y-2">
              <div className="flex justify-between items-center font-mono text-legal-oryzo">
                <span className="text-[#fee197] font-bold">FLEXURAL STRAIN (µε)</span>
                <span className="text-[#ffebd0]">{reading.strain_microstrain} µε</span>
              </div>
              <input
                type="range"
                min="200"
                max="1000"
                step="10"
                value={reading.strain_microstrain}
                onChange={(e) => onManualInputChange({ strain_microstrain: parseFloat(e.target.value) })}
                className="w-full accent-[#fee197] cursor-pointer"
              />
              <input
                type="number"
                value={reading.strain_microstrain}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val)) onManualInputChange({ strain_microstrain: val });
                }}
                className="w-full bg-[#2f2116] border border-[#4f3622] text-[#ffebd0] px-3 py-1 font-mono text-caption-oryzo rounded focus:border-[#fee197] focus:outline-none"
              />
            </div>

            {/* Pier Tilt Angle */}
            <div className="bg-[#1c130c] border border-[#4f3622] p-4 rounded space-y-2">
              <div className="flex justify-between items-center font-mono text-legal-oryzo">
                <span className="text-[#fee197] font-bold">PIER TILT ANGLE (DEG)</span>
                <span className="text-[#ffebd0]">{reading.tilt_deg}°</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.8"
                step="0.01"
                value={reading.tilt_deg}
                onChange={(e) => onManualInputChange({ tilt_deg: parseFloat(e.target.value) })}
                className="w-full accent-[#fee197] cursor-pointer"
              />
              <input
                type="number"
                step="0.01"
                value={reading.tilt_deg}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val)) onManualInputChange({ tilt_deg: val });
                }}
                className="w-full bg-[#2f2116] border border-[#4f3622] text-[#ffebd0] px-3 py-1 font-mono text-caption-oryzo rounded focus:border-[#fee197] focus:outline-none"
              />
            </div>

            {/* Deck Temperature */}
            <div className="bg-[#1c130c] border border-[#4f3622] p-4 rounded space-y-2">
              <div className="flex justify-between items-center font-mono text-legal-oryzo">
                <span className="text-[#fee197] font-bold">DECK TEMP (°C)</span>
                <span className="text-[#ffebd0]">{reading.temp_deck_c}°C</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="0.5"
                value={reading.temp_deck_c}
                onChange={(e) => onManualInputChange({ temp_deck_c: parseFloat(e.target.value) })}
                className="w-full accent-[#fee197] cursor-pointer"
              />
              <input
                type="number"
                step="0.5"
                value={reading.temp_deck_c}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val)) onManualInputChange({ temp_deck_c: val });
                }}
                className="w-full bg-[#2f2116] border border-[#4f3622] text-[#ffebd0] px-3 py-1 font-mono text-caption-oryzo rounded focus:border-[#fee197] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Simulation Controls: Preset Physical Scenarios */}
        <div className="border border-[#4f3622] bg-[#2f2116] p-6 space-y-6 font-mono">
          <div className="border-b border-[#4f3622] pb-3 flex justify-between items-center text-caption-oryzo">
            <span className="text-[#fee197] font-medium flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-[#fee197]" />
              <span>PRESET PHYSICAL EXCITATION SCENARIOS</span>
            </span>
            <span className="text-[#987f61]">SELECT SCENARIO TO SIMULATE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SIMULATION_SCENARIOS.map((scenario) => {
              const isSelected = activeScenarioId === scenario.id;
              return (
                <button
                  key={scenario.id}
                  onClick={() => handleScenarioClick(scenario.id)}
                  className={`p-4 text-left border transition-all space-y-2 ${
                    isSelected
                      ? 'bg-[#000000] text-[#fee197] border-[#fee197]'
                      : 'bg-[#2f2116] text-[#ffebd0]/80 border-[#4f3622] hover:border-[#987f61]'
                  }`}
                >
                  <span className="text-caption-oryzo font-bold block">{scenario.name}</span>
                  <p className="text-legal-oryzo opacity-80 line-clamp-2">{scenario.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

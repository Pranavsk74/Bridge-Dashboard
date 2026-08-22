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

        {/* 3D CAD Viewport Component */}
        <BridgeVisualizer reading={reading} />

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

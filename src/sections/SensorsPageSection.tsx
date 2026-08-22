import React, { useState } from 'react';
import { SensorReading, Bridge, SensorKey } from '@/models/types';
import { SENSOR_METADATA } from '@/services/providers/MockSensorProvider';

interface SensorsPageSectionProps {
  bridge: Bridge;
  reading: SensorReading;
  history: SensorReading[];
}

export const SensorsPageSection: React.FC<SensorsPageSectionProps> = ({ bridge, reading, history }) => {
  const [selectedSensor, setSelectedSensor] = useState<SensorKey>('strain_microstrain');
  const meta = SENSOR_METADATA[selectedSensor];

  return (
    <section className="w-full min-h-screen bg-[#100904] text-[#ffedd7] px-6 md:px-16 py-24 border-b border-cork-dashed">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cork-dashed pb-4">
          <div>
            <span className="text-caption-oryzo text-[#dc5000] tracking-widest block">
              SECTION 07 // SENSOR SPECIFICATIONS & BRIDGE PROFILE
            </span>
            <h2 className="text-heading text-[#ffedd7]">
              SENSORS & BRIDGE PROFILE
            </h2>
          </div>
          <div className="text-legal-oryzo text-[#6c5f51]">
            TRANSDUCER DIRECTORY // HARDWARE REGISTER
          </div>
        </div>

        {/* Bridge Profile Metadata Card */}
        <div className="oryzo-card bg-[#382416]/20 space-y-6">
          <div className="text-caption-oryzo text-[#dc5000] tracking-widest border-b border-cork-dashed pb-2">
            PHYSICAL BRIDGE STRUCTURE METADATA
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-sm">
            <div>
              <span className="block text-legal-oryzo text-[#6c5f51]">BRIDGE ID</span>
              <span className="text-[#ffedd7] font-mono font-bold">{bridge.id}</span>
            </div>
            <div>
              <span className="block text-legal-oryzo text-[#6c5f51]">NAME & SPAN</span>
              <span className="text-[#ffedd7] font-bold">{bridge.name}</span>
            </div>
            <div>
              <span className="block text-legal-oryzo text-[#6c5f51]">LOCATION</span>
              <span className="text-[#ffedd7]">{bridge.location}</span>
            </div>
            <div>
              <span className="block text-legal-oryzo text-[#6c5f51]">CONSTRUCTION YEAR</span>
              <span className="text-[#ffedd7]">{bridge.yearBuilt} ({bridge.age} YRS)</span>
            </div>
            <div>
              <span className="block text-legal-oryzo text-[#6c5f51]">SUPERSTRUCTURE MATERIAL</span>
              <span className="text-[#ffedd7]">{bridge.material}</span>
            </div>
            <div>
              <span className="block text-legal-oryzo text-[#6c5f51]">LAST NDT AUDIT</span>
              <span className="text-[#ffedd7] font-mono">{bridge.lastInspection}</span>
            </div>
          </div>
        </div>

        {/* Sensor Detail Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sensors Selector List */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-legal-oryzo text-[#6c5f51] tracking-widest block mb-2">
              SELECT TRANSDUCER CHANNEL:
            </span>
            {(Object.keys(SENSOR_METADATA) as SensorKey[]).map((key) => {
              const sm = SENSOR_METADATA[key];
              const isSelected = selectedSensor === key;
              const val = reading[key];

              return (
                <button
                  key={key}
                  onClick={() => setSelectedSensor(key)}
                  className={`w-full text-left p-3 rounded-lg text-caption-oryzo border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#382416] border-[#ffedd7] text-[#ffedd7]'
                      : 'bg-[#100904] border-[#40372e] text-[#6c5f51] hover:text-[#ffedd7]'
                  }`}
                >
                  <span>{sm.name}</span>
                  <span className="font-mono">{val} {sm.unit}</span>
                </button>
              );
            })}
          </div>

          {/* Right Detailed Sensor Specification Card */}
          <div className="lg:col-span-8 oryzo-card space-y-6">
            <div className="flex items-center justify-between border-b border-cork-dashed pb-4">
              <div>
                <span className="text-legal-oryzo text-[#dc5000] tracking-widest block">
                  HARDWARE TRANSDUCER DOSSIER
                </span>
                <h3 className="text-heading-sm text-[#ffedd7]">
                  {meta.name} ({selectedSensor.toUpperCase()})
                </h3>
              </div>
              <span className="px-4 py-1.5 rounded-full text-legal-oryzo bg-[#382416] border border-[#40372e] text-[#ffedd7]">
                STATUS: MOCK TELEMETRY ACTIVE
              </span>
            </div>

            <p className="text-sm text-[#ffedd7]/80 leading-relaxed">
              {meta.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-[#100904] border border-[#40372e] font-mono text-sm">
              <div>
                <span className="block text-legal-oryzo text-[#6c5f51]">CURRENT VALUE</span>
                <span className="text-[#ffedd7] font-bold">{reading[selectedSensor]} {meta.unit}</span>
              </div>
              <div>
                <span className="block text-legal-oryzo text-[#6c5f51]">REFERENCE BASELINE</span>
                <span className="text-[#ffedd7]">{meta.reference} {meta.unit}</span>
              </div>
              <div>
                <span className="block text-legal-oryzo text-[#6c5f51]">WARNING THRESHOLD</span>
                <span className="text-[#dc5000]">{meta.warningThreshold} {meta.unit}</span>
              </div>
              <div>
                <span className="block text-legal-oryzo text-[#6c5f51]">CRITICAL THRESHOLD</span>
                <span className="text-[#dc5000] font-bold">{meta.criticalThreshold} {meta.unit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

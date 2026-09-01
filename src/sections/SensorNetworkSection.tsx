import React, { useRef } from 'react';
import { SensorReading, SensorKey } from '@/models/types';
import { SENSOR_METADATA } from '@/services/providers/MockSensorProvider';
import { Activity, Thermometer, Compass, Cpu, Gauge, Zap, Radio, Layers } from 'lucide-react';

interface SensorNetworkSectionProps {
  reading: SensorReading;
  onSelectSensor: (key: SensorKey) => void;
}

export const SensorNetworkSection: React.FC<SensorNetworkSectionProps> = ({ reading, onSelectSensor }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const sensorList: Array<{ key: SensorKey; icon: any; category: string }> = [
    { key: 'strain_microstrain', icon: Activity, category: 'MECHANICAL STRESS' },
    { key: 'vibration_rms_g', icon: Zap, category: 'DYNAMIC HARMONICS' },
    { key: 'vibration_peak_g', icon: Radio, category: 'DYNAMIC HARMONICS' },
    { key: 'vibration_dom_freq_hz', icon: Gauge, category: 'RESONANCE FREQUENCY' },
    { key: 'temp_deck_c', icon: Thermometer, category: 'ENVIRONMENTAL' },
    { key: 'temp_ambient_c', icon: Thermometer, category: 'ENVIRONMENTAL' },
    { key: 'humidity_pct', icon: Layers, category: 'ENVIRONMENTAL' },
    { key: 'displacement_mm', icon: Cpu, category: 'GEOMETRIC DEFORMATION' },
    { key: 'traffic_load_index', icon: Activity, category: 'AXLE VEHICLE LOAD' },
  ];

  return (
    <section id="sensors" className="w-full min-h-screen bg-[#100904] text-[#ffedd7] px-6 md:px-16 py-24 border-b border-cork-dashed">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="text-caption-oryzo text-[#dc5000] tracking-widest">
            SECTION 04 // SENSOR TRANSDUCER NETWORK (PROTOTYPE DEMO MODE)
          </div>
          <h2 className="text-heading text-[#ffedd7]">
            SENSOR TRANSDUCER NETWORK
          </h2>
          <p className="text-subheading text-[#6c5f51]">
            STANDALONE PROTOTYPE DEMO · DIRECT TEXTBOX & 3D SIMULATION INPUT CONTROL.
          </p>
        </div>

        {/* ESP32 Hardware Video / Visual Artifact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Embedded Real Hardware Video Component */}
          <div className="lg:col-span-6 relative aspect-video bg-[#100904] border border-[#40372e] rounded-xl overflow-hidden shadow-2xl group">
            <video
              ref={videoRef}
              src="/Esp 32 video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover filter brightness-95 contrast-105"
            />
            <div className="absolute top-4 left-4 bg-[#100904]/80 backdrop-blur-md border border-[#40372e] px-3 py-1 rounded-full text-legal-oryzo text-[#dc5000]">
              HARDWARE INPUT: DISABLED FOR PROTOTYPE DEMO
            </div>
          </div>

          {/* Mechanical Drawing Annotations & Specifications */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-caption-oryzo text-[#dc5000] tracking-widest">
              PROTOTYPE SENSOR SPECIFICATIONS
            </div>
            <h3 className="text-heading-sm text-[#ffedd7]">
              10-CHANNEL MULTI-SENSOR TRANSDUCER MATRIX
            </h3>
            <p className="text-sm text-[#ffedd7]/80 leading-relaxed">
              This system is running as an interactive prototype demo. Direct ESP32 hardware ingest is disabled; all multi-channel transducer telemetry is dynamically updated via text box inputs and 3D CAD simulation controls.
            </p>

            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#382416]/30 border border-[#40372e] text-caption-oryzo font-mono">
              <div>
                <span className="block text-legal-oryzo text-[#6c5f51]">INPUT MODE</span>
                <span className="text-[#ffedd7]">TEXTBOX & 3D CONTROLS</span>
              </div>
              <div>
                <span className="block text-legal-oryzo text-[#6c5f51]">ML SYNC</span>
                <span className="text-[#ffedd7]">REAL-TIME RE-ASSESSMENT</span>
              </div>
              <div>
                <span className="block text-legal-oryzo text-[#6c5f51]">ESP32 INGEST</span>
                <span className="text-[#dc5000]">DISABLED FOR DEMO</span>
              </div>
              <div>
                <span className="block text-legal-oryzo text-[#6c5f51]">HARDWARE STATUS</span>
                <span className="text-[#fee197]">PROTOTYPE DEMO ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* 10 Transducer Sensor Grid */}
        <div className="space-y-4">
          <span className="text-caption-oryzo text-[#ffedd7] font-semibold block">
            DEPLOYED TRANSDUCER CHANNELS (CLICK TO INSPECT DOSSIER):
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {sensorList.map((item, idx) => {
              const meta = SENSOR_METADATA[item.key];
              const val = reading[item.key];
              const isAbnormal = val >= meta.warningThreshold;
              const Icon = item.icon;

              return (
                <div
                  key={item.key}
                  onClick={() => onSelectSensor(item.key)}
                  className={`oryzo-card cursor-pointer transition-all duration-300 hover:border-[#ffedd7] flex flex-col justify-between group ${
                    isAbnormal ? 'border-[#dc5000] bg-[#382416]/40' : 'border-[#40372e]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-legal-oryzo text-[#6c5f51] tracking-widest">
                        CH-{String(idx + 1).padStart(2, '0')}
                      </span>
                      <Icon className={`w-4 h-4 ${isAbnormal ? 'text-[#dc5000]' : 'text-[#6c5f51] group-hover:text-[#ffedd7]'}`} />
                    </div>
                    <h3 className="text-caption-oryzo text-[#ffedd7] font-semibold mb-1">
                      {meta.name}
                    </h3>
                    <div className="text-legal-oryzo text-[#6c5f51] tracking-wider mb-4">
                      {item.category}
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-cork-dashed">
                    <div className="flex items-baseline justify-between">
                      <span className="text-legal-oryzo text-[#6c5f51]">CURRENT</span>
                      <span className={`text-subheading font-mono ${isAbnormal ? 'text-[#dc5000]' : 'text-[#ffedd7]'}`}>
                        {val} <span className="text-xs">{meta.unit}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-legal-oryzo text-[#6c5f51]">
                      <span>REF: {meta.reference} {meta.unit}</span>
                      <span>DEV: {(((val - meta.reference) / meta.reference) * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

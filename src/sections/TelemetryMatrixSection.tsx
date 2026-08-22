import React from 'react';
import { SensorReading, SensorKey } from '@/models/types';
import { SENSOR_METADATA } from '@/services/providers/MockSensorProvider';

interface TelemetryMatrixSectionProps {
  reading: SensorReading;
  onSelectSensor?: (key: SensorKey) => void;
}

export const TelemetryMatrixSection: React.FC<TelemetryMatrixSectionProps> = ({ reading, onSelectSensor }) => {
  const sensorKeys: SensorKey[] = [
    'strain_microstrain',
    'vibration_rms_g',
    'vibration_peak_g',
    'vibration_dom_freq_hz',
    'temp_deck_c',
    'temp_ambient_c',
    'humidity_pct',
    'displacement_mm',
    'traffic_load_index',
  ];

  return (
    <section className="w-full min-h-screen bg-[#100904] text-[#ffedd7] px-6 md:px-16 py-24 border-b border-cork-dashed">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-caption-oryzo text-[#dc5000] tracking-widest block">
              SECTION 04 // SENSOR DATA MATRIX
            </span>
            <h2 className="text-heading text-[#ffedd7]">
              10-FEATURE TELEMETRY MATRIX
            </h2>
          </div>
          <div className="text-legal-oryzo text-[#6c5f51]">
            NORMALIZATION MATRIX // REFERENCE BASELINE COMPARISON
          </div>
        </div>

        {/* Matrix Table Presentation */}
        <div className="overflow-x-auto border border-[#40372e] rounded-xl bg-[#100904]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#40372e] bg-[#382416]/50 text-caption-oryzo text-[#ffedd7]">
                <th className="p-4 font-semibold">SENSOR PARAMETER</th>
                <th className="p-4 font-semibold">CHANNEL ID</th>
                <th className="p-4 font-semibold">CURRENT VALUE</th>
                <th className="p-4 font-semibold">REFERENCE BASELINE</th>
                <th className="p-4 font-semibold">DEVIATION (%)</th>
                <th className="p-4 font-semibold">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#40372e]/60 text-sm font-mono">
              {sensorKeys.map((key, idx) => {
                const meta = SENSOR_METADATA[key];
                const currentVal = reading[key];
                const refVal = meta.reference;
                const devPct = (((currentVal - refVal) / refVal) * 100).toFixed(1);
                const isElevated = currentVal >= meta.warningThreshold;
                const isCritical = currentVal >= meta.criticalThreshold;

                let statusLabel = 'NOMINAL';
                let statusColor = 'text-[#ffedd7] bg-[#40372e]/40';
                if (isCritical) {
                  statusLabel = 'CRITICAL';
                  statusColor = 'text-[#dc5000] bg-[#dc5000]/20 border border-[#dc5000]';
                } else if (isElevated) {
                  statusLabel = 'ELEVATED';
                  statusColor = 'text-[#dc5000] bg-[#382416] border border-[#dc5000]/50';
                }

                return (
                  <tr
                    key={key}
                    onClick={() => onSelectSensor && onSelectSensor(key)}
                    className="hover:bg-[#382416]/30 cursor-pointer transition-colors"
                  >
                    <td className="p-4 text-[#ffedd7] font-sans font-medium">
                      {meta.name}
                      <span className="block text-legal-oryzo text-[#6c5f51] font-normal">
                        {meta.description}
                      </span>
                    </td>
                    <td className="p-4 text-[#6c5f51] text-xs">CH-{String(idx + 1).padStart(2, '0')}</td>
                    <td className="p-4 text-[#ffedd7] font-bold">
                      {currentVal} {meta.unit}
                    </td>
                    <td className="p-4 text-[#6c5f51]">
                      {refVal} {meta.unit}
                    </td>
                    <td className={`p-4 font-semibold ${Number(devPct) > 0 ? 'text-[#dc5000]' : 'text-[#ffedd7]'}`}>
                      {Number(devPct) >= 0 ? `+${devPct}%` : `${devPct}%`}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-legal-oryzo font-semibold ${statusColor}`}>
                        {statusLabel}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

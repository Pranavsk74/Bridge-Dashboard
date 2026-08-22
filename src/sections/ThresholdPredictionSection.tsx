import React, { useState } from 'react';
import { SensorReading, SensorKey } from '@/models/types';
import { SENSOR_METADATA } from '@/services/providers/MockSensorProvider';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from 'recharts';

interface ThresholdPredictionSectionProps {
  reading: SensorReading;
}

export const ThresholdPredictionSection: React.FC<ThresholdPredictionSectionProps> = ({ reading }) => {
  const [selectedSensor, setSelectedSensor] = useState<SensorKey>('strain_microstrain');
  const meta = SENSOR_METADATA[selectedSensor];
  const currentVal = reading[selectedSensor];
  const refVal = meta.reference;
  const devPct = (((currentVal - refVal) / refVal) * 100).toFixed(1);

  // Generate synthetic probability curve data points
  const curveData = [];
  const minVal = meta.reference * 0.6;
  const maxVal = meta.criticalThreshold * 1.4;
  const step = (maxVal - minVal) / 20;

  for (let i = 0; i <= 20; i++) {
    const val = Number((minVal + i * step).toFixed(2));
    const ratio = val / meta.reference;
    let prob = 100 / (1 + Math.exp(-4 * (ratio - 1.25)));
    prob = Math.min(99.9, Math.max(0.5, prob));
    curveData.push({
      value: val,
      anomalyProbability: Number(prob.toFixed(1)),
    });
  }

  return (
    <section className="w-full bg-[#2f2116] text-[#ffebd0] py-24 px-6 md:px-10 border-b border-[#4f3622] bg-cad-grid-dark">
      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#4f3622] pb-4">
          <div>
            <span className="text-caption-oryzo text-[#fee197] font-mono tracking-wider block">
              STATISTICAL BOUNDARIES // DATA-DERIVED THRESHOLDS
            </span>
            <h2 className="text-display text-[#ffebd0] font-medium">
              THRESHOLD PREDICTION CURVES
            </h2>
          </div>
          <div className="text-legal-oryzo font-mono text-[#987f61] border border-[#4f3622] px-3 py-1">
            DEMO MODEL OUTPUT / DATA-DERIVED
          </div>
        </div>

        {/* Controls & Metrics Header */}
        <div className="border border-[#4f3622] bg-[#2f2116] p-6 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#4f3622] pb-4">
            <div className="flex items-center space-x-3">
              <span className="text-caption-oryzo font-mono text-[#ffebd0]">SELECT PARAMETER:</span>
              <select
                value={selectedSensor}
                onChange={(e) => setSelectedSensor(e.target.value as SensorKey)}
                className="bg-[#2f2116] border border-[#4f3622] text-[#ffebd0] text-caption-oryzo px-4 py-1.5 font-mono focus:outline-none"
              >
                {(Object.keys(SENSOR_METADATA) as SensorKey[]).map((k) => (
                  <option key={k} value={k}>
                    {SENSOR_METADATA[k].name} ({k.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-6 font-mono text-legal-oryzo">
              <div>
                <span className="text-[#987f61] block">REFERENCE</span>
                <span className="text-[#ffebd0]">{refVal} {meta.unit}</span>
              </div>
              <div>
                <span className="text-[#987f61] block">CURRENT</span>
                <span className="text-[#ffebd0] font-medium">{currentVal} {meta.unit}</span>
              </div>
              <div>
                <span className="text-[#987f61] block">DEVIATION</span>
                <span className="text-[#fee197] font-medium">{devPct}%</span>
              </div>
            </div>
          </div>

          {/* Anomaly Probability Response Curve Graph */}
          <div className="space-y-2">
            <span className="text-caption-oryzo font-mono text-[#987f61] block">
              PARAMETER VALUE vs ANOMALY PROBABILITY RESPONSE:
            </span>
            <div className="w-full h-72 pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={curveData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="value" stroke="#987f61" fontSize={10} />
                  <YAxis stroke="#987f61" fontSize={10} unit="%" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#2f2116',
                      borderColor: '#4f3622',
                      borderRadius: '0px',
                      color: '#ffebd0',
                      fontFamily: 'monospace',
                    }}
                  />
                  <ReferenceLine x={meta.reference} stroke="#987f61" strokeDasharray="3 3" label={{ value: 'REF', fill: '#987f61', fontSize: 10 }} />
                  <ReferenceLine x={meta.warningThreshold} stroke="#fee197" strokeDasharray="3 3" label={{ value: 'WARN', fill: '#fee197', fontSize: 10 }} />
                  <ReferenceLine x={currentVal} stroke="#ffebd0" strokeWidth={2} label={{ value: 'CURRENT', fill: '#ffebd0', fontSize: 10 }} />
                  <Area type="monotone" dataKey="anomalyProbability" stroke="#fee197" fill="#fee197" fillOpacity={0.15} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { SensorReading, Prediction, Bridge, SensorKey } from '@/models/types';
import { SENSOR_METADATA } from '@/services/providers/MockSensorProvider';
import { apiClient } from '@/config/api';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { ShieldCheck, AlertTriangle, Play, Square, Pause, RotateCcw, Radio } from 'lucide-react';

interface LiveMonitoringSectionProps {
  bridge: Bridge;
  reading: SensorReading;
  history: SensorReading[];
  prediction: Prediction;
  onUpdateReading?: (overrides: Partial<SensorReading>) => void;
  onRunAIAssessment?: () => void;
}

export const LiveMonitoringSection: React.FC<LiveMonitoringSectionProps> = ({
  bridge,
  reading,
  history,
  prediction,
  onUpdateReading,
  onRunAIAssessment,
}) => {
  const [selectedChartKey, setSelectedChartKey] = useState<SensorKey>('strain_microstrain');
  const [displayHealthScore, setDisplayHealthScore] = useState(prediction.healthScore);
  const [isMonitoringActive, setIsMonitoringActive] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const connectionStatus = apiClient.getStatus(); // 'LIVE' | 'DEMO DATA'
  const isLiveConnected = connectionStatus === 'LIVE';

  useEffect(() => {
    let start = displayHealthScore;
    const end = prediction.healthScore;
    if (start === end) return;
    const duration = 600;
    const startTime = performance.now();

    const animateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      const current = Math.round(start + (end - start) * progress);
      setDisplayHealthScore(current);
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    requestAnimationFrame(animateCount);
  }, [prediction.healthScore]);

  const handleStartMonitoring = () => {
    setIsMonitoringActive(true);
    setIsPaused(false);
  };

  const handleStopMonitoring = () => {
    setIsMonitoringActive(false);
    setIsPaused(false);
  };

  const handleTogglePause = () => {
    if (isMonitoringActive) {
      setIsPaused(!isPaused);
    }
  };

  const handleResetTelemetry = () => {
    if (onUpdateReading) {
      onUpdateReading({
        strain_microstrain: 495,
        vibration_rms_g: 0.11,
        vibration_peak_g: 0.24,
        vibration_dom_freq_hz: 2.38,
        temp_deck_c: 27.5,
        temp_ambient_c: 25.8,
        tilt_deg: 0.04,
        humidity_pct: 64,
        displacement_mm: 1.75,
        traffic_load_index: 42,
      });
    }
  };

  const chartOptions: Array<{ key: SensorKey; label: string; strokeColor: string }> = [
    { key: 'strain_microstrain', label: 'Flexural Strain', strokeColor: '#fee197' },
    { key: 'vibration_rms_g', label: 'Vibration RMS', strokeColor: '#b8755b' },
    { key: 'tilt_deg', label: 'Pier Tilt Angle', strokeColor: '#c9a86a' },
    { key: 'displacement_mm', label: 'Deck Displacement', strokeColor: '#8fa7a8' },
    { key: 'temp_deck_c', label: 'Temperature', strokeColor: '#9da991' },
  ];

  const activeOption = chartOptions.find((o) => o.key === selectedChartKey) || chartOptions[0];
  const activeMeta = SENSOR_METADATA[selectedChartKey];

  return (
    <section id="monitor" className="w-full bg-[#2f2116] text-[#ffebd0] py-24 px-6 md:px-10 border-b border-[#4f3622] bg-cad-grid-dark font-sans">
      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Header & Connection Status Bar */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#4f3622] pb-4">
            <div>
              <span className="text-caption-oryzo text-[#fee197] tracking-wide block font-sans uppercase">
                MONITORING WORKSTATION
              </span>
              <h2 className="text-display text-[#ffebd0] font-serif font-medium">
                Live Structural Monitor
              </h2>
            </div>

            {/* Clearly Labeled Connection State Tag */}
            <div className="flex items-center space-x-3 bg-[#2f2116] px-4 py-2 border border-[#4f3622] text-legal-oryzo font-sans">
              <Radio className={`w-4 h-4 ${isLiveConnected ? 'text-[#9da991] animate-pulse' : 'text-[#fee197]'}`} />
              <span className="text-[#ffebd0] font-medium">
                STATUS: {isLiveConnected ? '● LIVE ESP32' : '● DEMO MODE / ESP32 OFFLINE'}
              </span>
            </div>
          </div>

          {/* Interactive Simulation Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 border border-[#4f3622] bg-[#2f2116] font-sans">
            <div className="flex items-center space-x-2 text-legal-oryzo">
              <button
                onClick={handleStartMonitoring}
                className={`px-3.5 py-1.5 border flex items-center space-x-1.5 transition-all ${
                  isMonitoringActive && !isPaused
                    ? 'bg-[#000000] text-[#fee197] border-[#fee197]'
                    : 'border-[#4f3622] text-[#ffebd0]/80 hover:text-[#ffebd0]'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>START</span>
              </button>

              <button
                onClick={handleTogglePause}
                className={`px-3.5 py-1.5 border flex items-center space-x-1.5 transition-all ${
                  isPaused
                    ? 'bg-[#000000] text-[#fee197] border-[#fee197]'
                    : 'border-[#4f3622] text-[#ffebd0]/80 hover:text-[#ffebd0]'
                }`}
              >
                <Pause className="w-3.5 h-3.5" />
                <span>{isPaused ? 'RESUME' : 'PAUSE'}</span>
              </button>

              <button
                onClick={handleStopMonitoring}
                className={`px-3.5 py-1.5 border flex items-center space-x-1.5 transition-all ${
                  !isMonitoringActive
                    ? 'bg-[#000000] text-[#b8755b] border-[#b8755b]'
                    : 'border-[#4f3622] text-[#ffebd0]/80 hover:text-[#ffebd0]'
                }`}
              >
                <Square className="w-3.5 h-3.5" />
                <span>STOP</span>
              </button>

              <button
                onClick={handleResetTelemetry}
                className="px-3.5 py-1.5 border border-[#4f3622] text-[#ffebd0]/80 hover:text-[#fee197] flex items-center space-x-1.5 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RESET</span>
              </button>
            </div>

            <div className="text-legal-oryzo text-[#ffebd0]/80">
              MODE: <span className="text-[#fee197] font-medium">{isMonitoringActive ? (isPaused ? 'PAUSED' : 'STREAMING DEMO') : 'STOPPED'}</span>
            </div>
          </div>

          {/* Bridge Identification & Context Strip */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 border border-[#4f3622] bg-[#2f2116] text-legal-oryzo font-sans">
            <div>
              <span className="block text-[#ffebd0]/60">BRIDGE ID</span>
              <span className="font-medium text-[#ffebd0] font-mono">{bridge.id}</span>
            </div>
            <div>
              <span className="block text-[#ffebd0]/60">LOCATION</span>
              <span className="text-[#ffebd0]">{bridge.location}</span>
            </div>
            <div>
              <span className="block text-[#ffebd0]/60">STRUCTURE</span>
              <span className="text-[#ffebd0]">{bridge.type}</span>
            </div>
            <div>
              <span className="block text-[#ffebd0]/60">DATA PROVIDER</span>
              <span className="text-[#fee197] font-medium">{isLiveConnected ? 'LIVE BACKEND' : 'DEMO PROVIDER'}</span>
            </div>
            <div>
              <span className="block text-[#ffebd0]/60">LAST UPDATE</span>
              <span className="text-[#ffebd0] font-mono">{reading.timestamp}</span>
            </div>
            <div>
              <span className="block text-[#ffebd0]/60">PRIMARY MODEL</span>
              <span className="font-medium text-[#ffebd0]">XGBOOST CLASSIFIER</span>
            </div>
          </div>
        </div>

        {/* Primary Health & Risk Metrics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border border-[#4f3622] bg-[#2f2116] divide-y md:divide-y-0 md:divide-x divide-[#4f3622] p-6 font-sans">
          <div className="space-y-2 pr-4">
            <span className="text-legal-oryzo text-[#ffebd0]/70 uppercase tracking-wider block">
              STRUCTURAL HEALTH SCORE
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="text-display font-medium text-[#ffebd0]">
                {displayHealthScore}
              </span>
              <span className="text-subheading text-[#ffebd0]/60">/ 100</span>
            </div>
          </div>

          <div className="space-y-2 md:pl-4 pr-4 pt-4 md:pt-0">
            <span className="text-legal-oryzo text-[#ffebd0]/70 uppercase tracking-wider block">
              ANOMALY PROBABILITY
            </span>
            <div className="text-display font-medium text-[#fee197]">
              {prediction.anomalyProbability}%
            </div>
          </div>

          <div className="space-y-2 md:pl-4 pr-4 pt-4 md:pt-0">
            <span className="text-legal-oryzo text-[#ffebd0]/70 uppercase tracking-wider block">
              RISK CLASSIFICATION
            </span>
            <div className="flex items-center space-x-3">
              <span className="text-heading font-medium text-[#ffebd0]">
                {prediction.riskLevel}
              </span>
              {prediction.riskLevel === 'LOW' ? (
                <ShieldCheck className="w-6 h-6 text-[#9da991]" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-[#b8755b]" />
              )}
            </div>
          </div>

          <div className="space-y-2 md:pl-4 pt-4 md:pt-0">
            <span className="text-legal-oryzo text-[#ffebd0]/70 uppercase tracking-wider block">
              MODEL CONFIDENCE
            </span>
            <div className="text-display font-medium text-[#ffebd0]">
              {prediction.confidence}%
            </div>
          </div>
        </div>

        {/* Live Telemetry Charts Console Grid */}
        <div className="border border-[#4f3622] bg-[#2f2116] p-6 space-y-6 font-sans">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#4f3622] pb-4">
            <div className="flex flex-wrap items-center gap-2">
              {chartOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setSelectedChartKey(opt.key)}
                  className={`px-3 py-1 text-legal-oryzo border transition-all ${
                    selectedChartKey === opt.key
                      ? 'bg-[#000000] text-[#fee197] border-[#fee197]'
                      : 'bg-[#2f2116] text-[#ffebd0]/70 border-[#4f3622] hover:text-[#ffebd0]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <span className="text-legal-oryzo text-[#ffebd0]/60">
              ACTIVE CHANNEL: {selectedChartKey.toUpperCase()}
            </span>
          </div>

          <div className="w-full h-80 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="#4f3622" strokeDasharray="2 2" vertical={false} opacity={0.4} />
                <XAxis dataKey="timestamp" stroke="#ffebd0" fontSize={10} tickLine={false} />
                <YAxis stroke="#ffebd0" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#2f2116',
                    borderColor: '#4f3622',
                    borderRadius: '0px',
                    color: '#ffebd0',
                    fontSize: '12px',
                    fontFamily: 'ModernEra, sans-serif',
                  }}
                />
                <ReferenceLine y={activeMeta.reference} stroke="#ffebd0" strokeDasharray="4 4" label={{ value: `REF`, fill: '#ffebd0', fontSize: 10 }} />
                <ReferenceLine y={activeMeta.warningThreshold} stroke="#fee197" strokeDasharray="4 4" label={{ value: `WARN`, fill: '#fee197', fontSize: 10 }} />
                <Line type="monotone" dataKey={selectedChartKey} stroke={activeOption.strokeColor} strokeWidth={2} dot={false} activeDot={{ r: 5, fill: activeOption.strokeColor }} isAnimationActive={true} animationDuration={600} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

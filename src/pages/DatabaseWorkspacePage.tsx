import React, { useState } from 'react';
import { Bridge, SensorReading } from '@/models/types';
import { edaService, BoxPlotStats } from '@/services/edaService';
import { bridgeDataService } from '@/services/bridgeDataService';
import { Database, BarChart2, Grid, Table, Download, MapPin } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface DatabaseWorkspacePageProps {
  bridge: Bridge;
  reading: SensorReading;
  history: SensorReading[];
}

export const DatabaseWorkspacePage: React.FC<DatabaseWorkspacePageProps> = ({
  bridge,
  reading,
  history,
}) => {
  const [activeTab, setActiveTab] = useState<'EDA' | 'HEATMAP' | 'RECORDS'>('EDA');

  const bridges = bridgeDataService.getBridges();
  const corrPoints = edaService.getCorrelationMatrix();
  const boxStats: BoxPlotStats[] = edaService.getBoxPlotData();

  // Histogram telemetry distribution data
  const strainDistData = [
    { range: '400-450 µε', count: 142, category: 'NOMINAL' },
    { range: '450-500 µε', count: 580, category: 'NOMINAL' },
    { range: '500-550 µε', count: 320, category: 'NOMINAL' },
    { range: '550-600 µε', count: 95, category: 'ELEVATED' },
    { range: '600-650 µε', count: 28, category: 'WATCH' },
    { range: '650+ µε', count: 8, category: 'CRITICAL' },
  ];

  return (
    <div className="w-full bg-[#ffebd0] text-[#000000] space-y-0 min-h-screen bg-cad-grid-light">
      {/* 01. DATABASE HEADER */}
      <div className="bg-[#ffebd0] border-b border-[#000000] px-6 md:px-10 pt-28 pb-8">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <span className="text-caption-oryzo text-[#4f3622] font-mono tracking-wider block uppercase">
              DATA ARCHIVE // EXPLORATORY DATA ANALYSIS (EDA)
            </span>
            <h1 className="text-display text-[#000000] font-serif font-medium">
              Database & Structural Exploration
            </h1>
            <p className="text-subheading text-[#4f3622] font-serif">
              Statistical telemetry distributions, correlation heatmaps, and field bridge archives.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center space-x-2 font-mono text-legal-oryzo">
            {(['EDA', 'HEATMAP', 'RECORDS'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 border transition-all ${
                  activeTab === tab
                    ? 'bg-[#000000] text-[#ffebd0] border-[#000000]'
                    : 'bg-[#fff8e9] text-[#4f3622] border-[#000000] hover:text-[#000000]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 02. MAIN CONTENT AREA */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 space-y-12">
        {/* SUMMARY STATS BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border border-[#000000] bg-[#fff8e9] p-6 font-mono text-center">
          <div>
            <span className="block text-legal-oryzo text-[#4f3622] uppercase">TOTAL RECORDS</span>
            <span className="text-display font-bold text-[#000000]">1,280,000</span>
          </div>
          <div>
            <span className="block text-legal-oryzo text-[#4f3622] uppercase">FIELD BRIDGES</span>
            <span className="text-display font-bold text-[#000000]">{bridges.length}</span>
          </div>
          <div>
            <span className="block text-legal-oryzo text-[#4f3622] uppercase">ANOMALY EVENTS</span>
            <span className="text-display font-bold text-[#b8755b]">4.2%</span>
          </div>
          <div>
            <span className="block text-legal-oryzo text-[#4f3622] uppercase">DATA COMPLETENESS</span>
            <span className="text-display font-bold text-[#9da991]">99.8%</span>
          </div>
        </div>

        {activeTab === 'EDA' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-mono">
            {/* Strain Distribution Histogram */}
            <div className="lg:col-span-6 border border-[#000000] bg-[#fff8e9] p-6 space-y-4">
              <div className="border-b border-[#000000] pb-3 flex justify-between items-center text-caption-oryzo">
                <span className="font-bold text-[#000000]">STRUCTURAL STRAIN DISTRIBUTION</span>
                <span className="text-[#4f3622]">HISTOGRAM</span>
              </div>
              <div className="w-full h-64 pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={strainDistData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                    <CartesianGrid stroke="#000000" strokeDasharray="2 2" vertical={false} opacity={0.2} />
                    <XAxis dataKey="range" stroke="#000000" fontSize={10} />
                    <YAxis stroke="#000000" fontSize={10} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff8e9', borderColor: '#000000', color: '#000000' }} />
                    <Bar dataKey="count" fill="#c9a86a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Box Plot Statistics Table */}
            <div className="lg:col-span-6 border border-[#000000] bg-[#fff8e9] p-6 space-y-4">
              <div className="border-b border-[#000000] pb-3 flex justify-between items-center text-caption-oryzo">
                <span className="font-bold text-[#000000]">QUARTILE BOX PLOT METRICS</span>
                <span className="text-[#4f3622]">IQR / MEDIAN</span>
              </div>
              <div className="overflow-x-auto border border-[#000000]">
                <table className="w-full text-left border-collapse text-legal-oryzo">
                  <thead>
                    <tr className="border-b border-[#000000] bg-[#ffebd0] font-bold">
                      <th className="p-3">PARAMETER</th>
                      <th className="p-3">MIN</th>
                      <th className="p-3">MEDIAN</th>
                      <th className="p-3">MAX</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#000000]/30 text-[#000000]">
                    {boxStats.map((s: BoxPlotStats) => (
                      <tr key={s.feature}>
                        <td className="p-3 font-bold text-[#000000]">{s.feature}</td>
                        <td className="p-3">{s.min}</td>
                        <td className="p-3 font-bold text-[#b8755b]">{s.median}</td>
                        <td className="p-3">{s.max}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'HEATMAP' && (
          <div className="border border-[#000000] bg-[#fff8e9] p-6 space-y-6 font-mono">
            <div className="border-b border-[#000000] pb-3 flex justify-between items-center text-caption-oryzo">
              <span className="font-bold text-[#000000]">PEARSON CORRELATION MATRIX</span>
              <span className="text-[#4f3622]">FEATURE PAIRWISE CORRELATION</span>
            </div>

            <div className="overflow-x-auto border border-[#000000]">
              <table className="w-full text-left border-collapse text-legal-oryzo">
                <thead>
                  <tr className="border-b border-[#000000] bg-[#ffebd0] font-bold">
                    <th className="p-3">FEATURE A</th>
                    <th className="p-3">FEATURE B</th>
                    <th className="p-3">PEARSON COEFFICIENT (r)</th>
                    <th className="p-3">RELATIONSHIP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#000000]/30 text-[#000000]">
                  {corrPoints.slice(0, 12).map((pt, idx) => (
                    <tr key={idx}>
                      <td className="p-3 font-bold text-[#000000]">{pt.featureA}</td>
                      <td className="p-3 text-[#4f3622]">{pt.featureB}</td>
                      <td className="p-3 font-mono font-bold text-[#000000]">{pt.value.toFixed(2)}</td>
                      <td className="p-3 text-[#9da991] font-bold">
                        {pt.value > 0.8 ? 'STRONG POSITIVE' : pt.value < -0.4 ? 'INVERSE' : 'MODERATE'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'RECORDS' && (
          <div className="border border-[#000000] bg-[#fff8e9] p-6 space-y-4 font-mono">
            <div className="border-b border-[#000000] pb-3 flex justify-between items-center text-caption-oryzo">
              <span className="font-bold text-[#000000]">FIELD BRIDGES ARCHIVE (`Last_Year_All_Field_Bridges.csv`)</span>
              <span className="text-[#4f3622]">{bridges.length} LOCATIONS</span>
            </div>

            <div className="overflow-x-auto border border-[#000000]">
              <table className="w-full text-left border-collapse text-legal-oryzo">
                <thead>
                  <tr className="border-b border-[#000000] bg-[#ffebd0] font-bold">
                    <th className="p-3">BRIDGE ID</th>
                    <th className="p-3">NAME</th>
                    <th className="p-3">COUNTY / STATE</th>
                    <th className="p-3">AGE</th>
                    <th className="p-3">ADT</th>
                    <th className="p-3">CONDITION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#000000]/30 text-[#000000]">
                  {bridges.map((b) => (
                    <tr key={b.id}>
                      <td className="p-3 font-bold text-[#000000]">{b.id}</td>
                      <td className="p-3 text-[#000000] font-medium">{b.name}</td>
                      <td className="p-3 text-[#4f3622]">{b.county}, {b.state}</td>
                      <td className="p-3">{b.bridgeAge} YRS</td>
                      <td className="p-3">{b.trafficADT.toLocaleString()}</td>
                      <td className="p-3 font-bold text-[#9da991]">{b.condition}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

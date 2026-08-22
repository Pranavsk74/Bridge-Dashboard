import React, { useState } from 'react';
import { Layers, Activity, Cpu, Network, Database, Brain, CheckCircle, FileText, ChevronRight } from 'lucide-react';

export const SystemArchitectureSection: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('xgb');

  const nodes = [
    {
      id: 'bridge',
      num: '01',
      title: 'PHYSICAL BRIDGE',
      label: 'SPAN STRUCTURE',
      icon: Layers,
      spec: 'Cable-stayed steel girder superstructure subjected to dynamic traffic and environmental loading.',
      detail: 'Continuous flexural load distribution across primary deck spans and stay cable anchorages.',
    },
    {
      id: 'sensors',
      num: '02',
      title: 'SENSORS',
      label: 'TRANSDUCER MATRIX',
      icon: Activity,
      spec: 'Strain microstrain gauges, accelerometers, inclinometers, and displacement LVDT probes.',
      detail: '10 active transducer channels streaming physical structural deformation metrics.',
    },
    {
      id: 'esp32',
      num: '03',
      title: 'ESP32 GATEWAY',
      label: 'EDGE ADC MODULE',
      icon: Cpu,
      spec: 'Dual-core microcontroller sampling 16-bit differential analog signals at 50 Hz.',
      detail: 'Local filtering, signal conditioning, and timestamp synchronization prior to MQTT transmission.',
    },
    {
      id: 'ingest',
      num: '04',
      title: 'DATA INGESTION',
      label: 'MQTT TRANSPORT',
      icon: Network,
      spec: 'Encrypted telemetry payload streaming from edge hardware to central cloud gateway.',
      detail: 'High-throughput stream processing validating schema integrity and payload formatting.',
    },
    {
      id: 'mysql',
      num: '05',
      title: 'MYSQL ARCHIVE',
      label: 'RELATIONAL STORE',
      icon: Database,
      spec: 'Relational data store archiving historical sensor telemetry and inspection logs.',
      detail: 'Indexed time-series telemetry tables supporting rapid query execution and historical analytics.',
    },
    {
      id: 'xgb',
      num: '06',
      title: 'MACHINE LEARNING',
      label: 'XGBOOST ENGINE',
      icon: Brain,
      spec: 'Gradient boosted decision trees evaluating non-linear structural feature vectors.',
      detail: 'Evaluates structural and contextual feature vectors against learned anomaly distributions.',
    },
    {
      id: 'risk',
      num: '07',
      title: 'RISK ASSESSMENT',
      label: 'HEALTH SCORE',
      icon: CheckCircle,
      spec: 'Inverted structural health score (0-100) and SHAP feature contribution ranking.',
      detail: 'Quantitative risk score prioritizing high-risk spans for targeted NDT maintenance.',
    },
    {
      id: 'report',
      num: '08',
      title: 'ENGINEERING REPORT',
      label: 'A4 AUDIT DOSSIER',
      icon: FileText,
      spec: 'Client-side automated A4 structural inspection report and PDF export.',
      detail: 'Generates physical engineering audit document with complete telemetry and action items.',
    },
  ];

  const activeNodeObj = nodes.find((n) => n.id === selectedNode) || nodes[5];

  return (
    <section className="w-full bg-[#2f2116] text-[#ffebd0] py-24 px-6 md:px-10 border-b border-[#4f3622] bg-cad-grid-dark">
      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#4f3622] pb-6">
          <div>
            <span className="text-caption-oryzo text-[#fee197] tracking-wider block font-mono">
              SYSTEM BLUEPRINT // ARCHITECTURAL SCHEMATIC
            </span>
            <h2 className="text-display text-[#ffebd0] font-medium">
              THE SYSTEM ARCHITECTURE
            </h2>
            <p className="text-subheading text-[#ffebd0]/70">
              FROM STRUCTURE TO STRUCTURAL INSIGHT
            </p>
          </div>

          <div className="text-legal-oryzo font-mono text-[#987f61] border-l border-[#4f3622] pl-4">
            SCHEMATIC CAD-VECT-2026
            <br />
            CLICK NODE TO INSPECT CONTRACT
          </div>
        </div>

        {/* CAD Schematic Pipeline Flow Diagram */}
        <div className="relative border border-[#4f3622] bg-[#2f2116]/90 p-8 space-y-8">
          <div className="flex items-center justify-between text-legal-oryzo font-mono text-[#987f61] border-b border-[#4f3622] pb-3">
            <span>PIPELINE DRAFT // SENSOR-TO-MODEL SYSTEM FLOW</span>
            <span>8 NODE PIPELINE</span>
          </div>

          {/* SVG Animated Connecting Line */}
          <div className="hidden lg:block w-full h-1 my-2">
            <svg className="w-full h-1 stroke-[#fee197]" style={{ strokeDasharray: 5, animation: 'dash 20s linear infinite' }}>
              <line x1="0" y1="0" x2="100%" y2="0" strokeWidth="2" />
            </svg>
          </div>

          {/* Sequential Nodes Flow Diagram */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 relative">
            {nodes.map((node, idx) => {
              const isSelected = selectedNode === node.id;
              const Icon = node.icon;

              return (
                <div key={node.id} className="relative flex flex-col items-center">
                  <button
                    onClick={() => setSelectedNode(node.id)}
                    style={{ animationDelay: `${idx * 80}ms` }}
                    className={`w-full p-3 text-left transition-all relative border ${
                      isSelected
                        ? 'border-[#fee197] bg-[#4f3622]/40 text-[#ffebd0]'
                        : 'border-[#4f3622] bg-[#2f2116] text-[#ffebd0]/70 hover:border-[#987f61]'
                    }`}
                  >
                    {/* Node Header */}
                    <div className="flex items-center justify-between text-legal-oryzo font-mono mb-2">
                      <span className="text-[#fee197] font-medium">{node.num}</span>
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-[#fee197]' : 'text-[#987f61]'}`} />
                    </div>

                    <h4 className="text-caption-oryzo font-medium text-[#ffebd0] leading-tight mb-1">
                      {node.title}
                    </h4>

                    <span className="text-[11px] font-mono text-[#987f61] block truncate">
                      {node.label}
                    </span>

                    {/* Active Bottom Line */}
                    {isSelected && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#fee197]" />
                    )}
                  </button>

                  {/* Horizontal Connecting Arrow Line for Desktop */}
                  {idx < nodes.length - 1 && (
                    <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-[#987f61]">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Detailed Node Dossier Drawer */}
          <div className="border border-[#4f3622] bg-[#2f2116] p-6 space-y-3 font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#4f3622] pb-3 text-caption-oryzo">
              <div className="flex items-center space-x-3">
                <span className="text-[#fee197] font-medium">
                  NODE {activeNodeObj.num} // {activeNodeObj.title}
                </span>
                <span className="text-[#987f61]">[{activeNodeObj.label}]</span>
              </div>
              <span className="text-legal-oryzo text-[#fee197]">STATUS: OPERATIONAL</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-legal-oryzo">
              <div>
                <span className="block text-[#987f61] uppercase mb-1">TECHNICAL SPECIFICATION</span>
                <p className="text-[#ffebd0] leading-relaxed font-sans">{activeNodeObj.spec}</p>
              </div>

              <div>
                <span className="block text-[#987f61] uppercase mb-1">DATA CONTRACT & ROLE</span>
                <p className="text-[#ffebd0]/80 leading-relaxed font-sans">{activeNodeObj.detail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

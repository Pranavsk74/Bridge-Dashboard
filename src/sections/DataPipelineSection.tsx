import React, { useState } from 'react';

export const DataPipelineSection: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string>('xgb');

  const pipelineStages = [
    {
      id: 'sensors',
      title: '01 STRUCTURAL SENSORS',
      subtitle: 'Physical Transducers',
      details: 'Wheatstone bridge strain gauges, piezo accelerometers, LVDT displacement gauges, and tilt inclinometers embedded along bridge girders.',
    },
    {
      id: 'esp32',
      title: '02 ESP32 HARDWARE',
      subtitle: 'Microcontroller Gateway',
      details: 'Dual-core ESP32 reading 16-bit analog differential signals, calibrating engineering units, and serializing frames.',
    },
    {
      id: 'transport',
      title: '03 MQTT / HTTP BUS',
      subtitle: 'IoT Wireless Transport',
      details: 'Lightweight IoT publish-subscribe protocol delivering encrypted JSON payload frames to edge gateway server.',
    },
    {
      id: 'mysql',
      title: '04 MYSQL DATABASE',
      subtitle: 'Telemetry Store',
      details: 'Relational data store archiving historical sensor telemetry, inspection logs, and model evaluation output timestamps.',
    },
    {
      id: 'prep',
      title: '05 PYTHON PREPROCESSING',
      subtitle: 'Scikit-Learn Scaling',
      details: 'Normalization against learned historical baseline reference operating profiles and Z-score standardization transform.',
    },
    {
      id: 'xgb',
      title: '06 XGBOOST ENSEMBLE',
      subtitle: 'Supervised ML Model',
      details: 'Multi-axis gradient boosted decision trees predicting structural anomaly probability across 10 sensor channels.',
    },
    {
      id: 'api',
      title: '07 REST API (FASTAPI)',
      subtitle: 'Microservice Endpoint',
      details: 'High-performance Python FastAPI service serving POST /api/predict inference responses to the frontend.',
    },
    {
      id: 'frontend',
      title: '08 BRIDGE//SENSE UI',
      subtitle: 'ORYZO Editorial App',
      details: 'Real-time dashboard rendering deformation visualizations, live graphs, risk drivers, and automated PDF reports.',
    },
  ];

  const activeStageObj = pipelineStages.find((s) => s.id === selectedStage) || pipelineStages[5];

  return (
    <section className="w-full min-h-screen bg-[#100904] text-[#ffedd7] px-6 md:px-16 py-24 border-b border-cork-dashed">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="text-caption-oryzo text-[#dc5000] tracking-widest">
            SECTION 05 // END-TO-END DATA ARCHITECTURE
          </div>
          <h2 className="text-heading text-[#ffedd7]">
            THE DATA PROCESSING PIPELINE
          </h2>
          <p className="text-subheading text-[#6c5f51]">
            CLICK ANY STAGE NODE TO INSPECT TECHNICAL SPECIFICATION.
          </p>
        </div>

        {/* Interactive Pipeline Flowchart Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pipelineStages.map((stage) => {
            const isSelected = selectedStage === stage.id;

            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between h-32 ${
                  isSelected
                    ? 'bg-[#382416] border-[#ffedd7] text-[#ffedd7]'
                    : 'bg-[#100904] border-[#40372e] text-[#6c5f51] hover:text-[#ffedd7]'
                }`}
              >
                <div className="flex justify-between items-center text-legal-oryzo text-[#dc5000] font-mono">
                  <span>{stage.title}</span>
                </div>
                <div>
                  <h4 className="text-caption-oryzo font-bold text-[#ffedd7]">
                    {stage.subtitle}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>

        {/* Technical Specification Dossier Box */}
        <div className="oryzo-card bg-[#100904] border-[#ffedd7]/30 space-y-3">
          <div className="flex items-center justify-between text-caption-oryzo border-b border-cork-dashed pb-2">
            <span className="text-[#dc5000] font-bold">
              {activeStageObj.title} // ARCHITECTURAL DOSSIER
            </span>
            <span className="text-[#6c5f51] font-mono">STAGE CONTRACT ACTIVE</span>
          </div>
          <p className="text-sm font-mono text-[#ffedd7] leading-relaxed">
            {activeStageObj.details}
          </p>
        </div>
      </div>
    </section>
  );
};

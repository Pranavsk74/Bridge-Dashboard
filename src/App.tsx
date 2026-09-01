import React, { useState, useEffect } from 'react';
import { services } from '@/services/providerRegistry';
import { SensorReading, ContextualFeatures, Prediction, Bridge } from '@/models/types';
import { bridgeDataService, RealBridgeProfile } from '@/services/bridgeDataService';
import { Navigation } from '@/components/Navigation';
import { BridgeSelector } from '@/components/BridgeSelector';
import { HeroSection } from '@/sections/HeroSection';
import { ProblemStatementSection } from '@/sections/ProblemStatementSection';
import { SystemArchitectureSection } from '@/sections/SystemArchitectureSection';
import { StructuralObservationSection } from '@/sections/StructuralObservationSection';
import { LiveMonitoringSection } from '@/sections/LiveMonitoringSection';
import { AdaptiveNormalizationSection } from '@/sections/AdaptiveNormalizationSection';
import { ThresholdPredictionSection } from '@/sections/ThresholdPredictionSection';
import { BridgeSimulationSection } from '@/sections/BridgeSimulationSection';
import { TeamDemoSection } from '@/sections/TeamDemoSection';
import { TeamDemoModal } from '@/components/TeamDemoModal';
import { MLWorkspacePage } from '@/pages/MLWorkspacePage';
import { DatabaseWorkspacePage } from '@/pages/DatabaseWorkspacePage';
import { StructuralReportPage } from '@/pages/StructuralReportPage';

// Default initial prediction fallback to guarantee instant rendering
const initialPredictionFallback: Prediction = {
  anomalyProbability: 18.3,
  healthScore: 84,
  riskLevel: 'LOW',
  confidence: 91.2,
  featureContributions: [],
  structuralContributions: [],
  contextualContributions: [],
  normalizedFeatures: {} as any,
  baselineValues: {} as any,
  problematicFeatures: [],
  evaluatedAt: new Date().toISOString(),
};

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState('home');

  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  // Shared Real Bridge Profile state from Last_Year_All_Field_Bridges.csv
  const [selectedBridge, setSelectedBridge] = useState<RealBridgeProfile>(
    bridgeDataService.getSelectedBridge()
  );

  const [bridge] = useState<Bridge>(services.bridgeProvider.getBridgeProfile());
  const [currentReading, setCurrentReading] = useState<SensorReading>(services.sensorProvider.getCurrentReading());
  const [contextualFeatures, setContextualFeatures] = useState<ContextualFeatures>(services.sensorProvider.getContextualFeatures());
  const [history, setHistory] = useState<SensorReading[]>(services.sensorProvider.getHistoricalReadings());
  const [prediction, setPrediction] = useState<Prediction>(initialPredictionFallback);

  // Subscribe to Sensor Provider live updates
  useEffect(() => {
    const unsubscribe = services.sensorProvider.subscribeToReadings((reading) => {
      setCurrentReading(reading);
      setHistory(services.sensorProvider.getHistoricalReadings());
    });
    return () => unsubscribe();
  }, []);

  // Sync selected bridge context whenever selectedBridge updates
  const handleSelectBridge = (b: RealBridgeProfile) => {
    setSelectedBridge(b);
    setContextualFeatures(
      services.sensorProvider.updateContextualFeatures({
        bridge_age_years: b.bridgeAge,
        traffic_index: Number((b.trafficADT / 30000).toFixed(2)),
        rainfall_mm: b.envContext.precipitationMm,
        ambient_temp_c: b.envContext.avgTempC,
      })
    );
  };

  // Recalculate ML Prediction whenever sensor reading or context updates
  useEffect(() => {
    let isMounted = true;
    services.mlProvider.assessHealth(currentReading, contextualFeatures)
      .then((pred) => {
        if (isMounted && pred) {
          setPrediction(pred);
          services.databaseProvider.saveReading(currentReading);
        }
      })
      .catch((err) => {
        console.warn("ML Prediction assessment error caught safely:", err);
      });
    return () => {
      isMounted = false;
    };
  }, [currentReading, contextualFeatures]);

  // Navigation handler
  const handleNavigate = (viewId: string) => {
    setActiveView(viewId);
    if (['ml', 'database', 'report'].includes(viewId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(viewId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleScenarioChange = (scenarioId: string) => {
    const newReading = services.sensorProvider.loadScenario(scenarioId);
    setCurrentReading(newReading);
    setContextualFeatures(services.sensorProvider.getContextualFeatures());
  };

  const handleManualInputChange = (overrides: Partial<SensorReading>) => {
    const updated = services.sensorProvider.updateReading(overrides);
    setCurrentReading(updated);
  };

  const handleContextChange = (overrides: Partial<ContextualFeatures>) => {
    const updated = services.sensorProvider.updateContextualFeatures(overrides);
    setContextualFeatures(updated);
  };

  const handleGenerateContext = () => {
    const generated = services.sensorProvider.generateContextualFeatures();
    setContextualFeatures(generated);
  };

  const handleRunAIAssessment = async () => {
    try {
      const pred = await services.mlProvider.assessHealth(currentReading, contextualFeatures);
      setPrediction(pred);
    } catch (err) {
      console.warn("runInference exception caught safely:", err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#2f2116] text-[#ffebd0] selection:bg-[#4f3622] selection:text-[#fee197]">
      {/* Quiet Architectural Navigation Bar */}
      <Navigation activeView={activeView} onNavigate={handleNavigate} />

      {/* RENDER ACTIVE WORKSPACE OR HOMEPAGE NARRATIVE */}
      {activeView === 'ml' ? (
        <MLWorkspacePage
          reading={currentReading}
          context={contextualFeatures}
          prediction={prediction}
          selectedBridge={selectedBridge}
          onSelectBridge={handleSelectBridge}
          onUpdateReading={handleManualInputChange}
          onUpdateContext={handleContextChange}
          onGenerateContext={handleGenerateContext}
          onRunInference={handleRunAIAssessment}
        />
      ) : activeView === 'database' ? (
        <div>
          <div className="pt-20">
            <BridgeSelector selectedBridge={selectedBridge} onSelectBridge={handleSelectBridge} />
          </div>
          <DatabaseWorkspacePage
            bridge={bridge}
            reading={currentReading}
            history={history}
          />
        </div>
      ) : activeView === 'report' ? (
        <div>
          <div className="pt-20">
            <BridgeSelector selectedBridge={selectedBridge} onSelectBridge={handleSelectBridge} />
          </div>
          <StructuralReportPage
            bridge={bridge}
            selectedBridge={selectedBridge}
            reading={currentReading}
            context={contextualFeatures}
            history={history}
            prediction={prediction}
          />
        </div>
      ) : (
        /* MAIN HOMEPAGE NARRATIVE EXPERIENCE */
        <main className="w-full">
          {/* 01 HERO SECTION */}
          <HeroSection
            reading={currentReading}
            onNavigate={handleNavigate}
          />

          {/* 02 PROBLEM STATEMENT (LIGHT PARCHMENT #ffebd0) */}
          <ProblemStatementSection />

          {/* 03 SYSTEM ARCHITECTURE (DARK WALNUT #2f2116) */}
          <SystemArchitectureSection />

          {/* 04 STRUCTURAL OBSERVATION (LIGHT PARCHMENT #ffebd0) */}
          <StructuralObservationSection />

          {/* SHARED BRIDGE SELECTOR BAR */}
          <div className="bg-[#2f2116] border-y border-[#4f3622] py-4">
            <BridgeSelector selectedBridge={selectedBridge} onSelectBridge={handleSelectBridge} />
          </div>

          {/* 05 LIVE MONITORING WORKSTATION (DARK WALNUT #2f2116) */}
          <LiveMonitoringSection
            bridge={bridge}
            reading={currentReading}
            history={history}
            prediction={prediction}
            onUpdateReading={handleManualInputChange}
            onRunAIAssessment={handleRunAIAssessment}
          />

          {/* 06 ADAPTIVE NORMALIZATION (LIGHT PARCHMENT #ffebd0) */}
          <AdaptiveNormalizationSection
            reading={currentReading}
          />

          {/* 07 THRESHOLD & PREDICTION (DARK WALNUT #2f2116) */}
          <ThresholdPredictionSection
            reading={currentReading}
          />

          {/* 08 3D CAD BRIDGE SIMULATION (DARK WALNUT #2f2116) */}
          <BridgeSimulationSection
            reading={currentReading}
            prediction={prediction}
            onSelectScenario={handleScenarioChange}
            onManualInputChange={handleManualInputChange}
            onRunAIAssessment={handleRunAIAssessment}
          />

          {/* 09 PROJECT DEMO & TEAM MEMBERS SECTION */}
          <TeamDemoSection onNavigate={handleNavigate} />
        </main>
      )}

      {/* TEAM & DEMO MODAL POPUP */}
      <TeamDemoModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* QUIET ARCHITECTURAL FOOTER WITH TEAM CREDITS */}
      <footer className="w-full bg-[#1c130c] border-t border-[#4f3622] py-8 px-6 md:px-10 font-mono text-legal-oryzo text-[#987f61]">
        <div className="max-w-[1200px] mx-auto space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div>
              <span className="text-[#ffebd0] font-medium">CLAUDE'S PLAN STRUCTURAL ENGINE</span> // EDITION 2026
            </div>
            <div className="flex items-center space-x-3">
              <span>CONTINUOUS STRUCTURAL OBSERVATION & ML ASSESSMENT</span>
              <button
                onClick={() => setIsTeamModalOpen(true)}
                className="text-[#fee197] hover:underline focus:outline-none"
              >
                [VIEW TEAM & DEMO]
              </button>
            </div>
          </div>
          <div className="border-t border-[#4f3622]/50 pt-4 text-center text-[#ffebd0]/70 font-sans text-caption-oryzo">
            <span className="text-[#fee197] font-mono text-legal-oryzo block md:inline md:mr-2">PROJECT TEAM:</span>
            Akshita Sabat (Team Lead) &bull; Yash Sawant &bull; Pranav Srikrishnan &bull; Daksh Kamble &bull; Gargi Hosmani &bull; Khushi Gandhi
          </div>
        </div>
      </footer>
    </div>
  );
};

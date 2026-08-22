import React, { useState, useRef } from 'react';
import { Bridge, Prediction, SensorReading, ContextualFeatures } from '@/models/types';
import { services } from '@/services/providerRegistry';
import { Download, CheckCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ReportGenerationSectionProps {
  bridge: Bridge;
  reading: SensorReading;
  context: ContextualFeatures;
  history: SensorReading[];
  prediction: Prediction;
}

export const ReportGenerationSection: React.FC<ReportGenerationSectionProps> = ({
  bridge,
  reading,
  context,
  history,
  prediction,
}) => {
  const [generating, setGenerating] = useState(false);
  const [reportReady, setReportReady] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const report = services.reportProvider.generateReport(bridge, prediction, reading, context, history);

  const handleGeneratePDF = async () => {
    if (!reportRef.current) return;
    setGenerating(true);
    try {
      await services.databaseProvider.saveReport(report);

      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#F1E5D3',
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`CLAUDES_PLAN_STRUCTURAL_REPORT_${bridge.id}_${Date.now()}.pdf`);
      setReportReady(true);
    } catch (err) {
      console.error('PDF Generation Error:', err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <section id="report-section" className="w-full min-h-screen bg-[#120B07] text-[#FFF1DE] px-6 md:px-16 py-24 border-b border-cork-dashed">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cork-dashed pb-4">
          <div>
            <span className="text-caption-oryzo text-[#D95A0B] tracking-widest font-bold block">
              SECTION 10 // STRUCTURAL AUDIT REPORT
            </span>
            <h2 className="text-heading text-[#FFF1DE]">
              REPORT GENERATION ENGINE
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleGeneratePDF}
              disabled={generating}
              className="btn-pill-accent flex items-center space-x-2 px-6 py-3 text-xs"
            >
              {generating ? (
                <span>COMPILING PDF...</span>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#FFF1DE]" />
                  <span>GENERATE & DOWNLOAD PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="w-full flex justify-center py-4">
          <div
            ref={reportRef}
            className="bg-newspaper-paper w-full max-w-[800px] min-h-[1050px] p-8 md:p-12 space-y-8 rounded-sm shadow-2xl text-[#211B16]"
          >
            <div className="flex flex-col md:flex-row justify-between items-start border-b-2 border-[#211B16] pb-6 gap-4 font-sans">
              <div>
                <div className="text-caption-oryzo text-[#D95A0B] font-bold tracking-widest">
                  CLAUDE'S PLAN STRUCTURAL AUDIT DOSSIER
                </div>
                <h1 className="text-heading text-[#211B16] font-bold tracking-tight">
                  STRUCTURAL HEALTH REPORT
                </h1>
                <p className="text-caption-oryzo text-[#211B16]/70">
                  AUTOMATED ML-BASED TELEMETRY INSPECTION SUMMARY
                </p>
              </div>

              <div className="text-right text-caption-oryzo font-mono space-y-1 text-[#211B16]">
                <div>REPORT ID: <strong className="text-[#D95A0B]">{report.id}</strong></div>
                <div>GENERATED: <strong>{new Date(report.generatedAt).toLocaleString()}</strong></div>
                <div>DATA SOURCE: <strong>{report.dataSource}</strong></div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border border-[#211B16] rounded text-caption-oryzo text-[#211B16] font-mono">
              <div>
                <span className="block text-legal-oryzo opacity-70">BRIDGE ID</span>
                <strong>{bridge.id}</strong>
              </div>
              <div>
                <span className="block text-legal-oryzo opacity-70">LOCATION</span>
                <strong>{bridge.location}</strong>
              </div>
              <div>
                <span className="block text-legal-oryzo opacity-70">STRUCTURE TYPE</span>
                <strong>{bridge.type}</strong>
              </div>
              <div>
                <span className="block text-legal-oryzo opacity-70">AGE & RAINFALL</span>
                <strong>{context.bridge_age_years} YRS // {context.rainfall_mm}mm</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-mono text-[#211B16]">
              <div className="p-3 border border-[#211B16] rounded">
                <span className="text-legal-oryzo opacity-70 block">HEALTH SCORE</span>
                <span className="text-subheading font-bold">{prediction.healthScore} / 100</span>
              </div>
              <div className="p-3 border border-[#211B16] rounded">
                <span className="text-legal-oryzo opacity-70 block">ANOMALY PROBABILITY</span>
                <span className="text-subheading font-bold text-[#D95A0B]">{prediction.anomalyProbability}%</span>
              </div>
              <div className="p-3 border border-[#211B16] rounded">
                <span className="text-legal-oryzo opacity-70 block">RISK CLASSIFICATION</span>
                <span className="text-subheading font-bold">{prediction.riskLevel}</span>
              </div>
              <div className="p-3 border border-[#211B16] rounded">
                <span className="text-legal-oryzo opacity-70 block">CONFIDENCE</span>
                <span className="text-subheading font-bold">{prediction.confidence}%</span>
              </div>
            </div>

            <div className="space-y-4 border-l-2 border-[#D95A0B] pl-6 py-2 text-[#211B16]">
              <div>
                <span className="text-caption-oryzo text-[#D95A0B] font-bold tracking-widest block mb-1">
                  ML STRUCTURAL ASSESSMENT SUMMARY
                </span>
                <p className="text-xs font-mono leading-relaxed">
                  {report.aiAssessment}
                </p>
              </div>

              <div>
                <span className="text-caption-oryzo font-bold tracking-widest block mb-1">
                  RECOMMENDED ACTION & INSPECTION PROTOCOL
                </span>
                <p className="text-xs font-mono leading-relaxed">
                  {report.recommendedInspection}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

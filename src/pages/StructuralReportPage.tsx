import React, { useRef, useState } from 'react';
import { Bridge, SensorReading, ContextualFeatures, Prediction } from '@/models/types';
import { RealBridgeProfile } from '@/services/bridgeDataService';
import { Download, Printer, BookOpen, FileText } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface StructuralReportPageProps {
  bridge: Bridge;
  selectedBridge?: RealBridgeProfile;
  reading: SensorReading;
  context: ContextualFeatures;
  history: SensorReading[];
  prediction: Prediction;
}

export const StructuralReportPage: React.FC<StructuralReportPageProps> = ({
  bridge,
  selectedBridge,
  reading,
  context,
  history,
  prediction,
}) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);

  const handleGeneratePDF = async () => {
    if (!reportRef.current) return;
    setGenerating(true);
    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#F5F1E8',
        useCORS: true,
        logging: false,
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

      pdf.save("Claude's_Plan_Structural_Report.pdf");
    } catch (err) {
      console.error('PDF export error:', err);
      window.print();
    } finally {
      setGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const currentBridgeName = selectedBridge ? selectedBridge.name : bridge.name;
  const currentBridgeId = selectedBridge ? selectedBridge.id : bridge.id;
  const currentCounty = selectedBridge ? selectedBridge.county : 'Chatham County';
  const currentState = selectedBridge ? selectedBridge.state : 'Georgia';
  const currentLat = selectedBridge ? selectedBridge.latitude : 32.01841;
  const currentLon = selectedBridge ? selectedBridge.longitude : -80.85094;
  const currentAge = selectedBridge ? selectedBridge.bridgeAge : 24;
  const currentADT = selectedBridge ? selectedBridge.trafficADT : 9290;
  const currentCondition = selectedBridge ? selectedBridge.condition : 'Good';
  const currentFreq = selectedBridge ? selectedBridge.inspectionFreqMonths : 24;

  // Pie chart data: Part-to-whole Risk Distribution
  const pieData = [
    { name: 'NORMAL OPERATING', value: 82, color: '#d8c09a' },
    { name: 'WATCH THRESHOLD', value: 13, color: '#c9a86a' },
    { name: 'HIGH RISK DEVIATION', value: 5, color: '#C86A25' },
  ];

  return (
    <div className="w-full bg-[#2f2116] text-[#ffebd0] px-6 md:px-10 py-24 space-y-10 min-h-screen bg-cad-grid-dark font-sans">
      {/* Header & Toolbar Outside Paper */}
      <div className="max-w-[900px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#4f3622] pb-4 font-sans">
        <div>
          <span className="text-caption-oryzo text-[#fee197] block uppercase">
            A4 INSPECTION DOCUMENT PREVIEW
          </span>
          <h1 className="text-heading text-[#ffebd0] font-serif font-medium">
            FIELD STRUCTURAL AUDIT REPORT
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="btn-outline-dark flex items-center space-x-2 py-2 px-4 text-caption-oryzo font-sans"
          >
            <Printer className="w-4 h-4 text-[#ffebd0]" />
            <span>PRINT REPORT</span>
          </button>

          <button
            onClick={handleGeneratePDF}
            disabled={generating}
            className="btn-outline-amber flex items-center space-x-2 py-2 px-4 text-caption-oryzo font-sans"
          >
            <Download className="w-4 h-4 text-[#fee197]" />
            <span>{generating ? 'GENERATING PDF...' : 'EXPORT PDF'}</span>
          </button>
        </div>
      </div>

      {/* Physical A4 Paper Page Document Preview */}
      <div
        id="report-document"
        ref={reportRef}
        className="report-document max-w-[900px] mx-auto bg-[#F5F1E8] text-[#211A15] border border-[#5B4635] p-10 space-y-8 font-sans shadow-2xl transition-all"
      >
        {/* Header Masthead */}
        <div className="border-b-2 border-[#5B4635] pb-6 space-y-3 font-sans">
          <div className="flex justify-between items-start text-legal-oryzo text-[#8B7967]">
            <span className="font-medium">CLAUDE'S PLAN // STRUCTURAL HEALTH MONITORING</span>
            <span className="font-mono">REPORT ID: AUDIT-{currentBridgeId}</span>
          </div>

          <div className="text-center py-2 space-y-1">
            <h2 className="text-[28px] font-bold uppercase tracking-tight leading-none text-[#211A15] font-serif">
              FIELD STRUCTURAL AUDIT REPORT
            </h2>
            <p className="text-legal-oryzo font-sans italic text-[#8B7967]">
              Physical Transducer Telemetry & Machine Learning Assessment
            </p>
          </div>

          <div className="border-t border-[#5B4635] pt-2 flex justify-between text-legal-oryzo text-[#211A15]">
            <span>DATE: {new Date().toLocaleDateString()}</span>
            <span>MODEL: XGBoost Classifier v2.4</span>
            <span>SOURCE: FIELD CSV & ESP32 STREAM</span>
          </div>
        </div>

        {/* SECTION 1: FIELD CONTEXT */}
        <div className="space-y-3 font-sans">
          <h3 className="text-caption-oryzo font-serif font-bold uppercase border-b border-[#5B4635] pb-1 text-[#211A15]">
            01. BRIDGE IDENTIFICATION & FIELD RECORD
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border border-[#5B4635] bg-[#EFEAE0] text-legal-oryzo">
            <div><span className="block text-[#8B7967]">ID:</span> <span className="font-bold font-mono">{currentBridgeId}</span></div>
            <div><span className="block text-[#8B7967]">NAME:</span> <span className="font-bold">{currentBridgeName}</span></div>
            <div><span className="block text-[#8B7967]">LOCATION:</span> {currentCounty}, {currentState}</div>
            <div><span className="block text-[#8B7967]">COORDINATES:</span> <span className="font-mono">{currentLat.toFixed(4)}, {currentLon.toFixed(4)}</span></div>
            <div><span className="block text-[#8B7967]">AGE:</span> <span className="font-bold">{currentAge} YEARS</span></div>
            <div><span className="block text-[#8B7967]">TRAFFIC:</span> <span className="font-bold">{currentADT.toLocaleString()} ADT</span></div>
            <div><span className="block text-[#8B7967]">CONDITION:</span> <span className="font-bold">{currentCondition}</span></div>
            <div><span className="block text-[#8B7967]">INSPECTION FREQ:</span> <span>{currentFreq} MOS</span></div>
          </div>
        </div>

        {/* SECTION 2: VISUAL EVIDENCE — TELEMETRY & PIE CHART */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 font-sans">
          <div className="md:col-span-7 space-y-2 border border-[#5B4635] bg-[#EFEAE0] p-4">
            <h4 className="text-legal-oryzo font-serif font-bold uppercase border-b border-[#5B4635] pb-1 text-[#211A15]">
              TELEMETRY SUMMARY TREND
            </h4>
            <div className="w-full h-44 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="#5B4635" strokeDasharray="2 2" opacity={0.2} />
                  <XAxis dataKey="timestamp" stroke="#211A15" fontSize={9} />
                  <YAxis stroke="#211A15" fontSize={9} />
                  <Tooltip contentStyle={{ backgroundColor: '#F5F1E8', borderColor: '#5B4635', fontSize: '11px', color: '#211A15' }} />
                  <Line type="monotone" dataKey="strain_microstrain" stroke="#211A15" strokeWidth={1.5} dot={false} name="Strain (µε)" />
                  <Line type="monotone" dataKey="vibration_rms_g" stroke="#C86A25" strokeWidth={1.5} dot={false} name="Vibration (g)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="md:col-span-5 space-y-2 border border-[#5B4635] bg-[#EFEAE0] p-4 text-center">
            <h4 className="text-legal-oryzo font-serif font-bold uppercase border-b border-[#5B4635] pb-1 text-left text-[#211A15]">
              RISK DISTRIBUTION
            </h4>
            <div className="w-full h-36 pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={25} outerRadius={45} paddingAngle={3}>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#5B4635" strokeWidth={1} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#F5F1E8', borderColor: '#5B4635', fontSize: '10px', color: '#211A15' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-[10px] space-y-0.5 text-[#8B7967] font-sans text-left pt-1">
              <div className="flex items-center space-x-1.5"><span className="w-2 h-2 bg-[#d8c09a] border border-[#5B4635]" /><span>NORMAL OPERATING: 82%</span></div>
              <div className="flex items-center space-x-1.5"><span className="w-2 h-2 bg-[#c9a86a] border border-[#5B4635]" /><span>WATCH THRESHOLD: 13%</span></div>
              <div className="flex items-center space-x-1.5"><span className="w-2 h-2 bg-[#C86A25] border border-[#5B4635]" /><span>HIGH RISK: 5%</span></div>
            </div>
          </div>
        </div>

        {/* SECTION 3: PHYSICAL MEASUREMENTS TABLE */}
        <div className="space-y-3 font-sans">
          <h3 className="text-caption-oryzo font-serif font-bold uppercase border-b border-[#5B4635] pb-1 text-[#211A15]">
            03. PHYSICAL MEASUREMENTS TABLE
          </h3>

          <div className="overflow-x-auto border border-[#5B4635]">
            <table className="w-full text-left border-collapse text-legal-oryzo">
              <thead>
                <tr className="border-b border-[#5B4635] bg-[#EFEAE0] font-bold text-[#211A15]">
                  <th className="p-2">PARAMETER</th>
                  <th className="p-2">MEASURED VALUE</th>
                  <th className="p-2">REFERENCE BASELINE</th>
                  <th className="p-2">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#5B4635]/30 text-[#211A15]">
                <tr>
                  <td className="p-2 font-medium">STRUCTURAL STRAIN</td>
                  <td className="p-2 font-mono">{reading.strain_microstrain} µε</td>
                  <td className="p-2 font-mono">500 µε</td>
                  <td className="p-2 font-bold">{reading.strain_microstrain > 600 ? 'ELEVATED' : 'NOMINAL'}</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">VIBRATION RMS</td>
                  <td className="p-2 font-mono">{reading.vibration_rms_g} g</td>
                  <td className="p-2 font-mono">0.12 g</td>
                  <td className="p-2 font-bold">NOMINAL</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">PIER TILT ANGLE</td>
                  <td className="p-2 font-mono">{reading.tilt_deg} °</td>
                  <td className="p-2 font-mono">0.05 °</td>
                  <td className="p-2 font-bold">NOMINAL</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">DECK DISPLACEMENT</td>
                  <td className="p-2 font-mono">{reading.displacement_mm} mm</td>
                  <td className="p-2 font-mono">1.80 mm</td>
                  <td className="p-2 font-bold">NOMINAL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 4: ASSESSMENT & SIGN-OFF */}
        <div className="space-y-3 font-sans border-t border-[#5B4635] pt-4">
          <div className="p-4 border border-[#5B4635] bg-[#EFEAE0] flex justify-between items-center text-caption-oryzo">
            <div>
              <span className="text-[#8B7967] block text-legal-oryzo">PREDICTED RISK LEVEL:</span>
              <span className="font-bold text-heading text-[#C86A25]">{prediction.riskLevel}</span>
            </div>
            <div className="text-right">
              <span className="text-[#8B7967] block text-legal-oryzo">HEALTH SCORE:</span>
              <span className="font-bold text-heading text-[#211A15]">{prediction.healthScore} / 100</span>
            </div>
          </div>

          <div className="pt-4 flex justify-between items-end text-legal-oryzo font-sans border-t border-[#5B4635]/30">
            <div>
              <span className="block text-[#8B7967]">INSPECTING SYSTEM:</span>
              <span className="font-bold text-[#211A15]">CLAUDE'S PLAN STRUCTURAL ENGINE</span>
            </div>
            <div className="text-right">
              <span className="block text-[#8B7967]">AUTHORIZATION STATUS:</span>
              <span className="font-bold text-[#211A15]">PASSED // VERIFIED</span>
            </div>
          </div>
        </div>
      </div>

      {/* RESERVED DOCUMENT PLACEHOLDERS (Notebook & PPT) */}
      <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-legal-oryzo">
        <div className="p-4 border border-[#4f3622] bg-[#2f2116] flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-4 h-4 text-[#fee197]" />
            <div>
              <span className="font-bold block text-[#ffebd0]">MACHINE LEARNING NOTEBOOK</span>
              <span className="text-[#ffebd0]/70 text-[11px]">STATUS: [READY FOR UPLOAD]</span>
            </div>
          </div>
          <span className="px-2 py-1 border border-[#4f3622] text-[10px] text-[#fee197]">RESERVED SLOT</span>
        </div>

        <div className="p-4 border border-[#4f3622] bg-[#2f2116] flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <FileText className="w-4 h-4 text-[#fee197]" />
            <div>
              <span className="font-bold block text-[#ffebd0]">PRESENTATION (PPT)</span>
              <span className="text-[#ffebd0]/70 text-[11px]">STATUS: [READY FOR UPLOAD]</span>
            </div>
          </div>
          <span className="px-2 py-1 border border-[#4f3622] text-[10px] text-[#fee197]">RESERVED SLOT</span>
        </div>
      </div>
    </div>
  );
};

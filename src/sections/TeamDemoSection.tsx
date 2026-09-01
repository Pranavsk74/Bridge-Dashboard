import React from 'react';
import { Users, PlayCircle, ShieldCheck, Cpu, Database, FileSpreadsheet, Activity, ExternalLink } from 'lucide-react';

export const teamMembers = [
  { name: 'Akshita Sabat', isLead: true, designation: 'Team Lead' },
  { name: 'Yash Sawant', isLead: false, designation: 'Team Member' },
  { name: 'Pranav Srikrishnan', isLead: false, designation: 'Team Member' },
  { name: 'Daksh Kamble', isLead: false, designation: 'Team Member' },
  { name: 'Gargi Hosmani', isLead: false, designation: 'Team Member' },
  { name: 'Khushi Gandhi', isLead: false, designation: 'Team Member' },
];

export const demoCapabilities = [
  {
    title: 'Live Telemetry & Sensor Stream',
    desc: 'Simulates real-time multi-sensor inputs including strain, vibration, tilt, ambient temp, and displacement with synthetic anomaly controls.',
    icon: Activity,
    badge: 'LIVE DEMO',
  },
  {
    title: 'XGBoost ML Structural Assessment',
    desc: 'Context-normalized structural risk classification and failure mode probability estimation built for bridge engineering datasets.',
    icon: Cpu,
    badge: 'AI MODEL',
  },
  {
    title: '3D CAD Bridge Simulation',
    desc: 'Interactive Three.js parametric bridge renderer depicting structural stress highlights and live deformation vectors.',
    icon: PlayCircle,
    badge: '3D VISUALIZER',
  },
  {
    title: 'Regional Field Bridge Database',
    desc: 'Filterable dataset containing regional bridge profiles, age, ADT traffic metrics, and historical inspection logs.',
    icon: Database,
    badge: 'DATASET',
  },
  {
    title: 'Automated PDF Report Generator',
    desc: 'Instant engineering dossier generation with html2canvas and jsPDF for structural inspection reports.',
    icon: FileSpreadsheet,
    badge: 'REPORTING',
  },
];

interface TeamDemoSectionProps {
  onNavigate?: (viewId: string) => void;
}

export const TeamDemoSection: React.FC<TeamDemoSectionProps> = ({ onNavigate }) => {
  return (
    <section id="team" className="w-full bg-[#2f2116] text-[#ffebd0] py-24 px-6 md:px-10 border-b border-[#4f3622] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#4f3622] pb-6 font-serif">
          <div>
            <div className="inline-flex items-center space-x-2 bg-[#fee197]/10 border border-[#fee197]/30 px-3 py-1 mb-3 rounded-full">
              <ShieldCheck className="w-4 h-4 text-[#fee197]" />
              <span className="text-caption-oryzo text-[#fee197] font-mono font-medium tracking-wider uppercase">
                VERCEL DEPLOYED DEMO & TEAM CREDITS
              </span>
            </div>
            <h2 className="text-display text-[#ffebd0] font-medium font-serif">
              PROJECT DEMO & TEAM MEMBERS
            </h2>
          </div>
          <div className="text-legal-oryzo font-mono text-[#987f61] max-w-xs">
            STRUCTURAL HEALTH MONITORING SYSTEM // PROTOTYPE EDITION 2026
          </div>
        </div>

        {/* Live Demo Status Banner */}
        <div className="border border-[#fee197]/40 bg-[#3a291b] p-6 md:p-8 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-caption-oryzo font-bold text-emerald-400 tracking-wider">
                LIVE DEMO ACTIVE & READY FOR VERCEL
              </span>
            </div>
            <h3 className="text-heading text-[#ffebd0] font-serif font-bold">
              Bridge Structural Health Monitoring System
            </h3>
            <p className="text-body-oryzo text-[#ffebd0]/80 font-sans max-w-2xl">
              An end-to-end Machine Learning prototype integrating sensor telemetry, context-adaptive normalization, 3D CAD visualization, and structural report generation.
            </p>
          </div>

          {onNavigate && (
            <div className="flex flex-wrap gap-3 font-sans w-full md:w-auto">
              <button
                onClick={() => onNavigate('monitor')}
                className="btn-outline-amber px-5 py-2.5 text-caption-oryzo flex items-center justify-center space-x-2 w-full md:w-auto"
              >
                <span>LAUNCH MONITOR</span>
                <ExternalLink className="w-4 h-4 text-[#fee197]" />
              </button>
            </div>
          )}
        </div>

        {/* Team Members Grid */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 border-b border-[#4f3622] pb-3">
            <Users className="w-6 h-6 text-[#fee197]" />
            <h3 className="text-heading text-[#ffebd0] font-serif font-bold uppercase tracking-wide">
              PROJECT TEAM MEMBERS
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className={`border p-6 transition-all duration-300 group flex flex-col justify-between ${
                  member.isLead
                    ? 'border-[#fee197] bg-[#3a291b] shadow-lg shadow-[#fee197]/10'
                    : 'border-[#4f3622] bg-[#281c12] hover:border-[#fee197]/50'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[#4f3622] pb-2">
                    <span className="font-mono text-legal-oryzo text-[#fee197]">
                      MEMBER 0{index + 1}
                    </span>
                    <span className={`text-legal-oryzo font-mono px-2 py-0.5 rounded ${
                      member.isLead ? 'bg-[#fee197] text-[#2f2116] font-bold' : 'text-[#ffebd0]/50'
                    }`}>
                      {member.designation.toUpperCase()}
                    </span>
                  </div>

                  <h4 className="text-subheading font-serif text-[#ffebd0] font-bold group-hover:text-[#fee197] transition-colors">
                    {member.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Capabilities Overview */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center space-x-3 border-b border-[#4f3622] pb-3">
            <PlayCircle className="w-6 h-6 text-[#fee197]" />
            <h3 className="text-heading text-[#ffebd0] font-serif font-bold uppercase tracking-wide">
              DEMO SYSTEM CAPABILITIES
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoCapabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div key={cap.title} className="border border-[#4f3622] bg-[#23180f] p-6 space-y-4 font-sans">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-[#4f3622]/50 text-[#fee197] rounded">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-legal-oryzo px-2.5 py-0.5 border border-[#fee197]/30 bg-[#fee197]/10 text-[#fee197] rounded-full">
                      {cap.badge}
                    </span>
                  </div>
                  <h4 className="font-serif text-[#ffebd0] font-bold text-subheading">
                    {cap.title}
                  </h4>
                  <p className="text-caption-oryzo text-[#ffebd0]/75 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

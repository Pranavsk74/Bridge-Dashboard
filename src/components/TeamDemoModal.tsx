import React from 'react';
import { X, ShieldCheck, Users, ExternalLink } from 'lucide-react';
import { teamMembers } from '@/sections/TeamDemoSection';

interface TeamDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (viewId: string) => void;
}

export const TeamDemoModal: React.FC<TeamDemoModalProps> = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-[#2f2116] border border-[#fee197]/40 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl p-6 md:p-8 space-y-6 text-[#ffebd0]">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-[#4f3622] pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 bg-[#fee197]/10 border border-[#fee197]/30 px-3 py-0.5 rounded-full text-legal-oryzo font-mono text-[#fee197]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>VERCEL READY DEMO // STRUCTURAL HEALTH MONITORING</span>
            </div>
            <h3 className="text-display text-[#ffebd0] font-serif font-bold">
              Project Team & Demo Credits
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#ffebd0]/60 hover:text-[#ffebd0] hover:bg-[#4f3622] rounded transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Live Demo Info */}
        <div className="border border-[#4f3622] bg-[#23180f] p-4 rounded space-y-2">
          <div className="flex items-center space-x-2 text-emerald-400 font-mono text-legal-oryzo font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>VERCEL DEPLOYMENT PREPARED</span>
          </div>
          <p className="text-caption-oryzo text-[#ffebd0]/80">
            This interactive demo showcases continuous structural observation, real-time sensor anomaly detection, XGBoost risk evaluation, and parametric 3D CAD visualization.
          </p>
        </div>

        {/* Team Members List */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-caption-oryzo font-mono font-bold text-[#fee197] uppercase">
            <Users className="w-4 h-4" />
            <span>Project Team Members</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamMembers.map((member, idx) => (
              <div
                key={member.name}
                className={`border p-4 rounded space-y-1 transition-colors ${
                  member.isLead
                    ? 'border-[#fee197] bg-[#3a291b]'
                    : 'border-[#4f3622] bg-[#281c12] hover:border-[#fee197]/40'
                }`}
              >
                <div className="flex justify-between items-center text-legal-oryzo font-mono text-[#fee197]">
                  <span>0{idx + 1}. {member.designation}</span>
                  {member.isLead && (
                    <span className="bg-[#fee197] text-[#2f2116] px-2 py-0.5 rounded font-bold text-[10px]">
                      TEAM LEAD
                    </span>
                  )}
                </div>
                <h4 className="font-serif font-bold text-subheading text-[#ffebd0]">
                  {member.name}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#4f3622] pt-4 font-sans">
          {onNavigate && (
            <button
              onClick={() => {
                onClose();
                onNavigate('team');
              }}
              className="btn-outline-amber px-4 py-2 text-caption-oryzo flex items-center space-x-2"
            >
              <span>VIEW FULL TEAM SECTION</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="btn-outline-dark px-4 py-2 text-caption-oryzo"
          >
            CLOSE
          </button>
        </div>

      </div>
    </div>
  );
};

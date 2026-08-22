import React from 'react';
import { FileText, Download, Eye, BookOpen } from 'lucide-react';
import { ASSETS } from '@/config/assets';

export const ProjectDocsSection: React.FC = () => {
  return (
    <section id="docs" className="w-full bg-[#2f2116] text-[#ffebd0] py-24 px-6 md:px-10 border-b border-[#4f3622] bg-cad-grid-dark">
      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#4f3622] pb-4 font-serif">
          <div>
            <span className="text-caption-oryzo text-[#fee197] font-mono tracking-wider block uppercase">
              TECHNICAL DOCUMENTATION ARCHIVE
            </span>
            <h2 className="text-display text-[#ffebd0] font-medium font-serif">
              PROJECT DOCUMENTATION
            </h2>
          </div>
          <div className="text-legal-oryzo font-mono text-[#987f61]">
            SPECIFICATION & ANALYSIS DOSSIERS
          </div>
        </div>

        {/* Two Large Document Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono">
          {/* Tile 01: Machine Learning Notebook */}
          <div className="border border-[#4f3622] bg-[#2f2116] p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#4f3622] pb-3">
                <div className="flex items-center space-x-3 text-[#ffebd0]">
                  <BookOpen className="w-6 h-6 text-[#fee197]" />
                  <span className="text-caption-oryzo font-bold uppercase">DOCUMENT 01</span>
                </div>
                <span className="text-legal-oryzo text-[#fee197]">STATUS: [READY FOR UPLOAD]</span>
              </div>

              <h3 className="text-heading text-[#ffebd0] font-serif font-bold">
                MACHINE LEARNING NOTEBOOK
              </h3>

              <p className="text-body-oryzo text-[#ffebd0]/80 font-sans leading-relaxed">
                Complete model training pipeline, feature vector engineering, XGBoost hyperparameters, cross-validation metrics, and SHAP feature importance analysis.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-[#4f3622] font-sans">
              <a
                href="#ml"
                className="btn-outline-amber flex-1 text-center py-2 text-caption-oryzo flex items-center justify-center space-x-2"
              >
                <Eye className="w-4 h-4 text-[#fee197]" />
                <span>VIEW NOTEBOOK</span>
              </a>
              <button
                onClick={() => alert('Machine Learning Notebook file slot ready for upload (.ipynb)')}
                className="btn-outline-dark flex-1 text-center py-2 text-caption-oryzo flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4 text-[#ffebd0]" />
                <span>UPLOAD SLOT</span>
              </button>
            </div>
          </div>

          {/* Tile 02: Presentation / PPT */}
          <div className="border border-[#4f3622] bg-[#2f2116] p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#4f3622] pb-3">
                <div className="flex items-center space-x-3 text-[#ffebd0]">
                  <FileText className="w-6 h-6 text-[#fee197]" />
                  <span className="text-caption-oryzo font-bold uppercase">DOCUMENT 02</span>
                </div>
                <span className="text-legal-oryzo text-[#fee197]">STATUS: [READY FOR UPLOAD]</span>
              </div>

              <h3 className="text-heading text-[#ffebd0] font-serif font-bold">
                PROJECT PRESENTATION (PPT)
              </h3>

              <p className="text-body-oryzo text-[#ffebd0]/80 font-sans leading-relaxed">
                Executive summary slide deck detailing the problem statement, sensor architecture, field dataset analysis, XGBoost model results, and engineering recommendations.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-[#4f3622] font-sans">
              <button
                onClick={() => alert('Opening Presentation Deck Viewer...')}
                className="btn-outline-amber flex-1 text-center py-2 text-caption-oryzo flex items-center justify-center space-x-2"
              >
                <Eye className="w-4 h-4 text-[#fee197]" />
                <span>VIEW DECK</span>
              </button>
              <button
                onClick={() => alert('Project Presentation file slot ready for upload (.pptx)')}
                className="btn-outline-dark flex-1 text-center py-2 text-caption-oryzo flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4 text-[#ffebd0]" />
                <span>UPLOAD SLOT</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

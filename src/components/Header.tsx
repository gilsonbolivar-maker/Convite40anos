import React from 'react';
import { Download, Share2, Sparkles, Trophy, Eye, Loader2, FileText } from 'lucide-react';

interface HeaderProps {
  onExportPng: () => void;
  isExporting: boolean;
  onOpenProposal: () => void;
  onOpenMetrics: () => void;
  onOpenPdf?: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onExportPng,
  isExporting,
  onOpenProposal,
  onOpenMetrics,
  onOpenPdf,
  onToggleFullscreen,
  isFullscreen
}) => {
  return (
    <header className="w-full border-b border-[#e8e2d5] bg-[#fdfcf8]/95 backdrop-blur-xl sticky top-0 z-40 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-15 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand & Event Tag */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-gradient-to-br from-[#c5a059] to-[#9e7d3b] flex items-center justify-center font-cinzel font-black text-white text-xs sm:text-base shadow-md shadow-[#c5a059]/20 border border-[#e5c98d]">
            40
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="font-cinzel text-xs sm:text-base font-bold text-[#2d2926] tracking-wide truncate">
                Lavagem Esquina do Padre
              </h1>
              <span className="hidden md:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#f4efe6] text-[#8c6e30] border border-[#c5a059]/40 shrink-0">
                Caetité • 40 Anos
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#78716c] font-montserrat truncate">
              Convite Oficial • Patrocinadores
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Metrics & Impact */}
          <button
            type="button"
            onClick={onOpenMetrics}
            className="hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-2 min-h-[40px] rounded-xl bg-[#f4efe6] hover:bg-[#eae3d5] text-[#4a4540] hover:text-[#2d2926] border border-[#ded7c8] text-xs font-semibold transition-colors shadow-xs active:scale-95"
            title="Ver métricas de impacto do evento"
          >
            <Trophy className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="hidden md:inline">Impacto & Retorno</span>
            <span className="md:hidden">Impacto</span>
          </button>

          {/* Proposal Letter Modal */}
          <button
            type="button"
            onClick={onOpenProposal}
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 min-h-[40px] rounded-xl bg-[#f4efe6] hover:bg-[#eae3d5] text-[#2d2926] border border-[#c5a059]/50 text-xs font-semibold transition-all shadow-xs active:scale-95"
            title="Abrir carta de proposta e mensagem WhatsApp"
          >
            <Share2 className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="hidden sm:inline">Carta Proposta</span>
            <span className="sm:hidden text-[11px]">Proposta</span>
          </button>

          {/* Mídia Kit PDF button */}
          {onOpenPdf && (
            <button
              type="button"
              onClick={onOpenPdf}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 min-h-[40px] rounded-xl bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-300 text-xs font-semibold transition-all shadow-xs active:scale-95"
              title="Abrir e Visualizar Mídia Kit em PDF"
            >
              <FileText className="w-3.5 h-3.5 text-amber-800" />
              <span className="hidden md:inline">Mídia Kit PDF</span>
              <span className="md:hidden text-[11px]">PDF</span>
            </button>
          )}

          {/* Export PNG */}
          <button
            type="button"
            onClick={onExportPng}
            disabled={isExporting}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 min-h-[40px] rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d4af37] to-[#b88e28] hover:from-[#b88e28] hover:to-[#9c751a] text-white font-bold text-xs transition-all shadow-md shadow-[#c5a059]/25 disabled:opacity-50 active:scale-95"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin text-white" />
                <span className="hidden sm:inline">Gerando...</span>
                <span className="sm:hidden text-[11px]">Aguarde</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                <span className="hidden sm:inline">Baixar Card (PNG)</span>
                <span className="sm:hidden text-[11px]">Baixar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

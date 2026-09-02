import React from 'react';
import { EVENT_STATS } from '../data/defaultData';
import { X, Trophy, Users, HeartHandshake, Eye, MapPin, Calendar, Sparkles } from 'lucide-react';

interface MetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MetricsModal: React.FC<MetricsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-stone-900/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#fdfcf8] border border-[#e8e2d5] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-[#2d2926]">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-[#e8e2d5] bg-[#f4efe6]/90 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="p-1.5 sm:p-2 rounded-xl bg-[#f4efe6] text-[#8c6e30] border border-[#c5a059]/40 shrink-0">
              <Trophy className="w-4 sm:w-5 h-4 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-cinzel text-sm sm:text-lg font-bold text-[#2d2926] truncate">
                Por Que Patrocinar os 40 Anos?
              </h3>
              <p className="text-[11px] sm:text-xs text-[#78716c] truncate">Impacto e retorno para marcas e empresas parceiras</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full hover:bg-[#eae3d5] text-[#78716c] hover:text-[#2d2926] transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 text-[#2d2926]">
          {/* Highlight Banner */}
          <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#460913] via-[#65101f] to-[#230409] border border-[#c5a059]/40 shadow-md">
            <div className="flex items-center gap-2 text-[#d9b872] text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1.5 sm:mb-2">
              <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> 4 Décadas de Tradição Ininterrupta
            </div>
            <h4 className="font-cinzel text-base sm:text-xl font-bold text-gold-bright">
              O Maior e Mais Emocionante Evento Cultural de Caetité
            </h4>
            <p className="text-xs sm:text-sm text-amber-100/95 mt-2 leading-relaxed font-montserrat">
              A Lavagem da Esquina do Padre chega aos seus 40 anos consolidada como símbolo de orgulho, alegria e reunião de gerações. Ao patrocinar, sua marca não apenas ganha visibilidade massiva, mas passa a integrar a história viva da cidade.
            </p>
          </div>

          {/* Key Impact Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {EVENT_STATS.map((stat, idx) => (
              <div
                key={idx}
                className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#f4efe6] border border-[#ded7c8] flex flex-col justify-between"
              >
                <div className="text-[10px] sm:text-[11px] text-[#78716c] leading-tight">{stat.label}</div>
                <div className="font-cinzel text-lg sm:text-2xl font-black text-[#8c6e30] my-1">
                  {stat.value}
                </div>
                <div className="text-[9px] sm:text-[10px] text-[#57534e] leading-tight">{stat.detail}</div>
              </div>
            ))}
          </div>

          {/* Pillars of Value for Business */}
          <div className="space-y-2.5 sm:space-y-3">
            <h5 className="font-cinzel text-xs font-bold text-[#8c6e30] uppercase tracking-widest">
              Diferenciais de Visibilidade Para a Sua Empresa
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#faf8f4] border border-[#ded7c8] flex items-start gap-2.5 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-[#f4efe6] text-[#8c6e30] border border-[#c5a059]/30 shrink-0">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h6 className="font-bold text-xs text-[#2d2926]">Exposição Contínua</h6>
                  <p className="text-[11px] text-[#78716c] mt-0.5">
                    Presença em trios elétricos, palcos, mídias digitais, cartazes, abadás e transmissões ao vivo.
                  </p>
                </div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-[#faf8f4] border border-[#ded7c8] flex items-start gap-2.5 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-[#f4efe6] text-[#8c6e30] border border-[#c5a059]/30 shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h6 className="font-bold text-xs text-[#2d2926]">Conexão Emocional</h6>
                  <p className="text-[11px] text-[#78716c] mt-0.5">
                    Associação direta a uma manifestação que carrega o carinho e o sentimento de pertencimento de Caetité.
                  </p>
                </div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-[#faf8f4] border border-[#ded7c8] flex items-start gap-2.5 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-[#f4efe6] text-[#8c6e30] border border-[#c5a059]/30 shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h6 className="font-bold text-xs text-[#2d2926]">Público Qualificado e Regional</h6>
                  <p className="text-[11px] text-[#78716c] mt-0.5">
                    Alcance de consumidores de Caetité, Guanambi, Brumado, Salvador e toda a região sudoeste da Bahia.
                  </p>
                </div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-[#faf8f4] border border-[#ded7c8] flex items-start gap-2.5 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-[#f4efe6] text-[#8c6e30] border border-[#c5a059]/30 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h6 className="font-bold text-xs text-[#2d2926]">Valorização do Comércio Local</h6>
                  <p className="text-[11px] text-[#78716c] mt-0.5">
                    Reconhecimento público de sua empresa como fomentadora ativa da cultura e economia caetiteense.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-[#e8e2d5] bg-[#f4efe6] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#b88e28] hover:from-[#b88e28] hover:to-[#9c751a] text-white font-bold text-xs shadow-md shadow-[#c5a059]/20 transition-colors min-h-[44px] flex items-center justify-center"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

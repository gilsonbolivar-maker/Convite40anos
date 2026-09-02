import React, { useState } from 'react';
import { InvitationData } from '../types';
import { SPONSOR_TIERS } from '../data/defaultData';
import { X, Copy, Check, MessageSquare, Send, Mail, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InvitationData;
  onOpenPdf?: () => void;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({ isOpen, onClose, data, onOpenPdf }) => {
  const [copied, setCopied] = useState(false);
  const currentTier = SPONSOR_TIERS.find(t => t.id === data.selectedTier) || SPONSOR_TIERS[1];

  if (!isOpen) return null;

  const getWhatsAppMessageText = () => {
    const pdfInfo = data.pdfLinkUrl
      ? `\n📄 *Mídia Kit & Apresentação Comercial em PDF:* ${data.pdfLinkUrl}\n`
      : `\n📄 *Mídia Kit Completo em PDF disponível para envio imediato.*\n`;

    return `🏛️ *CONVITE OFICIAL: 40 ANOS DA LAVAGEM DA ESQUINA DO PADRE (1988 - 2027)*\n` +
      `📍 *Caetité — Bahia*\n\n` +
      `Prezado(a) *${data.recipientCompany || 'Empresário(a)'}*,\n\n` +
      `É com imensa honra e alegria que a Comissão Organizadora convida sua empresa a fazer parte do maior marco cultural e afetivo de nossa terra.\n\n` +
      `✨ *"${data.mainHeadline}"*\n` +
      `🤝 *"${data.subHeadline}"*\n` +
      `🌟 *"${data.emotionalHook}"*\n\n` +
      `${data.invitationParagraph ? `📜 *Mensagem:* ${data.invitationParagraph}\n\n` : ''}` +
      `🎯 *Cota Sugerida:* ${currentTier.name} (${currentTier.badge})\n` +
      `📌 *Benefícios de Visibilidade:*\n` +
      currentTier.benefits.map(b => `• ${b}`).join('\n') + `\n` +
      pdfInfo + `\n` +
      `Venha conectar a sua marca ao coração do povo de Caetité nesta celebração histórica de quatro décadas de tradição, baianas, cortejo e festa!\n\n` +
      `📲 *Mais informações e confirmação de patrocínio:*\n` +
      `Telefone/WhatsApp: ${data.organizerPhone}\n` +
      `Organização: ${data.organizerContactName}`;
  };

  const handleCopyText = async () => {
    const text = getWhatsAppMessageText();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 }
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(getWhatsAppMessageText());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-stone-900/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#fdfcf8] border border-[#e8e2d5] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-[#2d2926]">
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-[#e8e2d5] bg-[#f4efe6]/90 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="p-1.5 sm:p-2 rounded-xl bg-[#f4efe6] text-[#8c6e30] border border-[#c5a059]/40 shrink-0">
              <Mail className="w-4 sm:w-5 h-4 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-cinzel text-sm sm:text-lg font-bold text-[#2d2926] truncate">
                Carta Convite Oficial aos Empresários
              </h3>
              <p className="text-[11px] sm:text-xs text-[#78716c] truncate">Texto formatado para envio direto via WhatsApp ou E-mail</p>
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

        {/* Modal Content - Scrollable Text Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5 sm:space-y-4 text-[#2d2926] text-xs sm:text-sm leading-relaxed">
          {/* Emphasized Quotes Box */}
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#460913] to-[#230409] border border-[#c5a059]/40 text-center space-y-1.5 sm:space-y-2 shadow-md">
            <span className="font-cinzel text-[10px] sm:text-xs uppercase tracking-widest text-[#d9b872]">
              40 Anos de Tradição • Caetité - BA
            </span>
            <h4 className="font-cinzel text-base sm:text-xl font-bold text-gold-bright">
              {data.mainHeadline}
            </h4>
            <p className="font-montserrat font-medium text-amber-100 text-xs sm:text-sm">
              {data.subHeadline}
            </p>
            <p className="font-playfair italic text-amber-200 text-xs sm:text-sm pt-0.5">
              &ldquo;{data.emotionalHook}&rdquo;
            </p>
          </div>

          {/* Letter Body Preview */}
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#faf8f4] border border-[#ded7c8] font-mono text-[11px] sm:text-xs whitespace-pre-wrap text-[#4a4540] max-h-60 overflow-y-auto">
            {getWhatsAppMessageText()}
          </div>

          {/* Key Benefits of the selected tier */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#f4efe6] border border-[#ded7c8]">
            <h5 className="font-semibold text-[#8c6e30] text-xs uppercase tracking-wider mb-2">
              Contrapartidas da {currentTier.name}:
            </h5>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-xs text-[#57534e]">
              {currentTier.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-[#c5a059] font-bold shrink-0">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-[#e8e2d5] bg-[#f4efe6] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            {onOpenPdf && (
              <button
                type="button"
                onClick={() => {
                  onOpenPdf();
                }}
                className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-900 text-xs font-semibold transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                <span>Ver Mídia Kit (PDF)</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#78716c] hover:text-[#2d2926] hover:bg-[#eae3d5] transition-colors text-center"
            >
              Fechar
            </button>

            <button
              type="button"
              onClick={handleCopyText}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#faf8f4] hover:bg-[#eae3d5] text-[#2d2926] border border-[#ded7c8] text-xs font-bold transition-all shadow-xs active:scale-95 min-h-[44px]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-emerald-700 truncate">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#8c6e30] shrink-0" />
                  <span className="truncate">Copiar Mensagem</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleOpenWhatsApp}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#285c3f] hover:bg-[#1e4630] text-white text-xs font-bold transition-all shadow-md shadow-emerald-950/20 active:scale-95 min-h-[44px]"
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span>Disparar no WhatsApp</span>
              <Send className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

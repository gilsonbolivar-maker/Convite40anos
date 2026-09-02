import React from 'react';
import { InvitationData } from '../types';
import { SPONSOR_TIERS, COLOR_PALETTES, isThemeLight } from '../data/defaultData';
import { OfficialEmblem } from './OfficialEmblem';
import { FestiveArtworkCanvas } from './FestiveArtworkCanvas';
import { Sparkles, Award, FileText } from 'lucide-react';

interface InvitationCardProps {
  data: InvitationData;
  cardRef?: React.RefObject<HTMLDivElement | null>;
  previewScale?: number;
  onOpenPdf?: () => void;
  className?: string;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({
  data,
  cardRef,
  previewScale = 1,
  onOpenPdf,
  className = ''
}) => {
  const currentTier = SPONSOR_TIERS.find(t => t.id === data.selectedTier) || SPONSOR_TIERS[1];
  const palette = COLOR_PALETTES.find(p => p.id === data.theme) || COLOR_PALETTES[0];
  const isLight = isThemeLight(data.theme);

  // Dynamic aspect ratio container sizing
  const getFormatClasses = () => {
    switch (data.format) {
      case 'story':
        return 'w-[380px] sm:w-[420px] min-h-[675px] sm:min-h-[746px] aspect-[9/16]'; // 9:16 Story / Status
      case 'banner':
        return 'w-full max-w-[720px] min-h-[360px] sm:min-h-[405px] aspect-[16/9]'; // 16:9 Landscape
      case 'executive':
        return 'w-[380px] sm:w-[500px] md:w-[520px] min-h-[475px] sm:min-h-[625px] md:min-h-[650px] aspect-[4/5]'; // Executive 4:5 Presentation
      case 'square':
      default:
        return 'w-[360px] sm:w-[500px] md:w-[540px] min-h-[360px] sm:min-h-[500px] md:min-h-[540px] aspect-square'; // 1:1 Feed & WhatsApp Card
    }
  };

  return (
    <div
      ref={cardRef}
      id="invitation-card-capture"
      className={`relative overflow-hidden ${
        isLight ? 'text-[#2d2926]' : 'text-stone-100'
      } flex flex-col justify-between p-4 sm:p-5 md:p-5 rounded-2xl sm:rounded-3xl shadow-2xl transition-all duration-300 select-none ${getFormatClasses()} ${className}`}
      style={{
        transform: previewScale !== 1 ? `scale(${previewScale})` : undefined,
        transformOrigin: 'top center'
      }}
    >
      {/* Background artwork / custom image */}
      <FestiveArtworkCanvas
        theme={data.theme}
        customBgUrl={data.backgroundImageUrl}
        overlayOpacity={data.backgroundOverlayOpacity}
        blur={data.backgroundBlur}
      />

      {/* Ornate Gold Border Inner Frame */}
      <div
        className={`absolute inset-2.5 sm:inset-4 rounded-xl sm:rounded-2xl border-2 ${
          isLight ? 'border-amber-600/40' : 'border-amber-400/40'
        } pointer-events-none z-10`}
      >
        {/* Ornate Golden Corners */}
        <div
          className={`absolute -top-1 -left-1 w-3 sm:w-4 h-3 sm:h-4 border-t-2 border-l-2 ${
            isLight ? 'border-amber-600' : 'border-amber-300'
          }`}
        />
        <div
          className={`absolute -top-1 -right-1 w-3 sm:w-4 h-3 sm:h-4 border-t-2 border-r-2 ${
            isLight ? 'border-amber-600' : 'border-amber-300'
          }`}
        />
        <div
          className={`absolute -bottom-1 -left-1 w-3 sm:w-4 h-3 sm:h-4 border-b-2 border-l-2 ${
            isLight ? 'border-amber-600' : 'border-amber-300'
          }`}
        />
        <div
          className={`absolute -bottom-1 -right-1 w-3 sm:w-4 h-3 sm:h-4 border-b-2 border-r-2 ${
            isLight ? 'border-amber-600' : 'border-amber-300'
          }`}
        />
        {/* Inner thin line */}
        <div
          className={`absolute inset-1 rounded-lg sm:rounded-xl border ${
            isLight ? 'border-amber-600/20' : 'border-amber-300/20'
          }`}
        />
      </div>

      {/* TOP HEADER SECTION */}
      <div className="relative z-20 flex items-start justify-between gap-2 sm:gap-3">
        {/* Recipient Greeting Tag */}
        <div className="flex flex-col min-w-0">
          <div
            className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full ${
              isLight
                ? 'bg-white/95 border border-amber-600/40 text-amber-900 shadow-sm'
                : 'bg-stone-900/85 border border-amber-400/40 text-amber-300 shadow-lg'
            } text-[10px] sm:text-xs font-semibold uppercase tracking-wider backdrop-blur-md`}
          >
            <Sparkles
              className={`w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0 ${
                isLight ? 'text-amber-600' : 'text-amber-400'
              }`}
            />
            <span className="truncate">Convite Empresarial</span>
          </div>
          {data.recipientCompany && (
            <p
              className={`mt-1 sm:mt-1.5 text-[10px] sm:text-xs font-montserrat tracking-wide truncate max-w-[200px] sm:max-w-xs ${
                isLight ? 'text-[#4a4540]' : 'text-amber-100/90'
              }`}
            >
              Para:{' '}
              <strong className={isLight ? 'text-[#1c1917] font-bold' : 'text-white font-semibold'}>
                {data.recipientCompany}
              </strong>
            </p>
          )}
        </div>

        {/* Tier badge or celebration medal */}
        {data.showTierBadge && (
          <div
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full backdrop-blur-md shadow-md shrink-0 ${
              isLight
                ? 'bg-gradient-to-r from-amber-100 via-amber-50 to-amber-200 border border-amber-500/60 text-amber-900'
                : 'bg-gradient-to-r from-amber-500/30 to-amber-700/40 border border-amber-400/50 text-amber-200'
            }`}
          >
            <Award className={`w-3 sm:w-3.5 h-3 sm:h-3.5 ${isLight ? 'text-amber-700' : 'text-amber-300'}`} />
            <span
              className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${
                isLight ? 'text-amber-900' : 'text-amber-200'
              }`}
            >
              {currentTier.badge}
            </span>
          </div>
        )}
      </div>

      {/* CENTER SECTION - OFFICIAL EMBLEM & REQUIRED INVITATION PHRASES */}
      <div className="relative z-20 my-auto py-2 sm:py-3 flex flex-col items-center text-center">
        {/* Official 40 Anos Emblem */}
        {data.showOfficialEmblem && (
          <div className="mb-1.5 sm:mb-2 transform hover:scale-[1.02] transition-transform duration-300 max-w-full">
            <OfficialEmblem
              variant={data.format === 'story' ? 'full' : 'full'}
              isLight={isLight}
            />
          </div>
        )}

        {/* 1st Key Phrase: "Faça parte dessa história." */}
        <div className="mt-1 sm:mt-2 relative max-w-full px-2">
          <h3
            className={`font-cinzel text-lg sm:text-2xl md:text-3xl font-bold tracking-wide leading-tight ${
              isLight ? `${palette.headlineColor} drop-shadow-xs` : 'text-gold-bright drop-shadow-md'
            }`}
          >
            {data.mainHeadline}
          </h3>
          <div
            className={`w-20 sm:w-24 h-0.5 mx-auto mt-1 sm:mt-1.5 bg-gradient-to-r ${
              isLight
                ? 'from-transparent via-amber-600/70 to-transparent'
                : 'from-transparent via-amber-400 to-transparent'
            }`}
          />
        </div>

        {/* 2nd Key Phrase: "Sua marca atrelada a 40 anos de tradição." */}
        <p
          className={`mt-1.5 sm:mt-2 font-montserrat text-xs sm:text-sm md:text-base font-semibold tracking-wide max-w-md px-2 ${
            isLight ? `${palette.subHeadlineColor}` : 'text-amber-100/95 drop-shadow'
          }`}
        >
          {data.subHeadline}
        </p>

        {/* 3rd Key Phrase: "A Lavagem é uma parte de Caetité, você também é." */}
        <div
          className={`mt-2 sm:mt-2.5 px-3 sm:px-3.5 py-1.5 rounded-xl backdrop-blur-md max-w-lg mx-2 ${
            isLight
              ? 'bg-white/90 border border-amber-500/40 shadow-md'
              : 'bg-stone-950/80 border border-amber-400/35 shadow-lg'
          }`}
        >
          <p
            className={`font-playfair italic text-[11px] sm:text-xs md:text-sm font-medium leading-relaxed ${
              isLight ? palette.hookTextColor : 'text-amber-200 drop-shadow'
            }`}
          >
            &ldquo;{data.emotionalHook}&rdquo;
          </p>
        </div>

        {/* Short Paragraph Inviting Businessman to Celebrate Milestone */}
        {data.invitationParagraph && (
          <p
            className={`mt-1.5 sm:mt-2 max-w-md font-montserrat text-[10px] sm:text-xs leading-snug font-normal px-2 ${
              isLight ? 'text-[#4a4540]' : 'text-amber-100/90 drop-shadow'
            }`}
          >
            {data.invitationParagraph}
          </p>
        )}

        {/* Custom Sponsor Logo Slot: only rendered once a sponsor logo exists,
            so the card stays clean while no brand is attached. */}
        {data.showSponsorSlot && data.customLogoUrl && (
          <div className="mt-2 flex items-center justify-center gap-3">
            <div
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg backdrop-blur-md flex items-center gap-2 ${
                isLight
                  ? 'bg-white/95 border border-amber-500/50 shadow-sm'
                  : 'bg-stone-900/90 border border-amber-400/40 shadow-md'
              }`}
            >
              <span
                className={`text-[9px] sm:text-[10px] uppercase font-bold ${
                  isLight ? 'text-amber-800' : 'text-amber-300/80'
                }`}
              >
                Parceria:
              </span>
              <img
                src={data.customLogoUrl}
                alt="Logo do Patrocinador"
                referrerPolicy="no-referrer"
                className="h-6 sm:h-7 max-w-[90px] sm:max-w-[110px] object-contain"
              />
            </div>
          </div>
        )}
        {/* Interactive PDF Attachment Button (Clickable when shared / previewed) */}
        {data.showPdfButton && (
          <div className="mt-2 flex items-center justify-center">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onOpenPdf) {
                  onOpenPdf();
                } else if (data.pdfLinkUrl) {
                  window.open(data.pdfLinkUrl, '_blank');
                }
              }}
              className={`group inline-flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wide transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md cursor-pointer ${
                isLight
                  ? 'bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white hover:from-amber-500 hover:to-amber-700 shadow-amber-900/20'
                  : 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-stone-950 hover:from-amber-400 hover:to-yellow-400 shadow-amber-500/25'
              }`}
            >
              <FileText className="w-3.5 h-3.5 shrink-0 animate-bounce" />
              <span>{data.pdfButtonLabel || 'Ver Proposta Comercial (PDF)'}</span>
              <span className="opacity-70 text-[9px]">↗</span>
            </button>
          </div>
        )}
      </div>

      {/* BOTTOM FOOTER SECTION */}
      <div
        className={`relative z-20 pt-2 border-t flex items-center justify-between gap-2 text-[10px] sm:text-[11px] ${
          isLight ? 'border-amber-600/30 text-amber-950 font-medium' : 'border-amber-400/30 text-amber-200/90'
        }`}
      >
        <div className="flex items-center gap-1.5 font-cinzel font-semibold truncate">
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
              isLight ? 'bg-amber-600' : 'bg-amber-400'
            }`}
          />
          <span className="truncate">{data.edition}</span>
        </div>

      </div>
    </div>
  );
};

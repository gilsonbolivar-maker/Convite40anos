import React, { useState, useRef, useCallback, useEffect } from 'react';
import { InvitationData, CardFormat, CardTheme } from './types';
import { DEFAULT_INVITATION_DATA, SPONSOR_TIERS, COLOR_PALETTES } from './data/defaultData';
import { Header } from './components/Header';
import { InvitationCard } from './components/InvitationCard';
import { CardEditor } from './components/CardEditor';
import { ProposalModal } from './components/ProposalModal';
import { MetricsModal } from './components/MetricsModal';
import { PdfViewerModal } from './components/PdfViewerModal';
import { generateOfficialProposalPdf } from './utils/generatePdfProposal';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import {
  Download,
  Share2,
  Maximize2,
  Minimize2,
  Sparkles,
  Phone,
  Copy,
  Check,
  Building2,
  Eye,
  Award,
  Palette,
  Sliders,
  FileText
} from 'lucide-react';

export default function App() {
  const [data, setData] = useState<InvitationData>(DEFAULT_INVITATION_DATA);
  const [isExporting, setIsExporting] = useState(false);
  const [isProposalOpen, setIsProposalOpen] = useState(false);
  const [isMetricsOpen, setIsMetricsOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedQuick, setCopiedQuick] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [mobileTab, setMobileTab] = useState<'preview' | 'editor'>('preview');
  const [calculatedScale, setCalculatedScale] = useState<number>(1);

  const cardRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  const handleDataChange = useCallback((updated: Partial<InvitationData>) => {
    setData(prev => ({ ...prev, ...updated }));
  }, []);

  const handleResetData = useCallback(() => {
    setData(DEFAULT_INVITATION_DATA);
  }, []);

  // Compute responsive auto-scale so the card always fits available width perfectly on mobile and tablet
  useEffect(() => {
    const container = previewContainerRef.current;
    if (!container) return;

    const getBaseWidth = () => {
      switch (data.format) {
        case 'story':
          return 420;
        case 'banner':
          return 720;
        case 'executive':
          return 520;
        case 'square':
        default:
          return 540;
      }
    };

    const updateScale = () => {
      if (!container) return;
      const containerWidth = container.clientWidth;
      const baseWidth = getBaseWidth();
      const padding = window.innerWidth < 640 ? 16 : 36;
      const availableWidth = Math.max(containerWidth - padding, 270);

      if (availableWidth < baseWidth) {
        const scale = Number((availableWidth / baseWidth).toFixed(3));
        setCalculatedScale(Math.min(scale, 1));
      } else {
        setCalculatedScale(1);
      }
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(container);
    window.addEventListener('resize', updateScale);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, [data.format]);

  // Capture the live card as a crisp PNG data URL. Shared by the PNG download
  // and by the PDF, which uses the same artwork as its cover page.
  const captureCardPng = useCallback(async (): Promise<string | null> => {
    if (!cardRef.current) return null;
    try {
      return await toPng(cardRef.current, {
        quality: 0.98,
        pixelRatio: 2.5,
        cacheBust: true,
      });
    } catch (err) {
      console.error('Error capturing card image:', err);
      return null;
    }
  }, []);

  // Export card to PNG using html-to-image
  const handleExportPng = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);

      const dataUrl = await captureCardPng();
      if (!dataUrl) return;

      const cleanFileName = `Convite_40_Anos_Lavagem_Esquina_do_Padre_${
        data.recipientCompany.replace(/[^a-zA-Z0-9]/g, '_') || 'Empresas'
      }.png`;

      const link = document.createElement('a');
      link.download = cleanFileName;
      link.href = dataUrl;
      link.click();

      // Trigger celebratory confetti
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Headline used on the native share sheet: the attached PDF carries the rest,
  // so the message stays short next to the file.
  const shareHeadline = '🏛️ CONVITE 40 ANOS DA LAVAGEM DA ESQUINA DO PADRE - CAETITÉ/BA';

  // Full message, used where no file can be attached.
  const buildInvitationMessage = () => {
    const pdfNote = data.pdfLinkUrl
      ? `\n📄 *Mídia Kit Comercial em PDF:* ${data.pdfLinkUrl}\n`
      : `\n📄 *Mídia Kit Oficial em PDF disponível com a Comissão Organizadora*\n`;

    return (
      `🏛️ *CONVITE 40 ANOS DA LAVAGEM DA ESQUINA DO PADRE - CAETITÉ/BA*\n\n` +
      `Olá! Gostaríamos de convidar a empresa *${data.recipientCompany}* para fazer parte desse momento histórico:\n\n` +
      `✨ *"${data.mainHeadline}"*\n` +
      `🤝 *"${data.subHeadline}"*\n` +
      `🌟 *"${data.emotionalHook}"*\n\n` +
      `${data.invitationParagraph ? `📜 *Mensagem:* ${data.invitationParagraph}\n\n` : ''}` +
      pdfNote +
      `📲 Para saber mais sobre as cotas de patrocínio, fale conosco pelo WhatsApp: ${data.organizerPhone}`
    );
  };

  const handleQuickWhatsApp = () => {
    const text = encodeURIComponent(buildInvitationMessage());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Shares the invitation through the device's native share sheet with the PDF
  // attached, so WhatsApp and e-mail carry the artwork and the media kit in one
  // step. Desktop browsers cannot share files, so they fall back to WhatsApp text.
  const handleShare = async () => {
    setIsSharing(true);
    try {
      const artwork = await captureCardPng();
      const { blob, fileName } = generateOfficialProposalPdf(data, artwork);
      const file = new File([blob], fileName, { type: 'application/pdf' });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Convite 40 Anos da Lavagem da Esquina do Padre',
          text: shareHeadline,
        });
        return;
      }

      handleQuickWhatsApp();
    } catch (err) {
      // Dismissing the share sheet is a normal outcome, not a failure.
      if ((err as Error)?.name === 'AbortError') return;
      console.error('Error sharing invitation:', err);
      handleQuickWhatsApp();
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopyShortText = async () => {
    const text =
      `🏛️ CONVITE: 40 ANOS DA LAVAGEM DA ESQUINA DO PADRE (Caetité - BA)\n\n` +
      `"${data.mainHeadline}"\n` +
      `"${data.subHeadline}"\n` +
      `"${data.emotionalHook}"\n\n` +
      `${data.invitationParagraph ? `${data.invitationParagraph}\n\n` : ''}` +
      (data.pdfLinkUrl ? `Mídia Kit PDF: ${data.pdfLinkUrl}\n\n` : '') +
      `Destinado a: ${data.recipientCompany}\n` +
      `Contato Comissão: ${data.organizerPhone} (${data.organizerContactName})`;
    await navigator.clipboard.writeText(text);
    setCopiedQuick(true);
    setTimeout(() => setCopiedQuick(false), 2000);
  };

  const currentTier = SPONSOR_TIERS.find(t => t.id === data.selectedTier) || SPONSOR_TIERS[1];

  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#2d2926] flex flex-col font-jakarta selection:bg-[#c5a059]/20 selection:text-[#8c6e30]">
      {/* Top Navigation */}
      <Header
        onExportPng={handleExportPng}
        isExporting={isExporting}
        onOpenProposal={() => setIsProposalOpen(true)}
        onOpenMetrics={() => setIsMetricsOpen(true)}
        onOpenPdf={() => setIsPdfModalOpen(true)}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        isFullscreen={isFullscreen}
      />

      {/* Mobile Tab Switcher (Visible only on mobile screens < lg) */}
      <div className="lg:hidden sticky top-15 z-30 w-full bg-[#fdfcf8]/95 backdrop-blur-md border-b border-[#e8e2d5] px-4 py-2 flex items-center justify-center shadow-xs">
        <div className="flex items-center w-full max-w-sm p-1 rounded-2xl bg-[#f4efe6] border border-[#ded7c8]">
          <button
            type="button"
            onClick={() => setMobileTab('preview')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === 'preview'
                ? 'bg-[#2d2926] text-white shadow-xs'
                : 'text-[#78716c] hover:text-[#2d2926]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Visualizar Card</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('editor')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === 'editor'
                ? 'bg-[#2d2926] text-white shadow-xs'
                : 'text-[#78716c] hover:text-[#2d2926]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Personalizar</span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* LEFT COLUMN: CARD PREVIEW & DIRECT ACTIONS */}
        <section
          className={`lg:col-span-7 flex flex-col items-center gap-4 sm:gap-6 lg:sticky lg:top-24 ${
            mobileTab === 'editor' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Card Showcase Frame */}
          <div
            ref={previewContainerRef}
            className="w-full flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-[#fdfcf8] border border-[#e8e2d5] shadow-xl shadow-stone-200/50 relative overflow-hidden backdrop-blur-md"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Format & Quick Palette Selector Bars */}
            <div className="relative z-10 mb-3 sm:mb-4 w-full flex flex-col gap-2.5">
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2.5">
                {/* Format Selector Quick Bar - Scrollable on mobile */}
                <div className="w-full sm:w-auto overflow-x-auto no-scrollbar pb-0.5 sm:pb-0">
                  <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-[#f4efe6] border border-[#ded7c8] backdrop-blur-md shrink-0">
                    {[
                      { id: 'square', label: '1:1 Feed' },
                      { id: 'story', label: '9:16 Story' },
                      { id: 'executive', label: '4:5 Proposta' },
                      { id: 'banner', label: '16:9 Banner' }
                    ].map(fmt => (
                      <button
                        key={fmt.id}
                        type="button"
                        onClick={() => handleDataChange({ format: fmt.id as CardFormat })}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                          data.format === fmt.id
                            ? 'bg-[#2d2926] text-white shadow-xs font-bold'
                            : 'text-[#78716c] hover:text-[#2d2926]'
                        }`}
                      >
                        {fmt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Palette Swatches Bar */}
                <div className="w-full sm:w-auto overflow-x-auto no-scrollbar pb-0.5 sm:pb-0 flex items-center justify-start sm:justify-end">
                  <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#f4efe6] border border-[#ded7c8] shadow-xs shrink-0">
                    <Palette className="w-3.5 h-3.5 text-[#8c6e30] ml-1 mr-0.5 shrink-0" />
                    <div className="flex items-center gap-1">
                      {COLOR_PALETTES.map(pal => {
                        const isSelected = data.theme === pal.id;
                        return (
                          <button
                            key={pal.id}
                            type="button"
                            title={`${pal.name} - ${pal.tagline}`}
                            onClick={() => handleDataChange({ theme: pal.id })}
                            className={`group relative p-1 rounded-full transition-all ${
                              isSelected
                                ? 'ring-2 ring-[#c5a059] ring-offset-1 bg-white scale-110 shadow-xs'
                                : 'hover:scale-105 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <div
                              className="w-4 h-4 rounded-full border border-white/60 shadow-inner"
                              style={{ backgroundColor: pal.previewColors[0] }}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* View Scale Helper on smaller viewports */}
              {calculatedScale < 1 && (
                <div className="flex items-center justify-between text-[11px] text-[#78716c] px-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span>Enquadrado para seu dispositivo ({Math.round(calculatedScale * 100)}%)</span>
                  </span>
                  <span className="text-[10px] text-[#a8a196]">Exportação gerará alta resolução (2.5x)</span>
                </div>
              )}
            </div>

            {/* LIVE INVITATION CARD RENDER WITH RESPONSIVE WRAPPER */}
            <div className="relative z-10 w-full overflow-hidden flex justify-center items-center py-2">
              <div
                style={{
                  transform: calculatedScale !== 1 ? `scale(${calculatedScale})` : undefined,
                  transformOrigin: 'top center',
                  marginBottom: calculatedScale < 1 ? `-${Math.round((1 - calculatedScale) * 360)}px` : undefined,
                  transition: 'transform 0.2s ease, margin 0.2s ease'
                }}
              >
                <InvitationCard
                  data={data}
                  cardRef={cardRef}
                  onOpenPdf={() => setIsPdfModalOpen(true)}
                />
              </div>
            </div>

            {/* Quick Action Toolbar directly beneath the card */}
            <div className="relative z-10 mt-5 sm:mt-6 w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={handleExportPng}
                disabled={isExporting}
                className="w-full py-3 px-3 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d4af37] to-[#b88e28] hover:from-[#b88e28] hover:to-[#9c751a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#c5a059]/25 transition-all active:scale-95 disabled:opacity-50 min-h-[44px]"
              >
                <Download className="w-4 h-4 text-white shrink-0" />
                <span className="truncate">{isExporting ? 'Gerando...' : 'Baixar Card'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsPdfModalOpen(true)}
                className="w-full py-3 px-3 rounded-xl bg-amber-50 hover:bg-amber-100/90 text-amber-950 border border-amber-300 font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 min-h-[44px]"
                title="Abrir e Visualizar PDF da Proposta"
              >
                <FileText className="w-4 h-4 text-amber-800 shrink-0" />
                <span className="truncate">Abrir PDF</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                disabled={isSharing}
                title="Compartilhar o convite com o PDF anexado"
                className="w-full py-3 px-3 rounded-xl bg-[#285c3f] hover:bg-[#1e4630] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-950/20 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-wait min-h-[44px]"
              >
                <Share2 className="w-4 h-4 shrink-0" />
                <span className="truncate">{isSharing ? 'Preparando...' : 'Compartilhar'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyShortText}
                className="w-full py-3 px-3 rounded-xl bg-[#f4efe6] hover:bg-[#eae3d5] text-[#2d2926] border border-[#ded7c8] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors active:scale-95 min-h-[44px]"
                title="Copiar texto do convite"
              >
                {copiedQuick ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-emerald-700 truncate font-bold">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#8c6e30] shrink-0" />
                    <span className="truncate">Copiar Frase</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Context Summary Card */}
          <div className="w-full p-3.5 sm:p-4 rounded-2xl bg-[#f4efe6]/90 border border-[#e8e2d5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#6e6659]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
              <span>Pronto para envio a empresários de Caetité e região</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPdfModalOpen(true)}
                className="text-amber-800 hover:text-amber-950 font-semibold underline underline-offset-2 flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Ver Mídia Kit PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setIsProposalOpen(true)}
                className="text-[#8c6e30] hover:text-[#685020] font-semibold underline underline-offset-2"
              >
                Ver Carta Completa
              </button>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: CARD EDITOR & OPTIONS */}
        <section
          className={`lg:col-span-5 flex flex-col gap-6 ${
            mobileTab === 'preview' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          <CardEditor
            data={data}
            onChange={handleDataChange}
            onReset={handleResetData}
            onOpenPdfViewer={() => setIsPdfModalOpen(true)}
          />
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-[#e8e2d5] bg-[#f4efe6] py-5 sm:py-6 text-center text-xs text-[#78716c]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 font-cinzel text-[#8c6e30] text-[11px] sm:text-xs">
            <span>❖</span>
            <span>40 Anos da Lavagem da Esquina do Padre (1986 — 2026)</span>
            <span>❖</span>
          </div>
          <p className="font-montserrat text-[10px] sm:text-xs">
            Caetité — Bahia • Tradição, Cultura e Alegria
          </p>
        </div>
      </footer>

      {/* MODALS */}
      <ProposalModal
        isOpen={isProposalOpen}
        onClose={() => setIsProposalOpen(false)}
        data={data}
        onOpenPdf={() => {
          setIsProposalOpen(false);
          setIsPdfModalOpen(true);
        }}
      />

      <MetricsModal
        isOpen={isMetricsOpen}
        onClose={() => setIsMetricsOpen(false)}
      />

      <PdfViewerModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        data={data}
        onPdfUpdate={handleDataChange}
        onCaptureArtwork={captureCardPng}
      />

      {/* FULLSCREEN PREVIEW MODAL */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn">
          <div className="absolute top-4 right-4 flex items-center gap-2 z-50">
            <button
              type="button"
              onClick={handleExportPng}
              className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Baixar
            </button>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>
          <div className="transform scale-100 sm:scale-110 transition-transform">
            <InvitationCard
              data={data}
              cardRef={cardRef}
              onOpenPdf={() => {
                setIsFullscreen(false);
                setIsPdfModalOpen(true);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

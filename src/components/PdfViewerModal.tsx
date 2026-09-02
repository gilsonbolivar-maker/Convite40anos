import React, { useState, useEffect } from 'react';
import { InvitationData } from '../types';
import { generateOfficialProposalPdf } from '../utils/generatePdfProposal';
import { X, Download } from 'lucide-react';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InvitationData;
  onPdfUpdate?: (data: Partial<InvitationData>) => void;
  /** Captures the live invitation card as a PNG data URL for the PDF cover page. */
  onCaptureArtwork?: () => Promise<string | null>;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  isOpen,
  onClose,
  data,
  onCaptureArtwork
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activePdfUrl, setActivePdfUrl] = useState<string | null>(null);
  const [activeFileName, setActiveFileName] = useState<string>('Cartilha_IRPJ_40_Anos_Lavagem_PRONAC.pdf');
  const [artworkDataUrl, setArtworkDataUrl] = useState<string | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);

  // Initialize or regenerate PDF. The generated Cartilha carries the invitation
  // artwork as its cover page, so a single file can be shared on WhatsApp or e-mail.
  useEffect(() => {
    if (!isOpen) return;

    if (data.pdfAttachmentUrl) {
      setActivePdfUrl(data.pdfAttachmentUrl);
      setActiveFileName(data.pdfFileName || 'Cartilha_IRPJ_40_Anos_Lavagem.pdf');
      return;
    }

    if (data.pdfLinkUrl) {
      setActivePdfUrl(data.pdfLinkUrl);
      setActiveFileName('Cartilha_IRPJ_Externa.pdf');
      return;
    }

    let cancelled = false;

    const prepare = async () => {
      setIsPreparing(true);
      const artwork = onCaptureArtwork ? await onCaptureArtwork() : null;
      if (cancelled) return;

      setArtworkDataUrl(artwork);
      const { url, fileName } = generateOfficialProposalPdf(data, artwork);
      setActivePdfUrl(url);
      setActiveFileName(fileName);
      setIsPreparing(false);
    };

    prepare();

    return () => {
      cancelled = true;
    };
  }, [isOpen, data.pdfAttachmentUrl, data.pdfLinkUrl, data.recipientCompany]);

  const handleDownload = async () => {
    // Always download a freshly generated Cartilha (artwork cover + 6 pages) or the attached PDF
    let downloadUrl = activePdfUrl;
    let fileName = activeFileName;

    if (!data.pdfAttachmentUrl && !data.pdfLinkUrl) {
      const artwork = artworkDataUrl ?? (onCaptureArtwork ? await onCaptureArtwork() : null);
      const { url, fileName: genFileName } = generateOfficialProposalPdf(data, artwork);
      downloadUrl = url;
      fileName = genFileName;
    }

    if (!downloadUrl) return;

    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = fileName || 'Cartilha_IRPJ_40_Anos_Lavagem_PRONAC_264180.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-5xl h-[95vh] max-h-[920px] bg-[#1a1c23] text-stone-100 rounded-2xl sm:rounded-3xl shadow-2xl border border-amber-400/40 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar: page switching only, per the simplified reading flow */}
        <div className="flex items-center gap-2 px-3 sm:px-5 py-3 bg-[#132238] border-b border-amber-500/30 shrink-0">
          <div className="flex-1 flex items-center gap-1.5 sm:gap-2 overflow-x-auto">
            <span className="shrink-0 mr-1 font-cinzel text-[11px] sm:text-sm font-black uppercase tracking-wider text-amber-400">
              Páginas:
            </span>

            {[
              ...(artworkDataUrl ? [{ num: 0, label: 'Arte' }] : []),
              { num: 1, label: 'Capa' },
              { num: 2, label: 'A Lei' },
              { num: 3, label: 'Cenários' },
              { num: 4, label: 'Vantagens' },
              { num: 5, label: 'Segurança' },
              { num: 6, label: 'Como Aplicar' },
            ].map((pg) => {
              const isSelected = currentPage === pg.num;
              return (
                <button
                  key={pg.num}
                  type="button"
                  onClick={() => setCurrentPage(pg.num)}
                  title={`Ir para a Página ${pg.num}`}
                  className={`shrink-0 flex items-center gap-1.5 rounded-xl px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-black shadow-md transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-stone-950 ring-2 ring-amber-300 font-mono'
                      : 'border border-stone-700/80 bg-[#192434] font-mono text-stone-200 hover:bg-[#223348] hover:text-amber-200'
                  }`}
                >
                  <span className="text-sm sm:text-base font-black">{pg.num}</span>
                  <span className="hidden md:inline font-sans text-[11px] font-semibold tracking-normal opacity-90">
                    {pg.label}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onClose}
            title="Fechar"
            className="shrink-0 rounded-xl bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Download sits directly under the page switcher */}
        <div className="flex justify-center border-b border-stone-800 bg-[#0a101a] px-3 py-2.5 shrink-0">
          <button
            type="button"
            onClick={handleDownload}
            disabled={isPreparing}
            title="Baixar o convite e a Cartilha em um unico PDF"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2 text-sm font-bold text-stone-950 shadow-md transition-all hover:from-amber-400 hover:to-amber-500 active:scale-95 disabled:cursor-wait disabled:opacity-60"
          >
            <Download className="w-4 h-4" />
            {isPreparing ? 'Montando PDF...' : 'Baixar PDF'}
          </button>
        </div>

        {/* Content Viewer Body */}
        <div className="flex-1 bg-[#1a1c23] overflow-y-auto p-3 sm:p-6 flex items-center justify-center">
          {
            /* VISUAL HIGH FIDELITY RENDERER FOR 6 PAGES */
            <div className="w-full max-w-2xl bg-white text-[#2d2926] shadow-2xl rounded-2xl overflow-hidden border border-stone-300 flex flex-col min-h-[580px] sm:min-h-[660px] relative transition-all animate-fadeIn">
              
              {/* PAGE 0: ARTE DO CONVITE (capa do arquivo compartilhado) */}
              {currentPage === 0 && artworkDataUrl && (
                <div className="flex-1 bg-[#132238] p-5 sm:p-8 flex flex-col items-center justify-center gap-4">
                  <img
                    src={artworkDataUrl}
                    alt="Arte do convite oficial"
                    className="max-h-[460px] w-auto max-w-full rounded-lg shadow-2xl bg-white"
                  />
                  <p className="font-montserrat text-[11px] sm:text-xs text-center text-[#d9a036] font-bold uppercase tracking-[0.18em]">
                    Convite oficial • 40 anos da Lavagem da Esquina do Padre
                  </p>
                  <p className="font-montserrat text-[10px] sm:text-[11px] text-center text-stone-300 max-w-md leading-relaxed">
                    Esta arte é a primeira página do PDF — é ela que aparece como miniatura
                    ao enviar o arquivo pelo WhatsApp ou por e-mail.
                  </p>
                </div>
              )}

              {/* PAGE 1: CAPA */}
              {currentPage === 1 && (
                <div className="flex-1 bg-[#132238] text-white p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d9a036_1px,transparent_1px)] [background-size:16px_16px]" />

                  <div className="relative z-10">
                    <p className="font-montserrat text-xs tracking-[0.3em] font-black text-[#d9a036] uppercase mb-4 sm:mb-6">
                      C A R T I L H A
                    </p>

                    <h1 className="font-cinzel text-3xl sm:text-5xl font-black text-white leading-tight uppercase tracking-tight mb-4">
                      DIRECIONAMENTO<br />
                      DO IMPOSTO<br />
                      DE RENDA
                    </h1>

                    <div className="w-full h-1 bg-[#d9a036] my-4 sm:my-6 rounded-full" />

                    <p className="font-montserrat text-sm sm:text-base text-stone-200 max-w-lg leading-relaxed font-light">
                      Guia visual para empresas do Lucro Real: como investir até <strong>4% do IRPJ devido</strong> em cultura sem gastar um centavo a mais.
                    </p>

                    {data.recipientCompany && data.recipientCompany !== 'Sua Empresa / Marca' && (
                      <div className="mt-4 px-3.5 py-2 rounded-lg bg-[#1e3454] border border-[#d9a036]/50 inline-block text-xs font-semibold text-amber-300">
                        Apresentado com distinção a: <strong className="text-white">{data.recipientCompany}</strong>
                      </div>
                    )}
                  </div>

                  <div className="relative z-10 my-6 sm:my-8 flex items-center justify-between gap-4">
                    {/* Zero Cost Box */}
                    <div className="p-4 sm:p-5 rounded-xl border border-stone-500/60 bg-[#162740]/80">
                      <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#d9a036] mb-1">
                        CUSTO REAL PARA A EMPRESA
                      </p>
                      <h2 className="font-cinzel text-3xl sm:text-5xl font-black text-white">
                        ZERO
                      </h2>
                    </div>

                    {/* 4% Circle */}
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-[#d9a036] flex flex-col items-center justify-center p-2 text-center shrink-0 shadow-lg shadow-amber-950/40">
                      <span className="font-cinzel text-3xl sm:text-4xl font-black text-[#d9a036] leading-none">
                        4%
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-bold text-stone-200 mt-1 uppercase tracking-wider">
                        DO IRPJ DEVIDO
                      </span>
                    </div>
                  </div>

                  {/* Footer Project Tag */}
                  <div className="relative z-10 border-t border-stone-700/80 pt-4">
                    <h3 className="font-cinzel text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                      40 ANOS DA LAVAGEM DA ESQUINA DO PADRE
                    </h3>
                    <p className="font-mono text-xs text-stone-300 mt-0.5">
                      Caetité — Bahia &nbsp;|&nbsp; PRONAC 264180 &nbsp;|&nbsp; Artigo 18
                    </p>
                    <p className="font-serif italic text-xs text-[#d9a036] mt-1">
                      Esquina do Padre Produções Artísticas
                    </p>
                  </div>
                </div>
              )}

              {/* PAGE 2: CAPÍTULO 01 */}
              {currentPage === 2 && (
                <div className="flex-1 bg-[#fbf8f2] text-[#2d2926] p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold tracking-widest text-[#d9a036] uppercase font-mono">
                      CAPÍTULO 01
                    </p>
                    <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-[#132238] uppercase tracking-tight mt-1 mb-4">
                      COMO FUNCIONA A LEI DE INCENTIVO
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-montserrat">
                      A legislação federal permite que empresas tributadas pelo Lucro Real direcionem até 4% do Imposto de Renda devido para projetos culturais aprovados pelo Governo Federal, abatendo 100% desse valor na apuração.
                    </p>

                    {/* 3 Step Boxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
                      <div className="p-3.5 rounded-xl bg-white border border-stone-200 border-t-4 border-t-[#d9a036] shadow-xs">
                        <span className="text-2xl font-black text-stone-300 font-cinzel">01</span>
                        <h4 className="text-xs font-bold text-[#132238] uppercase mt-1 mb-1.5">EMPRESA</h4>
                        <p className="text-[11px] text-stone-600 leading-snug">
                          Apura o IRPJ devido no regime de Lucro Real.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white border border-stone-200 border-t-4 border-t-[#d9a036] shadow-xs">
                        <span className="text-2xl font-black text-stone-300 font-cinzel">02</span>
                        <h4 className="text-xs font-bold text-[#132238] uppercase mt-1 mb-1.5">DESTINAÇÃO</h4>
                        <p className="text-[11px] text-stone-600 leading-snug">
                          Transfere até 4% para a conta oficial do projeto.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white border border-stone-200 border-t-4 border-t-emerald-600 shadow-xs">
                        <span className="text-2xl font-black text-stone-300 font-cinzel">03</span>
                        <h4 className="text-xs font-bold text-[#132238] uppercase mt-1 mb-1.5">ABATIMENTO</h4>
                        <p className="text-[11px] text-stone-600 leading-snug">
                          Deduz 100% do valor na guia DARF recalculada.
                        </p>
                      </div>
                    </div>

                    {/* Ponto Fundamental Box */}
                    <div className="p-5 rounded-2xl bg-[#132238] text-white shadow-lg">
                      <p className="text-[10px] font-mono tracking-widest font-bold text-[#d9a036] uppercase mb-2">
                        P O N T O &nbsp; F U N D A M E N T A L
                      </p>
                      <p className="font-montserrat text-sm sm:text-base font-bold text-white leading-snug mb-3">
                        A sua empresa NÃO paga menos imposto e NÃO gasta nada a mais. O desembolso total continua rigorosamente o mesmo.
                      </p>
                      <p className="text-xs text-stone-300 italic font-serif">
                        A diferença real é a quem esse dinheiro é entregue — e o retorno que ele traz para o seu negócio.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-stone-300 pt-3 text-[10px] text-stone-500 uppercase font-mono">
                    <span>O MECANISMO LEGAL</span>
                    <span>02 / 06</span>
                  </div>
                </div>
              )}

              {/* PAGE 3: CAPÍTULO 02 */}
              {currentPage === 3 && (
                <div className="flex-1 bg-[#fbf8f2] text-[#2d2926] p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold tracking-widest text-[#d9a036] uppercase font-mono">
                      CAPÍTULO 02
                    </p>
                    <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-[#132238] uppercase tracking-tight mt-1 mb-1">
                      OS DOIS CENÁRIOS
                    </h2>
                    <p className="text-xs text-stone-600 font-montserrat mb-4">
                      Exemplo prático para uma empresa com imposto devido de R$ 1.000.000,00.
                    </p>

                    {/* Cenário 1 */}
                    <div className="p-4 rounded-xl bg-white border border-stone-200 border-t-4 border-t-rose-600 shadow-xs mb-3">
                      <h4 className="text-xs font-bold text-[#132238] uppercase mb-2">
                        CENÁRIO 1 — Sem patrocinar o projeto
                      </h4>
                      <div className="space-y-1.5 text-xs text-stone-700">
                        <div className="flex justify-between">
                          <span>Guia (DARF) paga à Receita Federal</span>
                          <strong className="text-stone-900 font-mono">R$ 1.000.000,00</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Destinado à cultura e ao desenvolvimento local</span>
                          <strong className="text-rose-600 font-mono">R$ 0,00</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Retorno de imagem para a sua marca</span>
                          <strong className="text-rose-600">ZERO</strong>
                        </div>
                      </div>

                      <div className="w-full bg-[#1e3454] text-white text-[10px] font-bold py-1 px-2.5 rounded mt-2.5">
                        100% PARA BRASÍLIA
                      </div>
                      <div className="flex justify-between items-center mt-2 pt-1 border-t border-stone-100 text-xs">
                        <span className="text-stone-500 uppercase text-[10px] font-semibold">Total pago pela empresa</span>
                        <span className="font-mono font-bold text-sm text-[#132238]">R$ 1.000.000,00</span>
                      </div>
                    </div>

                    {/* Cenário 2 */}
                    <div className="p-4 rounded-xl bg-white border border-stone-200 border-t-4 border-t-emerald-600 shadow-xs">
                      <h4 className="text-xs font-bold text-[#132238] uppercase mb-2">
                        CENÁRIO 2 — Patrocinando os 40 Anos da Lavagem
                      </h4>
                      <div className="space-y-1.5 text-xs text-stone-700">
                        <div className="flex justify-between">
                          <span>Limite legal permitido (4%)</span>
                          <strong className="text-[#d9a036] font-mono">R$ 40.000,00</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Transferência para a conta oficial do projeto</span>
                          <strong className="text-[#d9a036] font-mono">R$ 40.000,00</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Guia (DARF) recalculada à Receita Federal</span>
                          <strong className="text-stone-900 font-mono">R$ 960.000,00</strong>
                        </div>
                      </div>

                      <div className="w-full flex rounded overflow-hidden mt-2.5 text-[10px] font-bold">
                        <div className="bg-[#1e3454] text-white py-1 px-2.5 flex-1">
                          96% PARA A UNIÃO
                        </div>
                        <div className="bg-[#d9a036] text-stone-950 py-1 px-2 text-center w-12 shrink-0">
                          4%
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2 pt-1 border-t border-stone-100 text-xs">
                        <span className="text-stone-500 uppercase text-[10px] font-semibold">Total pago pela empresa</span>
                        <span className="font-mono font-bold text-sm text-[#132238]">R$ 1.000.000,00</span>
                      </div>
                    </div>

                    {/* Bottom Callout */}
                    <div className="mt-3 p-2.5 rounded-xl bg-[#132238] text-center text-xs font-bold text-[#d9a036] uppercase tracking-wider">
                      MESMO DESEMBOLSO. DESTINO DIFERENTE.
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-stone-300 pt-3 text-[10px] text-stone-500 uppercase font-mono">
                    <span>COMPARATIVO FINANCEIRO</span>
                    <span>03 / 06</span>
                  </div>
                </div>
              )}

              {/* PAGE 4: CAPÍTULO 03 */}
              {currentPage === 4 && (
                <div className="flex-1 bg-[#fbf8f2] text-[#2d2926] p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold tracking-widest text-[#d9a036] uppercase font-mono">
                      CAPÍTULO 03
                    </p>
                    <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-[#132238] uppercase tracking-tight mt-1 mb-6">
                      A VANTAGEM PARA O EMPRESÁRIO
                    </h2>

                    <div className="space-y-5">
                      <div className="flex items-start gap-4">
                        <span className="font-cinzel text-3xl sm:text-4xl font-black text-[#d9a036] shrink-0 leading-none">
                          01
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-[#132238] mb-1">
                            O valor final não muda
                          </h4>
                          <p className="text-xs text-stone-600 leading-relaxed">
                            Em vez de transferir R$ 1.000.000,00 integralmente para os cofres da União em Brasília, sua empresa envia R$ 960.000,00 ao governo e aplica R$ 40.000,00 diretamente na cidade onde seus clientes vivem.
                          </p>
                        </div>
                      </div>

                      <div className="w-full h-px bg-stone-200" />

                      <div className="flex items-start gap-4">
                        <span className="font-cinzel text-3xl sm:text-4xl font-black text-[#d9a036] shrink-0 leading-none">
                          02
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-[#132238] mb-1">
                            Marketing e prestígio a custo zero
                          </h4>
                          <p className="text-xs text-stone-600 leading-relaxed">
                            Seu negócio ganha destaque como patrocinador oficial de um evento com 40 anos de tradição, com visibilidade em peças de divulgação, redes sociais, materiais institucionais e durante o cortejo cultural.
                          </p>
                        </div>
                      </div>

                      <div className="w-full h-px bg-stone-200" />

                      <div className="flex items-start gap-4">
                        <span className="font-cinzel text-3xl sm:text-4xl font-black text-[#d9a036] shrink-0 leading-none">
                          03
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-[#132238] mb-1">
                            Dinheiro que movimenta a economia local
                          </h4>
                          <p className="text-xs text-stone-600 leading-relaxed">
                            O recurso permanece em Caetité gerando empregos diretos e indiretos, fortalecendo o comércio, a rede hoteleira, prestadores de serviço e os artistas da terra.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-stone-300 pt-3 text-[10px] text-stone-500 uppercase font-mono">
                    <span>RETORNO INSTITUCIONAL</span>
                    <span>04 / 06</span>
                  </div>
                </div>
              )}

              {/* PAGE 5: CAPÍTULO 04 */}
              {currentPage === 5 && (
                <div className="flex-1 bg-[#fbf8f2] text-[#2d2926] p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold tracking-widest text-[#d9a036] uppercase font-mono">
                      CAPÍTULO 04
                    </p>
                    <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-[#132238] uppercase tracking-tight mt-1 mb-4">
                      SEGURANÇA TRIBUTÁRIA
                    </h2>

                    {/* PRONAC Box */}
                    <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-xs mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-semibold text-stone-500 uppercase">REGISTRO OFICIAL</p>
                        <p className="font-mono text-base font-black text-[#132238]">PRONAC 264180</p>
                      </div>
                      <div className="text-right">
                        <span className="font-cinzel text-base font-black text-[#d9a036]">ARTIGO 18</span>
                      </div>
                    </div>

                    {/* 4 Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-xs">
                        <div className="w-6 h-1 bg-[#d9a036] rounded mb-2" />
                        <h4 className="text-xs font-bold text-[#132238] uppercase mb-1">DEDUÇÃO INTEGRAL</h4>
                        <p className="text-[11px] text-stone-600 leading-snug">
                          O valor do patrocínio é compensado em 100% no IRPJ devido pela empresa.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-xs">
                        <div className="w-6 h-1 bg-[#d9a036] rounded mb-2" />
                        <h4 className="text-xs font-bold text-[#132238] uppercase mb-1">COMPROVAÇÃO OFICIAL</h4>
                        <p className="text-[11px] text-stone-600 leading-snug">
                          Emissão de Recibo Oficial de Mecenato, com total respaldo fiscal perante a Receita Federal.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-xs">
                        <div className="w-6 h-1 bg-[#d9a036] rounded mb-2" />
                        <h4 className="text-xs font-bold text-[#132238] uppercase mb-1">CONTA EXCLUSIVA</h4>
                        <p className="text-[11px] text-stone-600 leading-snug">
                          O depósito é feito unicamente na conta bancária vinculada ao projeto no Banco do Brasil.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-xs">
                        <div className="w-6 h-1 bg-[#d9a036] rounded mb-2" />
                        <h4 className="text-xs font-bold text-[#132238] uppercase mb-1">MONITORAMENTO</h4>
                        <p className="text-[11px] text-stone-600 leading-snug">
                          Movimentação e prestação de contas acompanhadas diretamente pelo Governo Federal.
                        </p>
                      </div>
                    </div>

                    {/* Transparência Box */}
                    <div className="p-4 rounded-xl bg-[#132238] text-white shadow-md">
                      <p className="text-[10px] font-mono tracking-widest font-bold text-[#d9a036] uppercase mb-1">
                        TRANSPARÊNCIA
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-stone-100">
                        Nenhum recurso transita por contas particulares. Tudo é rastreável.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-stone-300 pt-3 text-[10px] text-stone-500 uppercase font-mono">
                    <span>RESPALDO LEGAL E FISCAL</span>
                    <span>05 / 06</span>
                  </div>
                </div>
              )}

              {/* PAGE 6: CAPÍTULO 05 */}
              {currentPage === 6 && (
                <div className="flex-1 bg-[#fbf8f2] text-[#2d2926] p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold tracking-widest text-[#d9a036] uppercase font-mono">
                      CAPÍTULO 05
                    </p>
                    <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-[#132238] uppercase tracking-tight mt-1 mb-1">
                      COMO APLICAR
                    </h2>
                    <p className="text-xs text-stone-600 font-montserrat mb-4">
                      Basta apresentar estas informações à contabilidade da sua empresa para que o cálculo da destinação seja validado no fechamento fiscal.
                    </p>

                    {/* 5 Step list */}
                    <div className="space-y-2 mb-4">
                      {[
                        'Confirme com a contabilidade o IRPJ devido no período.',
                        'Calcule o limite de 4% sobre esse valor.',
                        'Solicite os dados da conta oficial do projeto (PRONAC 264180).',
                        'Faça o depósito e receba o Recibo Oficial de Mecenato.',
                        'Abata o valor integralmente na guia DARF do fechamento.'
                      ].map((step, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-white border border-stone-200 flex items-center gap-3 shadow-2xs">
                          <span className="w-6 h-6 rounded-lg bg-[#132238] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-medium text-stone-800">{step}</span>
                        </div>
                      ))}
                    </div>

                    {/* Project Bottom Box */}
                    <div className="p-4 rounded-xl bg-[#132238] text-white shadow-lg">
                      <p className="text-[10px] font-mono tracking-widest font-bold text-[#d9a036] uppercase mb-1">
                        P R O J E T O
                      </p>
                      <h3 className="font-cinzel text-base sm:text-lg font-bold text-white uppercase">
                        40 ANOS DA LAVAGEM DA ESQUINA DO PADRE
                      </h3>
                      <p className="font-serif italic text-xs text-[#d9a036] mt-0.5">
                        Esquina do Padre Produções Artísticas
                      </p>
                      <p className="font-mono text-xs text-stone-300 mt-1">
                        Caetité — Bahia &nbsp;|&nbsp; PRONAC 264180 &nbsp;|&nbsp; Artigo 18
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-stone-300 pt-3 text-[10px] text-stone-500 uppercase font-mono">
                    <span>PASSO A PASSO</span>
                    <span>06 / 06</span>
                  </div>
                </div>
              )}
            </div>
          }
        </div>

      </div>
    </div>
  );
};

import React, { useRef, useState } from 'react';
import { InvitationData, CardFormat, CardTheme } from '../types';
import { SPONSOR_TIERS, SAMPLE_COMPANIES, CAETITE_BACKGROUND_PRESETS, COLOR_PALETTES } from '../data/defaultData';
import {
  Building2,
  Sparkles,
  Sliders,
  Image as ImageIcon,
  Layers,
  Upload,
  RotateCcw,
  Palette,
  CheckCircle2,
  Trash2,
  Phone,
  Check,
  Sun,
  Moon,
  Sparkle,
  FileText,
  Link,
  Eye,
  FileUp,
  Download
} from 'lucide-react';

interface CardEditorProps {
  data: InvitationData;
  onChange: (data: Partial<InvitationData>) => void;
  onReset: () => void;
  onOpenPdfViewer?: () => void;
}

export const CardEditor: React.FC<CardEditorProps> = ({ data, onChange, onReset, onOpenPdfViewer }) => {
  const [paletteFilter, setPaletteFilter] = useState<'all' | 'light' | 'dark'>('all');
  const bgInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange({ backgroundImageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange({ customLogoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange({
          pdfAttachmentUrl: reader.result as string,
          pdfFileName: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[#fdfcf8] border border-[#e8e2d5] rounded-2xl p-4 sm:p-6 shadow-xl shadow-stone-200/40 flex flex-col gap-6 text-[#2d2926]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#e8e2d5]">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-[#c5a059]" />
          <h2 className="font-cinzel text-lg font-bold text-[#2d2926]">Personalizar Convite</h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs text-[#78716c] hover:text-[#2d2926] transition-colors px-2.5 py-1 rounded-lg hover:bg-[#f4efe6]"
          title="Restaurar valores padrão"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restaurar</span>
        </button>
      </div>

      {/* SECTION 1: FORMAT SELECTION */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-[#8c6e30] mb-2 flex items-center gap-1.5">
          <Layers className="w-4 h-4" /> Formato de Envio
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'square', label: 'Feed (1:1)', desc: 'WhatsApp & Instagram' },
            { id: 'story', label: 'Status (9:16)', desc: 'Stories & Reels' },
            { id: 'executive', label: 'Proposta (4:5)', desc: 'Apresentação A4' },
            { id: 'banner', label: 'Banner (16:9)', desc: 'Horizontal / TV' }
          ].map(fmt => (
            <button
              key={fmt.id}
              type="button"
              onClick={() => onChange({ format: fmt.id as CardFormat })}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                data.format === fmt.id
                  ? 'bg-[#f4efe6] border-[#c5a059] text-[#2d2926] shadow-sm ring-1 ring-[#c5a059]'
                  : 'bg-[#faf8f4] border-[#e8e2d5] text-[#78716c] hover:border-[#ded7c8] hover:text-[#2d2926]'
              }`}
            >
              <div className="font-semibold text-xs text-[#2d2926]">{fmt.label}</div>
              <div className="text-[10px] text-[#78716c] mt-0.5">{fmt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 2: DESTINATÁRIO & EMPRESA */}
      <div className="flex flex-col gap-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#8c6e30] flex items-center gap-1.5">
          <Building2 className="w-4 h-4" /> Destinatário / Empresa Convidada
        </label>
        
        <div>
          <label className="block text-[11px] text-[#78716c] mb-1">Nome da Empresa ou Empresário:</label>
          <input
            type="text"
            value={data.recipientCompany}
            onChange={e => onChange({ recipientCompany: e.target.value })}
            placeholder="Ex: Grupo Pag Poko / Dr. Fernando & Família"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf8f4] border border-[#ded7c8] focus:border-[#c5a059] focus:outline-none focus:ring-1 focus:ring-[#c5a059] text-[#2d2926] placeholder:text-[#a8a196] text-sm"
          />
        </div>

        {/* Quick Sample Buttons */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-[10px] text-[#a8a196]">Sugestões rápidas:</span>
          {SAMPLE_COMPANIES.map((company, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onChange({ recipientCompany: company })}
              className="text-[10px] px-2 py-0.5 rounded-md bg-[#f4efe6] hover:bg-[#eae3d5] hover:text-[#2d2926] border border-[#ded7c8] text-[#57534e] transition-colors"
            >
              {company}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 3: MENSAGENS DO CONVITE (REQUIRED QUOTES) */}
      <div className="flex flex-col gap-3 p-3.5 rounded-xl bg-[#f4efe6]/70 border border-[#e8e2d5]">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#8c6e30] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" /> Mensagem Oficial do Convite
        </label>
        
        <div>
          <label className="block text-[11px] text-[#78716c] mb-1">Frase Principal 1:</label>
          <input
            type="text"
            value={data.mainHeadline}
            onChange={e => onChange({ mainHeadline: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-white border border-[#ded7c8] text-[#2d2926] font-cinzel font-semibold text-xs focus:border-[#c5a059] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] text-[#78716c] mb-1">Frase de Tradição 2:</label>
          <input
            type="text"
            value={data.subHeadline}
            onChange={e => onChange({ subHeadline: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-white border border-[#ded7c8] text-[#2d2926] text-xs focus:border-[#c5a059] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] text-[#78716c] mb-1">Frase Emocional de Caetité 3:</label>
          <input
            type="text"
            value={data.emotionalHook}
            onChange={e => onChange({ emotionalHook: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-white border border-[#ded7c8] text-[#8c6e30] font-playfair italic text-xs focus:border-[#c5a059] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] text-[#78716c] mb-1">Parágrafo Convidando para a Celebração dos 40 Anos:</label>
          <textarea
            rows={3}
            value={data.invitationParagraph}
            onChange={e => onChange({ invitationParagraph: e.target.value })}
            placeholder="Convite para celebrar este marco histórico e unir a comunidade..."
            className="w-full px-3 py-2 rounded-lg bg-white border border-[#ded7c8] text-[#2d2926] font-montserrat text-xs focus:border-[#c5a059] focus:outline-none leading-relaxed"
          />
        </div>
      </div>

      {/* SECTION 4: SPONSOR TIER SELECTION */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-[#8c6e30] mb-2 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" /> Cota de Patrocínio Oferecida
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SPONSOR_TIERS.map(tier => (
            <button
              key={tier.id}
              type="button"
              onClick={() => onChange({ selectedTier: tier.id })}
              className={`p-3 rounded-xl border text-left transition-all ${
                data.selectedTier === tier.id
                  ? 'bg-[#f4efe6] border-[#c5a059] text-[#2d2926] shadow-sm ring-1 ring-[#c5a059]'
                  : 'bg-[#faf8f4] border-[#e8e2d5] text-[#78716c] hover:border-[#ded7c8] hover:text-[#2d2926]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#2d2926]">{tier.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#eae3d5] text-[#8c6e30] font-mono font-medium">
                  {tier.suggestedQuota}
                </span>
              </div>
              <p className="text-[11px] text-[#78716c] mt-1 line-clamp-1">{tier.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 5: CUSTOM BACKGROUND & SPONSOR LOGO */}
      <div className="flex flex-col gap-4">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#8c6e30] flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4" /> Imagem de Fundo & Logo da Marca
        </label>

        {/* Upload Custom Background */}
        <div className="p-3 rounded-xl bg-[#f4efe6]/60 border border-[#e8e2d5] flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#2d2926]">Fundos Inspiradores de Caetité</span>
            {data.backgroundImageUrl && (
              <button
                type="button"
                onClick={() => onChange({ backgroundImageUrl: null })}
                className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium"
              >
                <Trash2 className="w-3 h-3" /> Restaurar Fundo Padrão
              </button>
            )}
          </div>

          {/* Quick Caetite Thematic Presets */}
          <div className="grid grid-cols-2 gap-2">
            {CAETITE_BACKGROUND_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => onChange({ theme: preset.theme, backgroundImageUrl: null })}
                className={`p-2 rounded-lg border text-left text-xs transition-all ${
                  data.theme === preset.theme && !data.backgroundImageUrl
                    ? 'border-[#c5a059] bg-white text-[#2d2926] ring-1 ring-[#c5a059] shadow-xs'
                    : 'border-[#ded7c8] bg-[#faf8f4] text-[#57534e] hover:border-[#c5a059]'
                }`}
              >
                <div className="font-semibold text-[11px] text-[#2d2926]">{preset.name}</div>
                <div className="text-[10px] text-[#78716c] line-clamp-1">{preset.description}</div>
              </button>
            ))}
          </div>

          <div className="flex gap-2 pt-1">
            <input
              ref={bgInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleBgUpload}
            />
            <button
              type="button"
              onClick={() => bgInputRef.current?.click()}
              className="flex-1 py-2 px-3 rounded-lg bg-[#f4efe6] hover:bg-[#eae3d5] text-xs font-medium text-[#2d2926] flex items-center justify-center gap-2 border border-[#ded7c8] transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-[#8c6e30]" />
              <span>{data.backgroundImageUrl ? 'Alterar Imagem de Fundo (Upload)' : 'Fazer Upload de Foto Personalizada'}</span>
            </button>
          </div>

          {/* Sliders for Opacity and Blur */}
          <div className="grid grid-cols-2 gap-3 mt-1">
            <div>
              <div className="flex justify-between text-[10px] text-[#78716c] mb-1">
                <span>Escurecimento Fundo:</span>
                <span className="font-mono text-[#8c6e30] font-semibold">{data.backgroundOverlayOpacity}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="95"
                value={data.backgroundOverlayOpacity}
                onChange={e => onChange({ backgroundOverlayOpacity: Number(e.target.value) })}
                className="w-full accent-[#c5a059] h-1.5 bg-[#ded7c8] rounded-lg cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-[#78716c] mb-1">
                <span>Desfoque (Blur):</span>
                <span className="font-mono text-[#8c6e30] font-semibold">{data.backgroundBlur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                step="0.5"
                value={data.backgroundBlur}
                onChange={e => onChange({ backgroundBlur: Number(e.target.value) })}
                className="w-full accent-[#c5a059] h-1.5 bg-[#ded7c8] rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Upload Sponsor Logo */}
        <div className="p-3 rounded-xl bg-[#f4efe6]/60 border border-[#e8e2d5] flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#2d2926]">Logo do Patrocinador</span>
            {data.customLogoUrl && (
              <button
                type="button"
                onClick={() => onChange({ customLogoUrl: null })}
                className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium"
              >
                <Trash2 className="w-3 h-3" /> Remover Logo
              </button>
            )}
          </div>

          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogoUpload}
          />
          <button
            type="button"
            onClick={() => logoInputRef.current?.click()}
            className="w-full py-2 px-3 rounded-lg bg-[#f4efe6] hover:bg-[#eae3d5] text-xs font-medium text-[#2d2926] flex items-center justify-center gap-2 border border-[#ded7c8] transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-[#8c6e30]" />
            <span>{data.customLogoUrl ? 'Alterar Logo da Empresa' : 'Adicionar Logo da Empresa'}</span>
          </button>
        </div>
      </div>

      {/* SECTION 6: PROPOSTA COMERCIAL / MÍDIA KIT EM PDF */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-[#fbf8f0] to-[#f4eee0] border-2 border-amber-300/60 shadow-xs flex flex-col gap-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-900">
              <FileText className="w-4 h-4 text-amber-800" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950">
                Anexo da Proposta Comercial / Mídia Kit em PDF
              </h4>
              <p className="text-[11px] text-[#78716c]">
                Carregue seu PDF ou gere a apresentação oficial comemorativa
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenPdfViewer}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Visualizar / Abrir PDF</span>
          </button>
        </div>

        {/* Status of current PDF */}
        <div className="p-3 rounded-xl bg-white border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 shrink-0 font-bold text-xs">
              PDF
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#2d2926] truncate">
                  {data.pdfAttachmentUrl ? data.pdfFileName : (data.pdfLinkUrl ? 'PDF Conectado via Link' : 'Mídia Kit Oficial 40 Anos (Gerado Automaticamente)')}
                </span>
                {data.pdfAttachmentUrl && (
                  <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] font-medium rounded">
                    Arquivo Carregado
                  </span>
                )}
              </div>
              <p className="text-[10px] text-[#78716c] truncate">
                {data.pdfLinkUrl || 'Pronto para abertura e download direto pelo patrocinador'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <input
              ref={pdfInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handlePdfUpload}
            />
            <button
              type="button"
              onClick={() => pdfInputRef.current?.click()}
              className="px-2.5 py-1.5 rounded-lg bg-[#f4efe6] hover:bg-[#eae3d5] text-xs font-medium text-[#2d2926] border border-[#ded7c8] flex items-center gap-1.5 transition-colors"
            >
              <FileUp className="w-3.5 h-3.5 text-[#8c6e30]" />
              <span>{data.pdfAttachmentUrl ? 'Substituir PDF' : 'Carregar PDF do PC'}</span>
            </button>

            {data.pdfAttachmentUrl && (
              <button
                type="button"
                onClick={() => onChange({ pdfAttachmentUrl: null, pdfFileName: 'Proposta_40_Anos.pdf' })}
                className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                title="Remover arquivo customizado e voltar ao PDF oficial padrão"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* External Link Input (Optional) */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium text-[#78716c] flex items-center gap-1">
            <Link className="w-3.5 h-3.5 text-[#8c6e30]" />
            <span>Ou insira um link direto para o PDF (Google Drive, Dropbox, Canva ou Site):</span>
          </label>
          <input
            type="url"
            value={data.pdfLinkUrl}
            onChange={(e) => onChange({ pdfLinkUrl: e.target.value })}
            placeholder="https://drive.google.com/... ou https://seusite.com/midia-kit.pdf"
            className="w-full px-3 py-2 rounded-lg bg-white border border-[#ded7c8] text-xs text-[#2d2926] focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] outline-none"
          />
        </div>

        {/* Display on Card Toggle & Custom Text */}
        <div className="pt-2 border-t border-amber-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={data.showPdfButton}
              onChange={(e) => onChange({ showPdfButton: e.target.checked })}
              className="w-4 h-4 accent-[#c5a059] rounded cursor-pointer"
            />
            <span className="font-semibold text-[#2d2926]">
              Exibir botão clicável de PDF no convite
            </span>
          </label>

          {data.showPdfButton && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#78716c]">Texto do botão:</span>
              <input
                type="text"
                value={data.pdfButtonLabel}
                onChange={(e) => onChange({ pdfButtonLabel: e.target.value })}
                className="px-2.5 py-1 rounded bg-white border border-[#ded7c8] text-xs font-medium text-[#2d2926] focus:border-[#c5a059] outline-none w-48"
                placeholder="Ver Proposta Comercial (PDF)"
              />
            </div>
          )}
        </div>
      </div>

      {/* SECTION 7: THEME STYLING - PALETAS DE CORES */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#8c6e30] flex items-center gap-1.5">
            <Palette className="w-4 h-4" /> Paletas de Cores & Atmosfera Visual
          </label>
          <span className="text-[11px] text-[#78716c] font-medium">
            Tema ativo:{' '}
            <strong className="text-[#2d2926] font-semibold">
              {COLOR_PALETTES.find(p => p.id === data.theme)?.name}
            </strong>
          </span>
        </div>

        {/* Filter Switcher: Claros vs Noturnos vs Todos */}
        <div className="flex items-center p-1 bg-[#ede6d8] rounded-xl mb-3 text-xs font-medium">
          <button
            type="button"
            onClick={() => setPaletteFilter('all')}
            className={`flex-1 py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 text-xs ${
              paletteFilter === 'all'
                ? 'bg-white text-[#2d2926] font-semibold shadow-xs'
                : 'text-[#78716c] hover:text-[#2d2926]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Todos ({COLOR_PALETTES.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setPaletteFilter('light')}
            className={`flex-1 py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 text-xs ${
              paletteFilter === 'light'
                ? 'bg-white text-amber-900 font-semibold shadow-xs ring-1 ring-amber-400/40'
                : 'text-[#78716c] hover:text-[#2d2926]'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>Cores Claras ({COLOR_PALETTES.filter(p => p.isLight).length})</span>
          </button>
          <button
            type="button"
            onClick={() => setPaletteFilter('dark')}
            className={`flex-1 py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 text-xs ${
              paletteFilter === 'dark'
                ? 'bg-white text-stone-900 font-semibold shadow-xs'
                : 'text-[#78716c] hover:text-[#2d2926]'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-indigo-500" />
            <span>Noturnos ({COLOR_PALETTES.filter(p => !p.isLight).length})</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {COLOR_PALETTES.filter(pal => {
            if (paletteFilter === 'light') return pal.isLight;
            if (paletteFilter === 'dark') return !pal.isLight;
            return true;
          }).map(pal => {
            const isSelected = data.theme === pal.id;
            return (
              <button
                key={pal.id}
                type="button"
                onClick={() => onChange({ theme: pal.id })}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? 'border-[#c5a059] bg-[#f4efe6] text-[#2d2926] ring-2 ring-[#c5a059]/80 shadow-sm'
                    : 'border-[#e8e2d5] bg-[#faf8f4] text-[#78716c] hover:border-[#c5a059] hover:bg-[#f8f5ee]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    {/* 3-Dot Swatches */}
                    <div className="flex items-center -space-x-1.5">
                      {pal.previewColors.map((col, idx) => (
                        <div
                          key={idx}
                          className="w-4 h-4 rounded-full border-2 border-white shadow-xs shrink-0"
                          style={{ backgroundColor: col }}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-xs text-[#2d2926]">
                        {pal.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
                        pal.isLight
                          ? 'bg-amber-100 text-amber-800 border border-amber-300/60'
                          : 'bg-stone-800 text-stone-200 border border-stone-700'
                      }`}
                    >
                      {pal.isLight ? 'Claro' : 'Noturno'}
                    </span>
                    {isSelected && (
                      <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#c5a059] text-white">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#78716c] mt-0.5">
                  <span className="text-[#8c6e30] font-medium truncate">{pal.tagline}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 7: ORGANIZER CONTACT */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#8c6e30] flex items-center gap-1.5">
          <Phone className="w-4 h-4" /> Contato da Organização para Patrocínios
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="text"
            value={data.organizerPhone}
            onChange={e => onChange({ organizerPhone: e.target.value })}
            placeholder="WhatsApp da Comissão"
            className="w-full px-3 py-2 rounded-lg bg-[#faf8f4] border border-[#ded7c8] text-xs text-[#2d2926] focus:border-[#c5a059] focus:outline-none"
          />
          <input
            type="text"
            value={data.organizerContactName}
            onChange={e => onChange({ organizerContactName: e.target.value })}
            placeholder="Nome da Comissão"
            className="w-full px-3 py-2 rounded-lg bg-[#faf8f4] border border-[#ded7c8] text-xs text-[#2d2926] focus:border-[#c5a059] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

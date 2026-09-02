import { InvitationData, SponsorTier, CardTheme } from '../types';

export const SPONSOR_TIERS: SponsorTier[] = [
  {
    id: 'master',
    name: 'Cota Apresentador Master',
    badge: 'Patrocinador Oficial',
    color: 'from-amber-400 to-yellow-600',
    description: 'Maior destaque em toda a comunicação visual, trio elétrico, palco e materiais oficiais.',
    benefits: [
      'Logo com destaque máximo no topo de todos os materiais',
      'Citação VIP em todas as passagens de trio e palcos',
      'Inserção em abadás, backdrops e mídias sociais',
      'Espaço exclusivo para ativação de marca durante o cortejo'
    ],
    suggestedQuota: 'Master Exclusivo'
  },
  {
    id: 'gold',
    name: 'Cota Ouro',
    badge: 'Patrocínio Ouro',
    color: 'from-amber-300 to-amber-500',
    description: 'Ampla visibilidade em peças publicitárias, trio e cobertura oficial.',
    benefits: [
      'Logo em destaque nos banners, faixas e outdoors',
      'Menções regulares de locução durante o evento',
      'Presença nas mídias sociais oficiais da Lavagem',
      'Kit VIP de camisas e cortesias para diretores'
    ],
    suggestedQuota: 'Cota Ouro'
  },
  {
    id: 'silver',
    name: 'Cota Prata',
    badge: 'Patrocínio Prata',
    color: 'from-slate-300 to-zinc-400',
    description: 'Ótima relação custo-benefício com presença de marca consistente.',
    benefits: [
      'Logo em cartazes, panfletos e posts de agradecimento',
      'Menções em chamadas de rádio e mídias parceiras',
      'Agradecimento oficial no encerramento da Lavagem'
    ],
    suggestedQuota: 'Cota Prata'
  },
  {
    id: 'bronze',
    name: 'Cota Bronze',
    badge: 'Patrocínio Bronze',
    color: 'from-amber-700 to-amber-900',
    description: 'Participação acessível para comércio local e empreendedores.',
    benefits: [
      'Logo nos materiais digitais e telões',
      'Presença no mural dos 40 anos de apoiadores'
    ],
    suggestedQuota: 'Cota Bronze'
  },
  {
    id: 'cultural',
    name: 'Apoio Cultural',
    badge: 'Amigo da Esquina',
    color: 'from-emerald-500 to-teal-700',
    description: 'Apoio institucional e valorização da tradição e memória caetiteense.',
    benefits: [
      'Menção como Amigo Cultural dos 40 Anos',
      'Certificado comemorativo de preservação cultural'
    ],
    suggestedQuota: 'Apoio Cultural'
  }
];

export interface ColorPaletteConfig {
  id: CardTheme;
  name: string;
  tagline: string;
  category: 'light' | 'dark';
  isLight: boolean;
  primaryBg: string;
  accentColor: string;
  previewColors: string[];
  description: string;
  goldStyle: string;
  borderTint: string;
  pillBg: string;
  textColor: string;
  headlineColor: string;
  subHeadlineColor: string;
  hookBoxBg: string;
  hookTextColor: string;
}

export const COLOR_PALETTES: ColorPaletteConfig[] = [
  // ==================== TEMAS CLAROS (LIGHT THEMES) ====================
  {
    id: 'ivory-gold',
    name: 'Marfim Imperial & Ouro',
    tagline: 'Elegância Nobre & Luminosidade',
    category: 'light',
    isLight: true,
    primaryBg: 'from-[#faf7f0] via-[#f3ede0] to-[#e8decb]',
    accentColor: '#b48c36',
    previewColors: ['#faf7f0', '#c5a059', '#460913'],
    description: 'Fundo claro marfim imperial com filigranas em ouro acetinado e tipografia bordô profunda.',
    goldStyle: 'from-[#d4af37] to-[#8c6e30]',
    borderTint: 'border-[#c5a059]/60',
    pillBg: 'bg-white/95',
    textColor: 'text-[#2d2926]',
    headlineColor: 'text-[#460913]',
    subHeadlineColor: 'text-[#3b1219]',
    hookBoxBg: 'bg-white/90 border-[#c5a059]/50 shadow-md',
    hookTextColor: 'text-[#5c121e]'
  },
  {
    id: 'white-baiana',
    name: 'Branco Sagrado & Alfazema',
    tagline: 'Rendas de Baiana & Bênção',
    category: 'light',
    isLight: true,
    primaryBg: 'from-[#ffffff] via-[#f7f9fa] to-[#eef4f8]',
    accentColor: '#0284c7',
    previewColors: ['#ffffff', '#38bdf8', '#c5a059'],
    description: 'Branco radiante em tributo aos trajes rendados das baianas e à tradição das águas de cheiro.',
    goldStyle: 'from-[#38bdf8] to-[#0369a1]',
    borderTint: 'border-[#0284c7]/40',
    pillBg: 'bg-white/95',
    textColor: 'text-[#1e293b]',
    headlineColor: 'text-[#0f172a]',
    subHeadlineColor: 'text-[#334155]',
    hookBoxBg: 'bg-white/90 border-[#38bdf8]/50 shadow-md',
    hookTextColor: 'text-[#0369a1]'
  },
  {
    id: 'pearl-wine',
    name: 'Pérola Nobre & Vinho Velho',
    tagline: 'Tradição Clássica & Suavidade',
    category: 'light',
    isLight: true,
    primaryBg: 'from-[#fcf9f7] via-[#f7eeea] to-[#eddcd5]',
    accentColor: '#9f1239',
    previewColors: ['#fcf9f7', '#9f1239', '#d4af37'],
    description: 'Tons suaves de pérola rosé com nobreza bordô e detalhes em folha de ouro.',
    goldStyle: 'from-[#be123c] to-[#881337]',
    borderTint: 'border-[#c5a059]/60',
    pillBg: 'bg-white/95',
    textColor: 'text-[#2d2926]',
    headlineColor: 'text-[#520914]',
    subHeadlineColor: 'text-[#4c0519]',
    hookBoxBg: 'bg-white/90 border-[#9f1239]/30 shadow-md',
    hookTextColor: 'text-[#881337]'
  },
  {
    id: 'champagne-gold',
    name: 'Champagne Gala & Dourado',
    tagline: 'Celebração & Alto Prestígio',
    category: 'light',
    isLight: true,
    primaryBg: 'from-[#fdfaf2] via-[#f7f0dc] to-[#ede0c2]',
    accentColor: '#d97706',
    previewColors: ['#fdfaf2', '#f59e0b', '#78350f'],
    description: 'Atmosfera comemorativa em champagne acetinado com ouro radiante de alto brilho.',
    goldStyle: 'from-[#f59e0b] to-[#b45309]',
    borderTint: 'border-amber-500/50',
    pillBg: 'bg-white/95',
    textColor: 'text-[#2d2926]',
    headlineColor: 'text-[#3b1219]',
    subHeadlineColor: 'text-[#78350f]',
    hookBoxBg: 'bg-white/90 border-amber-400/60 shadow-md',
    hookTextColor: 'text-[#78350f]'
  },
  {
    id: 'sertao-sand',
    name: 'Areia do Sertão & Terracota',
    tagline: 'Raízes & Calor Caetiteense',
    category: 'light',
    isLight: true,
    primaryBg: 'from-[#fbf6ee] via-[#f5ead9] to-[#ebd7be]',
    accentColor: '#c2410c',
    previewColors: ['#fbf6ee', '#c2410c', '#854d0e'],
    description: 'Tons orgânicos da terra, artesanato e história secular do Sertão Produtivo Baiano.',
    goldStyle: 'from-[#ea580c] to-[#9a3412]',
    borderTint: 'border-orange-400/50',
    pillBg: 'bg-white/95',
    textColor: 'text-[#292524]',
    headlineColor: 'text-[#431407]',
    subHeadlineColor: 'text-[#7c2d12]',
    hookBoxBg: 'bg-white/90 border-orange-300/60 shadow-md',
    hookTextColor: 'text-[#9a3412]'
  },

  // ==================== TEMAS NOTURNOS & SOLENES (DARK THEMES) ====================
  {
    id: 'wine-gold',
    name: 'Vinho Imperial & Ouro',
    tagline: 'Oficial dos 40 Anos',
    category: 'dark',
    isLight: false,
    primaryBg: 'from-[#460913] via-[#65101f] to-[#230409]',
    accentColor: '#d4af37',
    previewColors: ['#65101f', '#d4af37', '#230409'],
    description: 'Bordô nobre e encorpado com realce em ouro acetinado.',
    goldStyle: 'from-[#ffe57f] to-[#d4af37]',
    borderTint: 'border-amber-400/40',
    pillBg: 'bg-[#5a0f1c]',
    textColor: 'text-stone-100',
    headlineColor: 'text-gold-bright',
    subHeadlineColor: 'text-amber-100/95',
    hookBoxBg: 'bg-stone-950/80 border-amber-400/35 shadow-lg',
    hookTextColor: 'text-amber-200'
  },
  {
    id: 'royal-dark',
    name: 'Azul Meia-Noite & Ouro',
    tagline: 'Gala & Solenidade Real',
    category: 'dark',
    isLight: false,
    primaryBg: 'from-[#0a1128] via-[#141f45] to-[#060a19]',
    accentColor: '#e5c068',
    previewColors: ['#141f45', '#e5c068', '#060a19'],
    description: 'Azul marinho profundo com filigranas douradas e contraste imponente.',
    goldStyle: 'from-[#fff2a8] to-[#e5c068]',
    borderTint: 'border-amber-300/40',
    pillBg: 'bg-[#0f172a]',
    textColor: 'text-stone-100',
    headlineColor: 'text-gold-bright',
    subHeadlineColor: 'text-sky-100/95',
    hookBoxBg: 'bg-[#060a19]/85 border-amber-400/35 shadow-lg',
    hookTextColor: 'text-amber-200'
  },
  {
    id: 'bahia-sunset',
    name: 'Pôr do Sol & Terracota',
    tagline: 'Calor do Sertão Baiano',
    category: 'dark',
    isLight: false,
    primaryBg: 'from-[#5e1914] via-[#8c2d1b] to-[#360d09]',
    accentColor: '#f6ad55',
    previewColors: ['#8c2d1b', '#f6ad55', '#360d09'],
    description: 'Tons quentes de entardecer do Sertão Produtivo com ouro ambarado.',
    goldStyle: 'from-[#fed7aa] to-[#f59e0b]',
    borderTint: 'border-orange-400/40',
    pillBg: 'bg-[#782418]',
    textColor: 'text-stone-100',
    headlineColor: 'text-gold-bright',
    subHeadlineColor: 'text-orange-100/95',
    hookBoxBg: 'bg-[#360d09]/85 border-orange-400/35 shadow-lg',
    hookTextColor: 'text-amber-200'
  },
  {
    id: 'emerald-gold',
    name: 'Verde Esmeralda & Ouro',
    tagline: 'Serras & Tradição Popular',
    category: 'dark',
    isLight: false,
    primaryBg: 'from-[#05291b] via-[#0d4632] to-[#02170f]',
    accentColor: '#34d399',
    previewColors: ['#0d4632', '#fbbf24', '#02170f'],
    description: 'Verde esmeralda suntuoso das serras caetiteenses com ouro nobre.',
    goldStyle: 'from-[#fef08a] to-[#eab308]',
    borderTint: 'border-emerald-400/40',
    pillBg: 'bg-[#064e3b]',
    textColor: 'text-stone-100',
    headlineColor: 'text-gold-bright',
    subHeadlineColor: 'text-emerald-100/95',
    hookBoxBg: 'bg-[#02170f]/85 border-emerald-400/35 shadow-lg',
    hookTextColor: 'text-amber-200'
  },
  {
    id: 'ebony-gold',
    name: 'Preto Ébano & Ouro Gala',
    tagline: 'Máximo Luxo & Contraste',
    category: 'dark',
    isLight: false,
    primaryBg: 'from-[#141210] via-[#221e1a] to-[#0a0908]',
    accentColor: '#ffd700',
    previewColors: ['#221e1a', '#ffd700', '#0a0908'],
    description: 'Preto acetinado de gala com realce dourado de alto impacto visual.',
    goldStyle: 'from-[#ffffff] to-[#ffd700]',
    borderTint: 'border-amber-300/50',
    pillBg: 'bg-[#18181b]',
    textColor: 'text-stone-100',
    headlineColor: 'text-gold-bright',
    subHeadlineColor: 'text-amber-100/95',
    hookBoxBg: 'bg-stone-950/90 border-amber-400/40 shadow-lg',
    hookTextColor: 'text-amber-200'
  },
  {
    id: 'parchment-classic',
    name: 'Linho Nobre & Vinho Velho',
    tagline: 'Memória & Pergaminho Histórico',
    category: 'dark',
    isLight: false,
    primaryBg: 'from-[#2e151b] via-[#452229] to-[#1a0c0f]',
    accentColor: '#d97706',
    previewColors: ['#452229', '#f3d9a2', '#1a0c0f'],
    description: 'Tons terrosos de pergaminho antigo com textura de tradição secular.',
    goldStyle: 'from-[#fef3c7] to-[#d97706]',
    borderTint: 'border-amber-200/40',
    pillBg: 'bg-[#3b1219]',
    textColor: 'text-stone-100',
    headlineColor: 'text-gold-bright',
    subHeadlineColor: 'text-amber-100/95',
    hookBoxBg: 'bg-[#1a0c0f]/85 border-amber-300/35 shadow-lg',
    hookTextColor: 'text-amber-200'
  },
  {
    id: 'ruby-copper',
    name: 'Rubi Escarlate & Bronze',
    tagline: 'Paixão & Energia Festiva',
    category: 'dark',
    isLight: false,
    primaryBg: 'from-[#520914] via-[#751121] to-[#30050c]',
    accentColor: '#fb923c',
    previewColors: ['#751121', '#fb923c', '#30050c'],
    description: 'Rubi escarlate vivo com toques de bronze e cobre polido.',
    goldStyle: 'from-[#fed7aa] to-[#ea580c]',
    borderTint: 'border-rose-400/40',
    pillBg: 'bg-[#881337]',
    textColor: 'text-stone-100',
    headlineColor: 'text-gold-bright',
    subHeadlineColor: 'text-rose-100/95',
    hookBoxBg: 'bg-[#30050c]/85 border-rose-400/35 shadow-lg',
    hookTextColor: 'text-amber-200'
  },
  {
    id: 'sapphire-gold',
    name: 'Safira & Águas de Cheiro',
    tagline: 'Bênção & Alfazema Sagrada',
    category: 'dark',
    isLight: false,
    primaryBg: 'from-[#08233a] via-[#103a5e] to-[#041320]',
    accentColor: '#38bdf8',
    previewColors: ['#103a5e', '#38bdf8', '#fbbf24'],
    description: 'Azul safira celestial homenageando o tradicional banho de alfazema.',
    goldStyle: 'from-[#e0f2fe] to-[#38bdf8]',
    borderTint: 'border-sky-400/40',
    pillBg: 'bg-[#075985]',
    textColor: 'text-stone-100',
    headlineColor: 'text-gold-bright',
    subHeadlineColor: 'text-sky-100/95',
    hookBoxBg: 'bg-[#041320]/85 border-sky-400/35 shadow-lg',
    hookTextColor: 'text-amber-200'
  }
];

export const isThemeLight = (theme: CardTheme): boolean => {
  const pal = COLOR_PALETTES.find(p => p.id === theme);
  return pal ? pal.isLight : false;
};

export const CAETITE_BACKGROUND_PRESETS = [
  {
    id: 'marfim-imperial',
    name: 'Marfim Imperial & Ouro (Claro)',
    description: 'Elegância comemorativa em fundo marfim com filigranas douradas',
    theme: 'ivory-gold' as const
  },
  {
    id: 'branco-baiana',
    name: 'Branco & Alfazema (Claro)',
    description: 'Tradição das rendas brancas, água de cheiro e bênção',
    theme: 'white-baiana' as const
  },
  {
    id: 'catedral-historica',
    name: 'Catedral & Centro Histórico (Noturno)',
    description: 'Silhueta histórica da Catedral de Santana e o coração de Caetité',
    theme: 'wine-gold' as const
  },
  {
    id: 'ouro-imperial',
    name: 'Gala dos 40 Anos (Noturno)',
    description: 'Elegância em vinho bordô e ouro acetinado comemorativo',
    theme: 'royal-dark' as const
  }
];

export const DEFAULT_INVITATION_DATA: InvitationData = {
  recipientName: 'Empresário(a) e Parceiro(a)',
  recipientCompany: 'Sua Empresa / Marca',
  mainHeadline: 'Faça parte dessa história.',
  subHeadline: 'Sua marca atrelada a 40 anos de tradição.',
  emotionalHook: 'A Lavagem é uma parte de Caetité, você também é.',
  invitationParagraph: 'Convidamos sua empresa a celebrar este marco histórico de quatro décadas e caminhar junto à nossa comunidade nesta festa que une gerações, fortalece nosso comércio e exalta as raízes de Caetité.',
  eventTitle: '40 Anos da Lavagem da Esquina do Padre',
  location: 'Caetité — Bahia',
  edition: '1988 — 2027 • Edição Histórica',
  selectedTier: 'gold',
  backgroundImageUrl: null,
  customLogoUrl: null,
  backgroundOverlayOpacity: 74,
  backgroundBlur: 0,
  format: 'square',
  theme: 'wine-gold',
  organizerContactName: 'Comissão Organizadora dos 40 Anos',
  organizerPhone: '(77) 99999-4040',
  organizerEmail: 'lavagemesquinadopadre@gmail.com',
  showOfficialEmblem: true,
  showSponsorSlot: true,
  showTierBadge: true,
  showContactBar: true,
  pdfAttachmentUrl: null,
  pdfFileName: 'Cartilha_IRPJ_40_Anos_Lavagem_PRONAC_264180.pdf',
  pdfLinkUrl: '',
  showPdfButton: true,
  pdfButtonLabel: 'Ver Cartilha IRPJ / Proposta (PDF)'
};

export const EVENT_STATS = [
  { label: 'Anos de Tradição', value: '40 Anos', detail: 'Desde 1988 celebrando a cultura de Caetité' },
  { label: 'Público Estimado', value: '+30.000', detail: 'Foliões, famílias, turistas e comunidade regional' },
  { label: 'Impacto & Engajamento', value: '100% Caetité', detail: 'A festa popular mais tradicional e querida da cidade' },
  { label: 'Exposição de Marca', value: 'Multiplataforma', detail: 'Ruas, trios, abadás, redes sociais e imprensa' }
];

export const SAMPLE_COMPANIES = [
  'Ao Diretor e Equipe',
  'À Diretoria Comercial',
  'Aos Amigos e Empresários de Caetité',
  'Comércio & Indústria de Caetité',
  'Parceiro Comercial Visionário'
];

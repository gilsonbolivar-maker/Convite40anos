export type CardFormat = 'square' | 'story' | 'banner' | 'executive';

export type CardTheme =
  // Temas Claros (Light Themes)
  | 'ivory-gold'
  | 'white-baiana'
  | 'pearl-wine'
  | 'champagne-gold'
  | 'sertao-sand'
  // Temas Noturnos & Solenes (Dark Themes)
  | 'wine-gold'
  | 'royal-dark'
  | 'bahia-sunset'
  | 'emerald-gold'
  | 'ebony-gold'
  | 'parchment-classic'
  | 'ruby-copper'
  | 'sapphire-gold';

export interface SponsorTier {
  id: string;
  name: string;
  badge: string;
  color: string;
  description: string;
  benefits: string[];
  suggestedQuota?: string;
}

export interface InvitationData {
  recipientName: string;
  recipientCompany: string;
  mainHeadline: string; // "Faça parte dessa história."
  subHeadline: string; // "Sua marca atrelada a 40 anos de tradição."
  emotionalHook: string; // "A Lavagem é uma parte de Caetité, você também é."
  invitationParagraph: string; // Short paragraph inviting to celebrate the 40-year milestone and join the event
  eventTitle: string; // "40 Anos da Lavagem da Esquina do Padre"
  location: string; // "Caetité — Bahia"
  edition: string; // "1986 — 2026 • 40 Anos"
  selectedTier: string;
  customLogoUrl: string | null;
  backgroundImageUrl: string | null;
  backgroundOverlayOpacity: number; // 0 to 100
  backgroundBlur: number; // 0 to 10
  format: CardFormat;
  theme: CardTheme;
  organizerContactName: string;
  organizerPhone: string;
  organizerEmail: string;
  showOfficialEmblem: boolean;
  showSponsorSlot: boolean;
  showTierBadge: boolean;
  showContactBar: boolean;
  /** Drops the painted background so the exported PNG keeps an alpha channel. */
  transparentBackground: boolean;
  // PDF Attachment & Link capabilities
  pdfAttachmentUrl: string | null;
  pdfFileName: string;
  pdfLinkUrl: string;
  showPdfButton: boolean;
  pdfButtonLabel: string;
}

import React from 'react';
import { CardTheme } from '../types';
import { isThemeLight, COLOR_PALETTES } from '../data/defaultData';

interface FestiveArtworkCanvasProps {
  theme: CardTheme;
  customBgUrl: string | null;
  overlayOpacity: number;
  blur: number;
}

export const FestiveArtworkCanvas: React.FC<FestiveArtworkCanvasProps> = ({
  theme,
  customBgUrl,
  overlayOpacity,
  blur
}) => {
  const isLight = isThemeLight(theme);
  const palette = COLOR_PALETTES.find(p => p.id === theme) || COLOR_PALETTES[0];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Base Background Image or Fallback SVG */}
      {customBgUrl ? (
        <img
          src={customBgUrl}
          alt="Fundo dos 40 Anos da Lavagem da Esquina do Padre"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: `blur(${blur}px)` }}
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${palette.primaryBg} w-full h-full`}>
          {/* Subtle Rich Pattern Overlay */}
          <div
            className={`absolute inset-0 ${isLight ? 'opacity-10' : 'opacity-15'}`}
            style={{
              backgroundImage: isLight
                ? `radial-gradient(#b48c36 1px, transparent 1px), radial-gradient(#b48c36 1px, #ffffff 1px)`
                : `radial-gradient(#d4af37 1px, transparent 1px), radial-gradient(#d4af37 1px, #1a0306 1px)`,
              backgroundSize: '32px 32px',
              backgroundPosition: '0 0, 16px 16px'
            }}
          />

          {/* Artistic Vector Elements - Bahian Celebration & Church Silhouette */}
          <svg
            className={`absolute inset-0 w-full h-full ${
              isLight ? 'opacity-40 mix-blend-multiply' : 'opacity-35 mix-blend-screen'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 800"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <radialGradient id="sunburst" cx="50%" cy="30%" r="60%">
                <stop offset="0%" stopColor={isLight ? '#f59e0b' : '#ffd700'} stopOpacity={isLight ? '0.35' : '0.4'} />
                <stop offset="40%" stopColor={isLight ? '#d97706' : '#d4af37'} stopOpacity={isLight ? '0.2' : '0.2'} />
                <stop offset="100%" stopColor={isLight ? '#fde68a' : '#800020'} stopOpacity="0" />
              </radialGradient>
              <linearGradient id="goldFiligree" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isLight ? '#b45309' : '#fef08a'} stopOpacity={isLight ? '0.9' : '0.8'} />
                <stop offset="50%" stopColor={isLight ? '#92400e' : '#eab308'} stopOpacity={isLight ? '0.75' : '0.6'} />
                <stop offset="100%" stopColor={isLight ? '#78350f' : '#a16207'} stopOpacity={isLight ? '0.6' : '0.3'} />
              </linearGradient>
              <linearGradient id="waterWave" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity={isLight ? '0.5' : '0.7'} />
                <stop offset="50%" stopColor="#0369a1" stopOpacity={isLight ? '0.35' : '0.5'} />
                <stop offset="100%" stopColor="#075985" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Radiant Sunburst in background */}
            <circle cx="400" cy="240" r="380" fill="url(#sunburst)" />

            {/* Colonial Church Tower Outline of Catedral de Santana & Historic Caetité */}
            <g transform="translate(320, 25) scale(0.75)" opacity="0.8" stroke="url(#goldFiligree)" strokeWidth="2.2" fill="none">
              {/* Central Cross on Main Spire */}
              <line x1="100" y1="5" x2="100" y2="35" strokeWidth="3.5" />
              <line x1="88" y1="16" x2="112" y2="16" strokeWidth="3.5" />
              {/* Spire Roof */}
              <polygon points="100,35 45,130 155,130" fill="#f59e0b" fillOpacity={isLight ? '0.15' : '0.25'} />
              {/* Bell Chamber with clock */}
              <rect x="52" y="130" width="96" height="110" rx="3" />
              <circle cx="100" cy="175" r="20" fill="#d97706" fillOpacity={isLight ? '0.15' : '0.25'} />
              <line x1="100" y1="175" x2="100" y2="162" strokeWidth="2" />
              <line x1="100" y1="175" x2="110" y2="175" strokeWidth="2" />
              {/* Classical Arch with Bronze Bell */}
              <path d="M72,215 Q100,195 128,215 L128,240 L72,240 Z" fill="#b45309" fillOpacity={isLight ? '0.25' : '0.4'} />
              <circle cx="100" cy="228" r="6" fill="#fbbf24" />
              {/* Pediment & Historic Columns of Santana */}
              <path d="M25,240 L175,240 L100,205 Z" fill="#92400e" fillOpacity={isLight ? '0.2' : '0.3'} />
              <line x1="35" y1="240" x2="35" y2="295" strokeWidth="3" />
              <line x1="165" y1="240" x2="165" y2="295" strokeWidth="3" />
            </g>

            {/* Colonial Casario Architecture Silhouettes (Caetité Old Town) */}
            <g transform="translate(40, 240)" opacity={isLight ? '0.6' : '0.4'} stroke="url(#goldFiligree)" strokeWidth="1.8" fill="none">
              {/* Historic Facades Left */}
              <rect x="0" y="50" width="90" height="120" />
              <polygon points="0,50 45,20 90,50" />
              <path d="M25,80 Q45,65 65,80 L65,110 L25,110 Z" fill="#d97706" fillOpacity={isLight ? '0.1' : '0.15'} />
              <rect x="30" y="125" width="30" height="45" rx="2" />
              {/* Street Lantern on bracket */}
              <path d="M90,70 Q110,60 115,80 L115,100" strokeWidth="2" />
              <polygon points="108,100 122,100 120,118 110,118" fill="#fef08a" fillOpacity={isLight ? '0.4' : '0.6'} />
            </g>
            <g transform="translate(660, 240)" opacity={isLight ? '0.6' : '0.4'} stroke="url(#goldFiligree)" strokeWidth="1.8" fill="none">
              {/* Historic Facades Right */}
              <rect x="10" y="40" width="90" height="130" />
              <polygon points="10,40 55,10 100,40" />
              <path d="M35,70 Q55,55 75,70 L75,100 L35,100 Z" fill="#d97706" fillOpacity={isLight ? '0.1' : '0.15'} />
              <rect x="40" y="120" width="30" height="50" rx="2" />
            </g>

            {/* Baianas with sacred water urns and festive celebration silhouette */}
            <g transform="translate(60, 470) scale(0.65)" opacity={isLight ? '0.7' : '0.6'} stroke="url(#goldFiligree)" strokeWidth="2" fill="none">
              {/* Baiana with Turban & Pot of Scented Water (Águas de Cheiro) */}
              <circle cx="50" cy="50" r="14" fill="#fbbf24" fillOpacity={isLight ? '0.2' : '0.3'} />
              <ellipse cx="50" cy="42" rx="18" ry="10" fill="#fef08a" fillOpacity={isLight ? '0.3' : '0.5'} />
              {/* Flowing traditional lace skirt */}
              <path d="M50,65 L20,160 Q50,175 80,160 Z" fill="#fef3c7" fillOpacity={isLight ? '0.15' : '0.25'} />
              {/* Urn with flowers */}
              <ellipse cx="65" cy="70" rx="10" ry="14" fill="#d97706" fillOpacity={isLight ? '0.35' : '0.5'} />
              <path d="M60,56 Q65,45 70,56" strokeWidth="3" />
            </g>
            <g transform="translate(670, 470) scale(0.65)" opacity={isLight ? '0.7' : '0.6'} stroke="url(#goldFiligree)" strokeWidth="2" fill="none">
              {/* Second Baiana right */}
              <circle cx="50" cy="50" r="14" fill="#fbbf24" fillOpacity={isLight ? '0.2' : '0.3'} />
              <ellipse cx="50" cy="42" rx="18" ry="10" fill="#fef08a" fillOpacity={isLight ? '0.3' : '0.5'} />
              <path d="M50,65 L20,160 Q50,175 80,160 Z" fill="#fef3c7" fillOpacity={isLight ? '0.15' : '0.25'} />
              <ellipse cx="35" cy="70" rx="10" ry="14" fill="#d97706" fillOpacity={isLight ? '0.35' : '0.5'} />
            </g>

            {/* Celebratory Floating Ribbons & Confetti */}
            <g fill="none" stroke="url(#goldFiligree)" strokeWidth="2" opacity="0.5">
              <path d="M 50,150 Q 200,80 350,180 T 650,120" strokeDasharray="6 4" />
              <path d="M 120,280 Q 250,200 400,260 T 720,200" strokeDasharray="8 6" />
              <path d="M 80,450 Q 220,380 380,440 T 700,380" opacity="0.3" />
            </g>

            {/* Golden Festive Circles (Confetti/Orbs) */}
            <g fill={isLight ? '#d97706' : '#fef08a'} opacity={isLight ? '0.35' : '0.4'}>
              <circle cx="140" cy="120" r="6" />
              <circle cx="680" cy="160" r="5" />
              <circle cx="210" cy="80" r="4" />
              <circle cx="590" cy="90" r="7" />
              <circle cx="100" cy="300" r="5" />
              <circle cx="710" cy="320" r="6" />
              <circle cx="280" cy="40" r="4" />
              <circle cx="520" cy="50" r="5" />
            </g>

            {/* Sacred Flowing Water & Flowers Waves at Left & Bottom */}
            <g transform="translate(-20, 480)" opacity={isLight ? '0.4' : '0.55'}>
              <path
                d="M 0,100 C 150,40 250,180 400,100 C 550,20 650,160 820,90 L 820,320 L 0,320 Z"
                fill="url(#waterWave)"
              />
              <path
                d="M 0,160 C 180,90 280,220 440,140 C 600,60 700,200 820,150 L 820,320 L 0,320 Z"
                fill={isLight ? '#0284c7' : '#0369a1'}
                fillOpacity={isLight ? '0.15' : '0.25'}
              />
            </g>

            {/* Ornate Baroque Corner Flourishes */}
            <g stroke="url(#goldFiligree)" strokeWidth="2" fill="none" opacity={isLight ? '0.8' : '0.7'}>
              {/* Top Left */}
              <path d="M 30,30 L 120,30 Q 80,30 80,70 L 80,120 M 30,30 L 30,120 Q 30,80 70,80 L 120,80" />
              {/* Top Right */}
              <path d="M 770,30 L 680,30 Q 720,30 720,70 L 720,120 M 770,30 L 770,120 Q 770,80 730,80 L 680,80" />
              {/* Bottom Left */}
              <path d="M 30,770 L 120,770 Q 80,770 80,730 L 80,680 M 30,770 L 30,680 Q 30,720 70,720 L 120,720" />
              {/* Bottom Right */}
              <path d="M 770,770 L 680,770 Q 720,770 720,730 L 720,680 M 770,770 L 770,680 Q 770,720 730,720 L 680,720" />
            </g>
          </svg>
        </div>
      )}

      {/* Dynamic Tint & Darkening Overlay for Text Contrast */}
      {customBgUrl ? (
        <>
          <div
            className={`absolute inset-0 ${isLight ? 'bg-[#faf8f4]' : 'bg-stone-950'} transition-opacity duration-300 pointer-events-none`}
            style={{ opacity: overlayOpacity / 100 }}
          />
          <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-t from-[#faf8f4]/90 via-transparent to-[#faf8f4]/60' : 'bg-gradient-to-t from-stone-950/95 via-transparent to-stone-950/80'} pointer-events-none`} />
        </>
      ) : (
        <>
          {/* Subtle Ambient Edge Glow */}
          {isLight ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-[#c5a059]/10 via-transparent to-white/40 pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(197,160,89,0.18)] pointer-events-none" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-transparent to-stone-950/80 pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.85)] pointer-events-none" />
            </>
          )}
        </>
      )}
    </div>
  );
};

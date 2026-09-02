import React from 'react';

interface OfficialEmblemProps {
  variant?: 'full' | 'compact' | 'minimal';
  isLight?: boolean;
  className?: string;
}

export const OfficialEmblem: React.FC<OfficialEmblemProps> = ({
  variant = 'full',
  isLight = false,
  className = ''
}) => {
  if (variant === 'minimal') {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${
          isLight
            ? 'bg-amber-100/90 border border-amber-600/40'
            : 'bg-amber-500/10 border border-amber-400/30'
        } backdrop-blur-md ${className}`}
      >
        <span className={`w-2 h-2 rounded-full ${isLight ? 'bg-amber-600' : 'bg-amber-400'} animate-ping`} />
        <span
          className={`font-cinzel text-xs font-bold tracking-widest ${
            isLight ? 'text-amber-950' : 'text-amber-200'
          }`}
        >
          40 ANOS • CAETITÉ - BA
        </span>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col items-center select-none text-center max-w-full ${className}`}>
      {/* Decorative Top Flourish */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 w-full max-w-[240px] sm:max-w-[280px] mb-1">
        <div
          className={`h-px flex-1 bg-gradient-to-r from-transparent ${
            isLight ? 'via-amber-700/60' : 'via-amber-400/60'
          } to-transparent`}
        />
        <span className={`${isLight ? 'text-amber-700' : 'text-amber-400'} text-[10px] sm:text-xs`}>❖</span>
        <span
          className={`font-cinzel text-[10px] sm:text-[11px] font-bold tracking-[0.2em] sm:tracking-[0.25em] ${
            isLight ? 'text-amber-950' : 'text-amber-200'
          } uppercase truncate`}
        >
          1988 — 2027
        </span>
        <span className={`${isLight ? 'text-amber-700' : 'text-amber-400'} text-[10px] sm:text-xs`}>❖</span>
        <div
          className={`h-px flex-1 bg-gradient-to-r from-transparent ${
            isLight ? 'via-amber-700/60' : 'via-amber-400/60'
          } to-transparent`}
        />
      </div>

      {/* Main Shield / Badge Container */}
      <div className="relative z-10 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-b from-stone-900/95 via-[#420f18]/95 to-stone-950/95 border-2 border-amber-400/50 shadow-2xl shadow-amber-950/50 backdrop-blur-md max-w-full">
        {/* Corner Accents */}
        <div className="absolute top-1 left-1 w-2 sm:w-2.5 h-2 sm:h-2.5 border-t-2 border-l-2 border-amber-300" />
        <div className="absolute top-1 right-1 w-2 sm:w-2.5 h-2 sm:h-2.5 border-t-2 border-r-2 border-amber-300" />
        <div className="absolute bottom-1 left-1 w-2 sm:w-2.5 h-2 sm:h-2.5 border-b-2 border-l-2 border-amber-300" />
        <div className="absolute bottom-1 right-1 w-2 sm:w-2.5 h-2 sm:h-2.5 border-b-2 border-r-2 border-amber-300" />

        {/* Script Title */}
        <div className="flex flex-col items-center">
          {/* Kept on one line: if "da" wraps, it lands on top of the title below,
              which happens once a fallback font renders the line wider. */}
          <span className="font-playfair italic text-amber-200 text-base sm:text-lg md:text-xl font-bold tracking-wide drop-shadow-md whitespace-nowrap leading-normal">
            Lavagem <span className="font-sans text-[10px] sm:text-xs font-normal text-amber-300/80 not-italic tracking-widest uppercase">da</span>
          </span>
          <h2 className="font-cinzel text-lg sm:text-2xl md:text-3xl font-black tracking-wider text-gold-bright drop-shadow-lg leading-normal uppercase truncate max-w-[260px] sm:max-w-none">
            Esquina do Padre
          </h2>
        </div>

        {/* Golden 40 Years Banner */}
        <div className="mt-1 flex items-center justify-center">
          <div className="relative px-3.5 sm:px-5 py-0.5 sm:py-1 rounded-md bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 text-stone-950 font-cinzel font-black text-[11px] sm:text-xs md:text-sm tracking-widest uppercase shadow-md flex items-center gap-1.5">
            <span>40 ANOS DE TRADIÇÃO</span>
          </div>
        </div>
      </div>

      {/* Location tag */}
      <div
        className={`mt-1 sm:mt-1.5 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] tracking-widest ${
          isLight ? 'text-amber-950 font-semibold' : 'text-amber-200/90 font-medium'
        } uppercase font-montserrat`}
      >
        <span className={`w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full ${isLight ? 'bg-amber-600' : 'bg-amber-400'}`} />
        <span>Caetité — Bahia</span>
        <span className={`w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full ${isLight ? 'bg-amber-600' : 'bg-amber-400'}`} />
      </div>
    </div>
  );
};

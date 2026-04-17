import React from 'react';

// Common Background Grain
export const GrainOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-[9000] opacity-[0.028]" 
       style={{ 
         backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
         backgroundSize: '200px 200px'
       }} />
);

// Section Number at top left
export const SectionNumber = ({ number, title }) => (
  <div className="absolute top-9 left-12 font-display text-[10px] tracking-[0.22em] text-gold-500/45 font-normal flex items-center gap-2.5 after:content-[''] after:w-6 after:h-px after:bg-gold-500/25">
    {number} — {title}
  </div>
);

// Eyebrow title
export const Eyebrow = ({ children, className = '' }) => (
  <p className={`font-sans text-[10px] font-light tracking-[0.32em] uppercase text-gold-500 mb-7 flex items-center justify-center gap-4 before:content-[''] before:w-8 before:h-px before:bg-gold-600 after:content-[''] after:w-8 after:h-px after:bg-gold-600 ${className}`}>
    {children}
  </p>
);

// Headline Title 
export const Headline = ({ title, italicText, className = '' }) => (
  <h2 className={`font-serif text-[clamp(2.625rem,6vw,5rem)] font-normal text-offwhite-100 leading-[1.05] tracking-[-0.02em] mb-0 ${className}`}>
    {title}<br/><em className="italic text-cream-300 not-italic">{italicText}</em>
  </h2>
);

// Divider with rotated gem
export const Divider = ({ className = '' }) => (
  <div className={`flex items-center gap-5 w-[200px] mx-auto my-6 ${className}`}>
    <div className="flex-1 h-px bg-gold-800"></div>
    <div className="w-[5px] h-[5px] border border-gold-600 rotate-45 shrink-0"></div>
    <div className="flex-1 h-px bg-gold-800"></div>
  </div>
);

// Subtext/Description
export const Subtext = ({ children, className = '' }) => (
  <p className={`font-sans text-[clamp(13px,1.3vw,16px)] font-light text-stone-400 leading-[1.75] max-w-[560px] mx-auto mb-10 px-4 md:px-0 ${className}`}>
    {children}
  </p>
);

// Stat item block
export const StatItem = ({ num, sub, label, className = '' }) => (
  <div className={`text-center ${className}`}>
    <div className="font-display text-[clamp(1.875rem,3.5vw,2.75rem)] font-bold text-offwhite-100 tracking-[-0.02em] leading-none">
      {num}
      {sub && <sub className="text-[0.42em] text-gold-500 font-serif italic text-base align-super">{sub}</sub>}
    </div>
    <div className="font-sans text-[9px] font-light tracking-[0.18em] uppercase text-stone-500 mt-2">
      {label}
    </div>
  </div>
);

// Stats container
export const StatsRow = ({ children, className = '' }) => (
  <div className={`flex flex-wrap gap-8 md:gap-14 justify-center items-center ${className}`}>
    {children}
  </div>
);

export const StatSeparator = () => (
  <div className="w-px h-9 bg-gold-900 hidden md:block"></div>
);

// Scroll downwards indicator
export const ScrollIndicator = ({ text, className = '' }) => (
  <div className={`absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 ${className}`}>
    <div className="w-px h-7 bg-gradient-to-b from-gold-500 to-transparent animate-needle"></div>
    <span className="font-sans text-[9px] font-light tracking-[0.26em] uppercase text-gold-500/50">
      {text}
    </span>
  </div>
);

export const SectionWipe = () => (
  <div id="sectionWipe" className="fixed inset-0 z-[200] pointer-events-none bg-void-950 opacity-0" />
);

// Background styles helper using inline objects due to complex gradients
export const AmbientBg = ({ className = '', style = {} }) => (
  <div className={`absolute inset-0 pointer-events-none z-0 ${className}`} style={style} />
);

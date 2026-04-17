import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { 
  SectionNumber, Eyebrow, Headline, Divider, Subtext, 
  StatItem, StatsRow, StatSeparator, ScrollIndicator, AmbientBg 
} from './SharedUI';

const DiningCard = ({ size, variant = '', imgSrc, tag, title, index }) => {
  const isLarge = size === 'large';
  
  const sizeClasses = isLarge 
    ? "w-[80vw] md:w-[42vw] h-[50vh] md:h-[68vh] mr-[4vw] shrink-0" 
    : `w-[60vw] md:w-[22vw] h-[40vh] md:h-[34vh] mr-[4vw] shrink-0 ${
        variant === 'down' ? 'md:mt-[10vh]' : variant === 'up' ? 'md:-mt-[12vh]' : ''
      }`;

  return (
    <div 
      className={`group relative overflow-hidden rounded-xl bg-depth-900 border border-gold-500/10 transition-all duration-500 ease-[cubic-bezier(0.25,0,0,1)] hover:border-gold-500/30 hover:shadow-[0_0_28px_rgba(200,169,110,.08),0_8px_40px_rgba(0,0,0,.4)] snap-center ${sizeClasses}`}
    >
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,0,0,1)] group-hover:scale-100" 
        style={{ backgroundImage: `url('${imgSrc}')` }} 
      />
      
      <div 
        className="absolute inset-0 z-[1] pointer-events-none rounded-xl transition-all duration-600 ease-[cubic-bezier(0.25,0,0,1)]"
        style={{
          background: 'linear-gradient(to top, rgba(6,5,4,.82) 0%, transparent 55%), linear-gradient(to bottom, rgba(6,5,4,.15) 0%, transparent 30%)'
        }}
      />
      
      <div 
        className="absolute inset-0 z-[2] pointer-events-none rounded-xl opacity-0 transition-opacity duration-600 ease-[cubic-bezier(0.25,0,0,1)] group-hover:opacity-100"
        style={{
          background: 'linear-gradient(to top, rgba(6,5,4,.6) 0%, transparent 50%), linear-gradient(to bottom, rgba(6,5,4,.08) 0%, transparent 25%)'
        }}
      />
      
      <div className="absolute bottom-5 left-5 right-5 z-[4] translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0,0,1)] group-hover:-translate-y-1.5">
        <span className="block font-sans text-[8px] font-light tracking-[0.24em] uppercase text-gold-500/60 mb-1.5 transition-colors duration-400 group-hover:text-gold-500">
          {tag}
        </span>
        <div className={`font-serif font-normal text-offwhite-200 leading-[1.15] tracking-[-0.01em] transition-colors duration-400 group-hover:text-white ${isLarge ? 'text-[clamp(18px,1.6vw,22px)]' : 'text-[clamp(14px,1.2vw,16px)]'}`} dangerouslySetInnerHTML={{ __html: title }}></div>
      </div>
    </div>
  );
};

const CARDS_DATA = [
  { size: 'large', variant: '', tag: 'Waterfront · Dubai Fountain Views', title: 'Al Fresco Dining<br/>at the Fountain', imgSrc: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80' },
  { size: 'small', variant: 'down', tag: 'Signature Cuisine', title: "Chef's Tasting Menu", imgSrc: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80' },
  { size: 'large', variant: '', tag: 'Fine Dining · Fashion Avenue', title: 'Michelin-Inspired<br/>Culinary Experiences', imgSrc: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80' },
  { size: 'small', variant: 'up', tag: 'Premium Seafood', title: 'Ocean-Fresh Selection', imgSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80' },
  { size: 'large', variant: '', tag: 'World Kitchen · Ground Level', title: 'Live Culinary<br/>Artistry', imgSrc: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80' },
  { size: 'small', variant: 'down', tag: 'Pâtisserie', title: 'Artisan Desserts', imgSrc: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80' },
  { size: 'large', variant: '', tag: 'Panoramic Dining · Level 4', title: 'Skyline Views<br/>Over Dubai', imgSrc: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80' },
  { size: 'small', variant: 'up', tag: 'Bar & Lounge', title: 'Curated Cocktails', imgSrc: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80' }
];

export const DiningSection = ({ isActive, onPrevSection, onNextSection }) => {
  const [step, setStep] = useState(0); 
  
  const introRef = useRef(null);
  const galleryRef = useRef(null);
  const trackRef = useRef(null);
  
  const isTransitioning = useRef(true);
  const cooldownTimer = useRef(null);
  
  const [isGalleryAtStart, setIsGalleryAtStart] = useState(true);
  const [isGalleryAtEnd, setIsGalleryAtEnd] = useState(false);

  useLayoutEffect(() => {
    if (isActive) {
      setStep(0);
      isTransitioning.current = true;
      clearTimeout(cooldownTimer.current);
      cooldownTimer.current = setTimeout(() => {
        isTransitioning.current = false;
      }, 1500); 
    }
  }, [isActive]);

  const handleTrackScroll = (e) => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setIsGalleryAtStart(scrollLeft <= 5);
    setIsGalleryAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
  };

  const handleWheel = (e) => {
    if (!isActive || isTransitioning.current) return;
    
    if (step === 1) {
      if (!trackRef.current) return;
      
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      
      if (delta < 0 && isGalleryAtStart) {
        navigateStep(-1);
        return;
      }
      
      if (delta > 0 && isGalleryAtEnd) {
        if (onNextSection) onNextSection(); 
        return;
      }
      
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
         trackRef.current.scrollBy({ left: e.deltaY * 1.5, behavior: 'auto' });
      }
      return;
    }
    
    const dir = e.deltaY > 0 ? 1 : -1;
    if (dir < 0) {
      if (onPrevSection) onPrevSection();
    } else {
      navigateStep(1);
    }
  };

  const navigateStep = (dir) => {
    isTransitioning.current = true;
    clearTimeout(cooldownTimer.current);
    cooldownTimer.current = setTimeout(() => {
      isTransitioning.current = false;
    }, 1000);
    
    setStep(s => {
      const next = s + dir;
      if(next < 0) return 0;
      if(next > 1) return 1;
      return next;
    });
  };
  
  useLayoutEffect(() => {
    if (!isActive) return;
    
    if (step === 0) {
      gsap.to(introRef.current, { autoAlpha: 1, y: 0, duration: 0.5 });
      gsap.to(galleryRef.current, { autoAlpha: 0, y: 30, duration: 0.5 });
    } else if (step === 1) {
      gsap.to(introRef.current, { autoAlpha: 0, y: -40, duration: 0.5 });
      gsap.to(galleryRef.current, { autoAlpha: 1, y: 0, duration: 0.5 });
      
      if (trackRef.current) trackRef.current.scrollLeft = 0;
    }
  }, [step, isActive]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 w-full h-full" onWheel={handleWheel}>
      
      {/* INTRO STEP 0 */}
      <div ref={introRef} className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-8 md:p-12 invisible">
        <AmbientBg style={{ background: 'radial-gradient(ellipse 65% 50% at 50% 45%,rgba(200,149,60,.07) 0%,transparent 62%), radial-gradient(ellipse 40% 40% at 80% 75%,rgba(160,80,30,.05) 0%,transparent 55%)' }} />
        <SectionNumber number="05" title="Dining" />
        
        <div className="relative z-10">
          <Eyebrow>The Dining Experience</Eyebrow>
          <Headline title="Dining at" italicText="Dubai Mall" />
          <Divider />
          <Subtext>
            From Michelin-inspired tasting menus to vibrant waterfront cafés,<br className="hidden md:block" />
            Dubai Mall offers a world-class culinary destination where<br className="hidden md:block" />
            global flavors meet unforgettable dining experiences.
          </Subtext>
          
          <StatsRow>
            <StatItem num="200" sub="+" label="Restaurants" />
            <StatSeparator />
            <StatItem num="50" sub="+" label="Global Cuisines" />
            <StatSeparator />
            <StatItem num="30" sub="+" label="Waterfront Dining" />
          </StatsRow>
        </div>
        <ScrollIndicator text="Explore Dining" />
      </div>

      {/* GALLERY STEP 1 */}
      <div ref={galleryRef} className="absolute inset-0 z-20 invisible bg-void-950 flex flex-col">
        <div className="absolute top-0 left-0 right-0 z-30 px-6 py-[26px] md:px-[52px] flex items-center justify-between" style={{ background: 'linear-gradient(to bottom,rgba(6,5,4,.6) 0%,transparent 100%)' }}>
          <span className="font-sans text-[9px] font-normal tracking-[0.3em] uppercase text-gold-500 flex items-center gap-3 before:content-['06'] before:font-display before:text-gold-500/55 before:tracking-[0.2em] after:content-[''] after:w-5 after:h-px after:bg-gold-500/45">Dining Gallery</span>
          <span className="font-sans text-[9px] font-light tracking-[0.22em] uppercase text-gold-500/40 flex items-center gap-2">
            Scroll to explore
            <span className="w-7 h-px bg-gold-500/40 relative after:content-[''] after:absolute after:right-0 after:-top-[3px] after:border-[3px] after:border-y-transparent after:border-r-transparent after:border-l-gold-500/40"></span>
          </span>
        </div>

        <div 
          ref={trackRef}
          onScroll={handleTrackScroll}
          className="absolute inset-0 w-full flex items-stretch overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth touch-pan-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex items-center px-4 md:px-[8vw] h-full min-w-max pb-10 md:pb-0 pt-16 md:pt-0">
            {CARDS_DATA.map((card, idx) => (
              <DiningCard key={idx} {...card} index={idx} />
            ))}
            <div className="w-[8vw] shrink-0 h-full"></div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

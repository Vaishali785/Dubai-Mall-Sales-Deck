import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { 
  SectionNumber, Eyebrow, Headline, Divider, Subtext, 
  StatItem, StatsRow, StatSeparator, ScrollIndicator, AmbientBg 
} from './SharedUI';

const BrandTile = ({ id, ambientBg, imgSrc, monoSvg, category, name, desc, tag, extraClasses = "" }) => (
  <div 
    id={id}
    className={`group relative overflow-hidden cursor-pointer bg-depth-900 rounded-[14px] border border-gold-500/10 transition-all duration-500 ease-[cubic-bezier(0.25,0,0,1)] hover:border-gold-500/30 hover:-translate-y-[3px] shadow-[0_4px_32px_rgba(0,0,0,.45)] hover:shadow-[0_12px_48px_rgba(0,0,0,.65),0_0_0_1px_rgba(200,169,110,.15)] ${extraClasses}`}
  >
    <div className="absolute inset-0 z-0 rounded-[13px] transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,0,0,1)] group-hover:scale-105" style={{ background: ambientBg }}></div>
    {imgSrc && <div className="absolute inset-0 z-[1] rounded-[13px] opacity-0 bg-cover bg-center scale-105 transition-all duration-[1.1s] ease-[cubic-bezier(0.25,0,0,1)] group-hover:opacity-100 group-hover:scale-100" style={{ backgroundImage: `url('${imgSrc}')` }}></div>}
    <div className="absolute inset-0 z-[2] pointer-events-none rounded-[13px]" style={{ background: 'radial-gradient(ellipse 90% 80% at 50% 105%, rgba(6,5,4,.8) 0%, transparent 52%), linear-gradient(to top, rgba(6,5,4,.5) 0%, transparent 45%), linear-gradient(to bottom, rgba(6,5,4,.2) 0%, transparent 30%)' }}></div>
    <div className="absolute inset-0 z-[4] flex flex-col items-center justify-center gap-2.5 p-5 transition-transform duration-500 ease-[cubic-bezier(0.25,0,0,1)] group-hover:-translate-y-4">
      {monoSvg && <div className="opacity-[0.52] transition-all duration-400 group-hover:opacity-90 group-hover:drop-shadow-[0_0_16px_rgba(200,169,110,0.45)]">{monoSvg}</div>}
      <div className="font-sans text-[8px] font-light tracking-[0.28em] uppercase text-gold-500/50 transition-colors duration-400 group-hover:text-gold-500">{category}</div>
      <div className="font-serif font-normal text-offwhite-200 tracking-[-0.01em] leading-[1.05] text-center drop-shadow-[0_2px_20px_rgba(0,0,0,0.75)] transition-colors duration-300 group-hover:text-white [&>br]:hidden md:[&>br]:block" style={{ fontSize: id === 'bt-lv' ? 'clamp(32px,3.5vw,54px)' : 'clamp(20px,2vw,32px)' }} dangerouslySetInnerHTML={{ __html: name }}></div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 z-[5] p-5 pt-5 pb-[22px] px-6 rounded-b-[13px] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.25,0,0,1)] group-hover:translate-y-0" style={{ background: 'linear-gradient(to top, rgba(6,5,4,.97) 0%, rgba(6,5,4,.72) 52%, transparent 100%)' }}>
      <div className="font-sans text-[11px] font-light text-stone-400 leading-[1.55] mb-[9px]">{desc}</div>
      <span className="inline-block font-sans text-[8px] font-normal tracking-[0.2em] uppercase text-gold-500 border border-gold-500/30 rounded-full px-2.5 py-[3px]">{tag}</span>
    </div>
    <div className="absolute z-[6] w-[13px] h-[13px] opacity-0 transition-opacity duration-300 delay-75 group-hover:opacity-100 top-[13px] left-[13px] border-t border-l border-gold-500/60"></div>
    <div className="absolute z-[6] w-[13px] h-[13px] opacity-0 transition-opacity duration-300 delay-75 group-hover:opacity-100 bottom-[13px] right-[13px] border-b border-r border-gold-500/60"></div>
  </div>
);

const ECO_CATS = [
  {
    id: 'luxury', eyebrow: '01 — Luxury Fashion', title: 'Luxury<br/><em>Fashion</em>', desc: 'The world\'s most prestigious fashion houses, in dedicated flagship environments with bespoke service and five-star standards.',
    stat: '60+', statLabel: 'Luxury<br/>Maisons',
    catBg: 'radial-gradient(ellipse 75% 65% at 25% 40%,rgba(200,149,60,.14) 0%,transparent 58%),radial-gradient(ellipse 50% 50% at 80% 80%,rgba(160,100,30,.08) 0%,transparent 50%),linear-gradient(160deg,#1c1510 0%,#0f0c08 55%,#060504 100%)',
    logosBg: 'radial-gradient(ellipse 65% 60% at 65% 35%,rgba(200,160,60,.07) 0%,transparent 60%),#060504',
    logos: [
      [{t:'Prada',c:'lg'},{t:'Saint Laurent',c:'up'},{t:'Balenciaga',c:''}],
      [{t:'Fendi',c:'sm'},{t:'Valentino',c:'lg'},{t:'Bottega Veneta',c:''},{t:'Givenchy',c:'sm'}],
      [{t:'Dolce &amp; Gabbana',c:'up'},{t:'Versace',c:'lg'},{t:'Burberry',c:''}],
      [{t:'Alexander McQueen',c:'sm'},{t:'Jimmy Choo',c:''},{t:'Ferragamo',c:'sm dn'},{t:'Tiffany &amp; Co',c:''},{t:'Chopard',c:'sm'}]
    ]
  },
  {
    id: 'global', eyebrow: '02 — Global Fashion', title: 'Global<br/><em>Fashion</em>', desc: 'International fashion powerhouses delivering trend-forward retail to a diverse, sophisticated global audience.',
    stat: '120+', statLabel: 'Fashion<br/>Retailers',
    catBg: 'radial-gradient(ellipse 65% 60% at 75% 40%,rgba(155,135,95,.1) 0%,transparent 58%),radial-gradient(ellipse 45% 45% at 15% 75%,rgba(120,100,60,.06) 0%,transparent 50%),linear-gradient(145deg,#141210 0%,#0e0c0a 55%,#060504 100%)',
    logosBg: 'radial-gradient(ellipse 60% 55% at 35% 55%,rgba(145,125,80,.05) 0%,transparent 60%),#060504',
    logos: [
      [{t:'H&amp;M',c:'lg'},{t:'Uniqlo',c:'up'},{t:'Mango',c:''},{t:'COS',c:'sm'}],
      [{t:'Massimo Dutti',c:''},{t:'Pull &amp; Bear',c:'sm'},{t:'Bershka',c:'lg'},{t:'Stradivarius',c:'sm up'}],
      [{t:'Muji',c:''},{t:'Ted Baker',c:'lg'},{t:'Superdry',c:'sm'},{t:'Levi\'s',c:''}],
      [{t:'Guess',c:'sm dn'},{t:'American Eagle',c:''},{t:'Hollister',c:'sm'}]
    ]
  },
  {
    id: 'tech', eyebrow: '03 — Technology', title: 'Technology<br/><em>&amp; Innovation</em>', desc: 'The region\'s most complete technology retail destination — from global consumer electronics to professional creative tools.',
    stat: '40+', statLabel: 'Technology<br/>Retailers',
    catBg: 'radial-gradient(ellipse 65% 60% at 30% 40%,rgba(55,65,125,.14) 0%,transparent 58%),radial-gradient(ellipse 50% 45% at 85% 75%,rgba(40,50,100,.08) 0%,transparent 50%),linear-gradient(155deg,#0d0e14 0%,#0a0b0e 55%,#060504 100%)',
    logosBg: 'radial-gradient(ellipse 55% 55% at 65% 40%,rgba(70,80,145,.07) 0%,transparent 58%),#060504',
    logos: [
      [{t:'Samsung',c:'lg'},{t:'Huawei',c:'up'},{t:'Sony',c:''},{t:'Dyson',c:'sm'}],
      [{t:'Bose',c:''},{t:'Xiaomi',c:'sm dn'},{t:'LG',c:'lg'},{t:'Panasonic',c:''}],
      [{t:'Bang &amp; Olufsen',c:'up'},{t:'Garmin',c:'sm'},{t:'DJI',c:''},{t:'Microsoft',c:'lg'}],
      [{t:'Canon',c:'sm'},{t:'Nikon',c:''},{t:'GoPro',c:'sm dn'}]
    ]
  },
  {
    id: 'beauty', eyebrow: '04 — Beauty &amp; Lifestyle', title: 'Beauty<br/><em>&amp; Lifestyle</em>', desc: 'A curated constellation of global beauty authorities — from heritage French perfumers to contemporary cult beauty innovators.',
    stat: '80+', statLabel: 'Beauty &amp;<br/>Lifestyle Brands',
    catBg: 'radial-gradient(ellipse 60% 65% at 72% 38%,rgba(175,75,95,.1) 0%,transparent 55%),radial-gradient(ellipse 45% 45% at 18% 70%,rgba(200,149,60,.08) 0%,transparent 50%),linear-gradient(155deg,#140f10 0%,#0e0b0c 55%,#060504 100%)',
    logosBg: 'radial-gradient(ellipse 60% 55% at 35% 42%,rgba(175,75,95,.05) 0%,transparent 55%),#060504',
    logos: [
      [{t:'Sephora',c:'lg'},{t:'Jo Malone',c:'up'},{t:'Bath &amp; Body Works',c:''},{t:'Lush',c:'sm'}],
      [{t:'MAC Cosmetics',c:''},{t:'Kiehl\'s',c:'sm dn'},{t:'Aesop',c:'lg'},{t:'Charlotte Tilbury',c:''}],
      [{t:'Huda Beauty',c:'up'},{t:'Benefit Cosmetics',c:'sm'},{t:'The Body Shop',c:''},{t:'Rituals',c:'sm'}],
      [{t:'La Mer',c:'lg'},{t:'Est\u00e9e Lauder',c:''},{t:'Bobbi Brown',c:'sm dn'}]
    ]
  }
];

const getLogoClasses = (c) => {
  let itemClasses = "inline-flex items-center justify-center cursor-default transition-transform duration-300 hover:scale-105 ";
  let textClasses = "font-serif font-normal tracking-[0.05em] leading-none whitespace-nowrap transition-colors duration-300 hover:text-[rgba(242,237,228,.95)] ";
  
  if (c.includes('lg')) {
    itemClasses += "p-[14px_24px] ";
    textClasses += "text-[clamp(15px,1.7vw,22px)] text-[rgba(235,225,210,.85)] ";
  } else if (c.includes('sm')) {
    itemClasses += "p-[6px_12px] ";
    textClasses += "text-[clamp(10px,0.95vw,13px)] text-[rgba(210,200,185,.65)] ";
  } else {
    itemClasses += "p-[10px_16px] ";
    textClasses += "text-[clamp(12px,1.2vw,16px)] text-[rgba(220,210,195,.75)] ";
  }

  if (c.includes('up')) itemClasses += "relative -top-2 ";
  if (c.includes('dn')) itemClasses += "relative top-2 ";
  
  return { itemClasses, textClasses };
};

export const RetailBrandsSection = ({ isActive, onNextSection }) => {
  const [step, setStep] = useState(0); 
  const prevStepRef = useRef(0);
  
  const introRef = useRef(null);
  const brandsRef = useRef(null);
  const ecoRef = useRef(null);
  
  const catFacesRef = useRef([]);
  const logoFacesRef = useRef([]);
  catFacesRef.current = [];
  logoFacesRef.current = [];
  
  const isTransitioning = useRef(true);
  const cooldownTimer = useRef(null);
  
  useLayoutEffect(() => {
    if (isActive) {
      setStep(0);
      prevStepRef.current = 0;
      isTransitioning.current = true;
      clearTimeout(cooldownTimer.current);
      cooldownTimer.current = setTimeout(() => {
        isTransitioning.current = false;
      }, 1500); 
    }
  }, [isActive]);

  const handleWheel = (e) => {
    if (!isActive || isTransitioning.current) return;
    
    const dir = e.deltaY > 0 ? 1 : -1;
    
    isTransitioning.current = true;
    clearTimeout(cooldownTimer.current);
    cooldownTimer.current = setTimeout(() => {
      isTransitioning.current = false;
    }, 1000);

    let nextStep = step + dir;
    if (nextStep < 0) nextStep = 0; 
    if (nextStep > 5) {
      if (onNextSection) onNextSection();
      return;
    }
    setStep(nextStep);
  };
  
  // GSAP logic
  useLayoutEffect(() => {
    if (!isActive) return;
    
    const tl = gsap.timeline();
    const LUX3D = 'power3.inOut';
    const DUR = 0.88;
    
    if (step === 0) {
      gsap.to(introRef.current, { autoAlpha: 1, y: 0, duration: 0.5 });
      gsap.to(brandsRef.current, { autoAlpha: 0, y: 30, duration: 0.5 });
      gsap.to(ecoRef.current, { autoAlpha: 0, y: 30, duration: 0.5 });
    } else if (step === 1) {
      gsap.to(introRef.current, { autoAlpha: 0, y: -40, duration: 0.5 });
      gsap.to(brandsRef.current, { autoAlpha: 1, y: 0, duration: 0.5 });
      gsap.to(ecoRef.current, { autoAlpha: 0, y: 30, duration: 0.5 });
      
      gsap.fromTo('.brand-tile-anim', 
        { autoAlpha: 0, scale: 0.95, y: 15 },
        { autoAlpha: 1, scale: 1, y: 0, stagger: 0.1, duration: 0.6, delay: 0.2, overwrite: true }
      );
    } else if (step >= 2) {
      gsap.to(introRef.current, { autoAlpha: 0, y: -40, duration: 0.5 });
      gsap.to(brandsRef.current, { autoAlpha: 0, y: -40, duration: 0.5 });
      gsap.to(ecoRef.current, { autoAlpha: 1, y: 0, duration: 0.5 });
      
      const curIdx = step - 2;
      const prevIdx = prevStepRef.current >= 2 ? prevStepRef.current - 2 : -1;
      
      if (prevIdx === -1) {
         // Entering ecosystem first time
         ECO_CATS.forEach((_, i) => {
           gsap.set(catFacesRef.current[i], { autoAlpha: i===0 ? 1 : 0, rotationX: 0, z: 0 });
           gsap.set(logoFacesRef.current[i], { autoAlpha: i===0 ? 1 : 0, rotationX: 0, z: 0 });
         });
      } else if (curIdx !== prevIdx) {
         const dir = curIdx > prevIdx ? 1 : -1;
         const curCatFace = catFacesRef.current[prevIdx];
         const curLogoFace = logoFacesRef.current[prevIdx];
         const nextCatFace = catFacesRef.current[curIdx];
         const nextLogoFace = logoFacesRef.current[curIdx];

         gsap.set(nextCatFace, { rotationX: dir > 0 ? 90 : -90, z: -60, autoAlpha: 0 });
         gsap.set(nextLogoFace, { rotationX: dir > 0 ? -90 : 90, z: -60, autoAlpha: 0 });

         gsap.to(curCatFace, {
           rotationX: dir > 0 ? -90 : 90, z: -60, autoAlpha: 0,
           duration: DUR, ease: LUX3D, transformOrigin: '50% 0%'
         });
         gsap.to(curLogoFace, {
           rotationX: dir > 0 ? 90 : -90, z: -60, autoAlpha: 0,
           duration: DUR, ease: LUX3D, transformOrigin: '50% 100%'
         });

         gsap.to(nextCatFace, {
           rotationX: 0, z: 0, autoAlpha: 1,
           duration: DUR, ease: LUX3D, delay: 0.05, transformOrigin: '50% 100%'
         });
         gsap.to(nextLogoFace, {
           rotationX: 0, z: 0, autoAlpha: 1,
           duration: DUR, ease: LUX3D, delay: 0.05, transformOrigin: '50% 0%'
         });
      }
    }
    
    prevStepRef.current = step;
  }, [step, isActive]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 w-full h-full" onWheel={handleWheel}>
      
      {/* INTRO STEP 0 */}
      <div ref={introRef} className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-8 md:p-12 invisible">
        <AmbientBg style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(200,149,60,.08) 0%, transparent 62%), var(--color-void-950)' }} />
        <SectionNumber number="03" title="Retail" />
        
        <div className="relative z-10">
          <Eyebrow>The Retail Ecosystem</Eyebrow>
          <Headline title="Retail at" italicText="Dubai Mall" />
          <Divider />
          <Subtext>
            Home to the world's most iconic brands —<br className="hidden md:block" />
            from luxury fashion houses to global retail leaders,<br className="hidden md:block" />
            all under one architecturally iconic roof.
          </Subtext>
          
          <StatsRow>
            <StatItem num="1,200" sub="+" label="Retail Stores" />
            <StatSeparator />
            <StatItem num="200" sub="+" label="Luxury Brands" />
            <StatSeparator />
            <StatItem num="5" sub="M" label="Sq Ft Retail" />
          </StatsRow>
        </div>
        <ScrollIndicator text="Continue" />
      </div>

      {/* BRANDS STEP 1 */}
      <div ref={brandsRef} className="absolute inset-0 z-20 invisible bg-void-950">
        <AmbientBg style={{ background: 'radial-gradient(ellipse 70% 55% at 65% 25%,rgba(200,149,60,.07) 0%,transparent 60%), radial-gradient(ellipse 50% 45% at 20% 80%,rgba(200,149,60,.04) 0%,transparent 55%)' }} />
        
        <div className="absolute top-0 left-0 right-0 z-20 px-6 py-5 md:px-[52px] md:py-[22px] flex items-center justify-between h-16">
          <span className="font-sans text-[9px] font-normal tracking-[0.3em] uppercase text-gold-500 flex items-center gap-3 before:content-['03'] before:font-display before:text-gold-500/55 before:tracking-[0.2em] after:content-[''] after:w-5 after:h-px after:bg-gold-500/45">Featured Brands</span>
          <span className="font-serif text-[12px] font-normal italic text-gold-500/75 tracking-[0.04em]">World-class retail, under one roof</span>
        </div>

        <div className="absolute top-16 left-0 right-0 bottom-11 z-[5]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.9fr_1.3fr_1.1fr] md:grid-rows-[auto] lg:grid-rows-2 gap-2.5 p-4 lg:px-[52px] lg:pt-2 lg:pb-3 h-full overflow-y-auto lg:overflow-hidden content-start lg:content-stretch">
            <BrandTile 
              id="bt-lv" 
              extraClasses="lg:row-span-2 min-h-[300px] lg:min-h-0 brand-tile-anim"
              ambientBg="radial-gradient(ellipse 70% 50% at 55% 30%,rgba(200,149,60,.14) 0%,transparent 58%), linear-gradient(162deg,#16100a 0%,#0e0b07 40%,#060504 100%)"
              category="Luxury Fashion · Maison"
              name="Louis<br/>Vuitton"
              desc="The world's most storied luxury house — leather goods, haute maroquinerie & ready-to-wear"
              tag="Fashion Avenue Flagship"
              monoSvg={
                <svg width="52" height="38" viewBox="0 0 200 144" fill="none">
                  <path d="M16 18 L16 126 L84 126 L84 108 L38 108 L38 18 Z" fill="rgba(200,169,110,0.85)"/>
                  <path d="M104 18 L134 108 L164 18 L182 18 L134 128 L88 128 L104 18 Z" fill="rgba(200,169,110,0.85)"/>
                </svg>
              }
            />
            <BrandTile 
              id="bt-apple"
              extraClasses="min-h-[250px] lg:min-h-0 brand-tile-anim"
              ambientBg="radial-gradient(ellipse 65% 55% at 50% 30%,rgba(140,150,170,.09) 0%,transparent 60%), linear-gradient(170deg,#0e0f13 0%,#090a0d 45%,#060504 100%)"
              category="Technology · Flagship"
              name="Apple"
              desc="The region's most immersive Apple Store — Genius Bar, Studio & full product ecosystem"
              tag="Tech Flagship"
              monoSvg={
                <svg width="36" height="44" viewBox="0 0 814 1000" fill="none">
                  <path fill="rgba(242,237,228,0.8)" d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-38.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.4 131.4-317.7 260.8-317.7 70.2 0 128.7 46.1 168.6 46.1 39.8 0 102.7-49.1 184.1-49.1 28.3 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
                </svg>
              }
            />
            <BrandTile 
              id="bt-cartier"
              extraClasses="min-h-[250px] lg:min-h-0 brand-tile-anim"
              ambientBg="radial-gradient(ellipse 60% 55% at 45% 35%,rgba(160,40,40,.08) 0%,transparent 58%), linear-gradient(155deg,#150a0a 0%,#0d0808 45%,#060504 100%)"
              category="Jewellery · Watches"
              name="Cartier"
              desc="Fine jewellery & haute horlogerie — UAE flagship boutique"
              tag="Jewellery · Maison"
              monoSvg={
                <svg width="52" height="30" viewBox="0 0 220 120" fill="none">
                  <path d="M85 14 C52 14 26 40 26 74 C26 108 52 104 85 104" stroke="rgba(200,169,110,0.82)" strokeWidth="9" strokeLinecap="round" fill="none"/>
                  <path d="M135 14 C168 14 194 40 194 74 C194 108 168 104 135 104" stroke="rgba(200,169,110,0.82)" strokeWidth="9" strokeLinecap="round" fill="none"/>
                </svg>
              }
            />
            <BrandTile 
              id="bt-nike"
              extraClasses="min-h-[250px] lg:min-h-0 brand-tile-anim"
              ambientBg="radial-gradient(ellipse 60% 50% at 40% 50%,rgba(45,45,65,.14) 0%,transparent 55%), linear-gradient(160deg,#0f0e13 0%,#0a0910 45%,#060504 100%)"
              category="Sport · Lifestyle"
              name="Nike"
              desc="Global sportswear leader with immersive multi-floor flagship retail format"
              tag="Lifestyle Flagship"
            />
            <BrandTile 
              id="bt-zara"
              extraClasses="min-h-[250px] lg:min-h-0 brand-tile-anim"
              ambientBg="radial-gradient(ellipse 55% 60% at 60% 35%,rgba(140,125,95,.09) 0%,transparent 55%), linear-gradient(158deg,#141210 0%,#0d0c0a 45%,#060504 100%)"
              category="Global Fashion"
              name="Zara"
              desc="Global fashion powerhouse — three flagship levels of curated contemporary collections"
              tag="Fashion · Multi-level"
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[46px] px-6 md:px-[52px] flex items-center bg-gradient-to-t from-void-950/90 to-transparent z-20">
          <div className="font-sans text-[8px] tracking-[0.22em] uppercase text-gold-500/40 font-light mr-6 shrink-0 hidden md:block">Also at The Mall</div>
          <div className="ticker-mask flex gap-0 overflow-hidden relative w-full h-full">
            <div className="ticker-scroll flex items-center h-full gap-6 whitespace-nowrap will-change-transform">
              {['Hermès','Chanel','Rolex','Dior','Gucci','Prada','Burberry','Valentino','Bottega Veneta','Balenciaga'].map((b,i) => (
                <React.Fragment key={i}>
                  <span className="font-serif text-[11px] italic text-offwhite-200/30">{b}</span>
                  <span className="w-[3px] h-[3px] rounded-full bg-gold-500/20"></span>
                </React.Fragment>
              ))}
              {/* Duplicate for loop */}
              {['Hermès','Chanel','Rolex','Dior','Gucci','Prada','Burberry','Valentino','Bottega Veneta','Balenciaga'].map((b,i) => (
                <React.Fragment key={`dup-${i}`}>
                  <span className="font-serif text-[11px] italic text-offwhite-200/30">{b}</span>
                  <span className="w-[3px] h-[3px] rounded-full bg-gold-500/20"></span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ECOSYSTEM STEP 2-5 (3D FLIP CONTAINER) */}
      <div ref={ecoRef} className="absolute inset-0 z-30 invisible bg-void-950 p-0 overflow-hidden flex flex-col md:flex-row" style={{ perspective: '1200px' }}>
        
        {/* Left Side: Detail Faces */}
        <div className="w-full md:w-1/2 relative overflow-hidden border-b md:border-b-0 md:border-r border-gold-500/10 h-1/2 md:h-full" style={{ transformStyle: 'preserve-3d' }}>
          {ECO_CATS.map((cat, idx) => (
            <div 
              key={`cat-${idx}`} 
              ref={el => catFacesRef.current[idx] = el}
              className="absolute inset-0 flex flex-col justify-center p-8 md:p-16 lg:pl-20 invisible opacity-0 pointer-events-none overflow-hidden"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            >
              <div className="absolute inset-0 z-0" style={{ background: cat.catBg }}></div>
              <div className="relative z-10 w-full">
                <div className="font-display text-[10px] tracking-[0.28em] uppercase text-gold-500 mb-5 flex items-center gap-3 after:content-[''] after:w-6 after:h-px after:bg-gold-500/50">{cat.eyebrow}</div>
                <h3 className="font-serif text-[clamp(32px,5vw,64px)] font-normal text-white leading-[1.02] tracking-[-0.018em] mb-6" dangerouslySetInnerHTML={{ __html: cat.title }}></h3>
                <p className="font-sans text-[14px] font-light text-stone-400 leading-[1.82] max-w-[340px] mb-8 lg:mb-10">{cat.desc}</p>
                <div className="flex items-center gap-4">
                  <div className="font-display text-[36px] lg:text-[44px] font-bold text-gold-500 tracking-[-0.02em] leading-none">{cat.stat}</div>
                  <div className="font-sans text-[9px] tracking-[0.2em] uppercase text-stone-500 font-light leading-[1.5]" dangerouslySetInnerHTML={{ __html: cat.statLabel }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Right Side: Logos Faces */}
        <div className="w-full md:w-1/2 relative overflow-hidden h-1/2 md:h-full" style={{ transformStyle: 'preserve-3d' }}>
          {ECO_CATS.map((cat, idx) => (
            <div 
              key={`logo-${idx}`}
              ref={el => logoFacesRef.current[idx] = el}
              className="absolute inset-0 flex items-center justify-center p-6 md:p-12 invisible opacity-0 pointer-events-none overflow-hidden"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            >
              <div className="absolute inset-0 z-0" style={{ background: cat.logosBg }}></div>
              <div className="relative z-10 w-full flex flex-col items-center">
                {cat.logos.map((row, ri) => (
                  <React.Fragment key={ri}>
                    <div className="flex flex-wrap items-center justify-center w-full">
                      {row.map((logo, li) => {
                        const { itemClasses, textClasses } = getLogoClasses(logo.c);
                        return (
                          <React.Fragment key={li}>
                            <div className={itemClasses}>
                              <span className={textClasses} dangerouslySetInnerHTML={{ __html: logo.t }}></span>
                            </div>
                            {li < row.length - 1 && <span className="w-[3px] h-[3px] rounded-full bg-gold-500/25 shrink-0 self-center mx-1 md:mx-2"></span>}
                          </React.Fragment>
                        );
                      })}
                    </div>
                    {ri < cat.logos.length - 1 && <div className="h-px w-1/2 mx-auto my-3" style={{ background: 'linear-gradient(to right, transparent, rgba(200,169,110,0.1), transparent)' }}></div>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Side Nav Dots */}
        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[200] flex flex-col items-center">
          {ECO_CATS.map((cat, i) => (
            <div key={i} className="relative w-8 h-8 flex flex-col items-center justify-center group cursor-pointer" onClick={() => { if (!isTransitioning.current) setStep(i + 2); }}>
              <div className={`w-[5px] h-[5px] rounded-full border transition-all duration-400 ease-[cubic-bezier(0.25,0,0,1)] ${step === i + 2 ? 'bg-gold-500 border-gold-500 shadow-[0_0_8px_rgba(200,169,110,.45)] scale-125' : 'bg-transparent border-gold-500/35 group-hover:scale-110'}`}></div>
              {i < ECO_CATS.length - 1 && <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-px h-2.5 bg-gradient-to-b from-gold-500/20 to-gold-500/10 pointer-events-none"></div>}
              
              <div className="absolute right-6 top-1/2 -translate-y-1/2 font-sans text-[9px] tracking-[0.18em] uppercase text-gold-500/70 whitespace-nowrap opacity-0 pointer-events-none transition-opacity duration-250 bg-void-950/70 px-2.5 py-1 rounded border border-gold-500/10 group-hover:opacity-100 hidden md:block">
                {cat.eyebrow.split('— ')[1]}
              </div>
            </div>
          ))}
        </div>
        
        <ScrollIndicator text={step < 5 ? "Scroll to Explore" : "Next Section"} className="z-50" />
      </div>
      
    </div>
  );
};

import React, { useEffect, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t } = useSettings();
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Subtle image pop-in on load — scale from 1.05 to 1, then stays static
      gsap.fromTo(imageRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' }
      );

      // Text stagger fade in
      gsap.fromTo(
        textRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
      );

      // Parallax on scroll — image slowly shifts up as user scrolls away
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        animation: gsap.to(imageRef.current, {
          y: '-10%',
          ease: 'none'
        })
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Static Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop"
          alt="Panoramic view of the Himalayan mountains in Nepal with snow-covered peaks"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-peakDeep via-peakDeep/50 to-peakDeep/30"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        <div ref={textRef} className="flex flex-col items-center">
          <p className="text-peakWhite/70 font-sans font-medium text-sm md:text-base tracking-[0.3em] uppercase mb-6">
            {t('hero.tagline')}
          </p>
          <h1 className="text-peakWhite font-display font-bold text-5xl md:text-7xl lg:text-[8rem] tracking-tight leading-[0.9] mb-6 drop-shadow-2xl">
            {t('hero.title')}
          </h1>
          <p className="text-peakWhite/80 font-sans text-sm md:text-lg max-w-lg mx-auto tracking-wide leading-relaxed mb-10">
            {t('hero.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#destinations" className="magnetic-btn group bg-peakGreen hover:bg-peakGreen/90 text-white px-8 py-4 rounded-full font-sans uppercase tracking-widest font-bold text-sm flex items-center justify-center gap-3 hover-lift shadow-[0_10px_40px_-10px_rgba(22,101,52,0.5)] transition-all">
              <span className="relative z-10">{t('hero.cta')}</span>
              <svg className="relative z-10 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </a>
            <a href="#features" className="border border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-full font-sans uppercase tracking-widest font-semibold text-sm flex items-center justify-center gap-3 hover-lift transition-all backdrop-blur-sm">
              <span>{t('hero.secondary')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile, nature-inspired on desktop */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-4">
        <span className="text-white/60 text-[10px] font-sans uppercase tracking-[0.2em]">{t('hero.scroll')}</span>
        <div className="w-px h-16 bg-white/20 relative overflow-hidden">
          {/* Animated flowing line representing a trail or waterfall */}
          <div className="w-full h-1/2 bg-white/80 absolute top-0 -translate-y-full animate-[scrolldown_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import React, { useEffect, useRef, useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://images.unsplash.com/photo-1671181366687-47530c4dbe4b?q=80&w=1470&auto=format&fit=crop", // ABC
  "https://images.unsplash.com/photo-1713670959170-176c7d31b93f?q=80&w=1074&auto=format&fit=crop", // Gosaikunda
  "https://images.unsplash.com/photo-1643548947288-fbf86caf414a?q=80&w=1102&auto=format&fit=crop", // Langtang
  "https://images.unsplash.com/photo-1505058439590-d86bd136dcec?q=80&w=1470&auto=format&fit=crop", // Gokyo
  "https://plus.unsplash.com/premium_photo-1697729963745-8e14a76d48c2?q=80&w=1121&auto=format&fit=crop", // EBC
];

const Hero = () => {
  const { t } = useSettings();
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
    <section id="hero" ref={heroRef} className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Looping Background Gallery */}
      <div ref={imageRef} className="absolute inset-0 z-0 overflow-hidden bg-peakDeep">
        {images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={["Annapurna Base Camp mountain range", "Gosaikunda Holy Lakes", "Langtang Valley peaks", "Gokyo Lakes turquoise waters", "Everest Base Camp sunrise"][index] || "Himalayan mountain peak"}
            className={`absolute inset-0 w-full h-full object-cover ease-in-out ${
              index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{ 
              transitionProperty: 'opacity, transform', 
              transitionDuration: '1.2s' 
            }}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-peakDeep via-peakDeep/50 to-peakDeep/30 z-10 pointer-events-none"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        <div ref={textRef} className="flex flex-col items-center">
          <p className="text-peakWhite/70 font-sans font-medium text-sm md:text-base tracking-[0.3em] uppercase mb-6">
            {t('hero.tagline')}
          </p>
          <h1 className="text-peakWhite font-display font-bold text-[3rem] sm:text-5xl md:text-7xl lg:text-[8rem] tracking-tight leading-[1] md:leading-[0.9] mb-4 md:mb-6 drop-shadow-2xl">
            {t('hero.title')}
          </h1>
          <p className="text-peakWhite/80 font-sans text-sm md:text-lg max-w-lg mx-auto tracking-wide leading-relaxed mb-8 md:mb-10 px-4 md:px-0">
            {t('hero.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
            <a href="#destinations" className="magnetic-btn group bg-peakGreen hover:bg-peakGreen/90 text-white px-6 py-3.5 md:px-8 md:py-4 rounded-full font-sans uppercase tracking-widest font-bold text-sm flex items-center justify-center gap-3 hover-lift shadow-[0_10px_40px_-10px_rgba(22,101,52,0.5)] transition-all w-full sm:w-auto">
              <span className="relative z-10">{t('hero.cta')}</span>
              <svg className="relative z-10 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </a>
            <a href="#features" className="border border-white/30 hover:border-white/60 text-white px-6 py-3.5 md:px-8 md:py-4 rounded-full font-sans uppercase tracking-widest font-semibold text-sm flex items-center justify-center gap-3 hover-lift transition-all backdrop-blur-sm w-full sm:w-auto">
              <span>{t('hero.secondary')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile, trekking-themed on desktop */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 cursor-pointer group" 
        onClick={() => document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="flex items-center gap-2 text-white/50 group-hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] mt-0.5">Start Trek</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-peakGreen animate-bounce mt-1 drop-shadow-[0_0_5px_rgba(22,101,52,0.8)]"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </section>
  );
};

export default Hero;

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Components
const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: {
          className: 'bg-ghost/60 backdrop-blur-xl border border-graphite/10 text-plasma',
          targets: navRef.current
        },
        onToggle: (self) => {
          if (self.isActive) {
            gsap.to(navRef.current.querySelectorAll('.nav-link, .brand-text'), { color: '#7B61FF', duration: 0.3 });
          } else {
            gsap.to(navRef.current.querySelectorAll('.nav-link, .brand-text'), { color: '#F0EFF4', duration: 0.3 });
          }
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 w-full">
      <nav ref={navRef} className="flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 w-full max-w-4xl text-ghost">
        <div className="font-drama text-2xl brand-text tracking-widest italic">Aura</div>
        <div className="hidden md:flex gap-8 items-center font-sans uppercase tracking-widest text-xs">
          <a href="#features" className="nav-link hover-lift">Design</a>
          <a href="#philosophy" className="nav-link hover-lift">Craft</a>
          <a href="#protocol" className="nav-link hover-lift">Atelier</a>
        </div>
        <button className="magnetic-btn bg-plasma text-deepVoid px-6 py-2 rounded-full font-sans uppercase tracking-widest text-xs font-semibold">
          <span className="relative z-10">Discover</span>
        </button>
      </nav>
    </div>
  );
};

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-el',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 2, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full flex items-end pb-24 px-8 md:px-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Architecture"
          className="w-full h-full object-cover object-center grayscale opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deepVoid via-deepVoid/80 to-deepVoid/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="hero-el text-ghost font-sans font-light text-4xl md:text-6xl tracking-widest leading-none uppercase">
            Elegance beyond
          </h1>
          <h1 className="hero-el text-plasma font-drama text-7xl md:text-[8rem] leading-none -ml-2 italic">
            Time.
          </h1>
        </div>
        <div className="hero-el max-w-xl">
          <p className="text-ghost/80 font-sans font-light text-sm md:text-base leading-relaxed mb-8 tracking-wide">
            Aura — a timeless architecture. Designing elegance inside a physical frontier. The next evolution of luxury.
          </p>
          <button className="magnetic-btn bg-plasma text-deepVoid px-8 py-4 rounded-full font-sans uppercase tracking-widest font-semibold text-sm flex items-center gap-2 hover-lift">
            <span className="relative z-10">Discover Collection</span>
            <svg className="relative z-10 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-32 px-8 md:px-16 w-full flex justify-center bg-ghost relative z-10">
      <div className="w-full max-w-6xl">
        <div className="mb-24 flex flex-col items-center text-center">
          <h2 className="font-drama text-4xl md:text-6xl text-graphite mb-6 tracking-wide italic">The Aura Standard</h2>
          <p className="font-sans font-light text-graphite/60 text-sm md:text-base max-w-xl tracking-wide uppercase">Craftsmanship elevated beyond mere creation. A philosophy of meticulous detail and uncompromising quality.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Card 1 */}
          <div className="bg-ghost rounded-[1rem] p-10 border border-graphite/5 flex flex-col hover-lift group">
            <div className="h-48 mb-8 overflow-hidden rounded-lg">
               <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" alt="Timeless Design" />
            </div>
            <span className="font-sans text-plasma text-xs tracking-widest uppercase mb-4">01 / Foundation</span>
            <h3 className="font-drama text-3xl text-graphite mb-4 italic">Timeless Design</h3>
            <p className="font-sans font-light text-sm text-graphite/70 leading-relaxed">Silhouettes engineered to endure. We eschew fleeting trends in favor of classical proportions reimagined for the modern era.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-ghost rounded-[1rem] p-10 border border-graphite/5 flex flex-col hover-lift group mt-0 md:mt-12">
            <div className="h-48 mb-8 overflow-hidden rounded-lg">
               <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" alt="Exquisite Craftsmanship" />
            </div>
            <span className="font-sans text-plasma text-xs tracking-widest uppercase mb-4">02 / Execution</span>
            <h3 className="font-drama text-3xl text-graphite mb-4 italic">Exquisite Craftsmanship</h3>
            <p className="font-sans font-light text-sm text-graphite/70 leading-relaxed">Each piece is a testament to the artisan's touch. Forged, cut, and shaped by hands dedicated to absolute mastery of their medium.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-ghost rounded-[1rem] p-10 border border-graphite/5 flex flex-col hover-lift group mt-0 md:mt-24">
            <div className="h-48 mb-8 overflow-hidden rounded-lg">
               <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" alt="Unparalleled Detail" />
            </div>
            <span className="font-sans text-plasma text-xs tracking-widest uppercase mb-4">03 / Refinement</span>
            <h3 className="font-drama text-3xl text-graphite mb-4 italic">Unparalleled Detail</h3>
            <p className="font-sans font-light text-sm text-graphite/70 leading-relaxed">Perfection resides in the microcosm. We obsess over the unseen elements as fiercely as the visible, ensuring profound harmony.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

const Philosophy = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.manifesto-text', 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.15, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );

      gsap.to('.parallax-bg', {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={sectionRef} className="relative w-full py-32 md:py-48 px-8 md:px-16 bg-deepVoid overflow-hidden flex items-center justify-center">
      {/* Parallax Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury material texture"
          className="parallax-bg w-full h-[130%] object-cover object-center opacity-30 grayscale"
        />
        <div className="absolute inset-0 bg-deepVoid/70"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl text-center flex flex-col items-center">
        <p className="manifesto-text font-sans font-light text-ghost/50 text-sm md:text-base mb-8 tracking-widest uppercase">
          The true essence of luxury lies within.
        </p>
        <p className="manifesto-text font-drama text-5xl md:text-7xl lg:text-[6rem] text-ghost leading-[1.1] tracking-wide">
          We focus on <span className="text-plasma italic pr-4">structural elegance</span> <br/>
          and absolute perfection.
        </p>
      </div>
    </section>
  );
};

const Atelier = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            endTrigger: ".protocol-container",
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
            animation: gsap.to(card, {
              scale: 0.9,
              opacity: 0.5,
              filter: "blur(20px)",
              ease: "none"
            }),
            scrub: true,
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" ref={containerRef} className="protocol-container relative w-full bg-ghost">
      
      {/* Card 1 */}
      <div className="protocol-card h-[100dvh] w-full flex items-center justify-center sticky top-0 bg-ghost px-8 md:px-16 border-b border-graphite/5">
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full h-[30rem] relative flex items-center justify-center overflow-hidden rounded-2xl shadow-xl">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-90 hover:scale-105 transition-transform duration-[1.5s]" alt="Material Selection" />
          </div>
          <div className="flex-1">
            <span className="font-sans text-plasma text-xs uppercase tracking-widest mb-4 block">Stage 01</span>
            <h2 className="font-drama text-4xl md:text-5xl text-graphite mb-6 italic">Curation of Elements</h2>
            <p className="font-sans font-light text-graphite/70 leading-relaxed text-sm md:text-base">
              Only the most exceptional materials are chosen. A rigorous selection process ensures absolute harmony before the first incision is made.
            </p>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="protocol-card h-[100dvh] w-full flex items-center justify-center sticky top-0 bg-ghost px-8 md:px-16 border-b border-graphite/5">
        <div className="w-full max-w-5xl flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="flex-1 w-full h-[30rem] relative flex items-center justify-center overflow-hidden rounded-2xl shadow-xl">
             <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-90 hover:scale-105 transition-transform duration-[1.5s]" alt="Design Process" />
          </div>
          <div className="flex-1 text-left md:text-right">
            <span className="font-sans text-plasma text-xs uppercase tracking-widest mb-4 block">Stage 02</span>
            <h2 className="font-drama text-4xl md:text-5xl text-graphite mb-6 italic">The Master's Cut</h2>
            <p className="font-sans font-light text-graphite/70 leading-relaxed text-sm md:text-base">
              Decades of refined intuition guide the tools. The raw potential is slowly coaxed into a silhouette of defining elegance.
            </p>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="protocol-card h-[100dvh] w-full flex items-center justify-center sticky top-0 bg-ghost px-8 md:px-16">
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full h-[30rem] relative flex items-center justify-center overflow-hidden rounded-2xl shadow-xl">
             <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-90 hover:scale-105 transition-transform duration-[1.5s]" alt="Final Polish" />
          </div>
          <div className="flex-1">
            <span className="font-sans text-plasma text-xs uppercase tracking-widest mb-4 block">Stage 03</span>
            <h2 className="font-drama text-4xl md:text-5xl text-graphite mb-6 italic">Final Radiance</h2>
            <p className="font-sans font-light text-graphite/70 leading-relaxed text-sm md:text-base">
              The surface is brought to life. A final meticulous polish reveals the soul of the piece, ready to endure generations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section id="cta" className="py-48 px-8 md:px-16 w-full flex flex-col items-center justify-center bg-ghost relative z-10">
      <div className="max-w-3xl text-center flex flex-col items-center">
        <h2 className="font-drama text-5xl md:text-7xl text-graphite mb-6 tracking-wide italic">Experience Aura.</h2>
        <p className="font-sans font-light text-graphite/60 text-sm md:text-base mb-12 max-w-xl uppercase tracking-widest leading-relaxed">
          Arrange a private viewing to witness the culmination of design and absolute craftsmanship.
        </p>
        <button className="magnetic-btn bg-plasma text-deepVoid px-10 py-5 rounded-full font-sans uppercase tracking-widest font-semibold text-sm flex items-center gap-3 hover-lift shadow-[0_10px_40px_-10px_#D4AF37]">
          <span className="relative z-10">Request Invitation</span>
          <svg className="relative z-10 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </button>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-deepVoid text-ghost rounded-t-[4rem] px-8 md:px-16 pt-24 pb-12 relative z-20 mt-[-4rem]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-16 mb-24">
        <div className="flex-1">
          <h2 className="font-drama text-4xl mb-4 tracking-widest italic">Aura</h2>
          <p className="font-sans font-light text-sm text-ghost/60 max-w-xs leading-relaxed uppercase tracking-wider">
            Designing elegance inside a physical frontier.
          </p>
        </div>
        <div className="flex gap-16 font-sans text-sm tracking-widest uppercase">
          <div className="flex flex-col gap-4">
             <span className="text-plasma mb-2 font-semibold">Discover</span>
             <a href="#features" className="text-ghost/70 hover:text-plasma transition-colors">Design</a>
             <a href="#philosophy" className="text-ghost/70 hover:text-plasma transition-colors">Craft</a>
             <a href="#protocol" className="text-ghost/70 hover:text-plasma transition-colors">Atelier</a>
          </div>
          <div className="flex flex-col gap-4">
             <span className="text-plasma mb-2 font-semibold">House</span>
             <a href="#" className="text-ghost/70 hover:text-plasma transition-colors">Boutiques</a>
             <a href="#" className="text-ghost/70 hover:text-plasma transition-colors">Contact</a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-graphite/20 gap-4">
        <div className="font-sans font-light text-xs text-ghost/40 tracking-wider">© {new Date().getFullYear()} Aura Design Studio. All rights reserved.</div>
      </div>
    </footer>
  );
};

function App() {
  const lineRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const path = lineRef.current;
      if(path) {
         const length = path.getTotalLength();
         gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

         gsap.to(path, {
           strokeDashoffset: 0,
           ease: "none",
           scrollTrigger: {
             trigger: "body",
             start: "top top",
             end: "bottom bottom",
             scrub: 1
           }
         });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[5] opacity-30 mix-blend-difference">
         <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="w-full h-[300vh] absolute top-0 left-0">
           <path
             ref={lineRef}
             d="M 50 0 Q 80 150 50 300 T 50 600 T 50 1000"
             stroke="#D4AF37"
             strokeWidth="0.5"
             fill="none"
             vectorEffect="non-scaling-stroke"
           />
         </svg>
      </div>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Atelier />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default App;

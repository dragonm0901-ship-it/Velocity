import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
        <div className="font-sans font-bold text-lg brand-text tracking-tight">Velocity</div>
        <div className="hidden md:flex gap-8 items-center font-mono text-sm">
          <a href="#features" className="nav-link hover-lift">Architecture</a>
          <a href="#philosophy" className="nav-link hover-lift">Theory</a>
          <a href="#protocol" className="nav-link hover-lift">Protocol</a>
        </div>
        <button className="magnetic-btn bg-plasma text-ghost px-5 py-2 rounded-full font-sans text-sm font-medium">
          <span className="relative z-10">Access Core</span>
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
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full flex items-end pb-24 px-8 md:px-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=2671&auto=format&fit=crop" 
          alt="Bioluminescence abstract" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deepVoid via-deepVoid/80 to-deepVoid/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="hero-el text-ghost font-sans font-bold text-4xl md:text-6xl tracking-tight leading-none">
            Intelligence beyond
          </h1>
          <h1 className="hero-el text-plasma font-drama text-7xl md:text-[8rem] leading-none -ml-2">
            Limitations.
          </h1>
        </div>
        <div className="hero-el max-w-xl">
          <p className="text-ghost/80 font-mono text-sm md:text-base leading-relaxed mb-8">
            Velocity — a futuristic AI architecture. Sequencing logical precision inside a digital frontier. The next evolution of cognitive synthetics.
          </p>
          <button className="magnetic-btn bg-plasma text-ghost px-8 py-4 rounded-full font-sans font-semibold text-lg flex items-center gap-2 hover-lift">
            <span className="relative z-10">Initialize Sequence</span>
            <svg className="relative z-10 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

const DiagnosticShuffler = () => {
  const [cards, setCards] = React.useState([
    { id: 1, label: "Pattern Recognition Module", value: "Active" },
    { id: 2, label: "Neural Pathway Routing", value: "Optimizing" },
    { id: 3, label: "Synthesis Matrix", value: "Stable" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newCards = [...prev];
        const last = newCards.pop();
        newCards.unshift(last);
        return newCards;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-48 w-full perspective-1000">
      {cards.map((card, idx) => {
        const isTop = idx === 0;
        const yOffset = idx * 12;
        const scale = 1 - idx * 0.05;
        const opacity = 1 - idx * 0.2;
        
        return (
          <div 
            key={card.id}
            className="absolute top-0 left-0 w-full p-4 rounded-2xl bg-deepVoid border border-graphite/40 shadow-xl transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{ 
              transform: `translateY(${yOffset}px) scale(${scale})`,
              zIndex: 10 - idx,
              opacity: opacity
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-xs text-ghost/60">{card.label}</span>
              <span className={`font-mono text-xs px-2 py-1 rounded-full ${isTop ? 'bg-plasma/20 text-plasma' : 'bg-graphite text-ghost/40'}`}>
                {card.value}
              </span>
            </div>
            <div className="h-12 bg-graphite/30 rounded-lg w-full overflow-hidden relative">
               <div className="absolute top-0 left-0 h-full bg-plasma/40 w-full animate-pulse opacity-50"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const TELEMETRY_MESSAGES = [
  "INITIATING SENSOR ARRAY...",
  "ANALYZING COGNITIVE LOAD...",
  "TELEMETRY STREAM: STABLE.",
  "REAL-TIME PROCESSING ONLINE."
];

const TelemetryTypewriter = () => {
  const [text, setText] = React.useState("");
  const [msgIdx, setMsgIdx] = React.useState(0);
  const [charIdx, setCharIdx] = React.useState(0);

  useEffect(() => {
    const currentMsg = TELEMETRY_MESSAGES[msgIdx];
    if (charIdx < currentMsg.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + currentMsg[charIdx]);
        setCharIdx(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setText("");
        setCharIdx(0);
        setMsgIdx(prev => (prev + 1) % TELEMETRY_MESSAGES.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [charIdx, msgIdx]);

  return (
    <div className="w-full bg-deepVoid rounded-2xl p-6 border border-graphite/40 shadow-xl h-48 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-plasma animate-pulse"></div>
        <span className="font-mono text-xs text-plasma uppercase tracking-wider">Live Feed</span>
      </div>
      <div className="font-mono text-sm text-ghost/80 flex-1">
        {text}<span className="inline-block w-2 h-4 bg-plasma ml-1 animate-bounce"></span>
      </div>
    </div>
  );
};

const CursorProtocolScheduler = () => {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [activeDay, setActiveDay] = React.useState(null);
  const [btnActive, setBtnActive] = React.useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      // Starting position outside
      tl.set(cursorRef.current, { x: 150, y: 100, opacity: 0, scale: 1 });
      
      // Move in
      tl.to(cursorRef.current, { x: 80, y: 40, opacity: 1, duration: 0.8, ease: "power2.inOut" })
        // Hover day
        .to(cursorRef.current, { x: 110, y: 30, duration: 0.5, ease: "power2.inOut" })
        // Click day
        .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
        .call(() => setActiveDay(3)) // Activate 'W'
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        // Move to save
        .to(cursorRef.current, { x: 180, y: 130, duration: 0.8, ease: "power2.inOut", delay: 0.5 })
        // Click save
        .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
        .call(() => setBtnActive(true))
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        // Fade out
        .to(cursorRef.current, { opacity: 0, duration: 0.4, delay: 0.5 })
        .call(() => {
           setActiveDay(null);
           setBtnActive(false);
        });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-deepVoid rounded-2xl p-6 border border-graphite/40 shadow-xl h-48 relative overflow-hidden flex flex-col justify-between">
      <div className="flex justify-between w-full max-w-[200px] mb-4">
        {days.map((d, i) => (
          <div key={i} className={`w-6 h-6 rounded flex items-center justify-center font-mono text-xs transition-colors duration-300 ${activeDay === i ? 'bg-plasma text-ghost' : 'bg-graphite/30 text-ghost/50'}`}>
            {d}
          </div>
        ))}
      </div>
      
      <div className="self-end mt-auto">
        <div className={`px-4 py-1.5 rounded-lg font-sans text-xs font-medium transition-colors duration-300 ${btnActive ? 'bg-plasma text-ghost scale-95' : 'bg-graphite text-ghost/70'}`}>
          Orchestrate
        </div>
      </div>

      {/* SVG Cursor */}
      <svg ref={cursorRef} className="absolute z-20 w-5 h-5 text-ghost drop-shadow-md" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ top: 0, left: 0 }}>
        <path d="M7 2l12 11.2-5.8.5 3.3 7.3-2.2.9-3.2-7.4-4.4 5V2z" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      </svg>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 px-8 md:px-16 w-full flex justify-center bg-ghost relative z-10">
      <div className="w-full max-w-6xl">
        <div className="mb-16">
          <h2 className="font-sans font-bold text-3xl md:text-5xl text-graphite mb-4 tracking-tight">System Capabilities</h2>
          <p className="font-mono text-graphite/60 text-sm md:text-base max-w-xl">Architectural nodes engineered for absolute performance. No arbitrary operations. Pure logical execution.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-ghost rounded-[2rem] p-8 border border-graphite/10 shadow-sm flex flex-col hover-lift">
            <div className="mb-8">
               <DiagnosticShuffler />
            </div>
            <h3 className="font-sans font-bold text-xl text-graphite mb-2">Unbound Neural Synthesis</h3>
            <p className="font-mono text-sm text-graphite/70">Continuous reorganization of operational parameters to ensure maximum efficiency paths.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-ghost rounded-[2rem] p-8 border border-graphite/10 shadow-sm flex flex-col hover-lift">
            <div className="mb-8">
               <TelemetryTypewriter />
            </div>
            <h3 className="font-sans font-bold text-xl text-graphite mb-2">Real-time Cognitive Telemetry</h3>
            <p className="font-mono text-sm text-graphite/70">Sub-millisecond observation matrix streaming system health and predictive variance.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-ghost rounded-[2rem] p-8 border border-graphite/10 shadow-sm flex flex-col hover-lift">
            <div className="mb-8">
               <CursorProtocolScheduler />
            </div>
            <h3 className="font-sans font-bold text-xl text-graphite mb-2">Automated Protocol Orchestration</h3>
            <p className="font-mono text-sm text-graphite/70">Algorithmic execution of procedural events aligned with cognitive capacity forecasting.</p>
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
          src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" 
          alt="Dark fluid texture" 
          className="parallax-bg w-full h-[130%] object-cover object-center opacity-10"
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl text-center">
        <p className="manifesto-text font-sans font-medium text-ghost/50 text-xl md:text-2xl mb-8 tracking-tight">
          Most AI platforms focus on: superficial augmentation.
        </p>
        <p className="manifesto-text font-drama text-5xl md:text-7xl lg:text-[6rem] text-ghost leading-[1.1] tracking-tight">
          We focus on: <span className="text-plasma italic pr-4">structural integration</span> <br/>
          and absolute cognition.
        </p>
      </div>
    </section>
  );
};

const Protocol = () => {
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
      <div className="protocol-card h-[100dvh] w-full flex items-center justify-center sticky top-0 bg-ghost px-8 md:px-16 border-b border-graphite/10">
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full h-64 relative flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full text-plasma animate-spin" style={{ animationDuration: '20s' }}>
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10" />
              <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" opacity="0.5" />
              <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            </svg>
          </div>
          <div className="flex-1">
            <span className="font-mono text-plasma mb-4 block">01 / INGESTION</span>
            <h2 className="font-sans font-bold text-4xl md:text-5xl text-graphite mb-6 tracking-tight">Data Harmonization</h2>
            <p className="font-mono text-graphite/70 leading-relaxed text-sm md:text-base">
              Raw structural data is ingested, standardized, and normalized across thousands of dimensional matrices in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="protocol-card h-[100dvh] w-full flex items-center justify-center sticky top-0 bg-ghost px-8 md:px-16 border-b border-graphite/10">
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full h-64 relative flex items-center justify-center overflow-hidden">
            <div className="grid grid-cols-10 grid-rows-10 gap-2 w-full h-full opacity-20">
              {Array.from({length: 100}).map((_, i) => (
                <div key={i} className="bg-graphite rounded-full w-1.5 h-1.5 place-self-center"></div>
              ))}
            </div>
            <div className="absolute top-0 left-0 w-full h-full">
               <div className="w-full h-1 bg-plasma shadow-[0_0_15px_#7B61FF] animate-[scan_3s_ease-in-out_infinite_alternate]"></div>
            </div>
          </div>
          <div className="flex-1">
            <span className="font-mono text-plasma mb-4 block">02 / ANALYSIS</span>
            <h2 className="font-sans font-bold text-4xl md:text-5xl text-graphite mb-6 tracking-tight">Deep Structuring</h2>
            <p className="font-mono text-graphite/70 leading-relaxed text-sm md:text-base">
              Neural models scan the harmonized matrix to isolate anomalies, predict variance, and compute optimal operational pathways.
            </p>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="protocol-card h-[100dvh] w-full flex items-center justify-center sticky top-0 bg-ghost px-8 md:px-16">
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full h-64 relative flex items-center justify-center">
             <svg viewBox="0 0 200 100" className="w-full h-full text-plasma drop-shadow-lg">
                <path 
                  d="M0 50 L40 50 L50 20 L60 80 L70 50 L200 50" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-[dash_2s_linear_infinite]"
                  style={{ strokeDasharray: 300, strokeDashoffset: 300 }}
                />
             </svg>
          </div>
          <div className="flex-1">
            <span className="font-mono text-plasma mb-4 block">03 / EXECUTION</span>
            <h2 className="font-sans font-bold text-4xl md:text-5xl text-graphite mb-6 tracking-tight">Active Deployment</h2>
            <p className="font-mono text-graphite/70 leading-relaxed text-sm md:text-base">
              Calculated logic is deployed automatically. The system autonomously modulates to maintain perfect cognitive equilibrium.
            </p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(16rem); }
        }
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
      `}} />
    </section>
  );
};

const CTA = () => {
  return (
    <section id="cta" className="py-32 px-8 md:px-16 w-full flex flex-col items-center justify-center bg-ghost relative z-10">
      <div className="max-w-3xl text-center flex flex-col items-center">
        <h2 className="font-sans font-bold text-4xl md:text-6xl text-graphite mb-6 tracking-tight">Initiate Inquiry.</h2>
        <p className="font-mono text-graphite/60 text-base md:text-lg mb-12 max-w-xl">
          Obtain full architectural schematics and operational data regarding the Velocity framework.
        </p>
        <button className="magnetic-btn bg-plasma text-ghost px-10 py-5 rounded-full font-sans font-semibold text-xl flex items-center gap-3 hover-lift shadow-[0_10px_40px_-10px_#7B61FF]">
          <span className="relative z-10">Request Documentation</span>
          <svg className="relative z-10 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
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
          <h2 className="font-sans font-bold text-3xl mb-4 tracking-tight">Velocity</h2>
          <p className="font-mono text-sm text-ghost/60 max-w-xs leading-relaxed">
            Sequencing logical precision inside a digital frontier.
          </p>
        </div>
        <div className="flex gap-16 font-mono text-sm">
          <div className="flex flex-col gap-4">
             <span className="text-plasma mb-2">Index</span>
             <a href="#features" className="text-ghost/70 hover:text-plasma transition-colors">Architecture</a>
             <a href="#philosophy" className="text-ghost/70 hover:text-plasma transition-colors">Theory</a>
             <a href="#protocol" className="text-ghost/70 hover:text-plasma transition-colors">Protocol</a>
          </div>
          <div className="flex flex-col gap-4">
             <span className="text-plasma mb-2">Legal</span>
             <a href="#" className="text-ghost/70 hover:text-plasma transition-colors">Privacy Matrix</a>
             <a href="#" className="text-ghost/70 hover:text-plasma transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-graphite/20 gap-4">
        <div className="font-mono text-xs text-ghost/40">© {new Date().getFullYear()} Velocity AI Core. All logic reserved.</div>
        <div className="flex items-center gap-2 font-mono text-xs bg-graphite/30 px-3 py-1.5 rounded-full border border-graphite/50">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           <span className="text-ghost/80">SYSTEM OPERATIONAL</span>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <>
      <div className="noise-overlay pointer-events-none"></div>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default App;

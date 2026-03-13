import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import CurrencyExchange from "./components/CurrencyExchange";
import RecommendationEngine from "./components/RecommendationEngine";
import DynamicItineraryBuilder from "./components/DynamicItineraryBuilder";
import SustainabilityBadge from "./components/SustainabilityBadge";
import TrustFeatures from "./components/TrustFeatures";
import EquipmentChecklist from "./components/EquipmentChecklist";
import Hero from './components/Hero';
import TrekkingPlanner from './components/TrekkingPlanner';
import PopularTreks from './components/PopularTreks';
import ReviewSlider from './components/ReviewSlider';
import WhatsAppFloat from './components/WhatsAppFloat';

gsap.registerPlugin(ScrollTrigger);

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onComplete
      });

      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out"
      })
      .to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 1,
        delay: 0.5,
        ease: "power3.in"
      })
      .to(bgRef.current, {
        height: 0,
        duration: 1.2,
        ease: "power4.inOut"
      }, "-=0.2");
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
      <div ref={bgRef} className="absolute inset-0 bg-richBlue w-full h-full transform origin-top"></div>
      <div
        ref={textRef}
        className="relative z-10 font-sans text-pureWhite text-6xl font-display md:text-8xl font-display italic opacity-0 translate-y-10"
      >
        We Travel Nepal
      </div>
    </div>
  );
};


const GlobalInteractions = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.target.closest('.magnetic-btn')) {
        const btn = e.target.closest('.magnetic-btn');
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left) - rect.width / 2;
        const y = (e.clientY - rect.top) - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.4,
          y: y * 0.4,
          duration: 0.8,
          ease: "power3.out"
        });
      }
    };

    const handleMouseLeave = (e) => {
      const btn = e.target.closest('.magnetic-btn');
      if (btn && (!e.relatedTarget || !btn.contains(e.relatedTarget))) {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)"
        });
      }
    };

    document.body.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseout', handleMouseLeave);
      gsap.set('.magnetic-btn', { clearProps: 'transform' });
    };
  }, []);

  return null;
};

const Footer = () => {
  return (
    <footer id="about" className="w-full bg-richBlue text-pureWhite  px-8 md:px-16 pt-24 pb-12 relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-16 mb-24">
        <div className="flex-1">
          <h2 className="font-sans text-4xl font-display mb-4 tracking-widest italic font-bold">We Travel Nepal</h2>
          <p className="font-sans font-light text-sm text-pureWhite/60 max-w-xs leading-relaxed uppercase tracking-wider">
            High-performance booking engine for the unique logistics of the Himalayas.
          </p>
        </div>
        <div className="flex gap-16 font-sans text-sm tracking-widest uppercase font-semibold">
          <div className="flex flex-col gap-4">
             <span className="text-softRed mb-2">Platform</span>
             <a href="#planner" className="text-pureWhite/70 hover:text-softRed transition-colors">Trekking Planner</a>
             <a href="#treks" className="text-pureWhite/70 hover:text-softRed transition-colors">Popular Treks</a>
             <a href="#" className="text-pureWhite/70 hover:text-softRed transition-colors">Permits</a>
          </div>
          <div className="flex flex-col gap-4">
             <span className="text-softRed mb-2">Company</span>
             <a href="#" className="text-pureWhite/70 hover:text-softRed transition-colors">About Us</a>
             <a href="#" className="text-pureWhite/70 hover:text-softRed transition-colors">Contact</a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-pureWhite/20 gap-4">
        <div className="font-sans font-semibold text-xs text-pureWhite/40 tracking-wider">© {new Date().getFullYear()} We Travel Nepal. All rights reserved.</div>
        <div className="flex gap-4">

          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png" alt="Stripe" className="h-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"/>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png" alt="PayPal" className="h-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"/>
          {/* Using placeholder text or generic svgs for eSewa/Fonepay since official high-res SVGs are hard to link directly without assets, simulating the trust badge requirement */}
          <div className="h-4 font-sans font-bold text-[10px] uppercase tracking-widest text-pureWhite opacity-50 grayscale hover:grayscale-0 hover:opacity-100 hover:text-green-500 transition-all duration-300 flex items-center">eSewa</div>
          <div className="h-4 font-sans font-bold text-[10px] uppercase tracking-widest text-pureWhite opacity-50 grayscale hover:grayscale-0 hover:opacity-100 hover:text-red-500 transition-all duration-300 flex items-center">Fonepay</div>

        </div>
      </div>
    </footer>
  );
};

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();

    if (!preloaderDone) {
      lenis.stop();
    } else {
      lenis.start();
    }

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, [preloaderDone]);

  return (
    <>
      <GlobalInteractions />
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
      <WhatsAppFloat />

      <div style={{ opacity: preloaderDone ? 1 : 0, transition: 'opacity 0.8s ease-in-out', backgroundColor: '#F8F9FA' }}>
        <Navbar />
        <div className="fixed top-24 right-6 z-40"><CurrencyExchange /></div>
        <main>
          <Hero isReady={preloaderDone} />
          <RecommendationEngine />
          <TrekkingPlanner />
          <SustainabilityBadge />
          <PopularTreks />
          <DynamicItineraryBuilder />
          <TrustFeatures />
          <EquipmentChecklist />
          <ReviewSlider />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;

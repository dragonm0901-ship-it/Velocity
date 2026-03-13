import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import FeaturesBox from './components/FeaturesBox';
import ItineraryPlanner from './components/ItineraryPlanner';
import GearChecker from './components/GearChecker';
import WeatherWidget from './components/WeatherWidget';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Compass from './components/Compass';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhatsAppFloat = () => {
  const handleClick = () => {
    const message = "Hi! I'd like to learn more about your trekking packages in Nepal.";
    window.open(`https://wa.me/9779801234567?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-[80] bg-[#25D366] hover:bg-[#20BD5A] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} />
    </button>
  );
};

const AltitudeProgress = () => {
  useEffect(() => {
    gsap.to('.trail-hiker', {
      y: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });
  }, []);

  return (
    <div className="fixed right-4 top-1/4 bottom-1/4 w-0.5 bg-black/10 dark:bg-white/10 rounded-full z-[80] hidden md:block">
      <div className="trail-hiker absolute top-0 -left-1.5 w-4 h-4 bg-peakGreen rounded-full shadow-[0_0_8px_rgba(22,101,52,0.5)] flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
      </div>
    </div>
  );
};

function App() {
  const [compassOpen, setCompassOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-peakGreen focus:text-white focus:px-4 focus:py-2 focus:rounded">
        Skip to content
      </a>
      <AltitudeProgress />
      <WhatsAppFloat />
      <Navbar onCompassOpen={() => setCompassOpen(true)} />
      <Compass isOpen={compassOpen} onClose={() => setCompassOpen(false)} />
      <main id="main-content">
        <Hero />
        <Destinations />
        <ItineraryPlanner />
        <FeaturesBox />
        <WeatherWidget />
        <GearChecker />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default App;

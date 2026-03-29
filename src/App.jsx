import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import FeaturesBox from './components/FeaturesBox';
import ItineraryPlanner from './components/ItineraryPlanner';
import PermitDashboard from './components/PermitDashboard';
import GearChecker from './components/GearChecker';
import FitnessCalculator from './components/FitnessCalculator';
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

import OfflineDashboard from './components/OfflineDashboard';

const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

const sections = [
  { id: 'hero', label: 'Top' },
  { id: 'destinations', label: 'Treks' },
  { id: 'itinerary-planner', label: 'Planner' },
  { id: 'features', label: 'Features' },
  { id: 'weather-widget', label: 'Weather' },
  { id: 'permit-dashboard', label: 'Permits' },
  { id: 'gear-checker', label: 'Gear' },
  { id: 'fitness-calculator', label: 'Fitness' },
  { id: 'testimonials', label: 'Reviews' }
];

const InteractiveTimeline = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -70% 0px',
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 w-8 z-[80] hidden md:flex flex-col items-center gap-4 py-4">
      {sections.map(({ id, label }, index) => {
        const isActive = activeSection === id;
        return (
          <div key={id} className="relative group w-full flex justify-center">
            {/* Tooltip */}
            <div className={`absolute right-6 top-1/2 -translate-y-1/2 bg-peakDark text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none ${isActive ? 'bg-peakGreen' : ''}`}>
              {label}
            </div>
            
            {/* Dot & Line (Line connects to the previous dot if not the first) */}
            {index > 0 && <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-peakDeep/10 dark:bg-white/10" />}
            
            <button
              onClick={() => scrollToSection(id)}
              className={`w-3 h-3 rounded-full transition-all duration-300 relative z-10 ${isActive ? 'bg-peakGreen scale-150 shadow-[0_0_8px_rgba(22,101,52,0.8)]' : 'bg-peakDeep/20 dark:bg-white/20 hover:bg-peakDeep/40 dark:hover:bg-white/40'}`}
              aria-label={`Scroll to ${label}`}
            />
          </div>
        );
      })}
    </div>
  );
};

function App() {
  const [compassOpen, setCompassOpen] = useState(false);
  const isOnline = useOnlineStatus();

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

  // Return OfflineDashboard early if the user is completely offline.
  if (!isOnline) {
    return <OfflineDashboard />;
  }

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-peakGreen focus:text-white focus:px-4 focus:py-2 focus:rounded">
        Skip to content
      </a>
      <InteractiveTimeline />
      <WhatsAppFloat />
      <Navbar onCompassOpen={() => setCompassOpen(true)} />
      <Compass isOpen={compassOpen} onClose={() => setCompassOpen(false)} />
      <main id="main-content">
        <Hero />
        <Destinations />
        <ItineraryPlanner />
        <FeaturesBox />
        <WeatherWidget />
        <div id="permit-dashboard">
          <PermitDashboard />
        </div>
        <GearChecker />
        <div id="fitness-calculator">
          <FitnessCalculator />
        </div>
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default App;

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSettings } from '../context/SettingsContext';
import { Mountain, ArrowRight, Map, Users } from 'lucide-react';
import TrailMap from './TrailMap';

gsap.registerPlugin(ScrollTrigger);

const crowdData = {
  'Everest Base Camp': { level: 'red', label: 'High Traffic' },
  'Annapurna Circuit': { level: 'yellow', label: 'Moderate Traffic' },
  'Mardi Himal Trek': { level: 'green', label: 'Low Traffic' },
};
const crowdColors = { green: '#16a34a', yellow: '#eab308', red: '#dc2626' };

const Destinations = () => {
  const { t, convertPrice } = useSettings();
  const sectionRef = useRef(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [mapTrek, setMapTrek] = useState('');

  const destinations = [
    {
      id: 1, title: "Everest Base Camp", days: 14, altitude: "5,364m", priceUSD: 1400, difficulty: "Hard",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
      description: "The classic trek to the foot of the world's highest peak. Pass through Sherpa villages, ancient monasteries, and breathtaking mountain vistas."
    },
    {
      id: 2, title: "Annapurna Circuit", days: 18, altitude: "5,416m", priceUSD: 1200, difficulty: "Hard",
      image: "https://images.unsplash.com/photo-1588693959604-db5eec931566?q=80&w=800&auto=format&fit=crop",
      description: "A legendary route circling the Annapurna massif through diverse landscapes—from lush rice paddies to high desert plateaus."
    },
    {
      id: 3, title: "Mardi Himal Trek", days: 7, altitude: "4,500m", priceUSD: 600, difficulty: "Moderate",
      image: "https://images.unsplash.com/photo-1510662145379-13537db782dc?q=80&w=800&auto=format&fit=crop",
      description: "A shorter, off-the-beaten-path trek offering stunning close-up views of Machhapuchhre and the Annapurna range."
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.destination-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleBook = (dest) => {
    const message = `Hi! I'm interested in booking the *${dest.title}* trek (${dest.days} days, ${convertPrice(dest.priceUSD)}). Please share more details.`;
    window.open(`https://wa.me/9779801234567?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      <section id="destinations" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-16 w-full bg-peakWhite dark:bg-peakDark transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-6xl text-peakDeep dark:text-peakWhite mb-4">{t('dest.title')}</h2>
              <p className="font-sans text-peakDeep/60 dark:text-peakWhite/60 max-w-xl text-base md:text-lg">{t('dest.desc')}</p>
            </div>
            <button className="magnetic-btn border border-peakDeep/20 dark:border-peakWhite/20 px-6 py-3 rounded-full font-sans text-sm font-semibold uppercase tracking-widest hover:border-peakGreen hover:text-peakGreen transition-colors bg-transparent shrink-0">
              {t('dest.viewall')}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {destinations.map((dest) => {
              const crowd = crowdData[dest.title];
              return (
                <div key={dest.id} className="destination-card relative h-[480px] md:h-[600px] w-full rounded-2xl overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img src={dest.image} alt={`${dest.title} trekking route in Nepal`}
                      className="dest-image w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>

                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 flex flex-col justify-end">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <span className="bg-peakGreen/90 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">{dest.difficulty}</span>
                        {crowd && (
                          <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white" style={{ background: `${crowdColors[crowd.level]}cc` }}>
                            <Users size={10} /> {crowd.label}
                          </span>
                        )}
                      </div>
                      <span className="text-white/90 font-sans font-medium text-sm">{dest.days} {t('dest.days')}</span>
                    </div>
                    
                    <h3 className="text-white font-display text-2xl md:text-3xl font-bold mb-3">{dest.title}</h3>
                    <p className="text-white/70 font-sans text-sm mb-4 line-clamp-2 group-hover:line-clamp-none transition-all">{dest.description}</p>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-white/80 text-xs font-sans">
                          <Mountain size={14} className="text-peakGreen" />
                          <span>{t('dest.altitude')}: {dest.altitude}</span>
                        </div>
                        <span className="text-white font-bold text-xl font-sans">{convertPrice(dest.priceUSD)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); setMapTrek(dest.title); setMapOpen(true); }}
                          className="bg-white/20 backdrop-blur-sm text-white px-3 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-white/30 transition-all"
                          aria-label={`View ${dest.title} trail map`}
                        >
                          <Map size={14} /> Route
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleBook(dest); }}
                          className="bg-white text-peakDeep px-4 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-peakGreen hover:text-white transition-all"
                        >
                          {t('dest.book')} <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <TrailMap isOpen={mapOpen} onClose={() => setMapOpen(false)} trekName={mapTrek} />
    </>
  );
};

export default Destinations;

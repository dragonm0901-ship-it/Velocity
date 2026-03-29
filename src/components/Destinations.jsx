import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSettings } from '../context/SettingsContext';
import { Mountain, ArrowRight, Map, Users } from 'lucide-react';
import TrailMap from './TrailMap';
import { treks, crowdColors } from '../data/treks';

gsap.registerPlugin(ScrollTrigger);

const Destinations = () => {
  const { t, convertPrice } = useSettings();
  const sectionRef = useRef(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [mapTrek, setMapTrek] = useState('');
  const [viewAll, setViewAll] = useState(false);

  const displayTreks = viewAll ? treks : treks.slice(0, 3);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.destination-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [viewAll]);

  const handleBook = (dest) => {
    const message = `Hi! I'm interested in booking the *${dest.title}* trek (${dest.days} days, ${convertPrice(dest.priceUSD)}). Please share more details.`;
    window.open(`https://wa.me/9779801234567?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <section id="destinations" ref={sectionRef} className="py-24 md:py-32 px-4 sm:px-6 md:px-16 w-full bg-peakWhite dark:bg-peakDark transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-6xl text-peakDeep dark:text-peakWhite mb-4">{t('dest.title')}</h2>
              <p className="font-sans text-peakDeep/60 dark:text-peakWhite/60 max-w-xl text-base md:text-lg">{t('dest.desc')}</p>
            </div>
            <button 
              onClick={() => setViewAll(!viewAll)}
              className="magnetic-btn border border-peakDeep/20 dark:border-peakWhite/20 px-6 py-3 rounded-full font-sans text-sm font-semibold uppercase tracking-widest hover:border-peakGreen hover:text-peakGreen transition-colors bg-transparent shrink-0">
              {viewAll ? 'Show Less' : t('dest.viewall')}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 transition-all">
            {displayTreks.map((dest) => {
              const difficultyColor = dest.difficulty === 'hard' ? 'bg-peakRed' : dest.difficulty === 'moderate' ? 'bg-peakGreen' : 'bg-blue-500';
              return (
                <div key={dest.id} className="destination-card relative h-[480px] md:h-[500px] w-full rounded-2xl overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img src={dest.image} alt={`${dest.name} trekking route in Nepal`}
                      className="dest-image w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>

                  <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col justify-end">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`${difficultyColor}/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full`}>{dest.difficulty}</span>
                        {dest.crowd && (
                          <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white" style={{ background: `${crowdColors[dest.crowd]}cc` }}>
                            <Users size={10} /> Traffic
                          </span>
                        )}
                      </div>
                      <span className="text-white/90 font-sans font-medium text-xs">{dest.days} {t('dest.days')}</span>
                    </div>
                    
                    <h3 className="text-white font-display text-2xl font-bold mb-2">{dest.name}</h3>
                    <p className="text-white/70 font-sans text-xs mb-4 line-clamp-2 group-hover:line-clamp-none transition-all">{dest.description}</p>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-white/80 text-[10px] font-sans">
                          <Mountain size={12} className="text-peakGreen" />
                          <span>{t('dest.altitude')}: {dest.altitude}</span>
                        </div>
                        <span className="text-white font-bold text-lg font-sans">{convertPrice(dest.price)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); setMapTrek(dest.name); setMapOpen(true); }}
                          className="bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-white/30 transition-all"
                          aria-label={`View ${dest.name} trail map`}
                        >
                          <Map size={12} /> Route
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleBook(dest); }}
                          className="bg-white text-peakDeep px-3 py-2 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-peakGreen hover:text-white transition-all"
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

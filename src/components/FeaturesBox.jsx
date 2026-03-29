import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Plane, Wallet, Compass } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

gsap.registerPlugin(ScrollTrigger);

const FeaturesBox = () => {
  const { t } = useSettings();
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.bento-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={containerRef} className="py-24 md:py-32 px-4 sm:px-6 md:px-16 w-full bg-peakWhite dark:bg-peakDark transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-peakDeep dark:text-peakWhite mb-6">
            {t('feat.title')}
          </h2>
          <p className="font-sans text-peakDeep/60 dark:text-peakWhite/60 max-w-2xl mx-auto text-base md:text-lg">
            {t('feat.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:grid-rows-2">
          
          {/* Large Item */}
          <div className="bento-item md:col-span-2 md:row-span-2 bg-gradient-to-br from-white to-gray-50 dark:from-white/5 dark:to-white/[0.02] border border-black/5 dark:border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-between group overflow-hidden relative hover:shadow-lg dark:hover:shadow-peakGreen/5 transition-all duration-300">
            <div className="relative z-10">
              <Plane size={28} className="text-peakGreen mb-6" />
              <h3 className="font-display font-bold text-2xl md:text-3xl mb-4 text-peakDeep dark:text-peakWhite">
                {t('feat.flights')}
              </h3>
              <p className="font-sans text-peakDeep/70 dark:text-peakWhite/70 leading-relaxed max-w-md">
                {t('feat.flights.desc')}
              </p>
            </div>
          </div>

          {/* Medium Item */}
          <div className="bento-item md:col-span-2 bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-3xl p-6 sm:p-8 hover:shadow-lg dark:hover:shadow-peakGreen/5 transition-all duration-300">
            <Wallet size={24} className="text-peakGreen mb-4" />
            <h3 className="font-display font-bold text-xl mb-2 text-peakDeep dark:text-peakWhite">{t('feat.payments')}</h3>
            <p className="font-sans text-peakDeep/70 dark:text-peakWhite/70 text-sm leading-relaxed">
              {t('feat.payments.desc')}
            </p>
          </div>

          {/* Small Item 1 */}
          <div className="bento-item md:col-span-1 bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-3xl p-6 sm:p-8 hover:shadow-lg dark:hover:shadow-peakGreen/5 transition-all duration-300">
            <Shield size={24} className="text-peakGreen mb-4" />
            <h3 className="font-display font-bold text-lg mb-2 text-peakDeep dark:text-peakWhite">{t('feat.permits')}</h3>
            <p className="font-sans text-peakDeep/70 dark:text-peakWhite/70 text-xs leading-relaxed">
              {t('feat.permits.desc')}
            </p>
          </div>

          {/* Small Item 2 */}
          <div className="bento-item md:col-span-1 bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-3xl p-6 sm:p-8 hover:shadow-lg dark:hover:shadow-peakGreen/5 transition-all duration-300">
            <Compass size={24} className="text-peakGreen mb-4" />
            <h3 className="font-display font-bold text-lg mb-2 text-peakDeep dark:text-peakWhite">{t('feat.weather')}</h3>
            <p className="font-sans text-peakDeep/70 dark:text-peakWhite/70 text-xs leading-relaxed">
              {t('feat.weather.desc')}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesBox;

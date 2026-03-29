import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { ArrowRight, MessageCircle } from 'lucide-react';

const CTA = () => {
  const { t } = useSettings();

  const handleWhatsApp = () => {
    const message = "Hi! I'd like to plan a trek in Nepal. Can you help me get started?";
    window.open(`https://wa.me/9779801234567?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-16 w-full bg-peakWhite dark:bg-peakDark transition-colors">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display font-bold text-3xl md:text-6xl text-peakDeep dark:text-peakWhite mb-6">
          {t('cta.title')}
        </h2>
        <p className="font-sans text-peakDeep/60 dark:text-peakWhite/60 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
          {t('cta.desc')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#destinations"
            className="magnetic-btn bg-peakGreen hover:bg-peakGreen/90 text-white px-8 py-4 rounded-full font-sans uppercase tracking-widest font-bold text-sm flex items-center justify-center gap-3 hover-lift shadow-[0_10px_40px_-10px_rgba(22,101,52,0.4)] transition-all"
          >
            <span className="relative z-10">{t('cta.btn')}</span>
            <ArrowRight size={18} className="relative z-10" />
          </a>
          <button 
            onClick={handleWhatsApp}
            className="border-2 border-peakGreen text-peakGreen hover:bg-peakGreen hover:text-white px-8 py-4 rounded-full font-sans uppercase tracking-widest font-bold text-sm flex items-center justify-center gap-3 transition-all"
          >
            <MessageCircle size={18} />
            <span>{t('cta.whatsapp')}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;

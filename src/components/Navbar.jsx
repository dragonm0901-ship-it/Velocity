import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('EN');
  const [showSettings, setShowSettings] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: {
          className: 'bg-pureWhite/90 backdrop-blur-xl border border-richBlue/10 shadow-lg text-richBlue',
          targets: navRef.current
        },
        onToggle: (self) => {
          if (self.isActive) {
            gsap.to(navRef.current.querySelectorAll('.nav-link, .brand-text'), { color: '#0F52BA', duration: 0.3 }); // richBlue
          } else {
            gsap.to(navRef.current.querySelectorAll('.nav-link, .brand-text'), { color: '#FFFFFF', duration: 0.3 }); // pureWhite
          }
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 w-full">
      <nav ref={navRef} className="flex items-center justify-between px-4 py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 w-full max-w-5xl text-pureWhite relative">
        <div className="font-drama text-xl md:text-2xl brand-text tracking-widest italic font-bold">We Travel Nepal</div>

        <div className={`${isMobileMenuOpen ? 'flex absolute top-full left-0 right-0 bg-pureWhite/95 backdrop-blur-xl border border-richBlue/10 shadow-lg p-6 flex-col mt-2 rounded-2xl text-richBlue' : 'hidden'} md:flex md:relative md:top-auto md:left-auto md:right-auto md:bg-transparent md:border-none md:shadow-none md:p-0 md:flex-row md:mt-0 md:rounded-none gap-6 md:gap-8 items-center font-sans uppercase tracking-widest text-xs font-semibold`}>
          <a href="#planner" className={`nav-link hover-lift hover:text-forestGreen transition-colors ${isMobileMenuOpen ? 'text-richBlue' : ''}`}>Planner</a>
          <a href="#treks" className={`nav-link hover-lift hover:text-forestGreen transition-colors ${isMobileMenuOpen ? 'text-richBlue' : ''}`}>Treks & Tours</a>
          <a href="#about" className={`nav-link hover-lift hover:text-forestGreen transition-colors ${isMobileMenuOpen ? 'text-richBlue' : ''}`}>About</a>

          {/* Mobile settings & Book Now */}
          <div className="md:hidden flex flex-col items-center gap-4 mt-2 w-full border-t border-richBlue/10 pt-4">
            <div className="flex justify-center gap-4 w-full">
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-offWhite text-richBlue px-3 py-2 rounded-lg outline-none font-bold">
                {['EN', 'FR', 'DE', 'ZH'].map(lang => <option key={lang} value={lang}>{lang}</option>)}
              </select>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="bg-offWhite text-richBlue px-3 py-2 rounded-lg outline-none font-bold">
                {['USD', 'EUR', 'NPR'].map(curr => <option key={curr} value={curr}>{curr}</option>)}
              </select>
            </div>
            <button className="w-full bg-forestGreen text-pureWhite px-6 py-3 rounded-full font-sans uppercase tracking-widest text-xs font-semibold hover:bg-forestGreen/90 transition-colors shadow-md">
              Book Now
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Settings Toggle (Currency & Language) */}
          <div className="relative hidden md:block">
             <button
               onClick={() => setShowSettings(!showSettings)}
               className="nav-link hover-lift flex items-center gap-1 font-sans text-xs uppercase tracking-widest font-semibold"
             >
               {language} | {currency}
               <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
             </button>

             {/* Dropdown Menu */}
             {showSettings && (
               <div className="absolute top-full right-0 mt-4 bg-pureWhite text-richBlue rounded-xl shadow-2xl p-4 w-48 border border-richBlue/10 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                     <span className="font-sans text-[10px] text-richBlue/50 uppercase tracking-widest font-bold border-b border-richBlue/10 pb-1">Currency</span>
                     <div className="flex gap-2 font-sans text-xs">
                       {['USD', 'EUR', 'NPR'].map(curr => (
                         <button
                          key={curr}
                          onClick={() => setCurrency(curr)}
                          className={`px-2 py-1 rounded transition-colors ${currency === curr ? 'bg-softRed/20 text-softRed font-bold' : 'hover:bg-offWhite'}`}
                         >
                           {curr}
                         </button>
                       ))}
                     </div>
                  </div>
                  <div className="flex flex-col gap-2">
                     <span className="font-sans text-[10px] text-richBlue/50 uppercase tracking-widest font-bold border-b border-richBlue/10 pb-1">Language</span>
                     <div className="flex gap-2 font-sans text-xs">
                       {['EN', 'FR', 'DE', 'ZH'].map(lang => (
                         <button
                          key={lang}
                          onClick={() => setLanguage(lang)}
                          className={`px-2 py-1 rounded transition-colors ${language === lang ? 'bg-softRed/20 text-softRed font-bold' : 'hover:bg-offWhite'}`}
                         >
                           {lang}
                         </button>
                       ))}
                     </div>
                  </div>
               </div>
             )}
          </div>

          <button className="hidden md:block magnetic-btn bg-forestGreen text-pureWhite px-6 py-2 rounded-full font-sans uppercase tracking-widest text-xs font-semibold hover:bg-forestGreen/90 transition-colors shadow-md">
            <span className="relative z-10">Book Now</span>
          </button>
          <button className="md:hidden nav-link p-2 z-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

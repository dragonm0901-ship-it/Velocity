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
        <div className="font-sans text-xl md:text-2xl brand-text tracking-widest italic font-bold">We Travel Nepal</div>

        <div className="hidden md:flex gap-8 items-center font-sans uppercase tracking-widest text-xs font-semibold">
          <a href="#planner" className="nav-link hover-lift hover:text-softRed transition-colors">Planner</a>
          <a href="#treks" className="nav-link hover-lift hover:text-softRed transition-colors">Treks & Tours</a>
          <a href="#about" className="nav-link hover-lift hover:text-softRed transition-colors">About</a>
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

<button className="hidden md:block magnetic-btn bg-softRed text-pureWhite px-6 py-2 rounded-full font-sans uppercase tracking-widest text-xs font-semibold hover:bg-softRed/90 transition-colors shadow-md">
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

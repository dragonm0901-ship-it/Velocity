import React, { useRef, useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);
  const { currency, setCurrency, language, setLanguage, theme, setTheme } = useAppContext();
  const [showSettings, setShowSettings] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

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
      {/* Book Now Modal */}
      {isBookModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-richBlue/80 backdrop-blur-sm p-4">
          <div className="bg-pureWhite p-8 rounded-3xl max-w-md w-full relative">
            <button onClick={() => setIsBookModalOpen(false)} className="absolute top-4 right-4 text-richBlue/50 hover:text-richBlue">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-3xl font-sans font-bold text-richBlue mb-4">Start Your Journey</h2>
            <p className="text-richBlue/70 mb-6 font-sans">Leave your details and our local experts will contact you within 24 hours.</p>
            <form className="flex flex-col gap-4">
              <input type="text" placeholder="Full Name" className="p-3 border border-richBlue/20 rounded-xl outline-none focus:border-softRed font-sans" />
              <input type="email" placeholder="Email Address" className="p-3 border border-richBlue/20 rounded-xl outline-none focus:border-softRed font-sans" />
              <input type="tel" placeholder="Phone Number" className="p-3 border border-richBlue/20 rounded-xl outline-none focus:border-softRed font-sans" />
              <button type="submit" onClick={(e) => { e.preventDefault(); setIsBookModalOpen(false); alert('Inquiry Sent! We will contact you soon.'); }} className="mt-4 bg-softRed text-pureWhite py-3 rounded-xl font-sans font-bold uppercase tracking-widest hover:bg-softRed/90 transition-colors">
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      )}

<nav ref={navRef} className="flex items-center justify-between px-4 py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 w-full max-w-5xl text-pureWhite relative">
        <div className="font-sans text-xl md:text-2xl brand-text tracking-widest italic font-bold">We Travel Nepal</div>

        <div className="hidden md:flex gap-8 items-center font-sans uppercase tracking-widest text-xs font-semibold">
          <a href="#planner" className="nav-link hover-lift hover:text-softRed transition-colors">Planner</a>
          <a href="#treks" className="nav-link hover-lift hover:text-softRed transition-colors">Treks & Tours</a>
          <a href="#about" className="nav-link hover-lift hover:text-softRed transition-colors">About</a>
        </div>

        <div className="flex items-center gap-2 md:gap-4">

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="nav-link p-2 hover-lift relative w-8 h-8 flex items-center justify-center overflow-hidden"
          >
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 transform ${theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-180 scale-50 opacity-0'}`}>
              {/* Sun SVG */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 transform ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-50 opacity-0'}`}>
              {/* Cloud SVG */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
            </div>
          </button>

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

<button onClick={() => setIsBookModalOpen(true)} className="magnetic-btn bg-softRed text-pureWhite px-4 py-1.5 md:px-6 md:py-2 rounded-full font-sans uppercase tracking-widest text-[10px] md:text-xs font-semibold hover:bg-softRed/90 transition-colors shadow-md mr-2 md:mr-0">
            <span className="relative z-10">Book Now</span>
          </button>
          <button className="md:hidden nav-link p-2 z-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-4 bg-pureWhite/95 backdrop-blur-xl text-richBlue rounded-3xl shadow-2xl p-6 border border-richBlue/10 flex flex-col gap-6 md:hidden">
          <div className="flex flex-col gap-4 font-sans uppercase tracking-widest text-sm font-semibold">
            <a href="#planner" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-softRed transition-colors border-b border-richBlue/10 pb-4">Planner</a>
            <a href="#treks" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-softRed transition-colors border-b border-richBlue/10 pb-4">Treks & Tours</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-softRed transition-colors border-b border-richBlue/10 pb-4">About</a>
          </div>

          <div className="flex justify-between items-center border-b border-richBlue/10 pb-4">
             <span className="font-sans text-xs uppercase tracking-widest text-richBlue/50 font-bold">Language</span>
             <div className="flex gap-2 font-sans text-xs">
               {['EN', 'FR', 'DE', 'ZH'].map(lang => (
                 <button key={lang} onClick={() => { setLanguage(lang); setIsMobileMenuOpen(false); }} className={`px-3 py-1.5 rounded-full transition-colors ${language === lang ? 'bg-softRed/20 text-softRed font-bold' : 'bg-offWhite'}`}>
                   {lang}
                 </button>
               ))}
             </div>
          </div>

          <div className="flex justify-between items-center pb-2">
             <span className="font-sans text-xs uppercase tracking-widest text-richBlue/50 font-bold">Currency</span>
             <div className="flex gap-2 font-sans text-xs">
               {['USD', 'EUR', 'NPR'].map(curr => (
                 <button key={curr} onClick={() => { setCurrency(curr); setIsMobileMenuOpen(false); }} className={`px-3 py-1.5 rounded-full transition-colors ${currency === curr ? 'bg-softRed/20 text-softRed font-bold' : 'bg-offWhite'}`}>
                   {curr}
                 </button>
               ))}
             </div>
          </div>
        </div>
      )}

      </nav>
    </div>
  );
};

export default Navbar;

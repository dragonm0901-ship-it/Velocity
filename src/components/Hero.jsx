import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const Hero = ({ isReady }) => {
  const heroRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!isReady) return;

    let ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-el',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 2, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, [isReady]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Simulate ElasticSearch suggestions
    if (value.length > 0) {
      const allSuggestions = ['Everest Base Camp', 'Pokhara', 'Annapurna Circuit', 'Helicopter Tour', 'Langtang Valley'];
      const filtered = allSuggestions.filter(s => s.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-richBlue">
         {/* Using an image placeholder as a reliable video URL isn't available, but keeping the structure for a video */}
        <img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop"
          alt="Himalayas"
          className="w-full h-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-richBlue/90 via-richBlue/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl px-4 md:px-8 flex flex-col items-center text-center mt-24 md:mt-20">
        <h1 className="hero-el text-pureWhite font-sans font-bold text-5xl md:text-7xl tracking-wide uppercase mb-4">
          Find your Adventure
        </h1>
        <p className="hero-el text-offWhite font-sans text-lg md:text-xl mb-12 max-w-2xl">
          Discover the top-class Nepalese trekking experiences, dynamic planning, and real-time booking.
        </p>

        {/* Search Bar (ElasticSearch Simulation) */}
        <div className="hero-el w-full max-w-2xl relative">
          <div className="relative flex items-center bg-pureWhite rounded-full shadow-lg overflow-hidden border-2 border-transparent focus-within:border-softRed transition-colors">
            <svg className="w-6 h-6 ml-6 text-richBlue/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              placeholder="Search 'Everest', 'Pokhara', or 'Helicopter'..."
              className="w-full py-3 px-4 md:py-5 text-richBlue font-sans outline-none bg-transparent"
              value={searchTerm}
              onChange={handleSearchChange}
            />
<button className="bg-softRed text-pureWhite px-6 py-3 md:px-8 md:py-5 font-sans font-semibold uppercase tracking-wider hover:bg-softRed/90 transition-colors">
            <button className="bg-forestGreen text-pureWhite px-6 py-3 md:px-8 md:py-5 font-sans font-semibold uppercase tracking-wider hover:bg-forestGreen/90 transition-colors">
              Search
            </button>
          </div>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-pureWhite rounded-xl shadow-xl overflow-hidden z-20 text-left">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-6 py-4 hover:bg-offWhite cursor-pointer font-sans text-richBlue border-b border-offWhite last:border-b-0 flex items-center gap-3"
                  onClick={() => {
                    setSearchTerm(suggestion);
                    setSuggestions([]);
                  }}
                >
                  <svg className="w-4 h-4 text-softRed" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;

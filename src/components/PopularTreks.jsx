import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Treks = [
  {
    id: 1,
    title: "Everest Base Camp",
    duration: "14 Days",
    difficulty: "Hard",
    price: "$1,400",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop", // Assuming "Cinematic wide shot of Mt. Everest at sunrise, orange glow on snow-capped peaks, colorful prayer flags in foreground, 8k resolution, National Geographic style."
    altitude: "5,364m",
    weather: "-5°C, Clear",
    status: "Open"
  },
  {
    id: 2,
    title: "Annapurna Circuit",
    duration: "16 Days",
    difficulty: "Hard",
    price: "$1,200",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop", // "Golden Hour", "Cinematic Lighting", "Wide Angle"
    altitude: "5,416m",
    weather: "-2°C, Snow",
    status: "Clear"
  },
  {
    id: 3,
    title: "Phewa Lake Pokhara",
    duration: "5 Days",
    difficulty: "Easy",
    price: "$450",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop", // "Aerial drone view of Phewa Lake Pokhara, reflection of Machhapuchhre (Fishtail) mountain on calm water, colorful wooden boats, morning mist, hyper-realistic."
    altitude: "822m",
    weather: "22°C, Sunny",
    status: "Open"
  },
  {
    id: 4,
    title: "Upper Mustang",
    duration: "15 Days",
    difficulty: "Moderate",
    price: "$1,800",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop", // "Red desert cliffs of Upper Mustang, ancient mud-brick village of Lo Manthang, harsh sunlight creating deep shadows, nomadic landscape, cinematic 35mm lens."
    altitude: "3,840m",
    weather: "10°C, Windy",
    status: "Open"
  },
  {
    id: 5,
    title: "Rara Lake (Far West)",
    duration: "9 Days",
    difficulty: "Moderate",
    price: "$1,100",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop", // Off the Grid trend
    altitude: "2,990m",
    weather: "15°C, Clear",
    status: "Open"
  },
  {
    id: 6,
    title: "Kathmandu Durbar Heritage",
    duration: "1 Day",
    difficulty: "Easy",
    price: "$50",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop", // "Close up of intricate wood carvings at Bhaktapur Durbar Square, warm evening sunlight, local devotees in traditional dress, blurred background, heritage photography."
    altitude: "1,400m",
    weather: "25°C, Sunny",
    status: "Open"
  }
];

const PopularTreks = () => {
  const containerRef = useRef(null);
  const [bookingState, setBookingState] = useState({});

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.trek-card');

      cards.forEach((card) => {
        gsap.fromTo(card,
          { clipPath: 'inset(100% 0 0 0)', scale: 1.1 },
          {
            clipPath: 'inset(0% 0 0 0)',
            scale: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleBook = (id) => {
    setBookingState(prev => ({ ...prev, [id]: 'loading' }));

    // Simulate API call to lock slot
    setTimeout(() => {
      setBookingState(prev => ({ ...prev, [id]: 'locked' }));

      // Reset after 3 seconds to simulate redirect
      setTimeout(() => {
        setBookingState(prev => ({ ...prev, [id]: null }));
        // alert('Redirecting to Payment Gateway...');
      }, 3000);
    }, 1500);
  };

  return (
    <section id="treks" ref={containerRef} className="py-24 bg-pureWhite relative z-10 w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <h2 className="text-softRed text-xs font-sans font-bold uppercase tracking-[0.3em] mb-4">Nepal 2.0</h2>
            <h3 className="text-4xl font-display md:text-6xl font-display font-sans text-richBlue font-bold tracking-tight">Expand Your Horizon</h3>
          </div>
          <p className="max-w-md text-sm font-sans text-richBlue/70 leading-relaxed uppercase tracking-widest">
            From the classic "Big Three" to off-the-grid trends in the Far West and spiritual paths in Lumbini.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Treks.map((trek) => (
            <div key={trek.id} className="trek-card group relative rounded-[2rem] overflow-hidden bg-offWhite border border-richBlue/5 hover:border-richBlue/20 transition-all duration-500 hover:shadow-2xl">
              {/* Image Container */}
              <div className="relative h-[300px] w-full overflow-hidden">
                <img
                  src={trek.image}
                  alt={trek.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Live Widgets Overlay */}
                <div className="absolute top-4 left-4 right-4 flex justify-between">
                  <div className="bg-pureWhite/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                    <svg className="w-3 h-3 text-richBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    <span className="text-[10px] font-sans font-bold text-richBlue">{trek.altitude}</span>
                  </div>
                  <div className="bg-pureWhite/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                    <svg className="w-3 h-3 text-softRed" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
                    <span className="text-[10px] font-sans font-bold text-richBlue">{trek.weather}</span>
                  </div>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-5 md:p-8 relative bg-pureWhite">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-sans font-bold text-richBlue uppercase tracking-wide">{trek.title}</h4>
                  <span className="text-softRed font-bold text-xl">{trek.price}</span>
                </div>

                <div className="flex gap-4 mb-8">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-richBlue/50 uppercase tracking-widest font-bold">Duration</span>
                    <span className="text-sm font-sans text-richBlue font-semibold">{trek.duration}</span>
                  </div>
                  <div className="w-[1px] bg-richBlue/10"></div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-richBlue/50 uppercase tracking-widest font-bold">Difficulty</span>
                    <span className="text-sm font-sans text-richBlue font-semibold">{trek.difficulty}</span>
                  </div>
                </div>

                {/* Interactive Booking Button */}
                <button
                  onClick={() => handleBook(trek.id)}
                  disabled={bookingState[trek.id] === 'locked' || bookingState[trek.id] === 'loading'}
                  className={`w-full py-4 rounded-full font-sans uppercase tracking-widest text-xs font-bold transition-all flex items-center justify-center gap-2
                    ${bookingState[trek.id] === 'locked'
                      ? 'bg-softRed/10 text-softRed border border-softRed/20'
                      : bookingState[trek.id] === 'loading'
                        ? 'bg-richBlue/10 text-richBlue border border-richBlue/10'
                        : 'bg-richBlue text-pureWhite hover:bg-richBlue/90 shadow-md'
                    }
                  `}
                >
                  {bookingState[trek.id] === 'locked' ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      Slot Locked (10:00)
                    </>
                  ) : bookingState[trek.id] === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-richBlue/30 border-t-richBlue rounded-full animate-spin"></div>
                      Checking...
                    </>
                  ) : (
                    <>
                      Book Real-Time
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularTreks;

import React, { useState, useEffect } from 'react';

const Reviews = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    country: 'United Kingdom',
    rating: 5,
    text: 'The Everest Base Camp trek was beyond words. The real-time weather updates from the agency were a lifesaver!',
    platform: 'Google Reviews'
  },
  {
    id: 2,
    name: 'Michael Chen',
    country: 'Singapore',
    rating: 5,
    text: 'Flawless booking experience. Locked my slot in minutes and the payment via Stripe was seamless. Highly recommend their services.',
    platform: 'TripAdvisor'
  },
  {
    id: 3,
    name: 'Elena Rossi',
    country: 'Italy',
    rating: 5,
    text: 'Absolutely stunning Annapurna circuit. The guides were knowledgeable and the multi-lingual support on the app was incredibly helpful.',
    platform: 'Google Reviews'
  }
];

const ReviewSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Reviews.length);
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-richBlue relative overflow-hidden flex justify-center items-center w-full px-8">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none flex justify-center items-center">
        <svg className="w-[120%] h-[120%] text-pureWhite" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="0,100 100,0 100,100" />
        </svg>
      </div>

      <div className="w-full max-w-4xl relative z-10 flex flex-col items-center">
        <h2 className="font-drama text-4xl md:text-5xl text-pureWhite mb-12 italic text-center">Traveler Experiences</h2>

        <div className="relative w-full min-h-[300px] flex items-center justify-center">
          {Reviews.map((review, index) => (
            <div
              key={review.id}
              className={`absolute top-0 w-full transition-all duration-1000 ease-in-out transform ${
                index === currentIndex
                  ? 'opacity-100 translate-x-0 scale-100'
                  : index < currentIndex
                    ? 'opacity-0 -translate-x-full scale-95'
                    : 'opacity-0 translate-x-full scale-95'
              }`}
            >
              <div className="bg-pureWhite p-10 md:p-14 rounded-3xl shadow-2xl flex flex-col items-center text-center max-w-3xl mx-auto">
                <div className="flex text-forestGreen mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="font-sans text-lg md:text-2xl text-richBlue mb-8 italic leading-relaxed">
                  "{review.text}"
                </p>
                <div className="flex flex-col items-center gap-2">
                  <h4 className="font-sans font-bold text-richBlue uppercase tracking-wider">{review.name}</h4>
                  <span className="font-sans text-sm text-richBlue/60 uppercase">{review.country}</span>
                  <div className="mt-4 px-4 py-1 bg-offWhite rounded-full text-xs text-richBlue font-semibold uppercase tracking-widest border border-richBlue/10 flex items-center gap-2 shadow-sm">
                    <svg className="w-3 h-3 text-softRed" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9V5a1 1 0 112 0v4a1 1 0 11-2 0zm0 4v-2a1 1 0 112 0v2a1 1 0 11-2 0z" clipRule="evenodd" /></svg>
                    Verified via {review.platform}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-4 mt-12 z-20">
          {Reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-forestGreen scale-150' : 'bg-pureWhite/30 hover:bg-pureWhite/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSlider;

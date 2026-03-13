import React, { useState } from 'react';

const Treks = [
  {
    id: 1,
    name: 'Everest Base Camp',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop',
    altitude: '5,364m',
    weather: '-5°C',
    duration: '14 Days',
    price: '$1,299'
  },
  {
    id: 2,
    name: 'Annapurna Circuit',
    image: 'https://images.unsplash.com/photo-1506462945848-ac8ea6f609cc?q=80&w=800&auto=format&fit=crop',
    altitude: '5,416m',
    weather: '-2°C',
    duration: '16 Days',
    price: '$1,099'
  },
  {
    id: 3,
    name: 'Mardi Himal Trek',
    image: 'https://images.unsplash.com/photo-1585016495481-91613a3ab1bc?q=80&w=800&auto=format&fit=crop',
    altitude: '4,500m',
    weather: '2°C',
    duration: '7 Days',
    price: '$699'
  }
];

const PopularTreks = () => {
  const [bookingState, setBookingState] = useState(null); // { id: 1, status: 'locking' | 'locked' }

  const handleBooking = (id) => {
    setBookingState({ id, status: 'locking' });

    // Simulate API call to lock slot
    setTimeout(() => {
      setBookingState({ id, status: 'locked' });
      // In a real app, redirect to payment gateway here
      setTimeout(() => setBookingState(null), 3000); // Reset for demo purposes
    }, 1500);
  };

  return (
    <section id="treks" className="py-32 px-8 w-full bg-pureWhite flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-drama text-5xl md:text-6xl text-richBlue mb-4 italic">Iconic Expeditions</h2>
          <p className="font-sans text-richBlue/60 uppercase tracking-widest text-sm max-w-2xl mx-auto">
            Real-time availability, dynamic pricing, and immediate booking for the most sought-after trails.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {Treks.map((trek) => (
            <div key={trek.id} className="group rounded-3xl overflow-hidden bg-offWhite border border-richBlue/10 shadow-lg hover:shadow-2xl transition-all duration-500">

              {/* Image & Widgets */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={trek.image}
                  alt={trek.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-richBlue/80 via-transparent to-transparent"></div>

                {/* Live Widgets Overlay */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="bg-pureWhite/90 backdrop-blur-sm text-richBlue px-3 py-1.5 rounded-full font-sans text-xs font-bold flex items-center gap-1 shadow-md">
                    <svg className="w-3 h-3 text-forestGreen" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9V5a1 1 0 112 0v4a1 1 0 11-2 0zm0 4v-2a1 1 0 112 0v2a1 1 0 11-2 0z" clipRule="evenodd" /></svg>
                    Live
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                   <div className="flex flex-col gap-1 text-pureWhite font-sans">
                     <span className="text-xs uppercase tracking-wider opacity-80 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" /></svg>
                        {trek.altitude}
                     </span>
                     <span className="text-xs uppercase tracking-wider opacity-80 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
                        {trek.weather} (Current)
                     </span>
                   </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="font-drama text-3xl text-richBlue mb-2 italic">{trek.name}</h3>

                <div className="flex justify-between items-center mb-8 pb-6 border-b border-richBlue/10">
                  <div className="flex flex-col">
                    <span className="font-sans text-xs text-richBlue/50 uppercase tracking-wider">Duration</span>
                    <span className="font-sans font-bold text-richBlue">{trek.duration}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="font-sans text-xs text-richBlue/50 uppercase tracking-wider">From</span>
                    <span className="font-sans font-bold text-forestGreen text-lg">{trek.price}</span>
                  </div>
                </div>

                {/* Booking Logic */}
                <button
                  onClick={() => handleBooking(trek.id)}
                  disabled={bookingState?.id === trek.id}
                  className={`w-full py-4 rounded-full font-sans font-bold uppercase tracking-widest text-sm transition-all flex justify-center items-center gap-2 ${
                    bookingState?.id === trek.id
                      ? bookingState.status === 'locking'
                        ? 'bg-softRed/20 text-softRed cursor-not-allowed'
                        : 'bg-forestGreen text-pureWhite'
                      : 'bg-softRed text-pureWhite hover:bg-softRed/90 hover:shadow-lg hover:-translate-y-1'
                  }`}
                >
                  {bookingState?.id === trek.id ? (
                    bookingState.status === 'locking' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-softRed" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Checking Availability...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Slot Locked (10:00)
                      </>
                    )
                  ) : (
                    'Book Trek'
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

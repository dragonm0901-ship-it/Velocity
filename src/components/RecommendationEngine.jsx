import React, { useState } from 'react';

const RecommendationEngine = () => {
  // Simulate detecting user behavior on initial render
  const [userProfile] = useState(() => {
    const profiles = ['explorer', 'luxury', 'adrenaline'];
    return profiles[Math.floor(Math.random() * profiles.length)];
  });

  const getRecommendation = () => {
    switch (userProfile) {
      case 'luxury':
        return {
          title: "Helicopter to Everest Base Camp",
          desc: "For those who prefer a swift, luxurious journey above the clouds.",
          img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop",
          price: "$4,500",
          tag: "Luxury Pick"
        };
      case 'adrenaline':
        return {
          title: "Bungee at Kusma",
          desc: "Drop into the deep gorge of the Kaligandaki river. The highest bungee in Nepal.",
          img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop",
          price: "$120",
          tag: "Adrenaline Junkie"
        };
      case 'explorer':
      default:
        return {
          title: "Upper Mustang Trek",
          desc: "Wander through the ancient forbidden kingdom of Lo Manthang.",
          img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop",
          price: "$1,800",
          tag: "Off the Grid"
        };
    }
  };

  const rec = getRecommendation();

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 p-6 bg-pureWhite rounded-3xl shadow-lg border border-richBlue/10 flex flex-col md:flex-row gap-8 items-center">
      <div className="w-full md:w-1/3 relative h-48 rounded-2xl overflow-hidden shadow-inner">
        <img src={rec.img} alt={rec.title} className="w-full h-full object-cover"/>
        <div className="absolute top-2 left-2 bg-softRed text-pureWhite px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-md">
          {rec.tag}
        </div>
      </div>
      <div className="w-full md:w-2/3 flex flex-col">
        <h3 className="text-richBlue text-xs font-bold uppercase tracking-widest mb-2 opacity-50">AI Recommendation For You</h3>
        <h4 className="text-richBlue text-2xl font-bold font-sans mb-2">{rec.title}</h4>
        <p className="text-richBlue/70 text-sm mb-6">{rec.desc}</p>
        <div className="flex items-center justify-between">
          <span className="text-softRed font-bold text-xl">{rec.price}</span>
          <button className="magnetic-btn bg-softRed text-pureWhite px-6 py-2 rounded-full font-sans uppercase tracking-widest text-xs font-semibold hover:bg-softRed/90 transition-colors shadow-md">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationEngine;

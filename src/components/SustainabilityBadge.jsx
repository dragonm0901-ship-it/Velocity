import React from 'react';

const SustainabilityBadge = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-softRed/5 rounded-2xl border border-softRed/20 mt-8 mb-4 max-w-4xl mx-auto font-sans shadow-sm">
      <div className="flex items-center gap-4">
        <div className="bg-softRed/10 p-3 rounded-full text-softRed shadow-inner">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        </div>
        <div>
          <h4 className="text-richBlue font-bold text-lg mb-1">Regenerative Tourism</h4>
          <p className="text-richBlue/60 text-xs max-w-sm">We track the carbon footprint of every trip. Help us offset your trek by donating to local Nepalese reforestation projects.</p>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-4 md:mt-0 bg-pureWhite px-4 py-2 rounded-xl shadow-sm border border-richBlue/10">
        <input type="checkbox" id="offset" className="w-5 h-5 text-softRed rounded focus:ring-softRed focus:ring-2 accent-softRed cursor-pointer" />
        <label htmlFor="offset" className="text-sm font-bold text-richBlue cursor-pointer uppercase tracking-widest text-[10px]">
          Offset Trek (+$25)
        </label>
      </div>
    </div>
  );
};

export default SustainabilityBadge;

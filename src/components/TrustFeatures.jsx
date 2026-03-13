import React from 'react';

const TrustFeatures = () => {
  const guides = [
    { id: 1, name: "Karma Sherpa", cert: "NATHM Certified", lang: "EN, FR, ZH", img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=150&h=150&fit=crop" },
    { id: 2, name: "Pemba Lama", cert: "Wilderness First Aid", lang: "EN, DE", img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=150&h=150&fit=crop" }
  ];

  return (
    <div className="w-full bg-pureWhite py-16 font-sans">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Verified Local Guides */}
        <div>
          <h3 className="text-2xl font-bold text-richBlue mb-6 border-b border-richBlue/10 pb-4">Verified Local Guides</h3>
          <div className="flex flex-col gap-4">
            {guides.map(guide => (
              <div key={guide.id} className="flex items-center gap-4 bg-offWhite p-4 rounded-2xl border border-richBlue/5 hover:border-softRed/30 transition-colors group">
                <img src={guide.img} alt={guide.name} className="w-16 h-16 rounded-full object-cover border-2 border-pureWhite shadow-sm group-hover:border-softRed transition-colors" />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-richBlue text-lg">{guide.name}</h4>
                    <span className="bg-softRed/10 text-softRed px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      Verified
                    </span>
                  </div>
                  <div className="flex gap-3 text-xs text-richBlue/60">
                    <span className="flex items-center gap-1"><svg className="w-3 h-3 text-softRed" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{guide.cert}</span>
                    <span className="flex items-center gap-1"><svg className="w-3 h-3 text-richBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>{guide.lang}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Trek Status */}
        <div>
          <h3 className="text-2xl font-bold text-richBlue mb-6 border-b border-richBlue/10 pb-4">Live Trek Status</h3>
          <div className="bg-richBlue text-pureWhite rounded-2xl p-6 shadow-lg border border-pureWhite/10">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs uppercase tracking-widest font-bold opacity-60">Region</span>
              <span className="text-xs uppercase tracking-widest font-bold opacity-60">Status</span>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-pureWhite/10 pb-4">
                <span className="font-semibold text-sm">Everest Region</span>
                <span className="bg-softRed/20 text-softRed px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <div className="w-2 h-2 bg-softRed rounded-full animate-pulse"></div> Open
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-pureWhite/10 pb-4">
                <span className="font-semibold text-sm">Thorong La Pass</span>
                <span className="bg-pureWhite/10 text-pureWhite px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <div className="w-2 h-2 bg-pureWhite rounded-full"></div> Clear
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm">Lukla Flights</span>
                <span className="bg-softRed/20 text-softRed px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <div className="w-2 h-2 bg-softRed rounded-full animate-pulse"></div> Delayed (Weather)
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TrustFeatures;

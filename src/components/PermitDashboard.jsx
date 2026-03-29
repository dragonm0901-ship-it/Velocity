import React, { useState } from 'react';
import { Plane, Info, CheckCircle, CreditCard, ExternalLink, Calendar, MapPin, AlertCircle } from 'lucide-react';

const PermitDashboard = () => {
  const [activeTab, setActiveTab] = useState('visas');

  // Simulated status for Lukla flights (changes based on the season in real life)
  const isPeakSeason = true;

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-16 w-full bg-gray-50 dark:bg-peakDeep/80 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-peakGreen/10 text-peakGreen rounded-2xl mb-6">
            <CreditCard size={32} />
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-peakDeep dark:text-peakWhite mb-6">
            Nepal Travel & Permits Hub
          </h2>
          <p className="font-sans text-peakDeep/60 dark:text-peakWhite/60 text-base md:text-lg max-w-2xl mx-auto">
            Everything you need to know about Visas, Permits, and current flight routings to the mountains. Avoid surprises at the airport!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left: Interactive Info Let Tabs */}
          <div className="flex-1 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-5 sm:p-6 md:p-8 shadow-sm">
            
            <div className="flex bg-black/5 dark:bg-white/10 rounded-xl p-1 mb-8 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setActiveTab('visas')}
                className={`flex-1 min-w-[120px] px-4 py-3 rounded-lg font-sans text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'visas' ? 'bg-white dark:bg-peakDeep text-peakDeep dark:text-peakWhite shadow-sm' : 'text-peakDeep/50 dark:text-peakWhite/50 hover:text-peakDeep dark:hover:text-peakWhite'}`}
              >
                <Calendar size={16} /> Visa on Arrival
              </button>
              <button 
                onClick={() => setActiveTab('permits')}
                className={`flex-1 min-w-[120px] px-4 py-3 rounded-lg font-sans text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'permits' ? 'bg-white dark:bg-peakDeep text-peakDeep dark:text-peakWhite shadow-sm' : 'text-peakDeep/50 dark:text-peakWhite/50 hover:text-peakDeep dark:hover:text-peakWhite'}`}
              >
                <MapPin size={16} /> Trek Permits
              </button>
            </div>

            {activeTab === 'visas' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <h3 className="font-display font-bold text-xl text-peakDeep dark:text-peakWhite mb-4">Tourist Visa Fees (2026/27)</h3>
                <p className="font-sans text-sm text-peakDeep/60 dark:text-peakWhite/60 mb-6">
                  Visas can be obtained on arrival at Tribhuvan International Airport (KTM). It is highly recommended to fill out the online form prior to arrival to save time.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-black/5 dark:bg-white/5 rounded-2xl p-6 text-center border-t-4 border-peakGreen">
                    <span className="font-sans text-xs uppercase tracking-widest text-peakDeep/50 dark:text-peakWhite/50 font-bold block mb-1">15 Days</span>
                    <span className="font-display font-bold text-3xl text-peakDeep dark:text-peakWhite">$30</span>
                  </div>
                  <div className="bg-black/5 dark:bg-white/5 rounded-2xl p-6 text-center border-t-4 border-peakGreen">
                    <span className="font-sans text-xs uppercase tracking-widest text-peakDeep/50 dark:text-peakWhite/50 font-bold block mb-1">30 Days</span>
                    <span className="font-display font-bold text-3xl text-peakDeep dark:text-peakWhite">$50</span>
                  </div>
                  <div className="bg-black/5 dark:bg-white/5 rounded-2xl p-6 text-center border-t-4 border-peakGreen">
                    <span className="font-sans text-xs uppercase tracking-widest text-peakDeep/50 dark:text-peakWhite/50 font-bold block mb-1">90 Days</span>
                    <span className="font-display font-bold text-3xl text-peakDeep dark:text-peakWhite">$125</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-peakDeep/60 dark:text-peakWhite/60 mb-2">
                  <CheckCircle size={14} className="text-peakGreen" /> Pay in cash (USD, EUR, GBP) or by card (2% fee).
                </div>
                <div className="flex items-center gap-2 text-sm text-peakDeep/60 dark:text-peakWhite/60">
                  <CheckCircle size={14} className="text-peakGreen" /> Passport must be valid for at least 6 months.
                </div>
              </div>
            )}

            {activeTab === 'permits' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <h3 className="font-display font-bold text-xl text-peakDeep dark:text-peakWhite mb-4">Required Trekking Permits</h3>
                <p className="font-sans text-sm text-peakDeep/60 dark:text-peakWhite/60 mb-6">
                  Every trek requires a TIMS card and National Park entry. If you book with Project Peak, all permit costs and logistics are fully covered!
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-black/5 dark:bg-white/5 rounded-xl">
                    <div>
                      <h4 className="font-sans font-bold text-peakDeep dark:text-peakWhite">TIMS Card (Trekkers' Information)</h4>
                      <p className="font-sans text-xs text-peakDeep/50 dark:text-peakWhite/50">Mandatory for all routes</p>
                    </div>
                    <span className="font-bold text-peakDeep dark:text-peakWhite pt-1 px-3 bg-white dark:bg-black/20 rounded-lg">~ $15 (NPR 2000)</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-black/5 dark:bg-white/5 rounded-xl">
                    <div>
                      <h4 className="font-sans font-bold text-peakDeep dark:text-peakWhite">National Park Entry</h4>
                      <p className="font-sans text-xs text-peakDeep/50 dark:text-peakWhite/50">Sagarmatha, Annapurna, Langtang</p>
                    </div>
                    <span className="font-bold text-peakDeep dark:text-peakWhite pt-1 px-3 bg-white dark:bg-black/20 rounded-lg">~ $25 (NPR 3000)</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/30 rounded-xl">
                    <div>
                      <h4 className="font-sans font-bold text-amber-800 dark:text-amber-200 shrink-0 flex items-center gap-2"><AlertCircle size={14}/> Restricted Areas</h4>
                      <p className="font-sans text-xs text-amber-700/70 dark:text-amber-300/70">Manaslu, Upper Mustang (Agency Required)</p>
                    </div>
                    <span className="font-bold text-amber-800 dark:text-amber-200">From $50/week</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Flight Status Widget */}
          <div className="w-full lg:w-96 flex flex-col gap-6">
            <div className={`rounded-3xl p-6 sm:p-8 relative overflow-hidden transition-all ${isPeakSeason ? 'bg-amber-500 text-white shadow-xl shadow-amber-500/10' : 'bg-peakGreen text-white shadow-xl shadow-peakGreen/10'}`}>
              
              <div className="absolute -top-10 -right-10 opacity-20 transform rotate-45">
                 <Plane size={160} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 opacity-90">
                  <span className="font-sans text-xs font-bold uppercase tracking-widest bg-black/20 px-2 py-1 rounded">Live Status</span>
                </div>
                <h3 className="font-display font-bold text-2xl mb-2">Lukla Flights Router</h3>
                
                {isPeakSeason ? (
                  <>
                    <p className="font-sans text-sm opacity-90 mb-6">
                      It is currently <strong>Peak Season</strong>. Due to traffic at Kathmandu Airport, all flights to Lukla are being re-routed to <strong>Ramechhap Airport (Manthali)</strong>.
                    </p>
                    <div className="bg-black/10 rounded-xl p-4 mb-4 backdrop-blur-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-sans text-xs uppercase tracking-wider font-bold">Departure from</span>
                        <span className="font-sans text-sm font-bold">Ramechhap</span>
                      </div>
                      <div className="h-0.5 w-full bg-white/20 my-2"></div>
                      <div className="flex items-start gap-3 mt-3">
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                        <span className="font-sans text-[11px] leading-tight">Requires a 4-hour drive from Kathmandu starting at 2:00 AM. Project Peak includes this transport in all packages.</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-sans text-sm opacity-90 mb-6">
                      It is currently regular season. All flights to Lukla are departing directly from <strong>Kathmandu (Tribhuvan Airport)</strong>.
                    </p>
                    <div className="bg-black/10 rounded-xl p-4 mb-4 backdrop-blur-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-sans text-xs uppercase tracking-wider font-bold">Departure from</span>
                        <span className="font-sans text-sm font-bold">Kathmandu [KTM]</span>
                      </div>
                    </div>
                  </>
                )}

                <button 
                  onClick={() => window.open(`https://wa.me/9779801234567?text=${encodeURIComponent("Hi! Could you confirm the current flight routing to Lukla for this week?")}`, '_blank', 'noopener,noreferrer')}
                  className="w-full bg-white text-black font-sans text-sm font-bold py-3 rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                >
                  Verify Flight Times <ExternalLink size={16} />
                </button>
              </div>
            </div>
            
            <p className="font-sans text-[10px] text-peakDeep/40 dark:text-peakWhite/40 text-center px-4">
              *Visa and permit rules are subject to change by the Government of Nepal. Best to confirm directly with our team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PermitDashboard;

import React, { useState } from 'react';
import Compass from './Compass';
import { treks } from '../data/treks';
import { Map, Mountain, Compass as CompassIcon, WifiOff } from 'lucide-react';
import TrailMap from './TrailMap';

const OfflineDashboard = () => {
  const [activeTab, setActiveTab] = useState('compass'); // 'compass' or 'routes'
  const [mapOpen, setMapOpen] = useState(false);
  const [mapTrek, setMapTrek] = useState('');

  return (
    <div className="min-h-screen bg-peakDark text-white font-sans flex flex-col relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-peakGreen/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <div className="p-6 border-b border-white/10 flex justify-between items-center z-10 bg-peakDark/50 backdrop-blur-md">
        <div>
          <h1 className="font-display font-bold text-2xl tracking-wider text-peakWhite">PEAK<span className="text-peakGreen">.</span></h1>
          <div className="flex items-center gap-2 text-peakRed text-sm mt-1 font-bold tracking-widest uppercase">
            <WifiOff size={14} /> Offline Mode
          </div>
        </div>
        <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
          <button
            onClick={() => setActiveTab('compass')}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-2 ${activeTab === 'compass' ? 'bg-peakGreen text-white' : 'text-white/50 hover:text-white'}`}
          >
            <CompassIcon size={14} /> Compass
          </button>
          <button
            onClick={() => setActiveTab('routes')}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-2 ${activeTab === 'routes' ? 'bg-peakGreen text-white' : 'text-white/50 hover:text-white'}`}
          >
            <Map size={14} /> Routes
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col z-10 overflow-y-auto">
        {activeTab === 'compass' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="text-center mb-12 max-w-md">
              <h2 className="text-3xl font-display font-bold mb-4">Find Your Way</h2>
              <p className="text-white/50 text-sm">Use your device's built-in sensors to navigate even without an internet connection.</p>
            </div>
            
            <div className="relative w-full max-w-[400px] aspect-square">
              {/* Render the actual Compass component. It uses absolute positioning inside its container when not in a modal. */}
              <Compass isOpen={true} isInline={true} onClose={() => {}} />
            </div>
          </div>
        ) : (
          <div className="p-6 md:p-12 max-w-7xl mx-auto w-full">
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Saved Routes</h2>
              <p className="text-white/50 max-w-2xl text-sm md:text-base">Your offline maps are ready. Select a route below to view its GPS trail and waypoints.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {treks.map(trek => (
                <div key={trek.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer"
                     onClick={() => { setMapTrek(trek.name); setMapOpen(true); }}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-display font-bold text-xl">{trek.name}</h3>
                    <span className="bg-white/10 px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider">{trek.days} Days</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-white/50 mb-6">
                    <span className="flex items-center gap-1"><Mountain size={14} className="text-peakGreen" /> {trek.altitude}</span>
                  </div>

                  <button className="w-full py-3 bg-white/10 hover:bg-peakGreen text-white rounded-lg font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                    <Map size={16} /> View Saved Map
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <TrailMap isOpen={mapOpen} onClose={() => setMapOpen(false)} trekName={mapTrek} />
    </div>
  );
};

export default OfflineDashboard;

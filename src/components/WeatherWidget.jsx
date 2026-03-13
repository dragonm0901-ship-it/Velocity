import React, { useState } from 'react';
import { Thermometer, Wind, CloudRain, Sun } from 'lucide-react';

// Simulated weather data for key trekking locations
const locations = [
  { name: 'Kathmandu', altitude: '1,400m', temp: 22, wind: 8, condition: 'sunny', humidity: 45 },
  { name: 'Lukla', altitude: '2,860m', temp: 12, wind: 15, condition: 'cloudy', humidity: 60 },
  { name: 'Namche Bazaar', altitude: '3,440m', temp: 6, wind: 20, condition: 'cloudy', humidity: 55 },
  { name: 'EBC', altitude: '5,364m', temp: -8, wind: 35, condition: 'snow', humidity: 30 },
  { name: 'Pokhara', altitude: '827m', temp: 25, wind: 5, condition: 'sunny', humidity: 50 },
  { name: 'Thorong La', altitude: '5,416m', temp: -12, wind: 40, condition: 'snow', humidity: 25 },
];

const conditionIcons = {
  sunny: Sun,
  cloudy: CloudRain,
  snow: Wind,
};

const WeatherWidget = () => {
  const [selected, setSelected] = useState(0);
  const loc = locations[selected];
  const Icon = conditionIcons[loc.condition] || Sun;

  return (
    <section id="weather-widget" className="py-16 px-6 md:px-16 w-full bg-gray-50 dark:bg-peakDeep/50 transition-colors">
      <div className="max-w-5xl mx-auto">
        <h3 className="font-display font-bold text-2xl md:text-3xl text-peakDeep dark:text-peakWhite mb-8 text-center">
          Trail Weather Conditions
        </h3>
        
        {/* Location tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {locations.map((loc, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`px-4 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all ${
                i === selected 
                  ? 'bg-peakGreen text-white' 
                  : 'bg-black/5 dark:bg-white/10 text-peakDeep dark:text-peakWhite hover:bg-peakGreen/10'
              }`}
            >
              {loc.name}
            </button>
          ))}
        </div>

        {/* Weather card */}
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="font-sans text-peakDeep/50 dark:text-peakWhite/50 text-sm mb-1">{loc.altitude} altitude</p>
            <h4 className="font-display font-bold text-3xl text-peakDeep dark:text-peakWhite mb-2">{loc.name}</h4>
            <p className="font-sans text-5xl font-bold text-peakDeep dark:text-peakWhite">{loc.temp}°C</p>
          </div>
          
          <Icon size={64} className="text-peakGreen" strokeWidth={1.5} />

          <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-center">
            <div>
              <Wind size={18} className="text-peakGreen mx-auto mb-1" />
              <p className="font-sans text-xs text-peakDeep/50 dark:text-peakWhite/50">Wind</p>
              <p className="font-sans font-bold text-peakDeep dark:text-peakWhite">{loc.wind} km/h</p>
            </div>
            <div>
              <Thermometer size={18} className="text-peakGreen mx-auto mb-1" />
              <p className="font-sans text-xs text-peakDeep/50 dark:text-peakWhite/50">Humidity</p>
              <p className="font-sans font-bold text-peakDeep dark:text-peakWhite">{loc.humidity}%</p>
            </div>
          </div>
        </div>

        <p className="text-center mt-4 font-sans text-xs text-peakDeep/40 dark:text-peakWhite/40">
          * Simulated data based on seasonal averages. Check official forecasts before departure.
        </p>
      </div>
    </section>
  );
};

export default WeatherWidget;

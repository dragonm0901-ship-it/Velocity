import React, { useState, useEffect } from 'react';
import { Thermometer, Wind, CloudRain, Sun, Cloud, Snowflake, Loader2 } from 'lucide-react';

const locations = [
  { name: 'Kathmandu', altitude: '1,400m', lat: 27.7172, lon: 85.3240 },
  { name: 'Lukla', altitude: '2,860m', lat: 27.6861, lon: 86.7300 },
  { name: 'Namche Bazaar', altitude: '3,440m', lat: 27.8069, lon: 86.7140 },
  { name: 'EBC', altitude: '5,364m', lat: 27.9861, lon: 86.9226 },
  { name: 'Pokhara', altitude: '827m', lat: 28.2096, lon: 83.9856 },
  { name: 'Thorong La', altitude: '5,416m', lat: 28.7936, lon: 83.9366 },
];

const conditionIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rain: CloudRain,
  snow: Snowflake,
};

const mapWeatherCode = (code) => {
  if (code === 0) return 'sunny';
  if ([1, 2, 3, 45, 48].includes(code)) return 'cloudy';
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code)) return 'rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snow';
  return 'sunny'; // default fallback
};

const WeatherWidget = () => {
  const [selected, setSelected] = useState(0);
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const promises = locations.map(async (loc, index) => {
          const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`);
          if (!res.ok) throw new Error('API Error');
          const data = await res.json();
          return {
            index,
            temp: Math.round(data.current.temperature_2m),
            humidity: data.current.relative_humidity_2m,
            wind: Math.round(data.current.wind_speed_10m),
            condition: mapWeatherCode(data.current.weather_code)
          };
        });
        const results = await Promise.all(promises);
        
        if (isMounted) {
          const newData = {};
          results.forEach(res => {
            newData[res.index] = res;
          });
          setWeatherData(newData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch weather data", error);
        // Fallback or silent fail
        if (isMounted) setLoading(false);
      }
    };

    fetchWeather();
    return () => { isMounted = false; };
  }, []);

  const loc = locations[selected];
  const currentData = weatherData[selected];
  
  // Use current data or default to placeholders if loading/failed
  const temp = currentData ? currentData.temp : '--';
  const wind = currentData ? currentData.wind : '--';
  const humidity = currentData ? currentData.humidity : '--';
  const conditionStr = currentData ? currentData.condition : 'cloudy';
  
  const Icon = loading ? Loader2 : (conditionIcons[conditionStr] || Sun);

  return (
    <section id="weather-widget" className="py-16 px-6 md:px-16 w-full bg-gray-50 dark:bg-peakDeep/50 transition-colors">
      <div className="max-w-5xl mx-auto">
        <h3 className="font-display font-bold text-2xl md:text-3xl text-peakDeep dark:text-peakWhite mb-8 text-center">
          Live Trail Weather Conditions
        </h3>
        
        {/* Location tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {locations.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`px-4 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all ${
                i === selected 
                  ? 'bg-peakGreen text-white' 
                  : 'bg-black/5 dark:bg-white/10 text-peakDeep dark:text-peakWhite hover:bg-peakGreen/10'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Weather card */}
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 min-h-[300px] md:min-h-[200px] transition-all relative overflow-hidden">
          
          {loading && (
            <div className="absolute inset-0 bg-white/50 dark:bg-peakDeep/50 backdrop-blur-sm z-10 flex items-center justify-center">
              <Loader2 className="animate-spin text-peakGreen" size={40} />
            </div>
          )}

          <div className="text-center md:text-left z-0 flex-1">
            <p className="font-sans text-peakDeep/50 dark:text-peakWhite/50 text-sm mb-1">{loc.altitude} altitude</p>
            <h4 className="font-display font-bold text-3xl text-peakDeep dark:text-peakWhite mb-2">{loc.name}</h4>
            <p className="font-sans text-5xl font-bold text-peakDeep dark:text-peakWhite">{temp}°C</p>
          </div>
          
          <div className="z-0 flex justify-center flex-1">
            <Icon size={64} className={`text-peakGreen ${loading ? 'animate-spin opacity-50' : ''}`} strokeWidth={1.5} />
          </div>

          <div className="z-0 grid grid-cols-2 gap-x-8 gap-y-4 text-center flex-1">
            <div>
              <Wind size={18} className="text-peakGreen mx-auto mb-1" />
              <p className="font-sans text-xs text-peakDeep/50 dark:text-peakWhite/50">Wind</p>
              <p className="font-sans font-bold text-peakDeep dark:text-peakWhite">{wind} km/h</p>
            </div>
            <div>
              <Thermometer size={18} className="text-peakGreen mx-auto mb-1" />
              <p className="font-sans text-xs text-peakDeep/50 dark:text-peakWhite/50">Humidity</p>
              <p className="font-sans font-bold text-peakDeep dark:text-peakWhite">{humidity}%</p>
            </div>
          </div>
        </div>

        <p className="text-center mt-4 font-sans text-xs text-peakDeep/40 dark:text-peakWhite/40">
          Powered by <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-peakGreen">Open-Meteo</a> free, open-source weather API.
        </p>
      </div>
    </section>
  );
};

export default WeatherWidget;

import React, { useState } from 'react';
import { Activity, Dumbbell, Flame, TrendingDown, Target, ArrowRight } from 'lucide-react';
import { treks } from '../data/treks';

const FitnessCalculator = () => {
  const [weightStr, setWeightStr] = useState('75');
  const [unit, setUnit] = useState('kg');
  const [selectedTrekId, setSelectedTrekId] = useState(treks[0]?.id || 1);

  const selectedTrek = treks.find(t => t.id === Number(selectedTrekId)) || treks[0];
  const weightVal = parseFloat(weightStr) || 0;
  
  // Convert units to kg for calculation
  const weightInKg = unit === 'kg' ? weightVal : weightVal * 0.453592;

  // MET values: Easy=6, Moderate=7, Hard=8.5
  const getMetValue = (difficulty) => {
    if (difficulty === 'hard') return 8.5;
    if (difficulty === 'moderate') return 7;
    return 6;
  };

  const calculateCalories = () => {
    if (weightInKg === 0 || !selectedTrek) return 0;
    
    // Formula: Calories = MET * Weight(kg) * Hours per day
    // We assume an average of 6 hours walking per day.
    const met = getMetValue(selectedTrek.difficulty);
    const dailyCalories = met * weightInKg * 6;
    
    // Total for the whole trek
    return Math.round(dailyCalories * selectedTrek.days);
  };

  const totalCalories = calculateCalories();

  // Relatable metrics
  const marathons = (totalCalories / 2600).toFixed(1);
  const bigMacs = Math.round(totalCalories / 550);
  const fatBurned = (totalCalories / 7700).toFixed(1); // 7700 kcal = 1kg fat

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-16 w-full bg-peakWhite dark:bg-peakDark transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left: Text & Input */}
        <div className="flex-1 w-full text-center lg:text-left">
          <div className="inline-flex items-center justify-center p-3 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-2xl mb-6">
            <Flame size={32} />
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-peakDeep dark:text-peakWhite mb-6">
            Trek Fitness & Calorie Calculator
          </h2>
          <p className="font-sans text-peakDeep/60 dark:text-peakWhite/60 text-base md:text-lg mb-10 max-w-lg mx-auto lg:mx-0">
            Trekking in Nepal is the ultimate workout. Enter your details below to see how many calories you'll burn—and what that actually means!
          </p>

          <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-5 sm:p-6 md:p-8 max-w-lg mx-auto lg:mx-0 shadow-lg relative z-10 w-full text-left">
            <div className="mb-6">
              <label className="block font-sans text-sm font-bold text-peakDeep dark:text-peakWhite mb-2">Select your adventure</label>
              <select 
                value={selectedTrekId}
                onChange={(e) => setSelectedTrekId(e.target.value)}
                className="w-full bg-black/5 dark:bg-white/10 border-0 rounded-xl px-4 py-3 font-sans text-peakDeep dark:text-peakWhite outline-none focus:ring-2 focus:ring-peakGreen transition-all appearance-none cursor-pointer"
              >
                {treks.map(trek => (
                  <option key={trek.id} value={trek.id} className="text-peakDeep">
                    {trek.name} ({trek.days} days, {trek.difficulty})
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-8">
              <label className="block font-sans text-sm font-bold text-peakDeep dark:text-peakWhite mb-2">Your body weight</label>
              <div className="flex items-center gap-4">
                <input 
                  type="number" 
                  value={weightStr}
                  onChange={(e) => setWeightStr(e.target.value)}
                  className="flex-1 bg-black/5 dark:bg-white/10 border-0 rounded-xl px-4 py-3 font-sans text-xl font-bold text-peakDeep dark:text-peakWhite outline-none focus:ring-2 focus:ring-peakGreen transition-all"
                />
                <div className="flex bg-black/5 dark:bg-white/10 rounded-xl p-1 shrink-0">
                  <button 
                    onClick={() => setUnit('kg')}
                    className={`px-4 py-2 rounded-lg font-sans text-sm font-bold transition-all ${unit === 'kg' ? 'bg-white dark:bg-peakDeep text-peakDeep dark:text-peakWhite shadow-sm' : 'text-peakDeep/50 dark:text-peakWhite/50 hover:text-peakDeep dark:hover:text-peakWhite'}`}
                  >
                    KG
                  </button>
                  <button 
                    onClick={() => setUnit('lbs')}
                    className={`px-4 py-2 rounded-lg font-sans text-sm font-bold transition-all ${unit === 'lbs' ? 'bg-white dark:bg-peakDeep text-peakDeep dark:text-peakWhite shadow-sm' : 'text-peakDeep/50 dark:text-peakWhite/50 hover:text-peakDeep dark:hover:text-peakWhite'}`}
                  >
                    LBS
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                const message = `Hi! I'm planning to hike *${selectedTrek?.name}*. I used your Fitness Calculator and saw I'll burn ~${totalCalories.toLocaleString()} calories! Can you send me a prep guide?`;
                window.open(`https://wa.me/9779801234567?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
              }}
              className="w-full bg-peakGreen hover:bg-peakGreen/90 text-white rounded-xl px-6 py-4 font-sans text-sm font-bold flex justify-center items-center gap-2 transition-all group"
            >
              Get a Free Training Plan
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Right: Dynamic Results Box */}
        <div className="flex-1 w-full max-w-md mx-auto relative mt-10 lg:mt-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-peakGreen/10 rounded-[3rem] transform rotate-3 scale-105"></div>
          
          <div className="bg-peakDeep border border-white/10 rounded-[2.5rem] p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-2xl text-white">
            
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500 rounded-full blur-[80px] opacity-30 pointer-events-none"></div>

            <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-white/50 mb-2">Total Energy Burned</h3>
            <div className="font-display font-bold text-6xl md:text-7xl mb-8 flex items-end gap-2 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-400">
              {totalCalories.toLocaleString()}
              <span className="font-sans text-xl font-bold uppercase tracking-wider text-white/40 pb-2">KCal</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="bg-blue-500/20 text-blue-400 p-3 rounded-xl shrink-0">
                  <Activity size={24} />
                </div>
                <div>
                  <div className="font-display font-bold text-2xl">{marathons}</div>
                  <div className="font-sans text-xs text-white/60 uppercase tracking-widest">Full Marathons</div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="bg-amber-500/20 text-amber-400 p-3 rounded-xl shrink-0">
                  <Target size={24} />
                </div>
                <div>
                  <div className="font-display font-bold text-2xl">{bigMacs}</div>
                  <div className="font-sans text-xs text-white/60 uppercase tracking-widest">Big Macs Equivalent</div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="bg-green-500/20 text-green-400 p-3 rounded-xl shrink-0">
                  <TrendingDown size={24} />
                </div>
                <div>
                  <div className="font-display font-bold text-2xl">{fatBurned} <span className="text-sm">kg</span></div>
                  <div className="font-sans text-xs text-white/60 uppercase tracking-widest">Body Fat Burned</div>
                </div>
              </div>
            </div>

            <p className="font-sans text-[10px] text-white/30 text-center mt-6">
               *Estimates based on {weightVal}{unit} carrying a standard 10kg pack for 6 hours/day.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FitnessCalculator;

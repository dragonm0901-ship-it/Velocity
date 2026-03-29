import React, { useState, useEffect } from 'react';
import { Check, AlertTriangle, ArrowRight, Backpack, ChevronLeft, Scale } from 'lucide-react';

const gearCategories = [
  {
    category: 'Essentials',
    items: [
      { name: 'Trekking backpack (40-60L)', essential: true, weight: 1.5 },
      { name: 'Daypack (20L)', essential: true, weight: 0.5 },
      { name: 'Passport & permits copy', essential: true, weight: 0.1 },
      { name: 'Travel insurance docs', essential: true, weight: 0.1 },
      { name: 'Cash (NPR & USD)', essential: true, weight: 0.1 },
    ]
  },
  {
    category: 'Clothing',
    items: [
      { name: 'Moisture-wicking base layers (x3)', essential: true, weight: 0.6 },
      { name: 'Insulating fleece/down jacket', essential: true, weight: 0.8 },
      { name: 'Waterproof shell jacket', essential: true, weight: 0.4 },
      { name: 'Trekking pants (x2)', essential: true, weight: 0.8 },
      { name: 'Thermal underwear', essential: false, weight: 0.3 },
      { name: 'Warm hat & sun hat', essential: true, weight: 0.2 },
      { name: 'Gloves (liner + waterproof)', essential: true, weight: 0.2 },
      { name: 'Warm socks (x5)', essential: true, weight: 0.4 },
      { name: 'Gaiters', essential: false, weight: 0.3 },
    ]
  },
  {
    category: 'Footwear',
    items: [
      { name: 'Broken-in trekking boots', essential: true, weight: 1.2 },
      { name: 'Camp sandals/flip flops', essential: false, weight: 0.3 },
      { name: 'Trekking poles (pair)', essential: true, weight: 0.5 },
    ]
  },
  {
    category: 'Gear & Equipment',
    items: [
      { name: 'Sleeping bag (-15°C rated)', essential: true, weight: 1.6 },
      { name: 'Headlamp + spare batteries', essential: true, weight: 0.2 },
      { name: 'Sunglasses (UV400)', essential: true, weight: 0.1 },
      { name: 'Water bottle / hydration system', essential: true, weight: 0.3 },
      { name: 'Water purification tablets', essential: true, weight: 0.1 },
      { name: 'First aid kit', essential: true, weight: 0.4 },
      { name: 'Sunscreen (SPF 50+)', essential: true, weight: 0.1 },
      { name: 'Lip balm with SPF', essential: false, weight: 0.05 },
    ]
  },
  {
    category: 'Tech & Comfort',
    items: [
      { name: 'Camera / phone', essential: false, weight: 0.4 },
      { name: 'Power bank (20,000mAh+)', essential: false, weight: 0.4 },
      { name: 'Earplugs & eye mask', essential: false, weight: 0.05 },
      { name: 'Snacks & energy bars', essential: false, weight: 0.5 },
      { name: 'Notebook & pen', essential: false, weight: 0.2 },
    ]
  },
];

// Combine all items to query easily
const allItemsArray = gearCategories.flatMap(c => c.items);

const STORAGE_KEY = 'projectpeak_gear_checklist';

const GearChecker = () => {
  const [checked, setChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  const toggleItem = (name) => {
    setChecked(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const totalItems = allItemsArray.length;
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const essentialItems = allItemsArray.filter(i => i.essential);
  const essentialsMissing = essentialItems.filter(i => !checked[i.name]);
  const progress = Math.round((checkedCount / totalItems) * 100);

  // Calculate Weights
  const totalWeightStr = allItemsArray.reduce((acc, item) => checked[item.name] ? acc + item.weight : acc, 0).toFixed(1);
  const totalWeight = parseFloat(totalWeightStr);

  const resetAll = () => setChecked({});

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Thresholds
  const isHeavy = totalWeight > 10;
  const maxWeight = 16; // Just for visual progress bar scale

  return (
    <section id="gear-checker" className="py-24 md:py-32 px-6 md:px-16 w-full bg-peakWhite dark:bg-peakDark transition-colors">
      <div 
        onClick={() => setIsOpen(true)}
        className="max-w-4xl mx-auto bg-white dark:bg-peakDeep border border-black/5 dark:border-white/10 rounded-[2rem] p-8 md:p-12 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-peakGreen/10 transition-all duration-300 group flex flex-col md:flex-row items-center gap-8 md:gap-12"
      >
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center justify-center p-4 bg-peakGreen/10 text-peakGreen rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
            <Backpack size={40} />
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-peakDeep dark:text-peakWhite mb-4 group-hover:text-peakGreen transition-colors">
            Gear & Pack Estimator
          </h2>
          <p className="font-sans text-peakDeep/60 dark:text-peakWhite/60 text-base md:text-lg mb-6 md:mb-0">
            Interactive checklist with dynamic backpack weight estimation. Find out if you need a porter before you hit the trail!
          </p>
        </div>
        
        {/* Visual summary in the box */}
        <div className="w-full md:w-72 bg-peakWhite dark:bg-white/5 rounded-2xl p-6 border border-black/5 dark:border-white/10 relative overflow-hidden">
          <div className="flex justify-between items-center mb-1 relative z-10">
            <span className="font-sans text-sm font-semibold text-peakDeep dark:text-peakWhite">Est. Weight</span>
            <span className={`font-sans text-lg font-bold ${isHeavy ? 'text-amber-500' : 'text-peakGreen'}`}>{totalWeight} kg</span>
          </div>
          <p className="font-sans text-[10px] text-peakDeep/40 dark:text-peakWhite/40 mb-4 inline-flex items-center gap-1 uppercase tracking-wider relative z-10">
             <Scale size={10} /> Base Weight
          </p>
          <div className="w-full h-2.5 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden relative z-10 mb-2">
            <div className={`h-full rounded-full transition-all duration-500 ease-out ${isHeavy ? 'bg-amber-500' : 'bg-peakGreen'}`} style={{ width: `${Math.min(100, (totalWeight / maxWeight) * 100)}%` }}></div>
          </div>
          <p className="font-sans text-xs text-peakDeep/60 dark:text-peakWhite/60 relative z-10">
            {checkedCount} out of {totalItems} items saved
          </p>
          
          <div className="flex items-center justify-between mt-6 relative z-10 text-peakDeep dark:text-peakWhite group-hover:text-peakGreen transition-colors">
             <span className="font-sans text-sm font-bold uppercase tracking-wider">Open Checklist</span>
             <ArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform" />
          </div>
          
          {/* Decorative background element */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-peakGreen/5 rounded-full blur-2xl group-hover:bg-peakGreen/10 transition-colors pointer-events-none"></div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[200] bg-peakWhite dark:bg-peakDark overflow-y-auto w-full h-full" data-lenis-prevent="true">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-20 relative min-h-full">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
              className="absolute top-6 left-6 md:top-12 md:left-0 flex items-center gap-2 text-peakDeep/60 dark:text-peakWhite/60 hover:text-peakGreen transition-colors font-sans font-bold uppercase tracking-wider text-sm mb-8"
            >
              <ChevronLeft size={20} />
              Back to Home
            </button>

            <div className="text-center mb-12 mt-12 md:mt-0">
              <h2 className="font-display font-bold text-3xl md:text-5xl text-peakDeep dark:text-peakWhite mb-4">
                Pack Weight Estimator
              </h2>
              <p className="font-sans text-peakDeep/60 dark:text-peakWhite/60 text-base md:text-lg">
                Your checklist and weight are saved automatically. Add ~2kg for water!
              </p>
            </div>

            {/* Dashboard top area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Progress box */}
              <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-5 md:p-6 rounded-2xl shadow-sm flex flex-col justify-center">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-sans text-sm font-semibold text-peakDeep dark:text-peakWhite">Items Packed ({checkedCount}/{totalItems})</span>
                  <span className="font-sans text-sm font-bold text-peakGreen">{progress}%</span>
                </div>
                <div className="w-full h-3 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-peakGreen rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
                </div>
              </div>

              {/* Weight box */}
              <div className={`border p-5 md:p-6 rounded-2xl shadow-sm flex flex-col justify-center transition-colors ${
                isHeavy ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-700/30' : 'bg-white dark:bg-white/5 border-black/5 dark:border-white/10'
              }`}>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <Scale size={18} className={isHeavy ? 'text-amber-500' : 'text-peakGreen'} />
                    <span className={`font-sans text-sm font-semibold ${isHeavy ? 'text-amber-700 dark:text-amber-300' : 'text-peakDeep dark:text-peakWhite'}`}>
                      Estimated Weight
                    </span>
                  </div>
                  <span className={`font-sans text-lg font-bold ${isHeavy ? 'text-amber-600 dark:text-amber-400' : 'text-peakGreen'}`}>{totalWeight} kg</span>
                </div>
                <div className="w-full h-3 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden mb-2">
                  <div className={`h-full rounded-full transition-all duration-500 ease-out ${isHeavy ? 'bg-amber-500' : 'bg-peakGreen'}`} style={{ width: `${Math.min(100, (totalWeight / maxWeight) * 100)}%` }}></div>
                </div>
                {isHeavy && (
                  <p className="font-sans text-xs text-amber-700 dark:text-amber-300">
                    Your pack is getting heavy. Consider hiring a porter!
                  </p>
                )}
              </div>
            </div>

            {/* Porter warning standalone box */}
            {isHeavy && (
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 mb-8 rounded-xl bg-peakDeep text-white shadow-lg animate-in slide-in-from-bottom-4 fade-in duration-500">
                <div className="flex items-start gap-4">
                  <AlertTriangle size={24} className="text-amber-400 shrink-0" />
                  <div>
                    <h4 className="font-display font-bold text-lg text-white mb-1">Protect your back & enjoy the trek!</h4>
                    <p className="font-sans text-sm text-white/80">
                      Carrying over 10kg at high altitudes drastically increases fatigue. Hire an experienced local porter to carry up to 20kg of your gear.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    window.open(`https://wa.me/9779801234567?text=${encodeURIComponent("Hi! My pack is quite heavy and I'd like to hire a porter for my trek.")}`, '_blank', 'noopener,noreferrer');
                  }}
                  className="shrink-0 bg-peakGreen text-white px-6 py-2.5 rounded-full font-sans text-sm font-bold uppercase tracking-wider hover:bg-peakGreen/90 transition-colors whitespace-nowrap"
                >
                  Hire Porter
                </button>
              </div>
            )}

            {/* Essentials warning */}
            {essentialsMissing.length > 0 && checkedCount > 0 && (
              <div className="flex items-start gap-3 p-4 mb-8 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/30">
                <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <p className="font-sans text-sm text-amber-800 dark:text-amber-200">
                  <strong>{essentialsMissing.length} essential item{essentialsMissing.length > 1 ? 's' : ''}</strong> still missing. These are critical for your safety on the trail.
                </p>
              </div>
            )}

            {/* Categories */}
            <div className="flex flex-col gap-6">
              {gearCategories.map((cat, catIndex) => (
                <div key={catIndex} className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-display font-bold text-lg text-peakDeep dark:text-peakWhite">{cat.category}</h3>
                    <span className="font-sans text-xs font-bold text-peakDeep/50 dark:text-peakWhite/50">
                      {cat.items.reduce((acc, item) => checked[item.name] ? acc + item.weight : acc, 0).toFixed(1)} kg
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {cat.items.map((item, itemIndex) => {
                      const isChecked = checked[item.name];
                      return (
                        <button
                          key={itemIndex}
                          onClick={(e) => { e.stopPropagation(); toggleItem(item.name); }}
                          className={`flex items-center gap-3 py-2.5 px-3 rounded-lg text-left transition-all hover:bg-black/[0.02] dark:hover:bg-white/5 group ${isChecked ? 'opacity-60' : ''}`}
                        >
                          <div className={`w-5 h-5 rounded shrink-0 flex items-center justify-center transition-all ${isChecked ? 'bg-peakGreen' : 'border-2 border-black/15 dark:border-white/20 group-hover:border-peakGreen'}`}>
                            {isChecked && <Check size={14} className="text-white" strokeWidth={3} />}
                          </div>
                          <span className={`font-sans text-sm flex-1 ${isChecked ? 'line-through text-peakDeep/40 dark:text-peakWhite/40' : 'text-peakDeep dark:text-peakWhite'}`}>
                            {item.name}
                          </span>
                          <span className="font-sans text-xs text-peakDeep/40 dark:text-peakWhite/40 mr-2">
                            {item.weight}kg
                          </span>
                          {item.essential && !isChecked && (
                            <span className="text-[10px] uppercase tracking-wider font-bold text-peakRed/70 dark:text-red-400/70">Essential</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Reset */}
            <div className="text-center mt-8 pb-12">
              <button onClick={(e) => { e.stopPropagation(); resetAll(); }} className="font-sans text-sm text-peakDeep/50 dark:text-peakWhite/50 hover:text-peakRed transition-colors underline-offset-4 hover:underline">
                Reset checklist & weight
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GearChecker;

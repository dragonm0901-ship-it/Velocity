import React, { useState, useEffect } from 'react';
import { Check, AlertTriangle } from 'lucide-react';

const gearCategories = [
  {
    category: 'Essentials',
    items: [
      { name: 'Trekking backpack (40-60L)', essential: true },
      { name: 'Daypack (20L)', essential: true },
      { name: 'Passport & permits copy', essential: true },
      { name: 'Travel insurance docs', essential: true },
      { name: 'Cash (NPR & USD)', essential: true },
    ]
  },
  {
    category: 'Clothing',
    items: [
      { name: 'Moisture-wicking base layers (x3)', essential: true },
      { name: 'Insulating fleece/down jacket', essential: true },
      { name: 'Waterproof shell jacket', essential: true },
      { name: 'Trekking pants (x2)', essential: true },
      { name: 'Thermal underwear', essential: false },
      { name: 'Warm hat & sun hat', essential: true },
      { name: 'Gloves (liner + waterproof)', essential: true },
      { name: 'Warm socks (x5)', essential: true },
      { name: 'Gaiters', essential: false },
    ]
  },
  {
    category: 'Footwear',
    items: [
      { name: 'Broken-in trekking boots', essential: true },
      { name: 'Camp sandals/flip flops', essential: false },
      { name: 'Trekking poles (pair)', essential: true },
    ]
  },
  {
    category: 'Gear & Equipment',
    items: [
      { name: 'Sleeping bag (-15°C rated)', essential: true },
      { name: 'Headlamp + spare batteries', essential: true },
      { name: 'Sunglasses (UV400)', essential: true },
      { name: 'Water bottle / hydration system', essential: true },
      { name: 'Water purification tablets', essential: true },
      { name: 'First aid kit', essential: true },
      { name: 'Sunscreen (SPF 50+)', essential: true },
      { name: 'Lip balm with SPF', essential: false },
    ]
  },
  {
    category: 'Tech & Comfort',
    items: [
      { name: 'Camera / phone', essential: false },
      { name: 'Power bank (20,000mAh+)', essential: false },
      { name: 'Earplugs & eye mask', essential: false },
      { name: 'Snacks & energy bars', essential: false },
      { name: 'Notebook & pen', essential: false },
    ]
  },
];

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

  const totalItems = gearCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const essentialItems = gearCategories.flatMap(c => c.items.filter(i => i.essential));
  const essentialsMissing = essentialItems.filter(i => !checked[i.name]);
  const progress = Math.round((checkedCount / totalItems) * 100);

  const resetAll = () => setChecked({});

  return (
    <section id="gear-checker" className="py-24 md:py-32 px-6 md:px-16 w-full bg-peakWhite dark:bg-peakDark transition-colors">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-peakDeep dark:text-peakWhite mb-4">
            Gear & Equipment Checker
          </h2>
          <p className="font-sans text-peakDeep/60 dark:text-peakWhite/60 text-base md:text-lg">
            Don't leave Kathmandu without ticking everything off. Your checklist is saved automatically.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-sans text-sm font-semibold text-peakDeep dark:text-peakWhite">{checkedCount} / {totalItems} items packed</span>
            <span className="font-sans text-sm font-bold text-peakGreen">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-peakGreen rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

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
              <h3 className="font-display font-bold text-lg text-peakDeep dark:text-peakWhite mb-4">{cat.category}</h3>
              <div className="flex flex-col gap-1">
                {cat.items.map((item, itemIndex) => {
                  const isChecked = checked[item.name];
                  return (
                    <button
                      key={itemIndex}
                      onClick={() => toggleItem(item.name)}
                      className={`flex items-center gap-3 py-2.5 px-3 rounded-lg text-left transition-all hover:bg-black/[0.02] dark:hover:bg-white/5 group ${isChecked ? 'opacity-60' : ''}`}
                    >
                      <div className={`w-5 h-5 rounded shrink-0 flex items-center justify-center transition-all ${isChecked ? 'bg-peakGreen' : 'border-2 border-black/15 dark:border-white/20 group-hover:border-peakGreen'}`}>
                        {isChecked && <Check size={14} className="text-white" strokeWidth={3} />}
                      </div>
                      <span className={`font-sans text-sm flex-1 ${isChecked ? 'line-through text-peakDeep/40 dark:text-peakWhite/40' : 'text-peakDeep dark:text-peakWhite'}`}>
                        {item.name}
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
        <div className="text-center mt-8">
          <button onClick={resetAll} className="font-sans text-sm text-peakDeep/50 dark:text-peakWhite/50 hover:text-peakRed transition-colors underline-offset-4 hover:underline">
            Reset checklist
          </button>
        </div>
      </div>
    </section>
  );
};

export default GearChecker;

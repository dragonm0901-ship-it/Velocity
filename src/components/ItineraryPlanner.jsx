import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { CalendarDays, Mountain, Gauge, ArrowRight, ArrowLeft, CheckCircle, Footprints, TrendingUp, Clock, Timer, CalendarRange } from 'lucide-react';

const steps = ['difficulty', 'duration', 'interests'];

const treks = [
  { name: 'Everest Base Camp', difficulty: 'hard', days: 14, interests: ['mountains', 'culture'], altitude: '5,364m', price: 1400 },
  { name: 'Annapurna Circuit', difficulty: 'hard', days: 18, interests: ['mountains', 'diversity'], altitude: '5,416m', price: 1200 },
  { name: 'Mardi Himal', difficulty: 'moderate', days: 7, interests: ['mountains', 'offbeat'], altitude: '4,500m', price: 600 },
  { name: 'Langtang Valley', difficulty: 'moderate', days: 10, interests: ['culture', 'mountains'], altitude: '3,870m', price: 700 },
  { name: 'Poon Hill', difficulty: 'easy', days: 4, interests: ['sunrise', 'culture'], altitude: '3,210m', price: 350 },
  { name: 'Upper Mustang', difficulty: 'moderate', days: 14, interests: ['culture', 'offbeat', 'diversity'], altitude: '3,840m', price: 1600 },
  { name: 'Ghorepani Loop', difficulty: 'easy', days: 5, interests: ['mountains', 'sunrise'], altitude: '2,874m', price: 400 },
  { name: 'Manaslu Circuit', difficulty: 'hard', days: 16, interests: ['mountains', 'offbeat'], altitude: '5,106m', price: 1500 },
];

const ItineraryPlanner = () => {
  const { t, convertPrice } = useSettings();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({ difficulty: '', duration: '', interests: [] });
  const [results, setResults] = useState(null);

  const selectOption = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const toggleInterest = (interest) => {
    setAnswers(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate results
      const filtered = treks.filter(trek => {
        const diffMatch = !answers.difficulty || trek.difficulty === answers.difficulty;
        const daysMatch = !answers.duration || (
          answers.duration === 'short' ? trek.days <= 7 :
          answers.duration === 'medium' ? trek.days > 7 && trek.days <= 14 :
          trek.days > 14
        );
        return diffMatch && daysMatch;
      });
      setResults(filtered.length > 0 ? filtered : treks.slice(0, 3));
    }
  };

  const prevStep = () => {
    if (results) { setResults(null); return; }
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({ difficulty: '', duration: '', interests: [] });
    setResults(null);
  };

  const handleBook = (trek) => {
    const message = `Hi! The Itinerary Planner recommended *${trek.name}* (${trek.days} days, ${convertPrice(trek.price)}). I'd like to book this trek!`;
    window.open(`https://wa.me/9779801234567?text=${encodeURIComponent(message)}`, '_blank');
  };

  const OptionButton = ({ selected, onClick, children }) => (
    <button
      onClick={onClick}
      className={`px-6 py-4 rounded-xl border-2 font-sans text-sm font-semibold transition-all text-left ${
        selected 
          ? 'border-peakGreen bg-peakGreen/10 text-peakGreen dark:text-peakGreen' 
          : 'border-black/10 dark:border-white/10 hover:border-peakGreen/50 text-peakDeep dark:text-peakWhite'
      }`}
    >
      {children}
    </button>
  );

  return (
    <section className="py-24 md:py-32 px-6 md:px-16 w-full bg-gray-50 dark:bg-peakDeep/80 transition-colors">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-peakDeep dark:text-peakWhite mb-4">
            Plan Your Trek
          </h2>
          <p className="font-sans text-peakDeep/60 dark:text-peakWhite/60 text-base md:text-lg">
            Answer 3 quick questions and we'll find your perfect Himalayan adventure.
          </p>
        </div>

        {/* Progress dots */}
        {!results && (
          <div className="flex justify-center gap-2 mb-10">
            {steps.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-8 bg-peakGreen' : i < currentStep ? 'w-4 bg-peakGreen/50' : 'w-4 bg-black/10 dark:bg-white/10'}`}></div>
            ))}
          </div>
        )}

        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-8 md:p-12">
          
          {/* Step 1: Difficulty */}
          {!results && currentStep === 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Gauge size={22} className="text-peakGreen" />
                <h3 className="font-display font-bold text-xl text-peakDeep dark:text-peakWhite">What's your fitness level?</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <OptionButton selected={answers.difficulty === 'easy'} onClick={() => selectOption('difficulty', 'easy')}>
                  <div className="flex items-center gap-2 mb-1"><Footprints size={18} className="text-peakGreen" /> Easy</div>
                  <span className="font-normal text-xs opacity-60">Scenic walks, 3-5 hrs/day</span>
                </OptionButton>
                <OptionButton selected={answers.difficulty === 'moderate'} onClick={() => selectOption('difficulty', 'moderate')}>
                  <div className="flex items-center gap-2 mb-1"><TrendingUp size={18} className="text-peakGreen" /> Moderate</div>
                  <span className="font-normal text-xs opacity-60">Challenging trails, 5-7 hrs/day</span>
                </OptionButton>
                <OptionButton selected={answers.difficulty === 'hard'} onClick={() => selectOption('difficulty', 'hard')}>
                  <div className="flex items-center gap-2 mb-1"><Mountain size={18} className="text-peakGreen" /> Hard</div>
                  <span className="font-normal text-xs opacity-60">High altitude, 7+ hrs/day</span>
                </OptionButton>
              </div>
            </div>
          )}

          {/* Step 2: Duration */}
          {!results && currentStep === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <CalendarDays size={22} className="text-peakGreen" />
                <h3 className="font-display font-bold text-xl text-peakDeep dark:text-peakWhite">How many days do you have?</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <OptionButton selected={answers.duration === 'short'} onClick={() => selectOption('duration', 'short')}>
                  <div className="flex items-center gap-2 mb-1"><Timer size={18} className="text-peakGreen" /> Under 7 days</div>
                  <span className="font-normal text-xs opacity-60">Quick adventures</span>
                </OptionButton>
                <OptionButton selected={answers.duration === 'medium'} onClick={() => selectOption('duration', 'medium')}>
                  <div className="flex items-center gap-2 mb-1"><Clock size={18} className="text-peakGreen" /> 7–14 days</div>
                  <span className="font-normal text-xs opacity-60">Classic treks</span>
                </OptionButton>
                <OptionButton selected={answers.duration === 'long'} onClick={() => selectOption('duration', 'long')}>
                  <div className="flex items-center gap-2 mb-1"><CalendarRange size={18} className="text-peakGreen" /> 14+ days</div>
                  <span className="font-normal text-xs opacity-60">Epic expeditions</span>
                </OptionButton>
              </div>
            </div>
          )}

          {/* Step 3: Interests */}
          {!results && currentStep === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Mountain size={22} className="text-peakGreen" />
                <h3 className="font-display font-bold text-xl text-peakDeep dark:text-peakWhite">What interests you most?</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {['mountains', 'culture', 'sunrise', 'offbeat', 'diversity'].map(interest => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all capitalize ${
                      answers.interests.includes(interest)
                        ? 'bg-peakGreen text-white'
                        : 'bg-black/5 dark:bg-white/10 text-peakDeep dark:text-peakWhite hover:bg-peakGreen/10'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {results && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle size={22} className="text-peakGreen" />
                <h3 className="font-display font-bold text-xl text-peakDeep dark:text-peakWhite">Your recommended treks</h3>
              </div>
              <div className="flex flex-col gap-4">
                {results.map((trek, i) => (
                  <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-black/5 dark:border-white/10 hover:border-peakGreen/30 transition-colors">
                    <div>
                      <h4 className="font-display font-bold text-lg text-peakDeep dark:text-peakWhite">{trek.name}</h4>
                      <p className="font-sans text-sm text-peakDeep/60 dark:text-peakWhite/60">
                        {trek.days} days · {trek.altitude} · <span className="capitalize">{trek.difficulty}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-sans font-bold text-peakDeep dark:text-peakWhite">{convertPrice(trek.price)}</span>
                      <button onClick={() => handleBook(trek)} className="bg-peakGreen text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-peakGreen/90 transition-colors flex items-center gap-2">
                        Book <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-black/5 dark:border-white/10">
            <button 
              onClick={currentStep === 0 && !results ? undefined : prevStep} 
              className={`flex items-center gap-2 font-sans text-sm font-semibold transition-colors ${currentStep === 0 && !results ? 'opacity-30 cursor-not-allowed' : 'hover:text-peakGreen'}`}
              disabled={currentStep === 0 && !results}
            >
              <ArrowLeft size={16} /> Back
            </button>
            {results ? (
              <button onClick={reset} className="font-sans text-sm font-semibold text-peakGreen hover:underline">
                Start Over
              </button>
            ) : (
              <button 
                onClick={nextStep} 
                className="bg-peakGreen text-white px-6 py-2.5 rounded-full font-sans text-sm font-bold flex items-center gap-2 hover:bg-peakGreen/90 transition-colors"
              >
                {currentStep === steps.length - 1 ? 'Find Treks' : 'Next'} <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItineraryPlanner;

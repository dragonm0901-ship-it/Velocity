import React, { useState } from 'react';

const TrekkingPlanner = () => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    difficulty: '',
    duration: '',
    budget: ''
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSelect = (category, value) => {
    setSelections({ ...selections, [category]: value });
  };

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <div className="flex flex-col gap-6 animate-fadeIn">
            <h3 className="font-drama text-4xl text-richBlue italic mb-2">Select Difficulty</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Easy', 'Moderate', 'Challenging'].map((level) => (
                <button
                  key={level}
                  onClick={() => handleSelect('difficulty', level)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 font-sans font-semibold tracking-wide ${
                    selections.difficulty === level
                      ? 'border-forestGreen bg-forestGreen/10 text-forestGreen'
                      : 'border-richBlue/10 bg-offWhite text-richBlue hover:border-richBlue/30'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-6 animate-fadeIn">
            <h3 className="font-drama text-4xl text-richBlue italic mb-2">Duration (Days)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['< 7 Days', '7-14 Days', '> 14 Days'].map((duration) => (
                <button
                  key={duration}
                  onClick={() => handleSelect('duration', duration)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 font-sans font-semibold tracking-wide ${
                    selections.duration === duration
                      ? 'border-forestGreen bg-forestGreen/10 text-forestGreen'
                      : 'border-richBlue/10 bg-offWhite text-richBlue hover:border-richBlue/30'
                  }`}
                >
                  {duration}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-6 animate-fadeIn">
            <h3 className="font-drama text-4xl text-richBlue italic mb-2">Estimated Budget</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Economy', 'Standard', 'Luxury'].map((budget) => (
                <button
                  key={budget}
                  onClick={() => handleSelect('budget', budget)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 font-sans font-semibold tracking-wide ${
                    selections.budget === budget
                      ? 'border-forestGreen bg-forestGreen/10 text-forestGreen'
                      : 'border-richBlue/10 bg-offWhite text-richBlue hover:border-richBlue/30'
                  }`}
                >
                  {budget}
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col items-center gap-6 animate-fadeIn text-center">
             <div className="w-20 h-20 rounded-full bg-forestGreen/20 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-forestGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
             </div>
             <h3 className="font-drama text-4xl text-richBlue italic mb-2">Curated Just For You</h3>
             <p className="font-sans text-richBlue/70 max-w-md">Based on your selections ({selections.difficulty}, {selections.duration}, {selections.budget}), we recommend the <strong>Annapurna Base Camp Trek</strong>.</p>
             <button className="mt-4 bg-softRed text-pureWhite px-8 py-4 rounded-full font-sans font-semibold tracking-wide uppercase hover:bg-softRed/90 transition-colors shadow-lg">
                View Itinerary
             </button>
          </div>
        )
      default:
        return null;
    }
  };

  return (
    <section id="planner" className="py-32 px-8 w-full bg-offWhite flex justify-center">
      <div className="w-full max-w-4xl bg-pureWhite rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

        {/* Progress Sidebar */}
        <div className="w-full md:w-1/3 bg-richBlue p-10 flex flex-col justify-between text-pureWhite">
           <div>
             <h2 className="font-sans font-bold text-2xl mb-8 tracking-wide">Dynamic Planner</h2>
             <p className="font-sans text-sm text-pureWhite/70 mb-12">Let us curate the perfect Himalayan experience based on your preferences.</p>

             <div className="space-y-6">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                      step >= num ? 'bg-forestGreen text-pureWhite' : 'bg-pureWhite/20 text-pureWhite/50'
                    }`}>
                      {num}
                    </div>
                    <span className={`font-sans text-sm tracking-wide ${step >= num ? 'text-pureWhite' : 'text-pureWhite/50'}`}>
                      {num === 1 ? 'Difficulty' : num === 2 ? 'Duration' : 'Budget'}
                    </span>
                  </div>
                ))}
             </div>
           </div>
        </div>

        {/* Content Area */}
        <div className="w-full md:w-2/3 p-10 md:p-16 flex flex-col justify-between">
           <div className="min-h-[250px] flex flex-col justify-center">
             {renderStepContent()}
           </div>

           <div className="mt-12 flex justify-between items-center pt-8 border-t border-richBlue/10">
              {step > 1 && step < 4 ? (
                <button onClick={prevStep} className="font-sans font-semibold text-richBlue/60 hover:text-richBlue transition-colors uppercase tracking-wider text-sm">
                  Back
                </button>
              ) : <div></div>}

              {step < 3 ? (
                 <button
                  onClick={nextStep}
                  disabled={
                    (step === 1 && !selections.difficulty) ||
                    (step === 2 && !selections.duration)
                  }
                  className="bg-richBlue text-pureWhite px-8 py-3 rounded-full font-sans font-semibold uppercase tracking-wider text-sm hover:bg-richBlue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                 >
                   Next Step
                 </button>
              ) : step === 3 ? (
                 <button
                  onClick={nextStep}
                  disabled={!selections.budget}
                  className="bg-forestGreen text-pureWhite px-8 py-3 rounded-full font-sans font-semibold uppercase tracking-wider text-sm hover:bg-forestGreen/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                 >
                   Generate Plan
                 </button>
              ) : (
                 <button onClick={() => { setStep(1); setSelections({difficulty:'', duration:'', budget:''})}} className="font-sans font-semibold text-richBlue/60 hover:text-richBlue transition-colors uppercase tracking-wider text-sm">
                   Start Over
                 </button>
              )}
           </div>
        </div>

      </div>
    </section>
  );
};

export default TrekkingPlanner;

import React, { useState } from 'react';

const DynamicItineraryBuilder = () => {
  const [days, setDays] = useState([
    { id: 1, name: 'Arrival in Kathmandu', cost: 100, isRest: true },
    { id: 2, name: 'Drive to Pokhara', cost: 50, isRest: false },
    { id: 3, name: 'Trek to Tikhedhunga', cost: 80, isRest: false },
  ]);

  const [availableExtras, setAvailableExtras] = useState([
    { id: 4, name: 'Rest Day in Manang', cost: 120, isRest: true },
    { id: 5, name: 'Helicopter Return', cost: 1500, isRest: false },
    { id: 6, name: 'Extra Porter', cost: 200, isRest: false },
  ]);

  const totalCost = days.reduce((sum, day) => sum + day.cost, 0);

  const handleAdd = (extra) => {
    setDays([...days, extra]);
    setAvailableExtras(availableExtras.filter(e => e.id !== extra.id));
  };

  const handleRemove = (dayToRemove) => {
    if (days.length <= 1) return; // Prevent removing last item
    setDays(days.filter(d => d.id !== dayToRemove.id));
    setAvailableExtras([...availableExtras, dayToRemove]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-16 p-8 bg-offWhite rounded-3xl border border-richBlue/10 shadow-lg font-sans">
      <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-richBlue mb-2">Dynamic Itinerary Builder</h2>
          <p className="text-richBlue/70 text-sm">Drag and drop or click to add side-trips and rest days.</p>
        </div>
        <div className="bg-pureWhite p-4 rounded-xl shadow border border-richBlue/5 text-center min-w-[200px]">
          <div className="text-[10px] font-bold text-richBlue/50 uppercase tracking-widest mb-1">Total Estimated Cost</div>
          <div className="text-3xl font-bold text-softRed">${totalCost}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-richBlue uppercase tracking-widest border-b border-richBlue/10 pb-2">Your Itinerary ({days.length} Days)</h3>
          {days.map((day, index) => (
            <div key={day.id} className="flex items-center justify-between bg-pureWhite p-4 rounded-xl shadow-sm border border-richBlue/5 hover:border-softRed/50 transition-colors cursor-move">
              <div className="flex items-center gap-4">
                <span className="text-richBlue/30 font-bold text-xl w-6">{(index + 1).toString().padStart(2, '0')}</span>
                <span className="text-richBlue font-semibold text-sm">{day.name}</span>
                {day.isRest && <span className="bg-softRed/10 text-softRed px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest">Rest</span>}
              </div>
              <button
                onClick={() => handleRemove(day)}
                className="text-softRed/50 hover:text-softRed hover:bg-softRed/10 p-2 rounded-full transition-colors"
                title="Remove"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-richBlue uppercase tracking-widest border-b border-richBlue/10 pb-2">Available Extras</h3>
          {availableExtras.length === 0 ? (
            <div className="text-center p-8 border-2 border-dashed border-richBlue/10 rounded-xl text-richBlue/40 text-sm italic">All available extras added.</div>
          ) : (
            availableExtras.map((extra) => (
              <div key={extra.id} className="flex items-center justify-between bg-richBlue/5 p-4 rounded-xl hover:bg-richBlue/10 transition-colors">
                <div className="flex flex-col">
                  <span className="text-richBlue font-semibold text-sm">{extra.name}</span>
                  <span className="text-richBlue/50 text-xs">+ ${extra.cost}</span>
                </div>
                <button
                  onClick={() => handleAdd(extra)}
                  className="bg-richBlue text-pureWhite px-4 py-2 rounded-full text-xs uppercase font-bold tracking-widest hover:bg-richBlue/90 transition-colors"
                >
                  Add
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicItineraryBuilder;

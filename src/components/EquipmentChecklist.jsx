import React, { useState } from 'react';

const EquipmentChecklist = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Down Jacket (-15°C)', category: 'Clothing', have: false, price: 15 },
    { id: 2, name: 'Sleeping Bag (-20°C)', category: 'Gear', have: true, price: 20 },
    { id: 3, name: 'Trekking Poles', category: 'Gear', have: false, price: 5 },
    { id: 4, name: 'Water Purification Tablets', category: 'Health', have: false, price: 2 },
    { id: 5, name: 'Headlamp', category: 'Gear', have: false, price: 3 },
  ]);

  const toggleHave = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, have: !item.have } : item));
  };

  const handleRent = () => {
    alert('Item added to rental cart!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-16 p-8 bg-pureWhite rounded-3xl border border-richBlue/10 shadow-lg font-sans">
      <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-richBlue mb-2">Interactive Equipment Checklist</h2>
          <p className="text-richBlue/70 text-sm">Check off what you have, and easily rent the rest from local shops.</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {items.map(item => (
          <div key={item.id} className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${item.have ? 'bg-offWhite border-richBlue/5 opacity-60' : 'bg-pureWhite border-softRed/20 shadow-sm'}`}>
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={item.have}
                onChange={() => toggleHave(item.id)}
                className="w-5 h-5 text-softRed rounded focus:ring-softRed focus:ring-2 accent-softRed cursor-pointer"
              />
              <div className="flex flex-col">
                <span className={`font-semibold ${item.have ? 'line-through text-richBlue/50' : 'text-richBlue'}`}>{item.name}</span>
                <span className="text-[10px] uppercase tracking-widest text-richBlue/40 font-bold">{item.category}</span>
              </div>
            </div>
            {!item.have && (
              <button
                onClick={() => handleRent(item.id)}
                className="bg-softRed/10 text-softRed hover:bg-softRed hover:text-pureWhite px-4 py-2 rounded-full text-xs uppercase font-bold tracking-widest transition-colors flex items-center gap-2"
              >
                Rent <span className="opacity-50 font-mono">${item.price}/day</span>
              </button>
            )}
            {item.have && (
              <span className="text-xs font-bold text-richBlue/40 uppercase tracking-widest px-4 py-2">Packed</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentChecklist;

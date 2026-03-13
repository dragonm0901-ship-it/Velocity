import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const rates = {
  USD: 133.50,
  EUR: 145.20,
  GBP: 169.80,
  AUD: 88.10,
  CAD: 98.40,
  CNY: 18.50,
  JPY: 0.90
};

const CurrencyExchange = () => {
  const { currency: globalCurrency } = useAppContext();
  const [currentIdx, setCurrentIdx] = useState(0);
  const currencies = Object.keys(rates);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % currencies.length);
    }, 4000); // Change currency every 4 seconds
    return () => clearInterval(interval);
  }, [currencies.length]);

  const displayCurrency = globalCurrency || currencies[currentIdx];
  const rate = rates[displayCurrency] || rates['USD'];


  return (
    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-pureWhite bg-richBlue/80 px-4 py-1.5 rounded-full border border-pureWhite/20 shadow-sm backdrop-blur-md transition-all">
      <span className="text-softRed">LIVE</span>
      <span className="opacity-60">|</span>
      <span>1 {displayCurrency}</span>
      <span className="opacity-60">=</span>
      <span className="text-pureWhite">Rs. {rate.toFixed(2)}</span>
    </div>
  );
};

export default CurrencyExchange;

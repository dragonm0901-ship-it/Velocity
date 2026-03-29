import React, { useState, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';
import { CalendarDays, Mountain, Gauge, ArrowRight, ArrowLeft, CheckCircle, Footprints, TrendingUp, Clock, Timer, CalendarRange, Download, Users, Bed, UtensilsCrossed, Backpack, Map } from 'lucide-react';
import ElevationProfile from './ElevationProfile';

const steps = ['difficulty', 'duration', 'interests', 'accommodation', 'extras'];

import { treks, crowdColors, crowdLabels } from '../data/treks';

const accommodations = [
  { id: 'teahouse', label: 'Tea House Lodge', desc: 'Basic but cozy mountain lodges', priceAdd: 0 },
  { id: 'camping', label: 'Camping Trek', desc: 'Full camping setup with crew', priceAdd: 300 },
  { id: 'luxury', label: 'Luxury Lodge', desc: 'Best available rooms & hot showers', priceAdd: 600 },
];

const extras = [
  { id: 'porter', label: 'Porter Service', price: 200 },
  { id: 'insurance', label: 'Helicopter Rescue Insurance', price: 150 },
  { id: 'photo', label: 'Professional Photography', price: 350 },
  { id: 'gear', label: 'Full Gear Rental Package', price: 120 },
];

const OptionButton = ({ selected, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-6 py-4 rounded-xl border-2 font-sans text-sm font-semibold transition-all text-left ${
      selected ? 'border-peakGreen bg-peakGreen/10 text-peakGreen' : 'border-black/10 dark:border-white/10 hover:border-peakGreen/50 text-peakDeep dark:text-peakWhite'
    }`}
  >
    {children}
  </button>
);

const ItineraryPlanner = () => {
  const { convertPrice } = useSettings();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    difficulty: '', duration: '', interests: [],
    accommodation: 'teahouse', extras: [],
  });
  const [results, setResults] = useState(null);
  const [selectedTrek, setSelectedTrek] = useState(null);
  const itineraryRef = useRef(null);

  const selectOption = (key, value) => setAnswers(prev => ({ ...prev, [key]: value }));
  const toggleInterest = (interest) => {
    setAnswers(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) ? prev.interests.filter(i => i !== interest) : [...prev.interests, interest]
    }));
  };
  const toggleExtra = (id) => {
    setAnswers(prev => ({
      ...prev,
      extras: prev.extras.includes(id) ? prev.extras.filter(e => e !== id) : [...prev.extras, id]
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
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
    if (selectedTrek) { setSelectedTrek(null); return; }
    if (results) { setResults(null); return; }
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({ difficulty: '', duration: '', interests: [], accommodation: 'teahouse', extras: [] });
    setResults(null);
    setSelectedTrek(null);
  };

  const getTotalPrice = (trek) => {
    const accPrice = accommodations.find(a => a.id === answers.accommodation)?.priceAdd || 0;
    const extrasPrice = answers.extras.reduce((sum, id) => sum + (extras.find(e => e.id === id)?.price || 0), 0);
    return trek.price + accPrice + extrasPrice;
  };

  const generatePDF = async (trek) => {
    try {
      const { default: jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      const total = getTotalPrice(trek);
      const acc = accommodations.find(a => a.id === answers.accommodation);

      // Utility to strip ANY non-ASCII character that corrupts jsPDF's internal byte stream
      const clean = (str) => String(str || '').replace(/[^\x20-\x7E]/g, '');

      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(24);
      doc.setTextColor(15, 23, 42);
      doc.text(clean('PROJECT PEAK'), 20, 25);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100);
      doc.text(clean('Detailed Trek Itinerary & Quote'), 20, 33);

      // Trek info
      doc.setDrawColor(22, 101, 52);
      doc.setLineWidth(0.5);
      doc.line(20, 38, 190, 38);

      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(22, 101, 52);
      doc.text(clean(trek.name), 20, 50);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80);
      const diffStr = trek.difficulty ? trek.difficulty.charAt(0).toUpperCase() + trek.difficulty.slice(1) : '';
      doc.text(clean(`${trek.days} Days  |  Max Alt: ${trek.altitude}  |  Difficulty: ${diffStr}`), 20, 58);
      
      const accLabel = acc ? acc.label : 'None';
      doc.text(clean(`Base: ${convertPrice(trek.price)}  |  Accomm: ${accLabel}  |  Total: ${convertPrice(total)}`), 20, 65);

      if (answers.extras && answers.extras.length > 0) {
        const extNames = answers.extras.map(id => extras.find(e => e.id === id)?.label).filter(Boolean).join(', ');
        doc.text(clean(`Add-ons Included: ${extNames}`), 20, 72);
      }

      let y = (answers.extras && answers.extras.length > 0) ? 85 : 80;

      // Mount Elevation Profile Chart
      const svgEl = document.getElementById('elevation-profile-svg');
      if (svgEl) {
        try {
          const svgImage = await new Promise((resolve) => {
            const clone = svgEl.cloneNode(true);
            clone.querySelectorAll('text').forEach(t => {
              t.setAttribute('fill', '#64748b');
              t.setAttribute('font-family', 'helvetica, sans-serif');
            });
            const svgData = new XMLSerializer().serializeToString(clone);
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              canvas.width = 800;
              canvas.height = 250;
              const ctx = canvas.getContext('2d');
              ctx.fillStyle = "#f8fafc"; // Very slight off-white for visual depth
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0, 800, 250);
              resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = () => resolve(null);
            img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
          });

          if (svgImage) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(13);
            doc.setTextColor(15, 23, 42);
            doc.text(clean('Elevation Profile'), 20, y);
            y += 6;
            
            // Render perfectly onto a 170x53 rectangle inside standard A4 
            doc.addImage(svgImage, 'PNG', 20, y, 170, 53);
            y += 65; 
          }
        } catch {
          console.warn('Silent fallback: Could not mount svg to PDF context.');
        }
      }

      // Check page overrun
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      // Itinerary table
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text(clean('Full Day-by-Day Itinerary'), 20, y);
      y += 10;

      // Table header
      doc.setFillColor(22, 101, 52);
      doc.setTextColor(255);
      doc.setFontSize(9);
      doc.rect(20, y - 5, 170, 8, 'F');
      doc.text(clean('DAY'), 24, y);
      doc.text(clean('LOCATION'), 42, y);
      doc.text(clean('ALT'), 120, y);
      doc.text(clean('DESCRIPTION'), 138, y);
      y += 8;

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60);

      const chunkText = (text, maxLength) => {
        if (!text) return [''];
        const words = clean(text).split(' ');
        const lines = [];
        let currentLine = '';
        words.forEach(word => {
          if ((currentLine + word).length > maxLength) {
            if (currentLine.trim()) lines.push(currentLine.trim());
            currentLine = word + ' ';
          } else {
            currentLine += word + ' ';
          }
        });
        if (currentLine.trim()) lines.push(currentLine.trim());
        return lines.length > 0 ? lines : [''];
      };

      trek.itinerary.forEach((day) => {
        const placeLines = chunkText(day.place, 35);
        const descLines = chunkText(day.desc, 38);
        
        const maxLines = Math.max(placeLines.length, descLines.length);
        const rowHeight = (maxLines * 5) + 2;

        if (y + rowHeight > 270) {
          doc.addPage();
          y = 25;
        }

        const bg = day.day % 2 === 0;
        if (bg) {
          doc.setFillColor(245, 247, 250);
          doc.rect(20, y - 4, 170, rowHeight, 'F');
        }

        doc.setFontSize(8);
        doc.text(clean(day.day), 26, y);
        
        doc.setFont('helvetica', 'bold');
        placeLines.forEach((line, idx) => {
          doc.text(line, 42, y + (idx * 5));
        });

        doc.setFont('helvetica', 'normal');
        doc.text(clean(day.alt), 122, y);
        
        descLines.forEach((line, idx) => {
          doc.text(line, 138, y + (idx * 5));
        });

        y += rowHeight;
      });

      // Footer
      y = Math.max(y + 10, 250);
      if (y > 270) { doc.addPage(); y = 25; }
      doc.setDrawColor(22, 101, 52);
      doc.line(20, y, 190, y);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(clean('Generated by Project Peak | projectpeak.com | +977 1 4411123'), 20, y + 7);

      const now = new Date();
      const dateStr = now.toISOString().split('T')[0];
      const filename = trek.name ? clean(trek.name).replace(/[^a-zA-Z0-9]/g, '_') : 'Trek';
      doc.save(`${filename}_Detailed_Itinerary_${dateStr}.pdf`);
    } catch (err) {
      console.error("PDF Generation Error: ", err);
      alert("Error generating PDF: " + err.message);
    }
  };

  return (
    <section id="itinerary-planner" className="py-16 md:py-32 px-4 sm:px-6 md:px-16 w-full bg-gray-50 dark:bg-peakDeep/80 transition-colors">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-peakDeep dark:text-peakWhite mb-4">Plan Your Trek</h2>
          <p className="font-sans text-peakDeep/60 dark:text-peakWhite/60 text-base md:text-lg">
            Answer a few questions, get a detailed day-by-day itinerary, and download it as PDF.
          </p>
        </div>

        {/* Progress */}
        {!results && !selectedTrek && (
          <div className="flex justify-center gap-2 mb-10">
            {steps.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-8 bg-peakGreen' : i < currentStep ? 'w-4 bg-peakGreen/50' : 'w-4 bg-black/10 dark:bg-white/10'}`}></div>
            ))}
          </div>
        )}

        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl md:rounded-3xl p-5 sm:p-8 md:p-12 overflow-x-hidden">

          {/* Step 1: Difficulty */}
          {!results && !selectedTrek && currentStep === 0 && (
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
          {!results && !selectedTrek && currentStep === 1 && (
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
          {!results && !selectedTrek && currentStep === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Mountain size={22} className="text-peakGreen" />
                <h3 className="font-display font-bold text-xl text-peakDeep dark:text-peakWhite">What interests you most?</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {['mountains', 'culture', 'sunrise', 'offbeat', 'diversity'].map(interest => (
                  <button key={interest} onClick={() => toggleInterest(interest)}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all capitalize ${answers.interests.includes(interest) ? 'bg-peakGreen text-white' : 'bg-black/5 dark:bg-white/10 text-peakDeep dark:text-peakWhite hover:bg-peakGreen/10'}`}>
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Accommodation */}
          {!results && !selectedTrek && currentStep === 3 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Bed size={22} className="text-peakGreen" />
                <h3 className="font-display font-bold text-xl text-peakDeep dark:text-peakWhite">Choose your stay</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {accommodations.map(acc => (
                  <OptionButton key={acc.id} selected={answers.accommodation === acc.id} onClick={() => selectOption('accommodation', acc.id)}>
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <div className="font-semibold">{acc.label}</div>
                        <span className="font-normal text-xs opacity-60">{acc.desc}</span>
                      </div>
                      {acc.priceAdd > 0 && <span className="text-peakGreen font-bold text-sm">+{convertPrice(acc.priceAdd)}</span>}
                    </div>
                  </OptionButton>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Extras */}
          {!results && !selectedTrek && currentStep === 4 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Backpack size={22} className="text-peakGreen" />
                <h3 className="font-display font-bold text-xl text-peakDeep dark:text-peakWhite">Add-ons (optional)</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {extras.map(extra => (
                  <button key={extra.id} onClick={() => toggleExtra(extra.id)}
                    className={`px-5 py-4 rounded-xl border-2 font-sans text-sm text-left transition-all ${answers.extras.includes(extra.id) ? 'border-peakGreen bg-peakGreen/10' : 'border-black/10 dark:border-white/10 hover:border-peakGreen/50'}`}>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-peakDeep dark:text-peakWhite">{extra.label}</span>
                      <span className="text-peakGreen font-bold text-xs">+{convertPrice(extra.price)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {results && !selectedTrek && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle size={22} className="text-peakGreen" />
                <h3 className="font-display font-bold text-xl text-peakDeep dark:text-peakWhite">Your recommended treks</h3>
              </div>
              <div className="flex flex-col gap-4">
                {results.map((trek, i) => (
                  <div key={i} className="p-5 rounded-2xl border border-black/5 dark:border-white/10 hover:border-peakGreen/30 transition-colors">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-display font-bold text-lg text-peakDeep dark:text-peakWhite">{trek.name}</h4>
                          <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold" style={{ color: crowdColors[trek.crowd] }}>
                            <span className="w-2 h-2 rounded-full" style={{ background: crowdColors[trek.crowd] }}></span>
                            {crowdLabels[trek.crowd]}
                          </span>
                        </div>
                        <p className="font-sans text-sm text-peakDeep/60 dark:text-peakWhite/60">
                          {trek.days} days · {trek.altitude} · <span className="capitalize">{trek.difficulty}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-sans font-bold text-peakDeep dark:text-peakWhite">{convertPrice(getTotalPrice(trek))}</span>
                        <button onClick={() => setSelectedTrek(trek)} className="bg-peakGreen text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-peakGreen/90 transition-colors flex items-center gap-2">
                          View Itinerary <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Itinerary View */}
          {selectedTrek && (
            <div ref={itineraryRef}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-display font-bold text-xl text-peakDeep dark:text-peakWhite">{selectedTrek.name}</h3>
                    <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold" style={{ color: crowdColors[selectedTrek.crowd] }}>
                      <Users size={12} />
                      {crowdLabels[selectedTrek.crowd]}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-peakDeep/50 dark:text-peakWhite/50">
                    {selectedTrek.days} days · {selectedTrek.altitude} · {accommodations.find(a => a.id === answers.accommodation)?.label}
                  </p>
                </div>
                <button onClick={() => generatePDF(selectedTrek)} className="flex items-center gap-2 bg-peakDeep dark:bg-peakWhite text-white dark:text-peakDeep px-5 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity">
                  <Download size={14} /> Download PDF
                </button>
              </div>

              {/* Price breakdown */}
              <div className="bg-peakGreen/5 dark:bg-peakGreen/10 rounded-xl p-4 mb-6 font-sans text-sm">
                <div className="flex justify-between text-peakDeep/70 dark:text-peakWhite/70 mb-1">
                  <span>Base trek price</span><span>{convertPrice(selectedTrek.price)}</span>
                </div>
                {accommodations.find(a => a.id === answers.accommodation)?.priceAdd > 0 && (
                  <div className="flex justify-between text-peakDeep/70 dark:text-peakWhite/70 mb-1">
                    <span>{accommodations.find(a => a.id === answers.accommodation)?.label}</span>
                    <span>+{convertPrice(accommodations.find(a => a.id === answers.accommodation)?.priceAdd)}</span>
                  </div>
                )}
                {answers.extras.map(id => {
                  const ex = extras.find(e => e.id === id);
                  return ex ? (
                    <div key={id} className="flex justify-between text-peakDeep/70 dark:text-peakWhite/70 mb-1">
                      <span>{ex.label}</span><span>+{convertPrice(ex.price)}</span>
                    </div>
                  ) : null;
                })}
                <div className="flex justify-between font-bold text-peakDeep dark:text-peakWhite pt-2 border-t border-peakGreen/20 mt-2">
                  <span>Total</span><span>{convertPrice(getTotalPrice(selectedTrek))}</span>
                </div>
              </div>

              {/* Elevation Profile */}
              <ElevationProfile itinerary={selectedTrek.itinerary} />

              {/* Day-by-day */}
              <div className="flex flex-col gap-0">
                {selectedTrek.itinerary.map((day, i) => (
                  <div key={i} className="flex gap-4 group">
                    {/* Timeline */}
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full shrink-0 border-2 ${i === 0 ? 'bg-peakGreen border-peakGreen' : i === selectedTrek.itinerary.length - 1 ? 'bg-peakRed border-peakRed' : 'bg-white dark:bg-peakDark border-peakGreen'}`}></div>
                      {i < selectedTrek.itinerary.length - 1 && <div className="w-0.5 flex-1 bg-peakGreen/20"></div>}
                    </div>
                    {/* Content */}
                    <div className="pb-6">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-sans text-xs font-bold text-peakGreen uppercase tracking-wider">Day {day.day}</span>
                        <span className="font-sans text-[10px] text-peakDeep/40 dark:text-peakWhite/40">{day.alt}</span>
                      </div>
                      <h4 className="font-display font-bold text-base text-peakDeep dark:text-peakWhite mb-0.5">{day.place}</h4>
                      <p className="font-sans text-sm text-peakDeep/60 dark:text-peakWhite/60">{day.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Book CTA */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button onClick={() => generatePDF(selectedTrek)} className="flex-1 flex items-center justify-center gap-2 bg-peakDeep dark:bg-white/10 text-white px-6 py-3 rounded-full font-sans text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-opacity">
                  <Download size={16} /> Save as PDF
                </button>
                <button onClick={() => {
                  const msg = `Hi! I'd like to book the *${selectedTrek.name}* trek (${selectedTrek.days} days, ${convertPrice(getTotalPrice(selectedTrek))}, ${accommodations.find(a => a.id === answers.accommodation)?.label}). My itinerary is ready!`;
                  window.open(`https://wa.me/9779801234567?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
                }} className="flex-1 bg-peakGreen text-white px-6 py-3 rounded-full font-sans text-sm font-bold uppercase tracking-wider hover:bg-peakGreen/90 transition-colors text-center">
                  Book This Trek
                </button>
              </div>
            </div>
          )}

          {/* Navigation */}
          {!selectedTrek && (
            <div className="flex justify-between mt-8 pt-6 border-t border-black/5 dark:border-white/10">
              <button onClick={currentStep === 0 && !results ? undefined : prevStep}
                className={`flex items-center gap-2 font-sans text-sm font-semibold transition-colors ${currentStep === 0 && !results ? 'opacity-30 cursor-not-allowed' : 'hover:text-peakGreen'}`}
                disabled={currentStep === 0 && !results}>
                <ArrowLeft size={16} /> Back
              </button>
              {results ? (
                <button onClick={reset} className="font-sans text-sm font-semibold text-peakGreen hover:underline">Start Over</button>
              ) : (
                <button onClick={nextStep}
                  className="bg-peakGreen text-white px-6 py-2.5 rounded-full font-sans text-sm font-bold flex items-center gap-2 hover:bg-peakGreen/90 transition-colors">
                  {currentStep === steps.length - 1 ? 'Find Treks' : 'Next'} <ArrowRight size={16} />
                </button>
              )}
            </div>
          )}

          {selectedTrek && (
            <div className="flex justify-between mt-6 pt-4 border-t border-black/5 dark:border-white/10">
              <button onClick={prevStep} className="flex items-center gap-2 font-sans text-sm font-semibold hover:text-peakGreen transition-colors">
                <ArrowLeft size={16} /> Back to Results
              </button>
              <button onClick={reset} className="font-sans text-sm font-semibold text-peakGreen hover:underline">Start Over</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ItineraryPlanner;

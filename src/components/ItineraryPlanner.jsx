import React, { useState, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';
import { CalendarDays, Mountain, Gauge, ArrowRight, ArrowLeft, CheckCircle, Footprints, TrendingUp, Clock, Timer, CalendarRange, Download, Users, Bed, UtensilsCrossed, Backpack, Map } from 'lucide-react';
import jsPDF from 'jspdf';

const steps = ['difficulty', 'duration', 'interests', 'accommodation', 'extras'];

const treks = [
  {
    name: 'Everest Base Camp', difficulty: 'hard', days: 14, interests: ['mountains', 'culture'], altitude: '5,364m', price: 1400, crowd: 'red',
    itinerary: [
      { day: 1, place: 'Kathmandu', desc: 'Arrive and hotel check-in. Team briefing and gear check.', alt: '1,400m' },
      { day: 2, place: 'Kathmandu → Lukla → Phakding', desc: 'Scenic flight to Lukla. Trek to Phakding.', alt: '2,610m' },
      { day: 3, place: 'Phakding → Namche Bazaar', desc: 'Cross suspension bridges, climb to Namche.', alt: '3,440m' },
      { day: 4, place: 'Namche Bazaar', desc: 'Acclimatization day. Visit Sherpa museum and Everest View Hotel.', alt: '3,440m' },
      { day: 5, place: 'Namche → Tengboche', desc: 'Trek through rhododendron forests to Tengboche monastery.', alt: '3,860m' },
      { day: 6, place: 'Tengboche → Dingboche', desc: 'Descend to river, then climb to Dingboche.', alt: '4,410m' },
      { day: 7, place: 'Dingboche', desc: 'Acclimatization. Hike to Nangkartshang Peak.', alt: '4,410m' },
      { day: 8, place: 'Dingboche → Lobuche', desc: 'Pass Dughla and memorial cairns. Trek to Lobuche.', alt: '4,940m' },
      { day: 9, place: 'Lobuche → Gorak Shep → EBC', desc: 'Trek to Gorak Shep, then to Everest Base Camp!', alt: '5,364m' },
      { day: 10, place: 'Gorak Shep → Kala Patthar', desc: 'Pre-dawn hike for sunrise with panoramic Everest views.', alt: '5,545m' },
      { day: 11, place: 'Gorak Shep → Pheriche', desc: 'Descend through the valley to Pheriche.', alt: '4,240m' },
      { day: 12, place: 'Pheriche → Namche', desc: 'Long descent back to Namche Bazaar.', alt: '3,440m' },
      { day: 13, place: 'Namche → Lukla', desc: 'Final trek back to Lukla. Celebration dinner.', alt: '2,860m' },
      { day: 14, place: 'Lukla → Kathmandu', desc: 'Morning flight back to Kathmandu. Trip complete!', alt: '1,400m' },
    ]
  },
  {
    name: 'Annapurna Circuit', difficulty: 'hard', days: 18, interests: ['mountains', 'diversity'], altitude: '5,416m', price: 1200, crowd: 'yellow',
    itinerary: [
      { day: 1, place: 'Kathmandu → Besisahar', desc: 'Drive to Besisahar trailhead.', alt: '760m' },
      { day: 2, place: 'Besisahar → Bahundanda', desc: 'Trek through rice terraces and villages.', alt: '1,310m' },
      { day: 3, place: 'Bahundanda → Chamje', desc: 'Follow the Marsyangdi River valley.', alt: '1,410m' },
      { day: 4, place: 'Chamje → Dharapani', desc: 'Cross gorges and waterfalls.', alt: '1,860m' },
      { day: 5, place: 'Dharapani → Chame', desc: 'Enter the Manang district.', alt: '2,670m' },
      { day: 6, place: 'Chame → Upper Pisang', desc: 'First views of Annapurna II.', alt: '3,310m' },
      { day: 7, place: 'Upper Pisang → Manang', desc: 'Dramatic mountain scenery.', alt: '3,540m' },
      { day: 8, place: 'Manang', desc: 'Rest and acclimatize. Visit ice lakes.', alt: '3,540m' },
      { day: 9, place: 'Manang → Yak Kharka', desc: 'High altitude terrain begins.', alt: '4,018m' },
      { day: 10, place: 'Yak Kharka → Thorong Phedi', desc: 'Base camp for the pass crossing.', alt: '4,525m' },
      { day: 11, place: 'Thorong La Pass → Muktinath', desc: 'Cross the 5,416m pass! Descend to Muktinath.', alt: '3,760m' },
      { day: 12, place: 'Muktinath → Marpha', desc: 'Descend through apple orchards.', alt: '2,670m' },
      { day: 13, place: 'Marpha → Ghasa', desc: 'Kali Gandaki gorge trek.', alt: '2,010m' },
      { day: 14, place: 'Ghasa → Tatopani', desc: 'Hot springs village!', alt: '1,190m' },
      { day: 15, place: 'Tatopani → Ghorepani', desc: 'Steep climb through forests.', alt: '2,874m' },
      { day: 16, place: 'Ghorepani → Poon Hill → Tadapani', desc: 'Famous sunrise point.', alt: '2,630m' },
      { day: 17, place: 'Tadapani → Nayapul → Pokhara', desc: 'Descend to Nayapul, drive to Pokhara.', alt: '827m' },
      { day: 18, place: 'Pokhara → Kathmandu', desc: 'Drive or fly back to Kathmandu.', alt: '1,400m' },
    ]
  },
  {
    name: 'Mardi Himal', difficulty: 'moderate', days: 7, interests: ['mountains', 'offbeat'], altitude: '4,500m', price: 600, crowd: 'green',
    itinerary: [
      { day: 1, place: 'Pokhara → Kande → Pothana', desc: 'Drive to Kande, trek to Pothana village.', alt: '1,890m' },
      { day: 2, place: 'Pothana → Forest Camp', desc: 'Trek through dense rhododendron forest.', alt: '2,550m' },
      { day: 3, place: 'Forest Camp → Low Camp', desc: 'Enter the alpine ridge.', alt: '2,990m' },
      { day: 4, place: 'Low Camp → High Camp', desc: 'Stunning views of Machhapuchhre open up.', alt: '3,580m' },
      { day: 5, place: 'High Camp → Mardi Himal BC', desc: 'Summit day! Base camp at 4,500m.', alt: '4,500m' },
      { day: 6, place: 'Mardi Himal BC → Siding', desc: 'Descend via alternative route through villages.', alt: '1,750m' },
      { day: 7, place: 'Siding → Pokhara', desc: 'Short walk then drive to Pokhara.', alt: '827m' },
    ]
  },
  {
    name: 'Langtang Valley', difficulty: 'moderate', days: 10, interests: ['culture', 'mountains'], altitude: '3,870m', price: 700, crowd: 'green',
    itinerary: [
      { day: 1, place: 'Kathmandu → Syabrubesi', desc: 'Scenic drive along the Trishuli River.', alt: '1,550m' },
      { day: 2, place: 'Syabrubesi → Lama Hotel', desc: 'Trek through oak and rhododendron forests.', alt: '2,380m' },
      { day: 3, place: 'Lama Hotel → Langtang Village', desc: 'Follow the Langtang Khola upstream.', alt: '3,430m' },
      { day: 4, place: 'Langtang → Kyanjin Gompa', desc: 'Arrive at the ancient monastery.', alt: '3,870m' },
      { day: 5, place: 'Kyanjin Gompa', desc: 'Day hike to Tserko Ri or Kyanjin Ri for views.', alt: '3,870m' },
      { day: 6, place: 'Kyanjin → Lama Hotel', desc: 'Begin the descent.', alt: '2,380m' },
      { day: 7, place: 'Lama Hotel → Syabrubesi', desc: 'Complete the descent.', alt: '1,550m' },
      { day: 8, place: 'Syabrubesi → Kathmandu', desc: 'Drive back to Kathmandu.', alt: '1,400m' },
      { day: 9, place: 'Kathmandu', desc: 'Free day for shopping and sightseeing.', alt: '1,400m' },
      { day: 10, place: 'Departure', desc: 'Transfer to airport.', alt: '1,400m' },
    ]
  },
  {
    name: 'Poon Hill', difficulty: 'easy', days: 4, interests: ['sunrise', 'culture'], altitude: '3,210m', price: 350, crowd: 'yellow',
    itinerary: [
      { day: 1, place: 'Pokhara → Nayapul → Tikhedhunga', desc: 'Drive and short trek.', alt: '1,540m' },
      { day: 2, place: 'Tikhedhunga → Ghorepani', desc: 'Stone steps through villages and forests.', alt: '2,874m' },
      { day: 3, place: 'Poon Hill sunrise → Tadapani', desc: 'Pre-dawn hike for panoramic Annapurna views, then trek.', alt: '2,630m' },
      { day: 4, place: 'Tadapani → Ghandruk → Pokhara', desc: 'Descend to Ghandruk village, drive to Pokhara.', alt: '827m' },
    ]
  },
  {
    name: 'Upper Mustang', difficulty: 'moderate', days: 14, interests: ['culture', 'offbeat', 'diversity'], altitude: '3,840m', price: 1600, crowd: 'green',
    itinerary: [
      { day: 1, place: 'Kathmandu → Pokhara', desc: 'Fly or drive to lakeside city.', alt: '827m' },
      { day: 2, place: 'Pokhara → Jomsom → Kagbeni', desc: 'Fly to Jomsom, trek to medieval Kagbeni.', alt: '2,810m' },
      { day: 3, place: 'Kagbeni → Chele', desc: 'Enter restricted Upper Mustang zone.', alt: '3,050m' },
      { day: 4, place: 'Chele → Syangboche', desc: 'Trek through wind-carved canyons.', alt: '3,475m' },
      { day: 5, place: 'Syangboche → Ghami', desc: 'Largest village in Upper Mustang.', alt: '3,520m' },
      { day: 6, place: 'Ghami → Tsarang', desc: 'Visit ancient monastery ruins.', alt: '3,560m' },
      { day: 7, place: 'Tsarang → Lo Manthang', desc: 'Arrive at the walled kingdom!', alt: '3,840m' },
      { day: 8, place: 'Lo Manthang', desc: 'Explore caves, monasteries, and the royal palace.', alt: '3,840m' },
      { day: 9, place: 'Lo Manthang → Dhi', desc: 'Alternative return route through Dhi village.', alt: '3,360m' },
      { day: 10, place: 'Dhi → Yara → Tangge', desc: 'Remote villages and canyon trails.', alt: '3,240m' },
      { day: 11, place: 'Tangge → Chhusang', desc: 'Descend along the Kali Gandaki.', alt: '2,980m' },
      { day: 12, place: 'Chhusang → Jomsom', desc: 'Complete the loop back to Jomsom.', alt: '2,720m' },
      { day: 13, place: 'Jomsom → Pokhara', desc: 'Fly back to Pokhara.', alt: '827m' },
      { day: 14, place: 'Pokhara → Kathmandu', desc: 'Return to Kathmandu.', alt: '1,400m' },
    ]
  },
  {
    name: 'Ghorepani Loop', difficulty: 'easy', days: 5, interests: ['mountains', 'sunrise'], altitude: '2,874m', price: 400, crowd: 'yellow',
    itinerary: [
      { day: 1, place: 'Pokhara → Nayapul → Hile', desc: 'Drive and easy trek.', alt: '1,430m' },
      { day: 2, place: 'Hile → Ghorepani', desc: 'Gradual climb through forests.', alt: '2,874m' },
      { day: 3, place: 'Poon Hill → Tadapani', desc: 'Sunrise then trek through rhododendron.', alt: '2,630m' },
      { day: 4, place: 'Tadapani → Ghandruk', desc: 'Beautiful Gurung village.', alt: '1,940m' },
      { day: 5, place: 'Ghandruk → Nayapul → Pokhara', desc: 'Descend and drive back.', alt: '827m' },
    ]
  },
  {
    name: 'Manaslu Circuit', difficulty: 'hard', days: 16, interests: ['mountains', 'offbeat'], altitude: '5,106m', price: 1500, crowd: 'green',
    itinerary: [
      { day: 1, place: 'Kathmandu → Soti Khola', desc: 'Long drive to the trailhead.', alt: '700m' },
      { day: 2, place: 'Soti Khola → Machha Khola', desc: 'Follow the Budhi Gandaki valley.', alt: '930m' },
      { day: 3, place: 'Machha Khola → Jagat', desc: 'Cross suspension bridges, hot springs.', alt: '1,340m' },
      { day: 4, place: 'Jagat → Deng', desc: 'Enter Manaslu Conservation Area.', alt: '1,860m' },
      { day: 5, place: 'Deng → Namrung', desc: 'Tibetan culture begins.', alt: '2,660m' },
      { day: 6, place: 'Namrung → Samagaon', desc: 'Views of Manaslu peak.', alt: '3,530m' },
      { day: 7, place: 'Samagaon', desc: 'Acclimatization. Visit Birendra Lake.', alt: '3,530m' },
      { day: 8, place: 'Samagaon → Samdo', desc: 'High altitude village near Tibet border.', alt: '3,860m' },
      { day: 9, place: 'Samdo → Dharamsala', desc: 'Base camp for the pass.', alt: '4,460m' },
      { day: 10, place: 'Larkya La Pass → Bimthang', desc: 'Cross 5,106m pass! Steep descent.', alt: '3,590m' },
      { day: 11, place: 'Bimthang → Tilije', desc: 'Descend into the Marsyangdi valley.', alt: '2,300m' },
      { day: 12, place: 'Tilije → Dharapani', desc: 'Meet the Annapurna Circuit trail.', alt: '1,860m' },
      { day: 13, place: 'Dharapani → Jagat', desc: 'Continue descent.', alt: '1,340m' },
      { day: 14, place: 'Jagat → Soti Khola', desc: 'Final trail day.', alt: '700m' },
      { day: 15, place: 'Soti Khola → Kathmandu', desc: 'Drive back to Kathmandu.', alt: '1,400m' },
      { day: 16, place: 'Departure', desc: 'Free day and departure.', alt: '1,400m' },
    ]
  },
];

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

const ItineraryPlanner = () => {
  const { t, convertPrice, currency } = useSettings();
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

  const crowdColors = { green: '#16a34a', yellow: '#eab308', red: '#dc2626' };
  const crowdLabels = { green: 'Low Crowd', yellow: 'Moderate', red: 'Busy' };

  const generatePDF = (trek) => {
    const doc = new jsPDF();
    const total = getTotalPrice(trek);
    const acc = accommodations.find(a => a.id === answers.accommodation);

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(15, 23, 42);
    doc.text('PROJECT PEAK', 20, 25);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    doc.text('Your Personalized Trek Itinerary', 20, 33);

    // Trek info
    doc.setDrawColor(22, 101, 52);
    doc.setLineWidth(0.5);
    doc.line(20, 38, 190, 38);

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(22, 101, 52);
    doc.text(trek.name, 20, 50);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80);
    doc.text(`${trek.days} Days  |  Max Altitude: ${trek.altitude}  |  Difficulty: ${trek.difficulty.charAt(0).toUpperCase() + trek.difficulty.slice(1)}`, 20, 58);
    doc.text(`Accommodation: ${acc?.label}  |  Total: ${convertPrice(total)}`, 20, 65);

    if (answers.extras.length > 0) {
      const extNames = answers.extras.map(id => extras.find(e => e.id === id)?.label).join(', ');
      doc.text(`Add-ons: ${extNames}`, 20, 72);
    }

    // Itinerary table
    let y = answers.extras.length > 0 ? 85 : 80;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text('Day-by-Day Itinerary', 20, y);
    y += 10;

    // Table header
    doc.setFillColor(22, 101, 52);
    doc.setTextColor(255);
    doc.setFontSize(9);
    doc.rect(20, y - 5, 170, 8, 'F');
    doc.text('DAY', 24, y);
    doc.text('LOCATION', 42, y);
    doc.text('ALT', 120, y);
    doc.text('DESCRIPTION', 138, y);
    y += 8;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60);

    trek.itinerary.forEach((day) => {
      if (y > 270) {
        doc.addPage();
        y = 25;
      }
      const bg = day.day % 2 === 0;
      if (bg) {
        doc.setFillColor(245, 247, 250);
        doc.rect(20, y - 4, 170, 7, 'F');
      }
      doc.setFontSize(8);
      doc.text(`${day.day}`, 26, y);
      doc.setFont('helvetica', 'bold');
      doc.text(day.place.substring(0, 30), 42, y);
      doc.setFont('helvetica', 'normal');
      doc.text(day.alt, 122, y);
      doc.text(day.desc.substring(0, 35), 138, y);
      y += 7;
    });

    // Footer
    y = Math.max(y + 10, 250);
    if (y > 270) { doc.addPage(); y = 25; }
    doc.setDrawColor(22, 101, 52);
    doc.line(20, y, 190, y);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text('Generated by Project Peak | projectpeak.com | +977 1 4411123', 20, y + 7);

    doc.save(`${trek.name.replace(/\s+/g, '_')}_Itinerary.pdf`);
  };

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

  return (
    <section id="planner" className="py-24 md:py-32 px-6 md:px-16 w-full bg-gray-50 dark:bg-peakDeep/80 transition-colors">
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

        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-8 md:p-12">

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
                  window.open(`https://wa.me/9779801234567?text=${encodeURIComponent(msg)}`, '_blank');
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

import React from 'react';

const ElevationProfile = ({ itinerary }) => {
  if (!itinerary || itinerary.length === 0) return null;

  // Extract clean numerical altitude from strings like "1,400m", "5,364 m", "3,440m"
  const getAltNumber = (altStr) => {
    if (!altStr) return 0;
    const num = altStr.replace(/[^0-9]/g, '');
    return parseInt(num, 10) || 0;
  };

  const data = itinerary.map(day => ({
    day: day.day,
    name: day.place,
    alt: getAltNumber(day.alt),
    originalAlt: day.alt
  }));

  const svgWidth = 800;
  const svgHeight = 250;
  const paddingX = 40;
  const paddingY = 40;

  const minAlt = Math.max(0, Math.min(...data.map(d => d.alt)) - 500);
  const maxAlt = Math.max(...data.map(d => d.alt)) + 300;

  const scaleX = (svgWidth - paddingX * 2) / Math.max(1, (data.length - 1));
  const scaleY = (svgHeight - paddingY * 2) / (maxAlt - minAlt);

  // Generate path commands
  const pathD = data.map((d, i) => {
    const x = paddingX + (i * scaleX);
    const y = svgHeight - paddingY - ((d.alt - minAlt) * scaleY);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // Create area under the path
  const areaD = `${pathD} L ${paddingX + ((data.length - 1) * scaleX)} ${svgHeight - paddingY} L ${paddingX} ${svgHeight - paddingY} Z`;

  return (
    <div className="w-full mt-8 mb-6 relative group">
      <div className="flex justify-between items-center mb-2 px-1 md:hidden">
        <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-peakDeep/40 dark:text-peakWhite/40">Elevation Profile</span>
        <span className="text-[10px] font-sans font-medium text-peakGreen animate-pulse italic">Swipe to view →</span>
      </div>
      <div className="overflow-x-auto no-scrollbar pb-4 touch-pan-x">
        <div className="min-w-[650px] md:min-w-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl p-4">
          <h4 className="hidden md:block font-display font-bold text-lg text-peakDeep dark:text-peakWhite mb-6 text-center">Elevation Profile</h4>
        
        <svg id="elevation-profile-svg" viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto drop-shadow-sm overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16a34a" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#16a34a" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <path d={areaD} fill="url(#areaGradient)" className="transition-all duration-1000 ease-out" />
          
          {/* Stroke Line */}
          <path d={pathD} fill="none" stroke="url(#lineGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-md transition-all duration-1000 ease-out" />

          {/* Data Points and Labels */}
          {data.map((d, i) => {
            const x = paddingX + (i * scaleX);
            const y = svgHeight - paddingY - ((d.alt - minAlt) * scaleY);
            
            return (
              <g key={i} className="hover:opacity-100 transition-opacity cursor-pointer group/point">
                {/* Vertical dash line on hover */}
                <line x1={x} y1={y} x2={x} y2={svgHeight - paddingY} stroke="#16a34a" strokeWidth="1" strokeDasharray="4 4" className="opacity-0 group-hover/point:opacity-50 transition-opacity" />
                
                {/* Hit area circle */}
                <circle cx={x} cy={y} r="15" fill="transparent" />
                
                {/* Outer pulsing ring */}
                <circle cx={x} cy={y} r="5" fill="#16a34a" className="opacity-0 group-hover/point:opacity-30 group-hover/point:animate-ping" />
                
                {/* Visible dot */}
                <circle cx={x} cy={y} r="4" fill="white" stroke="#16a34a" strokeWidth="2" className="transition-all duration-300 group-hover/point:r-5 group-hover/point:stroke-[3px]" />
                
                {/* Tooltip on hover */}
                <g className="opacity-0 group-hover/point:opacity-100 transition-opacity pointer-events-none">
                  {/* Tooltip Background */}
                  <rect x={x - 65} y={y - 55} width="130" height="40" rx="6" fill="#0f172a" className="dark:fill-white" />
                  {/* Tooltip Arrow */}
                  <polygon points={`${x - 5},${y - 15} ${x + 5},${y - 15} ${x},${y - 8}`} fill="#0f172a" className="dark:fill-white" />
                  
                  {/* Tooltip Text - Place */}
                  <text x={x} y={y - 38} textAnchor="middle" fill="#ffffff" className="dark:fill-slate-900" fontSize="11" fontWeight="bold" fontFamily="system-ui, sans-serif">
                    {d.name.length > 18 ? d.name.substring(0, 18) + '...' : d.name}
                  </text>
                  {/* Tooltip Text - Alt */}
                  <text x={x} y={y - 23} textAnchor="middle" fill="#94a3b8" className="dark:fill-slate-500" fontSize="10" fontFamily="system-ui, sans-serif">
                    Day {d.day} • {d.originalAlt}
                  </text>
                </g>

                {/* Always visible base labels (Days) */}
                {(i === 0 || i === data.length - 1 || i % 2 !== 0) && (
                   <text x={x} y={svgHeight - paddingY + 20} textAnchor="middle" fill="currentColor" className="text-peakDeep/40 dark:text-peakWhite/40 font-sans text-[10px]" opacity="0.7">
                     D{d.day}
                   </text>
                )}
              </g>
            );
          })}
        </svg>
        </div>
      </div>
    </div>
  );
};

export default ElevationProfile;

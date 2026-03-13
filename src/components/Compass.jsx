import React, { useState, useEffect, useRef } from 'react';
import { X, Navigation } from 'lucide-react';

const Compass = ({ isOpen, onClose }) => {
  const [heading, setHeading] = useState(0);
  const [permissionState, setPermissionState] = useState('prompt'); // prompt | granted | denied | unsupported
  const canvasRef = useRef(null);

  const requestPermission = async () => {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      // iOS 13+ needs explicit permission
      try {
        const result = await DeviceOrientationEvent.requestPermission();
        setPermissionState(result === 'granted' ? 'granted' : 'denied');
      } catch {
        setPermissionState('denied');
      }
    } else if ('DeviceOrientationEvent' in window) {
      // Android / other browsers — no permission needed
      setPermissionState('granted');
    } else {
      setPermissionState('unsupported');
    }
  };

  useEffect(() => {
    if (!isOpen || permissionState !== 'granted') return;

    const handleOrientation = (e) => {
      let compassHeading = 0;
      if (e.webkitCompassHeading !== undefined) {
        // iOS Safari
        compassHeading = e.webkitCompassHeading;
      } else if (e.alpha !== null) {
        // Android Chrome — alpha is rotation around z-axis
        compassHeading = 360 - e.alpha;
      }
      setHeading(Math.round(compassHeading));
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => window.removeEventListener('deviceorientation', handleOrientation, true);
  }, [isOpen, permissionState]);

  // Draw compass on canvas
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    const center = size / 2;
    const radius = center - 30;

    ctx.clearRect(0, 0, size, size);

    // Outer ring
    ctx.beginPath();
    ctx.arc(center, center, radius + 15, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(22, 101, 52, 0.15)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(22, 101, 52, 0.3)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Tick marks
    for (let i = 0; i < 360; i += 5) {
      const radAngle = ((i - heading) * Math.PI) / 180 - Math.PI / 2;
      const isMajor = i % 30 === 0;
      const isCardinal = i % 90 === 0;
      const innerR = radius - (isCardinal ? 20 : isMajor ? 14 : 8);

      ctx.beginPath();
      ctx.moveTo(center + innerR * Math.cos(radAngle), center + innerR * Math.sin(radAngle));
      ctx.lineTo(center + radius * Math.cos(radAngle), center + radius * Math.sin(radAngle));
      ctx.strokeStyle = isCardinal ? '#166534' : isMajor ? 'rgba(22, 101, 52, 0.6)' : 'rgba(22, 101, 52, 0.2)';
      ctx.lineWidth = isCardinal ? 3 : isMajor ? 2 : 1;
      ctx.stroke();

      // Degree numbers for every 30°
      if (isMajor && !isCardinal) {
        const textR = radius - 30;
        ctx.font = '12px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = 'rgba(22, 101, 52, 0.5)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${i}°`, center + textR * Math.cos(radAngle), center + textR * Math.sin(radAngle));
      }
    }

    // Cardinal directions
    const cardinals = [
      { letter: 'N', deg: 0, color: '#dc2626' },
      { letter: 'E', deg: 90, color: '#166534' },
      { letter: 'S', deg: 180, color: '#166534' },
      { letter: 'W', deg: 270, color: '#166534' },
    ];
    cardinals.forEach(({ letter, deg, color }) => {
      const radAngle = ((deg - heading) * Math.PI) / 180 - Math.PI / 2;
      const textR = radius - 34;
      ctx.font = 'bold 20px "Syne", sans-serif';
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(letter, center + textR * Math.cos(radAngle), center + textR * Math.sin(radAngle));
    });

    // North needle (triangle pointing up)
    const northAngle = (-heading * Math.PI) / 180 - Math.PI / 2;
    const needleLen = radius - 50;

    // Red north pointer
    ctx.beginPath();
    ctx.moveTo(center + needleLen * Math.cos(northAngle), center + needleLen * Math.sin(northAngle));
    ctx.lineTo(center + 12 * Math.cos(northAngle + Math.PI / 2), center + 12 * Math.sin(northAngle + Math.PI / 2));
    ctx.lineTo(center, center);
    ctx.lineTo(center + 12 * Math.cos(northAngle - Math.PI / 2), center + 12 * Math.sin(northAngle - Math.PI / 2));
    ctx.closePath();
    ctx.fillStyle = '#dc2626';
    ctx.fill();

    // Grey south pointer
    const southAngle = northAngle + Math.PI;
    ctx.beginPath();
    ctx.moveTo(center + (needleLen * 0.6) * Math.cos(southAngle), center + (needleLen * 0.6) * Math.sin(southAngle));
    ctx.lineTo(center + 10 * Math.cos(southAngle + Math.PI / 2), center + 10 * Math.sin(southAngle + Math.PI / 2));
    ctx.lineTo(center, center);
    ctx.lineTo(center + 10 * Math.cos(southAngle - Math.PI / 2), center + 10 * Math.sin(southAngle - Math.PI / 2));
    ctx.closePath();
    ctx.fillStyle = 'rgba(22, 101, 52, 0.3)';
    ctx.fill();

    // Center circle
    ctx.beginPath();
    ctx.arc(center, center, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#166534';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(center, center, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();

  }, [heading, isOpen]);

  if (!isOpen) return null;

  const getDirection = (deg) => {
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return dirs[Math.round(deg / 45) % 8];
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-peakDark border border-black/5 dark:border-white/10 rounded-3xl p-8 max-w-md w-full relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors" aria-label="Close compass">
          <X size={20} className="text-peakDeep dark:text-peakWhite" />
        </button>
        <h2 className="font-display font-bold text-2xl text-peakDeep dark:text-peakWhite mb-2 text-center">Trail Compass</h2>
        <p className="font-sans text-sm text-peakDeep/50 dark:text-peakWhite/50 mb-6 text-center">
          Uses your device's gyroscope for real-time direction
        </p>

        <div className="flex flex-col items-center">
          {permissionState === 'prompt' && (
            <div className="text-center py-8">
              <Navigation size={48} className="text-peakGreen mx-auto mb-4" />
              <p className="font-sans text-sm text-peakDeep/70 dark:text-peakWhite/70 mb-6">
                Grant access to your device sensors to use the compass.
              </p>
              <button onClick={requestPermission} className="bg-peakGreen text-white px-8 py-3 rounded-full font-sans text-sm font-bold uppercase tracking-wider hover:bg-peakGreen/90 transition-colors">
                Enable Compass
              </button>
            </div>
          )}

          {permissionState === 'denied' && (
            <div className="text-center py-8">
              <p className="font-sans text-sm text-peakDeep/70 dark:text-peakWhite/70">
                Compass access was denied. Please enable device orientation in your browser settings.
              </p>
            </div>
          )}

          {permissionState === 'unsupported' && (
            <div className="text-center py-8">
              <p className="font-sans text-sm text-peakDeep/70 dark:text-peakWhite/70">
                Compass is not supported on this device. Try on a mobile device with gyroscope.
              </p>
              {/* Show static compass on desktop for demo */}
              <canvas ref={canvasRef} width={320} height={320} className="mt-4 mx-auto" />
              <p className="font-display font-bold text-4xl text-peakDeep dark:text-peakWhite mt-4">{heading}° <span className="text-peakGreen text-xl">{getDirection(heading)}</span></p>
            </div>
          )}

          {permissionState === 'granted' && (
            <>
              <canvas ref={canvasRef} width={320} height={320} className="mx-auto" />
              <p className="font-display font-bold text-4xl text-peakDeep dark:text-peakWhite mt-4">
                {heading}° <span className="text-peakGreen text-xl">{getDirection(heading)}</span>
              </p>
              <p className="font-sans text-xs text-peakDeep/40 dark:text-peakWhite/40 mt-2">
                Point your phone towards your destination
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Compass;

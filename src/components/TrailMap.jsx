import React, { useEffect, useRef } from 'react';
import { X, MapPin } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Real trekking route waypoints (actual GPS coordinates)
const trekRoutes = {
  'Everest Base Camp': {
    center: [27.9881, 86.925],
    zoom: 10,
    waypoints: [
      [27.6872, 86.7316, 'Lukla (2,860m)'],
      [27.7085, 86.7133, 'Phakding (2,610m)'],
      [27.8063, 86.7104, 'Namche Bazaar (3,440m)'],
      [27.8371, 86.7673, 'Tengboche (3,860m)'],
      [27.8656, 86.8113, 'Dingboche (4,410m)'],
      [27.9098, 86.8296, 'Lobuche (4,940m)'],
      [27.9353, 86.8296, 'Gorak Shep (5,164m)'],
      [28.0025, 86.8528, 'Everest Base Camp (5,364m)'],
    ],
    crowd: 'red',
  },
  'Annapurna Circuit': {
    center: [28.6, 84.2],
    zoom: 9,
    waypoints: [
      [28.2698, 84.3729, 'Besisahar (760m)'],
      [28.3831, 84.3664, 'Bahundanda (1,310m)'],
      [28.4757, 84.3650, 'Chame (2,670m)'],
      [28.5385, 84.2242, 'Upper Pisang (3,310m)'],
      [28.6321, 84.1291, 'Manang (3,540m)'],
      [28.7033, 83.9739, 'Ledar (4,200m)'],
      [28.7714, 83.9362, 'Thorong Phedi (4,525m)'],
      [28.7982, 83.9338, 'Thorong La Pass (5,416m)'],
      [28.8048, 83.8706, 'Muktinath (3,760m)'],
      [28.6898, 83.6466, 'Jomsom (2,720m)'],
    ],
    crowd: 'yellow',
  },
  'Mardi Himal Trek': {
    center: [28.4, 83.9],
    zoom: 11,
    waypoints: [
      [28.2466, 83.9488, 'Kande (1,770m)'],
      [28.3100, 83.8640, 'Pothana (1,890m)'],
      [28.3500, 83.8700, 'Forest Camp (2,550m)'],
      [28.3800, 83.8600, 'Low Camp (2,990m)'],
      [28.4200, 83.8500, 'High Camp (3,580m)'],
      [28.4600, 83.8700, 'Upper View Point (4,200m)'],
      [28.4900, 83.8800, 'Mardi Himal Base Camp (4,500m)'],
    ],
    crowd: 'green',
  },
};

const TrailMap = ({ isOpen, onClose, trekName }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !mapRef.current || !trekName) return;

    const route = trekRoutes[trekName];
    if (!route) return;

    // Destroy previous map instance if exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Create map
    const map = L.map(mapRef.current, {
      center: route.center,
      zoom: route.zoom,
      zoomControl: true,
    });

    mapInstanceRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    // Custom icon
    const markerIcon = L.divIcon({
      html: `<div style="width:12px;height:12px;background:#166534;border:2px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
      className: 'custom-marker',
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });

    // Start icon
    const startIcon = L.divIcon({
      html: `<div style="width:16px;height:16px;background:#166534;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.4);"></div>`,
      className: 'custom-marker',
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

    // End icon
    const endIcon = L.divIcon({
      html: `<div style="width:18px;height:18px;background:#dc2626;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.4);"></div>`,
      className: 'custom-marker',
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });

    // Add markers
    route.waypoints.forEach((wp, i) => {
      const icon = i === 0 ? startIcon : i === route.waypoints.length - 1 ? endIcon : markerIcon;
      L.marker([wp[0], wp[1]], { icon })
        .addTo(map)
        .bindPopup(`<strong style="font-family:'Syne',sans-serif">${wp[2]}</strong>`);
    });

    // Draw trail line
    const latlngs = route.waypoints.map(wp => [wp[0], wp[1]]);
    L.polyline(latlngs, {
      color: '#166534',
      weight: 3,
      opacity: 0.8,
      dashArray: '10, 6',
    }).addTo(map);

    // Fit bounds
    const bounds = L.latLngBounds(latlngs);
    map.fitBounds(bounds, { padding: [40, 40] });

    // Invalidate size after render
    setTimeout(() => map.invalidateSize(), 100);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOpen, trekName]);

  if (!isOpen) return null;

  const route = trekRoutes[trekName];
  const crowdColors = { green: '#16a34a', yellow: '#eab308', red: '#dc2626' };
  const crowdLabels = { green: 'Low Traffic', yellow: 'Moderate Traffic', red: 'High Traffic' };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-peakDark border border-black/5 dark:border-white/10 rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] relative flex flex-col" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 dark:border-white/10">
          <div>
            <h2 className="font-display font-bold text-xl text-peakDeep dark:text-peakWhite">{trekName}</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="font-sans text-xs text-peakDeep/50 dark:text-peakWhite/50">
                {route?.waypoints.length} waypoints
              </span>
              {route && (
                <span className="flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-wider" style={{ color: crowdColors[route.crowd] }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: crowdColors[route.crowd] }}></span>
                  {crowdLabels[route.crowd]}
                </span>
              )}
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors" aria-label="Close map">
            <X size={20} className="text-peakDeep dark:text-peakWhite" />
          </button>
        </div>

        {/* Map */}
        <div ref={mapRef} className="flex-1 min-h-[400px] md:min-h-[500px]" />

        {/* Waypoint list */}
        <div className="px-6 py-4 border-t border-black/5 dark:border-white/10 max-h-48 overflow-y-auto">
          <div className="flex flex-wrap gap-2">
            {route?.waypoints.map((wp, i) => (
              <span key={i} className="flex items-center gap-1 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 font-sans text-xs text-peakDeep dark:text-peakWhite">
                <MapPin size={10} className="text-peakGreen" />
                {wp[2]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailMap;

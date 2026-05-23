import { useState } from 'react';
import { MapPin, Navigation, Copy, Phone, ExternalLink } from 'lucide-react';
import { RESTAURANT_DETAILS } from '../data';

export default function MapAndDirectionSection() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(RESTAURANT_DETAILS.address);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleExternalMapRedirect = () => {
    const query = encodeURIComponent("Goyal Sweets & Restaurant Naraingarh Haryana");
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans-ui" id="map-section">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10">
        
        {/* Directions details block */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-saffron-600 bg-saffron-100/50 px-3 py-1 rounded-full">
              Location Map
            </span>
            <h3 className="font-serif-display text-3xl font-black text-maroon-950">
              Opposite Bus Stand, Naraingarh
            </h3>
            <p className="text-xs text-gray-500">
              Convenient family-friendly spot situated right at the heart of the town centre along State Highway 22 (Chandigarh Road).
            </p>
          </div>

          <div className="space-y-4 text-xs font-medium text-gray-700">
            {/* Address Row */}
            <div className="flex items-start space-x-3.5 bg-cream-50 p-4 rounded-xl border border-saffron-100">
              <MapPin className="w-5 h-5 text-saffron-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-maroon-950 block">Our Street Address</span>
                <span className="text-gray-600 leading-relaxed block">{RESTAURANT_DETAILS.address}</span>
                <button
                  type="button"
                  id="copy-address-btn"
                  onClick={handleCopy}
                  className="mt-1.5 font-bold text-saffron-600 flex items-center hover:underline cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 mr-1" />
                  {isCopied ? 'Address Copied!' : 'Copy Street Address'}
                </button>
              </div>
            </div>

            {/* Landmarks Row */}
            <div className="flex items-start space-x-3.5 bg-cream-50 p-4 rounded-xl border border-saffron-100">
              <Navigation className="w-5 h-5 text-saffron-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-maroon-950 block">Key Landmarks & Distance</span>
                <p className="text-gray-600 leading-relaxed">
                  Located directly <b>opposite the main Naraingarh Bus Stand</b>, near Axis Bank, and adjacent to the EasyDay store. A quick <b>2-minute walk</b> from the bus stand platform.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              id="google-maps-launch-btn"
              onClick={handleExternalMapRedirect}
              className="w-full sm:w-auto bg-maroon-900 hover:bg-maroon-950 text-[#ffffff] border-2 border-saffron-500/40 hover:border-saffron-500 font-bold text-xs px-5 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer uppercase tracking-wider shrink-0"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Get GPS Directions</span>
            </button>
            <a
              href={RESTAURANT_DETAILS.virtualTour}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-[#7f1d1d] font-bold text-xs px-5 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer uppercase tracking-wider border-2 border-saffron-450 hover:shadow-lg hover:-translate-y-0.5"
            >
              <span className="relative flex h-2.5 w-2.5 mr-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
              </span>
              <span>Explore 360° Shop View</span>
            </a>
          </div>
        </div>

        {/* Custom Interactive SVG Vector Map Illustration */}
        <div className="lg:col-span-7 bg-cream-100/60 p-5 rounded-3xl border border-gray-100 relative shadow-inner">
          <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1.5 rounded-lg border border-gray-100 shadow-sm text-[10px] font-bold text-gray-500 uppercase z-10">
            Naraingarh Town Centre Visual Map
          </div>

          {/* Grid visual representations */}
          <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden relative border border-gray-300 shadow bg-stone-50">
            <svg viewBox="0 0 800 500" className="w-full h-full text-sm select-none" xmlns="http://www.w3.org/2000/svg">
              {/* Back Ground Grid line lines */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1eeea" strokeWidth="1.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* State Highway 22 horizontal road */}
              <rect x="0" y="210" width="800" height="80" fill="#2d2a26" />
              {/* Dashed separators */}
              <line x1="0" y1="250" x2="800" y2="250" stroke="#fce3cc" strokeWidth="3" strokeDasharray="15 20" />

              {/* Route Marker Label */}
              <text x="30" y="256" fill="#fff" fontSize="10" fontWeight="bold" letterSpacing="1">STATE HIGHWAY 22 (CHANDIGARH ROAD)</text>

              {/* Bus Stand on Top Portion */}
              <g transform="translate(420, 20)">
                <rect width="280" height="130" rx="10" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="3" />
                {/* Roof pattern */}
                <path d="M 0 35 L 280 35" stroke="#94a3b8" strokeWidth="2" />
                <rect x="15" y="50" width="250" height="70" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
                <text x="140" y="25" fill="#1e293b" fontWeight="black" textAnchor="middle" fontSize="11" letterSpacing="0.5">NARAINGARH BUS STAND</text>
                
                {/* Buses illustrations */}
                <rect x="35" y="65" width="60" height="40" rx="3" fill="#0284c7" />
                <rect x="40" y="70" width="12" height="10" fill="#e0f2fe" />
                <rect x="56" y="70" width="34" height="10" fill="#e0f2fe" />
                <circle cx="50" cy="110" r="5" fill="#000" />
                <circle cx="80" cy="110" r="5" fill="#000" />
                <text x="65" y="90" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">BUS</text>

                <rect x="185" y="65" width="60" height="40" rx="3" fill="#ea580c" />
                <circle cx="200" cy="110" r="5" fill="#000" />
                <circle cx="230" cy="110" r="5" fill="#000" />
              </g>

              {/* Cross Walk ZEBRA */}
              <rect x="510" y="210" width="60" height="80" fill="#2d2a26" />
              <g stroke="#fff" strokeWidth="6">
                <line x1="520" y1="210" x2="520" y2="290" />
                <line x1="535" y1="210" x2="535" y2="290" />
                <line x1="550" y1="210" x2="550" y2="290" />
                <line x1="565" y1="210" x2="565" y2="290" />
              </g>
              <text x="540" y="195" fill="#475569" fontWeight="bold" fontSize="9" textAnchor="middle">2 Min Walk</text>

              {/* Goyal Sweets immediately below coordinates */}
              <g transform="translate(360, 330)">
                <rect width="360" height="130" rx="12" fill="#faf5e6" stroke="#f27a1a" strokeWidth="4" />
                {/* Canopy details */}
                <path d="M 0 0 L 360 0 L 360 20 L 340 10 L 320 20 L 300 10 L 280 20 L 260 10 L 240 20 L 220 10 L 200 20 L 180 10 L 160 20 L 140 10 L 120 20 L 100 10 L 80 20 L 60 10 L 40 20 L 20 10 L 0 20 Z" fill="#b04907" />
                <text x="180" y="55" fill="#66001a" fontWeight="black" textAnchor="middle" fontSize="13" letterSpacing="0.2">GOYAL’S SWEETS & RESTAURANT</text>
                <text x="180" y="75" fill="#d6640e" fontWeight="extrabold" textAnchor="middle" fontSize="10" letterSpacing="1">“TASTE THE TRADITION”</text>
                
                {/* Extra services details */}
                <rect x="40" y="93" width="90" height="24" rx="4" fill="#16a34a" />
                <text x="85" y="108" fill="#fff" fontWeight="bold" fontSize="9" textAnchor="middle">SWEETS CANTEEN</text>

                <rect x="230" y="93" width="90" height="24" rx="4" fill="#a21caf" />
                <text x="275" y="108" fill="#fff" fontWeight="bold" fontSize="9" textAnchor="middle">FAMILY DINING</text>
              </g>

              {/* Axis Bank on Left of Goyals */}
              <g transform="translate(60, 350)">
                <rect width="240" height="110" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
                <rect x="0" y="0" width="240" height="20" rx="3" fill="#800020" />
                <text x="120" y="14" fill="#fff" fontWeight="bold" textAnchor="middle" fontSize="9">AXIS BANK</text>
                <text x="120" y="65" fill="#475569" textAnchor="middle" fontSize="10">Naraingarh Branch</text>
                <text x="120" y="85" fill="#dc2626" fontWeight="bold" textAnchor="middle" fontSize="9">24/7 ATM AVAILABLE</text>
              </g>

              {/* Map Pins and Indicator Glow glows */}
              <g transform="translate(540, 340)">
                <circle cx="0" cy="0" r="16" fill="#f27a1a" opacity="0.3" className="animate-ping" />
                <circle cx="0" cy="0" r="8" fill="#f27a1a" />
                <circle cx="0" cy="0" r="4" fill="#fff" />
              </g>
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}

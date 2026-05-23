import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Calendar, CheckCircle, Flame, Star, Sparkles, Crown } from 'lucide-react';
import { RESTAURANT_DETAILS } from '../data';

interface HeroSectionProps {
  setActiveTab: (tab: string) => void;
}

const HEADLINES = [
  "A Legacy of Pure Taste, Rich Tradition & Royal Desi Ghee Sweets.",
  "Naraingarh's Premium Multi-Cuisine Culinary Landmark Since 1998.",
  "Handcrafted Pure Vegetarian Delicacies Served with Warm Devotion.",
  "Savour the Legendary Heritage of Our Royal Maharaja Thali."
];

export default function HeroSection({ setActiveTab }: HeroSectionProps) {
  const [headlineIndex, setHeadlineIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % HEADLINES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-cream-50 py-16 lg:py-24 border-b border-saffron-300/40 font-sans-ui">
      {/* Royal Subtle Gold Motif Background Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
        <div className="absolute top-1/4 left-5 w-[500px] h-[500px] bg-saffron-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-5 w-[400px] h-[400px] bg-maroon-100/50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content Block */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Tagline / Premium Welcome Badge */}
            <div className="inline-flex items-center space-x-2.5 bg-[#ffffff]/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-saffron-500/30 shadow-sm">
              <Crown className="w-3.5 h-3.5 text-saffron-600 shrink-0" />
              <span className="text-[10px] sm:text-xs font-sans tracking-wide text-saffron-950 uppercase font-extrabold">
                {RESTAURANT_DETAILS.tagline}
              </span>
              <span className="text-saffron-300 font-light select-none">|</span>
              <span className="text-[10px] sm:text-xs font-sans tracking-wide text-maroon-900 font-extrabold flex items-center">
                <Star className="w-3.5 h-3.5 mr-1 fill-saffron-500 text-saffron-500" />
                ESTD. 1998
              </span>
            </div>

            {/* Rotating Hero Headlines styled luxuriously */}
            <div className="h-40 sm:h-36 md:h-32 flex items-center justify-center lg:justify-start">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={headlineIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="font-serif-display text-3xl sm:text-4xl md:text-5.5xl font-black text-maroon-950 tracking-tight leading-[1.12]"
                >
                  {HEADLINES[headlineIndex]}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Luxurious Triple Divider Pattern */}
            <div className="flex items-center justify-center lg:justify-start space-x-4">
              <div className="h-[1px] w-12 bg-saffron-600/30" />
              <Sparkles className="w-4 h-4 text-saffron-500" />
              <div className="h-[1px] w-12 bg-saffron-600/30" />
            </div>

            {/* Descriptive Body Callout */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans-ui font-medium"
            >
              {RESTAURANT_DETAILS.subHeadline} Handcrafted using 100% pure premium ingredients, clean processes, and served inside Goyal's legendary air-conditioned dining lounge. Enjoy our{' '}
              <strong className="text-maroon-900 font-bold underline decoration-saffron-500/80 decoration-2 underline-offset-4">
                Grand Maharaja Thali
              </strong>{' '}
              and buttery{' '}
              <strong className="text-maroon-900 font-bold underline decoration-saffron-500/80 decoration-2 underline-offset-4">
                Cheese Seekh Kababs
              </strong>.
            </motion.p>

            {/* Key Accomplishments Badges */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center space-x-2.5 bg-[#ffffff] p-3 rounded-xl border border-saffron-500/15 shadow-sm">
                <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center border border-green-200">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#16a34a]" />
                </div>
                <span className="text-xs font-bold text-gray-805">100% Vegetarian</span>
              </div>
              <div className="flex items-center space-x-2.5 bg-[#ffffff] p-3 rounded-xl border border-saffron-500/15 shadow-sm">
                <CheckCircle className="w-5 h-5 text-saffron-500 shrink-0" />
                <span className="text-xs font-bold text-gray-805">Pure Desi Ghee</span>
              </div>
              <div className="flex items-center space-x-2.5 bg-[#ffffff] p-3 rounded-xl border border-saffron-500/15 shadow-sm col-span-2 md:col-span-1">
                <Sparkles className="w-5 h-5 text-saffron-500 shrink-0" />
                <span className="text-xs font-bold text-gray-850">Lounge Dining</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                id="hero-order-sweets-cta"
                onClick={() => {
                  setActiveTab('sweets');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-maroon-900 hover:bg-maroon-950 text-white font-serif-display font-bold text-sm px-7 py-4 rounded-xl border-2 border-saffron-500/30 hover:border-saffron-500 shadow-md hover:shadow-xl transition-all flex items-center justify-center space-x-2.5 cursor-pointer hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-4.5 h-4.5 text-saffron-400" />
                <span>GIFTING & SWEETS BOXES</span>
              </button>

              <button
                id="hero-reserve-table-cta"
                onClick={() => {
                  setActiveTab('booking');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-[#ffffff] hover:bg-cream-50 text-maroon-950 font-serif-display font-extrabold text-sm px-7 py-4 rounded-xl border-2 border-saffron-500 shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2.5 cursor-pointer hover:-translate-y-0.5"
              >
                <Calendar className="w-4.5 h-4.5 text-saffron-500" />
                <span>BOOK TABLE RESERVATION</span>
              </button>
            </div>
          </div>

          {/* Visual Hero Image Container Block */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Elegant luxury framing - double border frame with gold touch */}
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-cream-100 p-2.5 border-2 border-saffron-300 relative group">
              <div className="w-full h-full rounded-2xl overflow-hidden relative border-2 border-saffron-500/30">
                <img
                  src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAGnEOltPOP7Yoh40NR2lM3TUXiDJWrFQ6udaUmK2OfhDD4KNzlRpSKfuk5hA3vP2kIOP9J4K7NQdmrTsOmr7WWPXXxH36zWXWpzoAW1mpwCxHztatTA7ICxzeDUH3ha_Pkf3Utueg=s1360-w1360-h1020-rw"
                  alt="Goyal's Sweets & Restaurant Premium Frontage"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 rounded-2xl"
                />
                
                {/* Overlay shadow to make text and badges stand out beautifully */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 pointer-events-none rounded-2xl" />
                
                {/* Watermark/Overlay floating logo at the top center */}
                <div className="absolute top-4 left-4 right-4 text-center pointer-events-none select-none">
                  <span className="font-serif-display text-sm font-black text-saffron-300 tracking-widest uppercase block drop-shadow-md">
                    GOYAL&apos;S
                  </span>
                  <span className="text-[8px] tracking-widest text-cream-100 uppercase font-bold drop-shadow">
                    Sweets & Restaurant
                  </span>
                </div>

                {/* Highlight Badge on top of Image Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-maroon-950/95 backdrop-blur-md p-3.5 rounded-xl shadow-lg border-l-4 border-saffron-500 border border-saffron-500/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[9px] font-mono font-bold text-saffron-200 uppercase tracking-widest block">ROYAL CRAFT</span>
                      <h4 className="font-serif-display text-sm font-bold text-white leading-tight">Authentic Milk Pedas & Syrupy Jalebis</h4>
                    </div>
                    <div className="bg-saffron-500 border border-saffron-400 px-2.5 py-1 rounded-md text-maroon-950 font-mono font-black text-[10px] tracking-wider uppercase shadow-sm">
                      PURE GHEE
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Float Badge Behind / Around */}
            <div className="absolute -top-5 -right-5 bg-gradient-to-br from-maroon-800 to-maroon-950 text-cream-50 rounded-full w-22 h-22 flex flex-col items-center justify-center border-2 border-saffron-400 shadow-xl rotate-12 z-20 hover:scale-105 transition-transform">
              <span className="text-[8px] uppercase tracking-widest font-mono font-bold text-saffron-200">SINCE 1998</span>
              <span className="font-serif-display text-xl font-black text-white leading-none">PREMIUM</span>
              <span className="text-[8px] uppercase font-bold text-cream-205">QUALITY</span>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-[#ffffff] border-2 border-saffron-500/25 p-3.5 rounded-2xl shadow-xl flex items-center space-x-3 z-20">
              <Flame className="w-5 h-5 text-saffron-500 animate-bounce" />
              <div>
                <p className="text-[9px] text-gray-450 uppercase tracking-wider font-bold">Recommended Trio</p>
                <p className="text-xs font-black text-maroon-950 font-serif-display">Maharaja Thali + Lassi + Jalebi</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Clock, ShoppingBag, Crown } from 'lucide-react';
import { RESTAURANT_DETAILS } from '../data';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  basketCount: number;
  openBasketModal: () => void;
}

export default function Navbar({ activeTab, setActiveTab, basketCount, openBasketModal }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);

    // Calculate open/closed state based on Indian standard hours: 11:30 AM to 9:45 PM
    const checkOpenState = () => {
      const now = new Date();
      // Using local timezone or user current local hour Since the restaurant is in Naraingarh
      const hours = now.getHours();
      const mins = now.getMinutes();
      const timeVal = hours * 60 + mins; // current minutes since midnight

      const openTime = 11 * 60 + 30; // 11:30 min
      const closeTime = 21 * 60 + 45; // 21:45 min

      setIsOpenNow(timeVal >= openTime && timeVal <= closeTime);
    };

    checkOpenState();
    const interval = setInterval(checkOpenState, 60000);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Restaurant Menu' },
    { id: 'sweets', label: 'Sweets Corner' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'booking', label: 'Book Table' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'about', label: 'Our Story' }
  ];

  return (
    <>
      {/* Top Banner Bar */}
      <div className="bg-maroon-950 text-cream-100 text-xs py-2 px-4 flex flex-wrap justify-between items-center border-b border-saffron-700/30 gap-2 z-50 relative font-sans-ui">
        <div className="flex items-center space-x-4">
          <span className="flex items-center text-saffron-200">
            <Clock className="w-3.5 h-3.5 mr-1" />
            {RESTAURANT_DETAILS.hours}
          </span>
          <span className="hidden sm:inline-flex items-center text-cream-200/90">
            <span className={`w-2 h-2 rounded-full mr-1.5 ${isOpenNow ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            {isOpenNow ? 'Open Now (Serving Fresh)' : 'Closed Now (Opens 11:30 AM)'}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href={RESTAURANT_DETAILS.virtualTour}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-saffron-300 hover:text-cream-50 hover:underline transition-all font-bold uppercase tracking-wider text-[10px] bg-saffron-550/10 px-2.5 py-1 rounded-md border border-saffron-500/20 shrink-0 select-none animate-pulse"
            title="Interactive 360° Shop View"
          >
            <span className="relative flex h-2 w-2 mr-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-saffron-500"></span>
            </span>
            360° Virtual Tour
          </a>
          <span className="text-saffron-200/40 hidden sm:inline">|</span>
          <a
            href={`tel:${RESTAURANT_DETAILS.phone.replace(/\s+/g, '')}`}
            className="flex items-center text-saffron-200 hover:text-cream-50 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 mr-1" />
            {RESTAURANT_DETAILS.phone}
          </a>
          <span className="text-saffron-200/40 hidden md:inline">|</span>
          <span className="text-saffron-200 font-medium hidden md:inline uppercase tracking-widest text-[10px]">
            {RESTAURANT_DETAILS.tagline}
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 font-sans-ui ${
          isScrolled
            ? 'bg-[#ffffff]/95 backdrop-blur-md shadow-lg border-b-2 border-saffron-500/40 py-2'
            : 'bg-cream-100 py-3.5 border-b border-saffron-300/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo Brand Brand */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => setActiveTab('home')}
            id="nav-logo"
          >
            <div className="relative mr-3 shrink-0">
              {/* Floating gold royal crown ornament */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-saffron-500 transform -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-transform duration-300 z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
                <Crown className="w-4 h-4 fill-saffron-500/20 text-saffron-500" />
              </div>
              
              <div className="w-11.5 h-11.5 bg-maroon-950 rounded-full flex items-center justify-center border-2 border-saffron-500 shadow-[0_3px_8px_rgba(207,159,66,0.30)] relative overflow-hidden transition-all duration-300 group-hover:shadow-[0_4px_14px_rgba(207,159,66,0.45)]">
                {/* Glossy shine element */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1100ms] ease-out" />
                
                <div className="w-[36px] h-[36px] rounded-full border-2 border-saffron-300 flex items-center justify-center bg-maroon-900/50">
                  <span className="text-saffron-100 font-serif-display font-black text-xl leading-none drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.6)] group-hover:text-white transition-colors">G</span>
                </div>
              </div>
            </div>
            <div>
              <h1 className="font-serif-display text-xl sm:text-2.5xl font-black text-maroon-950 tracking-tight leading-none group-hover:text-saffron-600 transition-colors">
                Goyal’s
              </h1>
              <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-saffron-650 block leading-none mt-1 uppercase">
                Sweets & Restaurant
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`desktop-nav-${link.id}`}
                onClick={() => {
                  setActiveTab(link.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3.5 py-2 rounded-lg font-serif-display font-bold text-xs uppercase tracking-wider transition-all duration-200 relative ${
                  activeTab === link.id
                    ? 'text-maroon-900 bg-saffron-500/10'
                    : 'text-gray-700 hover:text-maroon-900 hover:bg-cream-200/50'
                }`}
              >
                {link.label}
                {activeTab === link.id && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-1 left-3.5 right-3.5 h-[3px] bg-saffron-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Cart & Contact CTA */}
          <div className="flex items-center space-x-3.5">
            {/* Basket Button */}
            <button
              id="nav-sweets-cart"
              onClick={openBasketModal}
              className="relative p-3 bg-maroon-950 rounded-full border border-saffron-500 text-saffron-200 hover:bg-maroon-900 hover:text-saffron-100 transition-all group cursor-pointer shadow-md hover:ring-2 hover:ring-saffron-500/40"
              title="View Sweet Custom Basket"
            >
              <ShoppingBag className="w-4.5 h-4.5 group-hover:scale-110 transition-transform duration-200" />
              {basketCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-saffron-500 text-maroon-950 text-[10px] font-black w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-maroon-950 shadow"
                >
                  {basketCount}
                </motion.span>
              )}
            </button>

            {/* CTA Button */}
            <button
              id="nav-quick-order-btn"
              onClick={() => {
                setActiveTab('sweets');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-maroon-900 hover:bg-maroon-950 text-white font-serif-display font-bold text-xs px-5 py-3 rounded-xl border-2 border-saffron-500 shadow-md hover:shadow-lg transition-all cursor-pointer hidden md:block uppercase tracking-wider hover:-translate-y-0.5"
            >
              ORDER SWEETS BOX
            </button>

            {/* Mobile Menu Icon */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-maroon-950 focus:outline-none cursor-pointer hover:bg-cream-200 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-cream-100 h-full shadow-2xl p-6 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex justify-between items-center pb-6 border-b border-saffron-200/20">
                  <div className="flex items-center">
                    <div className="relative mr-2.5 shrink-0 animate-fadeIn">
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-saffron-500 z-10 scale-75">
                        <Crown className="w-4 h-4 fill-saffron-500/20 text-saffron-500" />
                      </div>
                      <div className="w-9 h-9 bg-maroon-950 rounded-full flex items-center justify-center border-2 border-saffron-500 shadow-sm relative overflow-hidden">
                        <div className="w-[28px] h-[28px] rounded-full border-2 border-saffron-300 flex items-center justify-center bg-maroon-900/50">
                          <span className="text-saffron-100 font-serif-display font-black text-sm leading-none drop-shadow-[0_1px_2.5px_rgba(0,0,0,0.5)]">G</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h2 className="font-serif-display text-base font-bold text-maroon-950 leading-none">Goyal’s</h2>
                      <span className="text-[9px] text-saffron-650 uppercase block font-mono font-bold leading-none tracking-widest mt-1">Sweets & Restaurant</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 text-gray-400 hover:text-maroon-950 focus:outline-none cursor-pointer"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex flex-col space-y-3 mt-6">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      id={`mobile-nav-${link.id}`}
                      onClick={() => {
                        setActiveTab(link.id);
                        setIsMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                        activeTab === link.id
                          ? 'bg-saffron-50 text-maroon-900 border-l-4 border-saffron-500 pl-3'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-saffron-200/20 text-center space-y-4 font-sans-ui">
                <p className="text-xs text-gray-500">Opposite Bus Stand, Naraingarh</p>
                <a
                  href={`tel:${RESTAURANT_DETAILS.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center justify-center w-full bg-maroon-900 hover:bg-maroon-950 text-white font-medium py-3 rounded-xl border border-maroon-950 shadow transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call to Order Sweet
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

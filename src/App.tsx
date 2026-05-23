/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MenuSection from './components/MenuSection';
import SweetsSection from './components/SweetsSection';
import ReservationSection from './components/ReservationSection';
import MapAndDirectionSection from './components/MapAndDirectionSection';
import GallerySection from './components/GallerySection';
import SweetsBasketModal from './components/SweetsBasketModal';
import AboutAndReviews from './components/AboutAndReviews';

import { BasketItem, SweetItem, MenuItem } from './types';
import { SWEET_ITEMS, RESTAURANT_DETAILS, JSON_LD_SCHEMA, MENU_ITEMS } from './data';
import { Star, MapPin, Phone, Clock, Compass, ShieldCheck, Heart, Crown, Facebook, Instagram } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [isBasketOpen, setIsBasketOpen] = useState<boolean>(false);

  // Inject Google Schema Markup dynamically
  useEffect(() => {
    let scriptTag = document.getElementById('goyal-restaurant-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'goyal-restaurant-schema';
      scriptTag.setAttribute('type', 'application/ld+json');
      scriptTag.innerHTML = JSON.stringify(JSON_LD_SCHEMA);
      document.head.appendChild(scriptTag);
    }
  }, []);

  // Sync scroll behavior on tab change
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToBasket = (sweetOrId: any, weight: number, qty: number) => {
    if (weight === -1) {
      // It's a MenuItem!
      const item: MenuItem = typeof sweetOrId === 'string'
        ? MENU_ITEMS.find((m) => m.id === sweetOrId)!
        : sweetOrId as MenuItem;

      if (!item) return;

      setBasket((prevBasket) => {
        const existingIdx = prevBasket.findIndex(
          (b) => b.menuItem && b.menuItem.id === item.id
        );

        if (existingIdx > -1) {
          const copy = [...prevBasket];
          copy[existingIdx].quantity += qty;
          return copy;
        } else {
          return [...prevBasket, { menuItem: item, quantity: qty }];
        }
      });
    } else {
      // Look up the full SweetItem definition if an ID was passed
      const item: SweetItem = typeof sweetOrId === 'string' 
        ? SWEET_ITEMS.find((s) => s.id === sweetOrId)! 
        : sweetOrId;

      if (!item) return;

      setBasket((prevBasket) => {
        const existingIdx = prevBasket.findIndex(
          (b) => b.sweet && b.sweet.id === item.id && b.weight === weight
        );

        if (existingIdx > -1) {
          const copy = [...prevBasket];
          copy[existingIdx].quantity += qty;
          return copy;
        } else {
          return [...prevBasket, { sweet: item, weight, quantity: qty }];
        }
      });
    }
  };

  const removeFromBasket = (sweetId: string, weight: number) => {
    setBasket((prevBasket) => {
      const existingIdx = prevBasket.findIndex((b) => {
        if (weight === -1) {
          return !!(b.menuItem && b.menuItem.id === sweetId);
        } else {
          return !!(b.sweet && b.sweet.id === sweetId && b.weight === weight);
        }
      });

      if (existingIdx === -1) return prevBasket;

      const copy = [...prevBasket];
      const item = copy[existingIdx];

      if (item.quantity > 1) {
        item.quantity -= 1;
        return copy;
      } else {
        return copy.filter((_, idx) => idx !== existingIdx);
      }
    });
  };

  const clearBasket = () => {
    setBasket([]);
  };

  const totalBasketCount = basket.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-cream-100 selection:bg-saffron-100 selection:text-saffron-800">
      
      {/* Dynamic Header & Notice Marquee */}
      <div>
        {/* Festive Scrolling Information Ribbon */}
        <div className="bg-saffron-500 text-cream-50 overflow-hidden py-1.5 border-b border-saffron-600 text-xs font-bold font-mono tracking-wider shadow-inner z-50 select-none">
          <div className="flex animate-[marquee_25s_linear_infinite] whitespace-nowrap space-x-12">
            <span>✨ FESTIVE SWEETS BOOKING ACTIVE • Call +91 82220 00999 for orders ✨</span>
            <span>🍱 TRY THE GOYAL SPECIAL MAHARAJA THALI - COMPLETE PUNJABI LUNCH SPLENDOUR 🍱</span>
            <span>👩‍👩‍👦 100% PURE VEGETARIAN CONFECTIONERY & RESTAURANT IN NARAINGARH 👩‍👩‍👦</span>
            <span>🍬 CRISPY SYRUPY DESI GHEE JALEBIS PREPARED FRESH IN FRONT OF GLASS COUNTERS 🍬</span>
            <span>✨ FESTIVE SWEETS BOOKING ACTIVE • Call +91 82220 00999 opposite Bus Stand Naraingarh ✨</span>
          </div>
        </div>

        {/* Global sticky layout Navigation */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          basketCount={totalBasketCount}
          openBasketModal={() => setIsBasketOpen(true)}
        />
      </div>

      {/* Main Dynamically Structured Sub-Views */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <div className="space-y-12 pb-16">
            <HeroSection setActiveTab={handleTabChange} />
            
            {/* Spotlight grid displaying our Signature plates */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-saffron-600">Local Favorites</span>
                <h3 className="font-serif-display text-2xl sm:text-3.5xl font-black text-maroon-950">Goyal’s Specially Recommended</h3>
                <p className="text-xs text-gray-500 max-w-lg mx-auto">Savor our two premier house masterworks. Prepared clean and fresh for visitors daily.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Spotlight 1: Maharaja Thali */}
                <div className="bg-white rounded-3xl border-2 border-saffron-500/15 royal-shadow-lg overflow-hidden flex flex-col justify-between transform transition-transform hover:-translate-y-1">
                  <div className="aspect-[16/10] overflow-hidden relative border-b-2 border-saffron-500/20 bg-gradient-to-br from-cream-100 via-saffron-50/20 to-cream-100 flex items-center justify-center">
                    <div className="text-center p-4">
                      <Crown className="w-10 h-10 text-saffron-500 mx-auto mb-2" />
                      <span className="font-serif-display font-extrabold text-[#7f1d1d] text-base uppercase tracking-wider block">
                        Maharaja Platter
                      </span>
                    </div>
                    <div className="absolute top-4 left-4 bg-maroon-950 text-saffron-200 text-[10px] font-mono font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full border border-saffron-500 shadow-md">
                      👑 Chef's Signature
                    </div>
                  </div>
                  <div className="p-6 space-y-3.5 bg-white">
                    <div className="flex justify-between items-center">
                      <h4 className="font-serif-display font-black text-xl text-maroon-950">Goyal Special Maharaja Thali</h4>
                      <span className="font-mono font-black text-[#ffffff] bg-maroon-950 px-3 py-1 rounded-xl text-sm border-2 border-saffron-500/60 shadow-inner">₹320</span>
                    </div>
                    <p className="text-xs text-gray-650 leading-relaxed font-sans-ui">
                      A luxurious, traditional Punjabi thali complete with Rich Shahi Paneer curry, buttery lentils, spiced chole, steam rice, layered flatbread, and hot Gulab Jamuns. Fully authentic.
                    </p>
                    <button
                      onClick={() => handleTabChange('menu')}
                      className="text-xs text-saffron-700 font-extrabold flex items-center hover:text-saffron-900 transition-colors cursor-pointer uppercase tracking-wider"
                    >
                      Browse full North Indian menu &rarr;
                    </button>
                  </div>
                </div>

                {/* Spotlight 2: Seekh Kababs */}
                <div className="bg-white rounded-3xl border-2 border-saffron-500/15 royal-shadow-lg overflow-hidden flex flex-col justify-between transform transition-transform hover:-translate-y-1">
                  <div className="aspect-[16/10] overflow-hidden relative border-b-2 border-saffron-500/20 bg-gradient-to-br from-cream-100 via-saffron-50/20 to-cream-100 flex items-center justify-center">
                    <div className="text-center p-4">
                      <Star className="w-10 h-10 text-saffron-500 mx-auto mb-2 fill-saffron-100/30" />
                      <span className="font-serif-display font-extrabold text-[#7f1d1d] text-base uppercase tracking-wider block">
                        Malai Seekh Kabab
                      </span>
                    </div>
                    <div className="absolute top-4 left-4 bg-maroon-950 text-saffron-200 text-[10px] font-mono font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full border border-saffron-500 shadow-md">
                      ⭐ Highly Recommended
                    </div>
                  </div>
                  <div className="p-6 space-y-3.5 bg-white">
                    <div className="flex justify-between items-center">
                      <h4 className="font-serif-display font-black text-xl text-maroon-950">Cheese Malai Seekh Kabab</h4>
                      <span className="font-mono font-black text-[#ffffff] bg-maroon-950 px-3 py-1 rounded-xl text-sm border-2 border-saffron-500/60 shadow-inner">₹260</span>
                    </div>
                    <p className="text-xs text-gray-650 leading-relaxed font-sans-ui">
                      Succulent and velvety cottage-cheese kababs marinated in heavy malai, cream, white pepper, and coriander, char-grilled to golden perfection.
                    </p>
                    <button
                      onClick={() => handleTabChange('menu')}
                      className="text-xs text-saffron-700 font-extrabold flex items-center hover:text-saffron-900 transition-colors cursor-pointer uppercase tracking-wider"
                    >
                      Browse full starters items &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Immersive Store Counter Highlight Story block */}
            <div className="bg-maroon-950 text-cream-50 py-12 relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-5 relative">
                  <span className="text-xs text-saffron-300 font-bold uppercase tracking-widest block">The Sweet Display Showcase</span>
                  <h3 className="font-serif-display text-2xl sm:text-3.5xl font-black leading-tight text-white">Our Signature Sweets Front Gate</h3>
                  <p className="text-xs text-cream-200/90 leading-relaxed">
                    Step inside Goyal's Sweets & Restaurant opposite Naraingarh Bus Stand, and you are welcomed by our premium <b>glass sweets display counter counter</b>. Neatly layered trays showcase freshly hand-rolled Besan Ladoos, pure silver-sheeted Kaju Katlis, and warm condensed Gulab Jamuns glowing under atmospheric lights.
                  </p>
                  <p className="text-xs text-cream-200/90 leading-relaxed">
                    Our confectionery items utilize 100% hygienic processes, high-end saffron seasonings, and zero artificial preservatives. Perfect for family events, corporate gifts, and festive occasions.
                  </p>
                  <button
                    onClick={() => handleTabChange('sweets')}
                    className="bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs px-5 py-3 rounded-lg border border-saffron-700 transition-colors shadow-md cursor-pointer inline-block uppercase tracking-wider"
                  >
                    Enter Confectionery Section
                  </button>
                </div>
                <div className="aspect-[4/3] rounded-3xl overflow-hidden border-2 border-saffron-500/30 shadow-2xl relative group font-sans-ui">
                  <img
                    src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAFt-KCYiHYB1Su-TbRYx4t60IqLfQBGj3BIeg39BCZIMO3AqvGTCqUEfmD1KU1Dr5lWaBD5ED67CjNNhiHcKCKjd7R5YlqZQNnFj7IO6GcL16jcclLB4Za4nJ3xPgnny6NkheqeTw=s1360-w1360-h1020-rw"
                    alt="Goyal's Sweets Showcase"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-transparent flex flex-col justify-end p-6 text-left">
                    <Crown className="w-8 h-8 text-saffron-400 mb-1.5 drop-shadow-md" />
                    <h4 className="font-serif-display font-black text-md text-saffron-100 tracking-wide uppercase">
                      Goyal’s Sweets Showcase
                    </h4>
                    <p className="text-[10px] text-cream-200/80 max-w-sm leading-relaxed uppercase tracking-wider font-mono">
                      Traditional Pure Desi Ghee Confectioneries
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location & directions blocks */}
            <MapAndDirectionSection />
          </div>
        )}

        {activeTab === 'menu' && (
          <MenuSection
            basket={basket}
            addToBasket={addToBasket}
            removeFromBasket={removeFromBasket}
          />
        )}

        {activeTab === 'sweets' && (
          <SweetsSection
            basket={basket}
            addToBasket={addToBasket}
            removeFromBasket={removeFromBasket}
            openBasketModal={() => setIsBasketOpen(true)}
          />
        )}

        {activeTab === 'gallery' && <GallerySection />}

        {activeTab === 'booking' && <ReservationSection />}

        {activeTab === 'reviews' && <AboutAndReviews mode="reviews" />}

        {activeTab === 'about' && <AboutAndReviews mode="about" />}
      </main>

      {/* Global Gifting Basket Sidebar/Modal Drawer */}
      <SweetsBasketModal
        isOpen={isBasketOpen}
        onClose={() => setIsBasketOpen(false)}
        basket={basket}
        addToBasket={addToBasket}
        removeFromBasket={removeFromBasket}
        clearBasket={clearBasket}
        setActiveTab={handleTabChange}
      />

      {/* Structured traditional Footer */}
      <footer className="bg-maroon-950 text-cream-100 border-t border-saffron-700/25 font-sans-ui mt-12 py-12 select-none relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Logo Brand summary block */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center">
              <div className="relative mr-2.5 shrink-0">
                {/* Floating gold royal crown ornament in footer */}
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-saffron-500 z-10 scale-75">
                  <Crown className="w-4 h-4 fill-saffron-500/20 text-saffron-500" />
                </div>
                <div className="w-9.5 h-9.5 bg-maroon-950 rounded-full flex items-center justify-center border-2 border-saffron-500 shadow-md relative overflow-hidden">
                  <div className="w-[30px] h-[30px] rounded-full border-2 border-saffron-300 flex items-center justify-center bg-maroon-900/50">
                    <span className="text-saffron-100 font-serif-display font-black text-sm leading-none drop-shadow-[0_1px_2.5px_rgba(0,0,0,0.5)]">G</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-serif-display text-lg font-black text-white tracking-tight leading-none">
                  Goyal’s Sweets & Restaurant
                </h4>
                <span className="text-[10px] uppercase font-mono font-bold text-saffron-400 tracking-widest block mt-1 leading-none">
                  Taste the Tradition
                </span>
              </div>
            </div>
            <p className="text-xs text-cream-200/80 leading-relaxed">
              Serving the authentic taste of pure Desi Ghee traditional sweets (mithais) and hearty, hygienic multi-cuisine family meals in Naraingarh boundary since 1998.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
              <div className="flex items-center space-x-2 text-saffron-400">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#16a34a]">Pure Vegetarian Guarantee</span>
              </div>
              <span className="text-saffron-700/40 hidden sm:inline">|</span>
              <div className="flex items-center space-x-3.5">
                <a
                  href={RESTAURANT_DETAILS.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 hover:underline transition-colors cursor-pointer"
                  title="Follow us on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                </a>
                <span className="text-saffron-700/40 text-[10px]">•</span>
                <a
                  href={RESTAURANT_DETAILS.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-widest text-pink-400 hover:text-pink-300 hover:underline transition-colors cursor-pointer"
                  title="Follow us on Instagram"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Details Quick Links */}
          <div className="lg:col-span-4 space-y-3.5">
            <h5 className="font-serif-display text-sm font-bold text-saffron-200">Contact & Landmark</h5>
            <div className="space-y-2.5 text-xs text-cream-200/90 font-medium">
              <p className="flex items-start">
                <MapPin className="w-4 h-4 text-saffron-500 mr-2.5 shrink-0" />
                <span>Opposite Bus Stand, State Highway 22, Near Axis Bank, Naraingarh, Haryana 134203</span>
              </p>
              <p className="flex items-center">
                <Phone className="w-4 h-4 text-saffron-500 mr-2.5 shrink-0" />
                <a href="tel:+918222000999" className="hover:text-cream-50 transition-colors hover:underline">
                  {RESTAURANT_DETAILS.phone} (WhatsApp Enabled)
                </a>
              </p>
              <p className="flex items-center">
                <Clock className="w-4 h-4 text-saffron-500 mr-2.5 shrink-0" />
                <span>{RESTAURANT_DETAILS.hours} (Daily Open)</span>
              </p>
            </div>
          </div>

          {/* Quick Sitemap Links */}
          <div className="lg:col-span-2 space-y-3.5">
            <h5 className="font-serif-display text-sm font-bold text-saffron-200">Quick Menu</h5>
            <ul className="space-y-2 text-xs text-cream-200/85">
              <li>
                <button onClick={() => handleTabChange('menu')} className="hover:text-saffron-400 hover:underline transition-colors cursor-pointer">
                  Dishes Menu
                </button>
              </li>
              <li>
                <button onClick={() => handleTabChange('sweets')} className="hover:text-saffron-400 hover:underline transition-colors cursor-pointer">
                  Sweets Counter
                </button>
              </li>
              <li>
                <button onClick={() => handleTabChange('booking')} className="hover:text-saffron-400 hover:underline transition-colors cursor-pointer">
                  Table Booking
                </button>
              </li>
              <li>
                <button onClick={() => handleTabChange('reviews')} className="hover:text-saffron-400 hover:underline transition-colors cursor-pointer">
                  Visitor Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Food Delivery platforms & socials */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h5 className="font-serif-display text-sm font-bold text-saffron-200 mb-2">Delivery Apps</h5>
              <ul className="space-y-2.5 text-xs text-cream-200/85">
                <li>
                  <a href="https://www.swiggy.com/city/naraingarh/goyal-sweets-restaurant-bypass-lotton-chungi-rest400294?utm_source=GooglePlaceOrder&utm_campaign=GoogleMap&is_retargeting=true&media_source=GooglePlaceOrder" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 hover:underline flex items-center space-x-1.5 transition-colors">
                    <Compass className="w-4 h-4 text-orange-400" />
                    <span>Swiggy Online</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.zomato.com/ambala/goyal-sweets-and-restaurants-naraingarh-locality/order" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 hover:underline flex items-center space-x-1.5 transition-colors">
                    <Compass className="w-4 h-4 text-red-400" />
                    <span>Zomato Menu</span>
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="pt-3 border-t border-saffron-700/20">
              <h5 className="font-serif-display text-xs font-bold text-saffron-200 mb-2.5">Connect with Us</h5>
              <div className="flex flex-col gap-2.5">
                <a
                  href={RESTAURANT_DETAILS.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 hover:underline flex items-center space-x-1.5 transition-colors text-xs text-cream-200/85 w-fit"
                >
                  <Facebook className="w-4 h-4 text-blue-400" />
                  <span>Facebook Page</span>
                </a>
                <a
                  href={RESTAURANT_DETAILS.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 hover:underline flex items-center space-x-1.5 transition-colors text-xs text-cream-200/85 w-fit"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>Instagram Profile</span>
                </a>
                <a
                  href={RESTAURANT_DETAILS.virtualTour}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-saffron-400 hover:underline flex items-center space-x-1.5 transition-colors text-xs text-cream-200/85 w-fit font-semibold"
                  title="Interactive 360° virtual window"
                >
                  <Compass className="w-4 h-4 text-saffron-400" />
                  <span>360° Virtual Shop Tour</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Brand trademark copyrights */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-saffron-700/20 mt-10 pt-6 text-center text-[10px] text-cream-200/40 relative font-sans-ui flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>© 2026 Goyal's Sweets & Restaurant Naraingarh. All rights reserved.</p>
          <div className="flex items-center space-x-1 text-cream-200/40">
            <span>Made with Indian Hospitality</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
          </div>
        </div>
      </footer>

    </div>
  );
}


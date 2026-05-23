import { useState } from 'react';
import { ShoppingCart, Heart, Sparkles, Check, HelpCircle, AlertCircle, ShoppingBag } from 'lucide-react';
import { SWEET_ITEMS, RESTAURANT_DETAILS } from '../data';
import { SweetItem, BasketItem } from '../types';

interface SweetsSectionProps {
  basket: BasketItem[];
  addToBasket: (sweet: SweetItem, weight: number, qty: number) => void;
  removeFromBasket: (id: string, weight: number) => void;
  openBasketModal: () => void;
}

export default function SweetsSection({ basket, addToBasket, removeFromBasket, openBasketModal }: SweetsSectionProps) {
  // Local state to track selected weight and quantity for each sweet card
  const [selections, setSelections] = useState<Record<string, { weight: number; qty: number }>>(
    SWEET_ITEMS.reduce((acc, item) => {
      acc[item.id] = { weight: item.availableWeights[0] || 1.0, qty: 1 };
      return acc;
    }, {} as Record<string, { weight: number; qty: number }>)
  );

  const [favorites, setFavorites] = useState<string[]>([]);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleWeightChange = (sweetId: string, weight: number) => {
    setSelections((prev) => ({
      ...prev,
      [sweetId]: { ...prev[sweetId], weight }
    }));
  };

  const handleQtyChange = (sweetId: string, delta: number) => {
    setSelections((prev) => {
      const current = prev[sweetId];
      const newQty = Math.max(1, current.qty + delta);
      return {
        ...prev,
        [sweetId]: { ...current, qty: newQty }
      };
    });
  };

  const toggleFavorite = (sweetId: string) => {
    setFavorites((prev) =>
      prev.includes(sweetId) ? prev.filter((id) => id !== sweetId) : [...prev, sweetId]
    );
  };

  const handleAddToBasket = (sweet: SweetItem) => {
    const sel = selections[sweet.id];
    addToBasket(sweet, sel.weight, sel.qty);
    
    // Set a quick success indicator toast
    setSuccessMsg(`Added ${sel.qty} Box of ${sweet.name} (${sel.weight}kg) to your sweets basket!`);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans-ui" id="sweets-section">
      {/* Toast Helper */}
      {successMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-green-900 border border-green-700 text-cream-50 font-bold p-4.5 rounded-2xl shadow-2xl flex items-center space-x-2 animate-bounce max-w-sm">
          <Check className="w-5 h-5 text-green-400 shrink-0" />
          <span className="text-xs">{successMsg}</span>
        </div>
      )}

      {/* Grid section header */}
      <div className="text-center space-y-3 mb-10">
        <span className="text-xs font-extrabold uppercase tracking-widest text-saffron-600 bg-saffron-100/50 px-3 py-1 rounded-full">
          Mithai Shop Counter
        </span>
        <h3 className="font-serif-display text-3xl sm:text-4xl font-black text-maroon-950">
          Order Fresh Traditional Sweets
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm">
          Indulge in our exquisite collection of authentic festive Indian sweets made with premium ingredients, cardamom spices and pure Desi Ghee. Select your custom boxes below!
        </p>
      </div>

      {/* Online Options Helper Panel */}
      <div className="bg-gradient-to-r from-saffron-50 to-cream-200 border border-saffron-500/20 p-5 rounded-3xl mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="font-serif-display font-black text-base text-maroon-950 flex items-center justify-center md:justify-start">
            <Sparkles className="w-4 h-4 mr-1.5 text-saffron-600 animate-spin" />
            Two Ways to Order Sweets Online
          </h4>
          <p className="text-xs text-gray-700 max-w-xl">
            Sweets are packaged beautifully on metallic brass-colored trays. <b>Build a custom assortment box</b> on our website and order direct via WhatsApp, or find us instantly on food delivery apps.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5 w-full md:w-auto justify-center">
          <a
            href="https://www.zomato.com/ambala/goyal-sweets-and-restaurants-naraingarh-locality/order"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-red-700 shadow-md transform hover:-translate-y-0.5 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Zomato Delivery</span>
          </a>
          <a
            href="https://www.swiggy.com/city/naraingarh/goyal-sweets-restaurant-bypass-lotton-chungi-rest400294?utm_source=GooglePlaceOrder&utm_campaign=GoogleMap&is_retargeting=true&media_source=GooglePlaceOrder"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-orange-700 shadow-md transform hover:-translate-y-0.5 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Swiggy Delivery</span>
          </a>
        </div>
      </div>

      {/* Sweets Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SWEET_ITEMS.map((sweet) => {
          const sel = selections[sweet.id] || { weight: 0.5, qty: 1 };
          const isFav = favorites.includes(sweet.id);

          // Calculate visual individual items prices dynamically
          const calculatedPrice = Math.round(sweet.pricePerKg * sel.weight * sel.qty);

          return (
            <div
              key={sweet.id}
              id={`sweet-card-${sweet.id}`}
              className="bg-white rounded-3xl border-2 border-saffron-500/15 royal-shadow overflow-hidden flex flex-col justify-between hover:border-saffron-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Box Image Header with gold bezel overlay */}
              <div className="relative aspect-[4/3] w-full bg-cream-100 overflow-hidden border-b-2 border-saffron-500/20">
                <div className="w-full h-full bg-gradient-to-br from-cream-50 via-saffron-50/50 to-cream-100 flex items-center justify-center relative">
                  <div className="text-center p-4">
                    <Sparkles className="w-8 h-8 text-saffron-500/80 mx-auto mb-1.5" />
                    <span className="font-serif-display font-extrabold text-[#7f1d1d]/85 text-xs tracking-wider block uppercase max-w-[160px] mx-auto">
                      {sweet.name}
                    </span>
                  </div>
                </div>
                
                {/* Hearts / Favorites & BestSeller float banners */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                  {sweet.isBestSeller && (
                    <span className="bg-maroon-950 text-cream-50 text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md border border-saffron-500">
                      🏅 Best Seller
                    </span>
                  )}
                  <button
                    onClick={() => toggleFavorite(sweet.id)}
                    className="ml-auto p-2.5 bg-[#ffffff]/95 backdrop-blur-sm rounded-full shadow-md border border-saffron-500/20 text-maroon-900 hover:scale-110 active:scale-95 transition-transform"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-red-650 text-red-650' : 'text-gray-400'}`} />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 rounded-b-xl">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-saffron-200 font-extrabold">Pure Desi Ghee</span>
                  <p className="text-sm font-serif-display font-medium text-cream-50 mt-0.5">₹{sweet.pricePerKg} per Kilogram</p>
                </div>
              </div>

              {/* Box Details Card Body */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-5 bg-white">
                <div className="space-y-2">
                  <h4 className="font-serif-display font-black text-[19px] text-maroon-950 leading-snug">
                    {sweet.name}
                  </h4>
                  <p className="text-xs text-gray-650 leading-relaxed font-sans-ui line-clamp-2">
                    {sweet.description}
                  </p>
                </div>

                {/* Weight Options Selection tabs */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-extrabold text-[#8a7251] uppercase tracking-widest block font-sans-ui">
                    Select Packaging weight
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {sweet.availableWeights.map((w) => (
                      <button
                        key={w}
                        onClick={() => handleWeightChange(sweet.id, w)}
                        className={`py-2 rounded-xl text-xs font-mono font-bold border-2 transition-all cursor-pointer ${
                          sel.weight === w
                            ? 'bg-maroon-950 border-saffron-500 text-saffron-200'
                            : 'bg-[#ffffff] border-gray-200 text-gray-700 hover:bg-cream-100 hover:border-gray-300'
                        }`}
                      >
                        {w >= 1.0 ? `${w} kg` : `${w * 1000}g`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Controls and Live Price Counter */}
                <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-200">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block">Quantity</span>
                    <div className="flex items-center bg-cream-100 border-2 border-saffron-500/10 rounded-xl p-0.5 shadow-inner">
                      <button
                        onClick={() => handleQtyChange(sweet.id, -1)}
                        className="w-8 h-8 flex items-center justify-center text-maroon-950 hover:bg-cream-200 rounded-lg text-base font-black cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-gray-900">{sel.qty}</span>
                      <button
                        onClick={() => handleQtyChange(sweet.id, 1)}
                        className="w-8 h-8 flex items-center justify-center text-maroon-950 hover:bg-cream-200 rounded-lg text-base font-black cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono font-bold text-[#8a7251] uppercase tracking-widest block">Total Price</span>
                    <span className="font-mono text-2xl font-black text-maroon-950 block leading-tight">
                      ₹{calculatedPrice}
                    </span>
                  </div>
                </div>

                {/* Add To Basket CTA */}
                <button
                  id={`sweet-add-btn-${sweet.id}`}
                  onClick={() => handleAddToBasket(sweet)}
                  className="w-full bg-maroon-900 hover:bg-maroon-950 text-[#ffffff] font-serif-display font-bold text-xs py-3.5 rounded-xl border-2 border-saffron-500/40 hover:border-saffron-500 transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-wider"
                >
                  <ShoppingCart className="w-4 h-4 text-saffron-400" />
                  <span>ADD TO CUSTOM GIFT BOX</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Floating View sweets box summary launcher */}
      <div className="mt-12 bg-cream-50 border border-saffron-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="bg-saffron-100 p-3 rounded-full text-saffron-700">
            <ShoppingCart className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="font-serif-display text-base font-bold text-maroon-950">Your custom sweets basket</h4>
            <p className="text-xs text-gray-600 max-w-xl">
              You have currently added <b>{basket.reduce((tot, item) => tot + item.quantity, 0)} boxes</b> to your cart. Click the cart launcher panel to review, compute total price, and export directly via WhatsApp!
            </p>
          </div>
        </div>
        <button
          onClick={openBasketModal}
          className="w-full md:w-auto bg-maroon-900 hover:bg-maroon-950 text-cream-50 font-bold text-xs px-5 py-3.5 rounded-xl border border-maroon-950 transition-colors shadow flex items-center justify-center space-x-1 cursor-pointer"
        >
          <span>Open Custom Sweets Basket</span>
        </button>
      </div>
    </section>
  );
}

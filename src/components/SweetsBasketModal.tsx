import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Phone, ShoppingBag, Send, CreditCard, Clock } from 'lucide-react';
import { BasketItem } from '../types';
import { RESTAURANT_DETAILS } from '../data';

interface SweetsBasketModalProps {
  isOpen: boolean;
  onClose: () => void;
  basket: BasketItem[];
  addToBasket: (sweet: any, weight: number, qty: number) => void;
  removeFromBasket: (id: string, weight: number) => void;
  clearBasket: () => void;
  setActiveTab: (tab: string) => void;
}

export default function SweetsBasketModal({
  isOpen,
  onClose,
  basket,
  addToBasket,
  removeFromBasket,
  clearBasket,
  setActiveTab
}: SweetsBasketModalProps) {
  
  const totalItems = basket.reduce((tot, item) => tot + item.quantity, 0);
  
  const totalPrice = basket.reduce((tot, item) => {
    if (item.sweet && item.weight !== undefined) {
      return tot + Math.round(item.sweet.pricePerKg * item.weight * item.quantity);
    } else if (item.menuItem) {
      return tot + Math.round(item.menuItem.price * item.quantity);
    }
    return tot;
  }, 0);

  // Auto-formats the checkout text receipt for WhatsApp
  const handleWhatsAppCheckout = () => {
    if (basket.length === 0) return;

    let textMsg = `Hello Goyal's Sweets & Restaurant! I'd like to place an order for the following fresh items:%0A%0A`;
    
    basket.forEach((item, index) => {
      if (item.sweet && item.weight !== undefined) {
        const itemPrice = Math.round(item.sweet.pricePerKg * item.weight * item.quantity);
        const wtLabel = item.weight >= 1.0 ? `${item.weight}kg` : `${item.weight * 1000}g`;
        textMsg += `${index + 1}. *Sweet: ${item.sweet.name}* (${wtLabel})%0A`;
        textMsg += `   _Box Quantity:_ ${item.quantity} | _Subtotal:_ ₹${itemPrice}%0A%0A`;
      } else if (item.menuItem) {
        const itemPrice = Math.round(item.menuItem.price * item.quantity);
        textMsg += `${index + 1}. *Cuisine: ${item.menuItem.name}*%0A`;
        textMsg += `   _Quantity:_ ${item.quantity} | _Subtotal:_ ₹${itemPrice}%0A%0A`;
      }
    });

    textMsg += `*Grand Total Amount:* ₹${totalPrice}%0A%0A`;
    textMsg += `Please verify this order and let me know when I can collect it or get it delivered opposite the Bus Stand. Thank you!`;

    const waUrl = `https://wa.me/918222000999?text=${textMsg}`;
    window.open(waUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm font-sans-ui">
        
        {/* Modal Panel Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Row */}
          <div className="bg-maroon-900 px-6 py-5 text-cream-100 flex justify-between items-center border-b border-maroon-950">
            <div className="flex items-center space-x-2.5">
              <ShoppingBag className="w-5 h-5 text-saffron-300" />
              <div>
                <h4 className="font-serif-display text-lg font-bold leading-none">Your Sweets Basket</h4>
                <span className="text-[10px] text-cream-200 uppercase tracking-wider block mt-1">
                  Custom Festive Box Builder
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 bg-white/10 rounded-full hover:bg-white/20 text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content Scrollable Area */}
          <div className="flex-grow p-6 overflow-y-auto space-y-6">
            {basket.length === 0 ? (
              /* Empty Basket Layout */
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-saffron-50 rounded-full flex items-center justify-center mx-auto text-saffron-600 border border-saffron-200">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="font-serif-display font-extrabold text-base text-maroon-950">Your basket is empty</p>
                  <p className="text-xs text-gray-400 max-w-xs mx-auto">
                    Fill your plate! Select your choice of premium Sweets, North Indian curries, and tasty Chinese platters to build your custom direct-to-WhatsApp order!
                  </p>
                </div>
                <div className="flex justify-center gap-3 flex-wrap">
                  <button
                    onClick={() => {
                      setActiveTab('sweets');
                      onClose();
                    }}
                    className="bg-saffron-600 hover:bg-saffron-700 text-white font-serif-display font-bold text-[11px] px-4 py-2.5 rounded-xl border border-saffron-700 transition-colors shadow cursor-pointer uppercase tracking-wider"
                  >
                    Browse Sweets
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('menu');
                      onClose();
                    }}
                    className="bg-maroon-900 hover:bg-maroon-950 text-white font-serif-display font-bold text-[11px] px-4 py-2.5 rounded-xl border border-maroon-950 transition-colors shadow cursor-pointer uppercase tracking-wider"
                  >
                    Browse Restaurant Menu
                  </button>
                </div>
              </div>
            ) : (
              /* Basket list items list */
              <div className="space-y-4 divide-y divide-gray-100">
                {basket.map((item, index) => {
                  const isSweet = !!item.sweet;
                  const itemPrice = isSweet
                    ? Math.round(item.sweet!.pricePerKg * item.weight! * item.quantity)
                    : Math.round(item.menuItem!.price * item.quantity);
                  
                  const name = isSweet ? item.sweet!.name : item.menuItem!.name;
                  const image = isSweet ? item.sweet!.image : item.menuItem!.image;
                  
                  const wtLabel = isSweet
                    ? (item.weight! >= 1.0 ? `${item.weight} kg` : `${item.weight! * 1000} g`)
                    : 'Portion';
                  const unitLabel = isSweet
                    ? `Unit: ₹${item.sweet!.pricePerKg}/kg`
                    : `Price: ₹${item.menuItem!.price}`;

                  return (
                    <div
                      key={isSweet ? `${item.sweet!.id}-${item.weight}` : item.menuItem!.id}
                      id={`basket-item-${isSweet ? item.sweet!.id : item.menuItem!.id}-${index}`}
                      className="flex items-center justify-between gap-4 pt-4 first:pt-0"
                    >
                      {/* Left: thumb picture */}
                      <div className="w-12 h-12 rounded-xl border border-gray-100 bg-gradient-to-br from-cream-100 to-saffron-50/40 shrink-0 flex items-center justify-center text-lg select-none">
                        {isSweet ? '🍯' : '🍛'}
                      </div>

                      {/* Center: Details name/weight */}
                      <div className="flex-grow min-w-0">
                        <h5 className="font-serif-display font-bold text-sm text-maroon-950 truncate leading-tight">
                          {name}
                        </h5>
                        <div className="flex items-center mt-0.5 space-x-2 text-[10px] text-gray-500 font-sans-ui font-semibold">
                          <span className="bg-saffron-50 border border-saffron-100 text-saffron-800 px-1.5 py-0.5 rounded-md leading-none select-none">
                            {wtLabel}
                          </span>
                          <span>{unitLabel}</span>
                        </div>
                      </div>

                      {/* Right: Quantity increment button & price */}
                      <div className="flex items-center space-x-3 shrink-0">
                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-0.5">
                          <button
                            onClick={() => {
                              if (isSweet) {
                                removeFromBasket(item.sweet!.id, item.weight!);
                              } else {
                                removeFromBasket(item.menuItem!.id, -1);
                              }
                            }}
                            className="w-6 h-6 flex items-center justify-center text-gray-500 hover:bg-gray-200 rounded-md text-xs font-bold cursor-pointer"
                            title="Decrease Quantity"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-gray-700">{item.quantity}</span>
                          <button
                            onClick={() => {
                              if (isSweet) {
                                addToBasket(item.sweet!.id, item.weight!, 1);
                              } else {
                                addToBasket(item.menuItem!, -1, 1);
                              }
                            }}
                            className="w-6 h-6 flex items-center justify-center text-gray-500 hover:bg-gray-200 rounded-md text-xs font-bold cursor-pointer"
                            title="Increase Quantity"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right w-16">
                          <span className="font-serif-display font-black text-sm text-maroon-950 block">
                            ₹{itemPrice}
                          </span>
                        </div>
                      </div>

                    </div>
                  );
                })}

                {/* Clear Cart utility button */}
                <div className="pt-4 flex justify-between items-center text-xs">
                  <span className="text-gray-400 font-medium">Selected Types: {basket.length}</span>
                  <button
                    onClick={clearBasket}
                    className="text-red-650 hover:text-red-800 font-bold flex items-center space-x-1 hover:underline cursor-pointer"
                    id="clear-basket-btn"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-600" />
                    <span className="text-red-600">Clear All Items</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Receipt Summary and checkout buttons */}
          {basket.length > 0 && (
            <div className="bg-cream-50 p-6 border-t border-gray-100 space-y-4">
              <div className="space-y-1.5 font-sans-ui text-xs">
                <div className="flex justify-between text-gray-500">
                  <span>Gross Quantities:</span>
                  <span>{totalItems} Boxes</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Packaging & Gifting Garnish:</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-base font-serif-display font-extrabold text-maroon-950 border-t border-dashed border-gray-200 pt-2.5">
                  <span>Estimated Total Amount:</span>
                  <span className="font-mono text-lg text-maroon-900">₹{totalPrice}</span>
                </div>
              </div>

              {/* Delivery Warning */}
              <div className="bg-saffron-50 border border-saffron-100 rounded-xl p-3 flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-saffron-700 shrink-0 mt-0.5" />
                <p className="text-[10px] text-saffron-800 leading-normal">
                  Our shop preparing sweet boxes fresh hourly. Confirming via WhatsApp triggers custom manual packaging on beautiful brass metallic trays, which is held safe till you arrive.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={handleWhatsAppCheckout}
                  id="basket-checkout-wa-btn"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xs py-3.5 rounded-xl border border-green-700 shadow transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Order via WhatsApp</span>
                </button>

                <a
                  href={`tel:${RESTAURANT_DETAILS.phone.replace(/\s+/g, '')}`}
                  className="w-full bg-maroon-900 hover:bg-maroon-950 text-white font-bold text-xs py-3.5 rounded-xl border border-maroon-950 transition-colors shadow flex items-center justify-center space-x-1.5"
                >
                  <Phone className="w-4 h-4 text-saffron-300" />
                  <span>Call to Finalize Order</span>
                </a>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}

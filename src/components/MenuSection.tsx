import { useState } from 'react';
import { 
  Search, Flame, Star, Sparkles, SlidersHorizontal, Grid, List, Plus, Minus, 
  ShoppingBag, BookOpen, FileText, Image as ImageIcon, ExternalLink, ChevronLeft, ChevronRight, Check, Compass
} from 'lucide-react';
import { MENU_ITEMS, RESTAURANT_DETAILS } from '../data';
import { MenuItem, BasketItem } from '../types';

interface MenuSectionProps {
  basket?: BasketItem[];
  addToBasket?: (menuItem: MenuItem, weight: number, qty: number) => void;
  removeFromBasket?: (id: string, weight: number) => void;
}

export default function MenuSection({ basket = [], addToBasket, removeFromBasket }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isListView, setIsListView] = useState<boolean>(false);
  const [menuViewMode, setMenuViewMode] = useState<'order' | 'overview' | 'cards'>('order');
  const [activeCardPage, setActiveCardPage] = useState<number>(0);

  const categories = ['All', 'North Indian', 'Chinese', 'South Indian', 'Sweets', 'Beverages'];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Render the official Indian Vegetarian Symbol (Green square with green circle inside)
  const VegSymbol = () => (
    <span className="inline-flex items-center justify-center border-2 border-green-600 p-0.5 w-[14px] h-[14px] mr-1.5 shrink-0" title="Pure Vegetarian">
      <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
    </span>
  );

  const cardPages = [
    {
      title: "Royal Sabzis & Special Platters",
      desc: "Authentic, buttery curries cooked fresh using premium paneer & traditional spices.",
      items: [
        { name: "Goyal Special Maharaja Thali", price: 320, desc: "Paneer butter masala, Dal makhani, Chole, Rice, Butter Naan, Raita, Gulab Jamun (2 pcs).", tag: "Best Seller" },
        { name: "Cheese Malai Seekh Kabab", price: 260, desc: "Succulent vegetarian seekh kababs crafted with premium cottage cheese and cream.", tag: "Chef Special" },
        { name: "Paneer Butter Masala", price: 220, desc: "Soft fresh cottage cheese cubes simmered in creamy buttery tomato gravy." },
        { name: "Chana Masala with Bhature (2 Pcs)", price: 180, desc: "Spiced tangy chickpeas served with two hot golden fluffy fried breads." },
        { name: "Dal Makhani Deluxe", price: 190, desc: "Rich premium black lentils slow cooked overnight with home-ground butter & cream." },
        { name: "Shahi Paneer Special", price: 210, desc: "Delicate royal paneer triangles in dense light-orange cashew almond curry." },
        { name: "Mix Vegetable Jalfrezi", price: 170, desc: "Stir fried cauliflower florets, beans, peas, and bell peppers in dry tomato paste." }
      ]
    },
    {
      title: "South Indian & Chinese Wok",
      desc: "Super-crispy golden dosas and piping hot Chinese wok-tossed fast street noodles.",
      items: [
        { name: "Special Masala Dosa", price: 140, desc: "Paper-thin crispy rice crepe filled with yellow mustard tempered potato mash." },
        { name: "Paneer Butter Masala Dosa", price: 170, desc: "Dosa loaded with delicious grated spiced Paneer, butter, and garlic chutney.", tag: "Must Try" },
        { name: "Steamed Idli Sambhar (2 Pcs)", price: 80, desc: "Light-as-air steamed rice cakes served with bubbling home-style vegetable sambar." },
        { name: "Veg Hakka Noodles", price: 150, desc: "Perfectly seasoned thin noodles tossed with shredded bell peppers & light soy." },
        { name: "Chilli Paneer Dry / Gravy", price: 210, desc: "Battered paneer cubes tossed in garlic, green chillies, and sharp dark soy.", tag: "Hot & Spicy" },
        { name: "Special Veg Manchurian", price: 170, desc: "Deep-fried mixed veg balls in thick aromatic punchy sweet and sour sauce." }
      ]
    },
    {
      title: "Sweets Corner & Confectionery",
      desc: "Our legendary pure Desi Ghee traditional sweets crafted daily in Naraingarh since 1998.",
      items: [
        { name: "Fresh Hot Jalebi (Portion)", price: 90, desc: "Crisp golden fermented spirals fried in Desi Ghee & dipped in warm syrup.", tag: "Super Hit" },
        { name: "Besan Desi Ghee Ladoo (per Kg)", price: 480, desc: "Roasted nutty gram flour sweet spheres cooked fully in fine Desi Ghee." },
        { name: "Pure Kaju Katli (per Kg)", price: 900, desc: "Premium quality cashew melded into silver foil coated classic diamond fudges.", tag: "Premium" },
        { name: "Sponge Rasgulla (Per piece)", price: 20, desc: "Traditional light spongy chenna balls soaked in sweet simple water syrup." },
        { name: "Premium Gulab Jamun (Two pcs)", price: 50, desc: "Rich sweet-soaked dumplings served warm with aromatic syrup essence." },
        { name: "Kesar Khoya Peda (per Kg)", price: 450, desc: "Rich condensed milk disks flavored with real Kashmiri saffron elements." }
      ]
    },
    {
      title: "Starters, Shakes & Beverages",
      desc: "Chilled rich Punjabi lassis, savory starters, and authentic cardamom tea lines.",
      items: [
        { name: "Paneer Tikka Tandoori", price: 220, desc: "Hand-skewered cottage cheese chunks marinated in spiced yogurt and grilled fresh." },
        { name: "Crispy Creamy Veg Spring Rolls", price: 130, desc: "Hand-rolled golden wraps loaded with seasoned cabbage, carrots, and sweet bell lines." },
        { name: "Sweet Thick Lassi", price: 80, desc: "Creamy pure-curd lassi blended with sugar, sweet cream, and crushed cardamom.", tag: "Traditional" },
        { name: "Mango Shake with Ice Cream", price: 110, desc: "Rich summer thick shake topped with a generous scoop of premium vanilla cream." },
        { name: "Cold Butter Milk (Chaas)", price: 40, desc: "Refreshing churned yogurt drink loaded with robust roasted cumin salt lines." },
        { name: "Premium Indian Masala Chai", price: 25, desc: "Naraingarh's favorite: milk tea infused with cardamom, ginger, and cloves." }
      ]
    }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans-ui" id="menu-section">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-10">
        <span className="text-xs font-extrabold uppercase tracking-widest text-saffron-600 bg-saffron-100/50 px-3 py-1 rounded-full">
          Gourmet Menu
        </span>
        <h3 className="font-serif-display text-3xl sm:text-4xl font-black text-maroon-950">
          Our Culinary Masterpieces
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm">
          Fresh, hygienic ingredients crafted into rich traditional recipes. From royal North Indian platters to crispy dosas and street snacks, entirely pure-vegetarian.
        </p>
      </div>

      {/* Menu Mode Switcher Selector */}
      <div className="flex justify-center max-w-2xl mx-auto bg-cream-100 p-1.5 rounded-2xl border border-saffron-500/15 mb-10" id="menu-view-mode-tabs">
        <button
          onClick={() => setMenuViewMode('order')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl font-serif-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
            menuViewMode === 'order'
              ? 'bg-maroon-950 text-cream-50 shadow'
              : 'text-gray-600 hover:text-maroon-950'
          }`}
        >
          <ShoppingBag className="w-4 h-4 text-saffron-400" />
          <span className="hidden xs:inline">Order Online</span>
          <span className="xs:hidden">Order</span>
        </button>
        <button
          onClick={() => setMenuViewMode('overview')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl font-serif-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
            menuViewMode === 'overview'
              ? 'bg-maroon-950 text-cream-50 shadow'
              : 'text-gray-600 hover:text-maroon-950'
          }`}
        >
          <FileText className="w-4 h-4 text-saffron-400" />
          <span className="hidden xs:inline">Full Menu Overview</span>
          <span className="xs:hidden">Overview</span>
        </button>
        <button
          onClick={() => setMenuViewMode('cards')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl font-serif-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
            menuViewMode === 'cards'
              ? 'bg-maroon-950 text-cream-50 shadow'
              : 'text-gray-600 hover:text-maroon-950'
          }`}
        >
          <BookOpen className="w-4 h-4 text-saffron-400" />
          <span className="hidden xs:inline">Scanned Menu Cards</span>
          <span className="xs:hidden">Menu Cards</span>
        </button>
      </div>

      {menuViewMode === 'order' && (
        <>
          {/* Filters & Search Control Bar */}
          <div className="bg-[#ffffff] rounded-3xl border-2 border-saffron-500/20 royal-shadow p-5 sm:p-6 mb-10 flex flex-col md:flex-row gap-5 items-center justify-between animate-fadeIn">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`menu-cat-btn-${cat.toLowerCase().replace(/\s+/g, '')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-xl font-serif-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer border-2 ${
                selectedCategory === cat
                  ? 'bg-maroon-950 text-cream-50 border-saffron-500 shadow-md'
                  : 'bg-cream-100 border-transparent text-gray-700 hover:bg-cream-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input and View Selectors */}
        <div className="flex items-center space-x-3 w-full md:w-auto shrink-0">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              id="menu-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g. thali)..."
              className="w-full pl-9 pr-4 py-2 bg-cream-100 text-xs sm:text-sm rounded-xl border-none focus:ring-2 focus:ring-saffron-500 focus:outline-none placeholder-gray-400 text-gray-700"
            />
          </div>

          <div className="flex bg-cream-100 p-1 rounded-xl border border-gray-100 shrink-0">
            <button
              onClick={() => setIsListView(false)}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${!isListView ? 'bg-white text-maroon-900 shadow' : 'text-gray-500'}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsListView(true)}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${isListView ? 'bg-white text-maroon-900 shadow' : 'text-gray-500'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Dishes Grid / List layout */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500 text-sm">No dishes matched your searching query or filter.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="mt-3 text-xs text-saffron-600 font-bold hover:underline"
          >
            Reset All Filters
          </button>
        </div>
      ) : isListView ? (
        /* Detailed List View */
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100 overflow-hidden">
          {filteredItems.map((item) => {
            const basketItem = basket.find((b) => b.menuItem && b.menuItem.id === item.id);
            const quantityInBasket = basketItem ? basketItem.quantity : 0;
            return (
              <div
                key={item.id}
                id={`menu-item-list-${item.id}`}
                className={`p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors hover:bg-cream-50/50 ${
                  item.isSignature ? 'bg-saffron-50/10 border-l-4 border-saffron-500 pl-[16px]' : ''
                }`}
              >
                <div className="space-y-1.5 flex-grow">
                  <div className="flex items-center flex-wrap gap-2">
                    <VegSymbol />
                    <h4 className="font-serif-display font-extrabold text-base text-maroon-950 flex items-center">
                      {item.name}
                      {item.isSignature && (
                        <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded bg-saffron-100 text-saffron-800 text-[9px] font-bold">
                          <Star className="w-2.5 h-2.5 fill-saffron-500 text-saffron-500 mr-0.5" />
                          Chef's Choice
                        </span>
                      )}
                    </h4>
                    <span className="text-xs font-mono font-extrabold bg-maroon-50 text-maroon-900 px-2 py-0.5 rounded-full ml-auto sm:ml-0">
                      ₹{item.price}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 max-w-3xl leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex items-center space-x-3 text-[11px] text-gray-500 font-medium">
                    <span className="bg-gray-100 px-2 py-0.5 rounded-md text-gray-600">{item.category}</span>
                    {item.spicyLevel !== undefined && item.spicyLevel > 0 && (
                      <span className="flex items-center text-red-600">
                        <Flame className="w-3.5 h-3.5 mr-0.5 fill-red-100" />
                        {Array(item.spicyLevel).fill('🌶️').join('')} Spicy
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center justify-end sm:justify-center gap-3 shrink-0 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100/60 font-sans-ui">
                  {item.image && (
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cream-100 to-saffron-50/40 shadow-sm border border-gray-100 shrink-0 hidden sm:flex items-center justify-center text-lg select-none">
                      🍛
                    </div>
                  )}
                  
                  {addToBasket && (
                    <div className="shrink-0">
                      {quantityInBasket > 0 ? (
                        <div className="flex items-center bg-cream-50 border-2 border-saffron-500/20 rounded-xl p-0.5 shadow-sm">
                          <button
                            onClick={() => removeFromBasket && removeFromBasket(item.id, -1)}
                            className="w-7 h-7 flex items-center justify-center text-maroon-950 hover:bg-cream-200 rounded-lg text-sm font-black cursor-pointer transition-all active:scale-90"
                            title="Decrease Item"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-gray-900 leading-none">{quantityInBasket}</span>
                          <button
                            onClick={() => addToBasket && addToBasket(item, -1, 1)}
                            className="w-7 h-7 flex items-center justify-center text-maroon-950 hover:bg-cream-200 rounded-lg text-sm font-black cursor-pointer transition-all active:scale-90"
                            title="Increase Item"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToBasket && addToBasket(item, -1, 1)}
                          className="px-3 py-1.5 bg-maroon-900 border border-saffron-500/30 text-white font-serif-display font-bold text-[10px] uppercase tracking-wider rounded-xl shadow-sm hover:bg-maroon-950 hover:border-saffron-500 transition-all duration-300 flex items-center space-x-1 shrink-0 cursor-pointer active:scale-95"
                        >
                          <ShoppingBag className="w-3 h-3 text-saffron-400" />
                          <span>Add to Order</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Dynamic Grid View (Bento styling for Signature items) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const isSignatureCard = item.isSignature;
            const basketItem = basket.find((b) => b.menuItem && b.menuItem.id === item.id);
            const quantityInBasket = basketItem ? basketItem.quantity : 0;
            return (
              <div
                key={item.id}
                id={`menu-item-card-${item.id}`}
                className={`rounded-3xl border-2 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:scale-[1.02] ${
                  isSignatureCard
                    ? 'border-saffron-500 bg-gradient-to-br from-cream-50 to-saffron-50/25 royal-shadow-lg'
                    : 'border-saffron-500/10 bg-white royal-shadow hover:border-saffron-500/50'
                }`}
              >
                {/* Product Image */}
                {item.image ? (
                  <div className="relative aspect-[4/3] w-full bg-cream-200 overflow-hidden group">
                    <div className="w-full h-full bg-gradient-to-br from-cream-50 via-saffron-55/40 to-cream-100 flex items-center justify-center relative">
                      <div className="text-center p-4">
                        <Sparkles className="w-8 h-8 text-saffron-500/80 mx-auto mb-1.5" />
                        <span className="font-serif-display font-extrabold text-[#7f1d1d]/85 text-xs tracking-wider block uppercase max-w-[160px] mx-auto">
                          {item.name}
                        </span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 pointer-events-none" />
                    
                    {/* Floating Badges */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-lg shadow-sm flex items-center border border-gray-100">
                      <VegSymbol />
                      <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">VEG</span>
                    </div>

                    {isSignatureCard && (
                      <div className="absolute top-3 right-3 bg-maroon-800 text-cream-50 pl-2 pr-2.5 py-1 rounded-lg text-[10px] font-bold shadow-md flex items-center space-x-1 border border-maroon-900">
                        <Star className="w-3 h-3 fill-saffron-400 text-saffron-400" />
                        <span className="uppercase tracking-wider">Signature Special</span>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Smaller text card decoration-header when no image exists */
                  <div className="p-4.5 pb-0 flex justify-between items-start">
                    <div className="flex items-center">
                      <VegSymbol />
                      <span className="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded font-extrabold uppercase">PURE VEG</span>
                    </div>
                  </div>
                )}

                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    {/* Header: Name and Price */}
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-serif-display font-extrabold text-base text-maroon-950 leading-tight">
                        {item.name}
                      </h4>
                      <span className="text-sm font-mono font-extrabold text-maroon-900 bg-maroon-50 border border-maroon-100 shrink-0 px-2.5 py-0.5 rounded-lg leading-none mt-0.5">
                        ₹{item.price}
                      </span>
                    </div>

                    {/* Desc Description */}
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer Labels */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 text-[11px] text-gray-500 font-medium font-sans-ui">
                    <span className="bg-gray-100 px-2 py-0.5 rounded-md text-gray-600">{item.category}</span>
                    <div className="flex items-center space-x-2">
                      {item.spicyLevel !== undefined && item.spicyLevel > 0 && (
                        <span className="flex items-center text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded-md">
                          <Flame className="w-3.5 h-3.5 mr-0.5 fill-red-100" />
                          Spicy
                        </span>
                      )}
                    </div>
                  </div>

                  {addToBasket && (
                    <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-gray-400">Order Online</span>
                      {quantityInBasket > 0 ? (
                        <div className="flex items-center bg-cream-50 border-2 border-saffron-500/25 rounded-xl p-0.5 shadow-sm">
                          <button
                            onClick={() => removeFromBasket && removeFromBasket(item.id, -1)}
                            className="w-7 h-7 flex items-center justify-center text-maroon-950 hover:bg-cream-200 rounded-lg text-sm font-black cursor-pointer transition-all active:scale-90"
                            title="Decrease Item"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-gray-900 leading-none">{quantityInBasket}</span>
                          <button
                            onClick={() => addToBasket && addToBasket(item, -1, 1)}
                            className="w-7 h-7 flex items-center justify-center text-maroon-950 hover:bg-cream-200 rounded-lg text-sm font-black cursor-pointer transition-all active:scale-90"
                            title="Increase Item"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToBasket && addToBasket(item, -1, 1)}
                          className="px-4 py-1.5 bg-maroon-900 border border-saffron-500/30 text-white font-serif-display font-bold text-[10px] uppercase tracking-wider rounded-xl shadow-sm hover:bg-maroon-950 hover:border-saffron-500 transition-all duration-300 flex items-center space-x-1 cursor-pointer active:scale-95"
                        >
                          <ShoppingBag className="w-3 h-3 text-saffron-400" />
                          <span>Add to Order</span>
                        </button>
                      )}
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      )}
        </>
      )}

      {/* 2. Full Menu Overview Mode */}
      {menuViewMode === 'overview' && (
        <div className="space-y-10 animate-fadeIn" id="full-menu-overview-view">
          <div className="bg-white rounded-3xl border-2 border-saffron-500/10 p-6 sm:p-10 royal-shadow max-w-4xl mx-auto">
            <div className="text-center border-b-2 border-double border-saffron-500/30 pb-6 mb-8">
              <span className="text-xs font-bold text-saffron-600 uppercase tracking-widest">Goyal’s Sweets & Restaurant</span>
              <h4 className="font-serif-display text-2.5xl font-black text-maroon-950 uppercase mt-1">Complete Culinary Catalog</h4>
              <p className="text-xs text-gray-500 mt-1.5 font-sans-ui">Scan our entire list of pure-vegetarian offerings with up-to-date prices.</p>
            </div>

            <div className="space-y-12">
              {['North Indian', 'Chinese', 'South Indian', 'Sweets', 'Beverages'].map((catName) => {
                const itemsInCat = MENU_ITEMS.filter(it => it.category === catName);
                if (itemsInCat.length === 0) return null;
                return (
                  <div key={catName} className="space-y-4">
                    <div className="flex items-center space-x-3 border-b border-gray-150 pb-2">
                      <span className="w-1.5 h-6 bg-saffron-550 rounded-full" />
                      <h5 className="font-serif-display font-extrabold text-lg text-maroon-950 uppercase tracking-wider">{catName}</h5>
                      <span className="text-[10px] bg-saffron-100 text-saffron-850 px-2 py-0.5 rounded-full font-bold uppercase font-mono">{itemsInCat.length} Items</span>
                    </div>

                    <div className="divide-y divide-gray-100/75">
                      {itemsInCat.map((item) => {
                        const basketItem = basket.find((b) => b.menuItem && b.menuItem.id === item.id);
                        const quantityInBasket = basketItem ? basketItem.quantity : 0;
                        return (
                          <div key={item.id} className="py-4 flex items-start justify-between gap-4 group transition-all hover:bg-cream-50/30 px-2 rounded-xl">
                            <div className="space-y-1 flex-grow pr-4">
                              <div className="flex items-center flex-wrap gap-1.5">
                                <VegSymbol />
                                <span className="font-serif-display font-bold text-[#1f2937] text-sm sm:text-base">{item.name}</span>
                                {item.isSignature && (
                                  <span className="bg-saffron-150 text-saffron-900 text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase font-mono">Chef's Choice</span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 leading-relaxed font-sans-ui">{item.description}</p>
                            </div>

                            <div className="flex items-center space-x-4 shrink-0">
                              <span className="font-mono font-extrabold text-sm text-[#7f1d1d] bg-maroon-50/50 border border-maroon-100/50 px-2 py-0.5 rounded-md">₹{item.price}</span>
                              
                              {addToBasket && (
                                <div className="hidden sm:block">
                                  {quantityInBasket > 0 ? (
                                    <div className="flex items-center bg-cream-50 border border-saffron-500/25 rounded-lg p-0.5">
                                      <button
                                        onClick={() => removeFromBasket && removeFromBasket(item.id, -1)}
                                        className="w-6 h-6 flex items-center justify-center text-maroon-950 hover:bg-cream-200 rounded text-xs font-bold"
                                      >
                                        <Minus className="w-2.5 h-2.5" />
                                      </button>
                                      <span className="w-5 text-center text-xs font-bold">{quantityInBasket}</span>
                                      <button
                                        onClick={() => addToBasket && addToBasket(item, -1, 1)}
                                        className="w-6 h-6 flex items-center justify-center text-maroon-950 hover:bg-cream-200 rounded text-xs font-bold"
                                      >
                                        <Plus className="w-2.5 h-2.5" />
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => addToBasket && addToBasket(item, -1, 1)}
                                      className="px-2.5 py-1 bg-maroon-900 text-white font-serif-display font-bold text-[9px] uppercase tracking-wider rounded-lg hover:bg-maroon-950 transition-all cursor-pointer"
                                    >
                                      + Add
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 border-t-2 border-double border-saffron-500/20 pt-6 text-center text-[11px] text-gray-400 font-mono">
              ★ DECLARED PRICES ARE NETT • GST EXTRA AS APPLICABLE • SERVING NARAINGARH SINCE 1998 ★
            </div>
          </div>
        </div>
      )}

      {/* 3. Scanned Menu Cards Mode (Interactive Book + Official Image Links) */}
      {menuViewMode === 'cards' && (
        <div className="space-y-10 animate-fadeIn" id="scanned-menu-cards-view">
          
          {/* External Links Alert Container */}
          <div className="bg-saffron-50/40 rounded-3xl border-2 border-saffron-500/30 p-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="space-y-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-2 text-saffron-800">
                  <ImageIcon className="w-5 h-5" />
                  <h5 className="font-serif-display font-black text-sm sm:text-md uppercase tracking-wide">Official Menu Scans Available</h5>
                </div>
                <p className="text-xs text-gray-600 max-w-md">
                  You can view the exact customer-uploaded photocopies, menu boards, and price photos for Goyal's Sweets on official restaurant aggregators:
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5 md:flex-nowrap justify-center">
                <a
                  href={RESTAURANT_DETAILS.menuLinks.magicPin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#ffffff] hover:bg-cream-50 text-maroon-950 border border-saffron-500/45 font-bold text-[11px] uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center space-x-1.5 shrink-0 hover:shadow-md hover:-translate-y-0.5 text-center"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-saffron-600" />
                  <span>Magicpin Menu Photos</span>
                </a>
                <a
                  href={RESTAURANT_DETAILS.menuLinks.restaurantGuru}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#ffffff] hover:bg-cream-50 text-maroon-950 border border-saffron-500/45 font-bold text-[11px] uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center space-x-1.5 shrink-0 hover:shadow-md hover:-translate-y-0.5 text-center"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-saffron-600" />
                  <span>Restaurant-Guru Menu</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Vintage Booklet */}
          <div className="max-w-xl mx-auto">
            <div className="text-center space-y-1.5 mb-6">
              <h5 className="font-serif-display text-md font-extrabold uppercase tracking-widest text-[#7f1d1d] flex items-center justify-center space-x-1">
                <Compass className="w-4 h-4 text-saffron-500 animate-spin-slow" />
                <span>Interactive Menu Booklet</span>
              </h5>
              <p className="text-[11px] text-gray-500">Flip the pages to scan traditional printed menu design templates.</p>
            </div>

            {/* Simulated Paper Card Page background */}
            <div className="relative bg-[#fbf8f0] rounded-3xl p-6 sm:p-10 border-[6px] border-double border-saffron-600/35 shadow-2xl overflow-hidden min-h-[500px] flex flex-col justify-between">
              
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-saffron-600/50" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-saffron-600/50" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-saffron-600/50" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-saffron-600/50" />

              {/* Watermark Logo */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
                <Star className="w-64 h-64 fill-[#7f1d1d]" />
              </div>

              <div>
                {/* Booklet Header */}
                <div className="text-center border-b border-saffron-600/20 pb-4 mb-6">
                  <div className="flex items-center justify-center space-x-1">
                    <VegSymbol />
                    <span className="text-[9px] font-bold text-green-700 tracking-wider font-mono">100% PURE VEGETARIAN</span>
                  </div>
                  <h6 className="font-serif-display text-xl font-black text-maroon-950 uppercase mt-0.5 tracking-wide">
                    {cardPages[activeCardPage].title}
                  </h6>
                  <p className="text-[10px] text-gray-650 italic mt-1 max-w-xs mx-auto font-sans-ui">
                    {cardPages[activeCardPage].desc}
                  </p>
                </div>

                {/* booklet items list */}
                <div className="space-y-4">
                  {cardPages[activeCardPage].items.map((item, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div className="flex items-baseline justify-between gap-2.5">
                        <div className="flex items-center space-x-1 flex-shrink-0">
                          <span className="w-1 h-1 bg-saffron-700 rounded-full" />
                          <span className="font-serif-display font-extrabold text-sm text-maroon-950">{item.name}</span>
                          {item.tag && (
                            <span className="text-[7.5px] font-black uppercase text-saffron-850 px-1 py-0.2 bg-saffron-150 rounded border border-saffron-600/10 font-mono">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <div className="flex-grow border-b border-dotted border-gray-400/60 mx-1" />
                        <span className="font-mono font-extrabold text-[#7f1d1d] text-xs">₹{item.price}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 leading-tight italic pl-2 pr-10">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booklet footer controls */}
              <div className="mt-8 pt-4 border-t border-saffron-600/20 flex items-center justify-between text-xs select-none relative z-10">
                <button
                  onClick={() => setActiveCardPage(p => Math.max(0, p - 1))}
                  disabled={activeCardPage === 0}
                  className={`flex items-center space-x-1 p-1 rounded hover:bg-saffron-100/50 text-[#7f1d1d] font-bold transition-all ${
                    activeCardPage === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev Page</span>
                </button>

                <div className="text-[10px] font-mono text-gray-550 font-semibold tracking-wider uppercase">
                  Page {activeCardPage + 1} of {cardPages.length}
                </div>

                <button
                  onClick={() => setActiveCardPage(p => Math.min(cardPages.length - 1, p + 1))}
                  disabled={activeCardPage === cardPages.length - 1}
                  className={`flex items-center space-x-1 p-1 rounded hover:bg-saffron-100/50 text-[#7f1d1d] font-bold transition-all ${
                    activeCardPage === cardPages.length - 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  <span>Next Page</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Slide Indicators Navigation dots */}
            <div className="flex justify-center space-x-2 mt-4 select-none">
              {cardPages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCardPage(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    activeCardPage === i ? 'bg-saffron-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  title={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Action Prompt */}
      <div className="mt-12 bg-maroon-900 text-cream-100 p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 border border-maroon-950 shadow-lg">
        <div className="text-center md:text-left space-y-1">
          <h4 className="font-serif-display font-bold text-lg">Craving something else?</h4>
          <p className="text-xs text-cream-200/90 leading-relaxed">
            Our master chefs cook daily specials fresh. Come visit opposite Naraingarh Bus Stand to observe our live glass sweet rack display!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
          <a
            href="tel:+918222000999"
            className="w-full sm:w-auto text-center bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all uppercase tracking-wider"
          >
            Call to Order Now
          </a>
        </div>
      </div>
    </section>
  );
}

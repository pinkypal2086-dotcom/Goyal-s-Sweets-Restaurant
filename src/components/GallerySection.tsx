import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  const categories = ['All', 'Storefront', 'Sweets Counter', 'Interiors'];

  const openLightbox = (itemIndex: number) => {
    // Find the actual item in the filtered array inside the global array to prevent index mismatch
    const globalIndex = GALLERY_ITEMS.findIndex((it) => it.id === filteredItems[itemIndex].id);
    setActivePhotoIndex(globalIndex !== -1 ? globalIndex : 0);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const handlePrev = (e: MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev === null ? null : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length));
    }
  };

  const handleNext = (e: MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev === null ? null : (prev + 1) % GALLERY_ITEMS.length));
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans-ui animate-fadeIn" id="gallery-section">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-10">
        <span className="text-xs font-extrabold uppercase tracking-widest text-saffron-600 bg-saffron-100/50 px-3 py-1 rounded-full">
          Visual Tour
        </span>
        <h3 className="font-serif-display text-3xl sm:text-4xl font-black text-maroon-950">
          A Glimpse of Our Heritage
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm">
          Browse authentic photographs of our flagship store entrance, gleaming sweets display counter, and clean, welcoming family dining spaces in Naraingarh.
        </p>
      </div>

      {/* Filter Tabs */}
      {GALLERY_ITEMS.length > 0 && (
        <div className="flex justify-center space-x-2 sm:space-x-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`gallery-filter-${cat.toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-maroon-900 text-cream-100 shadow'
                  : 'bg-white text-gray-700 hover:bg-cream-200 border border-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Gallery Cards Grid Grid */}
      {GALLERY_ITEMS.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                id={`gallery-item-${item.id}`}
                onClick={() => openLightbox(index)}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group hover:shadow-lg hover:border-saffron-200 cursor-pointer relative"
              >
                <div className="relative aspect-[4/3] bg-cream-200 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-maroon-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/95 p-3 rounded-full text-maroon-900 shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-[9px] font-bold text-maroon-900 uppercase tracking-wider font-sans-ui border border-gray-100">
                    {item.category}
                  </span>
                </div>

                {/* Caption and label */}
                <div className="p-4.5 space-y-1 bg-white">
                  <h4 className="font-serif-display font-extrabold text-sm text-maroon-950">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed font-sans-ui">
                    {item.caption}
                  </p>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-[#ffffff] to-[#faf8f5] p-10 rounded-3xl border-2 border-saffron-550/15 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 bg-saffron-50 rounded-full flex items-center justify-center mx-auto text-saffron-600 border border-saffron-100">
            <ImageIcon className="w-7 h-7" />
          </div>
          <h4 className="font-serif-display font-black text-xl text-maroon-950">
            Gallery Under Curation
          </h4>
          <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
            Our photographic gallery is currently undergoing official hygiene shoots and curation to bring you stellar, high-definition glimpses of our traditional Sweets Counter and dining spaces. Please check back soon!
          </p>
        </div>
      )}

      {/* Lighbox Zoom Modal Modal Panel */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4"
            onClick={closeLightbox}
          >
            {/* Top Close Row */}
            <div className="w-full max-w-5xl flex justify-between items-center text-cream-100 py-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-saffron-300 flex items-center">
                <ImageIcon className="w-4 h-4 mr-1.5 text-saffron-400" />
                Gallery {activePhotoIndex + 1} / {GALLERY_ITEMS.length}
              </span>
              <button
                onClick={closeLightbox}
                className="p-1.5 bg-white/10 rounded-full hover:bg-white/20 text-white transition-all cursor-pointer"
                title="Close Zoom"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Central Media Slider Slider Container */}
            <div className="relative flex-grow w-full max-w-4xl flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              {/* Left Slider Arrow */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-4 z-10 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white active:scale-90 transition-all cursor-pointer"
                title="Previous Photo"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 h-6" />
              </button>

              {/* Main Expanded Image */}
              <motion.div
                key={activePhotoIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="w-full max-w-4xl max-h-[75vh] min-h-[300px] overflow-hidden rounded-2xl border border-saffron-500/35 shadow-2xl flex items-center justify-center bg-black/40"
              >
                <img
                  src={GALLERY_ITEMS[activePhotoIndex].image}
                  alt={GALLERY_ITEMS[activePhotoIndex].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full max-h-[75vh] object-contain rounded-xl"
                />
              </motion.div>

              {/* Right Slider Arrow */}
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-4 z-10 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white active:scale-90 transition-all cursor-pointer"
                title="Next Photo"
              >
                <ChevronRight className="w-5 h-5 md:w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="w-full max-w-3xl text-center space-y-1.5 pb-6" onClick={(e) => e.stopPropagation()}>
              <h4 className="font-serif-display text-lg font-bold text-white">
                {GALLERY_ITEMS[activePhotoIndex].title}
              </h4>
              <p className="text-xs text-gray-300 max-w-xl mx-auto leading-relaxed font-sans-ui">
                {GALLERY_ITEMS[activePhotoIndex].caption}
              </p>
              <span className="inline-block bg-saffron-600 font-bold text-[9px] text-white px-2.5 py-1 rounded-full uppercase tracking-wider">
                {GALLERY_ITEMS[activePhotoIndex].category} Collection
              </span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

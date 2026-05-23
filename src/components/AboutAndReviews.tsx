import { useState, FormEvent } from 'react';
import { Star, MessageSquare, Quote, Heart, Clock, Award, Users, CheckCircle } from 'lucide-react';
import { CUSTOMER_REVIEWS, TIMELINE_BUILD, RESTAURANT_DETAILS } from '../data';

interface AboutAndReviewsProps {
  mode?: 'about' | 'reviews';
}

export default function AboutAndReviews({ mode = 'about' }: AboutAndReviewsProps) {
  const [reviews, setReviews] = useState(CUSTOMER_REVIEWS);
  const [newReview, setNewReview] = useState({
    author: '',
    rating: 5,
    text: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmitReview = (e: FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.text) {
      setErrorMsg('Kindly enter both your Name and your warm Message before publishing.');
      setTimeout(() => setErrorMsg(null), 4000);
      return;
    }

    const reviewObj = {
      id: `r-local-${Date.now()}`,
      author: newReview.author,
      rating: newReview.rating,
      text: newReview.text,
      date: 'Just Now'
    };

    setReviews([reviewObj, ...reviews]);
    setNewReview({ author: '', rating: 5, text: '' });
    setErrorMsg(null);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 4400);
  };

  // Helper calculation for average rating
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  if (mode === 'about') {
    return (
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans-ui animate-fadeIn space-y-16">
        
        {/* Our Story Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Story Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-saffron-600 bg-saffron-100/50 px-3 py-1 rounded-full">
                Our Legacy
              </span>
              <h3 className="font-serif-display text-3xl sm:text-4xl font-black text-maroon-950">
                Taste the Tradition at Goyal’s
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Founded over two decades ago (Since 1998) in the heart of Naraingarh, Goyal's Sweets & Restaurant has grown from a humble sweets sweet counter to a premium family dining landmark. Our philosophy is humble: <b>uncompromising hygiene, authentic flavor recipes, and delightful hospitality.</b>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-gray-700">
              <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <Award className="w-5 h-5 text-saffron-600 shrink-0" />
                <div className="space-y-0.5">
                  <span className="font-bold text-maroon-950 block">Pure Desi Ghee Preparation</span>
                  <span className="text-gray-500 leading-normal block">Authentic laddoos, pedas, and jalebi are cooked fully in premium pure Desi Ghee.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <Users className="w-5 h-5 text-saffron-600 shrink-0" />
                <div className="space-y-0.5">
                  <span className="font-bold text-maroon-950 block">Kid-Friendly Ambient Dining</span>
                  <span className="text-gray-500 leading-normal block">Our dining hall spans spacious seating arrangements to comfortably cater to parties and small families.</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 leading-normal py-2 px-3 border-l-2 border-saffron-400 bg-saffron-50/40 rounded-r-lg max-w-xl">
              <i>"Whether it is festive Kaju Katlis decorated in silver leaf, or rich buttery Maharaja Thalis cooked fresh for Sunday lunches, we represent the food memories of Naraingarh."</i>
            </p>
          </div>

          {/* Right Counter Display Graphic */}
          <div className="lg:col-span-5 aspect-[4/3] rounded-3xl overflow-hidden border border-gray-150 relative group shadow-lg">
            <img
              src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAGPzrsA8C2DaKB5j5vqVDhYRVk8Xihsba7hecT6AK0qddel4O1h8N_xs1SRwbNxOPce2LNhAu_x2ETVe7eEto822uAwUzRZytl-F2WwNqlGvAaqqEtnZS8KsDgyTZtcVGhgMIhgag=s1360-w1360-h1020-rw"
              alt="Goyal Sweets flagship family dining hall in Naraingarh"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
            
            {/* Elegant glass badge */}
            <div className="absolute top-4 right-4 bg-maroon-950/90 text-cream-50 px-3 py-1.5 rounded-full border border-saffron-550/40 shadow-sm backdrop-blur-sm">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-saffron-300">ESTD. 1998</span>
            </div>

            <div className="absolute bottom-5 left-5 right-5 text-[#ffffff] p-1 space-y-1">
              <span className="text-[10px] uppercase font-bold text-saffron-300 tracking-widest font-extrabold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-saffron-500 inline-block animate-pulse" />
                Naraingarh Flagship Outlet
              </span>
              <h4 className="font-serif-display font-black text-lg text-cream-50 leading-tight">
                Our Spacious Golden Dining Hall
              </h4>
              <p className="text-[11px] text-cream-200/80 font-sans leading-normal">
                Welcoming families with premium hygiene standards and rich culinary heritage.
              </p>
            </div>
          </div>
        </div>

        {/* Website Development Timeline Roadmap */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-8">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-saffron-600">Site Development Roadmap</span>
            <h4 className="font-serif-display text-2xl font-black text-maroon-950">
              Our Digital Journey Timeline
            </h4>
            <p className="text-xs text-gray-550 max-w-xl mx-auto">
              Chronological outline mapping Goyal's Sweets & Restaurant website design and functional launch sequence.
            </p>
          </div>

          {/* Horizontal/Vertical Interactive Roadmap infographic */}
          <div className="relative border-l-2 md:border-l-0 md:border-t-2 border-saffron-200 ml-4 md:ml-0 md:grid md:grid-cols-5 md:gap-4 md:pt-8 md:px-2 space-y-6 md:space-y-0">
            {TIMELINE_BUILD.map((step, idx) => (
              <div key={idx} className="relative pl-6 md:pl-0 md:text-center space-y-2">
                {/* Timeline Pin */}
                <div className="absolute -left-[7px] md:left-1/2 -top-1 md:-top-[17px] -translate-x-1.5 md:-translate-x-1/2 w-4.5 h-4.5 rounded-full bg-saffron-500 border-4 border-white shadow-md z-10 hover:scale-125 transition-transform cursor-pointer" />
                
                <div className="space-y-1">
                  <span className="font-mono text-[10px] font-bold text-saffron-600 block leading-none">
                    {step.date}
                  </span>
                  <span className="font-serif-display text-xs font-black text-maroon-950 block leading-tight">
                    {step.phase}
                  </span>
                  <p className="text-[10px] text-gray-500 leading-normal max-w-[170px] md:mx-auto">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans-ui animate-fadeIn space-y-10">
      
      <div className="text-center space-y-2 mb-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-saffron-600 bg-saffron-100/50 px-3 py-1 rounded-full">
          Guest Reviews
        </span>
        <h3 className="font-serif-display text-3xl sm:text-4xl font-black text-maroon-950">
          What Our Guests Say
        </h3>
        <p className="text-xs text-gray-500 max-w-xl mx-auto leading-relaxed">
          Read real comments and high praise from families across Naraingarh, or leave your own thoughts on your recent sweets box or delicious restaurant order.
        </p>
      </div>

      {/* Reviews Feedback Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="reviews-block">
        
        {/* Left Side: Review Form Panel */}
        <div className="lg:col-span-5 bg-white border border-gray-100 p-6 sm:p-8 rounded-3xl shadow-sm space-y-5">
          <div className="space-y-1">
            <h4 className="font-serif-display text-lg font-black text-maroon-950">Add Your Feedback</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Loved our sweets or thali? Write a comment to support local family dining.</p>
          </div>

          {isSuccess && (
            <div className="bg-emerald-50 text-emerald-900 border-2 border-emerald-500/20 rounded-2xl p-4 text-[12px] font-medium flex items-center space-x-2 animate-fadeIn">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Namaste! Your review has been added to our live records below.</span>
            </div>
          )}

          {errorMsg && (
            <div className="bg-saffron-50 text-saffron-950 border-2 border-saffron-500/20 rounded-2xl p-4 text-[12px] font-medium flex items-center space-x-2 animate-fadeIn">
              <span className="shrink-0 text-saffron-600 font-bold">⚠️</span>
              <span className="text-maroon-950">{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Your Full Name</label>
              <input
                type="text"
                required
                value={newReview.author}
                id="review-name-input"
                onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                placeholder="Rohan Gulati"
                className="w-full px-4 py-2 bg-cream-100 text-xs sm:text-sm rounded-xl border-none focus:ring-2 focus:ring-saffron-500 focus:outline-none text-gray-800"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Rating Stars</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((str) => (
                  <button
                    key={str}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: str })}
                    className="p-1 focus:outline-none transition-transform active:scale-90"
                  >
                    <Star className={`w-6 h-6 ${str <= newReview.rating ? 'fill-saffron-500 text-saffron-500' : 'text-gray-300'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Feedback Comments</label>
              <textarea
                required
                rows={3}
                value={newReview.text}
                id="review-text-input"
                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                placeholder="I purchased besan ladoos and the Maharaja thali. Quality was exceptionally good..."
                className="w-full px-4 py-2 bg-cream-100 text-xs sm:text-sm rounded-xl border-none focus:ring-2 focus:ring-saffron-500 focus:outline-none text-gray-800 resize-none h-24"
              />
            </div>

            <button
              type="submit"
              id="review-submit-btn"
              className="w-full bg-maroon-900 hover:bg-maroon-950 text-white font-bold text-xs py-3 rounded-xl border border-maroon-950 transition-colors shadow-sm flex items-center justify-center space-x-1 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-saffron-300" />
              <span>Publish Public Review</span>
            </button>
          </form>
        </div>

        {/* Right Side: Reviews Log List */}
        <div className="lg:col-span-7 space-y-5">
          {/* Scoring Summary Box */}
          <div className="bg-cream-50 border border-saffron-300/30 p-5 rounded-3xl flex items-center space-x-6">
            <div className="text-center">
              <span className="font-serif-display font-black text-4xl text-maroon-950 block">{avgRating}</span>
              <span className="text-[10px] text-gray-400 block mt-0.5">Average score</span>
            </div>
            <div className="flex-grow space-y-1 font-sans-ui text-xs">
              <div className="flex items-center text-saffron-500">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-saffron-500" />
                ))}
                <span className="text-gray-600 font-semibold ml-2">Verified Customer Base</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Aggregated from 542 local restaurant search and Swiggy listings summaries opposite Naraingarh Bus Stand.
              </p>
            </div>
          </div>

          {/* Individual Reviews Cards */}
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2 pb-1 bg-white rounded-2xl border border-gray-100/60 p-1">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white border border-gray-150 p-5 rounded-2xl shadow-sm relative space-y-3 hover:border-saffron-200 transition-colors duration-300">
                <Quote className="absolute right-4 top-4 w-10 h-10 text-gray-100 shrink-0 pointer-events-none" />
                
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-serif-display font-extrabold text-sm text-maroon-950 leading-tight">
                      {rev.author}
                    </h5>
                    <span className="text-[10px] text-gray-400 block mt-0.5">{rev.date}</span>
                  </div>
                  
                  <div className="flex space-x-0.5">
                    {Array(5).fill(0).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-3.5 h-3.5 ${
                          idx < rev.rating ? 'fill-saffron-500 text-saffron-500' : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed font-sans-ui relative z-10">
                  {rev.text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

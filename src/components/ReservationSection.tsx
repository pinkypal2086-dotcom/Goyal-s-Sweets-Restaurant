import { useState, FormEvent } from 'react';
import { Calendar, Users, Clock, MessageSquare, Shield, CheckCheck, Send, Phone } from 'lucide-react';
import { RESTAURANT_DETAILS } from '../data';
import { Reservation } from '../types';

export default function ReservationSection() {
  const [formData, setFormData] = useState<Reservation>({
    name: '',
    phone: '',
    date: '',
    time: '13:00',
    guests: 4,
    occasion: 'Casual Dining'
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      alert('Please fill out your Name, Phone and Date to proceed.');
      return;
    }
    setIsSubmitted(true);
  };

  // Pre-fills a gorgeous text block message to open on WhatsApp Web or mobile client
  const handleWhatsAppAction = () => {
    const textMsg = `Hello Goyal's Sweets & Restaurant! I would like to request a table reservation with the following details:%0A` +
      `- *Name:* ${encodeURIComponent(formData.name)}%0A` +
      `- *Phone:* ${encodeURIComponent(formData.phone)}%0A` +
      `- *Guests:* ${formData.guests} Persons%0A` +
      `- *Date:* ${formData.date}%0A` +
      `- *Time:* ${formData.time}%0A` +
      `- *Occasion:* ${encodeURIComponent(formData.occasion || 'Casual Dining')}%0A%0A` +
      `Please confirm alignment and availability. Thank you!`;

    const waUrl = `https://wa.me/918222000999?text=${textMsg}`;
    window.open(waUrl, '_blank');
  };

  const timeSlots = [
    { label: 'Lunch: 12:00 PM', value: '12:00' },
    { label: 'Lunch: 1:30 PM', value: '13:30' },
    { label: 'Lunch: 3:00 PM', value: '15:00' },
    { label: 'Evening: 6:00 PM', value: '18:00' },
    { label: 'Dinner: 7:30 PM', value: '19:30' },
    { label: 'Dinner: 8:45 PM', value: '20:45' }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto font-sans-ui" id="booking-section">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        
        {/* Left Informational Sidebar Banner Banner */}
        <div className="md:col-span-5 bg-maroon-900 text-cream-50 p-6 sm:p-10 flex flex-col justify-between relative">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="space-y-6 relative">
            <span className="text-xs font-bold uppercase tracking-widest text-saffron-300">
              Table Reservation
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-black text-white leading-tight">
              Gather Your Family in Comfort
            </h3>
            <p className="text-xs text-cream-200 leading-relaxed">
              We provide bright, lively, and highly tidy seating space suitable for family get-togethers, birthdays, and anniversaries. Warm decor and cozy kid-friendly dining chairs.
            </p>

            <div className="space-y-4 pt-4 border-t border-cream-200/20 text-xs">
              <div className="flex items-center space-x-3 text-cream-100">
                <Shield className="w-5 h-5 text-saffron-300 shrink-0" />
                <span>No Booking Surcharges or Fees</span>
              </div>
              <div className="flex items-center space-x-3 text-cream-100">
                <Clock className="w-5 h-5 text-saffron-300 shrink-0" />
                <span>Table held for 15 minutes past scheduled slot</span>
              </div>
              <div className="flex items-center space-x-3 text-cream-100">
                <Users className="w-5 h-5 text-saffron-300 shrink-0" />
                <span>Supports parties size from 2 up to 25 people</span>
              </div>
            </div>
          </div>

          <div className="pt-8 relative border-t border-cream-200/20 mt-6 md:mt-0 font-sans-ui">
            <p className="text-[10px] text-cream-300 uppercase font-semibold">Need Instant Hosting Help?</p>
            <p className="text-sm font-serif-display font-extrabold text-saffron-300 mt-1">{RESTAURANT_DETAILS.phone}</p>
          </div>
        </div>

        {/* Right Form Container Block */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <h4 className="font-serif-display text-lg font-bold text-maroon-950">Book Your Table</h4>
                <p className="text-xs text-gray-500">Submit requests below. We will send a WhatsApp verification summary link.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    id="book-name-input"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="E.g., Raman Sharma"
                    className="w-full px-3.5 py-2 px-4.5 bg-cream-100 text-sm border-none rounded-xl focus:ring-2 focus:ring-saffron-500 focus:outline-none text-gray-800"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    id="book-phone-input"
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="E.g., +91 98765 43210"
                    className="w-full px-3.5 py-2 px-4.5 bg-cream-100 text-sm border-none rounded-xl focus:ring-2 focus:ring-saffron-500 focus:outline-none text-gray-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Select Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    id="book-date-input"
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2 px-4.5 bg-cream-100 text-sm border-none rounded-xl focus:ring-2 focus:ring-saffron-500 focus:outline-none text-gray-800"
                  />
                </div>

                {/* Guest Party count */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Party Size (Guests)</label>
                  <select
                    value={formData.guests}
                    id="book-guests-select"
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                    className="w-full px-3.5 py-2 px-4.5 bg-cream-100 text-sm border-none rounded-xl focus:ring-2 focus:ring-saffron-500 focus:outline-none text-gray-850"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time Slots Options */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Preferred Time Slot *</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.value}
                      type="button"
                      id={`book-time-btn-${slot.value}`}
                      onClick={() => setFormData({ ...formData, time: slot.value })}
                      className={`py-2 rounded-xl text-[11px] font-bold transition-all border shrink-0 cursor-pointer ${
                        formData.time === slot.value
                          ? 'bg-saffron-50 border-saffron-500 text-saffron-800 font-extrabold'
                          : 'bg-cream-100 border-transparent text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {slot.label.split(': ').slice(1).join('')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Occasions */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Special Occasion</label>
                <select
                  value={formData.occasion}
                  id="book-occasion-select"
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  className="w-full px-3.5 py-2 px-4.5 bg-cream-100 text-sm border-none rounded-xl focus:ring-2 focus:ring-saffron-500 focus:outline-none text-gray-800"
                >
                  <option value="Casual Family Meal">Casual Family Meal</option>
                  <option value="Anniversary celebration">Anniversary Celebration</option>
                  <option value="Birthday Party">Birthday Party</option>
                  <option value="Festive sweets gathering">Festive Sweets Feast</option>
                  <option value="Business Lunch">Business Lunch</option>
                </select>
              </div>

              <button
                type="submit"
                id="book-submit-btn"
                className="w-full bg-saffron-600 hover:bg-saffron-700 text-white font-bold py-3.5 rounded-xl border border-saffron-700 shadow-md transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Submit Table Proposal</span>
              </button>
            </form>
          ) : (
            /* Submission Success & WhatsApp Bridge Screen */
            <div className="text-center space-y-5 py-6">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 border border-green-200">
                <CheckCheck className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h4 className="font-serif-display text-xl font-black text-maroon-950">Proposal Assembled!</h4>
                <p className="text-xs text-gray-600 max-w-md mx-auto">
                  Hi <b>{formData.name}</b>, your request for <b>{formData.guests} people</b> on <b>{formData.date}</b> is fully structured. Click below to verify and send it to our reservations chat.
                </p>
              </div>

              {/* Summarized Invoice Card */}
              <div className="bg-cream-50 border border-saffron-200/50 rounded-2xl p-4.5 text-left text-xs space-y-2 max-w-sm mx-auto font-mono">
                <p><span className="text-gray-400">Date:</span> {formData.date}</p>
                <p><span className="text-gray-400">Time:</span> {formData.time} PM</p>
                <p><span className="text-gray-400">Occasion:</span> {formData.occasion}</p>
                <p><span className="text-gray-400">Guests:</span> {formData.guests} People</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-md mx-auto">
                <button
                  onClick={handleWhatsAppAction}
                  id="book-wa-finalize"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Request via WhatsApp</span>
                </button>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full text-xs text-maroon-800 font-bold hover:underline"
                >
                  Edit Details
                </button>
              </div>

              <div className="text-[10px] text-gray-400 flex items-center justify-center space-x-1">
                <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
                <span>Verification requires no account logins.</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

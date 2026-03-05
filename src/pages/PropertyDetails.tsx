import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Users, MapPin, CheckCircle2, ChevronRight, Waves, Utensils, Info, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useAvailability } from '../hooks/useAvailability';
import { Navbar } from '../components/Navbar';
import { motion, AnimatePresence } from 'motion/react';
import { format, addDays, parseISO } from 'date-fns';

export const PropertyDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties, currentUser, addBooking } = useAppContext();
  const { checkAvailability } = useAvailability();
  
  const property = properties.find(p => p.id === id);
  
  const [checkIn, setCheckIn] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [checkOut, setCheckOut] = useState(format(addDays(new Date(), 2), 'yyyy-MM-dd'));
  const [isBooking, setIsBooking] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [error, setError] = useState<string | null>(null);

  if (!property) return <div>Property not found</div>;

  const handleBookNow = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    const { available, roomNumber } = checkAvailability(property.id, checkIn, checkOut);
    
    if (!available) {
      setError('Sorry, no rooms are available for these dates.');
      return;
    }

    setError(null);
    setIsBooking(true);
  };

  const confirmBooking = () => {
    const { roomNumber } = checkAvailability(property.id, checkIn, checkOut);
    
    addBooking({
      propertyId: property.id,
      userId: currentUser!.id,
      userName: currentUser!.name,
      checkIn,
      checkOut,
      roomNumber: roomNumber!,
      status: 'PENDING',
      totalPrice: property.pricePerNight * 2, // Simplified calculation
    });
    
    setBookingStep(2);
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm uppercase tracking-wider mb-4">
                <span>{property.type}</span>
                <ChevronRight className="w-4 h-4" />
                <span>Laguna</span>
              </div>
              <h1 className="text-4xl font-bold text-zinc-900 mb-4">{property.name}</h1>
              <div className="flex items-center gap-4 text-zinc-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>Calamba, Laguna</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Verified Property</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl"
            >
              <img 
                src={property.image} 
                alt={property.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-6">About this place</h2>
                <p className="text-zinc-600 leading-relaxed mb-8">
                  {property.description}
                </p>
                <div className="bg-white p-6 rounded-2xl border border-zinc-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-emerald-500" />
                    <h3 className="font-bold">Property Highlights</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-zinc-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Total of {property.rooms} spacious rooms
                    </li>
                    {property.staffCount && (
                      <li className="flex items-center gap-3 text-sm text-zinc-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Dedicated staff of {property.staffCount}
                      </li>
                    )}
                    <li className="flex items-center gap-3 text-sm text-zinc-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      24/7 Security and Maintenance
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-6">Amenities</h2>
                <div className="grid grid-cols-2 gap-4">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-zinc-200">
                      {amenity.includes('Pool') ? <Waves className="w-5 h-5 text-emerald-500" /> : <Utensils className="w-5 h-5 text-emerald-500" />}
                      <span className="text-sm font-medium text-zinc-700">{amenity}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-zinc-200">
                    <Calendar className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-medium text-zinc-700">Free Wifi</span>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Right Column: Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-xl"
              >
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <span className="text-3xl font-bold text-zinc-900">₱{property.pricePerNight}</span>
                    <span className="text-zinc-500 font-medium"> / night</span>
                  </div>
                  <div className="flex items-center gap-1 text-zinc-900 font-bold">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>4.9</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="grid grid-cols-2 gap-0 border border-zinc-200 rounded-2xl overflow-hidden">
                    <div className="p-4 border-r border-zinc-200 hover:bg-zinc-50 transition-colors cursor-pointer">
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Check-in</label>
                      <input 
                        type="date" 
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-transparent text-sm font-bold focus:outline-none"
                      />
                    </div>
                    <div className="p-4 hover:bg-zinc-50 transition-colors cursor-pointer">
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Check-out</label>
                      <input 
                        type="date" 
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-transparent text-sm font-bold focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="p-4 border border-zinc-200 rounded-2xl flex items-center justify-between hover:bg-zinc-50 transition-colors cursor-pointer">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Guests</label>
                      <span className="text-sm font-bold">2 Guests</span>
                    </div>
                    <Users className="w-4 h-4 text-zinc-400" />
                  </div>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm font-medium rounded-xl border border-red-100">
                    {error}
                  </div>
                )}

                <button 
                  onClick={handleBookNow}
                  className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 mb-6"
                >
                  Reserve Now
                </button>

                <p className="text-center text-zinc-500 text-sm font-medium mb-6">You won't be charged yet</p>

                <div className="space-y-4 pt-6 border-t border-zinc-100">
                  <div className="flex justify-between text-zinc-600">
                    <span>₱{property.pricePerNight} x 2 nights</span>
                    <span>₱{property.pricePerNight * 2}</span>
                  </div>
                  <div className="flex justify-between text-zinc-600">
                    <span>Service fee</span>
                    <span>₱0</span>
                  </div>
                  <div className="flex justify-between text-zinc-900 font-bold pt-4 border-t border-zinc-100">
                    <span>Total</span>
                    <span>₱{property.pricePerNight * 2}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBooking && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBooking(false)}
              className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[32px] overflow-hidden shadow-2xl"
            >
              {bookingStep === 1 ? (
                <div className="p-10">
                  <h2 className="text-3xl font-bold text-zinc-900 mb-2">Confirm Booking</h2>
                  <p className="text-zinc-500 mb-8">Please review your stay details at {property.name}.</p>
                  
                  <div className="space-y-6 mb-10">
                    <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                      <Calendar className="w-6 h-6 text-emerald-500" />
                      <div>
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Dates</p>
                        <p className="font-bold text-zinc-900">{format(parseISO(checkIn), 'MMM d')} - {format(parseISO(checkOut), 'MMM d, yyyy')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                      <Users className="w-6 h-6 text-emerald-500" />
                      <div>
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Guests</p>
                        <p className="font-bold text-zinc-900">2 Adults</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => setIsBooking(false)}
                      className="flex-1 py-4 bg-zinc-100 text-zinc-600 rounded-2xl font-bold hover:bg-zinc-200 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={confirmBooking}
                      className="flex-2 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                    >
                      Confirm & Book
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-10 text-center">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-zinc-900 mb-2">Booking Requested!</h2>
                  <p className="text-zinc-500 mb-10">
                    Your booking request for {property.name} has been sent to the owner. 
                    You'll receive an email once it's approved.
                  </p>
                  <button 
                    onClick={() => navigate('/')}
                    className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all"
                  >
                    Back to Home
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

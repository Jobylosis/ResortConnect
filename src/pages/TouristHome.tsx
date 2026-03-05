import React from 'react';
import { useAppContext } from '../context/AppContext';
import { PropertyCard } from '../components/PropertyCard';
import { Navbar } from '../components/Navbar';
import { motion } from 'motion/react';

export const TouristHome: React.FC = () => {
  const { properties } = useAppContext();

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      
      <header className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <img 
          src="https://picsum.photos/seed/resort-hero/1920/1080" 
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Find Your Perfect <br />
            <span className="text-emerald-400">Staycation</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-200 mb-8"
          >
            Book exclusive resorts and hotels in the most beautiful locations. 
            Experience comfort like never before.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
              Explore Properties
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold hover:bg-white/20 transition-all">
              How it Works
            </button>
          </motion.div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 mb-2">Featured Stays</h2>
            <p className="text-zinc-500">Handpicked properties just for you</p>
          </div>
          <div className="flex gap-2">
            {['All', 'Resort', 'Hotel'].map((filter) => (
              <button 
                key={filter}
                className="px-4 py-2 rounded-full text-sm font-bold bg-white border border-zinc-200 text-zinc-600 hover:border-emerald-500 hover:text-emerald-600 transition-all"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="bg-zinc-900 text-white py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold text-emerald-500 mb-6">RESORTCONNECT</h3>
              <p className="text-zinc-400 max-w-sm mb-8">
                The leading multi-tenant hospitality platform for property owners 
                and travelers alike.
              </p>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all cursor-pointer">
                    <div className="w-4 h-4 bg-zinc-400 rounded-sm" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-zinc-400 text-sm">
                <li><a href="#" className="hover:text-emerald-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">Properties</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">Become an Owner</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">Contact Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Newsletter</h4>
              <p className="text-zinc-400 text-sm mb-4">Get the latest deals and updates.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/5 text-center text-zinc-500 text-sm">
            © 2024 Resortconnect Hospitality Systems. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Users, Utensils, Waves } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const isResort = property.type === 'Resort';

  return (
    <Link 
      to={`/property/${property.id}`}
      className="group bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={property.image} 
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-zinc-900 text-xs font-bold rounded-full shadow-sm uppercase tracking-wider">
            {property.type}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-zinc-900">{property.name}</h3>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-bold">4.9</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-zinc-500 text-sm mb-4">
          <MapPin className="w-3 h-3" />
          <span>Laguna, Philippines</span>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-1.5 text-zinc-600 text-xs font-medium bg-zinc-100 px-2 py-1 rounded-md">
            <Users className="w-3.5 h-3.5" />
            <span>{property.rooms} Rooms</span>
          </div>
          {isResort ? (
            <div className="flex items-center gap-1.5 text-zinc-600 text-xs font-medium bg-zinc-100 px-2 py-1 rounded-md">
              <Waves className="w-3.5 h-3.5" />
              <span>Pavilions</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-zinc-600 text-xs font-medium bg-zinc-100 px-2 py-1 rounded-md">
              <Utensils className="w-3.5 h-3.5" />
              <span>Restaurant</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
          <div>
            <span className="text-xl font-bold text-emerald-600">₱{property.pricePerNight}</span>
            <span className="text-zinc-500 text-xs font-medium"> / night</span>
          </div>
          <span className="text-sm font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors">
            Book Now →
          </span>
        </div>
      </div>
    </Link>
  );
};

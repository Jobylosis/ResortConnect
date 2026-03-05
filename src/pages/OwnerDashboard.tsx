import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { useAppContext } from '../context/AppContext';
import { 
  Building2, 
  Users, 
  CalendarCheck, 
  Check, 
  X, 
  Clock,
  ArrowUpRight,
  LayoutGrid
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const OwnerDashboard: React.FC = () => {
  const { currentUser, properties, bookings, updateBookingStatus } = useAppContext();
  
  const property = properties.find(p => p.id === currentUser?.propertyId);
  const propertyBookings = bookings.filter(b => b.propertyId === property?.id);
  
  if (!property) return <div>Property not found for this owner.</div>;

  const stats = [
    { name: 'Monthly Revenue', value: '₱42,500', icon: ArrowUpRight, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Total Bookings', value: propertyBookings.length.toString(), icon: CalendarCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Staff Count', value: property.staffCount?.toString() || 'N/A', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Rooms/Units', value: property.rooms.toString(), icon: LayoutGrid, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 pl-64">
      <Sidebar />
      
      <main className="p-8">
        <header className="mb-10">
          <div className="flex items-center gap-3 text-emerald-600 font-bold text-sm uppercase tracking-widest mb-2">
            <Building2 className="w-4 h-4" />
            <span>{property.type} Management</span>
          </div>
          <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">{property.name}</h1>
          <p className="text-zinc-500 mt-1">Manage your property's inventory, staff, and booking requests.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm"
            >
              <div className={cn("inline-flex p-3 rounded-2xl mb-4", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <p className="text-sm font-medium text-zinc-500 mb-1">{stat.name}</p>
              <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <section className="xl:col-span-2 bg-white rounded-[32px] border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-zinc-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-zinc-900">Booking Requests</h2>
                <p className="text-sm text-zinc-500">Approve or decline incoming reservations</p>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                {propertyBookings.filter(b => b.status === 'PENDING').length} Pending
              </span>
            </div>
            
            <div className="divide-y divide-zinc-100">
              {propertyBookings.length > 0 ? (
                propertyBookings.map((booking) => (
                  <div key={booking.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 font-bold">
                        {booking.userName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-zinc-900">{booking.userName}</p>
                        <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {booking.checkIn} to {booking.checkOut}
                          </span>
                          <span className="flex items-center gap-1">
                            <LayoutGrid className="w-3 h-3" />
                            Room {booking.roomNumber}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {booking.status === 'PENDING' ? (
                        <>
                          <button 
                            onClick={() => updateBookingStatus(booking.id, 'CANCELLED')}
                            className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          >
                            <X className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => updateBookingStatus(booking.id, 'APPROVED')}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                          >
                            <Check className="w-4 h-4" />
                            Approve
                          </button>
                        </>
                      ) : (
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          booking.status === 'APPROVED' ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                        )}>
                          {booking.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-zinc-500">
                  No bookings found for this property.
                </div>
              )}
            </div>
          </section>

          <section className="space-y-8">
            <div className="bg-zinc-900 text-white p-8 rounded-[32px] shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Property Stats</h3>
                <p className="text-zinc-400 text-sm mb-8">Quick overview of your performance this week.</p>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-zinc-400">Occupancy Rate</span>
                      <span className="font-bold">72%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '72%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-zinc-400">Customer Satisfaction</span>
                      <span className="font-bold">4.8/5</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-zinc-200 shadow-sm">
              <h3 className="text-xl font-bold text-zinc-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-left hover:border-emerald-500 transition-all group">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <LayoutGrid className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-bold text-zinc-900">Edit Rooms</p>
                </button>
                <button className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-left hover:border-emerald-500 transition-all group">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <Users className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-bold text-zinc-900">Manage Staff</p>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

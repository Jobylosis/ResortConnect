import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { useAppContext } from '../context/AppContext';
import { Building2, Users, CreditCard, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const AdminDashboard: React.FC = () => {
  const { properties, users, bookings } = useAppContext();

  const stats = [
    { name: 'Total Revenue', value: '₱128,430', icon: CreditCard, change: '+12.5%', trend: 'up' },
    { name: 'Active Properties', value: properties.length.toString(), icon: Building2, change: '0%', trend: 'neutral' },
    { name: 'Total Users', value: users.length.toString(), icon: Users, change: '+3', trend: 'up' },
    { name: 'Pending Bookings', value: bookings.filter(b => b.status === 'PENDING').length.toString(), icon: TrendingUp, change: '-2', trend: 'down' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 pl-64">
      <Sidebar />
      
      <main className="p-8">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Global Overview</h1>
            <p className="text-zinc-500">Welcome back, Admin. Here's what's happening across all properties.</p>
          </div>
          <button className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
            Generate Report
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <stat.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                  stat.trend === 'up' ? "bg-emerald-100 text-emerald-700" : 
                  stat.trend === 'down' ? "bg-red-100 text-red-700" : "bg-zinc-100 text-zinc-700"
                )}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : 
                   stat.trend === 'down' ? <ArrowDownRight className="w-3 h-3" /> : null}
                  {stat.change}
                </div>
              </div>
              <p className="text-sm font-medium text-zinc-500 mb-1">{stat.name}</p>
              <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
              <h2 className="font-bold text-zinc-900">Recent Bookings</h2>
              <button className="text-sm font-bold text-emerald-600 hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                    <th className="px-6 py-4">Guest</th>
                    <th className="px-6 py-4">Property</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-zinc-900">{booking.userName}</p>
                        <p className="text-xs text-zinc-500">ID: {booking.id}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-zinc-600">
                          {properties.find(p => p.id === booking.propertyId)?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          booking.status === 'APPROVED' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                        )}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-zinc-900">₱{booking.totalPrice}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
              <h2 className="font-bold text-zinc-900">Properties Status</h2>
              <button className="text-sm font-bold text-emerald-600 hover:underline">Manage</button>
            </div>
            <div className="p-6 space-y-6">
              {properties.map((property) => (
                <div key={property.id} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden">
                    <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-bold text-zinc-900">{property.name}</p>
                      <span className="text-xs font-bold text-zinc-500">85% Occupancy</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

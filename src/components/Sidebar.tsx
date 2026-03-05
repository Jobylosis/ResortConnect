import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Building2, Users, LogOut, Home, ClipboardList } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { cn } from '../lib/utils';

export const Sidebar: React.FC = () => {
  const { currentUser, logout } = useAppContext();

  const adminLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Properties', icon: Building2, href: '/admin/properties' },
    { name: 'Users', icon: Users, href: '/admin/users' },
  ];

  const ownerLinks = [
    { name: 'My Property', icon: Home, href: '/owner' },
    { name: 'Inventory', icon: ClipboardList, href: '/owner/inventory' },
    { name: 'Staff', icon: Users, href: '/owner/staff' },
  ];

  const links = currentUser?.role === 'ADMIN' ? adminLinks : ownerLinks;

  return (
    <div className="w-64 bg-zinc-900 text-white h-screen fixed left-0 top-0 flex flex-col border-r border-white/10">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold tracking-tight text-emerald-500">HOSPIRA</h1>
        <p className="text-xs text-zinc-400 mt-1 uppercase tracking-widest font-mono">
          {currentUser?.role} Portal
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-zinc-300 hover:text-white group"
          >
            <link.icon className="w-5 h-5 text-zinc-500 group-hover:text-emerald-500 transition-colors" />
            <span className="font-medium">{link.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold text-xs">
            {currentUser?.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate">{currentUser?.name}</p>
            <p className="text-xs text-zinc-500 truncate">{currentUser?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

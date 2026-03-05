import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User, LogIn, Building2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { currentUser, logout } = useAppContext();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900">Hospira</span>
          </Link>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search resorts or hotels..."
                className="w-full pl-10 pr-4 py-2 bg-zinc-100 border-transparent rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {currentUser ? (
              <>
                {currentUser.role !== 'TOURIST' && (
                  <Link 
                    to={currentUser.role === 'ADMIN' ? '/admin' : '/owner'}
                    className="text-sm font-medium text-zinc-600 hover:text-emerald-600"
                  >
                    Dashboard
                  </Link>
                )}
                <div className="flex items-center gap-3 pl-4 border-l border-zinc-200">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-zinc-900">{currentUser.name}</p>
                    <p className="text-xs text-zinc-500">{currentUser.role}</p>
                  </div>
                  <button 
                    onClick={logout}
                    className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-zinc-200 transition-colors"
                  >
                    <User className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

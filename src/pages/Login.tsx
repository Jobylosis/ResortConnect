import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Mail, Lock, ArrowRight, Building2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, users } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    const from = location.state?.from?.pathname || '/';
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-2xl mb-6 shadow-lg shadow-emerald-600/20">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Welcome back</h1>
          <p className="text-zinc-500 mt-2">Sign in to manage your bookings</p>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-zinc-200 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
            >
              Sign In
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-zinc-100">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest text-center mb-4">Quick Access for Demo</p>
            <div className="grid grid-cols-2 gap-3">
              {users.slice(0, 4).map((user) => (
                <button
                  key={user.id}
                  onClick={() => setEmail(user.email)}
                  className="px-3 py-2 text-[10px] font-bold bg-zinc-50 text-zinc-600 border border-zinc-200 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-all"
                >
                  {user.role}: {user.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-zinc-500 text-sm mt-8">
          Don't have an account? <a href="#" className="text-emerald-600 font-bold hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

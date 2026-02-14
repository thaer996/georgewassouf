
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/mockDb';
import { ShieldCheck, Lock, User as UserIcon, ArrowRight } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUser(username, password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Access Denied.');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-12 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center">
          <div className="inline-flex p-4 rounded-3xl bg-white/5 border border-white/10 mb-6">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h2 className="text-4xl font-serif">Admin <span className="italic text-gray-500">Access</span></h2>
          <p className="text-gray-500 mt-2 text-sm uppercase tracking-[0.2em]">Management Portal</p>
        </div>

        <form onSubmit={handleLogin} className="glass rounded-[40px] p-10 space-y-6 shadow-2xl">
          {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center rounded-2xl">{error}</div>}
          
          <div className="space-y-4">
            <div className="relative group">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Username" 
                className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-white/30 transition-all text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors" size={18} />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-white/30 transition-all text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-white text-black py-4 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-gray-200 transition-all transform active:scale-95"
          >
            Authenticate <ArrowRight size={14} />
          </button>

          <p className="text-[10px] text-center text-gray-600 uppercase tracking-widest font-bold pt-4">
            Security Protected Environment
          </p>
        </form>

        <p className="text-center text-gray-600 text-xs">
          Forgot credentials? Contact system administrator.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;

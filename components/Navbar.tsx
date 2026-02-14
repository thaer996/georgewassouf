
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Globe, ShieldCheck } from 'lucide-react';
import { LanguageContext } from '../App';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang, setLang, isRtl } = useContext(LanguageContext);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAdminPath = location.pathname.startsWith('/admin');

  const navItems = {
    EN: [
      { name: 'Home', id: 'home' },
      { name: 'Album', id: 'discography' },
      { name: 'Bio', id: 'biography' },
      { name: 'Gallery', id: 'gallery' }
    ],
    AR: [
      { name: 'الرئيسية', id: 'home' },
      { name: 'الألبومات', id: 'discography' },
      { name: 'السيرة', id: 'biography' },
      { name: 'المعرض', id: 'gallery' }
    ]
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 lg:px-16 py-6 flex items-center justify-between ${
        isScrolled || isAdminPath ? 'bg-black/90 backdrop-blur-xl py-4 shadow-2xl border-b border-white/5' : 'bg-transparent'
      }`}
    >
      {/* Brand / Logo */}
      <div className="flex items-center gap-12 flex-shrink-0">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-3xl font-serif tracking-tighter group-hover:text-gray-300 transition-colors flex items-baseline">
            <span className="text-white">{lang === 'EN' ? 'George ' : 'جورج '}</span>
            <span className="text-gray-500 italic ml-1">{lang === 'EN' ? 'Wassouf' : 'وسوف'}</span>
          </span>
        </Link>
      </div>

      {/* Center Navigation - Visible on Desktop/Laptop */}
      <div className="hidden lg:flex items-center justify-center gap-10 text-xs font-bold tracking-[0.2em] uppercase flex-grow">
        {navItems[lang].map((item, i) => (
          <a 
            key={i} 
            href={`#${item.id}`} 
            className="text-white/70 hover:text-white transition-colors relative group py-2"
          >
            {item.name}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
          </a>
        ))}
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-4 lg:gap-6 flex-shrink-0">
        {/* Language Switcher - Match screenshot style */}
        <button 
          onClick={() => setLang(lang === 'EN' ? 'AR' : 'EN')}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all text-[11px] font-black uppercase tracking-widest text-white"
        >
          <Globe size={14} />
          {lang === 'EN' ? 'AR' : 'EN'}
        </button>

        {/* Admin Link / Sign in - Match screenshot style (Solid White) */}
        <Link 
          to="/admin" 
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-black text-[11px] uppercase tracking-widest hover:bg-gray-200 transition-all shadow-xl active:scale-95"
        >
          <ShieldCheck size={14} />
          {lang === 'EN' ? 'SIGN IN' : 'دخول'}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;


import React, { useContext } from 'react';
import { Home, Music, User, Image, Mail } from 'lucide-react';
import { LanguageContext } from '../App';

const MobileNav: React.FC = () => {
  const { lang } = useContext(LanguageContext);

  const items = [
    { icon: <Home size={20} />, label: lang === 'EN' ? 'Home' : 'الرئيسية', href: '#' },
    { icon: <Music size={20} />, label: lang === 'EN' ? 'Music' : 'موسيقى', href: '#discography' },
    { icon: <User size={20} />, label: lang === 'EN' ? 'Bio' : 'سيرة', href: '#biography' },
    { icon: <Image size={20} />, label: lang === 'EN' ? 'Gallery' : 'معرض', href: '#gallery' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] px-4 pb-4">
      <div className="glass rounded-[32px] p-3 flex items-center justify-around shadow-2xl">
        {items.map((item, i) => (
          <a 
            key={i} 
            href={item.href} 
            className="flex flex-col items-center gap-1 p-2 text-gray-500 hover:text-white transition-colors"
          >
            {item.icon}
            <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;

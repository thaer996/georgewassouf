
import React, { useEffect, useRef, useContext } from 'react';
import gsap from 'gsap';
import { Play, Pause, Heart, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { LanguageContext } from '../App';
import { BackgroundPaths } from './ui/background-paths';

const Hero: React.FC = () => {
  const { lang, isRtl } = useContext(LanguageContext);
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        opacity: 0,
        x: isRtl ? 100 : -100,
        stagger: 0.2,
        duration: 1.5,
        ease: 'power4.out',
      });
      gsap.from(".hero-card", {
        opacity: 0,
        y: 100,
        scale: 0.9,
        duration: 2,
        ease: 'elastic.out(1, 0.75)',
        delay: 0.5
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isRtl]);

  const translations = {
    EN: {
      tag: "Iconic Artist",
      titleFirst: "George",
      titleLast: "Wassouf",
      desc: "An iconic Arabic singer whose voice has defined generations. The Sultan of Tarab remains a legendary figure in music history.",
      explore: "Explore More",
      popularTitle: "Popular Corner",
      playerTitle: "Seher El Layali",
      playerAlbum: "Sultan El Tarab",
    },
    AR: {
      tag: "فنان أسطوري",
      titleFirst: "جورج",
      titleLast: "وسوف",
      desc: "فنان عربي أيقوني صاغ صوته وجدان أجيال بأكملها. لا يزال سلطان الطرب شخصية أسطورية في تاريخ الموسيقى.",
      explore: "استكشف المزيد",
      popularTitle: "ركن الشهرة",
      playerTitle: "سهر الليالي",
      playerAlbum: "سلطان الطرب",
    }
  }[lang];

  return (
    <div ref={heroRef} className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center pt-24 pb-32 md:pb-0">
      {/* Background Animation Component - Increased opacity to 70 for clarity */}
      <div className="absolute inset-0 z-0 opacity-70">
        <BackgroundPaths />
      </div>

      {/* Background Image - monochrome and subtle */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-[1] bg-cover bg-center transition-all duration-1000 opacity-40"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1514525253361-b5947515d034?q=80&w=2000&auto=format&fit=crop")',
          filter: 'grayscale(100%) brightness(0.5)'
        }}
      />
      <div className="absolute inset-0 z-[2] hero-gradient" />
      
      <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content Area */}
        <div className="lg:col-span-7 hero-content space-y-8">
          <h1 className="text-7xl md:text-[10rem] font-serif leading-[0.85] tracking-tighter mb-4 break-words">
            <span className="text-white block">{translations.titleFirst}</span>
            <span className="text-gray-500 italic block">{translations.titleLast}</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-xl font-light leading-relaxed">
            {translations.desc}
          </p>

          <button className="px-10 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all transform hover:scale-105">
            {translations.explore}
          </button>

          {/* Floating Player Card */}
          <div className="hero-card glass rounded-[40px] p-6 max-w-md mt-12 flex items-center gap-6 shadow-2xl">
             <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-xl flex-shrink-0">
                <img src="https://picsum.photos/seed/was/400/400" className="w-full h-full object-cover" />
             </div>
             <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                   <div className="text-start">
                      <h4 className="font-bold text-sm text-white">{translations.playerTitle}</h4>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest">{translations.playerAlbum}</p>
                   </div>
                   <div className="flex gap-2">
                      <Heart size={14} className="text-gray-500" />
                      <div className="flex items-end gap-0.5 h-3">
                         <div className="w-0.5 bg-white h-full animate-[bounce_0.8s_infinite]" />
                         <div className="w-0.5 bg-white h-2/3 animate-[bounce_1.2s_infinite]" />
                      </div>
                   </div>
                </div>
                <div className="space-y-3">
                   <div className="flex justify-between text-[8px] font-bold text-gray-600">
                      <span>3:17</span>
                      <span>5:37</span>
                   </div>
                   <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-2/3" />
                   </div>
                   <div className="flex justify-center gap-6">
                      <SkipBack size={16} className="text-white/60 hover:text-white cursor-pointer" />
                      <Pause size={16} fill="white" className="cursor-pointer" />
                      <SkipForward size={16} className="text-white/60 hover:text-white cursor-pointer" />
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Corner Area */}
        <div className="lg:col-span-5 hidden lg:flex justify-end">
           <div className="glass rounded-[48px] p-8 w-full max-w-[320px] shadow-2xl relative">
              <h5 className="text-sm font-bold tracking-widest uppercase mb-8 text-white/80">{translations.popularTitle}</h5>
              <div className="grid grid-cols-2 gap-4">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="aspect-square rounded-2xl overflow-hidden group cursor-pointer relative">
                      <img 
                        src={`https://picsum.photos/seed/pop${i}/400/400`} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all" />
                   </div>
                 ))}
              </div>
              <div className="mt-8 flex justify-center">
                 <div className="w-2 h-2 rounded-full bg-white mx-1" />
                 <div className="w-2 h-2 rounded-full bg-white/20 mx-1" />
                 <div className="w-2 h-2 rounded-full bg-white/20 mx-1" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

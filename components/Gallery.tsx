
import React from 'react';

const Gallery: React.FC = () => {
  const images = [
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2000&auto=format&fit=crop'
  ];

  return (
    <section className="py-24 px-6 md:px-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm tracking-[0.4em] uppercase text-gray-500 mb-4 font-bold">Visuals</h2>
          <h3 className="text-4xl md:text-6xl font-serif">Moments of <span className="italic text-gray-400">Soul</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((src, i) => (
            <div key={i} className={`relative overflow-hidden group cursor-pointer rounded-2xl ${i === 1 ? 'md:row-span-2' : ''}`}>
               <img 
                 src={src} 
                 alt={`Gallery ${i}`}
                 className="w-full h-full object-cover aspect-square grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
               />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="px-6 py-2 border border-white text-xs uppercase tracking-widest font-bold">View Close Up</span>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

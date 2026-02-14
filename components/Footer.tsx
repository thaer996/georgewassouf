
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black pt-24 pb-12 px-6 md:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif mb-8">Let's connect <span className="text-gray-500 italic">worldwide.</span></h2>
            <p className="text-gray-400 text-lg font-light mb-12 max-w-lg">
              Stay updated with the latest releases, concert announcements, and exclusive insights from Sultan El-Tarab's team.
            </p>
            <div className="flex gap-8">
              <a href="#" className="p-4 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500"><Facebook size={20} /></a>
              <a href="#" className="p-4 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500"><Twitter size={20} /></a>
              <a href="#" className="p-4 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500"><Instagram size={20} /></a>
              <a href="#" className="p-4 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500"><Youtube size={20} /></a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-6">
              <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500">Navigation</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#biography" className="hover:text-white transition-colors">Biography</a></li>
                <li><a href="#discography" className="hover:text-white transition-colors">Discography</a></li>
                <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500">Management</h4>
              <p className="text-sm text-gray-400">
                For booking & inquiries:<br />
                <span className="text-white">mgmt@georgewassouf.com</span>
              </p>
              <p className="text-sm text-gray-400">
                Press:<br />
                <span className="text-white">press@georgewassouf.com</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 gap-8">
          <p className="text-xs text-gray-600 font-bold tracking-widest uppercase">
            © 2024 George Wassouf. All Rights Reserved.
          </p>
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-all"
          >
            Back to top
            <div className="p-3 border border-white/10 rounded-full group-hover:border-white transition-all">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

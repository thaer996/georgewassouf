
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Play, Pause, SkipBack, SkipForward, Search, Heart, Share2, Volume2, VolumeX } from 'lucide-react';
import { getSongs } from '../services/mockDb';
import { Song } from '../types';
import { LanguageContext } from '../App';

const Discography: React.FC = () => {
  const { lang, isRtl } = useContext(LanguageContext);
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetched = getSongs();
    setSongs(fetched);
    if (fetched.length > 0) setCurrentSong(fetched[0]);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = song.audioUrl;
      audioRef.current.play();
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = (parseFloat(e.target.value) / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(parseFloat(e.target.value));
    }
  };

  const filteredSongs = songs.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const t = {
    EN: {
      tag: "Discography",
      title: "Sultan's Hits",
      search: "Search Song, Album, Year...",
      tracks: "Popular Tracks",
      viewAll: "View All Discography"
    },
    AR: {
      tag: "الألبومات",
      title: "روائع السلطان",
      search: "ابحث عن أغنية، ألبوم...",
      tracks: "الأكثر استماعاً",
      viewAll: "عرض كل الألبومات"
    }
  }[lang];

  return (
    <section className="py-24 px-6 md:px-24 bg-[#0d0d0d]" id="discography">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-sm tracking-[0.4em] uppercase text-gray-500 mb-4 font-bold">{t.tag}</h2>
            <h3 className="text-4xl md:text-6xl font-serif">{t.title.split(' ')[0]} <span className="italic text-gray-400">{t.title.split(' ').slice(1).join(' ')}</span></h3>
          </div>
          <div className="relative w-full md:w-96 group">
            <Search className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors`} size={18} />
            <input 
              type="text"
              placeholder={t.search}
              className={`w-full bg-white/5 border border-white/10 rounded-full py-3 ${isRtl ? 'pr-12 pl-6' : 'pl-12 pr-6'} outline-none focus:border-white/30 transition-all text-sm`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="glass rounded-[48px] p-8 md:p-12 relative overflow-hidden group shadow-2xl">
               <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
               
               <div className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="w-full md:w-80 h-80 rounded-[40px] overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                    <img 
                      src={currentSong?.coverUrl || "https://picsum.photos/800/800"} 
                      className="w-full h-full object-cover" 
                      alt="Album Cover"
                    />
                  </div>

                  <div className="flex-1 space-y-8 w-full">
                    <div>
                      <h4 className="text-3xl font-serif mb-2">{currentSong?.title || "Select a track"}</h4>
                      <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">{currentSong?.album || "Album Name"} • {currentSong?.year || "Year"}</p>
                    </div>

                    <div className="flex items-center gap-6 text-gray-400">
                       <button className="hover:text-white transition-colors"><Heart size={20} /></button>
                       <button className="hover:text-white transition-colors"><Share2 size={20} /></button>
                       
                       <div className="flex items-center gap-2 group/vol">
                          <button 
                            onClick={() => setIsMuted(!isMuted)} 
                            className="hover:text-white transition-colors flex-shrink-0"
                          >
                            {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                          </button>
                          <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.01" 
                            value={isMuted ? 0 : volume}
                            onChange={(e) => {
                              setVolume(parseFloat(e.target.value));
                              setIsMuted(false);
                            }}
                            className="w-0 group-hover/vol:w-24 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-white transition-all duration-300 opacity-0 group-hover/vol:opacity-100"
                          />
                       </div>
                    </div>

                    <div className="space-y-4">
                       <div className="relative h-1 w-full bg-white/10 rounded-full overflow-hidden cursor-pointer">
                          <input 
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={handleProgressChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <div 
                            className="h-full bg-white transition-all duration-300 relative" 
                            style={{ width: `${progress}%` }}
                          >
                             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]" />
                          </div>
                       </div>
                       <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                          <span>{audioRef.current ? Math.floor(audioRef.current.currentTime / 60) + ":" + ("0" + Math.floor(audioRef.current.currentTime % 60)).slice(-2) : "0:00"}</span>
                          <span>5:37</span>
                       </div>
                    </div>

                    <div className={`flex items-center justify-between max-w-[240px] mx-auto ${isRtl ? 'md:mr-0 md:ml-auto' : 'md:ml-0 md:mr-auto'}`}>
                       <button className="p-3 text-gray-400 hover:text-white transition-colors"><SkipBack size={24} fill="currentColor" /></button>
                       <button 
                         onClick={togglePlay}
                         className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl"
                       >
                         {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} className={isRtl ? 'mr-1' : 'ml-1'} fill="currentColor" />}
                       </button>
                       <button className="p-3 text-gray-400 hover:text-white transition-colors"><SkipForward size={24} fill="currentColor" /></button>
                    </div>
                  </div>
               </div>
            </div>

            <audio 
              ref={audioRef} 
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
            />
          </div>

          <div className="space-y-6">
            <h5 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-500 mb-6 flex items-center gap-2">
              <div className="w-1 h-4 bg-white" />
              {t.tracks}
            </h5>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredSongs.map((song) => (
                <div 
                  key={song.id}
                  onClick={() => playSong(song)}
                  className={`group flex items-center gap-4 p-4 rounded-3xl cursor-pointer transition-all ${
                    currentSong?.id === song.id ? 'bg-white/10 border border-white/20 shadow-lg' : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={song.coverUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={song.title} />
                  </div>
                  <div className="flex-1 min-w-0 text-start">
                    <h6 className="font-bold text-sm truncate">{song.title}</h6>
                    <p className="text-xs text-gray-500 truncate">{song.album}</p>
                  </div>
                  <div className="text-xs text-gray-600 font-mono font-bold">
                    {currentSong?.id === song.id && isPlaying ? (
                      <div className="flex items-end gap-0.5 h-3">
                        <div className="w-0.5 bg-white animate-[bounce_0.8s_infinite]" />
                        <div className="w-0.5 bg-white animate-[bounce_1.2s_infinite]" />
                      </div>
                    ) : (
                      "5:37"
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full py-4 border border-white/10 rounded-3xl text-xs uppercase tracking-widest font-bold text-gray-400 hover:bg-white/5 transition-all">
              {t.viewAll}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discography;

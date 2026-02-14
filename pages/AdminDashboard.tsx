
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSongs, saveSong, deleteSong, logoutUser } from '../services/mockDb';
import { Song } from '../types';
import { Plus, Trash2, Edit3, Music, Calendar, Disc, LogOut, CheckCircle2 } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newSong, setNewSong] = useState<Omit<Song, 'id'>>({
    title: '',
    year: '',
    album: '',
    coverUrl: 'https://picsum.photos/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  });
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    setSongs(getSongs());
  }, []);

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = saveSong(newSong);
    setSongs(updated);
    setIsAdding(false);
    setNewSong({
      title: '',
      year: '',
      album: '',
      coverUrl: 'https://picsum.photos/400/400',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    });
    setSuccess('Song added successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this track?')) {
      const updated = deleteSong(id);
      setSongs(updated);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <h2 className="text-sm tracking-[0.4em] uppercase text-gray-500 mb-4 font-bold">Admin</h2>
            <h3 className="text-4xl md:text-6xl font-serif">Media <span className="italic text-gray-400">Dashboard</span></h3>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsAdding(!isAdding)}
              className="px-8 py-3 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-gray-200 transition-all"
            >
              <Plus size={16} /> New Song
            </button>
            <button 
              onClick={handleLogout}
              className="px-8 py-3 border border-white/20 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-white/10 transition-all"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {success && (
          <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 text-green-500 text-xs text-center rounded-2xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest">
            <CheckCircle2 size={16} /> {success}
          </div>
        )}

        {isAdding && (
          <form onSubmit={handleAddSong} className="glass rounded-[40px] p-10 mb-16 grid grid-cols-1 md:grid-cols-2 gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
               <button type="button" onClick={() => setIsAdding(false)} className="text-gray-500 hover:text-white uppercase text-[10px] font-bold tracking-widest">Cancel</button>
            </div>
            <h4 className="col-span-full text-xl font-serif mb-4">Add New Track</h4>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-2">Song Title</label>
              <div className="relative">
                <Music className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                <input required className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 outline-none focus:border-white/30 text-sm" value={newSong.title} onChange={e => setNewSong({...newSong, title: e.target.value})} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-2">Album Name</label>
              <div className="relative">
                <Disc className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                <input required className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 outline-none focus:border-white/30 text-sm" value={newSong.album} onChange={e => setNewSong({...newSong, album: e.target.value})} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-2">Release Year</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                <input required className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 outline-none focus:border-white/30 text-sm" value={newSong.year} onChange={e => setNewSong({...newSong, year: e.target.value})} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-2">Cover URL</label>
              <input required className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-6 outline-none focus:border-white/30 text-sm" value={newSong.coverUrl} onChange={e => setNewSong({...newSong, coverUrl: e.target.value})} />
            </div>

            <button type="submit" className="md:col-span-2 mt-4 bg-white text-black py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-all">Publish Track</button>
          </form>
        )}

        <div className="glass rounded-[40px] overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-white/5 bg-white/2">
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-gray-500">Inventory Management</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-8 py-6 text-xs uppercase tracking-widest font-bold text-gray-600">Track</th>
                  <th className="px-8 py-6 text-xs uppercase tracking-widest font-bold text-gray-600">Album</th>
                  <th className="px-8 py-6 text-xs uppercase tracking-widest font-bold text-gray-600">Year</th>
                  <th className="px-8 py-6 text-xs uppercase tracking-widest font-bold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {songs.map(song => (
                  <tr key={song.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img src={song.coverUrl} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-sm">{song.title}</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-tighter">MP3 Media File</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-400">{song.album}</td>
                    <td className="px-8 py-6 text-sm text-gray-400">{song.year}</td>
                    <td className="px-8 py-6">
                      <div className="flex justify-end gap-3">
                        <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all text-gray-400 hover:text-white"><Edit3 size={16} /></button>
                        <button onClick={() => handleDelete(song.id)} className="p-3 bg-red-500/10 rounded-xl hover:bg-red-500/20 transition-all text-red-500"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {songs.length === 0 && (
            <div className="p-20 text-center text-gray-600 space-y-4">
              <Music size={48} className="mx-auto opacity-20" />
              <p className="uppercase tracking-widest font-bold text-xs">No tracks found in the archive.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

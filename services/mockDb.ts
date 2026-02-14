
import { Song } from '../types';

const SONGS_KEY = 'wassouf_songs_v1';
const AUTH_KEY = 'wassouf_auth_v1';

const defaultSongs: Song[] = [
  {
    id: '1',
    title: 'Seher El Layali',
    year: '1984',
    album: 'Sultan El Tarab',
    coverUrl: 'https://picsum.photos/seed/song1/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: '2',
    title: 'Kalam El Nass',
    year: '1994',
    album: 'Kalam El Nass',
    coverUrl: 'https://picsum.photos/seed/song2/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: '3',
    title: 'Tabeeb Garrah',
    year: '1999',
    album: 'Tabeeb Garrah',
    coverUrl: 'https://picsum.photos/seed/song3/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  }
];

export const getSongs = (): Song[] => {
  const stored = localStorage.getItem(SONGS_KEY);
  if (!stored) {
    localStorage.setItem(SONGS_KEY, JSON.stringify(defaultSongs));
    return defaultSongs;
  }
  return JSON.parse(stored);
};

export const saveSong = (song: Omit<Song, 'id'>) => {
  const songs = getSongs();
  const newSong = { ...song, id: Math.random().toString(36).substr(2, 9) };
  const updated = [newSong, ...songs];
  localStorage.setItem(SONGS_KEY, JSON.stringify(updated));
  return updated;
};

export const deleteSong = (id: string) => {
  const songs = getSongs();
  const updated = songs.filter(s => s.id !== id);
  localStorage.setItem(SONGS_KEY, JSON.stringify(updated));
  return updated;
};

export const updateSong = (updatedSong: Song) => {
  const songs = getSongs();
  const updated = songs.map(s => s.id === updatedSong.id ? updatedSong : s);
  localStorage.setItem(SONGS_KEY, JSON.stringify(updated));
  return updated;
};

export const loginUser = (user: string, pass: string): boolean => {
  if (user === 'admin' && pass === 'wassouf2024') {
    localStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
};

export const checkAuth = (): boolean => {
  return localStorage.getItem(AUTH_KEY) === 'true';
};

export const logoutUser = () => {
  localStorage.removeItem(AUTH_KEY);
};

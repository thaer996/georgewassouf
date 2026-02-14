
export type Language = 'EN' | 'AR';

export interface Song {
  id: string;
  title: string;
  titleAr?: string;
  year: string;
  album: string;
  albumAr?: string;
  coverUrl: string;
  audioUrl: string;
}

export interface User {
  username: string;
  isLoggedIn: boolean;
}

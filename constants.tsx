
import { Game } from './types';

export const POPULAR_GAMES: Game[] = [
  {
    id: '1',
    title: 'Spider-Man 2',
    genre: 'Action-Adventure',
    image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=800',
    description: 'Swing through New York as both Peter Parker and Miles Morales.',
    rating: '9.5/10'
  },
  {
    id: '2',
    title: 'Elden Ring',
    genre: 'Action RPG',
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=800',
    description: 'Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring.',
    rating: '10/10'
  },
  {
    id: '3',
    title: 'God of War Ragnarök',
    genre: 'Action-Adventure',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
    description: 'Kratos and Atreus must journey to each of the Nine Realms in search of answers.',
    rating: '9.8/10'
  },
  {
    id: '4',
    title: 'Gran Turismo 7',
    genre: 'Racing',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
    description: 'The ultimate driving simulator with over 400 cars and legendary tracks.',
    rating: '8.7/10'
  }
];

export const CAFE_CONFIG = {
  pricing: {
    table: 79,
    room: 119
  },
  capacity: {
    table: 4,
    room: 4
  },
  currency: '฿'
};


export enum AppView {
  LANDING = 'landing',
  BOOKING = 'booking',
  GAMES = 'games',
  AI_REC = 'ai-rec',
  MY_BOOKINGS = 'my-bookings'
}

export interface Game {
  id: string;
  title: string;
  genre: string;
  image: string;
  description: string;
  rating: string;
}

export interface Booking extends BookingData {
  id: string;
  createdAt: string;
}

export interface BookingData {
  name: string;
  date: string;
  time: string;
  duration: number;
  stationType: 'table' | 'room';
  unitNumber: number;
}

export interface RecommendationRequest {
  mood: string;
  preferences: string;
  complexity: 'simple' | 'medium' | 'hardcore';
}

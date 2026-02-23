
import React, { useState, useEffect } from 'react';
import { AppView, Booking, BookingData } from './types';
import Navbar from './components/Navbar';
import AgeVerification from './components/AgeVerification';
import BookingForm from './components/BookingForm';
import MyBookings from './components/MyBookings';

const App: React.FC = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [userAge, setUserAge] = useState<number | null>(null);
  const [activeView, setActiveView] = useState<AppView>(AppView.BOOKING);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const verified = localStorage.getItem('nova_verified');
    const savedAge = localStorage.getItem('nova_age');
    const savedBookings = localStorage.getItem('nova_bookings');
    
    if (verified === 'true' && savedAge) {
      setIsVerified(true);
      setUserAge(parseInt(savedAge));
    }

    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    localStorage.setItem('nova_bookings', JSON.stringify(newBookings));
  };

  const handleVerified = (age: number) => {
    setIsVerified(true);
    setUserAge(age);
    localStorage.setItem('nova_verified', 'true');
    localStorage.setItem('nova_age', age.toString());
  };

  const handleReset = () => {
    setIsVerified(false);
    setUserAge(null);
    localStorage.removeItem('nova_verified');
    localStorage.removeItem('nova_age');
    setActiveView(AppView.BOOKING);
  };

  const handleAddBooking = (data: BookingData) => {
    const newBooking: Booking = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    saveBookings([...bookings, newBooking]);
  };

  const handleCancelBooking = (id: string) => {
    saveBookings(bookings.filter(b => b.id !== id));
  };

  if (!isVerified) {
    return <AgeVerification onVerified={handleVerified} />;
  }

  const renderContent = () => {
    switch (activeView) {
      case AppView.MY_BOOKINGS:
        return <MyBookings bookings={bookings} onCancel={handleCancelBooking} />;
      case AppView.BOOKING:
      default:
        return (
          <BookingForm 
            userAge={userAge || 0} 
            existingBookings={bookings}
            onAddBooking={handleAddBooking}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-pink-100 selection:text-pink-500">
      <Navbar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        userAge={userAge} 
        onReset={handleReset}
      />
      
      <div className="pt-20">
        {renderContent()}
      </div>

      <footer className="py-24 bg-gray-50/50 text-center mt-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center gap-12">
            <div className="font-orbitron font-black text-5xl tracking-tighter text-gray-800 uppercase">Attention console game cnx</div>
            <div className="flex gap-16 text-[11px] font-black uppercase tracking-[0.5em] text-gray-400">
              <a href="#" className="hover:text-pink-400 transition-colors">Instagram 🌸</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Discord ☁️</a>
              <a href="#" className="hover:text-yellow-500 transition-colors">Support 🎀</a>
            </div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">
              &copy; 2024 Attention console game cnx. A Very Happy Gaming Space. Bangkok.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;


import React from 'react';
import { Booking } from '../types';
import { Trash2, Calendar, Clock, Monitor } from 'lucide-react';

interface MyBookingsProps {
  bookings: Booking[];
  onCancel: (id: string) => void;
}

const MyBookings: React.FC<MyBookingsProps> = ({ bookings, onCancel }) => {
  const now = new Date();
  
  const sortedBookings = [...bookings].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const upcoming = sortedBookings.filter(b => {
    const bookingDate = new Date(`${b.date}T${b.time}`);
    return bookingDate >= now;
  });

  const history = sortedBookings.filter(b => {
    const bookingDate = new Date(`${b.date}T${b.time}`);
    return bookingDate < now;
  });

  if (bookings.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-6 text-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <Monitor className="w-10 h-10 text-gray-300" />
        </div>
        <h2 className="text-3xl font-orbitron font-black text-gray-800 mb-4 uppercase tracking-tight">No Bookings Yet</h2>
        <p className="text-gray-500 font-medium mb-10">Your gaming schedule is currently empty. Ready to change that?</p>
      </div>
    );
  }

  const renderBookingCard = (booking: Booking, isHistory: boolean) => (
    <div key={booking.id} className={`glass p-8 rounded-[3rem] border-white/80 shadow-xl relative group overflow-hidden ${isHistory ? 'opacity-60 grayscale-[0.5]' : ''}`}>
      {!isHistory && (
        <div className="absolute top-0 right-0 p-6">
          <button 
            onClick={() => onCancel(booking.id)}
            className="p-3 bg-red-50 text-red-400 hover:bg-red-100 rounded-2xl transition-all"
            title="Cancel Booking"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${booking.stationType === 'table' ? 'bg-blue-50 text-blue-500' : 'bg-pink-50 text-pink-500'}`}>
            {booking.stationType} {booking.unitNumber}
          </span>
          {isHistory && (
            <span className="px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-gray-100 text-gray-500">
              Past Session
            </span>
          )}
        </div>
        <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight">{booking.name}</h3>
        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">
          Booked on: {new Date(booking.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-gray-500 font-bold text-sm">
          <Calendar className="w-4 h-4 text-pink-400" />
          {booking.date}
        </div>
        <div className="flex items-center gap-3 text-gray-500 font-bold text-sm">
          <Clock className="w-4 h-4 text-blue-400" />
          {booking.time} ({booking.duration}h)
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-50 flex justify-between items-center">
        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Status</span>
        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${isHistory ? 'bg-gray-100 text-gray-500' : 'bg-emerald-50 text-emerald-500'}`}>
          {isHistory ? 'Completed' : 'Confirmed'}
        </span>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-orbitron font-black mb-4 uppercase tracking-tighter text-gray-800">
          My <span className="text-pink-500">Schedule</span> 🗓️
        </h1>
        <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">
          Manage your upcoming gaming sessions and view history
        </p>
      </div>

      {upcoming.length > 0 && (
        <div className="mb-20">
          <h2 className="text-xl font-orbitron font-black text-gray-800 mb-8 uppercase tracking-widest flex items-center gap-4">
            Upcoming Sessions
            <span className="h-px flex-1 bg-gray-100"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcoming.map(b => renderBookingCard(b, false))}
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div>
          <h2 className="text-xl font-orbitron font-black text-gray-400 mb-8 uppercase tracking-widest flex items-center gap-4">
            Booking History
            <span className="h-px flex-1 bg-gray-100"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {history.map(b => renderBookingCard(b, true))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;

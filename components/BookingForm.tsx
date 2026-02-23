
import React, { useState } from 'react';
import { BookingData, Booking } from '../types';
import { CAFE_CONFIG } from '../constants';
import { AlertCircle } from 'lucide-react';

interface BookingFormProps {
  userAge: number;
  existingBookings: Booking[];
  onAddBooking: (data: BookingData) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ userAge, existingBookings, onAddBooking }) => {
  const isMinor = userAge < 18;
  const maxTime = isMinor ? "20:00" : "23:00";
  const displayMaxTime = isMinor ? "8:00 PM (Minor Safety Curfew 🌙)" : "11:00 PM (Verified Adult 🛡️)";

  const [formData, setFormData] = useState<BookingData>({
    name: '',
    date: '',
    time: '',
    duration: 1,
    stationType: 'table',
    unitNumber: 1
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateTotal = () => {
    return formData.duration * (CAFE_CONFIG.pricing[formData.stationType] || 0);
  };

  const isOverlapping = (b1: { time: string, duration: number }, b2: { time: string, duration: number }) => {
    const start1 = parseInt(b1.time.replace(':', ''));
    const end1 = start1 + (b1.duration * 100);
    const start2 = parseInt(b2.time.replace(':', ''));
    const end2 = start2 + (b2.duration * 100);

    return (start1 < end2 && end1 > start2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Check for duplicates
    const duplicate = existingBookings.find(b => 
      b.date === formData.date && 
      b.stationType === formData.stationType && 
      b.unitNumber === formData.unitNumber &&
      isOverlapping(b, formData)
    );

    if (duplicate) {
      setError(`Oops! Station ${formData.stationType} ${formData.unitNumber} is already booked during this time. 🎀`);
      return;
    }

    onAddBooking(formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto glass p-16 rounded-[4rem] text-center border-pink-100 shadow-2xl">
        <div className="w-28 h-28 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-10 animate-float">
          <span className="text-5xl">🍭</span>
        </div>
        <h2 className="text-4xl font-orbitron font-black mb-6 text-gray-800">All Set! ✨</h2>
        <p className="text-gray-500 mb-10 leading-relaxed font-medium text-lg">
          Yay! Station <span className="text-pink-500 font-black">{formData.stationType} {formData.unitNumber}</span> is waiting for <span className="text-gray-800 font-bold">{formData.name}</span>.<br />
          We'll see you on <span className="text-blue-500 font-bold">{formData.date}</span> at <span className="text-blue-500 font-bold">{formData.time}</span>.<br />
          Price: <span className="text-pink-500 font-black">{calculateTotal()}฿</span>
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="px-12 py-5 bg-gradient-to-r from-pink-400 to-pink-300 text-white font-black rounded-[2rem] transition-all uppercase tracking-widest text-xs shadow-lg shadow-pink-100"
        >
          Book Another One! 🌈
        </button>
      </div>
    );
  }

  const units = [1, 2, 3, 4];

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-orbitron font-black mb-4 uppercase tracking-tighter text-gray-800">
          Pick Your <span className="text-pink-500">Spot</span> ☁️
        </h1>
        <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">
          {isMinor ? 'Minor Gamer Status' : 'Verified Adult Status'} • High Comfort Only
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3 space-y-10">
          <div className="glass p-10 rounded-[3rem] border-white/80 shadow-inner group">
            <h3 className="text-lg font-black mb-8 text-pink-400 flex items-center gap-4 uppercase tracking-wider">
              <span className="w-9 h-9 rounded-2xl bg-pink-100 flex items-center justify-center text-[11px] text-pink-500 font-black">01</span>
              Who's Playing?
            </h3>
            <div className="grid grid-cols-1 gap-8">
              <div>
                <label className="block text-[10px] font-black text-gray-400 mb-3 uppercase tracking-widest">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white border-2 border-pink-50 rounded-2xl px-6 py-4 outline-none focus:border-pink-300 transition-all text-gray-700 font-bold shadow-sm"
                  placeholder="Gamer Name"
                />
              </div>
            </div>
          </div>

          <div className="glass p-10 rounded-[3rem] border-white/80 shadow-inner group">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-black text-blue-400 flex items-center gap-4 uppercase tracking-wider">
                <span className="w-9 h-9 rounded-2xl bg-blue-100 flex items-center justify-center text-[11px] text-blue-500 font-black">02</span>
                The Time
              </h3>
              <div className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${isMinor ? 'bg-yellow-50 text-yellow-500 border border-yellow-100' : 'bg-blue-50 text-blue-500'}`}>
                {displayMaxTime}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-black text-gray-400 mb-3 uppercase tracking-widest">What Day?</label>
                <input 
                  required
                  type="date" 
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-white border-2 border-blue-50 rounded-2xl px-6 py-4 outline-none focus:border-blue-300 transition-all text-gray-700 font-bold shadow-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 mb-3 uppercase tracking-widest">What Hour?</label>
                <input 
                  required
                  type="time" 
                  min="11:00"
                  max={maxTime}
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                  className="w-full bg-white border-2 border-blue-50 rounded-2xl px-6 py-4 outline-none focus:border-blue-300 transition-all text-gray-700 font-bold shadow-sm"
                />
              </div>
            </div>
            <div className="mt-10">
              <div className="flex justify-between items-center mb-5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">How Many Hours?</label>
                <span className="text-blue-500 font-black text-2xl">{formData.duration} <span className="text-[10px] uppercase">Hrs</span></span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="6" 
                step="1"
                value={formData.duration}
                onChange={e => setFormData({...formData, duration: parseInt(e.target.value)})}
                className="w-full h-4 bg-blue-50 rounded-full appearance-none cursor-pointer accent-blue-400 border-2 border-white shadow-inner"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-10">
          <div className="glass p-10 rounded-[3rem] border-white/80">
            <h3 className="text-lg font-black mb-8 text-yellow-500 flex items-center gap-4 uppercase tracking-wider">
              <span className="w-9 h-9 rounded-2xl bg-yellow-100 flex items-center justify-center text-[11px] text-yellow-600 font-black">03</span>
              Station
            </h3>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">A: Style</label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'table', name: 'Open 🍃', price: CAFE_CONFIG.pricing.table, color: 'blue' },
                    { id: 'room', name: 'Suite 🧸', price: CAFE_CONFIG.pricing.room, color: 'pink' },
                  ].map(type => (
                    <div 
                      key={type.id}
                      onClick={() => setFormData({...formData, stationType: type.id as any, unitNumber: 1})}
                      className={`p-5 rounded-[2rem] border-4 transition-all cursor-pointer relative flex flex-col items-center justify-center text-center ${formData.stationType === type.id ? `border-yellow-200 bg-yellow-50/50 shadow-md` : 'border-gray-50 bg-white/40 hover:border-gray-100'}`}
                    >
                      <span className="font-black text-[11px] uppercase tracking-tighter mb-1 text-gray-700">{type.name}</span>
                      <span className="text-gray-800 font-black text-xl">{type.price}฿</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">B: Number</label>
                <div className="grid grid-cols-4 gap-3">
                  {units.map(num => (
                    <div 
                      key={num}
                      onClick={() => setFormData({...formData, unitNumber: num})}
                      className={`h-14 flex items-center justify-center rounded-2xl border-4 transition-all cursor-pointer font-black text-lg ${formData.unitNumber === num ? (formData.stationType === 'table' ? 'border-blue-200 bg-blue-50 text-blue-500' : 'border-pink-200 bg-pink-50 text-pink-500') : 'border-gray-50 bg-white/40 hover:border-gray-100 text-gray-300'}`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-12 rounded-[4rem] border-pink-100 flex flex-col items-center justify-center text-center relative overflow-hidden group shadow-xl">
            <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Today's Total 🍩</span>
            <div className="text-7xl font-orbitron font-black text-gray-800 mb-4 drop-shadow-sm">
              {calculateTotal()}<span className="text-2xl ml-2 text-pink-400 italic">฿</span>
            </div>
            <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-10 bg-white px-4 py-2 rounded-full border-2 border-pink-50">
              {formData.stationType} {formData.unitNumber} 🎀 {formData.duration}h
            </div>
            
            <button 
              type="submit"
              className="w-full py-6 bg-gradient-to-r from-pink-400 to-pink-300 text-white font-black rounded-[2rem] transition-all transform hover:scale-[1.03] shadow-lg shadow-pink-100 uppercase tracking-widest text-sm"
            >
              Book Station ✨
            </button>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
            <div className="mt-10 flex items-center gap-4 text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">
               <span className="animate-bounce">🍭</span> Secure & Happy
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;

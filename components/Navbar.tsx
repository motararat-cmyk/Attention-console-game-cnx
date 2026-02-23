
import React from 'react';
import { AppView } from '../types';
import { RotateCcw } from 'lucide-react';

interface NavbarProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  userAge: number | null;
  onReset: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, setActiveView, userAge, onReset }) => {
  const isMinor = userAge !== null && userAge < 18;
  const statusLabel = isMinor ? "Minor Gamer 🧸" : "Verified Adult 🛡️";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass px-8 py-4 rounded-[2rem] border-white/60 shadow-lg shadow-pink-100/50">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setActiveView(AppView.BOOKING)}
        >
          <div className="w-11 h-11 bg-gradient-to-br from-pink-300 to-pink-500 rounded-[1.2rem] flex items-center justify-center font-orbitron font-black text-white text-xl shadow-md transform group-hover:rotate-12 transition-transform">
            A
          </div>
          <div className="flex flex-col">
            <span className="font-orbitron font-black text-2xl hidden sm:block tracking-tighter text-gray-800 leading-none">
              Attention console game cnx
            </span>
            {userAge !== null && (
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[9px] font-black uppercase tracking-widest leading-none ${isMinor ? 'text-yellow-500' : 'text-blue-500'}`}>
                  {statusLabel}
                </span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onReset();
                  }}
                  className="p-2 text-gray-300 hover:text-pink-400 hover:bg-pink-50 rounded-xl transition-all"
                  title="Change Age"
                >
                  <RotateCcw className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-8">
          <button 
            onClick={() => setActiveView(AppView.MY_BOOKINGS)}
            className={`text-xs font-black uppercase tracking-widest transition-colors ${activeView === AppView.MY_BOOKINGS ? 'text-pink-500' : 'text-gray-400 hover:text-gray-600'}`}
          >
            My Bookings
          </button>
          <button 
            onClick={() => setActiveView(AppView.BOOKING)}
            className="px-8 py-3 bg-gradient-to-r from-pink-400 to-pink-300 hover:from-pink-500 hover:to-pink-400 text-white text-xs font-black rounded-full transition-all shadow-md shadow-pink-100 uppercase tracking-widest"
          >
            Book Now 🎀
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

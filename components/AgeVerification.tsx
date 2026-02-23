
import React, { useState } from 'react';

interface AgeVerificationProps {
  onVerified: (age: number) => void;
}

const AgeVerification: React.FC<AgeVerificationProps> = ({ onVerified }) => {
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState<string | null>(null);

  const calculateAge = (dob: string) => {
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleVerify = () => {
    if (!birthDate) {
      setError("Please pick your special day! ✨");
      return;
    }

    const age = calculateAge(birthDate);
    onVerified(age);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
      {/* Soft Pastel Clouds */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-pink-100/60 blur-[100px] rounded-full animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-100/60 blur-[100px] rounded-full animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-md w-full p-10 glass rounded-[3rem] text-center relative z-10 bubble-shadow border-white">
        <div className="mb-8 inline-flex p-6 rounded-[2rem] bg-gradient-to-br from-pink-200 to-pink-300 text-pink-600 shadow-inner animate-bounce">
          <span className="text-4xl">🎮</span>
        </div>
        
        <h1 className="text-3xl font-orbitron font-black mb-4 text-pink-500 uppercase tracking-tight">
          Welcome Gamer! 🌸
        </h1>
        
        <p className="text-gray-500 mb-8 leading-relaxed text-sm font-medium">
          Ready for some fun? Tell us when you were born so we can verify your status as a <span className="text-pink-400 font-bold">Minor Gamer</span> or <span className="text-blue-400 font-bold">Verified Adult</span>!
        </p>

        <div className="space-y-6 text-left">
          <div className="bg-white/50 p-6 rounded-3xl border-2 border-pink-100">
            <label className="block text-[10px] font-bold text-pink-400 uppercase tracking-widest mb-3 px-1">Your Birthday 🍰</label>
            <input 
              type="date"
              value={birthDate}
              onChange={(e) => {
                setBirthDate(e.target.value);
                setError(null);
              }}
              className="w-full bg-white border border-pink-100 rounded-2xl px-5 py-3 outline-none focus:border-pink-300 transition-all text-gray-700 font-bold"
            />
          </div>

          <button
            onClick={handleVerify}
            className="w-full py-5 bg-gradient-to-r from-pink-400 to-pink-300 hover:from-pink-500 hover:to-pink-400 text-white font-black rounded-3xl transition-all shadow-[0_10px_20px_rgba(255,182,197,0.5)] transform hover:scale-[1.02] uppercase tracking-widest text-sm"
          >
            Start Playing! ✨
          </button>
        </div>

        {error && (
          <div className="mt-6 p-4 rounded-2xl bg-pink-50 border border-pink-100 text-pink-500 text-xs font-bold animate-pulse">
            {error}
          </div>
        )}

        <div className="mt-10 flex flex-col gap-3 items-center">
            <div className="flex gap-3">
                <span className="w-3 h-3 rounded-full bg-pink-200"></span>
                <span className="w-3 h-3 rounded-full bg-blue-200"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-200"></span>
            </div>
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-black">Happy Gaming Community</p>
        </div>
      </div>
    </div>
  );
};

export default AgeVerification;

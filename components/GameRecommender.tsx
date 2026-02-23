
import React, { useState } from 'react';
import { getGameRecommendation } from '../services/geminiService';
import { RecommendationRequest } from '../types';

const GameRecommender: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [req, setReq] = useState<RecommendationRequest>({
    mood: '',
    preferences: '',
    complexity: 'medium'
  });

  const handleRecommend = async () => {
    if (!req.mood) return;
    setLoading(true);
    try {
      const data = await getGameRecommendation(req);
      setResults(data.recommendations || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-24 px-6">
      <div className="glass p-12 rounded-[4rem] border-white shadow-xl shadow-purple-50/50 mb-16 relative overflow-hidden">
        {/* Magic Dust Animation */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-100/50 blur-3xl rounded-full"></div>
        
        <div className="flex items-center gap-6 mb-12">
          <div className="w-16 h-16 bg-purple-100 text-purple-500 rounded-[2rem] flex items-center justify-center shadow-inner">
            <span className="text-3xl">🔮</span>
          </div>
          <div>
            <h2 className="text-3xl font-orbitron font-black text-gray-800">Magic Librarian</h2>
            <p className="text-gray-400 font-medium">Let our magic AI find your next happy adventure!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <div className="space-y-8">
            <div>
              <label className="block text-[11px] font-black text-purple-400 uppercase tracking-widest mb-3 px-1">How do you feel? ✨</label>
              <input 
                type="text"
                placeholder="e.g. Cozy, Brave, Excited!"
                value={req.mood}
                onChange={e => setReq({...req, mood: e.target.value})}
                className="w-full bg-white border-4 border-purple-50 rounded-[2rem] px-6 py-4 outline-none focus:border-purple-200 transition-all text-gray-700 font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-black text-purple-400 uppercase tracking-widest mb-3 px-1">Difficulty 🍬</label>
              <select 
                value={req.complexity}
                onChange={e => setReq({...req, complexity: e.target.value as any})}
                className="w-full bg-white border-4 border-purple-50 rounded-[2rem] px-6 py-4 outline-none focus:border-purple-200 transition-all text-gray-700 font-bold appearance-none cursor-pointer"
              >
                <option value="simple">Sweet & Simple</option>
                <option value="medium">Balanced Fun</option>
                <option value="hardcore">Pro Challenge</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-black text-purple-400 uppercase tracking-widest mb-3 px-1">Favorite Genres? 🧸</label>
            <textarea 
              placeholder="e.g. I love exploring soft worlds and making friends."
              rows={5}
              value={req.preferences}
              onChange={e => setReq({...req, preferences: e.target.value})}
              className="w-full bg-white border-4 border-purple-50 rounded-[2.5rem] px-8 py-6 outline-none focus:border-purple-200 transition-all text-gray-700 font-bold"
            />
          </div>
        </div>

        <button 
          onClick={handleRecommend}
          disabled={loading || !req.mood}
          className="w-full py-6 bg-gradient-to-r from-purple-400 to-purple-300 hover:from-purple-500 hover:to-purple-400 disabled:opacity-30 text-white font-black rounded-[2.5rem] transition-all shadow-lg shadow-purple-100 uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-4"
        >
          {loading ? (
            <>
              <span className="animate-spin text-2xl">✨</span>
              Casting Spell...
            </>
          ) : (
            'Get Magic Picks! ✨'
          )}
        </button>
      </div>

      {results.length > 0 && (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h3 className="text-3xl font-orbitron font-black text-center mb-12 text-gray-800">Your Magic Picks 🍓</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {results.map((item, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[3rem] border-4 border-purple-50 shadow-xl shadow-purple-50/20 flex flex-col h-full hover:scale-105 transition-transform">
                <div className="flex items-start justify-between mb-6">
                  <h4 className="font-black text-2xl text-gray-800 tracking-tight">{item.title}</h4>
                  <span className="text-[10px] uppercase font-black tracking-widest bg-purple-100 text-purple-500 px-3 py-1 rounded-full">Magic</span>
                </div>
                <p className="text-sm text-gray-400 font-medium mb-6 flex-grow leading-relaxed">{item.reason}</p>
                <div className="pt-6 border-t-2 border-purple-50">
                  <p className="text-xs italic text-purple-400 font-bold">"✨ {item.whyThisMood}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameRecommender;

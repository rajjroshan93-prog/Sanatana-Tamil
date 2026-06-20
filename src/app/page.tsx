"use client";

import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import IntroScreen from "@/components/IntroScreen";
import FlowerShower from "@/components/FlowerShower";
import { getDeityOfDay } from "@/data/deities";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [showAltar, setShowAltar] = useState(false);
  
  // State interaktif untuk pemicu animasi dan suara
  const [flowerTrigger, setFlowerTrigger] = useState(false);
  const [isRinging, setIsRinging] = useState(false);

  const deityToday = getDeityOfDay();

  // Fungsi untuk membunyikan lonceng virtual memakai Audio API bawaan HP
  const playBellSound = () => {
    setIsRinging(true);
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/911/911-84.wav"); // Suara lonceng kuil jernih
    audio.volume = 0.6;
    audio.play().catch(err => console.log("Audio play blocked by browser:", err));
    
    // Hentikan efek getar tombol setelah 500ms
    setTimeout(() => setIsRinging(false), 500);
  };

  // Fungsi untuk memicu hujan bunga marigold/mawar selama 4 detik
  const triggerFlowerShower = () => {
    setFlowerTrigger(true);
    // Reset trigger agar bisa diklik berulang kali
    setTimeout(() => setFlowerTrigger(false), 4000);
  };

  // 1. Alkur Keamanan: Belum Login -> Tampilkan Welcome Screen
  if (!user) {
    return <WelcomeScreen onLoginSuccess={(userData) => setUser(userData)} />;
  }

  // 2. Alur Perkenalan: Sudah Login -> Tampilkan Intro dari San
  if (user && !showAltar && !user.hasSeenIntro) {
    return (
      <IntroScreen 
        userName={user.name || "Pengunjung"} 
        onContinue={() => setShowAltar(true)} 
      />
    );
  }

  // 3. TAMPILAN UTAMA: Altar Interaktif Sanatana Tamil yang Berjalan Lancar
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center p-6 relative overflow-hidden">
      
      {/* Komponen Animasi Hujan Bunga Terpasang secara Gaib di Atas Layar */}
      <FlowerShower trigger={flowerTrigger} />

      {/* Header Aplikasi */}
      <header className="w-full max-w-md flex justify-between items-center mb-8 border-b border-stone-800/60 pb-4 z-10">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
          Sanatana Tamil
        </h1>
        <div className="flex items-center gap-2 bg-stone-900/80 px-3 py-1.5 rounded-full border border-stone-800 text-xs text-stone-400">
          <img src={user.photoURL} alt="avatar" className="w-4 h-4 rounded-full inline" />
          <span>{user.name}</span>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="w-full max-w-md space-y-6 flex-1 flex flex-col justify-center z-10">
        
        {/* Kotak Altar Suci */}
        <div className="bg-gradient-to-b from-amber-900/20 to-stone-900/90 border-2 border-amber-600/30 backdrop-blur-sm rounded-3xl p-6 shadow-2xl relative text-center space-y-4">
          <div className="text-stone-500 text-[10px] tracking-widest uppercase font-semibold">Altar Suci Hari Ini</div>
          
          <div>
            <h2 className="text-2xl font-bold text-amber-400 tracking-wide">{deityToday.name}</h2>
            <p className="text-orange-500 text-lg font-bold mt-0.5 font-sans">{deityToday.tamilName}</p>
          </div>

          {/* Bingkai Foto Dewa-Dewi */}
          <div className="w-full h-72 bg-stone-950 rounded-2xl border border-stone-800/80 overflow-hidden relative shadow-inner group">
            <img 
              src={deityToday.imageUrl} 
              alt={deityToday.name} 
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            {/* Efek Pendaran Lampu Arati */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-orange-600/30 via-amber-500/10 to-transparent"></div>
          </div>

          {/* Fitur Utama Interaktif */}
          <div className="flex justify-center gap-8 pt-2">
            {/* Tombol Lonceng dengan Animasi Getar (isRinging) */}
            <button 
              onClick={playBellSound}
              className={`w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 rounded-full flex items-center justify-center text-2xl shadow-xl shadow-amber-950/50 transition-all transform active:scale-95 ${isRinging ? "animate-bounce scale-110 rotate-12" : ""}`}
              title="Bunyikan Lonceng"
            >
              🔔
            </button>
            
            {/* Tombol Tabur Bunga */}
            <button 
              onClick={triggerFlowerShower}
              className="w-16 h-16 bg-gradient-to-br from-orange-400 to-rose-500 text-stone-950 rounded-full flex items-center justify-center text-2xl shadow-xl shadow-orange-950/50 transition-all transform active:scale-95 hover:rotate-12"
              title="Tabur Bunga"
            >
              🌸
            </button>
          </div>
        </div>

        {/* Kotak Filosofi & Informasi Kebudayaan */}
        <div className="bg-stone-900/40 border border-stone-800/60 backdrop-blur-sm p-5 rounded-2xl space-y-4 shadow-lg">
          <div>
            <h3 className="text-amber-500 font-bold text-xs uppercase tracking-wider mb-1">Tentang Beliau</h3>
            <p className="text-stone-300 text-sm leading-relaxed">{deityToday.description}</p>
          </div>
          <div className="border-t border-stone-800/40 pt-3">
            <h3 className="text-amber-500 font-bold text-xs uppercase tracking-wider mb-1">Filosofi Kebudayaan</h3>
            <p className="text-stone-300 text-sm leading-relaxed">{deityToday.philosophy}</p>
          </div>
          <div className="border-t border-stone-800/40 pt-3 bg-stone-950/60 p-4 rounded-xl border border-stone-900 text-center">
            <h4 className="text-orange-400 font-extrabold text-[10px] uppercase tracking-widest mb-1.5">Mantra Harian</h4>
            <p className="italic text-stone-100 font-medium tracking-wide text-sm">"{deityToday.mantra}"</p>
            <p className="text-stone-500 text-xs mt-1.5 leading-relaxed">Artinya: {deityToday.mantraMeaning}</p>
          </div>
        </div>

      </main>
    </div>
  );
}

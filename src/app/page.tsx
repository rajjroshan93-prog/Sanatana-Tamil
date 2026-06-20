"use client";

import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import IntroScreen from "@/components/IntroScreen";
import { getDeityOfDay } from "@/data/deities";

export default function Home() {
  // State untuk menyimpan data user yang sedang login
  const [user, setUser] = useState<any>(null);
  // State untuk melacak apakah user sudah melewati halaman intro San
  const [showAltar, setShowAltar] = useState(false);

  // Ambil data dewa harian otomatis berdasarkan tanggal hari ini
  const deityToday = getDeityOfDay();

  // 1. Jika belum login, tampilkan Welcome Screen (Login Google + Simpan Firebase)
  if (!user) {
    return <WelcomeScreen onLoginSuccess={(userData) => setUser(userData)} />;
  }

  // 2. Jika sudah login tapi belum klik 'Masuk ke Altar', tampilkan Intro Screen dari San
  if (user && !showAltar && !user.hasSeenIntro) {
    return (
      <IntroScreen 
        userName={user.name || "Pengunjung"} 
        onContinue={() => setShowAltar(true)} 
      />
    );
  }

  // 3. TAMPILAN UTAMA: Halaman Altar Interaktif Sanatana Tamil
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center p-6 relative">
      {/* Header Kecil */}
      <header className="w-full max-w-md flex justify-between items-center mb-8 border-b border-stone-800/60 pb-4">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
          Sanatana Tamil
        </h1>
        <div className="flex items-center gap-2 bg-stone-900/80 px-3 py-1.5 rounded-full border border-stone-800 text-xs text-stone-400">
          <span>{user.name}</span>
        </div>
      </header>

      {/* Bagian Utama: Altar Dewa-Dewi Hari Ini */}
      <main className="w-full max-w-md space-y-6 flex-1 flex flex-col justify-center">
        
        {/* Bingkai Altar Tradisional */}
        <div className="bg-gradient-to-b from-amber-900/30 to-stone-900 border-2 border-amber-600/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-center space-y-4">
          <div className="text-stone-500 text-xs tracking-widest uppercase">Altar Suci Hari Ini</div>
          
          {/* Nama Dewa */}
          <div>
            <h2 className="text-2xl font-bold text-amber-400">{deityToday.name}</h2>
            <p className="text-orange-500 text-lg font-semibold">{deityToday.tamilName}</p>
          </div>

          {/* Tempat Gambar Dewa (Kita buat kotak estetik sebelum ada aset gambar asli) */}
          <div className="w-full h-64 bg-stone-950 rounded-2xl border border-stone-800 flex items-center justify-center p-4 relative overflow-hidden shadow-inner">
            <span className="text-stone-600 text-xs">Aset Gambar {deityToday.name}</span>
            {/* Efek pendaran lampu Arati bawah */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-orange-500/20 to-transparent"></div>
          </div>

          {/* Tombol Interaktif Fitur Utama Kamu */}
          <div className="flex justify-center gap-6 pt-2">
            {/* Tombol Lonceng */}
            <button 
              onClick={() => alert("🔔 Lonceng berbunyi! (Nanti kita sambungkan ke Audio)")}
              className="w-14 h-14 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-full flex items-center justify-center text-2xl shadow-lg shadow-amber-950/40 active:scale-90 transition-all"
              title="Bunyikan Lonceng"
            >
              🔔
            </button>
            {/* Tombol Tabur Bunga */}
            <button 
              onClick={() => alert("🌸 Bunga bertaburan dari atas langit! (Nanti kita pasang animasi)")}
              className="w-14 h-14 bg-orange-500 hover:bg-orange-600 text-stone-950 rounded-full flex items-center justify-center text-2xl shadow-lg shadow-orange-950/40 active:scale-90 transition-all"
              title="Tabur Bunga"
            >
              🌸
            </button>
          </div>
        </div>

        {/* Info Filosofi & Mantera Harian */}
        <div className="bg-stone-900/50 border border-stone-800/80 p-5 rounded-2xl space-y-4">
          <div>
            <h3 className="text-amber-500 font-semibold text-sm">Tentang Beliau:</h3>
            <p className="text-stone-300 text-sm leading-relaxed">{deityToday.description}</p>
          </div>
          <div className="border-t border-stone-800/60 pt-3">
            <h3 className="text-amber-500 font-semibold text-sm">Filosofi Kebudayaan:</h3>
            <p className="text-stone-300 text-sm leading-relaxed">{deityToday.philosophy}</p>
          </div>
          <div className="border-t border-stone-800/60 pt-3 bg-stone-950/40 p-3 rounded-xl border border-stone-800/40 text-center">
            <h4 className="text-orange-400 font-bold text-xs uppercase tracking-wider mb-1">Mantra Harian</h4>
            <p className="italic text-stone-200 font-medium">"{deityToday.mantra}"</p>
            <p className="text-stone-500 text-xs mt-1">Artinya: {deityToday.mantraMeaning}</p>
          </div>
        </div>

      </main>
    </div>
  );
}


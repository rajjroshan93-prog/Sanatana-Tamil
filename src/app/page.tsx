"use client";

import { useState, useEffect, useRef } from "react";

// ==========================================
// 1. DATA DEWA-DEWI (Langsung di dalam file)
// ==========================================
const deitiesData = [
  {
    name: "Lord Murugan",
    tamilName: "முருகன்",
    description: "Dewa perang, keberanian, dan pelindung bahasa serta kebudayaan Tamil.",
    philosophy: "Simbol kemenangan kesadaran spiritual atas kebodohan dan kegelapan.",
    mantra: "Om Saravana Bhava",
    mantraMeaning: "Salam kepada Yang Lahir di Alang-Alang Suci, Pembawa Kedamaian dan Energi Ilahi.",
    imageUrl: "https://images.unsplash.com/photo-1609137144813-9118bc27df0b?q=80&w=600&auto=format&fit=crop"
  }
];

// ==========================================
// 2. KOMPONEN HUJAN BUNGA (Langsung di sini)
// ==========================================
function FlowerShower({ trigger }: { trigger: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!trigger) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const flowers = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      r: Math.random() * 6 + 4,
      color: ["#f59e0b", "#f97316", "#f43f5e", "#ec4899"][Math.floor(Math.random() * 4)],
      speed: Math.random() * 2 + 2,
      angle: Math.random() * 2
    }));

    let animationId: number;
    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      flowers.forEach((f) => {
        f.y += f.speed;
        f.x += Math.sin(f.angle);
        f.angle += 0.02;

        ctx!.beginPath();
        ctx!.fillStyle = f.color;
        ctx!.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx!.fill();

        if (f.y > canvas!.height) f.y = -20;
      });
      animationId = requestAnimationFrame(draw);
    }
    draw();

    const timer = setTimeout(() => cancelAnimationFrame(animationId), 4000);
    return () => { cancelAnimationFrame(animationId); clearTimeout(timer); };
  }, [trigger]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-50 w-full h-full" />;
}

// ==========================================
// 3. HALAMAN UTAMA (Main Page)
// ==========================================
export default function Home() {
  const [flowerTrigger, setFlowerTrigger] = useState(false);
  const [isRinging, setIsRinging] = useState(false);

  const deityToday = deitiesData[0];

  const playBellSound = () => {
    setIsRinging(true);
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/911/911-84.wav");
    audio.volume = 0.5;
    audio.play().catch(err => console.log("Audio diblokir browser", err));
    setTimeout(() => setIsRinging(false), 500);
  };

  const triggerFlower = () => {
    setFlowerTrigger(true);
    setTimeout(() => setFlowerTrigger(false), 4000);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center p-6 relative overflow-hidden">
      <FlowerShower trigger={flowerTrigger} />

      <header className="w-full max-w-md flex justify-between items-center mb-8 border-b border-stone-800 pb-4">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
          Sanatana Tamil
        </h1>
      </header>

      <main className="w-full max-w-md space-y-6 flex-1 flex flex-col justify-center">
        <div className="bg-gradient-to-b from-amber-900/20 to-stone-900/90 border-2 border-amber-600/30 rounded-3xl p-6 shadow-2xl text-center space-y-4">
          <div className="text-stone-500 text-[10px] tracking-widest uppercase font-semibold">Altar Suci</div>
          
          <div>
            <h2 className="text-2xl font-bold text-amber-400">{deityToday.name}</h2>
            <p className="text-orange-500 text-lg font-bold">{deityToday.tamilName}</p>
          </div>

          <div className="w-full h-72 bg-stone-950 rounded-2xl border border-stone-800 overflow-hidden relative">
            <img src={deityToday.imageUrl} alt={deityToday.name} className="w-full h-full object-cover opacity-80" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-orange-600/30 to-transparent"></div>
          </div>

          <div className="flex justify-center gap-8 pt-2">
            <button 
              onClick={playBellSound}
              className={`w-16 h-16 bg-amber-500 text-stone-950 rounded-full flex items-center justify-center text-2xl shadow-xl transition-all transform ${isRinging ? "animate-bounce scale-110" : ""}`}
            >
              🔔
            </button>
            <button 
              onClick={triggerFlower}
              className="w-16 h-16 bg-orange-500 text-stone-950 rounded-full flex items-center justify-center text-2xl shadow-xl transform active:scale-95"
            >
              🌸
            </button>
          </div>
        </div>

        <div className="bg-stone-900/40 border border-stone-800/60 p-5 rounded-2xl space-y-4">
          <div>
            <h3 className="text-amber-500 font-bold text-xs uppercase">Tentang Beliau</h3>
            <p className="text-stone-300 text-sm">{deityToday.description}</p>
          </div>
          <div className="border-t border-stone-800/40 pt-3">
            <h3 className="text-amber-500 font-bold text-xs uppercase">Filosofi</h3>
            <p className="text-stone-300 text-sm">{deityToday.philosophy}</p>
          </div>
          <div className="border-t border-stone-800/40 pt-3 bg-stone-950/60 p-4 rounded-xl text-center">
            <h4 className="text-orange-400 font-bold text-xs uppercase">Mantra Harian</h4>
            <p className="italic text-stone-100 text-sm">"{deityToday.mantra}"</p>
            <p className="text-stone-500 text-xs mt-1">Artinya: {deityToday.mantraMeaning}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

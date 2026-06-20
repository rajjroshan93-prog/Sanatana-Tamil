"use client";

import { useEffect, useRef } from "react";

interface FlowerShowerProps {
  trigger: boolean;
}

export default function FlowerShower({ trigger }: FlowerShowerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!trigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Membuat 40 kelopak bunga virtual
    const totalFlowers = 40;
    const flowers: any[] = [];

    for (let i = 0; i < totalFlowers; i++) {
      flowers.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        r: Math.random() * 6 + 4, // Ukuran kelopak
        d: Math.random() * totalFlowers,
        color: ["#f59e0b", "#f97316", "#f43f5e", "#ec4899"][Math.floor(Math.random() * 4)], // Warna Marigold & Mawar
        tilt: Math.random() * 10 - 5,
        tiltAngleIncremental: Math.random() * 0.07 + 0.02,
        tiltAngle: 0
      });
    }

    let animationFrameId: number;

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      flowers.forEach((f, index) => {
        f.tiltAngle += f.tiltAngleIncremental;
        f.y += (Math.cos(f.d) + 3 + f.r / 2) / 2; // Kecepatan jatuh
        f.x += Math.sin(f.tiltAngle);

        ctx!.beginPath();
        ctx!.lineWidth = f.r * 2;
        ctx!.strokeStyle = f.color;
        ctx!.moveTo(f.x + f.r + f.tilt, f.y);
        ctx!.lineTo(f.x + f.tilt, f.y + f.tilt + f.r);
        ctx!.stroke();

        // Jika bunga sampai di bawah, kembalikan ke atas
        if (f.y > canvas!.height) {
          flowers[index] = {
            ...f,
            x: Math.random() * canvas!.width,
            y: -20,
            tilt: Math.random() * 10 - 5
          };
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    // Otomatis stop setelah 4 detik biar HP tidak lemot
    const timer = setTimeout(() => {
      cancelAnimationFrame(animationFrameId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 4000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timer);
    };
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-50 w-full h-full"
    />
  );
}

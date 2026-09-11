import React from 'react';
import { Scissors, Grid, Image as ImageIcon, Zap, Shield, ArrowRight } from 'lucide-react';

export default function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-50 font-sans selection:bg-sky-500/30 overflow-x-hidden relative">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-grid-pattern opacity-10"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-sky-500/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-6 py-6 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50 flex items-center justify-center shadow-lg">
            <Grid size={20} className="text-zinc-200" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white flex items-center gap-2">
            GridCut <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Pro</span>
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <span className="flex h-2 w-2 rounded-full bg-sky-500"></span>
          <span className="text-xs font-medium text-zinc-300">Super HD Resolution & Precision</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 mb-6 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          Potong Gambar Resolusi Tinggi dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Presisi Sempurna</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          Alat pemotong gambar profesional untuk Instagram Grid, Carousel, dan Panorama. Tanpa upload ke server, proses super cepat langsung di browser Anda.
        </p>
        
        <button 
          onClick={onStart}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-zinc-950 font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)]"
        >
          <span className="relative z-10 flex items-center gap-2">
            Mulai Memotong Gambar <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>

        {/* Feature Highlights */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full animate-in fade-in slide-in-from-bottom-12 duration-700 delay-700">
          <div className="flex flex-col items-center p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm transition-colors hover:bg-zinc-800/50">
            <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center mb-4 border border-sky-500/20 text-sky-400">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-bold text-zinc-100 mb-2">Proses Instan</h3>
            <p className="text-zinc-400 text-sm">Tidak perlu instalasi atau upload. Diproses langsung di browser dengan sangat cepat.</p>
          </div>
          
          <div className="flex flex-col items-center p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm transition-colors hover:bg-zinc-800/50">
            <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4 border border-indigo-500/20 text-indigo-400">
              <ImageIcon size={24} />
            </div>
            <h3 className="text-lg font-bold text-zinc-100 mb-2">Kualitas Super HD</h3>
            <p className="text-zinc-400 text-sm">Mendukung upscale dan penajaman gambar untuk hasil akhir yang sangat jernih dan tajam.</p>
          </div>
          
          <div className="flex flex-col items-center p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm transition-colors hover:bg-zinc-800/50">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 border border-emerald-500/20 text-emerald-400">
              <Shield size={24} />
            </div>
            <h3 className="text-lg font-bold text-zinc-100 mb-2">Privasi Terjamin</h3>
            <p className="text-zinc-400 text-sm">Semua pemrosesan dilakukan secara lokal di perangkat Anda. Data gambar Anda 100% aman.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-zinc-800/50 text-center animate-in fade-in duration-1000 delay-1000">
        <p className="text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} GridCut Studio Pro. Dirancang untuk para Profesional dan Kreator.
        </p>
      </footer>
    </div>
  );
}

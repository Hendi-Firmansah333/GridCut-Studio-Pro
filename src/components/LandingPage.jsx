import React, { useState, useEffect } from 'react';
import { LayoutGrid, Image as ImageIcon, Shield, Zap, SlidersHorizontal, ArrowRight } from 'lucide-react';

export default function LandingPage({ onStart }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Sequential Grid Animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 9);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // Mouse Tracking for Glow Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Use requestAnimationFrame for smoother tracking
      requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-50 font-sans selection:bg-sky-500/30 overflow-x-hidden relative">
      
      {/* Interactive Mouse Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-20 transition-opacity duration-300 mix-blend-screen"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(14, 165, 233, 0.04), transparent 40%)`
        }}
      />

      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-sky-500/10 via-transparent to-transparent opacity-50 blur-3xl"></div>
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] animate-pulse"></div>
        <div className="absolute top-1/4 -left-40 w-[400px] h-[400px] rounded-full bg-sky-500/5 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Animated Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] animate-[pulse_4s_ease-in-out_infinite]" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, black 10%, transparent 80%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 10%, transparent 80%)'
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-black/30 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-default">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-500 p-[1px] group-hover:shadow-[0_0_15px_rgba(14,165,233,0.5)] transition-shadow duration-500">
              <div className="w-full h-full bg-zinc-950 rounded-[7px] flex items-center justify-center">
                <LayoutGrid size={16} className="text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <span className="font-display font-semibold text-lg tracking-tight text-white">GridCut Pro</span>
          </div>
          <button 
            onClick={onStart}
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-sky-400 after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-right hover:after:origin-left"
          >
            Masuk Workspace
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 pb-20 px-6 flex flex-col items-center justify-center min-h-[90vh]">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:bg-sky-500/20 transition-colors cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          <span className="text-xs font-bold text-sky-300 tracking-wider uppercase">GridCut Studio Pro 2.0</span>
        </div>

        {/* Headline */}
        <div className="max-w-4xl text-center space-y-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 relative group">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 transition-colors duration-500 group-hover:text-white">Transformasi Feed.</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400">Presisi Sempurna.</span>
            
            {/* Ambient text glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-purple-500/20 blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Platform potong gambar profesional tanpa server. Hasilkan grid Instagram, carousel seamless, dan panorama super HD langsung di browser Anda dalam hitungan detik.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mt-12 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
          {/* Animated Gradient Button */}
          <button 
            onClick={onStart}
            className="relative p-[2px] rounded-full group overflow-hidden w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 rounded-full animate-spin [animation-duration:3s] group-hover:[animation-duration:1.5s]"></div>
            <div className="relative bg-zinc-950 px-8 py-4 rounded-full transition-colors group-hover:bg-zinc-900 flex items-center justify-center gap-2">
              <span className="font-bold text-lg text-white">Mulai Sekarang</span>
              <ArrowRight size={18} className="text-sky-400 group-hover:translate-x-1 transition-transform" />
            </div>
            {/* Button Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-purple-400 rounded-full blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-500 -z-10"></div>
          </button>
          
          <a 
            href="https://github.com/Hendi-Firmansah333/GridCut-Studio-Pro" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-transparent border border-zinc-700 text-zinc-300 font-medium text-lg hover:border-zinc-500 hover:text-white transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] w-full sm:w-auto"
          >
            Lihat di GitHub
          </a>
        </div>

        {/* Interactive Floating Mockup */}
        <div className="mt-32 w-full max-w-5xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700 relative z-20">
          <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-50 animate-pulse"></div>
          
          {/* Main Card with Hover Scale */}
          <div className="relative rounded-3xl border border-zinc-700/50 bg-zinc-900/60 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row gap-4 transition-transform duration-1000 hover:scale-[1.02] hover:border-zinc-600/80 group">
            
            {/* Sidebar Mockup */}
            <div className="hidden md:flex flex-col gap-4 w-72 border-r border-zinc-800/50 p-6 bg-black/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-zinc-800 animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-2 w-3/4 bg-zinc-800 rounded-full"></div>
                  <div className="h-2 w-1/2 bg-zinc-800 rounded-full"></div>
                </div>
              </div>

              <div className="h-32 w-full bg-zinc-800/30 rounded-xl border-2 border-dashed border-zinc-700/50 flex items-center justify-center relative overflow-hidden group-hover:border-sky-500/30 transition-colors">
                 <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <ImageIcon className="text-zinc-600 group-hover:text-sky-400 transition-colors duration-500" />
              </div>
              
              <div className="space-y-3 mt-4">
                <div className="h-3 w-1/3 bg-zinc-700 rounded-full"></div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-10 bg-sky-500/20 rounded-lg border border-sky-500/30 flex items-center justify-center"><div className="w-1/2 h-1 bg-sky-400/50 rounded-full"></div></div>
                  <div className="h-10 bg-zinc-800/50 rounded-lg flex items-center justify-center"><div className="w-1/2 h-1 bg-zinc-600 rounded-full"></div></div>
                  <div className="h-10 bg-zinc-800/50 rounded-lg flex items-center justify-center"><div className="w-1/2 h-1 bg-zinc-600 rounded-full"></div></div>
                  <div className="h-10 bg-zinc-800/50 rounded-lg flex items-center justify-center"><div className="w-1/2 h-1 bg-zinc-600 rounded-full"></div></div>
                </div>
              </div>
            </div>

            {/* Canvas Mockup with Interactive Grid */}
            <div className="flex-1 rounded-2xl p-8 flex items-center justify-center min-h-[300px] md:min-h-[400px] relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              {/* Grid 3x3 Animation */}
              <div className="grid grid-cols-3 gap-2 w-full max-w-sm aspect-square relative z-10 p-2">
                {[...Array(9)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`bg-zinc-800/80 rounded-md overflow-hidden relative transition-all duration-500 ${activeIndex === i ? 'ring-2 ring-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.6)] scale-[1.05] z-10 bg-sky-900/50' : 'hover:bg-zinc-700'}`}
                  >
                    {/* Inner glowing pulse */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-sky-400/30 to-indigo-500/30 transition-opacity duration-500 ${activeIndex === i ? 'opacity-100' : 'opacity-0'}`}></div>
                  </div>
                ))}
                
                {/* Cutting Lines */}
                <div className="absolute inset-0 grid grid-cols-3 gap-2 pointer-events-none p-2">
                  <div className="border-r-2 border-sky-500/50 col-span-1 h-full shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
                  <div className="border-r-2 border-sky-500/50 col-span-1 h-full shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
                </div>
                <div className="absolute inset-0 grid grid-rows-3 gap-2 pointer-events-none p-2">
                  <div className="border-b-2 border-sky-500/50 row-span-1 w-full shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
                  <div className="border-b-2 border-sky-500/50 row-span-1 w-full shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Complex Bento Grid Section */}
      <section className="relative z-10 py-32 px-6 bg-black/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20 relative">
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6">
              Lebih Hidup, Lebih Presisi.
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Dirancang untuk alur kerja yang interaktif. Rasakan pengalaman mengedit tanpa hambatan langsung di dalam memori perangkat Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Item 1 */}
            <div className="col-span-1 md:col-span-2 rounded-[2.5rem] p-8 md:p-12 bg-zinc-900/40 border border-zinc-800/50 hover:border-sky-500/30 transition-all duration-500 flex flex-col justify-between overflow-hidden relative group hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(56,189,248,0.1)]">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl group-hover:bg-sky-500/20 transition-all duration-700 group-hover:scale-150"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-sky-500/10 flex items-center justify-center mb-8 border border-sky-500/20 text-sky-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <LayoutGrid size={28} />
                </div>
                <h3 className="text-3xl font-display font-bold mb-4 text-white">Grid & Panorama Fleksibel</h3>
                <p className="text-zinc-400 max-w-lg text-lg leading-relaxed group-hover:text-zinc-300 transition-colors">
                  Potong gambar Anda ke dalam berbagai rasio seperti 3x3 untuk Feed Instagram, atau 3x1 untuk carousel panorama seamless. Semua interaktif dan real-time.
                </p>
              </div>
            </div>

            {/* Bento Item 2 */}
            <div className="col-span-1 rounded-[2.5rem] p-8 bg-zinc-900/40 border border-zinc-800/50 hover:border-indigo-500/30 transition-all duration-500 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.1)] relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 border border-indigo-500/20 text-indigo-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-display font-bold mb-3 text-white">Proses Super Instan</h3>
                <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                  Tidak ada delay karena upload. Engine kami mengeksekusi pemotongan tepat di dalam browser secara interaktif.
                </p>
              </div>
            </div>

            {/* Bento Item 3 */}
            <div className="col-span-1 rounded-[2.5rem] p-8 bg-zinc-900/40 border border-zinc-800/50 hover:border-emerald-500/30 transition-all duration-500 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.1)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform duration-500">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-display font-bold mb-3 text-white">Privasi Terjamin 100%</h3>
                <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                  Gambar rahasia atau belum rilis? File Anda tidak pernah dikirim ke server. Diproses secara lokal di perangkat Anda.
                </p>
              </div>
            </div>

            {/* Bento Item 4 */}
            <div className="col-span-1 md:col-span-2 rounded-[2.5rem] p-8 md:p-12 bg-zinc-900/40 border border-zinc-800/50 hover:border-purple-500/30 transition-all duration-500 flex flex-col justify-between relative group overflow-hidden hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.1)]">
               <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-700 group-hover:scale-150"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
                <div className="flex-1">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-8 border border-purple-500/20 text-purple-400 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                    <SlidersHorizontal size={28} />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4 text-white">Editor & Watermark Dinamis</h3>
                  <p className="text-zinc-400 text-lg group-hover:text-zinc-300 transition-colors">
                    Atur kecerahan, kontras, saturasi secara *real-time*. Lindungi hak cipta karya Anda dengan fitur auto-watermark pintar.
                  </p>
                </div>
                {/* Mini UI abstract animated */}
                <div className="w-full md:w-56 bg-zinc-950/80 backdrop-blur-sm rounded-2xl p-5 border border-zinc-800/80 flex flex-col gap-4 shadow-xl transform group-hover:-translate-y-2 group-hover:rotate-2 transition-all duration-500">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-zinc-500"><span>Kontras</span><span>+24</span></div>
                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 w-3/4 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-zinc-500"><span>Kecerahan</span><span>-10</span></div>
                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-sky-500 w-1/2 shadow-[0_0_10px_rgba(56,189,248,0.8)]"></div>
                    </div>
                  </div>
                  <div className="h-10 mt-2 border border-dashed border-zinc-700 rounded-xl flex items-center justify-center text-xs font-medium text-zinc-400 bg-zinc-900/50 group-hover:bg-purple-500/10 group-hover:border-purple-500/30 group-hover:text-purple-300 transition-colors">@watermark</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-32 border-t border-zinc-800/50 bg-gradient-to-b from-black to-[#050505] text-center px-6 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[800px] bg-sky-500/5 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">Siap berkreasi sekarang?</h2>
          <p className="text-zinc-400 text-lg md:text-xl mb-12">Masuk ke workspace dan rasakan pengalaman mengedit gambar paling lancar, interaktif, dan presisi yang pernah ada.</p>
          <button 
            onClick={onStart}
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-bold text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Masuk Workspace Sekarang <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-sky-200 to-indigo-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/5 bg-[#030303] text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-default">
            <LayoutGrid size={16} />
            <span className="font-display font-semibold">GridCut Pro</span>
          </div>
          <p className="text-zinc-600 text-sm">
            &copy; {new Date().getFullYear()} GridCut Studio Pro.
          </p>
        </div>
      </footer>
    </div>
  );
}

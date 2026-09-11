import React, { useState, useEffect, useRef } from 'react';
import { LayoutGrid, Image as ImageIcon, Shield, Zap, SlidersHorizontal, ArrowRight, CheckCircle2, MonitorSmartphone, Lock, Workflow, ChevronRight } from 'lucide-react';

// --- Helper Components for Elegant Interactivity ---

// 1. Reveal on Scroll
function Reveal({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// 2. Elegant Mouse Glow Card
function GlowCard({ children, className = '' }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-3xl border border-zinc-800/50 bg-zinc-900/40 backdrop-blur-md overflow-hidden group ${className}`}
    >
      {/* Subtle background glow */}
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-500 pointer-events-none mix-blend-screen"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(14, 165, 233, 0.08), transparent 40%)`
        }}
      />
      {/* Intense border glow using mask */}
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-300 pointer-events-none opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.4), transparent 40%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
          borderRadius: 'inherit'
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

export default function LandingPage({ onStart }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Sequential Grid Animation for Hero
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 9);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-50 font-sans selection:bg-sky-500/30 overflow-x-hidden relative">
      
      {/* Elegant Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-sky-900/10 via-transparent to-transparent opacity-60 blur-[100px]"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-500/5 blur-[150px]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-sky-500/5 blur-[150px]"></div>
        
        {/* Fine Architectural Grid */}
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{ 
            backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            maskImage: 'linear-gradient(to bottom, black 5%, transparent 70%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 5%, transparent 70%)'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.02] bg-black/40 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-default">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 p-[1px] shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <div className="w-full h-full bg-[#0a0a0a] rounded-[7px] flex items-center justify-center">
                <LayoutGrid size={16} className="text-white" />
              </div>
            </div>
            <span className="font-display font-semibold text-lg tracking-tight text-white">GridCut <span className="text-zinc-500">Pro</span></span>
          </div>
          <button 
            onClick={onStart}
            className="text-sm font-medium text-zinc-300 hover:text-white transition-colors relative after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-sky-400 after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-right hover:after:origin-left"
          >
            Akses Workspace
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="relative z-10 pt-40 pb-24 px-6 flex flex-col items-center justify-center min-h-[95vh]">
        
        <Reveal delay={0}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/20 bg-sky-500/5 backdrop-blur-sm mb-10 shadow-[0_0_30px_rgba(14,165,233,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span className="text-xs font-semibold text-sky-300 tracking-widest uppercase">Generasi Baru Pemotongan Gambar</span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="max-w-5xl text-center space-y-8">
            <h1 className="text-6xl md:text-8xl font-display font-extrabold tracking-tighter leading-[1.05]">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400">Arsitektur Visual.</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 relative">
                Tanpa Kompromi.
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-purple-400 blur-3xl opacity-20 -z-10"></div>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
              Engine pemotong gambar kelas enterprise. Memproses grid resolusi super tinggi, panorama seamless, dan watermark dinamis sepenuhnya di sisi klien (<span className="text-zinc-200 font-medium">0 bytes</span> data terkirim).
            </p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="flex flex-col sm:flex-row items-center gap-6 mt-14">
            <button 
              onClick={onStart}
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white text-black font-bold text-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center gap-2">
                Masuk ke Workspace <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-sky-200 to-indigo-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
            
            <a 
              href="https://github.com/Hendi-Firmansah333/GridCut-Studio-Pro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-transparent border border-zinc-700 text-zinc-300 font-semibold text-lg hover:bg-zinc-900 hover:border-zinc-500 hover:text-white transition-all w-full sm:w-auto"
            >
              Pelajari Dokumentasi
            </a>
          </div>
        </Reveal>

        {/* Elegant Abstract UI Mockup */}
        <Reveal delay={400}>
          <div className="mt-28 w-full max-w-6xl relative z-20 perspective-1000">
            <div className="absolute -inset-1 bg-gradient-to-b from-sky-500/20 to-purple-500/5 rounded-[2.5rem] blur-2xl opacity-50"></div>
            
            <div className="relative rounded-[2.5rem] border border-white/[0.05] bg-[#0a0a0a]/80 backdrop-blur-2xl shadow-[0_20px_80px_-20px_rgba(0,0,0,1)] overflow-hidden flex flex-col md:flex-row transform transition-transform duration-1000 hover:rotate-x-1">
              
              {/* Mockup Header (macOS style) */}
              <div className="absolute top-0 inset-x-0 h-12 border-b border-white/[0.02] flex items-center px-6 bg-white/[0.01]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-800"></div>
                  <div className="w-3 h-3 rounded-full bg-zinc-800"></div>
                  <div className="w-3 h-3 rounded-full bg-zinc-800"></div>
                </div>
                <div className="mx-auto text-xs text-zinc-600 font-medium tracking-widest uppercase">GridCut Engine v2.0</div>
              </div>

              {/* Sidebar Mockup */}
              <div className="hidden md:flex flex-col gap-6 w-80 border-r border-white/[0.02] p-8 pt-20 bg-black/40">
                <div className="space-y-3">
                  <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Resolusi Output</div>
                  <div className="h-12 w-full bg-zinc-900 rounded-xl border border-zinc-800 flex items-center px-4 justify-between">
                    <span className="text-zinc-400 text-sm">Lebar Maks</span>
                    <span className="text-sky-400 text-sm font-mono">3240px</span>
                  </div>
                </div>

                <div className="h-40 w-full bg-zinc-900/50 rounded-2xl border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center gap-3 relative overflow-hidden group">
                   <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <ImageIcon size={32} className="text-zinc-700" />
                   <span className="text-xs text-zinc-600">Drop area aktif</span>
                </div>
                
                <div className="space-y-4 mt-2">
                  <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Pemrosesan</div>
                  {[1,2,3].map(i => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center">
                        <CheckCircle2 size={14} className="text-sky-500" />
                      </div>
                      <div className="flex-1 h-2 bg-zinc-900 rounded-full overflow-hidden">
                        <div className="h-full bg-zinc-700 w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Canvas Mockup with Elegant Grid */}
              <div className="flex-1 p-8 pt-20 flex items-center justify-center min-h-[400px] md:min-h-[500px] relative bg-gradient-to-br from-[#050505] to-[#0a0a0a]">
                {/* Center Grid */}
                <div className="grid grid-cols-3 gap-1 w-full max-w-[400px] aspect-square relative z-10 p-2">
                  {[...Array(9)].map((_, i) => (
                    <div 
                      key={i} 
                      className="bg-zinc-900/50 rounded-sm overflow-hidden relative transition-all duration-700 ease-in-out border border-white/[0.02]"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br from-sky-400/20 to-indigo-500/20 transition-opacity duration-700 ${activeIndex === i ? 'opacity-100' : 'opacity-0'}`}></div>
                      {/* Scanning Line Effect */}
                      {activeIndex === i && (
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-400/50 to-transparent h-[200%] w-full animate-[scan_1s_ease-in-out_infinite] -translate-y-full"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </main>

      {/* --- STATS / TRUST SECTION --- */}
      <section className="relative z-10 py-16 border-y border-white/[0.02] bg-[#050505]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center divide-x divide-zinc-800/50">
            <Reveal delay={0}>
              <div>
                <div className="text-4xl font-display font-bold text-white mb-2">0<span className="text-sky-400">ms</span></div>
                <div className="text-sm text-zinc-500 uppercase tracking-widest font-semibold">Server Latency</div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div>
                <div className="text-4xl font-display font-bold text-white mb-2">100<span className="text-sky-400">%</span></div>
                <div className="text-sm text-zinc-500 uppercase tracking-widest font-semibold">Client-Side</div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div>
                <div className="text-4xl font-display font-bold text-white mb-2">&infin;</div>
                <div className="text-sm text-zinc-500 uppercase tracking-widest font-semibold">Resolusi Output</div>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div>
                <div className="text-4xl font-display font-bold text-white mb-2"><Lock size={32} className="inline text-sky-400 mb-1" /></div>
                <div className="text-sm text-zinc-500 uppercase tracking-widest font-semibold">Privasi Terjaga</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (ALUR KERJA) --- */}
      <section className="relative z-10 py-32 px-6 bg-[#030303] overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[800px] bg-indigo-500/5 blur-[150px] pointer-events-none rounded-full"></div>
        
        <div className="container mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-20">
              <h2 className="text-sm font-bold text-sky-400 tracking-widest uppercase mb-4 flex items-center gap-3">
                <Workflow size={18} /> Alur Kerja Teknis
              </h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight max-w-2xl">
                Dirancang untuk <span className="text-zinc-500">efisiensi</span> maksimal tanpa bottleneck.
              </h3>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-10 right-10 h-[1px] bg-gradient-to-r from-sky-500/0 via-sky-500/20 to-sky-500/0"></div>

            <Reveal delay={0}>
              <div className="relative z-10 flex flex-col gap-6">
                <div className="w-24 h-24 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-2xl font-display font-bold text-sky-400 shadow-[0_0_30px_rgba(0,0,0,0.5)]">01</div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-3">Impor Lokal</h4>
                  <p className="text-zinc-400 leading-relaxed">
                    Gambar diload langsung ke memory browser menggunakan teknologi File API. Tidak ada byte data yang meninggalkan perangkat Anda.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="relative z-10 flex flex-col gap-6">
                <div className="w-24 h-24 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-2xl font-display font-bold text-indigo-400 shadow-[0_0_30px_rgba(0,0,0,0.5)]">02</div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-3">Engine Pemrosesan</h4>
                  <p className="text-zinc-400 leading-relaxed">
                    Algoritma presisi matematis membagi, menajamkan, dan menyematkan watermark menggunakan HTML5 Canvas dengan akselerasi hardware GPU.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="relative z-10 flex flex-col gap-6">
                <div className="w-24 h-24 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-2xl font-display font-bold text-purple-400 shadow-[0_0_30px_rgba(0,0,0,0.5)]">03</div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-3">Ekspor Batch</h4>
                  <p className="text-zinc-400 leading-relaxed">
                    Hasil pemotongan secara instan dikemas ke dalam arsip ZIP siap unduh, menjaga metadata dan profil warna sRGB yang akurat.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- COMPLEX BENTO GRID SECTION --- */}
      <section className="relative z-10 py-32 px-6 bg-[#050505]">
        <div className="container mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-20">
               <h2 className="text-sm font-bold text-sky-400 tracking-widest uppercase mb-4 flex items-center gap-3">
                <MonitorSmartphone size={18} /> Ekosistem Fitur
              </h2>
              <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">
                Kompleksitas yang <br/><span className="text-zinc-500">disederhanakan.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
            
            {/* Bento Item 1: Wide */}
            <Reveal delay={0} className="col-span-1 md:col-span-2">
              <GlowCard className="p-10 md:p-12 h-full flex flex-col justify-between">
                <div className="w-14 h-14 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-8 border border-zinc-700/50 text-white">
                  <LayoutGrid size={28} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-display font-bold text-white">Matriks Grid Dinamis</h3>
                  <p className="text-zinc-400 max-w-lg text-lg leading-relaxed">
                    Arsitektur rasio tak terbatas. Dari 3x3 klasik untuk feed konvensional, hingga rasio kustom kompleks dengan perhitungan overlap piksel presisi tinggi untuk carousel yang menyatu sempurna.
                  </p>
                </div>
              </GlowCard>
            </Reveal>

            {/* Bento Item 2: Square */}
            <Reveal delay={100} className="col-span-1">
              <GlowCard className="p-10 flex flex-col justify-between h-full">
                <div className="w-14 h-14 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-8 border border-zinc-700/50 text-white">
                  <Zap size={28} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-bold text-white">Eksekusi Instan</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    Zero-latency. Mengeliminasi proses upload lambat. Rendering terjadi dalam hitungan milidetik.
                  </p>
                </div>
              </GlowCard>
            </Reveal>

            {/* Bento Item 3: Square */}
            <Reveal delay={0} className="col-span-1">
              <GlowCard className="p-10 flex flex-col justify-between h-full">
                <div className="w-14 h-14 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-8 border border-zinc-700/50 text-white">
                  <Shield size={28} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-bold text-white">Infrastruktur Privat</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    Isolasi data total. Hak cipta intelektual Anda aman di dalam mesin lokal, tidak tersentuh cloud.
                  </p>
                </div>
              </GlowCard>
            </Reveal>

            {/* Bento Item 4: Wide Complex */}
            <Reveal delay={100} className="col-span-1 md:col-span-2">
              <GlowCard className="p-10 md:p-12 h-full flex flex-col md:flex-row gap-10 items-center">
                <div className="flex-1 space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-800/50 flex items-center justify-center border border-zinc-700/50 text-white">
                    <SlidersHorizontal size={28} />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white">Koreksi & Proteksi</h3>
                  <p className="text-zinc-400 text-lg">
                    Algoritma penyesuaian kontras dan kecerahan adaptif, disandingkan dengan injeksi watermark tipografi secara batch ke seluruh segmen grid.
                  </p>
                </div>
                {/* Abstract Data Viz */}
                <div className="w-full md:w-64 bg-zinc-950/80 rounded-2xl p-6 border border-zinc-800 flex flex-col gap-5">
                  {[
                    { l: 'Luminance', v: '+24%', c: 'bg-sky-400' },
                    { l: 'Sharpening', v: '1.5x', c: 'bg-indigo-400' },
                    { l: 'Watermark', v: '0.8a', c: 'bg-purple-400' }
                  ].map((stat, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between text-xs text-zinc-500 font-mono"><span>{stat.l}</span><span className="text-white">{stat.v}</span></div>
                      <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <div className={`h-full ${stat.c} w-[${70 + Math.random()*20}%]`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlowCard>
            </Reveal>

          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="relative z-10 py-40 border-t border-white/[0.02] bg-[#030303] text-center px-6 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full max-w-4xl h-[400px] bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-purple-500/10 blur-[100px] rounded-full"></div>
        </div>
        
        <Reveal>
          <div className="relative z-10 max-w-4xl mx-auto space-y-10">
            <h2 className="text-5xl md:text-7xl font-display font-extrabold text-white tracking-tight leading-tight">
              Standar Baru Pengelolaan <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Media Sosial.</span>
            </h2>
            <p className="text-zinc-400 text-xl max-w-2xl mx-auto font-light">
              Tinggalkan alat pemotong usang. Beranjak ke platform yang dirancang khusus untuk memenuhi standar profesionalisme Anda.
            </p>
            <div className="pt-8">
              <button 
                onClick={onStart}
                className="group relative inline-flex items-center gap-4 px-12 py-6 rounded-full bg-white text-black font-bold text-xl overflow-hidden transition-all hover:scale-[1.03] active:scale-[0.97] shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:shadow-[0_0_80px_rgba(255,255,255,0.2)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Inisialisasi Workspace <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 py-12 border-t border-white/[0.02] bg-[#030303] px-6">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-zinc-400">
            <LayoutGrid size={20} />
            <span className="font-display font-bold text-lg text-white">GridCut <span className="text-zinc-600">Pro</span></span>
          </div>
          <div className="text-zinc-600 text-sm font-medium">
            &copy; {new Date().getFullYear()} GridCut Studio Pro. Rekayasa perangkat lunak tanpa server.
          </div>
        </div>
      </footer>
    </div>
  );
}

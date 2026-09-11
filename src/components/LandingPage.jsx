import React from 'react';
import { Scissors, LayoutGrid, Image as ImageIcon, Shield, Zap, SlidersHorizontal, ArrowRight, Download, Eye } from 'lucide-react';

export default function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen bg-[#030303] text-zinc-50 font-sans selection:bg-sky-500/30 overflow-x-hidden relative">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-sky-500/10 via-transparent to-transparent opacity-50 blur-3xl"></div>
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px]"></div>
        <div className="absolute top-1/4 -left-40 w-[400px] h-[400px] rounded-full bg-sky-500/5 blur-[100px]"></div>
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)'
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-500 p-[1px]">
              <div className="w-full h-full bg-zinc-950 rounded-[7px] flex items-center justify-center">
                <LayoutGrid size={16} className="text-white" />
              </div>
            </div>
            <span className="font-display font-semibold text-lg tracking-tight text-white">GridCut Pro</span>
          </div>
          <button 
            onClick={onStart}
            className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
          >
            Masuk Workspace
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 pb-20 px-6 flex flex-col items-center justify-center min-h-[90vh]">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          <span className="text-xs font-medium text-sky-300 tracking-wide uppercase">GridCut Studio Pro 2.0</span>
        </div>

        {/* Headline */}
        <div className="max-w-4xl text-center space-y-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">Transformasi Feed.</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400">Presisi Sempurna.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Platform potong gambar profesional tanpa server. Hasilkan grid Instagram, carousel seamless, dan panorama super HD langsung di browser Anda dalam hitungan detik.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-12 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
          <button 
            onClick={onStart}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold text-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-95 w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center gap-2">
              Mulai Sekarang <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <a 
            href="https://github.com/Hendi-Firmansah333/GridCut-Studio-Pro" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-zinc-900 border border-zinc-800 text-white font-medium text-lg hover:bg-zinc-800 transition-all w-full sm:w-auto"
          >
            Lihat di GitHub
          </a>
        </div>

        {/* Abstract UI Mockup */}
        <div className="mt-24 w-full max-w-5xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/30 to-indigo-500/30 rounded-3xl blur-2xl opacity-50"></div>
          <div className="relative rounded-3xl border border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl p-4 shadow-2xl overflow-hidden flex flex-col md:flex-row gap-4">
            {/* Sidebar Mockup */}
            <div className="hidden md:flex flex-col gap-3 w-64 border-r border-zinc-800/50 pr-4">
              <div className="h-8 w-1/2 bg-zinc-800/50 rounded-lg"></div>
              <div className="h-24 w-full bg-zinc-800/30 rounded-xl border border-dashed border-zinc-700/50"></div>
              <div className="h-8 w-3/4 bg-zinc-800/50 rounded-lg mt-4"></div>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-12 bg-sky-500/20 rounded-lg border border-sky-500/30"></div>
                <div className="h-12 bg-zinc-800/50 rounded-lg"></div>
                <div className="h-12 bg-zinc-800/50 rounded-lg"></div>
              </div>
            </div>
            {/* Canvas Mockup */}
            <div className="flex-1 rounded-2xl bg-black/50 border border-white/5 p-8 flex items-center justify-center min-h-[300px] md:min-h-[400px]">
              {/* Grid 3x3 Animation */}
              <div className="grid grid-cols-3 gap-1 w-full max-w-sm aspect-square relative">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-sm overflow-hidden relative group">
                    <div className="absolute inset-0 bg-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
                {/* Overlay Lines */}
                <div className="absolute inset-0 grid grid-cols-3 gap-1 pointer-events-none">
                  <div className="border-r border-sky-500/30 col-span-1 h-full"></div>
                  <div className="border-r border-sky-500/30 col-span-1 h-full"></div>
                </div>
                <div className="absolute inset-0 grid grid-rows-3 gap-1 pointer-events-none">
                  <div className="border-b border-sky-500/30 row-span-1 w-full"></div>
                  <div className="border-b border-sky-500/30 row-span-1 w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Complex Bento Grid Section */}
      <section className="relative z-10 py-32 px-6 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4">
              Semua Fitur yang Anda Butuhkan.
            </h2>
            <p className="text-zinc-400 text-lg">Didukung dengan teknologi pemrosesan langsung di browser (Client-Side).</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Item 1 */}
            <div className="col-span-1 md:col-span-2 rounded-3xl p-8 bg-zinc-900/40 border border-zinc-800/50 hover:border-zinc-700 transition-colors flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl group-hover:bg-sky-500/20 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center mb-6 border border-sky-500/20 text-sky-400">
                  <LayoutGrid size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Grid & Panorama Fleksibel</h3>
                <p className="text-zinc-400 max-w-md">
                  Potong gambar Anda ke dalam berbagai rasio seperti 3x3 untuk Feed Instagram, atau 3x1 untuk carousel panorama seamless. Semua dapat dikustomisasi hingga piksel terkecil.
                </p>
              </div>
            </div>

            {/* Bento Item 2 */}
            <div className="col-span-1 rounded-3xl p-8 bg-zinc-900/40 border border-zinc-800/50 hover:border-zinc-700 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6 border border-indigo-500/20 text-indigo-400">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Proses Instan</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Tidak ada delay karena upload. Engine kami mengeksekusi pemotongan tepat di dalam memori browser Anda dalam satuan milidetik.
                </p>
              </div>
            </div>

            {/* Bento Item 3 */}
            <div className="col-span-1 rounded-3xl p-8 bg-zinc-900/40 border border-zinc-800/50 hover:border-zinc-700 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20 text-emerald-400">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Privasi Terjamin</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Gambar rahasia atau belum rilis? Tenang saja, file Anda tidak pernah dikirim ke server manapun. 100% Client-side processing.
                </p>
              </div>
            </div>

            {/* Bento Item 4 */}
            <div className="col-span-1 md:col-span-2 rounded-3xl p-8 bg-zinc-900/40 border border-zinc-800/50 hover:border-zinc-700 transition-colors flex flex-col justify-between relative group overflow-hidden">
               <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20 text-purple-400">
                    <SlidersHorizontal size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Built-in Editor & Watermark</h3>
                  <p className="text-zinc-400">
                    Atur kecerahan, kontras, saturasi, atau terapkan preset filter. Lindungi hak cipta karya Anda dengan fitur auto-watermark sebelum mengunduh hasil.
                  </p>
                </div>
                {/* Mini UI abstract */}
                <div className="w-full md:w-48 bg-zinc-950 rounded-xl p-4 border border-zinc-800 flex flex-col gap-3">
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-3/4"></div>
                  </div>
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 w-1/2"></div>
                  </div>
                  <div className="h-8 mt-2 border border-dashed border-zinc-700 rounded-lg flex items-center justify-center text-[10px] text-zinc-500">@watermark</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-gradient-to-b from-black to-zinc-950 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Siap memotong karya Anda?</h2>
        <p className="text-zinc-400 mb-10 max-w-xl mx-auto">Masuk ke workspace sekarang dan rasakan pengalaman mengedit gambar paling lancar yang pernah ada.</p>
        <button 
          onClick={onStart}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-bold text-lg transition-colors shadow-lg shadow-sky-500/20"
        >
          Masuk Workspace <ArrowRight size={20} />
        </button>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/5 bg-zinc-950 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-zinc-500">
            <LayoutGrid size={16} />
            <span className="font-display font-semibold">GridCut Pro</span>
          </div>
          <p className="text-zinc-600 text-sm">
            &copy; {new Date().getFullYear()} GridCut Studio Pro. Open Source on GitHub.
          </p>
        </div>
      </footer>
    </div>
  );
}

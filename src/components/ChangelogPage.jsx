import React from 'react';
import { ArrowLeft, Sun, Moon, Sparkles, Zap, Smartphone, Image as ImageIcon, History } from 'lucide-react';

export default function ChangelogPage({ theme, toggleTheme, onBack }) {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans overflow-hidden">
      {/* Navbar */}
      <header className="h-16 flex items-center justify-between px-6 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shrink-0 z-40">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Workspace</span>
          </button>
          <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700"></div>
          <h1 className="text-lg font-bold tracking-tight font-display flex items-center gap-2">
            <History size={20} className="text-sky-500" />
            <span>Versi & Pembaruan</span>
          </h1>
        </div>
        <div>
          <button 
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 rounded-md text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Ubah Tema (Gelap / Terang)"
          >
            {theme === 'theme-dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-12 scroll-smooth">
        <div className="max-w-4xl mx-auto pb-32">
          
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-sky-400 to-indigo-500 text-white mb-6 shadow-lg shadow-sky-500/20">
              <Sparkles size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
              What's New in v2.0
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              GridCut Studio Pro — Beta Release. Kami telah merombak ulang seluruh mesin dan desain antarmuka untuk pengalaman yang jauh lebih superior.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            
            <div className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 transition-all hover:bg-white dark:hover:bg-zinc-900 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-2xl font-bold font-display text-zinc-900 dark:text-white mb-3">100% Client-Side Engine</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Versi 2.0 ditulis ulang sepenuhnya. Pemotongan gambar (Grid, Panorama, Carousel) kini diproses <strong>langsung di dalam memori browser Anda (RAM)</strong>. Tidak ada antrean server, tidak ada <em>upload delay</em>. Hasil instan dalam hitungan milidetik.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 transition-all hover:bg-white dark:hover:bg-zinc-900 hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
                <Sparkles size={24} />
              </div>
              <h3 className="text-2xl font-bold font-display text-zinc-900 dark:text-white mb-3">AI Smart Vision & Auto-Caption</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Integrasi Edge AI dan opsi Cloud Vision (Google Gemini) untuk membaca konten gambar Anda secara cerdas. AI akan membuatkan <em>Caption Instagram</em> dan deretan <em>Hashtag</em> relevan secara otomatis berdasarkan <em>mood</em> yang Anda pilih!
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 transition-all hover:bg-white dark:hover:bg-zinc-900 hover:shadow-xl hover:shadow-sky-500/5 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-6">
                <Smartphone size={24} />
              </div>
              <h3 className="text-2xl font-bold font-display text-zinc-900 dark:text-white mb-3">PWA & Full Responsiveness</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Anda sekarang bisa meng-<em>install</em> aplikasi ini ke <em>home screen</em> HP atau desktop Anda (PWA). UI/UX telah dirombak total agar sangat mulus dan responsif dioperasikan dari layar ponsel (<em>Mobile-First Workspace</em>).
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 transition-all hover:bg-white dark:hover:bg-zinc-900 hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6">
                <ImageIcon size={24} />
              </div>
              <h3 className="text-2xl font-bold font-display text-zinc-900 dark:text-white mb-3">Watermark Dinamis & Filter Warna</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Amankan karya Anda dengan auto-watermark pintar yang posisinya bisa disesuaikan. Tersedia juga editor kecerahan, kontras, saturasi, dan filter instan untuk <em>finishing</em> sebelum di-<em>posting</em>.
              </p>
            </div>
            
          </div>

          <div className="mt-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 text-white dark:bg-white dark:text-black font-bold rounded-2xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-transform active:scale-95 shadow-xl shadow-zinc-900/20 dark:shadow-white/10"
            >
              Lanjutkan Eksplorasi Workspace
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

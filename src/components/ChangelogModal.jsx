import React from 'react';
import { X, Sparkles, Zap, Shield, Image as ImageIcon, Smartphone } from 'lucide-react';

export default function ChangelogModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 text-white shadow-md">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-white">What's New in v2.0</h2>
              <p className="text-xs text-zinc-500 font-medium mt-0.5">GridCut Studio Pro — Beta Release</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 dark:hover:text-white dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar space-y-8 flex-1">
          
          <div className="flex gap-4">
            <div className="mt-1 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Zap size={16} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">100% Client-Side Engine</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                Versi 2.0 ditulis ulang sepenuhnya. Pemotongan gambar (Grid, Panorama, Carousel) kini diproses <strong>langsung di dalam memori browser Anda (RAM)</strong>. Tidak ada antrean server, tidak ada *upload delay*. Hasil instan dalam hitungan milidetik.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Sparkles size={16} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">AI Smart Vision & Auto-Caption</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                Integrasi Edge AI dan opsi Cloud Vision (Google Gemini) untuk membaca konten gambar Anda secara cerdas. AI akan membuatkan <em>Caption Instagram</em> dan deretan <em>Hashtag</em> relevan secara otomatis berdasarkan *mood* yang Anda pilih!
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <Smartphone size={16} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">PWA & Full Responsiveness</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                Anda sekarang bisa meng-*install* aplikasi ini ke *home screen* HP atau desktop Anda (PWA). UI/UX telah dirombak total agar sangat mulus dan responsif dioperasikan dari layar ponsel (*Mobile-First Workspace*).
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <ImageIcon size={16} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Watermark Dinamis & Filter Warna</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                Amankan karya Anda dengan auto-watermark pintar yang posisinya bisa disesuaikan. Tersedia juga editor kecerahan, kontras, saturasi, dan filter instan untuk *finishing* sebelum di-*posting*.
              </p>
            </div>
          </div>
          
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30 flex justify-end shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-zinc-900 text-white dark:bg-white dark:text-black font-bold rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            Lanjutkan Eksplorasi
          </button>
        </div>
      </div>
    </div>
  );
}

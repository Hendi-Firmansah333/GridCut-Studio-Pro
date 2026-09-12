import React from 'react';
import { Shield, X, Lock, ServerOff, EyeOff } from 'lucide-react';

export default function PrivacyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <Shield className="text-emerald-400" size={20} />
            </div>
            <h2 className="text-xl font-display font-bold text-white">Kebijakan Privasi & Keamanan</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto custom-scrollbar space-y-8">
          
          <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-200 text-sm leading-relaxed">
            <strong className="text-sky-400 block mb-1">TL;DR (Singkatnya):</strong> 
            Gambar Anda 100% aman. Kami tidak pernah melihat, menyalin, atau mengirim gambar Anda ke server mana pun. Semua diproses langsung di HP/Laptop Anda.
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="mt-1"><ServerOff className="text-zinc-500" size={24} /></div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">100% Client-Side Processing</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  Aplikasi GridCut Studio Pro berjalan sepenuhnya di browser Anda. Tidak ada infrastruktur server yang kami gunakan untuk memproses gambar. Saat Anda memilih foto, foto tersebut hanya dimuat ke dalam memori sementara browser (RAM lokal) Anda.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1"><EyeOff className="text-zinc-500" size={24} /></div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Tidak Ada Pelacakan Gambar</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  Kami tidak bisa melihat foto apa yang Anda potong. Kami juga tidak melacak aktivitas pemotongan gambar Anda. File gambar yang dihasilkan langsung diunduh dari memori lokal Anda ke penyimpanan internal perangkat Anda.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1"><Lock className="text-zinc-500" size={24} /></div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Analytics & Cookies</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  Kami mungkin menggunakan analitik pihak ketiga dasar yang sangat anonim (seperti Google Analytics / Vercel Web Analytics) hanya untuk menghitung jumlah pengunjung harian dan kinerja halaman, tanpa melacak identitas spesifik atau mengaitkan data dengan file Anda.
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-zinc-800 text-xs text-zinc-500">
            Terakhir diperbarui: September 2026. Dengan menggunakan aplikasi ini, Anda menyetujui kebijakan pemrosesan lokal kami.
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/30 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors"
          >
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  );
}

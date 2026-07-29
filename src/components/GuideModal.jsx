import React from 'react';
import { HelpCircle, X, ArrowUpRight } from 'lucide-react';

export default function GuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400">
              <HelpCircle size={18} />
            </div>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100">Panduan Rahasia Upload Grid Instagram</h3>
          </div>
          <button 
            className="p-2 -mr-2 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors" 
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar flex flex-col gap-6">
          <div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">Kenapa Urutan Upload Sangat Penting?</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Instagram menampilkan foto terbaru di <strong className="text-zinc-900 dark:text-zinc-200">pojok kiri atas</strong>. 
              Jika Anda mengunggah foto potongan nomor 1 terlebih dahulu, urutan grid Anda di profil akan terbalik total!
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">Aturan Emas: Upload dari Nomor Terbesar (#9 ke #1)</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              GridCut Studio Pro secara otomatis menomori potongan Anda agar sesuai dengan urutan upload yang benar.
            </p>
            
            <div className="grid grid-cols-3 gap-2 p-4 bg-zinc-100 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-center aspect-square rounded-lg bg-sky-100 border border-sky-200 text-sky-700 dark:bg-sky-500/20 dark:border-sky-500/30 dark:text-sky-400 text-xs font-bold text-center p-1 shadow-sm">#1<br/><span className="text-[9px] font-medium opacity-80">(Terakhir)</span></div>
              <div className="flex items-center justify-center aspect-square rounded-lg bg-white border border-zinc-200 text-zinc-500 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 text-xs font-bold shadow-sm">#2</div>
              <div className="flex items-center justify-center aspect-square rounded-lg bg-white border border-zinc-200 text-zinc-500 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 text-xs font-bold shadow-sm">#3</div>
              <div className="flex items-center justify-center aspect-square rounded-lg bg-white border border-zinc-200 text-zinc-500 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 text-xs font-bold shadow-sm">#4</div>
              <div className="flex items-center justify-center aspect-square rounded-lg bg-white border border-zinc-200 text-zinc-500 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 text-xs font-bold shadow-sm">#5</div>
              <div className="flex items-center justify-center aspect-square rounded-lg bg-white border border-zinc-200 text-zinc-500 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 text-xs font-bold shadow-sm">#6</div>
              <div className="flex items-center justify-center aspect-square rounded-lg bg-white border border-zinc-200 text-zinc-500 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 text-xs font-bold shadow-sm">#7</div>
              <div className="flex items-center justify-center aspect-square rounded-lg bg-white border border-zinc-200 text-zinc-500 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 text-xs font-bold shadow-sm">#8</div>
              <div className="flex items-center justify-center aspect-square rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-700 dark:bg-emerald-500/20 dark:border-emerald-500/30 dark:text-emerald-400 text-xs font-bold text-center p-1 shadow-sm">#9<br/><span className="text-[9px] font-medium opacity-80">(Duluan!)</span></div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-3">Langkah Mudah Mengunggah:</h4>
            <ol className="flex flex-col gap-2.5 text-sm text-zinc-600 dark:text-zinc-400 pl-4">
              <li className="list-decimal pl-1">Potong foto Anda menggunakan preset <strong className="text-zinc-900 dark:text-zinc-200">IG Grid 3×3</strong>.</li>
              <li className="list-decimal pl-1">Unduh file ZIP atau simpan satu per satu dari tab Galeri.</li>
              <li className="list-decimal pl-1">Buka Instagram di HP Anda, lalu upload mulai dari foto bernomor <strong className="text-sky-600 dark:text-sky-400">#9</strong> terlebih dahulu.</li>
              <li className="list-decimal pl-1">Lanjutkan upload berturut-turut sampai foto bernomor <strong className="text-sky-600 dark:text-sky-400">#1</strong>.</li>
              <li className="list-decimal pl-1">Lihat profil Instagram Anda — grid besar akan tampil sempurna!</li>
            </ol>
          </div>
        </div>

        <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
          <button 
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-sky-600 dark:hover:bg-sky-500 transition-colors shadow-lg shadow-zinc-900/20 dark:shadow-sky-500/20" 
            onClick={onClose}
          >
            <span>Saya Paham, Siap Potong Gambar!</span>
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

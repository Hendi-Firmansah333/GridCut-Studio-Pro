import React from 'react';
import { DownloadCloud, Scissors, Loader2, Package, Zap, Flame, Sparkles, Gem, CircleDot, Image as ImageIcon, FileImage, MonitorPlay } from 'lucide-react';
import CustomDropdown from '../CustomDropdown';

const upscaleOptions = [
  { value: 'auto1080', label: 'Auto IG HD (Minimal 1080px per Potongan)', icon: Zap, iconColor: '#EAB308' },
  { value: '3x', label: '3x Super HD (300% Piksel — Rekomendasi Utama)', icon: Flame, iconColor: '#EF4444' },
  { value: '2x', label: '2x HD Enhancement (200% Piksel Ganda)', icon: Sparkles, iconColor: '#F59E0B' },
  { value: '4x', label: '4x Ultra HD 4K (400% Super Padat & Tajam)', icon: Gem, iconColor: '#0EA5E9' },
  { value: '1x', label: '1x Asli (Sesuai Ukuran Potongan Asal Tanpa Tambah Piksel)', icon: CircleDot, iconColor: '#94A3B8' }
];

const formatOptions = [
  { value: 'image/png', label: 'PNG (Transparan & Kualitas Resolusi Tertinggi)', icon: ImageIcon, iconColor: '#10B981' },
  { value: 'image/jpeg', label: 'JPG / JPEG (Ukuran File Ringan untuk Cepat Upload)', icon: FileImage, iconColor: '#F59E0B' },
  { value: 'image/webp', label: 'WebP (Format Modern Super Cepat & Jernih)', icon: MonitorPlay, iconColor: '#8B5CF6' }
];

export default function ExportSettings({ options, onChangeOption, hasImage, isProcessing, slicedCount, onCutNow, onDownloadZip }) {
  const { format, quality, upscaleScale = '3x', sharpenEnabled = true, sharpenIntensity = 0.35 } = options;

  return (
    <>
      {/* HD Upscaling & Pixel Enhancement Card */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        <div className="flex flex-col gap-1 px-4 py-3 border-b border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-6 h-6 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <Zap size={14} />
            </div>
            <h2 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Super HD Resolution & Upscaling</h2>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
            Menambah piksel foto hasil potong agar tidak pecah saat diupload ke Instagram & media sosial!
          </p>
        </div>

        <div className="p-4 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Tingkatkan Resolusi Piksel (Upscale Scale)</label>
            <CustomDropdown options={upscaleOptions} value={upscaleScale} onChange={(val) => onChangeOption('upscaleScale', val)} />
          </div>

          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-4">
            <label className="flex items-start gap-2.5 cursor-pointer group">
              <div className="relative flex items-center justify-center w-4 h-4 mt-0.5 flex-shrink-0">
                <input type="checkbox" checked={sharpenEnabled} onChange={(e) => onChangeOption('sharpenEnabled', e.target.checked)} className="peer sr-only" />
                <div className="w-4 h-4 rounded border-2 border-zinc-300 dark:border-zinc-600 peer-checked:border-sky-500 peer-checked:bg-sky-500 transition-colors"></div>
                <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">Aktifkan Filter Pertajam Piksel (Anti-Blur)</span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1">
                  Menggunakan matriks konvolusi AI untuk mempertegas pinggiran gambar agar tidak blur setelah penambahan piksel.
                </span>
              </div>
            </label>

            {sharpenEnabled && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Intensitas Ketajaman</label>
                  <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-700 dark:text-zinc-300">
                    {sharpenIntensity <= 0.2 ? 'Halus' : sharpenIntensity <= 0.45 ? 'Optimal' : 'Ekstra Tajam'} ({Math.round(sharpenIntensity * 100)}%)
                  </span>
                </div>
                <input
                  type="range" min="10" max="80" value={Math.round(sharpenIntensity * 100)}
                  onChange={(e) => onChangeOption('sharpenIntensity', parseInt(e.target.value) / 100)}
                  className="h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-500 w-full"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Export Format & Cut Buttons Card */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="flex items-center justify-center w-6 h-6 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <DownloadCloud size={14} />
          </div>
          <h2 className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">Ekspor & Unduh</h2>
        </div>

        <div className="p-4 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Format Gambar Output</label>
            <CustomDropdown options={formatOptions} value={format} onChange={(val) => onChangeOption('format', val)} />
          </div>

          {format !== 'image/png' && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Kualitas Kompresi</label>
                <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-700 dark:text-zinc-300">{Math.round(quality * 100)}%</span>
              </div>
              <input
                type="range" min="10" max="100" value={Math.round(quality * 100)}
                onChange={(e) => onChangeOption('quality', parseInt(e.target.value) / 100)}
                className="h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-500 w-full"
              />
            </div>
          )}

          <div className="flex flex-col gap-3 mt-2">
            <button
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-sky-600 dark:hover:bg-sky-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              disabled={!hasImage || isProcessing}
              onClick={onCutNow}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Memproses Potongan...</span>
                </>
              ) : (
                <>
                  <Scissors size={18} />
                  <span>Potong & Upscale Gambar Sekarang</span>
                </>
              )}
            </button>

            <button
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              disabled={!hasImage || slicedCount === 0 || isProcessing}
              onClick={onDownloadZip}
            >
              <Package size={18} />
              <span>Download Semua (ZIP HD)</span>
              {slicedCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold ml-1">
                  {slicedCount} Foto
                </span>
              )}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

import React, { useState } from 'react';
import { Shield, ChevronDown, ChevronUp, ArrowDownRight, ArrowDownLeft, ArrowUpRight, ArrowUpLeft, Crosshair, Palette, Type } from 'lucide-react';
import CustomDropdown from '../CustomDropdown';

const positionOptions = [
  { value: 'bottom-right', label: 'Pojok Kanan Bawah (Default)', icon: ArrowDownRight, iconColor: '#0ea5e9' },
  { value: 'bottom-left', label: 'Pojok Kiri Bawah', icon: ArrowDownLeft, iconColor: '#94a3b8' },
  { value: 'top-right', label: 'Pojok Kanan Atas', icon: ArrowUpRight, iconColor: '#94a3b8' },
  { value: 'top-left', label: 'Pojok Kiri Atas', icon: ArrowUpLeft, iconColor: '#94a3b8' },
  { value: 'center', label: 'Posisi Tengah (Center Overlay)', icon: Crosshair, iconColor: '#94a3b8' }
];

const styleOptions = [
  { value: 'pill', label: 'Modern Frosted Pill Box', icon: Palette, iconColor: '#0ea5e9' },
  { value: 'text-only', label: 'Clean Typography Glow', icon: Type, iconColor: '#fbbf24' }
];

export default function WatermarkSettings({ options, onChangeOption }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { watermarkEnabled = false, watermarkText = '@username', watermarkPos = 'bottom-right', watermarkScope = 'last-only', watermarkStyle = 'pill', watermarkOpacity = 0.85 } = options;

  const getSummaryLabel = () => {
    if (!watermarkEnabled || !watermarkText) return 'Status: Nonaktif';
    const posLabel = watermarkPos === 'bottom-right' ? 'Kanan Bawah' :
                     watermarkPos === 'bottom-left' ? 'Kiri Bawah' :
                     watermarkPos === 'top-right' ? 'Kanan Atas' :
                     watermarkPos === 'top-left' ? 'Kiri Atas' : 'Tengah';
    return `Aktif • ${watermarkText} (${posLabel})`;
  };

  return (
    <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
      <div 
        className="flex items-center justify-between gap-2.5 px-4 py-3 border-b border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/50 cursor-pointer select-none"
        onClick={() => setIsExpanded(prev => !prev)}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
            <Shield size={14} />
          </div>
          <h2 className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">Personal Branding & Watermark</h2>
        </div>
        <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors" title={isExpanded ? 'Tutup' : 'Buka'}>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      <div className="px-4 py-3">
        {!isExpanded ? (
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{getSummaryLabel()}</span>
            <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 cursor-pointer underline whitespace-nowrap ml-2" onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }}>Atur Branding</span>
          </div>
        ) : (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Lindungi hak cipta karya atau tambahkan identitas brand / username Instagram Anda secara otomatis ke hasil potongan!
            </p>

            <label className="flex items-center gap-2.5 cursor-pointer group">
              <div className="relative flex items-center justify-center w-4 h-4">
                <input type="checkbox" checked={watermarkEnabled} onChange={(e) => onChangeOption('watermarkEnabled', e.target.checked)} className="peer sr-only" />
                <div className="w-4 h-4 rounded border-2 border-zinc-300 dark:border-zinc-600 peer-checked:border-sky-500 peer-checked:bg-sky-500 transition-colors"></div>
                <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors">Aktifkan Watermark / Handle IG</span>
            </label>

            {watermarkEnabled && (
              <div className="flex flex-col gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Teks Watermark / Username</label>
                  <input
                    type="text" value={watermarkText} onChange={(e) => onChangeOption('watermarkText', e.target.value)}
                    className="w-full text-sm px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-shadow dark:text-zinc-100"
                    placeholder="@studiobrand.id"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Posisi Watermark</label>
                  <CustomDropdown options={positionOptions} value={watermarkPos} onChange={(val) => onChangeOption('watermarkPos', val)} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Cakupan Pemasangan (Scope)</label>
                  <div className="flex p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                    <label className="flex-1 cursor-pointer">
                      <input type="radio" checked={watermarkScope === 'last-only'} onChange={() => onChangeOption('watermarkScope', 'last-only')} className="peer hidden" />
                      <div className="text-center px-2 py-1.5 text-xs font-semibold rounded-md text-zinc-500 peer-checked:bg-white peer-checked:text-zinc-900 peer-checked:shadow-sm dark:text-zinc-400 dark:peer-checked:bg-zinc-900 dark:peer-checked:text-white transition-all">Hanya Potongan #1</div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <input type="radio" checked={watermarkScope === 'all-tiles'} onChange={() => onChangeOption('watermarkScope', 'all-tiles')} className="peer hidden" />
                      <div className="text-center px-2 py-1.5 text-xs font-semibold rounded-md text-zinc-500 peer-checked:bg-white peer-checked:text-zinc-900 peer-checked:shadow-sm dark:text-zinc-400 dark:peer-checked:bg-zinc-900 dark:peer-checked:text-white transition-all">Semua Potongan</div>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Gaya Tampilan (Style)</label>
                  <CustomDropdown options={styleOptions} value={watermarkStyle} onChange={(val) => onChangeOption('watermarkStyle', val)} />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Transparansi (Opacity)</label>
                    <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-700 dark:text-zinc-300">{Math.round(watermarkOpacity * 100)}%</span>
                  </div>
                  <input
                    type="range" min="20" max="100" value={Math.round(watermarkOpacity * 100)}
                    onChange={(e) => onChangeOption('watermarkOpacity', parseInt(e.target.value) / 100)}
                    className="h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-500 w-full"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

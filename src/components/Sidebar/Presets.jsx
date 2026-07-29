import React from 'react';
import { Layers, CheckCircle2 } from 'lucide-react';

export default function Presets({ currentPreset, onSelectPreset }) {
  const presets = [
    { id: 'ig-grid-3x3', title: 'IG Grid (3×3)', subtitle: '9 Foto • Feed Banner Besar', iconClass: 'grid-3x3' },
    { id: 'ig-grid-3x2', title: 'IG Banner (3×2)', subtitle: '6 Foto • Wide Banner', iconClass: 'grid-3x2' },
    { id: 'ig-pano-3x1', title: 'IG Panorama (3×1)', subtitle: '3 Foto • Seamless Row', iconClass: 'grid-3x1' },
    { id: 'carousel-4x1', title: 'Carousel (4×1)', subtitle: '4 Slide • Horizontal Swipe', iconClass: 'grid-carousel' },
    { id: 'stories-1x3', title: 'Stories Sequence', subtitle: '3 Foto • Vertikal 1×3', iconClass: 'grid-vertical' },
    { id: 'custom', title: 'Custom Split', subtitle: 'Atur Baris, Kolom & Ukuran', iconClass: 'grid-custom' }
  ];

  return (
    <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/50">
        <div className="flex items-center justify-center w-6 h-6 rounded bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400">
          <Layers size={14} />
        </div>
        <h2 className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">Preset Cepat (One-Click)</h2>
      </div>

      <div className="p-4 grid grid-cols-2 gap-2">
        {presets.map(p => {
          const isActive = currentPreset === p.id;
          return (
            <div
              key={p.id}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${isActive ? 'bg-sky-50 border-sky-500 dark:bg-sky-500/10 dark:border-sky-500/50' : 'bg-white border-zinc-200 dark:bg-zinc-900/50 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}
              onClick={() => onSelectPreset(p.id)}
            >
              <div className={`preset-icon ${p.iconClass} ${isActive ? 'preset-icon-active' : ''}`}></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <strong className={`block text-[13px] font-semibold truncate ${isActive ? 'text-sky-700 dark:text-sky-400' : 'text-zinc-900 dark:text-zinc-100'}`}>{p.title}</strong>
                  {isActive && (
                    <span className="text-sky-500 flex-shrink-0 ml-1">
                      <CheckCircle2 size={14} />
                    </span>
                  )}
                </div>
                <span className={`block text-[11px] truncate ${isActive ? 'text-sky-600/80 dark:text-sky-400/80' : 'text-zinc-500 dark:text-zinc-400'}`}>{p.subtitle}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

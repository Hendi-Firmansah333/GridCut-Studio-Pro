import React from 'react';
import { Layers, CheckCircle2 } from 'lucide-react';

const GridIcon = ({ type }) => {
  if (type === '3x3') return (
    <div className="grid grid-cols-3 gap-0.5 w-[18px] h-[18px] opacity-80">
      {[...Array(9)].map((_,i) => <div key={i} className="bg-current rounded-[1px]" />)}
    </div>
  );
  if (type === '3x2') return (
    <div className="grid grid-cols-3 gap-0.5 w-[18px] h-3 opacity-80">
      {[...Array(6)].map((_,i) => <div key={i} className="bg-current rounded-[1px]" />)}
    </div>
  );
  if (type === '3x1') return (
    <div className="grid grid-cols-3 gap-0.5 w-[18px] h-1.5 opacity-80">
      {[...Array(3)].map((_,i) => <div key={i} className="bg-current rounded-[1px]" />)}
    </div>
  );
  if (type === '4x1') return (
    <div className="flex gap-0.5 w-[18px] h-2.5 opacity-80">
      {[...Array(4)].map((_,i) => <div key={i} className="bg-current flex-1 rounded-[1px]" />)}
    </div>
  );
  if (type === '1x3') return (
    <div className="grid grid-cols-1 gap-0.5 w-1.5 h-[18px] opacity-80">
      {[...Array(3)].map((_,i) => <div key={i} className="bg-current rounded-[1px]" />)}
    </div>
  );
  return (
    <div className="flex items-center justify-center w-[18px] h-[18px] opacity-80">
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
    </div>
  );
}

export default function Presets({ currentPreset, onSelectPreset }) {
  const presets = [
    { id: 'ig-grid-3x3', title: 'Grid 3×3', subtitle: '9 Foto (Feed)', icon: '3x3' },
    { id: 'ig-grid-3x2', title: 'Banner 3×2', subtitle: '6 Foto (Lebar)', icon: '3x2' },
    { id: 'ig-pano-3x1', title: 'Panorama 3×1', subtitle: '3 Foto (Nyambung)', icon: '3x1' },
    { id: 'carousel-4x1', title: 'Carousel', subtitle: '4 Slide Geser', icon: '4x1' },
    { id: 'stories-1x3', title: 'Stories', subtitle: '3 Foto Vertikal', icon: '1x3' },
    { id: 'custom', title: 'Kustom', subtitle: 'Bebas Atur', icon: 'custom' }
  ];

  return (
    <section className="bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-sm">
      <div className="flex items-center gap-3 px-5 pt-5 pb-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400">
          <Layers size={16} />
        </div>
        <h2 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 font-display tracking-wide">Preset Cepat (One-Click)</h2>
      </div>

      <div className="px-5 pb-5 grid grid-cols-2 gap-2.5">
        {presets.map(p => {
          const isActive = currentPreset === p.id;
          return (
            <div
              key={p.id}
              className={`flex flex-col relative gap-1 p-3.5 rounded-xl border cursor-pointer transition-all hover:shadow-sm ${isActive ? 'bg-sky-50 border-sky-400 dark:bg-sky-500/10 dark:border-sky-500/50 shadow-sm ring-1 ring-sky-500/10' : 'bg-white border-zinc-200/80 dark:bg-zinc-900/50 dark:border-zinc-700/80 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300'}`}
              onClick={() => onSelectPreset(p.id)}
            >
              {isActive && (
                <div className="absolute top-2.5 right-2.5 text-sky-500 dark:text-sky-400">
                  <CheckCircle2 size={16} className="fill-white dark:fill-zinc-900" />
                </div>
              )}
              <div className={`flex items-center justify-center w-8 h-8 rounded-lg mb-1 transition-colors ${isActive ? 'bg-sky-200/50 text-sky-700 dark:bg-sky-500/20 dark:text-sky-400' : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'}`}>
                <GridIcon type={p.icon} />
              </div>
              <div className="flex flex-col">
                <strong className={`block text-[13px] font-bold tracking-tight ${isActive ? 'text-sky-700 dark:text-sky-400' : 'text-zinc-900 dark:text-zinc-100'}`}>{p.title}</strong>
                <span className={`block text-[11px] mt-0.5 font-medium leading-snug ${isActive ? 'text-sky-600/90 dark:text-sky-400/90' : 'text-zinc-500 dark:text-zinc-400'}`}>{p.subtitle}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

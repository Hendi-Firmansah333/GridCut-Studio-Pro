import React from 'react';
import { Grid, HelpCircle, Sun, Moon, Camera, Layers } from 'lucide-react';

export default function Header({ theme, toggleTheme, onOpenGuide, onOpenPhotobooth }) {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shrink-0 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md">
          <Grid size={18} />
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-display">GridCut <span className="text-sky-600 dark:text-sky-400">Pro</span></h1>
          <span className="px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-500/20 text-[10px] font-bold text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-500/30">
            v2.0 Beta
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          title="File Settings"
        >
          <Layers size={14} />
          <span>File</span>
        </button>
        
        <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-1"></div>

        <button 
          onClick={onOpenPhotobooth}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold bg-sky-50 text-sky-600 hover:bg-sky-100 dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 border border-sky-200 dark:border-sky-500/30 transition-colors"
          title="Buka Photobooth Premium"
        >
          <Camera size={14} />
          <span>Photobooth</span>
        </button>

        <button 
          onClick={onOpenGuide}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          title="Panduan Urutan Upload IG"
        >
          <HelpCircle size={14} />
          <span>Panduan</span>
        </button>

        <button 
          onClick={toggleTheme}
          className="flex items-center justify-center w-8 h-8 rounded-md text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          title="Ubah Tema (Gelap / Terang)"
        >
          {theme === 'theme-dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </header>
  );
}

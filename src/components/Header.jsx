import React, { useState, useRef, useEffect } from 'react';
import { Grid, HelpCircle, Sun, Moon, Camera, Layers, Code2, BookOpen, ChevronDown } from 'lucide-react';

export default function Header({ theme, toggleTheme, onOpenGuide, onOpenPhotobooth, onOpenChangelog }) {
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const fileMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (fileMenuRef.current && !fileMenuRef.current.contains(event.target)) {
        setIsFileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shrink-0 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md">
          <Grid size={18} />
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-display">GridCut <span className="text-sky-600 dark:text-sky-400">Pro</span></h1>
          <button 
            onClick={onOpenChangelog}
            className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-500/20 text-[10px] font-bold text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-500/30 hover:bg-sky-200 dark:hover:bg-sky-500/30 transition-colors cursor-pointer"
            title="Lihat Pembaruan v2.0"
          >
            v2.0 Beta
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative" ref={fileMenuRef}>
          <button 
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${isFileMenuOpen ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800'}`}
            title="Menu Utama"
            onClick={() => setIsFileMenuOpen(!isFileMenuOpen)}
          >
            <Layers size={14} />
            <span className="hidden md:inline">Menu</span>
            <ChevronDown size={14} className={`transition-transform ${isFileMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isFileMenuOpen && (
            <div className="absolute right-0 sm:left-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
              <div className="py-1">
                <button 
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  onClick={() => { onOpenChangelog(); setIsFileMenuOpen(false); }}
                >
                  <Grid size={16} className="text-sky-500" />
                  <span>Versi & Pembaruan (v2.0)</span>
                </button>
                <button 
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  onClick={() => { onOpenGuide(); setIsFileMenuOpen(false); }}
                >
                  <HelpCircle size={16} className="text-emerald-500" />
                  <span>Panduan Edukasi</span>
                </button>
                <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-1"></div>
                <a 
                  href="https://github.com/Hendi-Firmansah333/GridCut-Studio-Pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  onClick={() => setIsFileMenuOpen(false)}
                >
                  <Code2 size={16} />
                  <span>Source Code (GitHub)</span>
                </a>
                <a 
                  href="https://github.com/Hendi-Firmansah333/GridCut-Studio-Pro/blob/main/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  onClick={() => setIsFileMenuOpen(false)}
                >
                  <BookOpen size={16} />
                  <span>Dokumentasi API</span>
                </a>
              </div>
            </div>
          )}
        </div>
        
        <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-1"></div>

        <button 
          onClick={onOpenPhotobooth}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold bg-sky-50 text-sky-600 hover:bg-sky-100 dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 border border-sky-200 dark:border-sky-500/30 transition-colors"
          title="Buka Photobooth Premium"
        >
          <Camera size={14} />
          <span className="hidden md:inline">Photobooth</span>
        </button>

        <button 
          onClick={onOpenGuide}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          title="Panduan Urutan Upload IG"
        >
          <HelpCircle size={14} />
          <span className="hidden md:inline">Panduan</span>
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

import React, { useRef, useEffect } from 'react';
import { Eye, EyeOff, Maximize2, UploadCloud } from 'lucide-react';
import { drawPreviewOverlay, calculateTiles } from '../../utils/splitter';

export default function LiveCanvas({ sourceImage, options, showGuides, onToggleGuides, onTriggerUpload }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (sourceImage && canvasRef.current) {
      drawPreviewOverlay(canvasRef.current, sourceImage, options, showGuides);
    }
  }, [sourceImage, options, showGuides]);

  const handleZoomReset = () => {
    if (canvasRef.current) {
      canvasRef.current.style.maxHeight = 'calc(100vh - 230px)';
    }
  };

  const tiles = sourceImage ? calculateTiles(sourceImage.naturalWidth || sourceImage.width, sourceImage.naturalHeight || sourceImage.height, options) : [];
  const sampleTile = tiles[0];

  return (
    <div className="flex flex-col flex-1 h-full animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 py-3 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 gap-3 sm:gap-0">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="font-semibold text-sm text-sky-600 dark:text-sky-400">{tiles.length} Potongan</span>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {sampleTile ? `${sampleTile.width}×${sampleTile.height} px per tile` : 'Menunggu gambar...'}
          </span>
          {options.igOrder && sourceImage && (
            <span className="px-2 py-0.5 ml-2 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400 text-[10px] font-bold tracking-wide uppercase shadow-sm animate-pulse">Mode IG Feed (9→1)</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors border ${showGuides ? 'bg-sky-50 border-sky-200 text-sky-600 hover:bg-sky-100 dark:bg-sky-500/10 dark:border-sky-500/30 dark:text-sky-400 dark:hover:bg-sky-500/20' : 'bg-transparent border-transparent text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'}`}
            onClick={onToggleGuides}
          >
            {showGuides ? <Eye size={14} /> : <EyeOff size={14} />}
            <span>{showGuides ? 'Garis Panduan' : 'Sembunyikan'}</span>
          </button>

          <button
            className="flex items-center justify-center w-8 h-8 rounded-md text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            onClick={handleZoomReset}
            title="Fit Screen"
          >
            <Maximize2 size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-zinc-100/50 dark:bg-black/40 flex items-center justify-center p-4 sm:p-6 lg:p-10 relative">
        {!sourceImage ? (
          <div className="flex flex-col items-center justify-center max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-10 text-center shadow-lg shadow-zinc-200/50 dark:shadow-none animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 rounded-full bg-sky-100 dark:bg-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-6 shadow-inner relative">
              <div className="absolute inset-0 rounded-full border-4 border-sky-200 dark:border-sky-500/30 animate-ping opacity-20"></div>
              <UploadCloud size={32} />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-500">Siap untuk Memotong Gambar</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">
              Langsung drag-and-drop foto Anda di panel upload sebelah kiri atau klik tombol di bawah ini untuk memulai. Tanpa instalasi, pemrosesan super cepat di browser Anda!
            </p>
            <button 
              className="flex items-center justify-center gap-2 w-full max-w-[280px] py-3 px-4 rounded-xl font-bold text-sm text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-sky-600 dark:hover:bg-sky-500 transition-colors shadow-md hover:shadow-lg" 
              onClick={onTriggerUpload}
            >
              <UploadCloud size={18} />
              <span>Upload & Pilih File Gambar</span>
            </button>
          </div>
        ) : (
          <div className="relative max-w-full max-h-full animate-in zoom-in-95 duration-500 shadow-2xl ring-1 ring-zinc-200 dark:ring-zinc-800 rounded bg-zinc-200 dark:bg-zinc-900 w-full flex justify-center">
            <canvas ref={canvasRef} className="block max-w-full rounded object-contain max-h-[50vh] lg:max-h-[calc(100vh-250px)] w-auto" />
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useRef, useState } from 'react';
import { Image as ImageIcon, UploadCloud, Trash2, Sparkles, ImagePlus, Camera } from 'lucide-react';

export default function DropZone({ sourceImage, filename, onImageLoaded, onRemoveImage, onOpenPhotobooth }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      readAndActivate(file, file.name);
    }
  };

  const readAndActivate = (fileOrBlob, name) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        onImageLoaded(img, name);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(fileOrBlob);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      readAndActivate(file, file.name);
    }
  };

  // Sample Images Generator via HTML5 Canvas
  const generateSample = (type) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (type === 'landscape') {
      canvas.width = 3240;
      canvas.height = 1080;

      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(0.3, '#312e81');
      grad.addColorStop(0.7, '#be185d');
      grad.addColorStop(1, '#f97316');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(1620, 580, 260, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(254, 240, 138, 0.9)';
      ctx.fill();

      ctx.fillStyle = '#090d16';
      ctx.beginPath();
      ctx.moveTo(0, 1080);
      ctx.lineTo(0, 800);
      ctx.lineTo(500, 480);
      ctx.lineTo(1100, 820);
      ctx.lineTo(1680, 360);
      ctx.lineTo(2300, 750);
      ctx.lineTo(2850, 420);
      ctx.lineTo(3240, 700);
      ctx.lineTo(3240, 1080);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.font = 'bold 84px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('GRIDCUT PANORAMA / CAROUSEL SAMPLE 3240×1080px', 1620, 180);

    } else if (type === 'portrait') {
      canvas.width = 3240;
      canvas.height = 4050;

      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#042f2e');
      grad.addColorStop(0.5, '#0f766e');
      grad.addColorStop(1, '#111827');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(20, 184, 166, 0.25)';
      ctx.lineWidth = 14;
      for (let r = 300; r <= 1600; r += 280) {
        ctx.beginPath();
        ctx.arc(1620, 2025, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(1620, 2025, 480, 0, Math.PI * 2);
      ctx.strokeStyle = '#5eead4';
      ctx.lineWidth = 32;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 120px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('INSTAGRAM PORTRAIT GRID 4:5', 1620, 1950);
      ctx.font = '600 72px Inter, sans-serif';
      ctx.fillStyle = '#99f6e4';
      ctx.fillText('3240 × 4050 PX (9 SUPER SHARP TILES)', 1620, 2120);

    } else {
      canvas.width = 2160;
      canvas.height = 2160;

      ctx.fillStyle = '#0b0f19';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(0, 242, 254, 0.2)';
      ctx.lineWidth = 6;
      for (let i = 0; i < canvas.width; i += 240) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
      }

      const grad = ctx.createRadialGradient(1080, 1080, 100, 1080, 1080, 1080);
      grad.addColorStop(0, 'rgba(0, 242, 254, 0.45)');
      grad.addColorStop(0.5, 'rgba(79, 172, 254, 0.15)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 110px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('CYBERPUNK STUDIO GRID', 1080, 1040);
      ctx.font = '600 64px Inter, sans-serif';
      ctx.fillStyle = '#00f2fe';
      ctx.fillText('2160 × 2160 PX • PERFECT SQUARE', 1080, 1160);
    }

    const sampleImg = new Image();
    sampleImg.onload = () => {
      onImageLoaded(sampleImg, `sampel-${type}.png`, type);
    };
    sampleImg.src = canvas.toDataURL('image/png');
  };

  return (
    <section className="bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-sm">
      <div className="flex items-center gap-3 px-5 pt-5 pb-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400">
          <ImageIcon size={16} />
        </div>
        <h2 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 font-display tracking-wide">Upload & Pilih Gambar</h2>
      </div>

      <div className="px-5 pb-5">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          hidden 
        />

        {!sourceImage ? (
          <div 
            className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 group ${isDragging ? 'border-sky-500 bg-sky-50 dark:bg-sky-500/10' : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:border-sky-300 dark:hover:border-sky-500/50'}`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-sky-500 dark:group-hover:text-sky-400 mb-3 shadow-sm border border-zinc-100 dark:border-zinc-700 transition-colors">
              <UploadCloud size={18} />
            </div>
            <p className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm mb-1">Drop & Paste foto di sini</p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">PNG, JPG, WebP (Maks 20MB)</p>
            <span className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-bold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors w-full">Pilih Foto Sekarang</span>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/50">
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <img src={sourceImage.src} alt="Active Preview" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate" title={filename}>{filename}</p>
              <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
                {sourceImage.naturalWidth || sourceImage.width} × {sourceImage.naturalHeight || sourceImage.height} px
              </p>
            </div>
            <button 
              className="p-2 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors" 
              onClick={onRemoveImage}
              title="Hapus Gambar"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
          <span className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">Gunakan Gambar Sampel</span>
          <div className="grid grid-cols-3 gap-2">
            <button className="flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-700/80 bg-zinc-50/50 dark:bg-zinc-800/30 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-sm hover:border-zinc-300 dark:hover:border-zinc-600 text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 transition-all" onClick={() => generateSample('landscape')} title="Panorama 3:1 Sunset">
              <Sparkles size={14} className="text-amber-500" />
              <span>Landscape</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-700/80 bg-zinc-50/50 dark:bg-zinc-800/30 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-sm hover:border-zinc-300 dark:hover:border-zinc-600 text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 transition-all" onClick={() => generateSample('portrait')} title="Portrait IG 4:5 Grid">
              <ImagePlus size={14} className="text-emerald-500" />
              <span>IG Portrait</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-700/80 bg-zinc-50/50 dark:bg-zinc-800/30 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-sm hover:border-zinc-300 dark:hover:border-zinc-600 text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 transition-all" onClick={() => generateSample('cyberpunk')} title="Cyberpunk Neon Grid">
              <Sparkles size={14} className="text-sky-500" />
              <span>Neon Grid</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

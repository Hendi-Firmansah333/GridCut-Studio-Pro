import React, { useRef, useState } from 'react';
import { Image as ImageIcon, UploadCloud, Trash2, Sparkles, ImagePlus } from 'lucide-react';

export default function DropZone({ sourceImage, filename, onImageLoaded, onRemoveImage }) {
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
    <section className="control-card glass-card">
      <div className="card-header">
        <ImageIcon size={18} style={{ color: '#00f2fe' }} />
        <h2>Upload & Pilih Gambar</h2>
      </div>

      {!sourceImage ? (
        <div 
          className={`drop-zone glass-drop ${isDragging ? 'dragging' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            hidden 
          />
          <div className="drop-zone-content">
            <div className="drop-icon-wrapper">
              <UploadCloud size={26} />
            </div>
            <p className="drop-title">Drop & Paste foto di sini</p>
            <p className="drop-subtitle">Atau klik untuk pilih dari perangkat (PNG, JPG, WebP)</p>
            <span className="btn btn-sm btn-primary mt-3 shadow-glow">Pilih Foto Sekarang</span>
          </div>
        </div>
      ) : (
        <div className="image-info-card glass-surface">
          <div className="info-preview">
            <img src={sourceImage.src} alt="Active Preview" />
          </div>
          <div className="info-details">
            <p className="font-semibold truncate" title={filename}>{filename}</p>
            <p className="text-xs text-muted">
              {sourceImage.naturalWidth || sourceImage.width} × {sourceImage.naturalHeight || sourceImage.height} px
            </p>
          </div>
          <button 
            className="btn btn-icon-sm btn-danger-ghost" 
            onClick={onRemoveImage}
            title="Hapus Gambar"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}

      <div className="sample-section divider-top">
        <span className="sample-label">Atau coba dengan gambar sampel:</span>
        <div className="sample-grid">
          <button className="sample-btn" onClick={() => generateSample('landscape')} title="Panorama 3:1 Sunset">
            <Sparkles size={13} style={{ color: '#f59e0b' }} />
            <span>Landscape</span>
          </button>
          <button className="sample-btn" onClick={() => generateSample('portrait')} title="Portrait IG 4:5 Grid">
            <ImagePlus size={13} style={{ color: '#10b981' }} />
            <span>IG Portrait</span>
          </button>
          <button className="sample-btn" onClick={() => generateSample('cyberpunk')} title="Cyberpunk Neon Grid">
            <Sparkles size={13} style={{ color: '#00f2fe' }} />
            <span>Neon Grid</span>
          </button>
        </div>
      </div>
    </section>
  );
}

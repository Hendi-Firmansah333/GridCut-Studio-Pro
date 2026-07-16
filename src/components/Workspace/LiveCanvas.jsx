import React, { useRef, useEffect } from 'react';
import { Eye, EyeOff, Maximize2, UploadCloud } from 'lucide-react';
import { drawPreviewOverlay, calculateTiles } from '../../utils/splitter';

export default function LiveCanvas({
  sourceImage,
  options,
  showGuides,
  onToggleGuides,
  onTriggerUpload
}) {
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
    <div className="tab-content active tab-animated-fade">
      <div className="preview-toolbar glass-surface">
        <div className="toolbar-info">
          <span className="font-semibold text-cyan-400">⚡ {tiles.length} Potongan</span>
          <span className="text-muted">•</span>
          <span>
            {sampleTile ? `${sampleTile.width}×${sampleTile.height} px per tile` : 'Menunggu gambar...'}
          </span>
          {options.igOrder && sourceImage && (
            <span className="badge-value ml-2 pop-in-anim">Mode IG Feed (9→1)</span>
          )}
        </div>

        <div className="toolbar-actions">
          <button
            className={`btn btn-sm ${showGuides ? 'btn-outline border-cyan-400 text-cyan-400' : 'btn-ghost'}`}
            onClick={onToggleGuides}
          >
            {showGuides ? <Eye size={16} /> : <EyeOff size={16} />}
            <span>{showGuides ? 'Garis Panduan' : 'Sembunyikan'}</span>
          </button>

          <button
            className="btn btn-sm btn-ghost"
            onClick={handleZoomReset}
            title="Fit Screen"
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      <div className="canvas-viewport glass-surface">
        {!sourceImage ? (
          <div className="preview-empty glass-card shadow-glow floating-empty-card">
            <div className="empty-glow-circle floating-circle-anim">
              <UploadCloud size={40} className="icon-pulse" />
            </div>
            <h3 className="animated-gradient-text">Siap untuk Memotong Gambar</h3>
            <p>
              Langsung drag-and-drop foto Anda di panel upload sebelah kiri atau klik tombol di bawah ini untuk memulai. Tanpa instalasi, pemrosesan super cepat di browser Anda!
            </p>
            <div className="empty-actions mt-4">
              <button className="btn btn-lg btn-primary shadow-glow animated-btn" onClick={onTriggerUpload}>
                <UploadCloud size={20} className="hero-btn-icon" />
                <span>Upload & Pilih File Gambar</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="canvas-wrapper scale-in-anim canvas-glow-frame">
            <canvas ref={canvasRef} className="preview-canvas" />
          </div>
        )}
      </div>
    </div>
  );
}

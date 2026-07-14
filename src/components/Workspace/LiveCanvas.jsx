import React, { useRef, useEffect } from 'react';
import { Eye, EyeOff, Maximize2, Scissors, UploadCloud } from 'lucide-react';
import { drawPreviewOverlay, calculateTiles } from '../../utils/splitter';

export default function LiveCanvas({
  sourceImage,
  options,
  showGuides,
  onToggleGuides,
  onCutNow,
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
    <div className="tab-content active">
      <div className="preview-toolbar">
        <div className="toolbar-info">
          <span>{tiles.length} Potongan</span>
          <span>•</span>
          <span>
            {sampleTile ? `${sampleTile.width}×${sampleTile.height} px per tile` : 'Menunggu gambar...'}
          </span>
          {options.igOrder && sourceImage && (
            <span className="badge-value ml-2">Mode IG Feed (9→1)</span>
          )}
        </div>

        <div className="toolbar-actions">
          <button
            className={`btn btn-sm ${showGuides ? 'btn-outline' : 'btn-ghost'}`}
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

      <div className="canvas-viewport">
        {!sourceImage ? (
          <div className="preview-empty">
            <div className="empty-glow-circle">
              <UploadCloud size={36} />
            </div>
            <h3>Belum Ada Gambar di Workspace</h3>
            <p>
              Silakan pilih/drag-and-drop foto Anda di panel sebelah kiri, atau coba langsung gunakan tombol gambar sampel (*Landscape*, *Portrait IG*, *Neon Grid*).
            </p>
            <div className="empty-actions">
              <button className="btn btn-primary" onClick={onTriggerUpload}>
                <UploadCloud size={18} />
                <span>Pilih File Gambar</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="canvas-wrapper">
            <canvas ref={canvasRef} className="preview-canvas" />
          </div>
        )}
      </div>
    </div>
  );
}

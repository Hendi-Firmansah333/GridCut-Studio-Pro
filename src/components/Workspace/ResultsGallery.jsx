import React from 'react';
import { Download, Copy, Package, Scissors } from 'lucide-react';

export default function ResultsGallery({
  tiles = [],
  options = {},
  onDownloadTile,
  onCopyTile,
  onDownloadZip,
  onSwitchToPreview
}) {
  if (tiles.length === 0) {
    return (
      <div className="tab-content active">
        <div className="canvas-viewport">
          <div className="preview-empty">
            <div className="empty-glow-circle">
              <Scissors size={36} />
            </div>
            <h3>Belum Ada Hasil Potongan</h3>
            <p>
              Klik tombol <strong>"✨ Potong Gambar Sekarang"</strong> di panel sebelah kiri setelah selesai mengatur opsi pemotongan.
            </p>
            <div className="empty-actions">
              <button className="btn btn-outline" onClick={onSwitchToPreview}>
                <span>Kembali ke Live Preview</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content active">
      <div className="gallery-toolbar">
        <div className="toolbar-info">
          <span>Berhasil membagi gambar menjadi <strong>{tiles.length} potongan</strong></span>
          <span>•</span>
          <span>Dimensi {tiles[0]?.width}×{tiles[0]?.height} px per foto</span>
        </div>

        <div className="toolbar-actions">
          <button className="btn btn-sm btn-success" onClick={onDownloadZip}>
            <Package size={16} />
            <span>Download Semua (ZIP)</span>
          </button>
        </div>
      </div>

      <div className="gallery-grid">
        {tiles.map((tile, idx) => {
          const isFirst = tile.igNumber === 1 && options.igOrder;
          const isLast = tile.igNumber === tiles.length && options.igOrder;
          const badgeClass = isFirst ? 'tile-badge-first' : 'tile-badge-seq';
          const badgeLabel = options.igOrder ? `Post #${tile.igNumber}` : `Tile #${tile.seqNumber}`;
          const note = (isLast && tiles.length > 1) ? ' (Post Duluan!)' :
                       isFirst ? ' (Post Terakhir)' : '';

          return (
            <div key={tile.id || idx} className="tile-card">
              <div className="tile-preview">
                <img src={tile.dataUrl} alt={tile.filename} loading="lazy" />
                <span className={badgeClass}>{badgeLabel}{note}</span>
              </div>

              <div className="tile-info">
                <div className="tile-info-top">
                  <span className="tile-name truncate" title={tile.filename}>{tile.filename}</span>
                  <span className="tile-dims">{tile.width} × {tile.height} px</span>
                </div>

                <div className="tile-actions">
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => onDownloadTile(tile)}
                    title="Simpan Foto Ini"
                  >
                    <Download size={14} />
                    <span>Simpan</span>
                  </button>

                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => onCopyTile(tile)}
                    title="Salin ke Clipboard"
                  >
                    <Copy size={14} />
                    <span>Salin</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

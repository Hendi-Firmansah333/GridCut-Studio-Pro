import React from 'react';
import { DownloadCloud, Scissors, Loader2, Package, Sparkles, Zap } from 'lucide-react';

export default function ExportSettings({
  options,
  onChangeOption,
  hasImage,
  isProcessing,
  slicedCount,
  onCutNow,
  onDownloadZip
}) {
  const { format, quality, upscaleScale = '3x', sharpenEnabled = true, sharpenIntensity = 0.35 } = options;

  return (
    <>
      {/* HD Upscaling & Pixel Enhancement Card */}
      <section className="control-card glass-card glass-glow-card">
        <div className="card-header">
          <Zap size={18} style={{ color: '#00f2fe' }} />
          <h2 className="text-gradient">Super HD Resolution & Upscaling</h2>
        </div>
        <p className="text-xs text-muted">
          Menambah piksel foto hasil potong agar tidak pecah saat diupload ke Instagram & media sosial!
        </p>

        <div className="form-group mt-2">
          <label>Tingkatkan Resolusi Piksel (Upscale Scale)</label>
          <select
            value={upscaleScale}
            className="custom-select"
            onChange={(e) => onChangeOption('upscaleScale', e.target.value)}
          >
            <option value="auto1080">⚡ Auto IG HD (Minimal 1080px per Potongan)</option>
            <option value="3x">🔥 3x Super HD (300% Piksel — Rekomendasi Utama)</option>
            <option value="2x">✨ 2x HD Enhancement (200% Piksel Ganda)</option>
            <option value="4x">💎 4x Ultra HD 4K (400% Super Padat & Tajam)</option>
            <option value="1x">⚪ 1x Asli (Sesuai Ukuran Potongan Asal Tanpa Tambah Piksel)</option>
          </select>
        </div>

        <div className="divider-top">
          <label className="custom-checkbox">
            <input
              type="checkbox"
              checked={sharpenEnabled}
              onChange={(e) => onChangeOption('sharpenEnabled', e.target.checked)}
            />
            <span className="checkbox-mark"></span>
            <div className="flex flex-col">
              <span><strong>Aktifkan Filter Pertajam Piksel (Anti-Blur)</strong></span>
              <span className="text-xs text-muted block mt-0.5">
                Menggunakan matriks konvolusi AI untuk mempertegas pinggiran gambar agar tidak blur setelah penambahan piksel.
              </span>
            </div>
          </label>

          {sharpenEnabled && (
            <div className="form-group mt-3">
              <div className="label-row">
                <label>Intensitas Ketajaman (Sharpness Intensity)</label>
                <span className="badge-value">
                  {sharpenIntensity <= 0.2 ? 'Halus' : sharpenIntensity <= 0.45 ? 'Optimal' : 'Ekstra Tajam'} ({Math.round(sharpenIntensity * 100)}%)
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                value={Math.round(sharpenIntensity * 100)}
                className="custom-slider"
                onChange={(e) => onChangeOption('sharpenIntensity', parseInt(e.target.value) / 100)}
              />
            </div>
          )}
        </div>
      </section>

      {/* Export Format & Cut Buttons Card */}
      <section className="control-card glass-card">
        <div className="card-header">
          <DownloadCloud size={18} style={{ color: '#00f2fe' }} />
          <h2>Ekspor & Unduh</h2>
        </div>

        <div className="form-group">
          <label>Format Gambar Output</label>
          <select
            value={format}
            className="custom-select"
            onChange={(e) => onChangeOption('format', e.target.value)}
          >
            <option value="image/png">PNG (Transparan & Kualitas Resolusi Tertinggi)</option>
            <option value="image/jpeg">JPG / JPEG (Ukuran File Ringan untuk Cepat Upload)</option>
            <option value="image/webp">WebP (Format Modern Super Cepat & Jernih)</option>
          </select>
        </div>

        {format !== 'image/png' && (
          <div className="form-group mt-2">
            <div className="label-row">
              <label>Kualitas Kompresi</label>
              <span className="badge-value">{Math.round(quality * 100)}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={Math.round(quality * 100)}
              className="custom-slider"
              onChange={(e) => onChangeOption('quality', parseInt(e.target.value) / 100)}
            />
          </div>
        )}

        <div className="action-buttons-stack">
          <button
            className="btn btn-lg btn-primary btn-action-hero w-full"
            disabled={!hasImage || isProcessing}
            onClick={onCutNow}
          >
            {isProcessing ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Memproses Potongan & Upscale HD...</span>
              </>
            ) : (
              <>
                <Scissors size={20} />
                <span>Potong & Upscale Gambar Sekarang</span>
              </>
            )}
          </button>

          <button
            className="btn btn-lg btn-success btn-action-hero w-full"
            disabled={!hasImage || slicedCount === 0 || isProcessing}
            onClick={onDownloadZip}
          >
            <Package size={20} />
            <span>Download Semua (ZIP HD)</span>
            {slicedCount > 0 && (
              <span className="badge-value ml-1" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                {slicedCount} Foto
              </span>
            )}
          </button>
        </div>
      </section>
    </>
  );
}

import React from 'react';
import { DownloadCloud, Scissors, Loader2, Package, Zap, Flame, Sparkles, Gem, CircleDot, Image as ImageIcon, FileImage, MonitorPlay } from 'lucide-react';
import CustomDropdown from '../CustomDropdown';

const upscaleOptions = [
  { value: 'auto1080', label: 'Auto IG HD (Minimal 1080px per Potongan)', icon: Zap, iconColor: '#EAB308' },
  { value: '3x', label: '3x Super HD (300% Piksel — Rekomendasi Utama)', icon: Flame, iconColor: '#EF4444' },
  { value: '2x', label: '2x HD Enhancement (200% Piksel Ganda)', icon: Sparkles, iconColor: '#F59E0B' },
  { value: '4x', label: '4x Ultra HD 4K (400% Super Padat & Tajam)', icon: Gem, iconColor: '#0EA5E9' },
  { value: '1x', label: '1x Asli (Sesuai Ukuran Potongan Asal Tanpa Tambah Piksel)', icon: CircleDot, iconColor: '#94A3B8' }
];

const formatOptions = [
  { value: 'image/png', label: 'PNG (Transparan & Kualitas Resolusi Tertinggi)', icon: ImageIcon, iconColor: '#10B981' },
  { value: 'image/jpeg', label: 'JPG / JPEG (Ukuran File Ringan untuk Cepat Upload)', icon: FileImage, iconColor: '#F59E0B' },
  { value: 'image/webp', label: 'WebP (Format Modern Super Cepat & Jernih)', icon: MonitorPlay, iconColor: '#8B5CF6' }
];

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
      <section className="control-card glass-card glass-glow-card card-animated" style={{ '--anim-order': 6 }}>
        <div className="card-header">
          <div className="header-icon-pulse">
            <Zap size={18} style={{ color: '#00f2fe' }} />
          </div>
          <h2 className="text-gradient font-bold">Super HD Resolution & Upscaling</h2>
        </div>
        <p className="text-xs text-muted">
          Menambah piksel foto hasil potong agar tidak pecah saat diupload ke Instagram & media sosial!
        </p>

        <div className="form-group mt-2">
          <label>Tingkatkan Resolusi Piksel (Upscale Scale)</label>
          <CustomDropdown 
            options={upscaleOptions}
            value={upscaleScale}
            onChange={(val) => onChangeOption('upscaleScale', val)}
          />
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
            <div className="form-group mt-3 scale-in-anim">
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
      <section className="control-card glass-card card-animated" style={{ '--anim-order': 7 }}>
        <div className="card-header">
          <div className="header-icon-pulse">
            <DownloadCloud size={18} style={{ color: '#00f2fe' }} />
          </div>
          <h2>Ekspor & Unduh</h2>
        </div>

        <div className="form-group">
          <label>Format Gambar Output</label>
          <CustomDropdown 
            options={formatOptions}
            value={format}
            onChange={(val) => onChangeOption('format', val)}
          />
        </div>

        {format !== 'image/png' && (
          <div className="form-group mt-2 scale-in-anim">
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
            className="btn btn-lg btn-primary btn-action-hero w-full animated-hero-btn shadow-glow"
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
                <Scissors size={20} className="hero-btn-icon" />
                <span>Potong & Upscale Gambar Sekarang</span>
              </>
            )}
          </button>

          <button
            className="btn btn-lg btn-success btn-action-hero w-full animated-success-btn"
            disabled={!hasImage || slicedCount === 0 || isProcessing}
            onClick={onDownloadZip}
          >
            <Package size={20} className="hero-btn-icon" />
            <span>Download Semua (ZIP HD)</span>
            {slicedCount > 0 && (
              <span className="badge-value ml-1 pop-in-anim" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                {slicedCount} Foto
              </span>
            )}
          </button>
        </div>
      </section>
    </>
  );
}

import React, { useState } from 'react';
import { Shield, ChevronDown, ChevronUp } from 'lucide-react';

export default function WatermarkSettings({ options, onChangeOption }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    watermarkEnabled = false,
    watermarkText = '@username',
    watermarkPos = 'bottom-right',
    watermarkScope = 'last-only',
    watermarkStyle = 'pill',
    watermarkOpacity = 0.85
  } = options;

  const getSummaryLabel = () => {
    if (!watermarkEnabled || !watermarkText) return 'Status: Nonaktif';
    const posLabel = watermarkPos === 'bottom-right' ? 'Kanan Bawah' :
                     watermarkPos === 'bottom-left' ? 'Kiri Bawah' :
                     watermarkPos === 'top-right' ? 'Kanan Atas' :
                     watermarkPos === 'top-left' ? 'Kiri Atas' : 'Tengah';
    return `Aktif • ${watermarkText} (${posLabel})`;
  };

  return (
    <section className="control-card glass-card card-animated" style={{ '--anim-order': 5 }}>
      <div
        className="card-header cursor-pointer select-none flex items-center justify-between"
        onClick={() => setIsExpanded(prev => !prev)}
      >
        <div className="flex items-center gap-2">
          <div className="header-icon-pulse">
            <Shield size={18} style={{ color: '#00f2fe' }} />
          </div>
          <h2>Personal Branding & Watermark</h2>
        </div>
        <button className="btn btn-sm btn-ghost p-1" title={isExpanded ? 'Tutup' : 'Buka'}>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {!isExpanded ? (
        <div className="text-xs text-muted mt-1 flex items-center justify-between">
          <span>{getSummaryLabel()}</span>
          <span className="text-cyan-400 font-semibold cursor-pointer underline" onClick={() => setIsExpanded(true)}>Atur Branding</span>
        </div>
      ) : (
        <div className="mt-3 scale-in-anim">
          <p className="text-xs text-muted mb-3">
            Lindungi hak cipta karya atau tambahkan identitas brand / username Instagram Anda secara otomatis ke hasil potongan!
          </p>

          <label className="custom-checkbox mb-3">
            <input
              type="checkbox"
              checked={watermarkEnabled}
              onChange={(e) => onChangeOption('watermarkEnabled', e.target.checked)}
            />
            <span className="checkbox-mark"></span>
            <span className="font-bold text-cyan-400">Aktifkan Watermark / Handle IG Overlay</span>
          </label>

          {watermarkEnabled && (
            <div className="form-group mt-3 pt-2 border-t border-slate-700/40">
              <label className="text-xs font-semibold">Teks Watermark / Username</label>
              <input
                type="text"
                value={watermarkText}
                className="custom-input w-full text-sm p-2 rounded-md"
                placeholder="Contoh: @studiobrand.id atau © 2026 Kreator"
                onChange={(e) => onChangeOption('watermarkText', e.target.value)}
              />

              <div className="form-group mt-3">
                <label className="text-xs font-semibold">Posisi Watermark</label>
                <select
                  value={watermarkPos}
                  className="custom-select w-full text-sm"
                  onChange={(e) => onChangeOption('watermarkPos', e.target.value)}
                >
                  <option value="bottom-right">↘️ Pojok Kanan Bawah (Default)</option>
                  <option value="bottom-left">↙️ Pojok Kiri Bawah</option>
                  <option value="top-right">↗️ Pojok Kanan Atas</option>
                  <option value="top-left">↖️ Pojok Kiri Atas</option>
                  <option value="center">⏺️ Posisi Tengah (Center Overlay)</option>
                </select>
              </div>

              <div className="form-group mt-3">
                <label className="text-xs font-semibold">Cakupan Pemasangan (Scope)</label>
                <div className="segmented-control mt-1">
                  <input
                    type="radio"
                    id="wm-last"
                    name="wm-scope"
                    checked={watermarkScope === 'last-only'}
                    onChange={() => onChangeOption('watermarkScope', 'last-only')}
                  />
                  <label htmlFor="wm-last" title="Dipasang pada foto nomor #1 yang dipost terakhir di IG">Hanya Potongan #1</label>

                  <input
                    type="radio"
                    id="wm-all"
                    name="wm-scope"
                    checked={watermarkScope === 'all-tiles'}
                    onChange={() => onChangeOption('watermarkScope', 'all-tiles')}
                  />
                  <label htmlFor="wm-all">Semua Potongan</label>
                </div>
              </div>

              <div className="form-group mt-3">
                <label className="text-xs font-semibold">Gaya Tampilan (Style)</label>
                <select
                  value={watermarkStyle}
                  className="custom-select w-full text-sm"
                  onChange={(e) => onChangeOption('watermarkStyle', e.target.value)}
                >
                  <option value="pill">🏷️ Modern Frosted Pill Box (Kotak Kapsul Transparan)</option>
                  <option value="text-only">✨ Clean Typography Glow (Teks Bersih Bercahaya)</option>
                </select>
              </div>

              <div className="form-group mt-3">
                <div className="label-row">
                  <label className="text-xs font-semibold">Transparansi (Opacity)</label>
                  <span className="badge-value">{Math.round(watermarkOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={Math.round(watermarkOpacity * 100)}
                  className="custom-slider"
                  onChange={(e) => onChangeOption('watermarkOpacity', parseInt(e.target.value) / 100)}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

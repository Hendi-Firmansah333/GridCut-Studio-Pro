import React from 'react';
import { Sliders } from 'lucide-react';

export default function SplitControls({ options, onChangeOption }) {
  const {
    direction,
    cols,
    rows,
    horizMode,
    horizQty,
    horizPx,
    vertMode,
    vertQty,
    vertPx,
    overlapEnabled,
    overlapPx,
    igOrder
  } = options;

  return (
    <section className="control-card glass-card">
      <div className="card-header">
        <Sliders size={18} style={{ color: '#00f2fe' }} />
        <h2>Pengaturan Potong & Grid</h2>
      </div>

      <div className="segmented-control">
        <input
          type="radio"
          id="dir-both"
          name="split-direction"
          checked={direction === 'both'}
          onChange={() => onChangeOption('direction', 'both')}
        />
        <label htmlFor="dir-both">Grid (2D)</label>

        <input
          type="radio"
          id="dir-horiz"
          name="split-direction"
          checked={direction === 'horiz'}
          onChange={() => onChangeOption('direction', 'horiz')}
        />
        <label htmlFor="dir-horiz">Horizontal</label>

        <input
          type="radio"
          id="dir-vert"
          name="split-direction"
          checked={direction === 'vert'}
          onChange={() => onChangeOption('direction', 'vert')}
        />
        <label htmlFor="dir-vert">Vertikal</label>
      </div>

      {/* Grid Settings (Direction: Both) */}
      {direction === 'both' && (
        <div className="form-group">
          <div className="label-row">
            <label>Kolom (Horizontal)</label>
            <span className="badge-value">{cols} Kolom</span>
          </div>
          <div className="input-slider-row">
            <input
              type="range"
              min="1"
              max="10"
              value={cols}
              className="custom-slider"
              onChange={(e) => onChangeOption('cols', parseInt(e.target.value) || 1)}
            />
            <input
              type="number"
              min="1"
              max="20"
              value={cols}
              className="custom-input-num"
              onChange={(e) => onChangeOption('cols', Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>

          <div className="label-row mt-4">
            <label>Baris (Vertikal)</label>
            <span className="badge-value">{rows} Baris</span>
          </div>
          <div className="input-slider-row">
            <input
              type="range"
              min="1"
              max="10"
              value={rows}
              className="custom-slider"
              onChange={(e) => onChangeOption('rows', parseInt(e.target.value) || 1)}
            />
            <input
              type="number"
              min="1"
              max="20"
              value={rows}
              className="custom-input-num"
              onChange={(e) => onChangeOption('rows', Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>
        </div>
      )}

      {/* Horizontal Settings */}
      {direction === 'horiz' && (
        <div className="form-group">
          <div className="radio-inline">
            <label className="custom-radio">
              <input
                type="radio"
                name="horiz-mode"
                checked={horizMode === 'quantity'}
                onChange={() => onChangeOption('horizMode', 'quantity')}
              />
              <span className="radio-mark"></span>
              <span>Bagi menjadi jumlah blok / slide</span>
            </label>
            <label className="custom-radio">
              <input
                type="radio"
                name="horiz-mode"
                checked={horizMode === 'pixels'}
                onChange={() => onChangeOption('horizMode', 'pixels')}
              />
              <span className="radio-mark"></span>
              <span>Bagi berdasarkan lebar piksel (px) pasti</span>
            </label>
          </div>

          {horizMode === 'quantity' ? (
            <div className="form-group mt-2">
              <div className="label-row">
                <label>Jumlah Slide</label>
                <span className="badge-value">{horizQty} Slide</span>
              </div>
              <div className="input-slider-row">
                <input
                  type="range"
                  min="2"
                  max="15"
                  value={horizQty}
                  className="custom-slider"
                  onChange={(e) => onChangeOption('horizQty', parseInt(e.target.value) || 2)}
                />
                <input
                  type="number"
                  min="2"
                  max="50"
                  value={horizQty}
                  className="custom-input-num"
                  onChange={(e) => onChangeOption('horizQty', Math.max(2, parseInt(e.target.value) || 2))}
                />
              </div>
            </div>
          ) : (
            <div className="form-group mt-2">
              <div className="label-row">
                <label>Lebar per Potongan (px)</label>
                <span className="badge-value">{horizPx} px</span>
              </div>
              <div className="input-slider-row">
                <input
                  type="range"
                  min="100"
                  max="4000"
                  step="10"
                  value={horizPx}
                  className="custom-slider"
                  onChange={(e) => onChangeOption('horizPx', parseInt(e.target.value) || 1080)}
                />
                <input
                  type="number"
                  min="10"
                  value={horizPx}
                  className="custom-input-num"
                  style={{ width: '80px' }}
                  onChange={(e) => onChangeOption('horizPx', Math.max(10, parseInt(e.target.value) || 1080))}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Vertical Settings */}
      {direction === 'vert' && (
        <div className="form-group">
          <div className="radio-inline">
            <label className="custom-radio">
              <input
                type="radio"
                name="vert-mode"
                checked={vertMode === 'quantity'}
                onChange={() => onChangeOption('vertMode', 'quantity')}
              />
              <span className="radio-mark"></span>
              <span>Bagi menjadi jumlah baris pasti</span>
            </label>
            <label className="custom-radio">
              <input
                type="radio"
                name="vert-mode"
                checked={vertMode === 'pixels'}
                onChange={() => onChangeOption('vertMode', 'pixels')}
              />
              <span className="radio-mark"></span>
              <span>Bagi berdasarkan tinggi piksel (px) pasti</span>
            </label>
          </div>

          {vertMode === 'quantity' ? (
            <div className="form-group mt-2">
              <div className="label-row">
                <label>Jumlah Baris</label>
                <span className="badge-value">{vertQty} Baris</span>
              </div>
              <div className="input-slider-row">
                <input
                  type="range"
                  min="2"
                  max="15"
                  value={vertQty}
                  className="custom-slider"
                  onChange={(e) => onChangeOption('vertQty', parseInt(e.target.value) || 2)}
                />
                <input
                  type="number"
                  min="2"
                  max="50"
                  value={vertQty}
                  className="custom-input-num"
                  onChange={(e) => onChangeOption('vertQty', Math.max(2, parseInt(e.target.value) || 2))}
                />
              </div>
            </div>
          ) : (
            <div className="form-group mt-2">
              <div className="label-row">
                <label>Tinggi per Potongan (px)</label>
                <span className="badge-value">{vertPx} px</span>
              </div>
              <div className="input-slider-row">
                <input
                  type="range"
                  min="100"
                  max="4000"
                  step="10"
                  value={vertPx}
                  className="custom-slider"
                  onChange={(e) => onChangeOption('vertPx', parseInt(e.target.value) || 1350)}
                />
                <input
                  type="number"
                  min="10"
                  value={vertPx}
                  className="custom-input-num"
                  style={{ width: '80px' }}
                  onChange={(e) => onChangeOption('vertPx', Math.max(10, parseInt(e.target.value) || 1350))}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Overlapping Pixels Option */}
      <div className="divider-top">
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={overlapEnabled}
            onChange={(e) => onChangeOption('overlapEnabled', e.target.checked)}
          />
          <span className="checkbox-mark"></span>
          <span><strong>Aktifkan Overlapping (Tumpang Tindih)</strong></span>
        </label>

        {overlapEnabled && (
          <div className="form-group mt-2">
            <div className="label-row">
              <label>Pixel Overlap</label>
              <span className="badge-value">{overlapPx} px</span>
            </div>
            <div className="input-slider-row">
              <input
                type="range"
                min="1"
                max="100"
                value={overlapPx}
                className="custom-slider"
                onChange={(e) => onChangeOption('overlapPx', parseInt(e.target.value) || 0)}
              />
              <input
                type="number"
                min="0"
                max="500"
                value={overlapPx}
                className="custom-input-num"
                onChange={(e) => onChangeOption('overlapPx', Math.max(0, parseInt(e.target.value) || 0))}
              />
            </div>
          </div>
        )}
      </div>

      {/* IG Upload Order Toggle */}
      <div className="divider-top highlight-ig">
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={igOrder}
            onChange={(e) => onChangeOption('igOrder', e.target.checked)}
          />
          <span className="checkbox-mark"></span>
          <div className="flex flex-col">
            <span className="text-gradient font-bold">Urutan Upload IG Feed (Reverse 9→1)</span>
            <span className="text-xs text-muted block mt-1">
              Memberi nomor terbalik otomatis dari kanan bawah ke kiri atas agar saat diposting di Instagram urutannya pas (#1 terakhir)!
            </span>
          </div>
        </label>
      </div>
    </section>
  );
}

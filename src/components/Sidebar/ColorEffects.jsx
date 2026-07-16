import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

export default function ColorEffects({ options, onChangeOption }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    filterPreset = 'normal',
    brightness = 0,
    contrast = 0,
    saturation = 0
  } = options;

  const presets = [
    { id: 'normal', name: '✨ Normal / Asli', desc: 'Tanpa Filter Warna' },
    { id: 'cinematic', name: '🔥 Cinematic Teal & Orange', desc: 'Kontras & Tone Film Populer' },
    { id: 'aesthetic', name: '🌸 Aesthetic Pastel', desc: 'Tone Lembut & Shadow Terang' },
    { id: 'cyberpunk', name: '⚡ Cyberpunk Neon', desc: 'Saturasi Tinggi & Neon Glow' },
    { id: 'monochrome', name: '🌑 Monochrome B&W', desc: 'Hitam Putih Dramatis Tajam' },
    { id: 'golden', name: '☀️ Warm Golden Hour', desc: 'Hangatnya Cahaya Matahari Sore' }
  ];

  const handleReset = () => {
    onChangeOption('filterPreset', 'normal');
    onChangeOption('brightness', 0);
    onChangeOption('contrast', 0);
    onChangeOption('saturation', 0);
  };

  const getSummaryLabel = () => {
    const pName = presets.find(p => p.id === filterPreset)?.name || 'Normal';
    if (filterPreset === 'normal' && brightness === 0 && contrast === 0 && saturation === 0) {
      return 'Normal / Tanpa Filter';
    }
    return `${pName.split(' ')[1] || pName} • ${brightness !== 0 ? `B:${brightness}% ` : ''}${contrast !== 0 ? `C:${contrast}% ` : ''}${saturation !== 0 ? `S:${saturation}%` : ''}`.trim();
  };

  return (
    <section className="control-card glass-card card-animated" style={{ '--anim-order': 4 }}>
      <div
        className="card-header cursor-pointer select-none flex items-center justify-between"
        onClick={() => setIsExpanded(prev => !prev)}
      >
        <div className="flex items-center gap-2">
          <div className="header-icon-pulse">
            <Sparkles size={18} style={{ color: '#00f2fe' }} />
          </div>
          <h2>AI Filter & Color Grading</h2>
        </div>
        <button className="btn btn-sm btn-ghost p-1" title={isExpanded ? 'Tutup' : 'Buka'}>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {!isExpanded ? (
        <div className="text-xs text-muted mt-1 flex items-center justify-between">
          <span>{getSummaryLabel()}</span>
          <span className="text-cyan-400 font-semibold cursor-pointer underline" onClick={() => setIsExpanded(true)}>Atur Warna</span>
        </div>
      ) : (
        <div className="mt-3 scale-in-anim">
          <p className="text-xs text-muted mb-3">
            Pilih preset warna bergaya studio atau sesuaikan slider untuk memberikan *tone grading* profesional sebelum foto dipotong!
          </p>

          {/* Presets Grid */}
          <div className="color-preset-grid">
            {presets.map(p => (
              <div
                key={p.id}
                className={`preset-card glass-surface animated-preset-item p-2 rounded-md ${filterPreset === p.id ? 'active preset-active-glow' : ''}`}
                onClick={() => onChangeOption('filterPreset', p.id)}
              >
                <div className="text-xs font-bold text-gradient">{p.name}</div>
                <div className="text-muted" style={{ fontSize: '10px' }}>{p.desc}</div>
              </div>
            ))}
          </div>

          {/* Color Sliders */}
          <div className="divider-top mt-3 pt-3">
            <div className="form-group mb-3">
              <div className="label-row">
                <label className="text-xs font-medium">Kecerahan (Brightness)</label>
                <span className="badge-value">{brightness > 0 ? `+${brightness}%` : `${brightness}%`}</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={brightness}
                className="custom-slider"
                onChange={(e) => onChangeOption('brightness', parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="form-group mb-3">
              <div className="label-row">
                <label className="text-xs font-medium">Kontras (Contrast)</label>
                <span className="badge-value">{contrast > 0 ? `+${contrast}%` : `${contrast}%`}</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={contrast}
                className="custom-slider"
                onChange={(e) => onChangeOption('contrast', parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="form-group mb-3">
              <div className="label-row">
                <label className="text-xs font-medium">Saturasi (Saturation)</label>
                <span className="badge-value">{saturation > 0 ? `+${saturation}%` : `${saturation}%`}</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={saturation}
                className="custom-slider"
                onChange={(e) => onChangeOption('saturation', parseInt(e.target.value) || 0)}
              />
            </div>

            <button
              className="btn btn-sm btn-outline w-full mt-2 flex items-center justify-center gap-2 hover-scale-btn"
              onClick={handleReset}
            >
              <RotateCcw size={14} />
              <span>Reset Semua Filter & Warna</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

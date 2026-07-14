import React from 'react';
import { Layers } from 'lucide-react';

export default function Presets({ currentPreset, onSelectPreset }) {
  const presets = [
    { id: 'ig-grid-3x3', title: 'IG Grid (3×3)', subtitle: '9 Foto • Feed Banner Besar', iconClass: 'grid-3x3' },
    { id: 'ig-grid-3x2', title: 'IG Banner (3×2)', subtitle: '6 Foto • Wide Banner', iconClass: 'grid-3x2' },
    { id: 'ig-pano-3x1', title: 'IG Panorama (3×1)', subtitle: '3 Foto • Seamless Row', iconClass: 'grid-3x1' },
    { id: 'carousel-4x1', title: 'Carousel (4×1)', subtitle: '4 Slide • Horizontal Swipe', iconClass: 'grid-carousel' },
    { id: 'stories-1x3', title: 'Stories Sequence', subtitle: '3 Foto • Vertikal 1×3', iconClass: 'grid-vertical' },
    { id: 'custom', title: 'Custom Split', subtitle: 'Atur Baris, Kolom & Ukuran', iconClass: 'grid-custom' }
  ];

  return (
    <section className="control-card">
      <div className="card-header">
        <Layers size={18} style={{ color: '#00f2fe' }} />
        <h2>2. Preset Cepat (One-Click)</h2>
      </div>

      <div className="preset-grid">
        {presets.map(p => (
          <div
            key={p.id}
            className={`preset-card ${currentPreset === p.id ? 'active' : ''}`}
            onClick={() => onSelectPreset(p.id)}
          >
            <div className={`preset-icon ${p.iconClass}`}></div>
            <div className="preset-text">
              <strong>{p.title}</strong>
              <span>{p.subtitle}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

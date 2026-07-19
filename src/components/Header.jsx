import React from 'react';
import { Grid, HelpCircle, Sun, Moon, Camera } from 'lucide-react';

export default function Header({ theme, toggleTheme, onOpenGuide, onOpenPhotobooth }) {
  return (
    <header className="studio-header glass-surface shadow-md">
      <div className="header-brand">
        <div className="brand-logo">
          <Grid size={24} />
        </div>
        <div className="brand-info">
          <h1>GridCut <span>Studio Pro</span></h1>
          <p>Modern Instagram Feed Slicer & Panorama Maker</p>
        </div>
      </div>

      <div className="header-actions">
        <button 
          className="btn btn-sm"
          onClick={onOpenPhotobooth}
          style={{ 
            background: 'linear-gradient(135deg, var(--accent-cyan), #3b82f6)', 
            color: 'white', 
            border: 'none', 
            boxShadow: '0 4px 15px rgba(0,242,254,0.3)', 
            marginRight: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
          title="Buka Photobooth Premium"
        >
          <Camera size={16} />
          <span style={{ fontWeight: 600 }}>Photobooth</span>
        </button>

        <button 
          className="btn btn-sm btn-outline"
          onClick={onOpenGuide}
          title="Panduan Urutan Upload IG"
        >
          <HelpCircle size={16} />
          <span>Panduan IG Feed</span>
        </button>

        <button 
          className="btn btn-icon btn-ghost" 
          onClick={toggleTheme}
          title="Ubah Tema (Gelap / Terang)"
        >
          {theme === 'theme-dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}

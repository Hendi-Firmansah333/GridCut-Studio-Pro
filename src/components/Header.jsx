import React from 'react';
import { Grid, HelpCircle, Sun, Moon, Camera, Settings, Layers } from 'lucide-react';

export default function Header({ theme, toggleTheme, onOpenGuide, onOpenPhotobooth }) {
  return (
    <header className="studio-header glass-surface shadow-sm" style={{ padding: '0.6rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="header-brand" style={{ gap: '0.6rem' }}>
        <div className="brand-logo" style={{ width: 32, height: 32, borderRadius: 8 }}>
          <Grid size={18} />
        </div>
        <div className="brand-info" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <h1 style={{ fontSize: '1.05rem', margin: 0 }}>GridCut <span style={{ fontWeight: 800 }}>Pro</span></h1>
          <div style={{ padding: '0.15rem 0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: 12, fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            v2.0 Beta
          </div>
        </div>
      </div>

      <div className="header-actions" style={{ gap: '0.5rem' }}>
        <button 
          className="btn btn-sm btn-ghost"
          style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem', color: 'var(--text-secondary)' }}
          title="File Settings"
        >
          <Layers size={14} style={{ marginRight: '4px' }}/>
          <span>File</span>
        </button>
        
        <div style={{ width: '1px', height: '16px', background: 'var(--border-color)', margin: '0 4px' }}></div>

        <button 
          className="btn btn-sm"
          onClick={onOpenPhotobooth}
          style={{ 
            background: 'linear-gradient(135deg, rgba(0,242,254,0.15), rgba(59,130,246,0.15))', 
            color: 'var(--accent-cyan)', 
            border: '1px solid rgba(0,242,254,0.3)', 
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '0.3rem 0.75rem',
            fontSize: '0.8rem'
          }}
          title="Buka Photobooth Premium"
        >
          <Camera size={14} />
          <span style={{ fontWeight: 600 }}>Photobooth</span>
        </button>

        <button 
          className="btn btn-sm btn-ghost"
          onClick={onOpenGuide}
          title="Panduan Urutan Upload IG"
          style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
        >
          <HelpCircle size={14} style={{ marginRight: '4px' }} />
          <span>Panduan</span>
        </button>

        <button 
          className="btn btn-icon-sm btn-ghost" 
          onClick={toggleTheme}
          title="Ubah Tema (Gelap / Terang)"
          style={{ width: 28, height: 28 }}
        >
          {theme === 'theme-dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </header>
  );
}

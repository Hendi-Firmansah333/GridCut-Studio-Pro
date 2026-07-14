import React from 'react';
import { Grid, HelpCircle, Sun, Moon } from 'lucide-react';

export default function Header({ theme, toggleTheme, onOpenGuide }) {
  return (
    <header className="studio-header">
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

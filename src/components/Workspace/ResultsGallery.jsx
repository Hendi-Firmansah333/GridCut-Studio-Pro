import React, { useState } from 'react';
import { Download, Copy, Package, Scissors, Sparkles, Smartphone, Check } from 'lucide-react';

export default function ResultsGallery({
  tiles = [],
  options = {},
  onDownloadTile,
  onCopyTile,
  onDownloadZip,
  onDownloadMockup,
  onSwitchToPreview
}) {
  const [captionMood, setCaptionMood] = useState('aesthetic');
  const [copiedCaption, setCopiedCaption] = useState(false);

  if (tiles.length === 0) {
    return (
      <div className="tab-content active tab-animated-fade">
        <div className="canvas-viewport glass-surface">
          <div className="preview-empty glass-card floating-empty-card shadow-glow">
            <div className="empty-glow-circle floating-circle-anim">
              <Scissors size={38} className="icon-pulse text-cyan-400" />
            </div>
            <h3 className="animated-gradient-text">Belum Ada Hasil Potongan</h3>
            <p>
              Pilih foto terlebih dahulu lalu klik tombol <strong className="text-cyan-400">"Potong & Upscale Gambar Sekarang"</strong> di panel sebelah kiri.
            </p>
            <div className="empty-actions mt-3">
              <button className="btn btn-outline animated-btn" onClick={onSwitchToPreview}>
                <span>Kembali ke Live Preview</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getGeneratedCaption = () => {
    const handle = options.watermarkEnabled && options.watermarkText ? ` by ${options.watermarkText}` : '';
    const num = tiles.length;
    if (captionMood === 'aesthetic') {
      return `✨ Seamless Grid Aesthetic Vibe${handle}\n\nSlide through the pieces of this ${num}-tile visual moment. Engineered for crisp Super HD viewing across our Instagram profile feed.\n.\n.\n.\n#gridcutstudiopro #instagramgrid #seamlesscarousel #aestheticfeed #photooftheday #creativelayout #visualart #highres #gridfeed #instadaily`;
    } else if (captionMood === 'brand') {
      return `🚀 Professional Brand Showcase${handle}\n\nPresenting our latest visual series in ${num} high-definition parts. Swipe through or visit our main profile feed to experience the complete seamless layout.\n.\n.\n.\n#brandidentity #visualmarketing #iggrid #seamlessfeed #creativeagency #digitalbranding #gridcutstudiopro #contentcreator #socialmediadesign`;
    } else if (captionMood === 'hype') {
      return `🔥 ABSOLUTE BANGER CAROUSEL 🔥${handle}\n\nDon't miss a single slide! Every piece of this ${num}-photo grid hits different in Super HD. Check our main feed to see the full bigger picture come to life!\n.\n.\n.\n#viralgrid #hypebeast #igcarousel #trendingnow #gridcutpro #superhd #visualcontent #aestheticposts #instadaily`;
    } else {
      return `Bigger picture. Better quality.${handle} ⚡\n\n${num} parts • Super HD Upscaled.\n\n#grid #minimal #aesthetic #gridcut #igfeed #hdr #photography`;
    }
  };

  const handleCopyCaption = async () => {
    const text = getGeneratedCaption();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCaption(true);
      setTimeout(() => setCopiedCaption(false), 2500);
    } catch (err) {
      console.error('Failed copying caption:', err);
    }
  };

  return (
    <div className="tab-content active tab-animated-fade">
      {/* Gallery Toolbar with Mockup Button */}
      <div className="gallery-toolbar glass-surface flex-wrap gap-3">
        <div className="toolbar-info">
          <span>Berhasil membagi gambar menjadi <strong className="text-cyan-400">{tiles.length} potongan HD</strong></span>
          <span className="text-muted">•</span>
          <span>Dimensi <strong className="text-cyan-400">{tiles[0]?.width}×{tiles[0]?.height} px</strong> per foto</span>
        </div>

        <div className="toolbar-actions flex-wrap gap-2">
          <button
            className="btn btn-sm btn-outline flex items-center gap-1.5 hover-scale-btn border-cyan-400 text-cyan-400"
            onClick={onDownloadMockup}
            title="Download 1 gambar summary sheet berisi preview tampilan grid feed di profil Instagram Anda"
          >
            <Smartphone size={16} />
            <span>Mockup Feed IG (Summary PNG)</span>
          </button>

          <button className="btn btn-sm btn-success animated-success-btn shadow-glow flex items-center gap-1.5" onClick={onDownloadZip}>
            <Package size={16} />
            <span>Download Semua ({tiles.length} Foto ZIP)</span>
          </button>
        </div>
      </div>

      {/* Killer Feature: AI Social Caption & Hashtag Generator Studio */}
      <div className="glass-card p-4 rounded-lg mb-4 mt-2 border border-cyan-500/30 card-animated" style={{ '--anim-order': 1 }}>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="header-icon-pulse">
              <Sparkles size={18} className="text-cyan-400" />
            </div>
            <h4 className="font-bold text-gradient text-sm m-0">✨ AI Social Caption & Hashtag Generator untuk IG Feed</h4>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-muted">Vibe Caption:</span>
            {[
              { id: 'aesthetic', label: '🌸 Aesthetic' },
              { id: 'brand', label: '💼 Profesional / Brand' },
              { id: 'hype', label: '🔥 Hype / Viral' },
              { id: 'minimal', label: '⚡ Singkat & Padat' }
            ].map(m => (
              <button
                key={m.id}
                className={`btn btn-xs ${captionMood === m.id ? 'btn-primary shadow-glow font-bold' : 'btn-ghost border border-slate-600/40'}`}
                onClick={() => setCaptionMood(m.id)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <textarea
            readOnly
            value={getGeneratedCaption()}
            rows={4}
            className="custom-input w-full text-xs p-3 rounded-md font-mono text-slate-200 bg-slate-900/60 border border-slate-700/60 leading-relaxed resize-none focus:outline-none"
          />
          <button
            className={`btn btn-sm absolute right-2 bottom-2 flex items-center gap-1.5 ${copiedCaption ? 'btn-success' : 'btn-primary animated-btn'}`}
            onClick={handleCopyCaption}
          >
            {copiedCaption ? <Check size={14} /> : <Copy size={14} />}
            <span>{copiedCaption ? 'Tersalin!' : 'Salin Caption & Hashtags'}</span>
          </button>
        </div>
      </div>

      {/* Grid of Sliced Tiles */}
      <div className="gallery-grid">
        {tiles.map((tile, idx) => {
          const isFirst = tile.igNumber === 1 && options.igOrder;
          const isLast = tile.igNumber === tiles.length && options.igOrder;
          const badgeClass = isFirst ? 'tile-badge-first pop-in-anim' : 'tile-badge-seq';
          const badgeLabel = options.igOrder ? `Post #${tile.igNumber}` : `Tile #${tile.seqNumber}`;
          const note = (isLast && tiles.length > 1) ? ' (Post Duluan!)' :
                       isFirst ? ' (Post Terakhir)' : '';

          return (
            <div key={tile.id || idx} className="tile-card glass-card tile-animated-entry hover-lift-3d" style={{ '--anim-order': Math.min(idx + 2, 12) }}>
              <div className="tile-preview">
                <img src={tile.dataUrl} alt={tile.filename} loading="lazy" />
                <span className={badgeClass}>{badgeLabel}{note}</span>
              </div>

              <div className="tile-info">
                <div className="tile-info-top">
                  <span className="tile-name truncate" title={tile.filename}>{tile.filename}</span>
                  <span className="tile-dims text-cyan-400 font-medium">⚡ {tile.width} × {tile.height} px</span>
                </div>

                <div className="tile-actions mt-2">
                  <button
                    className="btn btn-sm btn-outline flex-1 hover-scale-btn"
                    onClick={() => onDownloadTile(tile)}
                    title="Simpan Foto Ini"
                  >
                    <Download size={14} />
                    <span>Simpan</span>
                  </button>

                  <button
                    className="btn btn-sm btn-primary flex-1 animated-btn shadow-glow"
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

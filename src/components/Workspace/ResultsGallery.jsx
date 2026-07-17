import React, { useState, useEffect } from 'react';
import {
  Download, Copy, Package, Scissors, Sparkles, Smartphone, Check,
  Bot, Scan, Eye, Tag, Hash, RefreshCw, Sliders, Globe, Wand2,
  Image as ImageIcon, FileText, Key, ChevronDown, ChevronUp,
  Award, Zap, Plus, X, MessageSquare, Flame, Briefcase, Feather,
  Loader2, AlertCircle
} from 'lucide-react';
import { analyzeImageContent, generateSmartCaption, generateWithGeminiVision } from '../../utils/aiVisionEngine';

export default function ResultsGallery({
  tiles = [],
  sourceImage = null,
  filename = '',
  options = {},
  onDownloadTile,
  onCopyTile,
  onDownloadZip,
  onDownloadMockup,
  onSwitchToPreview
}) {
  const [captionMood, setCaptionMood] = useState('aesthetic');
  const [captionLang, setCaptionLang] = useState('id'); // 'id' | 'en'
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedTags, setCopiedTags] = useState(false);
  
  // AI Vision & Smart Caption state
  const [visionInfo, setVisionInfo] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTagInput, setNewTagInput] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  
  // Custom generated / override text
  const [customGeneratedText, setCustomGeneratedText] = useState(null);
  
  // Pro AI API Key accordion
  const [showProConfig, setShowProConfig] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState(() => localStorage.getItem('gridcut_gemini_key') || '');
  const [isGeneratingGemini, setIsGeneratingGemini] = useState(false);
  const [geminiError, setGeminiError] = useState(null);

  // Trigger AI Vision analysis when tiles / image / filename change
  useEffect(() => {
    runVisionAnalysis();
  }, [tiles, sourceImage, filename]);

  const runVisionAnalysis = async () => {
    if (tiles.length === 0 && !sourceImage) return;
    setIsAnalyzing(true);
    try {
      const info = await analyzeImageContent(sourceImage, tiles, filename);
      setVisionInfo(info);
      if (info?.tags && info.tags.length > 0) {
        setSelectedTags(info.tags);
      }
      setCustomGeneratedText(null); // Reset manual/API override when new image is cut
    } catch (err) {
      console.error('Vision analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

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

  const currentCaptionText = customGeneratedText || generateSmartCaption({
    visionInfo,
    mood: captionMood,
    language: captionLang,
    tilesCount: tiles.length,
    watermarkText: options.watermarkText,
    watermarkEnabled: options.watermarkEnabled,
    customPrompt,
    selectedTags
  });

  const handleGenerateSmartCaption = async () => {
    if (geminiApiKey.trim() !== '') {
      setIsGeneratingGemini(true);
      setGeminiError(null);
      try {
        const aiText = await generateWithGeminiVision({
          apiKey: geminiApiKey.trim(),
          imageBase64: tiles[0]?.dataUrl || '',
          mood: captionMood,
          language: captionLang,
          customPrompt,
          tilesCount: tiles.length,
          filename
        });
        setCustomGeneratedText(aiText);
      } catch (err) {
        setGeminiError(err.message);
        setCustomGeneratedText(null);
      } finally {
        setIsGeneratingGemini(false);
      }
    } else {
      setCustomGeneratedText(null);
      await runVisionAnalysis();
    }
  };

  const handleCopyCaption = async () => {
    try {
      await navigator.clipboard.writeText(currentCaptionText);
      setCopiedCaption(true);
      setTimeout(() => setCopiedCaption(false), 2500);
    } catch (err) {
      console.error('Failed copying caption:', err);
    }
  };

  const handleCopyTagsOnly = async () => {
    const text = selectedTags.join(' ');
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTags(true);
      setTimeout(() => setCopiedTags(false), 2500);
    } catch (err) {
      console.error('Failed copying tags:', err);
    }
  };

  const handleToggleTag = (tagToToggle) => {
    setCustomGeneratedText(null);
    setSelectedTags(prev => 
      prev.includes(tagToToggle) 
        ? prev.filter(t => t !== tagToToggle) 
        : [...prev, tagToToggle]
    );
  };

  const handleAddTagSubmit = (e) => {
    e.preventDefault();
    if (!newTagInput.trim()) return;
    let formatted = newTagInput.trim();
    if (!formatted.startsWith('#')) {
      formatted = '#' + formatted;
    }
    if (!selectedTags.includes(formatted)) {
      setSelectedTags(prev => [...prev, formatted]);
      setCustomGeneratedText(null);
    }
    setNewTagInput('');
    setShowTagInput(false);
  };

  const handleSaveGeminiKey = (key) => {
    setGeminiApiKey(key);
    localStorage.setItem('gridcut_gemini_key', key);
  };

  const vibeOptions = [
    { id: 'aesthetic', label: '🌸 Aesthetic', icon: Feather },
    { id: 'brand', label: '💼 Profesional / Brand', icon: Briefcase },
    { id: 'hype', label: '🔥 Hype / Viral', icon: Flame },
    { id: 'story', label: '📖 Storytelling', icon: MessageSquare },
    { id: 'minimal', label: '⚡ Singkat & Padat', icon: Wand2 }
  ];

  return (
    <div className="tab-content active tab-animated-fade">
      {/* Gallery Toolbar with Mockup & ZIP Download Buttons */}
      <div className="gallery-toolbar glass-surface flex-wrap gap-3">
        <div className="toolbar-info">
          <span>Berhasil membagi gambar menjadi <strong style={{ color: 'var(--accent-cyan)' }}>{tiles.length} potongan HD</strong></span>
          <span style={{ opacity: 0.5 }}>•</span>
          <span>Dimensi <strong style={{ color: 'var(--accent-cyan)' }}>{tiles[0]?.width}×{tiles[0]?.height} px</strong> per foto</span>
        </div>

        <div className="toolbar-actions flex-wrap gap-2">
          <button
            className="btn btn-sm btn-outline flex items-center gap-2 hover-scale-btn"
            style={{ borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}
            onClick={onDownloadMockup}
            title="Download 1 gambar summary sheet berisi preview tampilan grid feed di profil Instagram Anda"
          >
            <Smartphone size={16} />
            <span>Mockup Feed IG (Summary PNG)</span>
          </button>

          <button className="btn btn-sm btn-success animated-success-btn shadow-glow flex items-center gap-2" onClick={onDownloadZip}>
            <Package size={16} />
            <span>Download Semua ({tiles.length} Foto ZIP)</span>
          </button>
        </div>
      </div>

      {/* Scrollable Gallery Container containing AI Studio and Grid */}
      <div className="gallery-scroll-container">
        {/* Killer Feature: AI Smart Vision & Caption Studio */}
        <div className="ai-studio-card card-animated" style={{ '--anim-order': 1 }}>
          {/* Studio Header Bar */}
          <div className="ai-studio-header">
            <div className="ai-header-left">
              <div className="ai-header-icon-box header-icon-pulse">
                <Bot size={24} />
              </div>
              <div className="ai-header-titles">
                <h4>
                  <span>✨ AI Vision Studio & Smart Caption Generator</span>
                  <span className="ai-status-badge">
                    <Scan size={12} /> Auto-Vision
                  </span>
                </h4>
                <p>Mendeteksi objek gambar & tag relevan secara otomatis sesuai foto upload Anda</p>
              </div>
            </div>

            <div className="ai-header-right">
              {/* Language Switcher */}
              <div className="ai-lang-switcher">
                <button
                  className={`ai-lang-btn ${captionLang === 'id' ? 'active' : ''}`}
                  onClick={() => { setCaptionLang('id'); setCustomGeneratedText(null); }}
                  title="Gunakan Bahasa Indonesia"
                >
                  🇮🇩 ID
                </button>
                <button
                  className={`ai-lang-btn ${captionLang === 'en' ? 'active' : ''}`}
                  onClick={() => { setCaptionLang('en'); setCustomGeneratedText(null); }}
                  title="Use English"
                >
                  🇬🇧 EN
                </button>
              </div>

              {/* Re-Analyze / Refresh Button */}
              <button
                className="btn btn-sm btn-outline flex items-center gap-2"
                onClick={handleGenerateSmartCaption}
                disabled={isAnalyzing || isGeneratingGemini}
                title="Deteksi ulang gambar & generate caption baru"
              >
                {isAnalyzing || isGeneratingGemini ? (
                  <Loader2 size={15} className="animate-spin" style={{ color: 'var(--accent-cyan)' }} />
                ) : (
                  <RefreshCw size={15} style={{ color: 'var(--accent-cyan)' }} />
                )}
                <span>{isGeneratingGemini ? 'AI Generating...' : 'Scan & Generate'}</span>
              </button>
            </div>
          </div>

          {/* AI Detection Summary Strip */}
          <div className="ai-pill-bar">
            <div className="ai-pill-item">
              <Eye size={16} style={{ color: 'var(--accent-cyan)' }} />
              <span>Deteksi AI:</span>
              <span className="ai-pill-badge-highlight">
                <Sparkles size={14} />
                <span>{isAnalyzing ? 'Mengecek Gambar...' : (visionInfo?.categoryLabel || '✨ Aesthetic & Lifestyle Portrait')}</span>
              </span>
            </div>

            <div className="flex items-center flex-wrap gap-4">
              <div className="ai-pill-item">
                <span>Palet Warna:</span>
                <span 
                  className="ai-color-circle" 
                  style={{ backgroundColor: visionInfo?.dominantColor || '#00f2fe' }}
                  title={`Dominant Color: ${visionInfo?.dominantColor || '#00f2fe'}`}
                ></span>
                <strong>{visionInfo?.colorVibe || 'Color Analysis'}</strong>
              </div>

              <div className="ai-pill-item">
                <span>Pencahayaan:</span>
                <strong>{visionInfo?.brightnessLabel || 'Balanced High-Def'}</strong>
              </div>
            </div>
          </div>

          {/* Vibe & Mood Selection Row */}
          <div className="ai-vibe-section">
            <div className="ai-section-label">
              <Sliders size={16} style={{ color: 'var(--accent-cyan)' }} />
              <span>Pilih Vibe & Gaya Penulisan Caption:</span>
            </div>
            <div className="ai-vibe-buttons">
              {vibeOptions.map(m => {
                const IconComp = m.icon;
                const isActive = captionMood === m.id;
                return (
                  <button
                    key={m.id}
                    className={`ai-vibe-btn ${isActive ? 'active' : ''}`}
                    onClick={() => { setCaptionMood(m.id); setCustomGeneratedText(null); }}
                  >
                    <IconComp size={15} style={{ color: isActive ? '#fff' : 'var(--accent-cyan)' }} />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Context / Prompt Input */}
          <div className="ai-prompt-section">
            <div className="ai-prompt-wrapper">
              <span style={{ fontSize: '1rem' }}>💡</span>
              <input
                type="text"
                placeholder="Tambahkan konteks khusus gambar (opsional, misal: 'Acara Wisuda TRPL Polinela', 'Diskon Grand Opening', 'Pantai Pahawang')"
                value={customPrompt}
                onChange={(e) => { setCustomPrompt(e.target.value); setCustomGeneratedText(null); }}
                className="ai-prompt-input"
              />
              {customPrompt && (
                <button
                  className="ai-prompt-clear-btn"
                  onClick={() => { setCustomPrompt(''); setCustomGeneratedText(null); }}
                  title="Hapus konteks tambahan"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Smart Hashtags & Relevant Tags Cloud Box */}
          <div className="ai-tags-section">
            <div className="ai-tags-header">
              <div className="ai-section-label" style={{ marginBottom: 0 }}>
                <Tag size={16} style={{ color: 'var(--accent-cyan)' }} />
                <span>🏷️ Tag Relevan Terdeteksi AI (Klik chip untuk mengaktifkan/menonaktifkan tag):</span>
              </div>

              <div className="ai-tags-actions">
                <button
                  className="btn btn-xs btn-outline flex items-center gap-1"
                  onClick={() => setShowTagInput(!showTagInput)}
                >
                  <Plus size={13} style={{ color: 'var(--accent-cyan)' }} />
                  <span>Tambah Tag</span>
                </button>

                <button
                  className={`btn btn-xs flex items-center gap-1 ${copiedTags ? 'btn-success' : 'btn-outline'}`}
                  onClick={handleCopyTagsOnly}
                  title="Salin kumpulan hashtag ini saja"
                >
                  {copiedTags ? <Check size={13} /> : <Hash size={13} />}
                  <span>{copiedTags ? 'Tag Tersalin!' : 'Salin Tag Saja'}</span>
                </button>
              </div>
            </div>

            {/* New Tag Input Box */}
            {showTagInput && (
              <form onSubmit={handleAddTagSubmit} className="ai-add-tag-box">
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>#</span>
                <input
                  type="text"
                  placeholder="karyaanakbangsa atau wisuda2026"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  autoFocus
                  className="ai-add-tag-input"
                />
                <button type="submit" className="btn btn-xs btn-primary">
                  Simpan Tag
                </button>
                <button type="button" className="btn btn-xs btn-ghost" onClick={() => setShowTagInput(false)}>
                  <X size={14} />
                </button>
              </form>
            )}

            {/* Chips Grid */}
            <div style={{ maxHeight: '140px', overflowY: 'auto', paddingRight: '4px' }}>
              {selectedTags.map((t, index) => (
                <span
                  key={index}
                  onClick={() => handleToggleTag(t)}
                  className="ai-tag-chip group"
                  title="Klik untuk menghapus/menambah tag dari caption"
                >
                  <span>{t}</span>
                  <X size={12} style={{ marginLeft: '4px' }} />
                </span>
              ))}
              {selectedTags.length === 0 && (
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic', display: 'block', padding: '4px 0' }}>
                  Belum ada tag terpilih. Klik 'Tambah Tag' atau tombol scan di atas.
                </span>
              )}
            </div>
          </div>

          {/* Caption Editor & Live Box */}
          <div className="ai-editor-section">
            <div className="ai-editor-header">
              <div className="ai-section-label" style={{ marginBottom: 0 }}>
                <FileText size={16} style={{ color: 'var(--accent-cyan)' }} />
                <span>Hasil Caption & Hashtags (Bisa Diedit Sesuai Keinginan):</span>
              </div>
              <span className="ai-editor-stats">
                {currentCaptionText.length} Karakter • {selectedTags.length} Hashtags
              </span>
            </div>

            <div className="ai-textarea-wrapper">
              <textarea
                value={currentCaptionText}
                onChange={(e) => setCustomGeneratedText(e.target.value)}
                rows={6}
                className="ai-textarea"
              />

              <div className="ai-editor-footer">
                <button
                  className="btn btn-sm btn-outline flex items-center gap-2"
                  onClick={handleGenerateSmartCaption}
                  disabled={isAnalyzing || isGeneratingGemini}
                  title="Refresh & generate ulang caption otomatis dengan AI"
                >
                  <Wand2 size={15} style={{ color: 'var(--accent-cyan)' }} />
                  <span>Generate Ulang</span>
                </button>

                <button
                  className={`btn btn-sm px-4 py-2 flex items-center gap-2 font-bold shadow-glow ${
                    copiedCaption ? 'btn-success' : 'btn-primary'
                  }`}
                  onClick={handleCopyCaption}
                >
                  {copiedCaption ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copiedCaption ? 'Tersalin ke Clipboard!' : 'Salin Caption & Hashtags'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Optional Pro AI Cloud Vision API Accordion */}
          <div className="ai-pro-section">
            <button
              className="ai-pro-toggle-btn"
              onClick={() => setShowProConfig(!showProConfig)}
            >
              <span className="flex items-center gap-2">
                <Key size={15} style={{ color: 'var(--accent-cyan)' }} />
                <span>⚙️ Konfigurasi Pro AI Cloud Vision API (Optional - Google Gemini API)</span>
                {geminiApiKey && <span className="badge bg-green-500/20 text-green-300 border border-green-500/40 text-[10px] px-2 py-0.2 rounded-full">Active</span>}
              </span>
              <span>
                {showProConfig ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            </button>

            {showProConfig && (
              <div className="ai-pro-panel-box">
                <p style={{ margin: '0 0 10px 0', color: 'var(--text-primary)' }}>
                  Secara default, aplikasi menggunakan <strong style={{ color: 'var(--accent-cyan)' }}>Built-in Edge AI Smart Vision</strong> yang bekerja 100% offline & instan tanpa biaya. 
                  Jika Anda ingin analisis LLM yang lebih mendalam (seperti OCR baca teks pada piagam/sertifikat & deskripsi detail), Anda dapat memasukkan API Key Google Gemini (<code style={{ color: 'var(--accent-cyan)' }}>gemini-1.5-flash</code>).
                </p>

                <div className="flex items-center gap-2 flex-wrap">
                  <input
                    type="password"
                    placeholder="Paste Google Gemini API Key di sini (AIzaSy...)"
                    value={geminiApiKey}
                    onChange={(e) => handleSaveGeminiKey(e.target.value)}
                    className="ai-prompt-input"
                    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '0.5rem 0.8rem', borderRadius: 'var(--radius-md)' }}
                  />
                  {geminiApiKey && (
                    <button
                      className="btn btn-xs btn-outline"
                      style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}
                      onClick={() => handleSaveGeminiKey('')}
                    >
                      Hapus Key
                    </button>
                  )}
                </div>
                {geminiError && (
                  <div className="flex items-center gap-2 mt-2 p-2 rounded" style={{ color: 'var(--danger)', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
                    <AlertCircle size={15} />
                    <span>Error: {geminiError}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Grid of Sliced Tiles */}
        <div className="gallery-grid-inner">
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
                    <span className="tile-dims" style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>⚡ {tile.width} × {tile.height} px</span>
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
    </div>
  );
}

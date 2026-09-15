import React, { useState, useEffect } from 'react';
import {
  Download, Copy, Package, Scissors, Sparkles, Smartphone, Check,
  Bot, Scan, Eye, Tag, Hash, RefreshCw, Sliders, Globe, Wand2,
  Image as ImageIcon, FileText, Key, ChevronDown, ChevronUp,
  Award, Zap, Plus, X, MessageSquare, Flame, Briefcase, Feather,
  Loader2, AlertCircle, Lightbulb
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
      <div className="flex flex-col flex-1 h-full items-center justify-center bg-zinc-100/50 dark:bg-black/40 p-6 animate-in fade-in duration-300">
        <div className="flex flex-col items-center justify-center max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-10 text-center shadow-lg shadow-zinc-200/50 dark:shadow-none animate-in zoom-in-95 duration-500">
          <div className="w-16 h-16 rounded-full bg-sky-100 dark:bg-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-6 shadow-inner relative">
            <div className="absolute inset-0 rounded-full border-4 border-sky-200 dark:border-sky-500/30 animate-ping opacity-20"></div>
            <Scissors size={32} />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-500">Belum Ada Hasil Potongan</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">
            Pilih foto terlebih dahulu lalu klik tombol <strong className="text-sky-600 dark:text-sky-400 font-bold">"Potong & Upscale Gambar Sekarang"</strong> di panel sebelah kiri.
          </p>
          <button 
            className="flex items-center justify-center gap-2 w-full max-w-[280px] py-2.5 px-4 rounded-xl font-semibold text-sm text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors shadow-sm"
            onClick={onSwitchToPreview}
          >
            <span>Kembali ke Live Preview</span>
          </button>
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
    { id: 'aesthetic', label: 'Aesthetic', icon: Feather },
    { id: 'brand', label: 'Profesional / Brand', icon: Briefcase },
    { id: 'hype', label: 'Hype / Viral', icon: Flame },
    { id: 'story', label: 'Storytelling', icon: MessageSquare },
    { id: 'minimal', label: 'Singkat & Padat', icon: Wand2 }
  ];

  return (
    <div className="flex flex-col flex-1 h-full animate-in fade-in duration-300">
      {/* Gallery Toolbar with Mockup & ZIP Download Buttons */}
      <div className="shrink-0 flex flex-wrap items-center justify-between gap-3 px-6 pt-8 pb-4 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <span>Berhasil membagi gambar menjadi <strong className="text-sky-600 dark:text-sky-400 font-bold">{tiles.length} potongan HD</strong></span>
          <span className="opacity-50 text-zinc-300 dark:text-zinc-700">•</span>
          <span>Dimensi <strong className="text-sky-600 dark:text-sky-400 font-bold">{tiles[0]?.width}×{tiles[0]?.height} px</strong> per foto</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold text-sky-600 border border-sky-600 hover:bg-sky-50 dark:text-sky-400 dark:border-sky-500/50 dark:hover:bg-sky-500/10 transition-colors"
            onClick={onDownloadMockup}
            title="Download 1 gambar summary sheet berisi preview tampilan grid feed di profil Instagram Anda"
          >
            <Smartphone size={14} />
            <span>Mockup Feed IG</span>
          </button>

          <button 
            className="flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm"
            onClick={onDownloadZip}
          >
            <Package size={14} />
            <span>Download Semua ({tiles.length} ZIP)</span>
          </button>
        </div>
      </div>

      {/* Scrollable Gallery Container containing AI Studio and Grid */}
      <div className="flex-1 overflow-auto p-4 md:p-6 bg-zinc-50 dark:bg-black/20">
        {/* Killer Feature: AI Smart Vision & Caption Studio */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm mb-6 animate-in slide-in-from-bottom-4 duration-500">
          {/* Studio Header Bar */}
          <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800/50 bg-gradient-to-r from-sky-50/50 to-indigo-50/50 dark:from-sky-900/10 dark:to-indigo-900/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start md:items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 shrink-0 shadow-sm relative">
                <div className="absolute inset-0 rounded-xl border border-sky-200 dark:border-sky-500/30 animate-pulse"></div>
                <Bot size={20} />
              </div>
              <div>
                <h4 className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                  AI Vision Studio & Smart Caption Generator
                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-400">
                    <Scan size={10} /> Auto-Vision
                  </span>
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Mendeteksi objek gambar & tag relevan secara otomatis sesuai foto upload Anda</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Language Switcher */}
              <div className="flex items-center p-1 rounded-lg bg-zinc-200/50 dark:bg-zinc-800/50">
                <button
                  className={`px-2 py-1 text-[11px] font-bold rounded-md transition-all ${captionLang === 'id' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
                  onClick={() => { setCaptionLang('id'); setCustomGeneratedText(null); }}
                  title="Gunakan Bahasa Indonesia"
                >
                  🇮🇩 ID
                </button>
                <button
                  className={`px-2 py-1 text-[11px] font-bold rounded-md transition-all ${captionLang === 'en' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
                  onClick={() => { setCaptionLang('en'); setCustomGeneratedText(null); }}
                  title="Use English"
                >
                  🇬🇧 EN
                </button>
              </div>

              {/* Re-Analyze / Refresh Button */}
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                onClick={handleGenerateSmartCaption}
                disabled={isAnalyzing || isGeneratingGemini}
                title="Deteksi ulang gambar & generate caption baru"
              >
                {isAnalyzing || isGeneratingGemini ? (
                  <Loader2 size={14} className="animate-spin text-sky-500" />
                ) : (
                  <RefreshCw size={14} className="text-sky-500" />
                )}
                <span>{isGeneratingGemini ? 'Generating...' : 'Scan Ulang'}</span>
              </button>
            </div>
          </div>

          <div className="p-5 flex flex-col gap-5">
            {/* AI Detection Summary Strip */}
            <div className="flex flex-wrap items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50">
              <div className="flex items-center gap-2 text-xs">
                <Eye size={14} className="text-sky-500" />
                <span className="text-zinc-600 dark:text-zinc-400 font-medium">Deteksi AI:</span>
                <span className="flex items-center gap-1 px-2 py-1 rounded bg-sky-100 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 font-semibold border border-sky-200 dark:border-sky-500/30">
                  <Sparkles size={12} />
                  <span>{isAnalyzing ? 'Mengecek Gambar...' : (visionInfo?.categoryLabel || 'Aesthetic & Lifestyle Portrait')}</span>
                </span>
              </div>

              <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-700 hidden sm:block"></div>

              <div className="flex items-center flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-600 dark:text-zinc-400 font-medium">Palet Warna:</span>
                  <span 
                    className="w-4 h-4 rounded-full border border-black/10 dark:border-white/10 shadow-inner" 
                    style={{ backgroundColor: visionInfo?.dominantColor || '#00f2fe' }}
                    title={`Dominant Color: ${visionInfo?.dominantColor || '#00f2fe'}`}
                  ></span>
                  <strong className="text-zinc-800 dark:text-zinc-200">{visionInfo?.colorVibe || 'Color Analysis'}</strong>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-zinc-600 dark:text-zinc-400 font-medium">Pencahayaan:</span>
                  <strong className="text-zinc-800 dark:text-zinc-200">{visionInfo?.brightnessLabel || 'Balanced High-Def'}</strong>
                </div>
              </div>
            </div>

            {/* Vibe & Mood Selection Row */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <Sliders size={14} className="text-sky-500" />
                <span>Pilih Vibe & Gaya Penulisan Caption:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {vibeOptions.map(m => {
                  const IconComp = m.icon;
                  const isActive = captionMood === m.id;
                  return (
                    <button
                      key={m.id}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${isActive ? 'bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-900 shadow-md' : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:border-zinc-600'}`}
                      onClick={() => { setCaptionMood(m.id); setCustomGeneratedText(null); }}
                    >
                      <IconComp size={12} className={isActive ? 'text-current opacity-80' : 'text-sky-500'} />
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Context / Prompt Input */}
            <div>
              <div className="relative flex items-center w-full">
                <div className="absolute left-3 text-zinc-400 dark:text-zinc-500">
                  <Lightbulb size={16} />
                </div>
                <input
                  type="text"
                  placeholder="Konteks tambahan (opsional): misal 'Acara Wisuda', 'Diskon Toko'"
                  value={customPrompt}
                  onChange={(e) => { setCustomPrompt(e.target.value); setCustomGeneratedText(null); }}
                  className="w-full pl-9 pr-10 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-shadow dark:text-zinc-100"
                />
                {customPrompt && (
                  <button
                    className="absolute right-2 p-1.5 rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300 transition-colors"
                    onClick={() => { setCustomPrompt(''); setCustomGeneratedText(null); }}
                    title="Hapus konteks tambahan"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Smart Hashtags & Relevant Tags Cloud Box */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  <Tag size={14} className="text-sky-500" />
                  <span>Tag Relevan Terdeteksi AI:</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                    onClick={() => setShowTagInput(!showTagInput)}
                  >
                    <Plus size={12} className="text-sky-500" />
                    <span>Tambah Tag</span>
                  </button>

                  <button
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-medium transition-colors ${copiedTags ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-400' : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700'}`}
                    onClick={handleCopyTagsOnly}
                    title="Salin kumpulan hashtag ini saja"
                  >
                    {copiedTags ? <Check size={12} /> : <Hash size={12} />}
                    <span>{copiedTags ? 'Tersalin!' : 'Salin Tag Saja'}</span>
                  </button>
                </div>
              </div>

              {/* New Tag Input Box */}
              {showTagInput && (
                <form onSubmit={handleAddTagSubmit} className="flex items-center gap-2 p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center flex-1 gap-1.5 px-2 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md">
                    <span className="text-sky-500 font-bold text-sm">#</span>
                    <input
                      type="text"
                      placeholder="karyaanakbangsa"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      autoFocus
                      className="flex-1 bg-transparent text-sm outline-none text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400"
                    />
                  </div>
                  <button type="submit" className="px-3 py-1.5 rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-bold hover:opacity-90 transition-opacity shrink-0">
                    Simpan
                  </button>
                  <button type="button" className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shrink-0" onClick={() => setShowTagInput(false)}>
                    <X size={14} />
                  </button>
                </form>
              )}

              {/* Chips Grid */}
              <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto pr-1">
                {selectedTags.map((t, index) => (
                  <button
                    key={index}
                    onClick={() => handleToggleTag(t)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-sky-200 bg-sky-50 text-sky-700 text-[11px] font-semibold hover:bg-sky-100 hover:border-sky-300 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-300 dark:hover:bg-sky-500/20 transition-colors"
                    title="Klik untuk menghapus tag"
                  >
                    <span>{t}</span>
                    <X size={10} className="opacity-60 hover:opacity-100" />
                  </button>
                ))}
                {selectedTags.length === 0 && (
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 italic py-1">
                    Belum ada tag terpilih. Klik 'Tambah Tag' atau tombol scan di atas.
                  </span>
                )}
              </div>
            </div>

            {/* Caption Editor & Live Box */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  <FileText size={14} className="text-sky-500" />
                  <span>Hasil Caption & Hashtags:</span>
                </div>
                <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                  {currentCaptionText.length} Karakter • {selectedTags.length} Hashtags
                </span>
              </div>

              <div className="relative group rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 transition-all bg-white dark:bg-zinc-900">
                <textarea
                  value={currentCaptionText}
                  onChange={(e) => setCustomGeneratedText(e.target.value)}
                  rows={6}
                  className="w-full p-4 text-sm text-zinc-800 dark:text-zinc-200 bg-transparent outline-none resize-y min-h-[120px] leading-relaxed"
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white transition-colors disabled:opacity-50 shadow-sm"
                    onClick={handleGenerateSmartCaption}
                    disabled={isAnalyzing || isGeneratingGemini}
                    title="Refresh & generate ulang caption otomatis dengan AI"
                  >
                    <Wand2 size={14} className="text-sky-500" />
                    <span>Generate Ulang</span>
                  </button>

                  <button
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${
                      copiedCaption 
                        ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/20' 
                        : 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-sky-600 dark:hover:bg-sky-500'
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
            <div className="mt-2 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-900 transition-all">
              <button
                className="flex items-center justify-between w-full p-3 text-left bg-zinc-50 dark:bg-zinc-800/30 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
                onClick={() => setShowProConfig(!showProConfig)}
              >
                <div className="flex items-center flex-wrap gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  <Key size={14} className="text-sky-500" />
                  <span>Konfigurasi Pro AI Cloud Vision (Google Gemini API)</span>
                  {geminiApiKey && <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30 text-[9px] uppercase tracking-wider">Active</span>}
                </div>
                <span className="text-zinc-400">
                  {showProConfig ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </button>

              {showProConfig && (
                <div className="p-4 border-t border-zinc-100 dark:border-zinc-800">
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">
                    Secara default, aplikasi menggunakan <strong className="text-sky-600 dark:text-sky-400 font-semibold">Built-in Edge AI Smart Vision</strong> yang bekerja 100% offline & instan tanpa biaya. 
                    Jika Anda ingin analisis LLM yang lebih mendalam (seperti OCR baca teks pada piagam/sertifikat & deskripsi detail), Anda dapat memasukkan API Key Google Gemini (<code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded text-sky-600 dark:text-sky-400 font-mono">gemini-1.5-flash</code>).
                  </p>

                  <div className="flex items-center gap-2 flex-wrap">
                    <input
                      type="password"
                      placeholder="Paste Google Gemini API Key di sini (AIzaSy...)"
                      value={geminiApiKey}
                      onChange={(e) => handleSaveGeminiKey(e.target.value)}
                      className="flex-1 min-w-[200px] px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md text-xs outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-shadow dark:text-zinc-100"
                    />
                    {geminiApiKey && (
                      <button
                        className="px-3 py-2 rounded-md text-xs font-semibold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 dark:text-red-400 dark:bg-red-500/10 dark:border-red-500/30 dark:hover:bg-red-500/20 transition-colors"
                        onClick={() => handleSaveGeminiKey('')}
                      >
                        Hapus Key
                      </button>
                    )}
                  </div>
                  {geminiError && (
                    <div className="flex items-center gap-2 mt-3 p-2.5 rounded-md text-xs font-medium text-red-700 bg-red-50 border border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/30 animate-in fade-in duration-200">
                      <AlertCircle size={14} className="shrink-0" />
                      <span className="leading-relaxed">Error: {geminiError}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Grid of Sliced Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pb-20">
          {tiles.map((tile, idx) => {
            const isFirst = tile.igNumber === 1 && options.igOrder;
            const isLast = tile.igNumber === tiles.length && options.igOrder;
            const badgeLabel = options.igOrder ? `Post #${tile.igNumber}` : `Tile #${tile.seqNumber}`;
            const note = (isLast && tiles.length > 1) ? ' (Post Duluan!)' :
                         isFirst ? ' (Post Terakhir)' : '';

            return (
              <div 
                key={tile.id || idx} 
                className="group relative flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-in zoom-in-95"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="relative aspect-square w-full bg-zinc-100 dark:bg-black/50 overflow-hidden flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>
                  <img src={tile.dataUrl} alt={tile.filename} loading="lazy" className="max-w-full max-h-full object-contain drop-shadow-md rounded transition-transform duration-500 group-hover:scale-105" />
                  
                  <span className={`absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm z-10 ${isFirst ? 'bg-sky-500 text-white shadow-sky-500/30 animate-pulse' : 'bg-white/90 text-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 backdrop-blur-sm'}`}>
                    {badgeLabel}{note}
                  </span>
                </div>

                <div className="p-4 flex flex-col gap-3 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate" title={tile.filename}>{tile.filename}</span>
                    <span className="text-xs font-bold text-sky-600 dark:text-sky-400">{tile.width} × {tile.height} px</span>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <button
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold border border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white transition-colors shadow-sm"
                      onClick={() => onDownloadTile(tile)}
                      title="Simpan Foto Ini"
                    >
                      <Download size={14} />
                      <span>Simpan</span>
                    </button>

                    <button
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-sky-600 dark:hover:bg-sky-500 transition-colors shadow-sm"
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

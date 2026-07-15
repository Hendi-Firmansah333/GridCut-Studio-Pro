import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import GuideModal from './components/GuideModal';
import DropZone from './components/Sidebar/DropZone';
import Presets from './components/Sidebar/Presets';
import SplitControls from './components/Sidebar/SplitControls';
import ExportSettings from './components/Sidebar/ExportSettings';
import LiveCanvas from './components/Workspace/LiveCanvas';
import ResultsGallery from './components/Workspace/ResultsGallery';
import ToastContainer from './components/Toast';
import { sliceTiles } from './utils/splitter';
import { downloadAllZip, copyTileToClipboard, downloadSingleTile } from './utils/exporter';
import { Eye, Scissors } from 'lucide-react';
import './App.css';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('gridcut_theme') || 'theme-dark');
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [sourceImage, setSourceImage] = useState(null);
  const [filename, setFilename] = useState('');
  const [showGuides, setShowGuides] = useState(true);
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'gallery'
  const [currentPreset, setCurrentPreset] = useState('ig-grid-3x3');
  const [slicedTiles, setSlicedTiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toasts, setToasts] = useState([]);

  const [options, setOptions] = useState({
    direction: 'both',
    cols: 3,
    rows: 3,
    horizMode: 'quantity',
    horizQty: 4,
    horizPx: 1080,
    vertMode: 'quantity',
    vertQty: 3,
    vertPx: 1350,
    overlapEnabled: false,
    overlapPx: 15,
    igOrder: true,
    upscaleScale: '3x',
    sharpenEnabled: true,
    sharpenIntensity: 0.35,
    format: 'image/png',
    quality: 0.92
  });

  // Sync theme with body class and localStorage
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('gridcut_theme', theme);
  }, [theme]);

  // Toast Helper
  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Handle Preset Selection
  const handleSelectPreset = (presetId) => {
    setCurrentPreset(presetId);
    if (presetId === 'ig-grid-3x3') {
      setOptions(prev => ({ ...prev, direction: 'both', cols: 3, rows: 3, igOrder: true }));
    } else if (presetId === 'ig-grid-3x2') {
      setOptions(prev => ({ ...prev, direction: 'both', cols: 3, rows: 2, igOrder: true }));
    } else if (presetId === 'ig-pano-3x1') {
      setOptions(prev => ({ ...prev, direction: 'both', cols: 3, rows: 1, igOrder: true }));
    } else if (presetId === 'carousel-4x1') {
      setOptions(prev => ({ ...prev, direction: 'horiz', horizMode: 'quantity', horizQty: 4, igOrder: false }));
    } else if (presetId === 'stories-1x3') {
      setOptions(prev => ({ ...prev, direction: 'vert', vertMode: 'quantity', vertQty: 3, igOrder: false }));
    }
  };

  // Option Change Handler
  const handleChangeOption = (key, value) => {
    setOptions(prev => ({ ...prev, [key]: value }));
    const nonCustomKeys = ['format', 'quality', 'upscaleScale', 'sharpenEnabled', 'sharpenIntensity'];
    if (!nonCustomKeys.includes(key)) {
      setCurrentPreset('custom');
    }
  };

  // Image Activation
  const handleImageLoaded = (img, name, sampleType) => {
    setSourceImage(img);
    setFilename(name);
    setActiveTab('preview');
    if (sampleType === 'landscape') {
      handleSelectPreset('ig-pano-3x1');
    } else if (sampleType === 'portrait' || sampleType === 'cyberpunk') {
      handleSelectPreset('ig-grid-3x3');
    }
    showToast(`📸 Gambar berhasil dimuat: ${name}`, 'success');
  };

  const handleRemoveImage = () => {
    setSourceImage(null);
    setFilename('');
    setSlicedTiles([]);
    setActiveTab('preview');
    showToast('Gambar dihapus dari workspace.', 'info');
  };

  // Cut Action
  const handleCutNow = async () => {
    if (!sourceImage) {
      showToast('⚠️ Silakan pilih/upload atau gunakan gambar sampel terlebih dahulu!', 'warning');
      return;
    }

    setIsProcessing(true);
    try {
      const results = await sliceTiles(sourceImage, options);
      setSlicedTiles(results);
      setActiveTab('gallery');
      showToast(`✂️ Berhasil memotong gambar menjadi ${results.length} bagian!`, 'success');
    } catch (error) {
      console.error('Error slicing image:', error);
      showToast('Gagal memproses potongan gambar.', 'danger');
    } finally {
      setIsProcessing(false);
    }
  };

  // Download Handlers
  const handleDownloadTile = (tile) => {
    if (downloadSingleTile(tile)) {
      showToast(`Berhasil menyimpan ${tile.filename}`, 'success');
    }
  };

  const handleCopyTile = async (tile) => {
    if (await copyTileToClipboard(tile)) {
      showToast(`✨ Foto (${tile.width}×${tile.height}px) tersalin ke Clipboard!`, 'success');
    } else {
      showToast('⚠️ Gagal menyalin foto. Pastikan browser mendukung ClipboardItem.', 'warning');
    }
  };

  const handleDownloadZip = async () => {
    if (slicedTiles.length === 0) return;
    const success = await downloadAllZip(slicedTiles, options, (msg) => showToast(msg, 'info'));
    if (success) {
      showToast(`📦 Berhasil men-download ${slicedTiles.length} foto dalam format ZIP!`, 'success');
    } else {
      showToast('Gagal membuat file ZIP.', 'danger');
    }
  };


  return (
    <>
      <Header
        theme={theme}
        toggleTheme={() => setTheme(prev => prev === 'theme-dark' ? 'theme-light' : 'theme-dark')}
        onOpenGuide={() => setGuideModalOpen(true)}
      />

      <main className="studio-container">
        {/* Left Panel: Controls & Presets */}
        <aside className="control-sidebar">
          <DropZone
            sourceImage={sourceImage}
            filename={filename}
            onImageLoaded={handleImageLoaded}
            onRemoveImage={handleRemoveImage}
          />

          <Presets
            currentPreset={currentPreset}
            onSelectPreset={handleSelectPreset}
          />

          <SplitControls
            options={options}
            onChangeOption={handleChangeOption}
          />

          <ExportSettings
            options={options}
            onChangeOption={handleChangeOption}
            hasImage={!!sourceImage}
            isProcessing={isProcessing}
            slicedCount={slicedTiles.length}
            onCutNow={handleCutNow}
            onDownloadZip={handleDownloadZip}
          />
        </aside>

        {/* Right Panel: Workspace Tabs & Viewport */}
        <section className="studio-workspace">
          <nav className="workspace-tabs">
            <button
              className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('preview')}
            >
              <Eye size={16} />
              <span>Live Interactive Preview</span>
            </button>

            <button
              className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
              onClick={() => setActiveTab('gallery')}
            >
              <Scissors size={16} />
              <span>Galeri & Download</span>
              {slicedTiles.length > 0 && (
                <span className="tab-badge badge-success">{slicedTiles.length} Siap</span>
              )}
            </button>
          </nav>

          {activeTab === 'preview' ? (
            <LiveCanvas
              sourceImage={sourceImage}
              options={options}
              showGuides={showGuides}
              onToggleGuides={() => setShowGuides(prev => !prev)}
              onCutNow={handleCutNow}
              onTriggerUpload={() => {
                const dropZoneInput = document.querySelector('.drop-zone input[type="file"]');
                if (dropZoneInput) dropZoneInput.click();
              }}
            />
          ) : (
            <ResultsGallery
              tiles={slicedTiles}
              options={options}
              onDownloadTile={handleDownloadTile}
              onCopyTile={handleCopyTile}
              onDownloadZip={handleDownloadZip}
              onSwitchToPreview={() => setActiveTab('preview')}
            />
          )}
        </section>
      </main>

      <GuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
      />

      <ToastContainer toasts={toasts} />
    </>
  );
}

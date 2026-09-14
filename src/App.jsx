import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import EducationGuidePage from './components/EducationGuidePage';
import DropZone from './components/Sidebar/DropZone';
import Presets from './components/Sidebar/Presets';
import SplitControls from './components/Sidebar/SplitControls';
import ColorEffects from './components/Sidebar/ColorEffects';
import WatermarkSettings from './components/Sidebar/WatermarkSettings';
import ExportSettings from './components/Sidebar/ExportSettings';
import LiveCanvas from './components/Workspace/LiveCanvas';
import ResultsGallery from './components/Workspace/ResultsGallery';
import ToastContainer from './components/Toast';
import PhotoboothModal from './components/PhotoboothModal';
import LandingPage from './components/LandingPage';
import DocumentationPage from './components/DocumentationPage';
import ChangelogModal from './components/ChangelogModal';
import { sliceTiles } from './utils/splitter';
import { downloadAllZip, copyTileToClipboard, downloadSingleTile, downloadFeedMockupSheet } from './utils/exporter';
import { Eye, Scissors, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import './App.css';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'workspace' | 'docs' | 'guide'
  const [theme, setTheme] = useState(() => localStorage.getItem('gridcut_theme') || 'theme-dark');
  const [isPhotoboothOpen, setIsPhotoboothOpen] = useState(false);
  const [isChangelogOpen, setIsChangelogOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
    quality: 0.92,
    filterPreset: 'normal',
    brightness: 0,
    contrast: 0,
    saturation: 0,
    watermarkEnabled: false,
    watermarkText: '@username',
    watermarkPos: 'bottom-right',
    watermarkScope: 'last-only',
    watermarkStyle: 'pill',
    watermarkOpacity: 0.85
  });

  // Sync theme with body class, HTML class (for Tailwind), and localStorage
  useEffect(() => {
    if (theme === 'theme-dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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
    showToast(`Gambar berhasil dimuat: ${name}`, 'success');
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
      showToast('Silakan pilih/upload atau gunakan gambar sampel terlebih dahulu!', 'warning');
      return;
    }

    setIsProcessing(true);
    try {
      const results = await sliceTiles(sourceImage, options);
      setSlicedTiles(results);
      setActiveTab('gallery');
      showToast(`Berhasil memotong gambar menjadi ${results.length} bagian!`, 'success');
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
      showToast(`Foto (${tile.width}×${tile.height}px) tersalin ke Clipboard!`, 'success');
    } else {
      showToast('Gagal menyalin foto. Pastikan browser mendukung ClipboardItem.', 'warning');
    }
  };

  const handleDownloadZip = async () => {
    if (slicedTiles.length === 0) return;
    const success = await downloadAllZip(slicedTiles, options, (msg) => showToast(msg, 'info'));
    if (success) {
      showToast(`Berhasil men-download ${slicedTiles.length} foto dalam format ZIP!`, 'success');
    } else {
      showToast('Gagal membuat file ZIP.', 'danger');
    }
  };

  const handleDownloadMockup = async () => {
    if (slicedTiles.length === 0) return;
    const success = await downloadFeedMockupSheet(slicedTiles, options, (msg) => showToast(msg, 'info'));
    if (success) {
      showToast('Berhasil men-download Mockup Sheet Feed Instagram!', 'success');
    } else {
      showToast('Gagal membuat Mockup Sheet.', 'danger');
    }
  };

  if (currentView === 'landing') {
    return <LandingPage onStart={() => setCurrentView('workspace')} />;
  }

  if (currentView === 'docs') {
    return (
      <DocumentationPage 
        theme={theme} 
        toggleTheme={() => setTheme(prev => prev === 'theme-dark' ? 'theme-light' : 'theme-dark')}
        onBack={() => setCurrentView('workspace')} 
      />
    );
  }

  if (currentView === 'guide') {
    return (
      <EducationGuidePage 
        theme={theme} 
        toggleTheme={() => setTheme(prev => prev === 'theme-dark' ? 'theme-light' : 'theme-dark')}
        onBack={() => setCurrentView('workspace')} 
      />
    );
  }

  return (
    <>
      <Header
        theme={theme}
        toggleTheme={() => setTheme(prev => prev === 'theme-dark' ? 'theme-light' : 'theme-dark')}
        onOpenGuide={() => setCurrentView('guide')}
        onOpenPhotobooth={() => setIsPhotoboothOpen(true)}
        onOpenChangelog={() => setIsChangelogOpen(true)}
        onOpenDocs={() => setCurrentView('docs')}
      />

      <main className="flex flex-col-reverse lg:flex-row min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] bg-white dark:bg-zinc-950 lg:overflow-hidden">
        {/* Left Panel: Tools & Controls */}
        <aside className={`flex-shrink-0 transition-all duration-300 ease-in-out lg:border-r border-t lg:border-t-0 border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/50 flex flex-col overflow-hidden ${isSidebarOpen ? 'w-full lg:w-80 xl:w-96 opacity-100' : 'w-0 h-0 lg:h-full opacity-0 border-none'}`}>
          <div className="w-full lg:w-80 xl:w-96 flex flex-col gap-6 p-5 pb-24 lg:pb-5 h-full overflow-y-auto custom-scrollbar">
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

            <ColorEffects
              options={options}
              onChangeOption={handleChangeOption}
            />

            <WatermarkSettings
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
          </div>
        </aside>

        {/* Center Panel: Workspace Tabs & Viewport */}
        <section className="flex-1 flex flex-col lg:overflow-hidden bg-white dark:bg-black/20 min-h-[60vh] lg:min-h-0">
          <nav className="flex items-center px-4 md:px-6 pt-4 border-b border-zinc-200 dark:border-zinc-800 gap-4 md:gap-8 bg-white dark:bg-zinc-900 overflow-x-auto whitespace-nowrap hide-scrollbar">
            
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:flex items-center justify-center p-2 -ml-2 mr-2 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title={isSidebarOpen ? "Tutup Panel (Sidebar)" : "Buka Panel (Sidebar)"}
            >
              {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
            </button>

            <button
              className={`flex items-center gap-2 pb-3 border-b-2 -mb-px font-semibold text-sm transition-colors ${activeTab === 'preview' ? 'border-sky-500 text-sky-600 dark:text-sky-400' : 'border-transparent text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:border-zinc-700'}`}
              onClick={() => setActiveTab('preview')}
            >
              <Eye size={16} />
              <span>Live Interactive Preview</span>
            </button>

            <button
              className={`flex items-center gap-2 pb-3 border-b-2 -mb-px font-semibold text-sm transition-colors ${activeTab === 'gallery' ? 'border-sky-500 text-sky-600 dark:text-sky-400' : 'border-transparent text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:border-zinc-700'}`}
              onClick={() => setActiveTab('gallery')}
            >
              <Scissors size={16} />
              <span>Galeri & Download</span>
              {slicedTiles.length > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-400 text-xs font-bold">{slicedTiles.length} Siap</span>
              )}
            </button>
          </nav>

          {activeTab === 'preview' ? (
            <LiveCanvas
              sourceImage={sourceImage}
              options={options}
              showGuides={showGuides}
              onToggleGuides={() => setShowGuides(prev => !prev)}
              onTriggerUpload={() => {
                const dropZoneInput = document.querySelector('input[type="file"]');
                if (dropZoneInput) dropZoneInput.click();
              }}
            />
          ) : (
            <ResultsGallery
              tiles={slicedTiles}
              sourceImage={sourceImage}
              filename={filename}
              options={options}
              onDownloadTile={handleDownloadTile}
              onCopyTile={handleCopyTile}
              onDownloadZip={handleDownloadZip}
              onDownloadMockup={handleDownloadMockup}
              onSwitchToPreview={() => setActiveTab('preview')}
            />
          )}
        </section>
      </main>

      <PhotoboothModal
        isOpen={isPhotoboothOpen}
        onClose={() => setIsPhotoboothOpen(false)}
      />

      <ChangelogModal
        isOpen={isChangelogOpen}
        onClose={() => setIsChangelogOpen(false)}
      />

      <ToastContainer toasts={toasts} />
    </>
  );
}

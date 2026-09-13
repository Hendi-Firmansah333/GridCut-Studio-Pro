import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, ChevronDown, ChevronRight, Sun, Moon, CheckCircle2 } from 'lucide-react';

const SECTIONS = [
  { 
    id: 'intro', 
    title: 'Pengantar', 
    subItems: [
      { id: 'intro-philosophy', title: 'Filosofi Desain' },
      { id: 'intro-values', title: 'Nilai Utama' }
    ] 
  },
  { 
    id: 'tech', 
    title: 'Teknologi & Arsitektur', 
    subItems: [
      { id: 'tech-stack', title: 'Stack Frontend' },
      { id: 'tech-workflow', title: 'Alur Kerja (Workflow)' }
    ] 
  },
  { 
    id: 'features', 
    title: 'Fitur Utama', 
    subItems: [
      { id: 'feat-slicer', title: 'Smart Slicer' },
      { id: 'feat-preview', title: 'Live Interactive Preview' },
      { id: 'feat-color', title: 'Real-time Color Engine' },
      { id: 'feat-watermark', title: 'Watermark System' }
    ] 
  },
  { 
    id: 'changelog', 
    title: 'Riwayat Versi', 
    subItems: [
      { id: 'changelog-v2', title: 'v2.0 Beta' },
      { id: 'changelog-v15', title: 'v1.5 Update' },
      { id: 'changelog-v1', title: 'v1.0 Rilis Awal' }
    ] 
  },
  { 
    id: 'api', 
    title: 'Panduan Komponen', 
    subItems: [
      { id: 'api-structure', title: 'Struktur Direktori' },
      { id: 'api-splitter', title: 'Modul Slicer (utils)' },
      { id: 'api-state', title: 'State Management' }
    ] 
  },
];

export default function DocumentationPage({ theme, toggleTheme, onBack }) {
  const [activeSection, setActiveSection] = useState('intro');
  const [expandedSections, setExpandedSections] = useState({ intro: true });
  const [activeSub, setActiveSub] = useState('');

  const handleToggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
    setActiveSection(sectionId);
  };

  const handleSubClick = (sectionId, subId) => {
    setActiveSection(sectionId);
    setActiveSub(subId);
    
    // Scroll to element
    const el = document.getElementById(subId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Observe scroll to highlight active sub item
  useEffect(() => {
    const handleScroll = () => {
      const section = SECTIONS.find(s => s.id === activeSection);
      if (!section) return;

      for (let i = section.subItems.length - 1; i >= 0; i--) {
        const subId = section.subItems[i].id;
        const el = document.getElementById(subId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            setActiveSub(subId);
            break;
          }
        }
      }
    };
    
    const mainContent = document.getElementById('docs-main-scroll');
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll);
      return () => mainContent.removeEventListener('scroll', handleScroll);
    }
  }, [activeSection]);

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans overflow-hidden">
      {/* Navbar */}
      <header className="h-16 flex items-center justify-between px-6 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shrink-0 z-40">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Workspace</span>
          </button>
          <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700"></div>
          <h1 className="text-lg font-bold tracking-tight font-display flex items-center gap-2">
            <BookOpen size={20} className="text-sky-500" />
            <span>Dokumentasi <span className="text-zinc-500 font-medium">Developer</span></span>
          </h1>
        </div>
        <div>
          <button 
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 rounded-md text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Ubah Tema (Gelap / Terang)"
          >
            {theme === 'theme-dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Nav */}
        <aside className="w-72 flex-shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 overflow-y-auto hidden md:block">
          <nav className="p-4 space-y-1">
            <div className="mb-6 px-3 mt-2">
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/50 text-[11px] font-bold text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/50 tracking-wider">
                v2.0 Beta
              </span>
            </div>
            
            {SECTIONS.map(section => {
              const isActive = activeSection === section.id;
              const isExpanded = expandedSections[section.id];
              
              return (
                <div key={section.id} className="mb-0.5">
                  <button
                    onClick={() => handleToggleSection(section.id)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-[15px] transition-all ${
                      isActive 
                        ? 'font-bold text-zinc-900 dark:text-zinc-50' 
                        : 'font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/30'
                    }`}
                  >
                    <span>{section.title}</span>
                    {isExpanded ? (
                      <ChevronDown size={18} className="text-zinc-400" />
                    ) : (
                      <ChevronRight size={18} className="text-zinc-400" />
                    )}
                  </button>
                  
                  {/* Dropdown Sub Items */}
                  <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="pl-2 pr-2 py-1 space-y-1">
                        {section.subItems.map(sub => {
                          const isSubActive = activeSub === sub.id;
                          return (
                            <button
                              key={sub.id}
                              onClick={() => handleSubClick(section.id, sub.id)}
                              className={`w-full text-left px-4 py-2 rounded-xl text-[14px] transition-colors ${
                                isSubActive
                                  ? 'text-sky-700 dark:text-sky-400 font-semibold bg-sky-50 dark:bg-sky-500/10'
                                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800/30'
                              }`}
                            >
                              {sub.title}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Content Area */}
        <main id="docs-main-scroll" className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-12 scroll-smooth">
          <div className="max-w-3xl mx-auto pb-24">
            
            {activeSection === 'intro' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-display font-bold">Pengantar GridCut Pro</h2>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    GridCut Studio Pro adalah aplikasi web modern berbasis *Client-Side Rendering (CSR)* yang dirancang untuk memotong dan memproses gambar menjadi grid Instagram, carousel panorama, dan format sosial media lainnya secara presisi, interaktif, dan super cepat.
                  </p>
                </div>
                
                <div id="intro-philosophy" className="scroll-mt-8 space-y-4">
                  <h3 className="text-xl font-bold font-display border-b border-zinc-200 dark:border-zinc-800 pb-2">Filosofi Desain</h3>
                  <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <p className="text-zinc-800 dark:text-zinc-300 leading-relaxed">
                      Berbeda dengan layanan pemotong foto tradisional yang memerlukan proses upload-download ke server, GridCut Pro memproses setiap piksel gambar secara langsung di dalam memori browser pengguna (Client-Side). Hal ini menjamin privasi absolut, nol-latency, dan pengalaman yang instan tanpa membebani server backend.
                    </p>
                  </div>
                </div>

                <div id="intro-values" className="scroll-mt-8 space-y-4">
                  <h3 className="text-xl font-bold font-display border-b border-zinc-200 dark:border-zinc-800 pb-2">Nilai Utama (Core Values)</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {[
                      'Pemrosesan Instan tanpa Loading',
                      'Privasi Mutlak (No Server Uploads)',
                      'Resolusi Tinggi & Ketajaman Otomatis',
                      'Antarmuka Responsif & Elegan'
                    ].map((val, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-sky-500 mt-0.5 shrink-0" />
                        <span className="text-zinc-700 dark:text-zinc-300">{val}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeSection === 'tech' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                  <h2 className="text-3xl font-display font-bold">Teknologi & Arsitektur</h2>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Aplikasi ini dibangun menggunakan tumpukan (stack) teknologi modern untuk mencapai keseimbangan antara performa rendering tinggi dan kenyamanan pengembangan.
                  </p>
                </div>

                <div id="tech-stack" className="scroll-mt-8 space-y-4">
                  <h3 className="text-xl font-bold font-display border-b border-zinc-200 dark:border-zinc-800 pb-2">Stack Frontend</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 transition-colors hover:border-sky-500/50">
                      <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">React 19</h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">Library UI utama untuk reaktivitas state. Menggunakan Hooks (useState, useEffect, useRef) untuk mengelola data gambar tanpa me-render ulang seluruh halaman.</p>
                    </div>
                    <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 transition-colors hover:border-sky-500/50">
                      <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">Vite</h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">Bundler super cepat yang menggantikan Webpack. Mendukung Hot Module Replacement (HMR) dan optimalisasi aset statis untuk produksi.</p>
                    </div>
                    <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 transition-colors hover:border-sky-500/50">
                      <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">Tailwind CSS</h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">Utility-first CSS framework. Seluruh UI, Dark Mode, dan animasi transisi diatur murni dari class HTML tanpa CSS terpisah yang memperlambat pemuatan.</p>
                    </div>
                    <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 transition-colors hover:border-sky-500/50">
                      <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">HTML5 Canvas API</h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">Engine utama untuk memotong gambar, memberikan filter warna, dan rendering teks watermark berkinerja tinggi murni dari browser.</p>
                    </div>
                  </div>
                </div>

                <div id="tech-workflow" className="scroll-mt-8 space-y-4 pt-4">
                  <h3 className="text-xl font-bold font-display border-b border-zinc-200 dark:border-zinc-800 pb-2">Alur Kerja (Workflow) Engine Slicer</h3>
                  <div className="bg-zinc-900 p-6 rounded-xl overflow-x-auto text-sm text-zinc-300 font-mono leading-relaxed border border-zinc-800 shadow-inner">
                    1. Input File → File API / FileReader<br/>
                    2. Konversi ArrayBuffer → HTMLImageElement<br/>
                    3. Kalkulasi Matriks Berdasarkan Opsi (Baris & Kolom)<br/>
                    4. Iterasi potongan (Tile rendering):<br/>
                    &nbsp;&nbsp;&nbsp;a. Inisialisasi elemen &lt;canvas&gt; virtual<br/>
                    &nbsp;&nbsp;&nbsp;b. Atur resolusi (width, height) + over-sampling<br/>
                    &nbsp;&nbsp;&nbsp;c. Injeksi CSS Filter (Brightness/Contrast)<br/>
                    &nbsp;&nbsp;&nbsp;d. Render source via `ctx.drawImage()`<br/>
                    &nbsp;&nbsp;&nbsp;e. Eksekusi Matriks Konvolusi (Sharpening)<br/>
                    &nbsp;&nbsp;&nbsp;f. Injeksi &lt;text&gt; Watermark (posisi adaptif)<br/>
                    &nbsp;&nbsp;&nbsp;g. Ekspor Blob (PNG/JPEG via `canvas.toBlob`)<br/>
                    5. Render Blob UI menggunakan URL.createObjectURL
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'features' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-display font-bold">Fitur Utama</h2>
                
                <div className="space-y-8">
                  <div id="feat-slicer" className="scroll-mt-8 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                    <h3 className="text-xl font-bold font-display mb-3 text-zinc-900 dark:text-zinc-100">Smart Slicer</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Memotong gambar berdasarkan algoritma matriks presisi tinggi. Mendukung konfigurasi jumlah baris dan kolom yang fleksibel. Dilengkapi mode tumpang-tindih (Overlap) khusus untuk menciptakan ilusi *Carousel Seamless* pada unggahan multi-foto di Instagram.
                    </p>
                  </div>

                  <div id="feat-preview" className="scroll-mt-8 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                    <h3 className="text-xl font-bold font-display mb-3 text-zinc-900 dark:text-zinc-100">Live Interactive Preview</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Kanvas kerja utama memberikan representasi visual 1:1 (*pixel-perfect*) terhadap hasil akhir. Garis panduan (guidelines) merespons perubahan pengaturan secara *real-time* sebelum pemrosesan akhir dimulai.
                    </p>
                  </div>

                  <div id="feat-color" className="scroll-mt-8 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                    <h3 className="text-xl font-bold font-display mb-3 text-zinc-900 dark:text-zinc-100">Real-time Color Engine</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Manipulasi filter tingkat lanjut yang dieksekusi langsung pada piksel kanvas. Memungkinkan pengguna mengatur kecerahan, kontras, saturasi, serta menerapkan penajaman gambar (*Sharpening Convolution Matrix*) otomatis untuk melawan algoritma kompresi media sosial.
                    </p>
                  </div>

                  <div id="feat-watermark" className="scroll-mt-8 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                    <h3 className="text-xl font-bold font-display mb-3 text-zinc-900 dark:text-zinc-100">Watermark System</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Integrasi penanda air (*watermark*) kustom secara dinamis. Mendukung gaya kontur kapsul elegan, kontrol transparansi (*opacity*), posisi relatif terhadap dimensi potongan, serta pengaturan ruang lingkup (*scope*)—apakah diterapkan pada semua panel potongan atau hanya pada bingkai terakhir.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'changelog' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-display font-bold">Riwayat Versi (Changelog)</h2>
                
                <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-3 md:ml-4 space-y-16 pb-8 mt-8">
                  
                  {/* v2.0 */}
                  <div id="changelog-v2" className="relative pl-10 scroll-mt-8">
                    <div className="absolute w-4 h-4 rounded-full bg-sky-500 -left-[9px] top-1.5 border-4 border-white dark:border-[#09090b]"></div>
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-2xl font-bold font-display text-zinc-900 dark:text-zinc-100">v2.0 Beta</h3>
                      <span className="px-2.5 py-1 rounded-md bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-400 text-[11px] font-bold tracking-wider uppercase">Pembaruan Besar</span>
                    </div>
                    <ul className="space-y-3 text-zinc-600 dark:text-zinc-400 leading-relaxed list-disc list-outside ml-4 marker:text-zinc-400">
                      <li>Perombakan total Antarmuka Pengguna (UI) menggunakan desain modern *Glassmorphism* dengan dukungan *responsive layout* penuh.</li>
                      <li>Penambahan **Landing Page Interaktif** dengan efek transisi 3D dan pendaran (*glow*) kursor pintar.</li>
                      <li>Dukungan **Native Dark Mode** (Mode Gelap) penuh yang sinkron dengan Tailwind CSS.</li>
                      <li>Penambahan fitur **Photobooth Modal** untuk integrasi pengambilan foto langsung via kamera perangkat.</li>
                      <li>Pengenalan **Halaman Dokumentasi Developer** (*Documentation Page*) ini dengan sistem routing ringan berbasis *state*.</li>
                      <li>Menu *Sidebar* (*left-panel*) sekarang interaktif dan dapat dilipat (*collapsible*) pada tampilan desktop.</li>
                    </ul>
                  </div>

                  {/* v1.5 */}
                  <div id="changelog-v15" className="relative pl-10 scroll-mt-8">
                    <div className="absolute w-4 h-4 rounded-full bg-zinc-300 dark:bg-zinc-700 -left-[9px] top-1.5 border-4 border-white dark:border-[#09090b]"></div>
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold font-display text-zinc-800 dark:text-zinc-200">v1.5 Update</h3>
                    </div>
                    <ul className="space-y-3 text-zinc-600 dark:text-zinc-400 leading-relaxed list-disc list-outside ml-4 marker:text-zinc-500">
                      <li>Penambahan fungsionalitas ekspor multi-file (*Bulk Export*) ke format `.zip` menggunakan dependensi eksternal ringan (JSZip).</li>
                      <li>Integrasi pembuat lembar pratinjau (*Feed Mockup Sheet*) instan.</li>
                      <li>Penyempurnaan modul *Watermark* dengan dukungan perhitungan persentase lebar kapsul otomatis.</li>
                    </ul>
                  </div>

                  {/* v1.0 */}
                  <div id="changelog-v1" className="relative pl-10 scroll-mt-8">
                    <div className="absolute w-4 h-4 rounded-full bg-zinc-300 dark:bg-zinc-700 -left-[9px] top-1.5 border-4 border-white dark:border-[#09090b]"></div>
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold font-display text-zinc-800 dark:text-zinc-200">v1.0 Rilis Awal</h3>
                    </div>
                    <ul className="space-y-3 text-zinc-600 dark:text-zinc-400 leading-relaxed list-disc list-outside ml-4 marker:text-zinc-500">
                      <li>Inti (*Engine*) algoritma pemotong matriks gambar menggunakan HTML5 Canvas selesai diimplementasikan.</li>
                      <li>Dukungan parameter input: baris (rows) dan kolom (columns).</li>
                      <li>Desain antarmuka monolitik versi perdana (klasik).</li>
                    </ul>
                  </div>

                </div>
              </div>
            )}

            {activeSection === 'api' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                  <h2 className="text-3xl font-display font-bold">Panduan Komponen & API</h2>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Arsitektur kode proyek memisahkan entitas *User Interface (UI)* dari *Core Engine Module*. Modularitas ini ditujukan untuk skalabilitas pemeliharaan dan pengujian jangka panjang.
                  </p>
                </div>
                
                <div className="space-y-10">
                  <div id="api-structure" className="scroll-mt-8 space-y-4">
                    <h3 className="text-xl font-bold font-display border-b border-zinc-200 dark:border-zinc-800 pb-2">Struktur Direktori</h3>
                    <div className="bg-zinc-900 text-zinc-300 p-6 rounded-xl font-mono text-sm leading-relaxed border border-zinc-800 shadow-inner overflow-x-auto">
<pre>{`src/
├── components/          # Lapisan Presentasi (React UI)
│   ├── Sidebar/         # Modul panel kontrol opsi
│   ├── Workspace/       # Area canvas & galeri responsif
│   └── ...              # Reusable modals, Navigasi
├── utils/               # Modul Core Engine (Pure JS)
│   ├── splitter.js      # Pemroses manipulasi Canvas
│   └── exporter.js      # Utilitas unduhan arsip
├── App.jsx              # Master Controller & State Manager
├── index.css            # Variabel Desain Sistem & Tailwind
`}</pre>
                    </div>
                  </div>

                  <div id="api-splitter" className="scroll-mt-8 space-y-4">
                    <h3 className="text-xl font-bold font-display border-b border-zinc-200 dark:border-zinc-800 pb-2">Modul `splitter.js`</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-2">Fungsi asinkron yang bertanggung jawab atas proses dekonstruksi gambar dan kalkulasi matriks filter ke elemen virtual HTML5 Canvas.</p>
                    <div className="bg-zinc-900 text-zinc-300 p-6 rounded-xl font-mono text-sm leading-relaxed border border-zinc-800 shadow-inner overflow-x-auto">
<pre className="text-sky-400">{`export const sliceTiles = async (imageElement, options) => {
  /*
   * Mengembalikan: Array of Blob/URL Objects
   * Parameter Input:
   *  - imageElement: Instance HTMLImageElement murni
   *  - options: Object mapping (rows, cols, filter configs)
   */
}`}</pre>
                    </div>
                  </div>

                  <div id="api-state" className="scroll-mt-8 space-y-4">
                    <h3 className="text-xl font-bold font-display border-b border-zinc-200 dark:border-zinc-800 pb-2">State Management Terpusat</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-2">Mengurangi kompleksitas dependensi pustaka luar dengan menggunakan struktur *single object state* pada hierarki teratas (`App.jsx`).</p>
                    <div className="bg-zinc-900 text-zinc-300 p-6 rounded-xl font-mono text-sm leading-relaxed border border-zinc-800 shadow-inner overflow-x-auto">
<pre className="text-purple-400">{`const [options, setOptions] = useState({
  cols: 3, 
  rows: 3,
  brightness: 0,
  watermarkEnabled: false,
  // ... beserta 20+ pasang konfigurasi lainnya
});`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </main>
      </div>
    </div>
  );
}

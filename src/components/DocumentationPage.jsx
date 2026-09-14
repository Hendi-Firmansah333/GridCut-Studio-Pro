import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, ChevronDown, ChevronRight, Sun, Moon, CheckCircle2, Terminal, Info, Lightbulb, Code, Layout, Cpu, History, Box, Settings } from 'lucide-react';

const SECTIONS = [
  { 
    id: 'intro', 
    title: 'Pengantar', 
    icon: <BookOpen size={16} />,
    subItems: [
      { id: 'intro-philosophy', title: 'Filosofi Desain' },
      { id: 'intro-values', title: 'Nilai Utama' }
    ] 
  },
  { 
    id: 'tech', 
    title: 'Teknologi & Arsitektur', 
    icon: <Cpu size={16} />,
    subItems: [
      { id: 'tech-stack', title: 'Stack Frontend' },
      { id: 'tech-workflow', title: 'Alur Kerja (Workflow)' }
    ] 
  },
  { 
    id: 'features', 
    title: 'Fitur Utama', 
    icon: <Layout size={16} />,
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
    icon: <History size={16} />,
    subItems: [
      { id: 'changelog-v2', title: 'v2.0 Beta' },
      { id: 'changelog-v15', title: 'v1.5 Update' },
      { id: 'changelog-v1', title: 'v1.0 Rilis Awal' }
    ] 
  },
  { 
    id: 'api', 
    title: 'Panduan Komponen', 
    icon: <Code size={16} />,
    subItems: [
      { id: 'api-structure', title: 'Struktur Direktori' },
      { id: 'api-splitter', title: 'Modul Slicer (utils)' },
      { id: 'api-state', title: 'Tabel State Management' }
    ] 
  },
];

const CodeBlock = ({ code, language = 'javascript', title = '' }) => (
  <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-[#0d1117] my-4 shadow-sm">
    <div className="flex items-center justify-between px-4 py-2 bg-zinc-100/50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
        </div>
        {title && <span className="ml-2 text-xs font-mono text-zinc-500">{title}</span>}
      </div>
      <Terminal size={14} className="text-zinc-500" />
    </div>
    <div className="p-4 overflow-x-auto text-[13px] font-mono leading-loose">
      {code}
    </div>
  </div>
);

const Callout = ({ type = 'info', title, children }) => {
  const styles = {
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/50 text-blue-800 dark:text-blue-300',
    tip: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/50 text-amber-800 dark:text-amber-300'
  };
  
  const icons = {
    info: <Info size={18} className="text-blue-500 dark:text-blue-400" />,
    tip: <Lightbulb size={18} className="text-amber-500 dark:text-amber-400" />
  };

  return (
    <div className={`flex gap-3 p-4 rounded-xl border ${styles[type]} my-4`}>
      <div className="shrink-0 mt-0.5">{icons[type]}</div>
      <div>
        {title && <h5 className="font-bold mb-1">{title}</h5>}
        <div className="text-sm opacity-90 leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

export default function DocumentationPage({ theme, toggleTheme, onBack }) {
  const [activeSection, setActiveSection] = useState('intro');
  const [expandedSections, setExpandedSections] = useState({ intro: true, api: true });
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
    
    const el = document.getElementById(subId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
        <div className="flex items-center gap-2">
          <a href="https://github.com/Hendi-Firmansah333/GridCut-Studio-Pro" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            <span className="hidden sm:inline font-bold">GitHub</span>
          </a>
          <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1"></div>
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
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-[14px] transition-all ${
                      isActive 
                        ? 'font-bold text-zinc-900 dark:text-zinc-50' 
                        : 'font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/30'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={isActive ? 'text-sky-500' : 'text-zinc-400'}>{section.icon}</span>
                      <span>{section.title}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown size={16} className="text-zinc-400" />
                    ) : (
                      <ChevronRight size={16} className="text-zinc-400" />
                    )}
                  </button>
                  
                  {/* Dropdown Sub Items */}
                  <div 
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: isExpanded ? '400px' : '0px',
                      opacity: isExpanded ? 1 : 0,
                      marginTop: isExpanded ? '0.25rem' : '0px'
                    }}
                  >
                    <div className="pl-9 pr-2 py-1 space-y-1">
                      {section.subItems.map(sub => {
                        const isSubActive = activeSub === sub.id;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => handleSubClick(section.id, sub.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-colors ${
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
              );
            })}
          </nav>
        </aside>

        {/* Content Area */}
        <main id="docs-main-scroll" className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-12 scroll-smooth">
          <div className="max-w-3xl mx-auto pb-32">
            
            {/* ---------------- INTRO ---------------- */}
            {activeSection === 'intro' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <Lightbulb size={14} /> Dokumen Resmi
                  </div>
                  <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-zinc-900 dark:text-white">
                    Pengantar GridCut Pro
                  </h2>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                    GridCut Studio Pro adalah aplikasi web modern berbasis <strong className="font-semibold text-zinc-900 dark:text-zinc-200">Client-Side Rendering (CSR)</strong> yang dirancang untuk memotong dan memproses gambar menjadi grid Instagram, carousel panorama, dan format sosial media lainnya secara presisi, interaktif, dan super cepat.
                  </p>
                </div>
                
                <Callout type="tip" title="Kenapa Client-Side?">
                  Dengan mengeksekusi semua manipulasi piksel di dalam memori browser, pengguna terbebas dari masalah latensi jaringan, kuota upload, dan ancaman privasi data. Server kami tidak pernah melihat foto Anda.
                </Callout>

                <div id="intro-philosophy" className="scroll-mt-8 space-y-4">
                  <h3 className="text-2xl font-bold font-display border-b border-zinc-200 dark:border-zinc-800 pb-2 flex items-center gap-2">
                    <Box className="text-zinc-400" size={20} /> Filosofi Desain
                  </h3>
                  <div className="prose prose-zinc dark:prose-invert">
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Berbeda dengan layanan pemotong foto tradisional yang memerlukan proses upload-download ke server, GridCut Pro memproses setiap piksel gambar secara langsung di dalam memori browser pengguna. Pendekatan ini menghasilkan arsitektur yang kami sebut <em>"Zero-Latency Editing"</em>.
                    </p>
                  </div>
                </div>

                <div id="intro-values" className="scroll-mt-8 space-y-4">
                  <h3 className="text-2xl font-bold font-display border-b border-zinc-200 dark:border-zinc-800 pb-2">Nilai Utama (Core Values)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {[
                      { t: 'Pemrosesan Instan tanpa Loading', d: 'Semua komputasi terjadi pada thread lokal.' },
                      { t: 'Privasi Mutlak (No Uploads)', d: 'File gambar tidak pernah meninggalkan perangkat Anda.' },
                      { t: 'Resolusi Maksimal', d: 'Dukungan over-sampling untuk menjaga ketajaman resolusi asli.' },
                      { t: 'Antarmuka Elegan & Responsif', d: 'Dibangun dengan prinsip desain modern dan konsisten.' }
                    ].map((val, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
                        <CheckCircle2 size={24} className="text-sky-500 shrink-0" />
                        <div>
                          <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 mb-1">{val.t}</h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{val.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ---------------- TECH ---------------- */}
            {activeSection === 'tech' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                  <h2 className="text-4xl font-display font-bold tracking-tight">Teknologi & Arsitektur</h2>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Arsitektur aplikasi ini mengombinasikan React murni dengan kekuatan HTML5 Canvas API untuk mencapai keseimbangan performa rendering tinggi.
                  </p>
                </div>

                <div id="tech-stack" className="scroll-mt-8 space-y-4">
                  <h3 className="text-2xl font-bold font-display border-b border-zinc-200 dark:border-zinc-800 pb-2">Stack Frontend</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all hover:border-sky-500/50 hover:shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
                        <Code size={20} />
                      </div>
                      <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">React 19 & Vite</h4>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Library UI utama dan bundler. Menggunakan Hooks (useState, useEffect, useRef) untuk reaktivitas super cepat tanpa reload halaman.</p>
                    </div>
                    <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all hover:border-sky-500/50 hover:shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center text-sky-500 mb-4">
                        <Layout size={20} />
                      </div>
                      <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">Tailwind CSS v3</h4>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Sistem desain berbasis utilitas untuk layout responsif, dark mode native, dan transisi animasi kompleks (Glassmorphism).</p>
                    </div>
                  </div>
                </div>

                <Callout type="info" title="Keamanan Memori">
                  Pemrosesan gambar resolusi tinggi dapat memakan RAM yang signifikan. GridCut Pro dilengkapi algoritma <code className="text-xs bg-blue-100 dark:bg-blue-900/50 px-1.5 py-0.5 rounded text-blue-800 dark:text-blue-300">garbage collection</code> manual untuk menghapus referensi URL.createObjectURL() guna mencegah memory leak.
                </Callout>

                <div id="tech-workflow" className="scroll-mt-8 space-y-4 pt-4">
                  <h3 className="text-2xl font-bold font-display border-b border-zinc-200 dark:border-zinc-800 pb-2">Alur Kerja (Workflow) Engine Slicer</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">Urutan siklus hidup (lifecycle) manipulasi gambar mulai dari pengguna mengunggah foto hingga mengunduh hasil potongan.</p>
                  
                  <CodeBlock 
                    title="Processing Pipeline"
                    code={
                      <pre className="text-zinc-300">
                        <span className="text-zinc-500">// 1. Akuisisi Gambar</span><br/>
                        <span className="text-blue-400">Input File</span> → File API / FileReader<br/>
                        <br/>
                        <span className="text-zinc-500">// 2. Inisialisasi Memori</span><br/>
                        <span className="text-blue-400">ArrayBuffer</span> → HTMLImageElement (Off-screen)<br/>
                        <br/>
                        <span className="text-zinc-500">// 3. Kalkulasi Matriks & Potongan (Tile rendering loop)</span><br/>
                        <span className="text-purple-400">for</span> (let y = <span className="text-orange-400">0</span>; y &lt; rows; y++) {'{'}<br/>
                        &nbsp;&nbsp;<span className="text-purple-400">for</span> (let x = <span className="text-orange-400">0</span>; x &lt; cols; x++) {'{'}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">// a. Buat elemen &lt;canvas&gt; virtual</span><br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">// b. Terapkan CSS Filter (Brightness/Contrast) via ctx.filter</span><br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">// c. Render koordinat gambar via ctx.drawImage()</span><br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">// d. Injeksi &lt;text&gt; Watermark jika diaktifkan</span><br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">// e. Ekspor Blob ke ObjectURL</span><br/>
                        &nbsp;&nbsp;{'}'}<br/>
                        {'}'}<br/>
                        <br/>
                        <span className="text-zinc-500">// 4. Render ke UI Workspace</span>
                      </pre>
                    }
                  />
                </div>
              </div>
            )}

            {/* ---------------- FEATURES ---------------- */}
            {activeSection === 'features' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                  <h2 className="text-4xl font-display font-bold tracking-tight">Fitur Utama</h2>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Eksplorasi kemampuan teknis dari instrumen yang tersedia di dalam GridCut Studio Pro.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div id="feat-slicer" className="scroll-mt-8 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all hover:border-sky-500/30">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-sky-50 dark:bg-sky-500/10 rounded-lg text-sky-500"><Layout size={20} /></div>
                      <h3 className="text-xl font-bold font-display text-zinc-900 dark:text-zinc-100">Smart Slicer & Overlap</h3>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Algoritma matriks pemotongan yang fleksibel. Tidak hanya memotong lurus secara presisi, tetapi juga mendukung <strong>mode tumpang-tindih (Overlap)</strong>. Fitur overlap ini sengaja dirancang untuk menciptakan ilusi transisi "seamless" ketika gambar diunggah sebagai Carousel di Instagram.
                    </p>
                  </div>

                  <div id="feat-preview" className="scroll-mt-8 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all hover:border-sky-500/30">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-50 dark:bg-purple-500/10 rounded-lg text-purple-500"><Info size={20} /></div>
                      <h3 className="text-xl font-bold font-display text-zinc-900 dark:text-zinc-100">Live Interactive Preview</h3>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Setiap kali pengguna menggeser tuas (*slider*) konfigurasi, garis panduan (guidelines) di Workspace merespons dan menggambar ulang batas potong secara seketika (*real-time*). Anda selalu melihat representasi 1:1 terhadap hasil akhirnya.
                    </p>
                  </div>
                  
                  {/* Lainnya bisa ditambahkan */}
                </div>
              </div>
            )}

            {/* ---------------- CHANGELOG ---------------- */}
            {activeSection === 'changelog' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-4xl font-display font-bold tracking-tight">Riwayat Versi (Changelog)</h2>
                
                <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-3 md:ml-4 space-y-16 pb-8 mt-12">
                  
                  {/* v2.0 */}
                  <div id="changelog-v2" className="relative pl-10 scroll-mt-8">
                    <div className="absolute w-5 h-5 rounded-full bg-sky-500 -left-[11px] top-1 border-4 border-white dark:border-[#09090b] shadow-sm"></div>
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold font-display text-zinc-900 dark:text-zinc-100">v2.0 Beta</h3>
                      <span className="px-2.5 py-1 rounded-md bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-400 text-[11px] font-bold tracking-wider uppercase">Pembaruan Besar</span>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                      <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed list-disc list-outside ml-4 marker:text-zinc-400">
                        <li><strong className="text-zinc-900 dark:text-zinc-200">Perombakan total UI:</strong> Desain modern <em>Glassmorphism</em>, panel sidebar lipat, dan responsivitas seluler tingkat lanjut.</li>
                        <li><strong className="text-zinc-900 dark:text-zinc-200">Native Dark Mode:</strong> Pergantian tema mulus tersinkronisasi via Tailwind CSS.</li>
                        <li><strong className="text-zinc-900 dark:text-zinc-200">Photobooth Modal:</strong> Ambil foto langsung melalui akses Webcam/Kamera perangkat tanpa perlu aplikasi kamera luar.</li>
                        <li><strong className="text-zinc-900 dark:text-zinc-200">Dokumentasi Terintegrasi:</strong> Menambahkan halaman dokumentasi internal (halaman ini) berbasis state router.</li>
                      </ul>
                    </div>
                  </div>

                  {/* v1.5 */}
                  <div id="changelog-v15" className="relative pl-10 scroll-mt-8">
                    <div className="absolute w-4 h-4 rounded-full bg-zinc-300 dark:bg-zinc-700 -left-[9px] top-1.5 border-4 border-white dark:border-[#09090b]"></div>
                    <h3 className="text-xl font-bold font-display text-zinc-800 dark:text-zinc-200 mb-3">v1.5 Update</h3>
                    <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed list-disc list-outside ml-4 marker:text-zinc-500">
                      <li>Fitur Ekspor Multi-file (Bulk Export) ke `.zip` via integrasi eksternal JSZip.</li>
                      <li>Lembar pratinjau Mockup Feed instan (Preview Sheet).</li>
                      <li>Watermark kapsul dinamis dengan perhitungan posisi relatif.</li>
                    </ul>
                  </div>

                </div>
              </div>
            )}

            {/* ---------------- API ---------------- */}
            {activeSection === 'api' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                  <h2 className="text-4xl font-display font-bold tracking-tight">Panduan Komponen & API</h2>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                    Struktur internal dan referensi konfigurasi state aplikasi. Panduan ini ditujukan bagi developer yang ingin memperluas atau mengkustomisasi GridCut Studio.
                  </p>
                </div>
                
                <div className="space-y-12">
                  <div id="api-structure" className="scroll-mt-8 space-y-4">
                    <h3 className="text-2xl font-bold font-display border-b border-zinc-200 dark:border-zinc-800 pb-2">Struktur Direktori</h3>
                    <CodeBlock 
                      title="Tree Structure"
                      code={
                        <pre className="text-zinc-300">
src/<br/>
├── <span className="text-blue-300">components/</span>          <span className="text-zinc-500"># Lapisan Presentasi (React UI)</span><br/>
│   ├── <span className="text-blue-300">Sidebar/</span>         <span className="text-zinc-500"># Panel Kontrol (Filter, Export, Slicer)</span><br/>
│   ├── <span className="text-blue-300">Workspace/</span>       <span className="text-zinc-500"># Area Canvas Interaktif</span><br/>
│   └── ...              <span className="text-zinc-500"># Reusable modals, Header</span><br/>
├── <span className="text-blue-300">utils/</span>               <span className="text-zinc-500"># Modul Logika Core (Pure JS)</span><br/>
│   ├── <span className="text-green-300">splitter.js</span>      <span className="text-zinc-500"># Mesin dekonstruksi gambar Canvas</span><br/>
│   └── <span className="text-green-300">exporter.js</span>      <span className="text-zinc-500"># Utilitas ZIP download</span><br/>
├── <span className="text-amber-300">App.jsx</span>              <span className="text-zinc-500"># Master State Controller</span><br/>
├── <span className="text-pink-300">index.css</span>            <span className="text-zinc-500"># Desain Sistem Global & Tailwind</span><br/>
                        </pre>
                      }
                    />
                  </div>

                  <div id="api-splitter" className="scroll-mt-8 space-y-4">
                    <h3 className="text-2xl font-bold font-display border-b border-zinc-200 dark:border-zinc-800 pb-2">Modul <code className="text-sky-600 dark:text-sky-400 font-mono text-xl">splitter.js</code></h3>
                    <p className="text-zinc-600 dark:text-zinc-400">Fungsi utama yang membedah gambar murni menggunakan CanvasRenderingContext2D.</p>
                    
                    <CodeBlock 
                      title="src/utils/splitter.js"
                      code={
                        <pre className="text-zinc-300">
<span className="text-pink-400">export const</span> <span className="text-yellow-200">sliceTiles</span> = <span className="text-pink-400">async</span> (imageElement, options) {'=>'} {'{'}<br/>
&nbsp;&nbsp;<span className="text-zinc-500">/**<br/>
&nbsp;&nbsp; * @param {'{HTMLImageElement}'} imageElement - Objek gambar murni<br/>
&nbsp;&nbsp; * @param {'{Object}'} options - Properti konfigurasi (lihat tabel state di bawah)<br/>
&nbsp;&nbsp; * @returns {'{Promise<Array>}'} Resolves to array of ObjectURLs (Blob)<br/>
&nbsp;&nbsp; */</span><br/>
&nbsp;&nbsp;<br/>
&nbsp;&nbsp;<span className="text-purple-400">const</span> canvas = document.<span className="text-yellow-200">createElement</span>(<span className="text-green-300">'canvas'</span>);<br/>
&nbsp;&nbsp;<span className="text-purple-400">const</span> ctx = canvas.<span className="text-yellow-200">getContext</span>(<span className="text-green-300">'2d'</span>);<br/>
&nbsp;&nbsp;<span className="text-zinc-500">// ... kalkulasi matriks filter & pemotongan</span><br/>
{'}'}
                        </pre>
                      }
                    />
                  </div>

                  <div id="api-state" className="scroll-mt-8 space-y-4">
                    <h3 className="text-2xl font-bold font-display border-b border-zinc-200 dark:border-zinc-800 pb-2 flex items-center gap-2">
                      <Settings className="text-zinc-400" size={20} /> Konfigurasi State Terpusat
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      GridCut mengelola satu sumber kebenaran data <em>(Single Source of Truth)</em> di <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono">App.jsx</code> pada objek <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono">options</code>. Berikut parameter penting yang selalu dipantau:
                    </p>

                    <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 mt-6">
                      <table className="w-full text-left border-collapse text-sm">
                        <thead>
                          <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                            <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">Properti</th>
                            <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">Tipe Data</th>
                            <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">Default</th>
                            <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">Fungsi / Dampak</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                          <tr className="bg-white dark:bg-[#09090b] hover:bg-zinc-50 dark:hover:bg-zinc-900/30">
                            <td className="px-4 py-3 font-mono text-sky-600 dark:text-sky-400 font-medium">rows</td>
                            <td className="px-4 py-3 text-zinc-500 font-mono text-xs">Number</td>
                            <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">3</td>
                            <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Jumlah baris horizontal grid (Max 10).</td>
                          </tr>
                          <tr className="bg-white dark:bg-[#09090b] hover:bg-zinc-50 dark:hover:bg-zinc-900/30">
                            <td className="px-4 py-3 font-mono text-sky-600 dark:text-sky-400 font-medium">cols</td>
                            <td className="px-4 py-3 text-zinc-500 font-mono text-xs">Number</td>
                            <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">3</td>
                            <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Jumlah kolom vertikal grid (Max 10).</td>
                          </tr>
                          <tr className="bg-white dark:bg-[#09090b] hover:bg-zinc-50 dark:hover:bg-zinc-900/30">
                            <td className="px-4 py-3 font-mono text-sky-600 dark:text-sky-400 font-medium">brightness</td>
                            <td className="px-4 py-3 text-zinc-500 font-mono text-xs">Number</td>
                            <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">100</td>
                            <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Persentase kecerahan CSS Filter (0-200).</td>
                          </tr>
                          <tr className="bg-white dark:bg-[#09090b] hover:bg-zinc-50 dark:hover:bg-zinc-900/30">
                            <td className="px-4 py-3 font-mono text-sky-600 dark:text-sky-400 font-medium">watermarkText</td>
                            <td className="px-4 py-3 text-zinc-500 font-mono text-xs">String</td>
                            <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">"@username"</td>
                            <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Teks yang disematkan dalam kapsul watermark.</td>
                          </tr>
                          <tr className="bg-white dark:bg-[#09090b] hover:bg-zinc-50 dark:hover:bg-zinc-900/30">
                            <td className="px-4 py-3 font-mono text-sky-600 dark:text-sky-400 font-medium">watermarkScope</td>
                            <td className="px-4 py-3 text-zinc-500 font-mono text-xs">String</td>
                            <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">"last"</td>
                            <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Pilihan 'all' (semua frame) atau 'last' (frame terakhir saja).</td>
                          </tr>
                        </tbody>
                      </table>
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

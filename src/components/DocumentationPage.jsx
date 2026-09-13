import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Cpu, Layers, GitMerge, Terminal, Sun, Moon, CheckCircle2 } from 'lucide-react';

const SECTIONS = [
  { id: 'intro', title: 'Pengantar', icon: BookOpen },
  { id: 'tech', title: 'Teknologi & Arsitektur', icon: Cpu },
  { id: 'features', title: 'Fitur Utama', icon: Layers },
  { id: 'changelog', title: 'Riwayat Versi', icon: GitMerge },
  { id: 'api', title: 'Panduan Komponen', icon: Terminal },
];

export default function DocumentationPage({ theme, toggleTheme, onBack }) {
  const [activeSection, setActiveSection] = useState('intro');

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
            <BookOpen size={18} className="text-purple-500" />
            <span>Dokumentasi <span className="text-purple-600 dark:text-purple-400">Developer</span></span>
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
        <aside className="w-64 flex-shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 overflow-y-auto hidden md:block">
          <nav className="p-4 space-y-1">
            <div className="text-xs font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase mb-3 px-3 mt-2">Daftar Isi</div>
            {SECTIONS.map(section => {
              const isActive = activeSection === section.id;
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 shadow-sm' 
                      : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200'
                  }`}
                >
                  <Icon size={16} className={isActive ? '' : 'opacity-70'} />
                  {section.title}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-12 scroll-smooth">
          <div className="max-w-3xl mx-auto pb-24">
            
            {activeSection === 'intro' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-display font-bold">Pengantar GridCut Pro</h2>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    GridCut Studio Pro adalah aplikasi web modern berbasis *Client-Side Rendering (CSR)* yang dirancang untuk memotong dan memproses gambar menjadi grid Instagram, carousel panorama, dan format sosial media lainnya secara presisi, interaktif, dan super cepat.
                  </p>
                </div>
                
                <div className="p-6 rounded-2xl bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20">
                  <h3 className="text-lg font-bold text-purple-900 dark:text-purple-300 mb-2">Filosofi Desain</h3>
                  <p className="text-purple-800 dark:text-purple-200/80 leading-relaxed">
                    Berbeda dengan layanan pemotong foto tradisional yang memerlukan proses upload-download ke server, GridCut Pro memproses setiap piksel gambar secara langsung di dalam memori browser pengguna (Client-Side). Hal ini menjamin **100% privasi**, **nol-latency (tanpa delay)**, dan pengalaman yang instan.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold font-display border-b border-zinc-200 dark:border-zinc-800 pb-2">Nilai Utama (Core Values)</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Pemrosesan Instan tanpa Loading',
                      'Privasi Mutlak (No Server Uploads)',
                      'Resolusi Tinggi & Ketajaman Otomatis',
                      'Antarmuka Responsif & Elegan'
                    ].map((val, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                        <span className="text-zinc-700 dark:text-zinc-300">{val}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeSection === 'tech' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                  <h2 className="text-3xl font-display font-bold">Teknologi & Arsitektur</h2>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Aplikasi ini dibangun menggunakan tumpukan (stack) teknologi modern untuk mencapai keseimbangan antara performa rendering tinggi dan kenyamanan pengembangan (Developer Experience).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <h4 className="font-bold text-sky-600 dark:text-sky-400 mb-2">React 19</h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Library UI utama untuk reaktivitas state. Menggunakan Hooks (useState, useEffect, useRef) untuk mengelola data gambar tanpa me-render ulang seluruh halaman.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <h4 className="font-bold text-purple-600 dark:text-purple-400">Vite</h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Bundler super cepat yang menggantikan Webpack. Mendukung Hot Module Replacement (HMR) dan optimalisasi aset statis untuk produksi.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <h4 className="font-bold text-teal-600 dark:text-teal-400">Tailwind CSS</h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Utility-first CSS framework. Seluruh UI, Dark Mode, dan animasi transisi (fade, slide, pulse) diatur murni dari class HTML tanpa CSS terpisah berlebihan.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <h4 className="font-bold text-amber-600 dark:text-amber-400">HTML5 Canvas API</h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Engine utama untuk memotong (`drawImage`), memberikan filter warna (kecerahan, kontras), dan rendering teks *watermark* berkinerja tinggi.</p>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                  <h3 className="text-xl font-bold font-display">Alur Kerja (Workflow) Engine Slicer</h3>
                  <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-xl overflow-x-auto text-sm text-zinc-700 dark:text-zinc-300 font-mono leading-relaxed">
                    1. File input → File API / FileReader<br/>
                    2. Konversi ArrayBuffer → HTMLImageElement<br/>
                    3. Kalkulasi Matriks (Baris & Kolom)<br/>
                    4. Loop iterasi untuk setiap potongan (Tile):<br/>
                    &nbsp;&nbsp;&nbsp;a. Buat elemen &lt;canvas&gt; virtual di memori<br/>
                    &nbsp;&nbsp;&nbsp;b. Atur ukuran (width, height) + over-sampling (Upscale 2x/3x)<br/>
                    &nbsp;&nbsp;&nbsp;c. Terapkan filter CSS (Brightness/Contrast) ke context 2D<br/>
                    &nbsp;&nbsp;&nbsp;d. Render potongan gambar asli via `ctx.drawImage()`<br/>
                    &nbsp;&nbsp;&nbsp;e. Terapkan algoritma Sharpening (Konvolusi Matriks)<br/>
                    &nbsp;&nbsp;&nbsp;f. Render &lt;text&gt; Watermark jika aktif<br/>
                    &nbsp;&nbsp;&nbsp;g. Konversi akhir ke Blob (PNG/JPEG)<br/>
                    5. Hasil Blob dirender di UI sebagai URL.createObjectURL
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'features' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-display font-bold mb-6">Fitur Utama</h2>
                
                <div className="space-y-6">
                  <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-lg font-bold mb-2">✂️ Smart Slicer (Pemotong Pintar)</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
                      Memotong gambar berdasarkan jumlah kotak atau ukuran pixel spesifik. Dilengkapi mode tumpang-tindih (Overlap) untuk ilusi Carousel Seamless Instagram.
                    </p>
                  </div>

                  <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-lg font-bold mb-2">📸 Live Interactive Preview</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
                      Area kerja utama yang menampilkan garis potong interaktif di atas gambar asli Anda. Memberikan Anda gambaran visual 100% presisi sebelum dipotong.
                    </p>
                  </div>

                  <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-lg font-bold mb-2">✨ Real-time Color Engine & Sharpening</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
                      Tidak perlu software eksternal. Anda bisa mengatur kecerahan (Brightness), kontras, saturasi warna, hingga mempertajam (Sharpen) gambar agar hasil tidak pecah (blur) akibat kompresi Instagram.
                    </p>
                  </div>

                  <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-lg font-bold mb-2">©️ Watermark System</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
                      Sistem watermark dinamis dengan kustomisasi posisi, teks, font, hingga scope penempatan (hanya di potongan terakhir atau di seluruh potongan).
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'changelog' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-display font-bold mb-6">Riwayat Versi (Changelog)</h2>
                
                <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-3 md:ml-4 space-y-12 pb-8">
                  
                  {/* v2.0 */}
                  <div className="relative pl-8">
                    <div className="absolute w-4 h-4 rounded-full bg-purple-500 -left-[9px] top-1.5 border-4 border-white dark:border-[#09090b]"></div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold font-display">v2.0 Beta</h3>
                      <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 text-xs font-bold">Terbaru</span>
                    </div>
                    <p className="text-sm text-zinc-500 mb-4">Pembaruan Besar (Major Update) • Rilis Stabil</p>
                    <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm list-disc list-inside marker:text-zinc-400">
                      <li>Perombakan total Antarmuka Pengguna (UI) menggunakan desain modern, Glassmorphism, dan dukungan responsif penuh untuk *mobile*.</li>
                      <li>Penambahan **Landing Page** yang interaktif dengan efek transisi 3D dan Glow berbasis kursor.</li>
                      <li>Penambahan dukungan native **Dark Mode** penuh yang terintegrasi dengan konfigurasi Tailwind.</li>
                      <li>Fitur baru: **Photobooth Premium Modal** untuk menangkap gambar dari kamera / webcam.</li>
                      <li>Penambahan **Halaman Dokumentasi Developer** ini.</li>
                      <li>Pengoptimalan performa rendering kanvas dan efek filter warna secara real-time.</li>
                      <li>Fitur baru: Menu File Dropdown & Sidebar interaktif yang dapat dilipat (*collapsible*).</li>
                    </ul>
                  </div>

                  {/* v1.5 */}
                  <div className="relative pl-8">
                    <div className="absolute w-4 h-4 rounded-full bg-zinc-300 dark:bg-zinc-700 -left-[9px] top-1.5 border-4 border-white dark:border-[#09090b]"></div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold font-display text-zinc-700 dark:text-zinc-300">v1.5</h3>
                    </div>
                    <p className="text-sm text-zinc-500 mb-4">Fitur Tambahan Ekspor</p>
                    <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm list-disc list-inside marker:text-zinc-600">
                      <li>Penambahan fitur ekspor massal ke dalam format `.zip` menggunakan pustaka JSZip.</li>
                      <li>Dukungan pembuatan *Feed Mockup Sheet* (lembaran pratinjau grid instan).</li>
                      <li>Peningkatan sistem Watermark (dukungan transparansi dan gaya kapsul).</li>
                    </ul>
                  </div>

                  {/* v1.0 */}
                  <div className="relative pl-8">
                    <div className="absolute w-4 h-4 rounded-full bg-zinc-300 dark:bg-zinc-700 -left-[9px] top-1.5 border-4 border-white dark:border-[#09090b]"></div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold font-display text-zinc-700 dark:text-zinc-300">v1.0</h3>
                    </div>
                    <p className="text-sm text-zinc-500 mb-4">Rilis Publik Perdana</p>
                    <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm list-disc list-inside marker:text-zinc-600">
                      <li>Inti (Engine) pemotong gambar berbasis Canvas API selesai.</li>
                      <li>Kontrol dasar baris dan kolom.</li>
                      <li>Antarmuka klasik yang fungsional.</li>
                    </ul>
                  </div>

                </div>
              </div>
            )}

            {activeSection === 'api' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-display font-bold mb-6">Panduan Komponen & Modul API</h2>
                
                <div className="space-y-6">
                  <div className="prose prose-zinc dark:prose-invert max-w-none">
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Secara arsitektural, GridCut Pro memisahkan antara logika *User Interface (UI)* dengan *Core Engine*. Ini mempermudah pemeliharaan (maintenance) kode.
                    </p>
                    
                    <h3 className="text-xl font-bold mt-8 mb-4">1. Struktur Direktori Utama</h3>
                    <div className="bg-zinc-900 text-zinc-300 p-4 rounded-lg font-mono text-sm">
<pre>{`src/
├── components/          # Seluruh komponen React UI
│   ├── Sidebar/         # Komponen panel kontrol
│   ├── Workspace/       # Area canvas & galeri
│   └── ...              # Modal, Navbar, dll.
├── utils/               # Modul Core Engine
│   ├── splitter.js      # Logika pemotongan canvas
│   └── exporter.js      # Logika download ZIP/Mockup
├── App.jsx              # Routing State & Master State
├── index.css            # Tailwind & CSS Variables
`}</pre>
                    </div>

                    <h3 className="text-xl font-bold mt-8 mb-4">2. Modul `splitter.js`</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-2">Fungsi utama (Asynchronous) untuk mengeksekusi proses render ke elemen Canvas virtual.</p>
                    <div className="bg-zinc-900 text-zinc-300 p-4 rounded-lg font-mono text-sm overflow-x-auto">
<pre>{`export const sliceTiles = async (imageElement, options) => {
  // Returns: Array of Blob/URL objects
  // Parameter:
  // - imageElement: HTMLImageElement (Gambar asli)
  // - options: Object (Berisi rows, cols, filter, watermark, dll)
}`}</pre>
                    </div>

                    <h3 className="text-xl font-bold mt-8 mb-4">3. State Management (App.jsx)</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-2">Aplikasi menghindari penggunaan Redux/Zustand karena scope-nya yang terfokus. Seluruh konfigurasi pengguna disimpan dalam single object state <code>options</code>.</p>
                    <div className="bg-zinc-900 text-zinc-300 p-4 rounded-lg font-mono text-sm overflow-x-auto">
<pre>{`const [options, setOptions] = useState({
  cols: 3, rows: 3,
  brightness: 0,
  watermarkEnabled: false,
  // ... and 20+ other config keys
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

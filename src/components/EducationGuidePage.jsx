import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Sun, Moon, UploadCloud, Sliders, Palette, Eye, Download, CheckCircle2, PlayCircle, Image as ImageIcon } from 'lucide-react';

export default function EducationGuidePage({ theme, toggleTheme, onBack }) {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Upload & Pilih Gambar",
      icon: <UploadCloud size={24} />,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-500/10",
      borderColor: "border-blue-200 dark:border-blue-800",
      content: (
        <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p>
            Langkah pertama adalah memasukkan gambar yang ingin Anda potong. Anda dapat melakukan *Drag & Drop* (tarik dan lepas) file gambar langsung ke area **Workspace**, atau menekan tombol **Pilih Foto Sekarang** pada panel sebelah kiri.
          </p>
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex items-start gap-3">
            <InfoIcon className="text-blue-500 shrink-0 mt-0.5" />
            <p className="text-sm">
              Kami merekomendasikan gambar dengan resolusi tinggi (minimal 1080px) dengan format JPG, PNG, atau WebP. Gambar tidak akan diunggah ke server mana pun sehingga privasi Anda terjamin 100%.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Tentukan Format Potongan (Grid / Carousel)",
      icon: <Sliders size={24} />,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-500/10",
      borderColor: "border-indigo-200 dark:border-indigo-800",
      content: (
        <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p>
            Gunakan panel **Preset Cepat** untuk memilih format populer secara instan, seperti <em>Instagram Grid 3x3</em> atau <em>Panorama Carousel 3x1</em>. 
          </p>
          <p>
            Jika Anda membutuhkan ukuran spesifik, buka bagian **Kontrol Potongan (Slicer)**. Di sana Anda bisa mengatur jumlah <strong>Baris (Rows)</strong> dan <strong>Kolom (Cols)</strong> secara manual. Garis pandu (guidelines) akan langsung menyesuaikan bentuknya di layar utama.
          </p>
        </div>
      )
    },
    {
      id: 3,
      title: "Koreksi Warna & Watermark (Opsional)",
      icon: <Palette size={24} />,
      color: "text-pink-500",
      bgColor: "bg-pink-50 dark:bg-pink-500/10",
      borderColor: "border-pink-200 dark:border-pink-800",
      content: (
        <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p>
            Sebelum memotong, Anda bisa meningkatkan kualitas visual gambar menggunakan **Efek Warna & Filter**. Anda dapat mengatur tingkat kecerahan, kontras, dan ketajaman (sharpening) untuk melawan kompresi media sosial.
          </p>
          <p>
            Anda juga dapat menyematkan nama atau akun Anda melalui menu **Pengaturan Watermark**. Watermark akan ditempatkan secara elegan dan dinamis pada potongan terakhir atau di semua potongan sesuai keinginan Anda.
          </p>
        </div>
      )
    },
    {
      id: 4,
      title: "Review & Ekspor Hasil",
      icon: <Download size={24} />,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-500/10",
      borderColor: "border-emerald-200 dark:border-emerald-800",
      content: (
        <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p>
            Setelah puas dengan tampilan pratinjau, gulir ke bawah pada panel kiri dan klik tombol hitam <strong>Potong Sekarang!</strong>.
          </p>
          <ul className="list-disc list-outside ml-5 space-y-2 marker:text-zinc-400">
            <li>Aplikasi akan langsung memecah gambar Anda dan memindahkannya ke tab <strong>Galeri & Download</strong>.</li>
            <li>Anda dapat men-download semua potongan sekaligus dalam satu file <strong>.ZIP</strong>.</li>
            <li>Atau, Anda bisa menyalin (Copy) satu per satu potongan langsung ke Clipboard untuk di-paste ke media sosial Anda tanpa memenuhi penyimpanan perangkat.</li>
          </ul>
        </div>
      )
    }
  ];

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
            <PlayCircle size={20} className="text-sky-500" />
            <span>Panduan Edukasi</span>
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

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-12 scroll-smooth">
        <div className="max-w-4xl mx-auto pb-32">
          
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-50 dark:bg-sky-500/10 text-sky-500 mb-6 shadow-sm border border-sky-100 dark:border-sky-500/20">
              <BookOpen size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
              Cara Menggunakan GridCut Pro
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Pelajari cara memotong, mengoptimalkan, dan mengunduh foto Anda untuk media sosial dalam 4 langkah mudah dan cepat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            
            {/* Step Navigation Sidebar (Desktop) */}
            <div className="md:col-span-4 hidden md:block">
              <div className="sticky top-8 p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                <h3 className="text-xs font-bold tracking-wider text-zinc-500 uppercase mb-6">Navigasi Langkah</h3>
                <nav className="space-y-2">
                  {steps.map((step) => (
                    <button
                      key={step.id}
                      onClick={() => setActiveStep(step.id)}
                      className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all text-left ${
                        activeStep === step.id 
                          ? 'bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200 dark:border-zinc-700' 
                          : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                        activeStep === step.id ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'bg-zinc-200 dark:bg-zinc-800'
                      }`}>
                        {step.id}
                      </div>
                      <span className={`font-semibold text-sm ${activeStep === step.id ? 'text-zinc-900 dark:text-zinc-100' : ''}`}>
                        {step.title}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Step Content */}
            <div className="md:col-span-8">
              {steps.map((step) => (
                <div 
                  key={step.id} 
                  className={`transition-all duration-500 ${activeStep === step.id ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 translate-y-4'}`}
                >
                  <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm font-bold text-zinc-500 tracking-wider">
                    LANGKAH {step.id} DARI {steps.length}
                  </div>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-4 rounded-2xl ${step.bgColor} ${step.color} border ${step.borderColor}`}>
                      {step.icon}
                    </div>
                    <h2 className="text-3xl font-display font-bold">{step.title}</h2>
                  </div>

                  <div className="prose prose-lg prose-zinc dark:prose-invert">
                    {step.content}
                  </div>

                  {/* Mobile Navigation Controls */}
                  <div className="mt-12 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-6 md:hidden">
                    <button 
                      onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                      disabled={activeStep === 1}
                      className="px-4 py-2 rounded-lg font-medium text-sm text-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300"
                    >
                      Sebelumnya
                    </button>
                    <button 
                      onClick={() => setActiveStep(prev => Math.min(steps.length, prev + 1))}
                      disabled={activeStep === steps.length}
                      className="px-4 py-2 rounded-lg font-bold text-sm bg-zinc-900 text-white disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-zinc-900"
                    >
                      Selanjutnya
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function InfoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

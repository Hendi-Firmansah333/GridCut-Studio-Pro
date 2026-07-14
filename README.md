# ✨ GridCut Studio Pro — Modern Instagram Feed Slicer & Super HD Upscaling Engine

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Tailwind / Glassmorphism](https://img.shields.io/badge/Styling-Glassmorphism_UI-00f2fe?style=for-the-badge)](/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](/)

**GridCut Studio Pro** adalah aplikasi web modern bereputasi tinggi yang dirancang untuk memotong (*slice/cut*) gambar untuk keperluan media sosial seperti **Instagram Feed Grid (3×3)**, **Panorama Carousel (3×1)**, **Banner (3×2)**, hingga **Stories Sequence**. Dilengkapi dengan mesin **Super HD Resolution Upscaling & Anti-Blur Edge Sharpening** untuk memastikan foto tidak pecah atau blur saat diunggah!

---

## 🔥 Fitur Unggulan

### 1. 🌟 Super HD Resolution Upscaling & Anti-Blur Sharpening
- **Upscaling 2x / 3x / 4x / Auto IG Standard**: Meningkatkan resolusi piksel potongan gambar secara otomatis hingga mencapai standar HD (`1080×1080px` atau 4K).
- **AI-Style Convolution Sharpening Kernel**: Mempertajam pinggiran (*edges*) gambar yang telah diperbesar agar tidak blur dan tetap renyah (*crisp*).
- **Intensitas Ketajaman yang Dapat Diatur**: Slider interaktif untuk memilih tingkat ketajaman (*Halus*, *Optimal*, *Ekstra Tajam*).

### 2. ⚡ Preset Cepat 1-Klik
- **IG Grid (3×3)** — 9 foto untuk Feed Banner besar di profil Instagram.
- **IG Banner (3×2)** — 6 foto untuk Feed berseri.
- **IG Panorama (3×1)** — 3 foto bersambung tanpa putus (*seamless row*).
- **Carousel (4×1)** — 4 slide untuk postingan geser horizontal.
- **Stories Sequence** & **Custom Split** (Bebas atur jumlah baris, kolom, atau ukuran piksel pasti).

### 3. 📱 Mode Urutan Upload Instagram (Reverse 9→1)
- Penomoran otomatis dari **#9 ke #1** (kanan bawah ke kiri atas).
- Menyertakan file teks panduan `README_URUTAN_UPLOAD_IG.txt` di dalam paket ZIP agar pengguna tidak keliru saat mengunggah ke Instagram.

### 4. 🎨 Desain Premium Dark Glassmorphism
- Tema **Dark Mode / Light Mode** dengan tombol *switch* interaktif.
- Live Canvas interactive preview lengkap dengan garis putus-putus neon (`#00f2fe`) serta indikator dimensi *real-time*.

### 5. 📦 Ekspor Masal Cepat & Mudah
- **Download Semua (ZIP)** via `JSZip`.
- **Salin ke Clipboard** (`navigator.clipboard`) langsung tanpa perlu mendownload file.
- Pilihan format output: **PNG (Transparan)**, **JPG (Ringan)**, atau **WebP (Super Cepat)**.

---

## 🛠️ Teknologi yang Digunakan
- **Core Framework**: React 18 + Vite
- **Icons**: Lucide-React
- **Batch Archiving**: JSZip
- **Styling**: Pure CSS3 Custom Properties (Design System, Glassmorphism, Responsive Grid)

---

## 🚀 Cara Menjalankan Secara Lokal (*Quick Start*)

1. **Clone Repositori:**
   ```bash
   git clone https://github.com/username-anda/gridcut-studio-pro.git
   cd gridcut-studio-pro
   ```

2. **Install Dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan Server Development:**
   ```bash
   npm run dev
   ```
   Buka browser Anda di `http://localhost:5173/`.

4. **Build untuk Produksi (*Deploy*):**
   ```bash
   npm run build
   ```

---

## 📄 Lisensi
Proyek ini dilisensikan di bawah lisensi MIT. Bebas digunakan dan dimodifikasi!

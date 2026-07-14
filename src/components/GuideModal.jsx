import React from 'react';
import { HelpCircle, X, ArrowUpRight } from 'lucide-react';

export default function GuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <HelpCircle className="text-cyan-400" size={22} style={{ color: '#00f2fe' }} />
            <h3>Panduan Rahasia Upload Grid Instagram</h3>
          </div>
          <button className="btn btn-icon-sm btn-ghost" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="guide-item">
            <h4>🚨 Kenapa Urutan Upload Sangat Penting?</h4>
            <p>
              Instagram menampilkan foto terbaru di <strong>pojok kiri atas</strong>. 
              Jika Anda mengunggah foto potongan nomor 1 terlebih dahulu, urutan grid Anda di profil akan terbalik total!
            </p>
          </div>

          <div className="guide-item">
            <h4>💡 Aturan Emas: Upload dari Nomor Terbesar (#9 ke #1)</h4>
            <p>
              GridCut Studio Pro secara otomatis menomori potongan Anda agar sesuai dengan urutan upload yang benar.
            </p>
            
            <div className="ig-mockup-grid">
              <div className="mockup-tile badge-last">#1 (Post Terakhir)</div>
              <div className="mockup-tile">#2</div>
              <div className="mockup-tile">#3</div>
              <div className="mockup-tile">#4</div>
              <div className="mockup-tile">#5</div>
              <div className="mockup-tile">#6</div>
              <div className="mockup-tile">#7</div>
              <div className="mockup-tile">#8</div>
              <div className="mockup-tile badge-first">#9 (Post Duluan!)</div>
            </div>
          </div>

          <div className="guide-item">
            <h4>📌 Langkah Mudah Mengunggah:</h4>
            <ol className="guide-list">
              <li>Potong foto Anda menggunakan preset <strong>IG Grid 3×3</strong>.</li>
              <li>Unduh file ZIP atau simpan satu per satu dari tab Galeri.</li>
              <li>Buka Instagram di HP Anda, lalu upload mulai dari foto bernomor <strong>#9</strong> terlebih dahulu.</li>
              <li>Lanjutkan upload berturut-turut sampai foto bernomor <strong>#1</strong>.</li>
              <li>Lihat profil Instagram Anda — grid besar akan tampil sempurna! ✨</li>
            </ol>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary w-full" onClick={onClose}>
            <span>Saya Paham, Siap Potong Gambar!</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

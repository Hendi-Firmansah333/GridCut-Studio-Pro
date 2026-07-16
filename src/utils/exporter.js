/**
 * GridCut Studio Pro — Exporter Engine (ES6 Module for React)
 * Handles JSZip batch archiving, direct file download, clipboard copy, and Mockup Feed Sheet generation.
 */

import JSZip from 'jszip';

export async function downloadAllZip(tiles, options = {}, onProgress = () => {}) {
  if (!tiles || tiles.length === 0) return false;

  onProgress('Mempersiapkan file ZIP...');
  const zip = new JSZip();
  const folder = zip.folder('GridCut_Studio_Export');

  for (const tile of tiles) {
    if (tile.blob) {
      folder.file(tile.filename, tile.blob);
    }
  }

  if (options.igOrder && tiles.length > 1) {
    let guideText = `=========================================================\n`;
    guideText += `   GRIDCUT STUDIO PRO — PANDUAN UPLOAD INSTAGRAM FEED    \n`;
    guideText += `=========================================================\n\n`;
    guideText += `Agar tampilan grid di profil Instagram Anda pas dan tidak terbalik,\n`;
    guideText += `Anda WAJIB mengunggah foto secara berurutan mulai dari nomor TERBESAR ke TERKECIL.\n\n`;
    guideText += `DAFTAR URUTAN UPLOAD ANDA:\n`;
    guideText += `---------------------------------------------------------\n`;

    const sorted = [...tiles].sort((a, b) => b.igNumber - a.igNumber);
    sorted.forEach((item, idx) => {
      guideText += `${idx + 1}. Upload duluan : [ ${item.filename} ] (Post #${item.igNumber} - Dimensi: ${item.width}x${item.height}px)\n`;
    });

    guideText += `---------------------------------------------------------\n`;
    guideText += `Tips: Foto nomor #1 akan menjadi post terakhir yang Anda upload,\n`;
    guideText += `sehingga muncul tepat di pojok kiri atas profil Instagram Anda!\n\n`;
    guideText += `Dibuat dengan GridCut Studio Pro\n`;

    folder.file('README_URUTAN_UPLOAD_IG.txt', guideText);
  }

  try {
    const content = await zip.generateAsync({ type: 'blob' });
    const zipUrl = URL.createObjectURL(content);
    const link = document.createElement('a');

    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const countName = tiles.length === 9 ? 'ig-grid-3x3' :
                      tiles.length === 6 ? 'ig-banner-3x2' :
                      tiles.length === 3 ? 'ig-pano-3x1' : `${tiles.length}-tiles`;

    link.href = zipUrl;
    link.download = `GridCut_${countName}_${timestamp}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(zipUrl);

    onProgress('Selesai download ZIP!');
    return true;
  } catch (error) {
    console.error('Error generating ZIP:', error);
    return false;
  }
}

export async function copyTileToClipboard(tile) {
  if (!tile || !tile.blob) return false;

  try {
    if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
      const item = new ClipboardItem({ [tile.blob.type]: tile.blob });
      await navigator.clipboard.write([item]);
      return true;
    }
  } catch (error) {
    console.error('Failed to copy image:', error);
  }
  return false;
}

export function downloadSingleTile(tile) {
  if (!tile || !tile.dataUrl) return false;

  const link = document.createElement('a');
  link.href = tile.dataUrl;
  link.download = tile.filename || `gridcut-tile-${tile.seqNumber}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return true;
}

/**
 * Generate & Download Instagram Feed Profile Mockup Preview Sheet (PNG)
 */
export async function downloadFeedMockupSheet(tiles, options = {}, onProgress = () => {}) {
  if (!tiles || tiles.length === 0) return false;

  onProgress('Membuat Mockup Sheet IG...');
  try {
    const numCols = options.direction === 'both' ? (parseInt(options.cols) || tiles[0]?.totalCols || 3) : (tiles[0]?.totalCols || 3);
    const numRows = Math.ceil(tiles.length / numCols);

    const thumbW = 360;
    const thumbH = 360;
    const gap = 8;
    const padding = 32;
    const headerH = 180;

    const totalW = padding * 2 + numCols * thumbW + (numCols - 1) * gap;
    const totalH = padding * 2 + headerH + numRows * thumbH + (numRows - 1) * gap;

    const canvas = document.createElement('canvas');
    canvas.width = totalW;
    canvas.height = totalH;
    const ctx = canvas.getContext('2d');

    // Dark sleek background
    const bgGrad = ctx.createLinearGradient(0, 0, totalW, totalH);
    bgGrad.addColorStop(0, '#0f172a');
    bgGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, totalW, totalH);

    // Header card
    ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
    ctx.beginPath();
    ctx.roundRect(padding, padding, totalW - padding * 2, headerH - 24, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Header Typography
    ctx.fillStyle = '#00f2fe';
    ctx.font = 'bold 34px Inter, sans-serif';
    ctx.fillText('📸 MOCKUP PREVIEW — INSTAGRAM PROFILE FEED', padding + 28, padding + 54);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '20px Inter, sans-serif';
    ctx.fillText(`Grid Layout: ${numCols} Kolom × ${numRows} Baris (${tiles.length} Foto Potongan HD)`, padding + 28, padding + 96);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px Inter, sans-serif';
    ctx.fillText('Tips: Unggah berurutan dari Post terbawah / nomor terbesar menuju nomor #1 agar susunannya pas!', padding + 28, padding + 130);

    // Load and draw all tiles in order
    const loadImg = (url) => new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = url;
    });

    for (const tile of tiles) {
      const img = await loadImg(tile.dataUrl);
      if (!img) continue;

      const cIdx = (tile.col - 1) % numCols;
      const rIdx = (tile.row - 1) % numRows;

      const x = padding + cIdx * (thumbW + gap);
      const y = padding + headerH + rIdx * (thumbH + gap);

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, y, thumbW, thumbH, 6);
      ctx.clip();
      ctx.drawImage(img, 0, 0, thumbW, thumbH);
      ctx.restore();

      // Border around thumbnail
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, thumbW, thumbH);

      // Post badge (#igNumber)
      const badgeText = options.igOrder ? `#${tile.igNumber}` : `#${tile.seqNumber}`;
      ctx.fillStyle = (tile.igNumber === 1 && options.igOrder) ? 'rgba(16, 185, 129, 0.92)' : 'rgba(15, 23, 42, 0.88)';
      ctx.beginPath();
      ctx.roundRect(x + thumbW - 74, y + thumbH - 42, 64, 32, 16);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(badgeText, x + thumbW - 42, y + thumbH - 26);
    }

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    link.href = dataUrl;
    link.download = `GridCut_IG_Feed_Mockup_${timestamp}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onProgress('Selesai membuat Mockup!');
    return true;
  } catch (error) {
    console.error('Error generating mockup:', error);
    onProgress('Gagal membuat Mockup.');
    return false;
  }
}

/**
 * GridCut Studio Pro — Exporter Engine (ES6 Module for React)
 * Handles JSZip batch archiving, direct file download, and clipboard copy.
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

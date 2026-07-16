/**
 * GridCut Studio Pro — Image Splitter Engine (ES6 Module for React)
 * Handles grid calculation, interactive canvas overlays, AI Filters/Color grading, Watermark branding, HD upscaling, and offscreen slicing.
 */

export function calculateTiles(imageWidth, imageHeight, options = {}) {
  if (!imageWidth || !imageHeight || imageWidth <= 0 || imageHeight <= 0) {
    return [];
  }

  const {
    direction = 'both',
    cols = 3,
    rows = 3,
    horizMode = 'quantity',
    horizQty = 4,
    horizPx = 1080,
    vertMode = 'quantity',
    vertQty = 3,
    vertPx = 1350,
    overlapEnabled = false,
    overlapPx = 15,
    igOrder = true,
    upscaleScale = '3x'
  } = options;

  const overlap = overlapEnabled ? Math.max(0, parseInt(overlapPx) || 0) : 0;
  const tiles = [];

  let numCols = 1;
  let numRows = 1;
  let colWidths = [];
  let rowHeights = [];

  if (direction === 'both') {
    numCols = Math.max(1, parseInt(cols) || 1);
    numRows = Math.max(1, parseInt(rows) || 1);
    
    const baseW = Math.floor(imageWidth / numCols);
    const baseH = Math.floor(imageHeight / numRows);
    
    for (let c = 0; c < numCols; c++) {
      colWidths.push(c === numCols - 1 ? imageWidth - baseW * c : baseW);
    }
    for (let r = 0; r < numRows; r++) {
      rowHeights.push(r === numRows - 1 ? imageHeight - baseH * r : baseH);
    }
  } else if (direction === 'horiz') {
    numRows = 1;
    rowHeights = [imageHeight];

    if (horizMode === 'quantity') {
      numCols = Math.max(1, parseInt(horizQty) || 1);
      const baseW = Math.floor(imageWidth / numCols);
      for (let c = 0; c < numCols; c++) {
        colWidths.push(c === numCols - 1 ? imageWidth - baseW * c : baseW);
      }
    } else {
      const pxW = Math.max(10, parseInt(horizPx) || 100);
      let currentX = 0;
      while (currentX < imageWidth) {
        const remaining = imageWidth - currentX;
        const blockW = remaining < pxW ? remaining : pxW;
        colWidths.push(blockW);
        currentX += blockW;
      }
      numCols = colWidths.length;
    }
  } else if (direction === 'vert') {
    numCols = 1;
    colWidths = [imageWidth];

    if (vertMode === 'quantity') {
      numRows = Math.max(1, parseInt(vertQty) || 1);
      const baseH = Math.floor(imageHeight / numRows);
      for (let r = 0; r < numRows; r++) {
        rowHeights.push(r === numRows - 1 ? imageHeight - baseH * r : baseH);
      }
    } else {
      const pxH = Math.max(10, parseInt(vertPx) || 100);
      let currentY = 0;
      while (currentY < imageHeight) {
        const remaining = imageHeight - currentY;
        const blockH = remaining < pxH ? remaining : pxH;
        rowHeights.push(blockH);
        currentY += blockH;
      }
      numRows = rowHeights.length;
    }
  }

  let currentY = 0;
  let seq = 1;
  const totalTiles = numCols * numRows;

  for (let r = 0; r < numRows; r++) {
    let currentX = 0;
    const baseRowH = rowHeights[r];

    let startY = currentY;
    let tileH = baseRowH;
    if (overlap > 0) {
      if (r > 0) startY = Math.max(0, startY - Math.floor(overlap / 2));
      if (r < numRows - 1) tileH += Math.floor(overlap / 2);
      if (r > 0) tileH += Math.floor(overlap / 2);
      if (startY + tileH > imageHeight) tileH = imageHeight - startY;
    }

    for (let c = 0; c < numCols; c++) {
      const baseColW = colWidths[c];

      let startX = currentX;
      let tileW = baseColW;
      if (overlap > 0) {
        if (c > 0) startX = Math.max(0, startX - Math.floor(overlap / 2));
        if (c < numCols - 1) tileW += Math.floor(overlap / 2);
        if (c > 0) tileW += Math.floor(overlap / 2);
        if (startX + tileW > imageWidth) tileW = imageWidth - startX;
      }

      let igNumber = totalTiles - seq + 1;

      // Calculate final HD upscaled output width and height
      let outputW = tileW;
      let outputH = tileH;

      if (upscaleScale === 'auto1080') {
        const minSide = Math.min(tileW, tileH);
        if (minSide < 1080) {
          const factor = 1080 / minSide;
          outputW = Math.round(tileW * factor);
          outputH = Math.round(tileH * factor);
        }
      } else if (upscaleScale === '2x' || upscaleScale === 2) {
        outputW = tileW * 2;
        outputH = tileH * 2;
      } else if (upscaleScale === '3x' || upscaleScale === 3) {
        outputW = tileW * 3;
        outputH = tileH * 3;
      } else if (upscaleScale === '4x' || upscaleScale === 4) {
        outputW = tileW * 4;
        outputH = tileH * 4;
      }

      tiles.push({
        id: `tile_${r}_${c}`,
        seqNumber: seq,
        igNumber: igOrder ? igNumber : seq,
        col: c + 1,
        row: r + 1,
        totalCols: numCols,
        totalRows: numRows,
        x: Math.round(startX),
        y: Math.round(startY),
        width: Math.round(tileW),
        height: Math.round(tileH),
        outputWidth: Math.round(outputW),
        outputHeight: Math.round(outputH)
      });

      currentX += baseColW;
      seq++;
    }
    currentY += baseRowH;
  }

  return tiles;
}

/**
 * Generate CSS / Canvas filter string for AI Filters & Color Grading
 */
export function getCanvasFilterString(options = {}) {
  const {
    filterPreset = 'normal',
    brightness = 0,
    contrast = 0,
    saturation = 0
  } = options;

  let filterParts = [];

  // Presets
  if (filterPreset === 'cinematic') {
    filterParts.push('contrast(125%) brightness(95%) saturate(135%) sepia(18%) hue-rotate(-12deg)');
  } else if (filterPreset === 'aesthetic') {
    filterParts.push('contrast(92%) brightness(108%) saturate(115%)');
  } else if (filterPreset === 'cyberpunk') {
    filterParts.push('contrast(135%) brightness(105%) saturate(160%) hue-rotate(18deg)');
  } else if (filterPreset === 'monochrome') {
    filterParts.push('grayscale(100%) contrast(140%) brightness(96%)');
  } else if (filterPreset === 'golden') {
    filterParts.push('contrast(112%) brightness(106%) saturate(130%) sepia(26%)');
  }

  // Manual Sliders (-50 to +50)
  const brightVal = 100 + (parseInt(brightness) || 0);
  const contVal = 100 + (parseInt(contrast) || 0);
  const satVal = 100 + (parseInt(saturation) || 0);

  if (brightVal !== 100) filterParts.push(`brightness(${brightVal}%)`);
  if (contVal !== 100) filterParts.push(`contrast(${contVal}%)`);
  if (satVal !== 100) filterParts.push(`saturate(${satVal}%)`);

  return filterParts.length > 0 ? filterParts.join(' ') : 'none';
}

/**
 * Apply Brand Watermark or IG Handle overlay onto tile or preview
 */
export function applyBrandWatermark(ctx, width, height, tile = {}, options = {}, totalTiles = 1, offsetX = 0, offsetY = 0) {
  const {
    watermarkEnabled = false,
    watermarkText = '',
    watermarkPos = 'bottom-right',
    watermarkScope = 'last-only',
    watermarkStyle = 'pill',
    watermarkOpacity = 0.85
  } = options;

  if (!watermarkEnabled || !watermarkText || width <= 0 || height <= 0) return;

  if (watermarkScope === 'last-only') {
    const isLastTile = options.igOrder ? tile.igNumber === 1 : tile.seqNumber === totalTiles;
    if (!isLastTile) return;
  }

  ctx.save();
  ctx.globalAlpha = Math.min(1, Math.max(0.1, parseFloat(watermarkOpacity) || 0.85));

  const fontSize = Math.max(16, Math.min(Math.round(width / 15), Math.round(height / 13)));
  ctx.font = `bold ${fontSize}px Inter, Outfit, sans-serif`;

  const textMetrics = ctx.measureText(watermarkText);
  const textW = textMetrics.width;
  const paddingX = fontSize * 1.1;
  const paddingY = fontSize * 0.7;
  const pillW = textW + paddingX * 2;
  const pillH = fontSize + paddingY * 2;

  let x = offsetX + width - pillW - fontSize * 0.8;
  let y = offsetY + height - pillH - fontSize * 0.8;

  if (watermarkPos === 'bottom-left') {
    x = offsetX + fontSize * 0.8;
    y = offsetY + height - pillH - fontSize * 0.8;
  } else if (watermarkPos === 'top-right') {
    x = offsetX + width - pillW - fontSize * 0.8;
    y = offsetY + fontSize * 0.8;
  } else if (watermarkPos === 'top-left') {
    x = offsetX + fontSize * 0.8;
    y = offsetY + fontSize * 0.8;
  } else if (watermarkPos === 'center') {
    x = offsetX + (width - pillW) / 2;
    y = offsetY + (height - pillH) / 2;
  }

  if (watermarkStyle === 'pill') {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.82)';
    ctx.beginPath();
    ctx.roundRect(x, y, pillW, pillH, pillH / 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.7)';
    ctx.lineWidth = Math.max(1.5, Math.round(width / 600));
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(watermarkText, x + pillW / 2, y + pillH / 2);
  } else {
    // Text-only style with dark outline glow
    const textX = x + pillW / 2;
    const textY = y + pillH / 2;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = Math.max(3, Math.round(width / 300));
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.strokeText(watermarkText, textX, textY);
    ctx.fillStyle = '#00f2fe';
    ctx.fillText(watermarkText, textX, textY);
  }

  ctx.restore();
}

export function drawPreviewOverlay(canvas, sourceImage, options = {}, showGuides = true) {
  if (!canvas || !sourceImage) return;

  const ctx = canvas.getContext('2d');
  const imgW = sourceImage.naturalWidth || sourceImage.width;
  const imgH = sourceImage.naturalHeight || sourceImage.height;
  const tiles = calculateTiles(imgW, imgH, options);

  if (canvas.width !== imgW || canvas.height !== imgH) {
    canvas.width = imgW;
    canvas.height = imgH;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw image with AI filter & color grading if set
  ctx.save();
  const filterStr = getCanvasFilterString(options);
  if (filterStr !== 'none') {
    ctx.filter = filterStr;
  }
  ctx.drawImage(sourceImage, 0, 0, canvas.width, canvas.height);
  ctx.restore();

  // Apply watermark preview if enabled
  if (options.watermarkEnabled && options.watermarkText && tiles.length > 0) {
    tiles.forEach(tile => {
      applyBrandWatermark(ctx, tile.width, tile.height, tile, options, tiles.length, tile.x, tile.y);
    });
  }

  if (!showGuides || tiles.length === 0) return;

  ctx.save();
  
  tiles.forEach(tile => {
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = Math.max(2, Math.round(imgW / 600));
    ctx.setLineDash([Math.round(imgW / 150), Math.round(imgW / 200)]);
    ctx.strokeRect(tile.x, tile.y, tile.width, tile.height);

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.lineWidth = Math.max(1, Math.round(imgW / 1200));
    ctx.setLineDash([]);
    ctx.strokeRect(tile.x - 1, tile.y - 1, tile.width + 2, tile.height + 2);

    const centerX = tile.x + tile.width / 2;
    const centerY = tile.y + tile.height / 2;

    const badgeText = `#${tile.igNumber}`;
    const isUpscaled = tile.outputWidth !== tile.width || tile.outputHeight !== tile.height;
    const dimsText = isUpscaled 
      ? `${tile.width}×${tile.height}px ⚡ HD ${tile.outputWidth}×${tile.outputHeight}px`
      : `${tile.width}×${tile.height}px`;

    const fontSize = Math.min(Math.max(14, Math.round(tile.width / 10)), Math.max(14, Math.round(tile.height / 8)));
    ctx.font = `bold ${fontSize}px Inter, sans-serif`;
    
    const textMetrics = ctx.measureText(badgeText);
    const pillWidth = textMetrics.width + fontSize * 1.5;
    const pillHeight = fontSize * 1.8;

    ctx.fillStyle = tile.igNumber === 1 && options.igOrder ? 'rgba(16, 185, 129, 0.9)' :
                    tile.igNumber === tiles.length && options.igOrder ? 'rgba(0, 242, 254, 0.9)' :
                    'rgba(15, 23, 42, 0.85)';
    
    ctx.beginPath();
    ctx.roundRect(
      centerX - pillWidth / 2,
      centerY - pillHeight / 2 - fontSize * 0.4,
      pillWidth,
      pillHeight,
      pillHeight / 2
    );
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = tile.igNumber === tiles.length && options.igOrder ? '#000000' : '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(badgeText, centerX, centerY - fontSize * 0.4);

    if (tile.height > fontSize * 3.5) {
      const subSize = Math.max(11, Math.round(fontSize * 0.5));
      ctx.font = `600 ${subSize}px Inter, sans-serif`;
      
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.strokeText(dimsText, centerX, centerY + fontSize * 0.85);
      
      ctx.fillStyle = isUpscaled ? '#34d399' : '#00f2fe';
      ctx.fillText(dimsText, centerX, centerY + fontSize * 0.85);
    }
  });

  ctx.restore();
}

/**
 * Apply 3x3 Sharpening Convolution Kernel onto Canvas Context
 */
function applyEdgeSharpening(ctx, width, height, intensity = 0.35) {
  if (width <= 0 || height <= 0 || intensity <= 0) return;
  try {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const copy = new Uint8ClampedArray(data);

    const c = 1 + 4 * intensity;
    const adj = -intensity;

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        const top = ((y - 1) * width + x) * 4;
        const bottom = ((y + 1) * width + x) * 4;
        const left = (y * width + (x - 1)) * 4;
        const right = (y * width + (x + 1)) * 4;

        for (let ch = 0; ch < 3; ch++) {
          const val = copy[idx + ch] * c +
                      (copy[top + ch] + copy[bottom + ch] + copy[left + ch] + copy[right + ch]) * adj;
          data[idx + ch] = Math.min(255, Math.max(0, val));
        }
      }
    }
    ctx.putImageData(imageData, 0, 0);
  } catch (err) {
    console.warn('Canvas imageData access prevented during sharpening:', err);
  }
}

export async function sliceTiles(sourceImage, options = {}) {
  if (!sourceImage) return [];

  const imgW = sourceImage.naturalWidth || sourceImage.width;
  const imgH = sourceImage.naturalHeight || sourceImage.height;
  const tiles = calculateTiles(imgW, imgH, options);
  const slicedResults = [];

  let format = options.format || 'image/png';
  let quality = options.quality !== undefined ? options.quality : 0.92;
  if (format === 'original') {
    format = 'image/png';
  }

  for (const tile of tiles) {
    const offCanvas = document.createElement('canvas');
    offCanvas.width = tile.outputWidth || tile.width;
    offCanvas.height = tile.outputHeight || tile.height;
    const offCtx = offCanvas.getContext('2d');

    offCtx.imageSmoothingEnabled = true;
    offCtx.imageSmoothingQuality = 'high';

    offCtx.save();
    const filterStr = getCanvasFilterString(options);
    if (filterStr !== 'none') {
      offCtx.filter = filterStr;
    }
    offCtx.drawImage(
      sourceImage,
      tile.x,
      tile.y,
      tile.width,
      tile.height,
      0,
      0,
      offCanvas.width,
      offCanvas.height
    );
    offCtx.restore();

    // Apply sharpening filter if upscaling or explicitly enabled
    if (options.sharpenEnabled && (offCanvas.width > tile.width || options.upscaleScale !== '1x')) {
      const intensity = parseFloat(options.sharpenIntensity !== undefined ? options.sharpenIntensity : 0.35);
      if (intensity > 0) {
        applyEdgeSharpening(offCtx, offCanvas.width, offCanvas.height, intensity);
      }
    }

    // Apply watermark branding onto final output tile
    if (options.watermarkEnabled && options.watermarkText) {
      applyBrandWatermark(offCtx, offCanvas.width, offCanvas.height, tile, options, tiles.length, 0, 0);
    }

    const dataUrl = offCanvas.toDataURL(format, quality);
    const blob = await new Promise(resolve => offCanvas.toBlob(resolve, format, quality));

    const ext = format === 'image/jpeg' ? 'jpg' : format === 'image/webp' ? 'webp' : 'png';
    const prefix = options.igOrder ? 'ig-post' : 'tile';
    const numPad = String(tile.igNumber).padStart(2, '0');
    const filename = `${prefix}-${numPad}_col${tile.col}-row${tile.row}_${offCanvas.width}x${offCanvas.height}px.${ext}`;

    slicedResults.push({
      ...tile,
      dataUrl,
      blob,
      filename
    });
  }

  return slicedResults;
}

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Camera, RefreshCw, Sparkles, Film, Grid, Image as ImageIcon, Download, Palette, Type, Scan, LayoutPanelLeft, Heart, Star, Flower2, Gem, StickyNote, Leaf, HeartHandshake } from 'lucide-react';
import './PhotoboothModal.css';

const LAYOUTS = [
  { id: 'single', label: 'Single', shots: 1, icon: ImageIcon },
  { id: 'strip', label: 'Film Strip', shots: 3, icon: Film },
  { id: 'grid', label: 'Grid 2x2', shots: 4, icon: Grid }
];

const FILTERS = [
  { id: 'original', label: 'Original', icon: Scan },
  { id: 'clarendon', label: 'Clarendon', icon: Camera },
  { id: 'gingham', label: 'Gingham', icon: Sparkles },
  { id: 'moon', label: 'Moon (B&W)', icon: Film },
  { id: 'lark', label: 'Lark', icon: Scan },
  { id: 'reyes', label: 'Reyes', icon: Camera },
  { id: 'juno', label: 'Juno', icon: Sparkles },
  { id: 'slumber', label: 'Slumber', icon: Film },
  { id: 'crema', label: 'Crema', icon: Scan },
  { id: 'neon', label: 'Neon', icon: Palette },
  { id: 'dramatic', label: 'Dramatic', icon: Camera }
];

const FRAME_DESIGNS = [
  { id: 'minimalist', label: 'Minimalist Clean', icon: ImageIcon },
  { id: 'classic-film', label: 'Classic 35mm', icon: Film },
  { id: 'polaroid', label: 'Retro Polaroid', icon: Type },
  { id: 'neon-cyber', label: 'Cyberpunk', icon: Palette },
  { id: 'pinkie-hearts', label: 'Pinkie Hearts', icon: Heart },
  { id: 'starry-cute', label: 'Starry Cute', icon: Star },
  { id: 'floral-spring', label: 'Floral Spring', icon: Flower2 },
  { id: 'elegant-marble', label: 'Elegant Marble', icon: Gem },
  { id: 'vintage-scrapbook', label: 'Scrapbook', icon: StickyNote },
  { id: 'organic-vines', label: 'Organic Vines', icon: Leaf },
  { id: 'silver-heart', label: 'Silver Heart', icon: HeartHandshake }
];

export default function PhotoboothModal({ isOpen, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  
  const [hasPermission, setHasPermission] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [isFlashing, setIsFlashing] = useState(false);
  
  const [selectedLayout, setSelectedLayout] = useState('strip');
  const [selectedFilter, setSelectedFilter] = useState('original');
  const [selectedFrame, setSelectedFrame] = useState('elegant-marble');
  const [isShooting, setIsShooting] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [finalResult, setFinalResult] = useState(null);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  const startStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1920 }, height: { ideal: 1080 }, facingMode: "user" }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      setHasPermission(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setHasPermission(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setCapturedPhotos([]);
      setFinalResult(null);
      setCountdown(null);
      setIsShooting(false);
      startStream();
    } else {
      stopStream();
    }
    return () => stopStream();
  }, [isOpen, startStream, stopStream]);

  const shootRoutine = async (shotsToTake) => {
    setIsShooting(true);
    setCapturedPhotos([]);
    const photos = [];
    
    for (let i = 0; i < shotsToTake; i++) {
      for (let c = 3; c > 0; c--) {
        setCountdown(c);
        await new Promise(r => setTimeout(r, 1000));
      }
      setCountdown(null);
      
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 200);
      
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      
      ctx.save();
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      ctx.restore();
      
      photos.push(canvas.toDataURL('image/jpeg', 0.95));
      setCapturedPhotos([...photos]);
      
      if (i < shotsToTake - 1) {
        await new Promise(r => setTimeout(r, 600));
      }
    }
    
    compileCollage(photos);
  };
  
  const startSession = () => {
    if (!hasPermission) return;
    const layout = LAYOUTS.find(l => l.id === selectedLayout);
    shootRoutine(layout.shots);
  };

  const getCanvasFilter = (filterId) => {
    switch (filterId) {
      case 'clarendon': return 'contrast(120%) saturate(135%)';
      case 'gingham': return 'brightness(105%) hue-rotate(350deg)';
      case 'moon': return 'grayscale(100%) contrast(110%) brightness(110%)';
      case 'lark': return 'contrast(90%) saturate(120%)';
      case 'reyes': return 'sepia(22%) brightness(110%) contrast(85%) saturate(75%)';
      case 'juno': return 'saturate(130%) contrast(115%) hue-rotate(-5deg)';
      case 'slumber': return 'saturate(66%) brightness(105%) sepia(50%)';
      case 'crema': return 'sepia(50%) contrast(120%) brightness(115%)';
      case 'neon': return 'saturate(200%) hue-rotate(15deg) contrast(120%)';
      case 'dramatic': return 'contrast(150%) saturate(80%)';
      default: return 'none';
    }
  };

  // --- PROCEDURAL DRAWING HELPERS ---
  const drawHeart = (ctx, x, y, w, h, fillStyle) => {
    ctx.save();
    ctx.beginPath();
    const topCurveHeight = h * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - w / 2, y, x - w / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - w / 2, y + (h + topCurveHeight) / 2, x, y + (h + topCurveHeight) / 2, x, y + h);
    ctx.bezierCurveTo(x, y + (h + topCurveHeight) / 2, x + w / 2, y + (h + topCurveHeight) / 2, x + w / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + w / 2, y, x, y, x, y + topCurveHeight);
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.fill();
    ctx.restore();
  };

  const drawStar = (ctx, cx, cy, spikes, outerRadius, innerRadius, color) => {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;
        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  };

  const drawFlower = (ctx, cx, cy, radius, color, centerColor) => {
    ctx.save();
    ctx.fillStyle = color;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      const angle = (Math.PI * 2 / 5) * i;
      const px = cx + Math.cos(angle) * radius;
      const py = cy + Math.sin(angle) * radius;
      ctx.arc(px, py, radius * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.fillStyle = centerColor;
    ctx.arc(cx, cy, radius * 0.7, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const drawTape = (ctx, x, y, w, h, angle) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.shadowColor = 'rgba(0,0,0,0.1)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.fillRect(-w/2, -h/2, w, h);
    ctx.restore();
  };

  const drawLeaf = (ctx, x, y, scale, angle, color) => {
     ctx.save();
     ctx.translate(x, y);
     ctx.rotate(angle);
     ctx.scale(scale, scale);
     ctx.fillStyle = color;
     ctx.beginPath();
     ctx.moveTo(0, 0);
     ctx.quadraticCurveTo(15, -15, 30, 0);
     ctx.quadraticCurveTo(15, 15, 0, 0);
     ctx.fill();
     ctx.restore();
  };

  const pseudoRandom = (seed) => {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const compileCollage = (photos) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    Promise.all(photos.map(src => {
      return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
      });
    })).then(images => {
      const w = images[0].width;
      const h = images[0].height;
      
      let pt = 0, pb = 0, pl = 0, pr = 0;
      let bg = '#ffffff';
      
      if (selectedFrame === 'minimalist') {
        pt = pb = pl = pr = Math.floor(w * 0.04);
      } else if (selectedFrame === 'classic-film') {
        pt = pb = Math.floor(w * 0.05);
        pl = pr = Math.floor(w * 0.12);
        bg = '#111111';
      } else if (selectedFrame === 'polaroid') {
        pt = pl = pr = Math.floor(w * 0.05);
        pb = Math.floor(w * 0.25);
        bg = '#fdfbf7';
      } else if (selectedFrame === 'neon-cyber') {
        pt = pb = pl = pr = Math.floor(w * 0.06);
        bg = '#090d16';
      } else if (selectedFrame === 'pinkie-hearts') {
        pt = pb = pl = pr = Math.floor(w * 0.08);
        bg = '#ffe4e1';
      } else if (selectedFrame === 'starry-cute') {
        pt = pb = pl = pr = Math.floor(w * 0.08);
        bg = '#fffacd';
      } else if (selectedFrame === 'floral-spring') {
        pt = pb = pl = pr = Math.floor(w * 0.08);
        bg = '#e0ffff';
      } else if (selectedFrame === 'elegant-marble') {
        pt = pl = pr = Math.floor(w * 0.04);
        pb = Math.floor(w * 0.25); // Room for cursive text
        bg = '#f8f9fa';
      } else if (selectedFrame === 'vintage-scrapbook') {
        pt = pb = pl = pr = Math.floor(w * 0.08);
        bg = '#d2b48c'; // craft brown
      } else if (selectedFrame === 'organic-vines') {
        pt = pb = pl = pr = Math.floor(w * 0.08);
        bg = '#fdf5e6'; // old lace
      } else if (selectedFrame === 'silver-heart') {
        pt = pl = pr = Math.floor(w * 0.05);
        pb = Math.floor(w * 0.35); // Big space at bottom
        bg = '#ffffff';
      }
      
      const gap = Math.floor(w * 0.03);
      
      let totalW, totalH;
      if (selectedLayout === 'single') {
        totalW = pl + w + pr;
        totalH = pt + h + pb;
      } else if (selectedLayout === 'strip') {
        totalW = pl + w + pr;
        totalH = pt + (h * 3) + (gap * 2) + pb;
      } else if (selectedLayout === 'grid') {
        totalW = pl + (w * 2) + gap + pr;
        totalH = pt + (h * 2) + gap + pb;
      }
      
      canvas.width = totalW;
      canvas.height = totalH;
      
      // Draw Background Base
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, totalW, totalH);
      
      // Procedural Background Details
      if (selectedFrame === 'neon-cyber') {
         ctx.strokeStyle = 'rgba(0, 242, 254, 0.15)';
         ctx.lineWidth = 3;
         for (let i = 0; i < totalW; i += 60) {
           ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, totalH); ctx.stroke();
         }
         for (let i = 0; i < totalH; i += 60) {
           ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(totalW, i); ctx.stroke();
         }
      } else if (selectedFrame === 'pinkie-hearts') {
         let seed = 1234;
         for (let i = 0; i < 40; i++) {
           let hx = pseudoRandom(seed++) * totalW;
           let hy = pseudoRandom(seed++) * totalH;
           let size = (pseudoRandom(seed++) * 60) + 30;
           drawHeart(ctx, hx, hy, size, size, 'rgba(255, 105, 180, 0.4)');
         }
      } else if (selectedFrame === 'starry-cute') {
         let seed = 5678;
         for (let i = 0; i < 35; i++) {
           let sx = pseudoRandom(seed++) * totalW;
           let sy = pseudoRandom(seed++) * totalH;
           let outer = (pseudoRandom(seed++) * 30) + 20;
           drawStar(ctx, sx, sy, 5, outer, outer/2, 'rgba(255, 165, 0, 0.5)');
         }
      } else if (selectedFrame === 'floral-spring') {
         let seed = 9012;
         for (let i = 0; i < 35; i++) {
           let fx = pseudoRandom(seed++) * totalW;
           let fy = pseudoRandom(seed++) * totalH;
           let rad = (pseudoRandom(seed++) * 25) + 15;
           drawFlower(ctx, fx, fy, rad, 'rgba(255, 255, 255, 0.9)', 'rgba(255, 215, 0, 0.9)');
         }
      } else if (selectedFrame === 'elegant-marble') {
         ctx.strokeStyle = 'rgba(0,0,0,0.03)';
         ctx.lineWidth = 2;
         let seed = 123;
         for (let i = 0; i < 20; i++) {
            ctx.beginPath();
            let sx = pseudoRandom(seed++) * totalW;
            let sy = pseudoRandom(seed++) * totalH;
            ctx.moveTo(sx, sy);
            ctx.bezierCurveTo(
               sx + (pseudoRandom(seed++)*300 - 150), sy + (pseudoRandom(seed++)*300 - 150),
               sx + (pseudoRandom(seed++)*400 - 200), sy + (pseudoRandom(seed++)*400 - 200),
               totalW * pseudoRandom(seed++), totalH * pseudoRandom(seed++)
            );
            ctx.stroke();
         }
      } else if (selectedFrame === 'organic-vines') {
         let seed = 321;
         ctx.strokeStyle = '#556b2f'; 
         ctx.lineWidth = 3;
         for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            let xPos = pseudoRandom(seed++) * totalW;
            ctx.moveTo(xPos, -50);
            ctx.quadraticCurveTo(xPos + 200, totalH/2, xPos - 100, totalH + 50);
            ctx.stroke();
            for (let j = 0; j < 12; j++) {
               let ly = (totalH / 12) * j + (pseudoRandom(seed++)*50);
               let lx = xPos + (Math.sin(ly/150)*100);
               drawLeaf(ctx, lx, ly, 1.5 + pseudoRandom(seed++), pseudoRandom(seed++)*Math.PI*2, '#8fbc8f');
            }
         }
      }
      
      // Draw Photos
      images.forEach((img, i) => {
        let x = pl;
        let y = pt;
        
        if (selectedLayout === 'strip') {
          y = pt + (h * i) + (gap * i);
        } else if (selectedLayout === 'grid') {
          const col = i % 2;
          const row = Math.floor(i / 2);
          x = pl + (w * col) + (gap * col);
          y = pt + (h * row) + (gap * row);
        }
        
        // Background Borders
        if (selectedFrame === 'pinkie-hearts') {
            ctx.fillStyle = '#ff1493'; 
            const bw = Math.floor(w * 0.02);
            ctx.fillRect(x - bw, y - bw, w + (bw*2), h + (bw*2));
        } else if (selectedFrame === 'starry-cute') {
            ctx.fillStyle = '#ff8c00'; 
            const bw = Math.floor(w * 0.02);
            ctx.fillRect(x - bw, y - bw, w + (bw*2), h + (bw*2));
        } else if (selectedFrame === 'floral-spring') {
            ctx.fillStyle = '#3cb371'; 
            const bw = Math.floor(w * 0.02);
            ctx.fillRect(x - bw, y - bw, w + (bw*2), h + (bw*2));
        } else if (selectedFrame === 'vintage-scrapbook') {
            ctx.fillStyle = '#fdfbf7'; // polaroid white backing
            const bw = Math.floor(w * 0.04);
            ctx.shadowColor = 'rgba(0,0,0,0.4)';
            ctx.shadowBlur = 15;
            ctx.fillRect(x - bw, y - bw, w + (bw*2), h + (bw*2));
            ctx.shadowColor = 'transparent';
        } else if (selectedFrame === 'elegant-marble') {
            ctx.strokeStyle = '#cccccc'; // thin border
            ctx.lineWidth = 2;
            ctx.strokeRect(x - 2, y - 2, w + 4, h + 4);
        }
        
        ctx.filter = getCanvasFilter(selectedFilter);
        ctx.drawImage(img, x, y, w, h);
        ctx.filter = 'none';
        
        // Post-Image Decorators (Tape, Neon Borders)
        if (selectedFrame === 'neon-cyber') {
           ctx.strokeStyle = '#ff00ff';
           ctx.lineWidth = Math.max(6, Math.floor(w * 0.015));
           ctx.strokeRect(x, y, w, h);
           ctx.strokeStyle = '#00f2fe';
           ctx.lineWidth = Math.max(3, Math.floor(w * 0.008));
           ctx.strokeRect(x-10, y-10, w+20, h+20);
        } else if (selectedFrame === 'vintage-scrapbook') {
           drawTape(ctx, x, y, w * 0.25, w * 0.08, -Math.PI / 12);
           drawTape(ctx, x + w, y + h, w * 0.25, w * 0.08, -Math.PI / 10);
        }
      });
      
      // Master Decorators
      if (selectedFrame === 'classic-film') {
         ctx.fillStyle = '#ffffff';
         const holeW = Math.floor(totalW * 0.035);
         const holeH = Math.floor(holeW * 0.8);
         const holeSpacing = holeH * 2.5;
         
         const drawRoundedHole = (hx, hy, hw, hh, r) => {
             ctx.beginPath();
             ctx.moveTo(hx + r, hy);
             ctx.lineTo(hx + hw - r, hy);
             ctx.quadraticCurveTo(hx + hw, hy, hx + hw, hy + r);
             ctx.lineTo(hx + hw, hy + hh - r);
             ctx.quadraticCurveTo(hx + hw, hy + hh, hx + hw - r, hy + hh);
             ctx.lineTo(hx + r, hy + hh);
             ctx.quadraticCurveTo(hx, hy + hh, hx, hy + hh - r);
             ctx.lineTo(hx, hy + r);
             ctx.quadraticCurveTo(hx, hy, hx + r, hy);
             ctx.closePath();
             ctx.fill();
         };

         for (let y = holeSpacing; y < totalH - holeSpacing; y += holeSpacing) {
            drawRoundedHole(pl * 0.25, y, holeW, holeH, holeW/4);
            drawRoundedHole(totalW - (pl * 0.25) - holeW, y, holeW, holeH, holeW/4);
         }
         
         ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
         ctx.font = `bold ${Math.floor(holeW*1.2)}px Courier, monospace`;
         ctx.textAlign = 'center';
         
         ctx.save();
         ctx.translate(pl * 0.7, totalH / 2);
         ctx.rotate(-Math.PI / 2);
         ctx.fillText("KODAK PORTRA 400", 0, 0);
         ctx.restore();
      }
      
      if (selectedFrame === 'polaroid') {
         const today = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
         ctx.fillStyle = '#333333';
         ctx.font = `italic 600 ${Math.floor(totalW * 0.035)}px Georgia, serif`;
         ctx.textAlign = 'center';
         ctx.fillText(`GridCut Studio`, totalW / 2, totalH - (pb * 0.45));
         ctx.font = `italic 400 ${Math.floor(totalW * 0.025)}px Georgia, serif`;
         ctx.fillStyle = '#666666';
         ctx.fillText(today, totalW / 2, totalH - (pb * 0.2));
      }

      if (selectedFrame === 'elegant-marble') {
         const today = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
         ctx.fillStyle = '#212529';
         ctx.font = `italic ${Math.floor(totalW * 0.05)}px "Times New Roman", Times, serif`;
         ctx.textAlign = 'center';
         ctx.fillText(`Beautiful Moments`, totalW / 2, totalH - (pb * 0.45));
         
         ctx.font = `${Math.floor(totalW * 0.025)}px sans-serif`;
         ctx.fillStyle = '#868e96';
         if(ctx.letterSpacing !== undefined) {
             ctx.letterSpacing = "4px";
         }
         ctx.fillText(today.replace(/\//g, '.'), totalW / 2, totalH - (pb * 0.2));
      }

      if (selectedFrame === 'silver-heart') {
         const hw = totalW * 0.35;
         const hh = hw;
         const hx = totalW / 2;
         const hy = totalH - (pb * 0.6); 
         
         const gradient = ctx.createLinearGradient(hx - hw/2, hy - hh/2, hx + hw/2, hy + hh/2);
         gradient.addColorStop(0, '#f8f9fa');
         gradient.addColorStop(0.5, '#ced4da');
         gradient.addColorStop(1, '#6c757d');
         
         ctx.shadowColor = 'rgba(0,0,0,0.3)';
         ctx.shadowBlur = 15;
         ctx.shadowOffsetY = 8;
         drawHeart(ctx, hx, hy - hh/3, hw, hh, gradient); 
         ctx.shadowColor = 'transparent';
      }
      
      setFinalResult(canvas.toDataURL('image/jpeg', 0.95));
      setIsShooting(false);
      stopStream();
    });
  };

  const handleRetake = () => {
    setCapturedPhotos([]);
    setFinalResult(null);
    startStream();
  };

  const handleDownload = () => {
    if (!finalResult) return;
    const a = document.createElement('a');
    a.href = finalResult;
    a.download = `Photobooth_${selectedFrame}_${new Date().getTime()}.jpg`;
    a.click();
  };

  if (!isOpen) return null;

  return (
    <div className="pb-overlay">
      <div className="pb-modal">
        
        <div className="pb-header">
          <h2 className="pb-title">
            <Camera /> Photobooth Premium (Standalone)
          </h2>
          <button onClick={onClose} className="pb-close-btn" disabled={isShooting}>
            <X size={20} />
          </button>
        </div>

        <div className="pb-content">
          <div className="pb-camera-container">
            {finalResult ? (
              <img src={finalResult} alt="Hasil Kolase Photobooth" className="pb-result-img" />
            ) : (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className={`pb-video pb-filter-${selectedFilter}`}
                style={{ transform: 'scaleX(-1)' }} 
              />
            )}

            {!hasPermission && !finalResult && !isShooting && (
              <div className="pb-permission-msg">
                <Camera size={48} />
                <h3>Akses Kamera Diperlukan</h3>
                <p>Mohon izinkan akses kamera di browser Anda untuk menggunakan Photobooth.</p>
              </div>
            )}

            {countdown !== null && (
              <div className="pb-countdown-overlay">
                <span className="pb-countdown-text">
                  {countdown}
                </span>
              </div>
            )}
            
            <div className={`pb-flash-overlay ${isFlashing ? 'pb-flash-active' : ''}`} />
            
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>

          <div className="pb-sidebar">
            {!finalResult ? (
              <>
                <div className="pb-tabs">
                  <button className="pb-tab-btn active">Pengaturan Sesi</button>
                </div>
                
                <h3 className="pb-sidebar-title"><LayoutPanelLeft size={16} /> Tata Letak (Layout)</h3>
                <div className="pb-options-grid">
                  {LAYOUTS.map(layout => (
                    <button
                      key={layout.id}
                      onClick={() => setSelectedLayout(layout.id)}
                      disabled={isShooting}
                      className={`pb-frame-btn ${selectedLayout === layout.id ? 'active' : ''}`}
                    >
                      <layout.icon size={20} />
                      <span>{layout.label}</span>
                    </button>
                  ))}
                </div>

                <h3 className="pb-sidebar-title"><Scan size={16} /> Filter Lensa</h3>
                <div className="pb-options-grid">
                  {FILTERS.map(filter => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      disabled={isShooting}
                      className={`pb-frame-btn ${selectedFilter === filter.id ? 'active' : ''}`}
                    >
                      <filter.icon size={20} />
                      <span>{filter.label}</span>
                    </button>
                  ))}
                </div>

                <h3 className="pb-sidebar-title"><Palette size={16} /> Desain Bingkai Kertas</h3>
                <div className="pb-options-grid" style={{ marginBottom: '2rem' }}>
                  {FRAME_DESIGNS.map(frame => (
                    <button
                      key={frame.id}
                      onClick={() => setSelectedFrame(frame.id)}
                      disabled={isShooting}
                      className={`pb-frame-btn ${selectedFrame === frame.id ? 'active' : ''}`}
                    >
                      <frame.icon size={20} />
                      <span>{frame.label}</span>
                    </button>
                  ))}
                </div>

                <div className="pb-capture-wrapper">
                  <button 
                    onClick={startSession}
                    disabled={!hasPermission || isShooting}
                    className="pb-capture-btn"
                  >
                    <Camera size={24} />
                    <span>{isShooting ? 'Sedang Memotret...' : 'Mulai Sesi Photobooth'}</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="pb-result-actions">
                <div className="pb-success-icon">
                  <Download size={32} />
                </div>
                <h3>Sesi Selesai!</h3>
                <p>Kolase foto Anda berhasil dibuat.</p>
                
                <button 
                  onClick={handleDownload}
                  className="pb-action-btn pb-btn-success"
                >
                  <Download size={20} />
                  <span>Simpan & Download</span>
                </button>
                
                <button 
                  onClick={handleRetake}
                  className="pb-action-btn pb-btn-secondary"
                >
                  <RefreshCw size={20} />
                  <span>Mulai Sesi Baru</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

export default function ColorEffects({ options, onChangeOption }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { filterPreset = 'normal', brightness = 0, contrast = 0, saturation = 0 } = options;

  const presets = [
    { id: 'normal', name: 'Normal / Asli', desc: 'Tanpa Filter Warna' },
    { id: 'cinematic', name: 'Cinematic Teal & Orange', desc: 'Kontras & Tone Film Populer' },
    { id: 'aesthetic', name: 'Aesthetic Pastel', desc: 'Tone Lembut & Shadow Terang' },
    { id: 'cyberpunk', name: 'Cyberpunk Neon', desc: 'Saturasi Tinggi & Neon Glow' },
    { id: 'monochrome', name: 'Monochrome B&W', desc: 'Hitam Putih Dramatis Tajam' },
    { id: 'golden', name: 'Warm Golden Hour', desc: 'Hangatnya Cahaya Matahari Sore' }
  ];

  const handleReset = () => {
    onChangeOption('filterPreset', 'normal');
    onChangeOption('brightness', 0);
    onChangeOption('contrast', 0);
    onChangeOption('saturation', 0);
  };

  const getSummaryLabel = () => {
    const pName = presets.find(p => p.id === filterPreset)?.name || 'Normal';
    if (filterPreset === 'normal' && brightness === 0 && contrast === 0 && saturation === 0) return 'Normal / Tanpa Filter';
    return `${pName.split(' ')[1] || pName} • ${brightness !== 0 ? `B:${brightness}% ` : ''}${contrast !== 0 ? `C:${contrast}% ` : ''}${saturation !== 0 ? `S:${saturation}%` : ''}`.trim();
  };

  const SliderField = ({ label, value, onChange }) => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
        <span className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-600 dark:text-zinc-400">
          {value > 0 ? `+${value}%` : `${value}%`}
        </span>
      </div>
      <input
        type="range" min="-50" max="50" value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        className="h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-500 w-full"
      />
    </div>
  );

  return (
    <section className="bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-sm">
      <div 
        className="flex items-center justify-between gap-3 px-5 pt-5 pb-3 cursor-pointer select-none group"
        onClick={() => setIsExpanded(prev => !prev)}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Sparkles size={16} />
          </div>
          <h2 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 font-display tracking-wide">AI Filter & Color Grading</h2>
        </div>
        <button className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" title={isExpanded ? 'Tutup' : 'Buka'}>
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      <div className="px-4 py-3">
        {!isExpanded ? (
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{getSummaryLabel()}</span>
            <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 cursor-pointer underline whitespace-nowrap ml-2" onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }}>Atur Warna</span>
          </div>
        ) : (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Pilih preset warna bergaya studio atau sesuaikan slider untuk memberikan tone grading profesional sebelum foto dipotong!
            </p>

            <div className="grid grid-cols-2 gap-2">
              {presets.map(p => (
                <div
                  key={p.id}
                  className={`p-2 rounded-lg border cursor-pointer transition-colors ${filterPreset === p.id ? 'bg-sky-50 border-sky-500 dark:bg-sky-500/10 dark:border-sky-500/50' : 'bg-white border-zinc-200 dark:bg-zinc-900/50 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}
                  onClick={() => onChangeOption('filterPreset', p.id)}
                >
                  <div className={`text-xs font-bold mb-0.5 ${filterPreset === p.id ? 'text-sky-700 dark:text-sky-400' : 'text-zinc-800 dark:text-zinc-200'}`}>{p.name}</div>
                  <div className={`text-[10px] leading-tight ${filterPreset === p.id ? 'text-sky-600/80 dark:text-sky-400/80' : 'text-zinc-500 dark:text-zinc-400'}`}>{p.desc}</div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-4">
              <SliderField label="Kecerahan (Brightness)" value={brightness} onChange={(v) => onChangeOption('brightness', v)} />
              <SliderField label="Kontras (Contrast)" value={contrast} onChange={(v) => onChangeOption('contrast', v)} />
              <SliderField label="Saturasi (Saturation)" value={saturation} onChange={(v) => onChangeOption('saturation', v)} />

              <button
                className="mt-2 flex items-center justify-center gap-2 px-3 py-2 w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                onClick={handleReset}
              >
                <RotateCcw size={14} />
                <span>Reset Semua Filter & Warna</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

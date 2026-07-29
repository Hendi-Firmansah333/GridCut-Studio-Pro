import React from 'react';
import { Sliders } from 'lucide-react';

export default function SplitControls({ options, onChangeOption }) {
  const {
    direction, cols, rows, horizMode, horizQty, horizPx,
    vertMode, vertQty, vertPx, overlapEnabled, overlapPx, igOrder
  } = options;

  const SliderField = ({ label, value, unit, min, max, step = 1, numMin, numMax, onChange }) => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{label}</label>
        <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-700 dark:text-zinc-300">{value} {unit}</span>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(parseInt(e.target.value) || min)}
          className="flex-1 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
        />
        <input
          type="number" min={numMin || min} max={numMax || max} value={value}
          onChange={(e) => onChange(Math.max(numMin || min, parseInt(e.target.value) || min))}
          className="w-16 text-center px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md text-xs font-medium outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-shadow dark:text-zinc-100"
        />
      </div>
    </div>
  );

  const RadioGroup = ({ name, options, selected, onChange }) => (
    <div className="flex flex-col gap-1.5">
      {options.map(opt => (
        <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
          <div className="relative flex items-center justify-center w-4 h-4">
            <input
              type="radio" name={name} checked={selected === opt.value} onChange={() => onChange(opt.value)}
              className="peer sr-only"
            />
            <div className="w-4 h-4 rounded-full border-2 border-zinc-300 dark:border-zinc-600 peer-checked:border-sky-500 transition-colors"></div>
            <div className="absolute w-2 h-2 rounded-full bg-sky-500 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
          </div>
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">{opt.label}</span>
        </label>
      ))}
    </div>
  );

  return (
    <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/50">
        <div className="flex items-center justify-center w-6 h-6 rounded bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400">
          <Sliders size={14} />
        </div>
        <h2 className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">Pengaturan Potong & Grid</h2>
      </div>

      <div className="p-4 flex flex-col gap-5">
        <div className="flex p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
          <label className="flex-1 cursor-pointer">
            <input type="radio" checked={direction === 'both'} onChange={() => onChangeOption('direction', 'both')} className="peer hidden" />
            <div className="text-center px-3 py-1.5 text-xs font-semibold rounded-md text-zinc-500 peer-checked:bg-white peer-checked:text-zinc-900 peer-checked:shadow-sm dark:text-zinc-400 dark:peer-checked:bg-zinc-900 dark:peer-checked:text-white transition-all">Grid (2D)</div>
          </label>
          <label className="flex-1 cursor-pointer">
            <input type="radio" checked={direction === 'horiz'} onChange={() => onChangeOption('direction', 'horiz')} className="peer hidden" />
            <div className="text-center px-3 py-1.5 text-xs font-semibold rounded-md text-zinc-500 peer-checked:bg-white peer-checked:text-zinc-900 peer-checked:shadow-sm dark:text-zinc-400 dark:peer-checked:bg-zinc-900 dark:peer-checked:text-white transition-all">Horizontal</div>
          </label>
          <label className="flex-1 cursor-pointer">
            <input type="radio" checked={direction === 'vert'} onChange={() => onChangeOption('direction', 'vert')} className="peer hidden" />
            <div className="text-center px-3 py-1.5 text-xs font-semibold rounded-md text-zinc-500 peer-checked:bg-white peer-checked:text-zinc-900 peer-checked:shadow-sm dark:text-zinc-400 dark:peer-checked:bg-zinc-900 dark:peer-checked:text-white transition-all">Vertikal</div>
          </label>
        </div>

        {direction === 'both' && (
          <div className="flex flex-col gap-4">
            <SliderField label="Kolom (Horizontal)" value={cols} unit="Kolom" min={1} max={10} numMax={20} onChange={(v) => onChangeOption('cols', v)} />
            <SliderField label="Baris (Vertikal)" value={rows} unit="Baris" min={1} max={10} numMax={20} onChange={(v) => onChangeOption('rows', v)} />
          </div>
        )}

        {direction === 'horiz' && (
          <div className="flex flex-col gap-4">
            <RadioGroup
              name="horiz-mode" selected={horizMode} onChange={(v) => onChangeOption('horizMode', v)}
              options={[
                { value: 'quantity', label: 'Bagi menjadi jumlah blok / slide' },
                { value: 'pixels', label: 'Bagi berdasarkan lebar piksel (px) pasti' }
              ]}
            />
            {horizMode === 'quantity' 
              ? <SliderField label="Jumlah Slide" value={horizQty} unit="Slide" min={2} max={15} numMax={50} onChange={(v) => onChangeOption('horizQty', v)} />
              : <SliderField label="Lebar per Potongan (px)" value={horizPx} unit="px" min={100} max={4000} step={10} onChange={(v) => onChangeOption('horizPx', v)} />
            }
          </div>
        )}

        {direction === 'vert' && (
          <div className="flex flex-col gap-4">
            <RadioGroup
              name="vert-mode" selected={vertMode} onChange={(v) => onChangeOption('vertMode', v)}
              options={[
                { value: 'quantity', label: 'Bagi menjadi jumlah baris pasti' },
                { value: 'pixels', label: 'Bagi berdasarkan tinggi piksel (px) pasti' }
              ]}
            />
            {vertMode === 'quantity'
              ? <SliderField label="Jumlah Baris" value={vertQty} unit="Baris" min={2} max={15} numMax={50} onChange={(v) => onChangeOption('vertQty', v)} />
              : <SliderField label="Tinggi per Potongan (px)" value={vertPx} unit="px" min={100} max={4000} step={10} onChange={(v) => onChangeOption('vertPx', v)} />
            }
          </div>
        )}

        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-4">
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <div className="relative flex items-center justify-center w-4 h-4">
              <input type="checkbox" checked={overlapEnabled} onChange={(e) => onChangeOption('overlapEnabled', e.target.checked)} className="peer sr-only" />
              <div className="w-4 h-4 rounded border-2 border-zinc-300 dark:border-zinc-600 peer-checked:border-sky-500 peer-checked:bg-sky-500 transition-colors"></div>
              <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">Aktifkan Overlapping (Tumpang Tindih)</span>
          </label>
          {overlapEnabled && (
            <SliderField label="Pixel Overlap" value={overlapPx} unit="px" min={1} max={100} numMax={500} onChange={(v) => onChangeOption('overlapPx', v)} />
          )}
        </div>

        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <label className="flex items-start gap-2.5 cursor-pointer group">
            <div className="relative flex items-center justify-center w-4 h-4 mt-0.5 flex-shrink-0">
              <input type="checkbox" checked={igOrder} onChange={(e) => onChangeOption('igOrder', e.target.checked)} className="peer sr-only" />
              <div className="w-4 h-4 rounded border-2 border-zinc-300 dark:border-zinc-600 peer-checked:border-sky-500 peer-checked:bg-sky-500 transition-colors"></div>
              <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">Urutan Upload IG Feed (Reverse 9→1)</span>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1">
                Memberi nomor terbalik otomatis dari kanan bawah ke kiri atas agar saat diposting di Instagram urutannya pas (#1 terakhir)!
              </span>
            </div>
          </label>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomDropdown({ options, value, onChange, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-2.5 min-h-[46px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3 truncate">
          {selectedOption?.icon && (
            <selectedOption.icon size={18} className="shrink-0" style={{ color: selectedOption.iconColor || 'currentColor' }} />
          )}
          <span className="truncate font-medium">{selectedOption?.label}</span>
        </div>
        <ChevronDown size={18} className={`shrink-0 text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg shadow-zinc-200/50 dark:shadow-none animate-in fade-in zoom-in-95 duration-200">
          <ul className="max-h-[280px] overflow-y-auto p-1.5 custom-scrollbar">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <li
                  key={option.value}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 last:mb-0 cursor-pointer transition-all ${isSelected ? 'bg-sky-50 border border-sky-100 text-sky-700 dark:bg-sky-500/10 dark:border-sky-500/20 dark:text-sky-400 font-semibold' : 'border border-transparent text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.icon && (
                    <option.icon 
                      size={18} 
                      className="shrink-0 transition-colors"
                      style={{ color: isSelected ? 'currentColor' : (option.iconColor || 'currentColor') }}
                    />
                  )}
                  <span className="flex-1 truncate text-sm">{option.label}</span>
                  {isSelected && <Check size={18} className="shrink-0 text-sky-600 dark:text-sky-400" />}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

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
      <style>{`
        .dropdown-option {
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .dropdown-option:hover {
          transform: translateX(4px);
          background-color: var(--accent-glow) !important;
          color: var(--accent-cyan) !important;
        }
        .dropdown-option:hover svg {
          color: var(--accent-cyan) !important;
        }
        
        /* Custom scrollbar for this dropdown */
        .dropdown-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .dropdown-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .dropdown-scroll::-webkit-scrollbar-thumb {
          background-color: var(--border-color);
          border-radius: 10px;
        }
      `}</style>
      
      <button
        type="button"
        className="custom-select w-full flex items-center justify-between transition-all"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          padding: '0.7rem 1rem',
          minHeight: '46px',
          alignItems: 'center',
          cursor: 'default',
          backgroundColor: 'rgba(0,0,0,0.2)',
          border: '1px solid var(--border-color)',
          borderRadius: '0.6rem'
        }}
      >
        <div className="flex items-center gap-3 truncate">
          {selectedOption?.icon && (
            <selectedOption.icon size={18} style={{ color: selectedOption.iconColor || 'var(--text-secondary)' }} className="shrink-0" />
          )}
          <span className="truncate font-medium" style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{selectedOption?.label}</span>
        </div>
        <ChevronDown size={18} className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} style={{ color: 'var(--text-secondary)' }} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
             style={{
               background: 'var(--bg-card)',
               backdropFilter: 'blur(20px)',
               border: '1px solid var(--border-highlight)',
               borderRadius: '0.75rem',
               boxShadow: '0 12px 30px -5px rgba(0, 0, 0, 0.6), 0 0 15px rgba(0, 242, 254, 0.1)',
               padding: '0.4rem'
             }}>
          <ul className="max-h-[280px] overflow-y-auto dropdown-scroll pr-1">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <li
                  key={option.value}
                  className="dropdown-option flex items-center gap-3 px-3.5 py-3 rounded-lg mb-1 last:mb-0"
                  style={{
                    backgroundColor: isSelected ? 'var(--accent-glow)' : 'transparent',
                    color: isSelected ? 'var(--accent-cyan)' : 'var(--text-primary)',
                    fontWeight: isSelected ? '600' : '500',
                    fontSize: '0.9rem',
                    cursor: 'default',
                    border: isSelected ? '1px solid rgba(0, 242, 254, 0.2)' : '1px solid transparent'
                  }}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.icon && (
                    <option.icon 
                      size={18} 
                      style={{ 
                        color: isSelected ? 'var(--accent-cyan)' : (option.iconColor || 'var(--text-secondary)'),
                        transition: 'color 0.3s ease'
                      }} 
                      className="shrink-0" 
                    />
                  )}
                  <span className="flex-1 truncate">{option.label}</span>
                  {isSelected && <Check size={18} className="shrink-0" style={{ color: 'var(--accent-cyan)' }} />}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

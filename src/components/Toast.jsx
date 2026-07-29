import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export default function ToastContainer({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => {
        const { id, message, type = 'info' } = toast;
        
        let bgColor, textColor, borderColor, icon;
        
        if (type === 'success') {
          bgColor = 'bg-emerald-50 dark:bg-emerald-500/10';
          textColor = 'text-emerald-700 dark:text-emerald-400';
          borderColor = 'border-emerald-200 dark:border-emerald-500/20';
          icon = <CheckCircle2 size={18} className="text-emerald-500" />;
        } else if (type === 'warning') {
          bgColor = 'bg-amber-50 dark:bg-amber-500/10';
          textColor = 'text-amber-700 dark:text-amber-400';
          borderColor = 'border-amber-200 dark:border-amber-500/20';
          icon = <AlertTriangle size={18} className="text-amber-500" />;
        } else if (type === 'danger') {
          bgColor = 'bg-red-50 dark:bg-red-500/10';
          textColor = 'text-red-700 dark:text-red-400';
          borderColor = 'border-red-200 dark:border-red-500/20';
          icon = <AlertCircle size={18} className="text-red-500" />;
        } else {
          bgColor = 'bg-sky-50 dark:bg-sky-500/10';
          textColor = 'text-sky-700 dark:text-sky-400';
          borderColor = 'border-sky-200 dark:border-sky-500/20';
          icon = <Info size={18} className="text-sky-500" />;
        }

        return (
          <div 
            key={id} 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg shadow-black/5 pointer-events-auto backdrop-blur-md animate-in slide-in-from-right-8 fade-in duration-300 ${bgColor} ${borderColor}`}
          >
            {icon}
            <span className={`text-sm font-medium ${textColor}`}>{message}</span>
          </div>
        );
      })}
    </div>
  );
}

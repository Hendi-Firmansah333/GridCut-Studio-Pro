import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export default function ToastContainer({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        const { id, message, type = 'info' } = toast;
        const icon = type === 'success' ? <CheckCircle2 size={18} style={{ color: '#10b981' }} /> :
                     type === 'warning' ? <AlertTriangle size={18} style={{ color: '#f59e0b' }} /> :
                     type === 'danger' ? <AlertCircle size={18} style={{ color: '#ef4444' }} /> :
                     <Info size={18} style={{ color: '#00f2fe' }} />;

        return (
          <div key={id} className={`toast ${type}`}>
            {icon}
            <span>{message}</span>
          </div>
        );
      })}
    </div>
  );
}

import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center text-zinc-200">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20 text-red-500">
            <AlertTriangle size={32} />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-4">Ups, Terjadi Kesalahan!</h1>
          <p className="text-zinc-400 max-w-md mx-auto mb-8 leading-relaxed">
            Maaf, aplikasi mengalami kendala saat memproses tampilan atau memori yang tidak terduga. Pekerjaan Anda mungkin terhenti.
          </p>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 max-w-lg w-full mb-8 text-left overflow-x-auto font-mono text-xs text-red-400">
            {this.state.error && this.state.error.toString()}
          </div>

          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors"
          >
            <RefreshCcw size={18} />
            <span>Muat Ulang Aplikasi</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

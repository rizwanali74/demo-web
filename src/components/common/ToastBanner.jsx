import { CheckCircle2 } from 'lucide-react';
import { useStore } from '../../hooks/useStore';

export default function ToastBanner({ offsetClass = 'top-24' }) {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div
      className={`fixed ${offsetClass} right-6 z-[110] bg-[#141414] text-white text-xs py-3 px-4 rounded-full shadow-2xl flex items-center gap-2.5 border border-white/10 animate-fadeIn`}
    >
      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
      <span>{toastMessage}</span>
    </div>
  );
}


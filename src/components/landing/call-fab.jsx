'use client';

import { useCall } from './call-provider';

/** Visible only in idle/ended — hidden while connecting or live. */
export default function CallFab() {
  const { showFab, startCall } = useCall();
  if (!showFab) return null;

  return (
    <button
      type="button"
      onClick={startCall}
      className="fixed bottom-7 left-7 z-50 flex items-center gap-3 rounded-full bg-navy py-[14px] ps-[22px] pe-4 text-white shadow-fab transition-transform hover:-translate-y-[2px]"
    >
      <span
        className="flex h-10 w-10 animate-pulse-ring-slow items-center justify-center rounded-full bg-[linear-gradient(135deg,#00E5FF,#248BD3)] text-[18px] leading-none"
        aria-hidden="true"
      >
        🎙
      </span>
      <span className="text-[15px] font-extrabold">דברו עם הסוכן</span>
    </button>
  );
}

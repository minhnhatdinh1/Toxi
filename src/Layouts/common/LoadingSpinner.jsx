import React from 'react';

export default function LoadingSpinner({
  size = 42,
  text = 'Dang tai du lieu...',
  fullScreen = false,
  className = '',
}) {
  const wrapperClass = fullScreen
    ? 'fixed inset-0 z-[120] bg-white/80 backdrop-blur-sm'
    : 'w-full py-10';

  return (
    <div className={`${wrapperClass} ${className}`} role="status" aria-live="polite">
      <div className="flex h-full w-full items-center justify-center">
        <div className="rounded-2xl border border-primary/10 bg-white px-8 py-6 shadow-[0_12px_40px_rgba(31,47,140,0.16)]">
          <div className="flex items-center gap-4">
            <div className="relative" style={{ width: size, height: size }}>
              <span className="absolute inset-0 rounded-full border-2 border-primary/20" />
              <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary animate-spin" />
              <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary shadow-sm" />
            </div>
            {text && (
              <div>
                <p className="text-sm font-bold text-primary">{text}</p>
                <p className="text-xs text-slate-500">TOXI dang tai, vui long doi mot chut</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

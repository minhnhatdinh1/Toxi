import React from 'react';

export default function LoadingSpinner({ size = 24, text = 'Đang tải...' }) {
  return (
    <div className="flex items-center gap-3" role="status" aria-live="polite">
      <svg
        className="animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      {text && <span className="text-sm text-slate-600">{text}</span>}
    </div>
  );
}

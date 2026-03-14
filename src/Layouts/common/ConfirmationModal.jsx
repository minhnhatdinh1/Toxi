import React from 'react';

export default function ConfirmationModal({
  open,
  title = 'Xác nhận',
  message = 'Bạn có chắc chắn muốn thực hiện hành động này?',
  onConfirm,
  onCancel,
  confirmText = 'Đồng ý',
  cancelText = 'Hủy',
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-surface-dark rounded-xl shadow-xl max-w-sm w-full p-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          {title}
        </h2>
        <p className="text-slate-700 dark:text-slate-300 mb-6">
          {message}
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

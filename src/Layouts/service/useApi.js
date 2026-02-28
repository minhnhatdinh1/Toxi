import { useState, useCallback } from 'react';
import { useToast } from '../common/ToastContext';

/**
 * Hook that wraps any async API call and manages loading/error state.
 * It also automatically shows error toasts and returns the result.
 *
 * Usage:
 * const { call, loading, error } = useApi();
 * const data = await call(myApiFunction, arg1, arg2);
 */
export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addToast } = useToast();

  const call = useCallback(
    async (apiFunc, ...args) => {
      setError(null);
      setLoading(true);
      try {
        const result = await apiFunc(...args);
        return result;
      } catch (err) {
        // prefer server message, fallback to generic
        const message =
          err?.response?.data?.message || err.message || 'Lỗi hệ thống';
        setError(message);
        addToast(message, 'error');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );

  return { call, loading, error };
}

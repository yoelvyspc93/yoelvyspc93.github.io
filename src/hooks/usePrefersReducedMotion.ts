import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

export const usePrefersReducedMotion = (): boolean => {
  const [prefersReduced, setPrefersReduced] = useState<boolean>(() => {
    try {
      return typeof globalThis.matchMedia === 'function'
        ? globalThis.matchMedia(QUERY).matches
        : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const mediaQuery = globalThis.matchMedia(QUERY);
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
};

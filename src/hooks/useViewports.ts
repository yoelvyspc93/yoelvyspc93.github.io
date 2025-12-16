import { useState, useEffect } from 'react';

interface Dimensions {
  width: number;
  height: number;
  breakpoint: 'mobile' | 'tablet' | 'desktop';
}

const breakpoints = {
  mobile: 393,
  tablet: 768,
  desktop: 1440,
  widescreen: 1920,
};

export const useViewports = (): Dimensions => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
    breakpoint: 'desktop',
  });

  useEffect(() => {
    function getBreakpoint(width: number): Dimensions['breakpoint'] {
      if (width < breakpoints.mobile) return 'mobile';
      if (width < breakpoints.tablet) return 'tablet';
      if (width < breakpoints.desktop) return 'desktop';
      if (width < breakpoints.widescreen) return 'desktop';
      return 'desktop';
    }

    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const breakpoint = getBreakpoint(width);
      setDimensions({ width, height, breakpoint });
    };

    updateDimensions();

    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        updateDimensions();
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return dimensions;
};

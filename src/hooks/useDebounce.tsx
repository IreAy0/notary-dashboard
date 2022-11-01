import { useEffect, useRef } from 'react';

const useDebounce = (callback: () => void, delay: number, dependencies: any[]) => {
  const isFirstRender = useRef<any>(true);
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => callback(), delay);

    /* eslint-disable-next-line */
  }, dependencies);
};

export default useDebounce;

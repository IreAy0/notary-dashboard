import { useEffect, useRef } from 'react';

export default function useUpdateEffect(callback: () => void, dependencies: any[]) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }

    callback();
    /* eslint-disable-next-line */
  }, dependencies);
}

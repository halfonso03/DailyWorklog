/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

export function useOutsideClick(handler: any, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e: any) {

        const cur = ref.current as any;

        if (cur && !cur.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener('click', handleClick, listenCapturing);

      return () =>
        document.removeEventListener('click', handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}

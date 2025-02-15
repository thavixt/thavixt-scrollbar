import { ThavixtScrollbar, ThavixtScrollbarOptions } from 'thavixt-scrollbar-core'
import { useEffect, useRef } from 'react'

export function useScrollbar<T extends HTMLElement>(options: ThavixtScrollbarOptions) {
  const ref = useRef<T>(null)
  const scrollbarRef = useRef<ThavixtScrollbar<T> | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    scrollbarRef.current = new ThavixtScrollbar(ref.current, options);

    return () => {
      if (scrollbarRef.current) {
        scrollbarRef.current.destroy();
        scrollbarRef.current = null;
      }
    }
    // the `options` dep should be stable?
  }, [options, ref])

  return ref;
}

export {
  ThavixtScrollbar as Scrollbar,
}

export type {
  ThavixtScrollbarOptions as ScrollbarOptions,
}

export default useScrollbar
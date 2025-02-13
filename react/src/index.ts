import { ThavixtScrollbar, ThavixtScrollbarOptions } from 'thavixt-scrollbar-core'
import { RefObject, useEffect, useRef } from 'react'

export function useScrollbar(
  ref: RefObject<HTMLDivElement | null>,
  options: ThavixtScrollbarOptions,
) {
  const scrollbarRef = useRef<ThavixtScrollbar | null>(null);

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
}

export {
  ThavixtScrollbar as Scrollbar,
}

export type {
  ThavixtScrollbarOptions as ScrollbarOptions,
}

export default useScrollbar
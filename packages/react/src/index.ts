import {
	Scrollbar,
	ScrollbarOptions,
} from "thavixt-scrollbar-core";
import { useEffect, useRef } from "react";

export function useScrollbar<T extends HTMLElement = HTMLElement>(
	options: ScrollbarOptions,
) {
	const ref = useRef<T>(null);
	const scrollbarRef = useRef<Scrollbar<T> | null>(null);

	useEffect(() => {
		if (!ref.current) {
			return;
		}
		scrollbarRef.current = new Scrollbar(ref.current, options);

		return () => {
			if (scrollbarRef.current) {
				scrollbarRef.current.destroy();
				scrollbarRef.current = null;
			}
		};
		// the `options` dep should be stable?
	}, [options, ref]);

	return ref;
}

export {
	DEFAULT_CSS_STYLESHEET,
	DEFAULT_STYLES,
} from 'thavixt-scrollbar-core';
export type {
	ScrollbarStyles,
	ScrollDirection,
	Scrollbar as ScrollbarCore,
	ScrollbarOptions,
	ScrollbarScrollDetails,
	ScrollbarThresholdsReached,
} from 'thavixt-scrollbar-core'

export default useScrollbar;

import {
	Scrollbar,
	ScrollbarOptions as CoreScrollbarOptions,
} from "thavixt-scrollbar-core";
import { RefObject, useEffect, useRef } from "react";

interface ScrollbarOptions extends CoreScrollbarOptions {
	body?: boolean;
}

export function useScrollbar<T extends HTMLElement = HTMLElement>(options?: ScrollbarOptions): RefObject<T> {
	const ref = useRef<T | null>(null);
	const bodyRef = useRef(document.body);
	const scrollbarRef = useRef<Scrollbar<T> | null>(null);

	useEffect(() => {
		if (options?.body || ref) {
			ref.current = null;
		}
		return;
	}, [options?.body]);

	useEffect(() => {
		if (!(ref.current || options?.body)) {
			return;
		}
		const subject = (options?.body ? document.body : ref.current) as T;
		scrollbarRef.current = new Scrollbar<T>(subject, options);
		return () => {
			if (scrollbarRef.current) {
				scrollbarRef.current.destroy();
			}
			scrollbarRef.current = null;
		};
	}, [options]);

	if (options?.body) {
		return bodyRef as RefObject<T>;
	}

	return ref as RefObject<T>;
}

export {
	DEFAULT_CSS_STYLESHEET,
	DEFAULT_STYLES,
} from 'thavixt-scrollbar-core';
export type {
	Scrollbar as ScrollbarCore,
	ScrollbarStyles,
	ScrollDirection,
	ScrollbarOptions,
	ScrollbarScrollDetails,
} from 'thavixt-scrollbar-core'

export default useScrollbar;

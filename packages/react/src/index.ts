import {
	Scrollbar,
	ScrollbarOptions,
} from "thavixt-scrollbar-core";
import { RefObject, useEffect, useRef } from "react";

export function useScrollbar(
	options: ScrollbarOptions, applyToBody: boolean,
): undefined;
export function useScrollbar<T extends HTMLElement = HTMLElement>(
	options: ScrollbarOptions, applyToBody?: boolean,
): RefObject<T> | undefined;
export function useScrollbar<T extends HTMLElement = HTMLElement>(
	options: ScrollbarOptions, applyToBody?: boolean,
): RefObject<T> | undefined {
	const ref = useRef<T>(null);
	const scrollbarRef = useRef<Scrollbar<T> | null>(null);

	useEffect(() => {
		if (applyToBody) {
			ref.current = null;
		}
		return;
	}, [applyToBody]);

	useEffect(() => {
		if (!(ref.current || applyToBody)) {
			return;
		}
		scrollbarRef.current = new Scrollbar<T>(
			applyToBody ? document.body as T : (ref as RefObject<T>).current, options,
		);
		return () => {
			if (scrollbarRef.current) {
				scrollbarRef.current.destroy();
			}
			scrollbarRef.current = null;
		};
	}, [applyToBody, options]);

	if (applyToBody) {
		return undefined;
	}

	return ref as RefObject<T>;
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

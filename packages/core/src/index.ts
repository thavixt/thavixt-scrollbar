export type ScrollDirection = "top" | "bottom" | "left" | "right";
export type ScrollbarScrollDetails = Record<ScrollDirection, number>;

type ScrollbarThresholdsReached = Partial<
	Record<ScrollDirection, boolean>
>;

export type ScrollbarOptions = {
	// Callback on scroll
	onScroll?: (details: ScrollbarScrollDetails) => void;
	// Callback when the element is scrolled to it's min/max width/height
	onScrollToEnd?: (directions: ScrollDirection[]) => void;
	// Styles to apply to the element's vertical/horizontal scrollbar
	styles?: ScrollbarStyles;
};

export type ScrollbarStyles = {
	// Border radius
	borderRadius?: number;

	// Dimensions
	width?: number;
	height?: number;

	// Light theme colors
	thumbColor?: string;
	thumbHoverColor?: string;
	trackColor?: string;
	
	// Dark theme colors
	thumbColorDark?: string;
	thumbHoverColorDark?: string;
	trackColorDark?: string;
};

const DEFAULT_THUMB_COLOR = "#aaaabb";
const DEFAULT_THUMB_COLOR_DARK = "#9999aa";
const DEFAULT_THUMB_HOVER_COLOR = "#888899";
const DEFAULT_THUMB_HOVER_COLOR_DARK = "#ccccdd";
const DEFAULT_TRACK_COLOR = "transparent";
const DEFAULT_TRACK_COLOR_DARK = "transparent";
const DEFAULT_TRACK_SIZE = 8;
const DEFAULT_TRACK_BORDER_RADIUS = 8;

export const DEFAULT_STYLES: Required<ScrollbarStyles> = {
	// Border radius
	borderRadius: DEFAULT_TRACK_BORDER_RADIUS,
	
	// Dimensions
	width: DEFAULT_TRACK_SIZE,
	height: DEFAULT_TRACK_SIZE,
	
	// Light theme colors
	thumbColor: DEFAULT_THUMB_COLOR,
	thumbHoverColor: DEFAULT_THUMB_HOVER_COLOR,
	trackColor: DEFAULT_TRACK_COLOR,
	// Dark theme colors
	thumbColorDark: DEFAULT_THUMB_COLOR_DARK,
	thumbHoverColorDark: DEFAULT_THUMB_HOVER_COLOR_DARK,
	trackColorDark: DEFAULT_TRACK_COLOR_DARK,
}

const createScrollbarStyles = (
	id: string | null,
	styles: ScrollbarStyles = {},
): string => {
	const elementSelector = id ? `[data-tsb-id="${id}"]` : `*`;

	// border radius
	const borderRadius = styles.borderRadius ?? DEFAULT_TRACK_BORDER_RADIUS;
	// dimensions
	const width = styles.width ?? DEFAULT_TRACK_SIZE;
	const height = styles.height ?? DEFAULT_TRACK_SIZE;

	// light colors
	const thumbColor = styles.thumbColor ?? DEFAULT_THUMB_COLOR;
	const thumbHoverColor = styles.thumbHoverColor ?? DEFAULT_THUMB_HOVER_COLOR;
	const trackColor = styles.trackColor ?? DEFAULT_TRACK_COLOR;
	// dark colors
	const thumbColorDark = styles.thumbColorDark ?? DEFAULT_THUMB_COLOR_DARK;
	const thumbHoverColorDark = styles.thumbHoverColorDark ?? DEFAULT_THUMB_HOVER_COLOR_DARK;
	const trackColorDark = styles.trackColorDark ?? DEFAULT_TRACK_COLOR_DARK;

	const variables = `/* Variables */
${elementSelector} {
	--tsb_width: ${width}px;
	--tsb_height: ${height}px;
	--tsb_borderRadius: ${borderRadius ? `${borderRadius}px` : `initial`};
}
${elementSelector} {
	--tsb_scrollCornerBackground: ${borderRadius ? `initial` : 'transparent'};
	--tsb_thumbColor: ${thumbColor};
	--tsb_thumbHoverColor: ${thumbHoverColor};
	--tsb_trackColor: ${trackColor};
}
@media (prefers-color-scheme: dark) {
	${elementSelector} {
		--tsb_thumbColor: ${thumbColorDark};
		--tsb_thumbHoverColor: ${thumbHoverColorDark};
		--tsb_trackColor: ${trackColorDark};
	}
}`;

	const scopedStyles = `/* thavixt-scrollbar stylesheet for element ${elementSelector} */
${variables}
/* dimensions */
${elementSelector}::-webkit-scrollbar {
	width: var(--tsb_width);
	height: var(--tsb_height);
}

/* scrollbar track style */
${elementSelector}::-webkit-scrollbar-track {
	border-radius: var(--tsb_borderRadius);
	background: var(--tsb_trackColor);
}

/* scrollbar track corner style */
${elementSelector}::-webkit-scrollbar-corner {
	background: var(--tsb_scrollCornerBackground);
}

/* scrollbar thumb styles */
${elementSelector}::-webkit-scrollbar-thumb {
	border-radius: var(--tsb_borderRadius);
	background: var(--tsb_thumbColor);
}

/* scrollbar hovered thumb styles */
${elementSelector}::-webkit-scrollbar-thumb:hover {
	background: var(--tsb_thumbHoverColor);
}

/* fallback - Firefox doesn't support '::-webkit-scrollbar' selectors */
@supports (-moz-appearance:none) {
	${elementSelector} {
		scrollbar-color: var(--tsb_thumbColor) var(--tsb_trackColor);
	}
}`;

return `${scopedStyles}`
};

export const DEFAULT_CSS_STYLESHEET = createScrollbarStyles("REPLACEME").replace(
	/="REPLACEME"/g,
	"",
);

export class Scrollbar<T extends HTMLElement = HTMLElement> {
	public stylesheetId = ``;
	public tsbId = ``;
	private scrollTop = 0;
	private scrollLeft = 0;
	private prevScrollDetails: null | Partial<ScrollbarScrollDetails> = null;
	private prevThresholdsReached: null | Partial<ScrollbarThresholdsReached> = null;

	constructor(
		public container: T,
		public options: ScrollbarOptions = {},
	) {
		const rnd = crypto.randomUUID().slice(0, 8);
		this.tsbId = `tsb_scrollbar_${rnd}`;
		this.stylesheetId = `tsb_scrollbar_style_${rnd}`;
		this.init();
	}

	private init = () => {
		this.addStyleSheet();
		this.addEventListeners();
		this.container.style.overflow = "auto";
		this.container.dataset["tsbId"] = this.tsbId;
	};

	destroy = () => {
		this.removeStyleSheet();
		this.removeEventListeners();
		// this.container.style.overflow = "initial";
		delete this.container.dataset["tsbId"];
	};

	private addStyleSheet = () => {
		const alreadyInjected = !!document.getElementById(this.stylesheetId);
		if (alreadyInjected) {
			this.removeStyleSheet();
		}
		const css = document.createElement("style");
		css.id = this.stylesheetId;
		const applyToAll = this.container === document.body;
		css.appendChild(document.createTextNode(createScrollbarStyles(applyToAll ? null : this.tsbId, {
			...DEFAULT_STYLES,
			...this.options.styles,
		})));
		document.head.prepend(css);
	};

	private removeStyleSheet = () => {
		const stylesheet = document.getElementById(this.stylesheetId);
		if (!stylesheet) {
			return;
		}
		stylesheet.remove();
	};

	private addEventListeners = () => {
		this.container.addEventListener("scroll", this.onScroll);
	};

	private removeEventListeners = () => {
		this.container.removeEventListener("scroll", this.onScroll);
	};

	// @todo
	private onClick = () => {
		console.log("Not yet implemented - Scrollbar::onClick()");
	};

	private onScroll = (e: Event) => {
		const target = e.target as T;

		// scroll values
		const top = target.scrollTop;
		const bottom = Math.ceil(target.scrollHeight - target.scrollTop);
		const left = target.scrollLeft;
		const right = Math.ceil(target.scrollWidth - target.scrollLeft);
		const scrollValues = { top, bottom, left, right };
		// scroll threshold reached
		const topReached = !!this.scrollTop && top === 0;
		const bottomReached = bottom === target.clientHeight;
		const leftReached = !!this.scrollLeft && left === 0;
		const rightReached = right === target.clientWidth;
		const thresholdsReached = filterTruthyValues({
			top: topReached,
			bottom: bottomReached,
			left: leftReached,
			right: rightReached,
		});

		this.scrollTop = top;
		this.scrollLeft = left;

		const thresholdsReachedChanged =
			JSON.stringify(thresholdsReached) !==
			JSON.stringify(this.prevThresholdsReached);
		const directions = Object.keys(thresholdsReached) as ScrollDirection[];
		if (thresholdsReachedChanged && directions.length) {
			if (this.prevThresholdsReached && this.options.onScrollToEnd) {
				this.options.onScrollToEnd(directions);
			}
			this.prevThresholdsReached = thresholdsReached;
			this.container.dataset.animating = (
				Object.keys(thresholdsReached) as ScrollDirection[]
			).join(",");
		} else {
			delete this.container.dataset.animating;
		}

		const scrollValuesChanged =
			JSON.stringify(scrollValues) !==
			JSON.stringify(this.prevScrollDetails);
		if (scrollValuesChanged) {
			if (this.prevScrollDetails) {
				this.options.onScroll?.(scrollValues);
			}
			this.prevScrollDetails = scrollValues;
		}
	};
}

function filterTruthyValues<T extends Record<string, unknown>>(
	obj: T,
): Partial<T> {
	return Object.keys(obj).reduce((acc, key) => {
		if (obj[key]) {
			return {
				...acc,
				[key]: obj[key],
			};
		}
		return acc;
	}, {} as Partial<T>);
}

export default Scrollbar;

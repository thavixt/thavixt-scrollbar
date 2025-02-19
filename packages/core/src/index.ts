export type ScrollDirection = "top" | "bottom" | "left" | "right";
export type ScrollbarScrollDetails = Record<ScrollDirection, number>;
export type ScrollbarThresholdsReached = Partial<
	Record<ScrollDirection, boolean>
>;

export type ScrollbarOptions = Partial<{
	// Callback on scroll
	onScroll?: (details: ScrollbarScrollDetails) => void;
	// Callback when the element is scrolled to it's min/max width/height
	onScrollToEnd?: (thresholds: ScrollbarThresholdsReached) => void;
	// Styles to apply to the element's vertical/horizontal scrollbar
	styles?: ScrollbarStyles;
}>;

export type ScrollbarStyles = Partial<{
	borderRadius: number;
	height: number;
	thumbColor: string;
	thumbColorDark: string;
	thumbHoverColor: string;
	thumbHoverColorDark: string;
	trackColor: string;
	trackColorDark: string;
	width: number;
}>;

const DEFAULT_THUMB_COLOR = "#aaaabb";
const DEFAULT_THUMB_COLOR_DARK = "#9999aa";
const DEFAULT_THUMB_HOVER_COLOR = "#888899";
const DEFAULT_THUMB_HOVER_COLOR_DARK = "#ccccdd";
const DEFAULT_TRACK_COLOR = "transparent";
const DEFAULT_TRACK_COLOR_DARK = "transparent";
const DEFAULT_TRACK_SIZE = 8;
const DEFAULT_TRACK_BORDER_RADIUS = 8;

export const DEFAULT_STYLES: Required<ScrollbarStyles> = {
	width: DEFAULT_TRACK_SIZE,
	height: DEFAULT_TRACK_SIZE,
	borderRadius: DEFAULT_TRACK_BORDER_RADIUS,
	thumbColor: DEFAULT_THUMB_COLOR,
	thumbColorDark: DEFAULT_THUMB_COLOR_DARK,
	thumbHoverColor: DEFAULT_THUMB_HOVER_COLOR,
	thumbHoverColorDark: DEFAULT_THUMB_HOVER_COLOR_DARK,
	trackColor: DEFAULT_TRACK_COLOR,
	trackColorDark: DEFAULT_TRACK_COLOR_DARK,
}

const createScrollbarStyles = (
	id: string | null,
	styles: ScrollbarStyles = {},
): string => {
	const elementSelector = id ? `[data-tsb-id="${id}"]` : `*`;
	const scopedVariables = `/* Variables */
${elementSelector} {
	--tsb_width: ${styles.width ?? DEFAULT_TRACK_SIZE}px;
	--tsb_height: ${styles.height ?? DEFAULT_TRACK_SIZE}px;
	--tsb_trackColor: ${`light-dark(${styles.trackColor ?? DEFAULT_TRACK_COLOR}, ${styles.trackColorDark ?? DEFAULT_TRACK_COLOR_DARK})`};
	--tsb_thumbColor: ${`light-dark(${styles.thumbColor ?? DEFAULT_THUMB_COLOR}, ${styles.thumbColorDark ?? DEFAULT_THUMB_COLOR_DARK})`};
	--tsb_thumbHoverColor: ${`light-dark(${styles.thumbHoverColor ?? DEFAULT_THUMB_HOVER_COLOR}, ${styles.thumbHoverColorDark ?? DEFAULT_THUMB_HOVER_COLOR_DARK})`};
	--tsb_borderRadius: ${styles.borderRadius}px;
}`;

	const scopedStyles = `${scopedVariables}
/* scrollbar size */
${elementSelector}::-webkit-scrollbar {
	width: var(--tsb_width);
	height: var(--tsb_height);
}

/* scrollbar track style */
${elementSelector}::-webkit-scrollbar-track {
	background: var(--tsb_trackColor);
	border-radius: var(--tsb_borderRadius);
}

/* vertical scrollbar track style */
${elementSelector}::-webkit-scrollbar-vertical {}

/* horizontal scrollbar track style */
${elementSelector}::-webkit-scrollbar-horizontal {}

/* scrollbar track corner style - where horizontal and vertical tracks meet */
${elementSelector}::-webkit-scrollbar-corner {
	${(styles.borderRadius ?? DEFAULT_TRACK_BORDER_RADIUS) > 0 ? `background: transparent;` : `background: var(--tsb_trackColor);`}
}

/* scrollbar thumb styles */
${elementSelector}::-webkit-scrollbar-thumb {
	background: var(--tsb_thumbColor);
	${styles.borderRadius ? `border-radius: var(--tsb_borderRadius);` : ``}
}
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
		this.container.style.overflow = "initial";
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
		if (thresholdsReachedChanged) {
			if (this.prevThresholdsReached && this.options.onScrollToEnd) {
				this.options.onScrollToEnd(thresholdsReached);
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

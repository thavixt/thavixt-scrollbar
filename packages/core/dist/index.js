const DEFAULT_THUMB_COLOR = "#aaaabb";
const DEFAULT_THUMB_COLOR_DARK = "#9999aa";
const DEFAULT_THUMB_HOVER_COLOR = "#888899";
const DEFAULT_THUMB_HOVER_COLOR_DARK = "#ccccdd";
const DEFAULT_TRACK_COLOR = "transparent";
const DEFAULT_TRACK_COLOR_DARK = "transparent";
const DEFAULT_TRACK_SIZE = 8;
const DEFAULT_TRACK_BORDER_RADIUS = 8;
export const DEFAULT_STYLES = {
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
};
const createScrollbarStyles = (id, styles = {}) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const elementSelector = id ? `[data-tsb-id="${id}"]` : `*`;
    // border radius
    const borderRadius = (_a = styles.borderRadius) !== null && _a !== void 0 ? _a : DEFAULT_TRACK_BORDER_RADIUS;
    // dimensions
    const width = (_b = styles.width) !== null && _b !== void 0 ? _b : DEFAULT_TRACK_SIZE;
    const height = (_c = styles.height) !== null && _c !== void 0 ? _c : DEFAULT_TRACK_SIZE;
    // light colors
    const thumbColor = (_d = styles.thumbColor) !== null && _d !== void 0 ? _d : DEFAULT_THUMB_COLOR;
    const thumbHoverColor = (_e = styles.thumbHoverColor) !== null && _e !== void 0 ? _e : DEFAULT_THUMB_HOVER_COLOR;
    const trackColor = (_f = styles.trackColor) !== null && _f !== void 0 ? _f : DEFAULT_TRACK_COLOR;
    // dark colors
    const thumbColorDark = (_g = styles.thumbColorDark) !== null && _g !== void 0 ? _g : DEFAULT_THUMB_COLOR_DARK;
    const thumbHoverColorDark = (_h = styles.thumbHoverColorDark) !== null && _h !== void 0 ? _h : DEFAULT_THUMB_HOVER_COLOR_DARK;
    const trackColorDark = (_j = styles.trackColorDark) !== null && _j !== void 0 ? _j : DEFAULT_TRACK_COLOR_DARK;
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
    return `${scopedStyles}`;
};
export const DEFAULT_CSS_STYLESHEET = createScrollbarStyles("REPLACEME").replace(/="REPLACEME"/g, "");
export class Scrollbar {
    constructor(container, options = {}) {
        this.container = container;
        this.options = options;
        this.stylesheetId = ``;
        this.tsbId = ``;
        this.scrollTop = 0;
        this.scrollLeft = 0;
        this.prevScrollDetails = null;
        this.prevThresholdsReached = null;
        this.init = () => {
            this.addStyleSheet();
            this.addEventListeners();
            this.container.style.overflow = "auto";
            this.container.dataset["tsbId"] = this.tsbId;
        };
        this.destroy = () => {
            this.removeStyleSheet();
            this.removeEventListeners();
            // this.container.style.overflow = "initial";
            delete this.container.dataset["tsbId"];
        };
        this.addStyleSheet = () => {
            const alreadyInjected = !!document.getElementById(this.stylesheetId);
            if (alreadyInjected) {
                this.removeStyleSheet();
            }
            const css = document.createElement("style");
            css.id = this.stylesheetId;
            const applyToAll = this.container === document.body;
            css.appendChild(document.createTextNode(createScrollbarStyles(applyToAll ? null : this.tsbId, Object.assign(Object.assign({}, DEFAULT_STYLES), this.options.styles))));
            document.head.prepend(css);
        };
        this.removeStyleSheet = () => {
            const stylesheet = document.getElementById(this.stylesheetId);
            if (!stylesheet) {
                return;
            }
            stylesheet.remove();
        };
        this.addEventListeners = () => {
            this.container.addEventListener("scroll", this.onScroll);
        };
        this.removeEventListeners = () => {
            this.container.removeEventListener("scroll", this.onScroll);
        };
        // @todo
        this.onClick = () => {
            console.log("Not yet implemented - Scrollbar::onClick()");
        };
        this.onScroll = (e) => {
            var _a, _b;
            const target = e.target;
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
            const thresholdsReachedChanged = JSON.stringify(thresholdsReached) !==
                JSON.stringify(this.prevThresholdsReached);
            if (thresholdsReachedChanged && Object.keys(thresholdsReached).length) {
                if (this.prevThresholdsReached && this.options.onScrollToEnd) {
                    this.options.onScrollToEnd(thresholdsReached);
                }
                this.prevThresholdsReached = thresholdsReached;
                this.container.dataset.animating = Object.keys(thresholdsReached).join(",");
            }
            else {
                delete this.container.dataset.animating;
            }
            const scrollValuesChanged = JSON.stringify(scrollValues) !==
                JSON.stringify(this.prevScrollDetails);
            if (scrollValuesChanged) {
                if (this.prevScrollDetails) {
                    (_b = (_a = this.options).onScroll) === null || _b === void 0 ? void 0 : _b.call(_a, scrollValues);
                }
                this.prevScrollDetails = scrollValues;
            }
        };
        const rnd = crypto.randomUUID().slice(0, 8);
        this.tsbId = `tsb_scrollbar_${rnd}`;
        this.stylesheetId = `tsb_scrollbar_style_${rnd}`;
        this.init();
    }
}
function filterTruthyValues(obj) {
    return Object.keys(obj).reduce((acc, key) => {
        if (obj[key]) {
            return Object.assign(Object.assign({}, acc), { [key]: obj[key] });
        }
        return acc;
    }, {});
}

const DEFAULT_THUMB_COLOR = "#aaaabb";
const DEFAULT_THUMB_COLOR_DARK = "#9999aa";
const DEFAULT_THUMB_HOVER_COLOR = "#888899";
const DEFAULT_THUMB_HOVER_COLOR_DARK = "#ccccdd";
const DEFAULT_TRACK_COLOR = "transparent";
const DEFAULT_TRACK_COLOR_DARK = "transparent";
const DEFAULT_TRACK_SIZE = 8;
const DEFAULT_TRACK_BORDER_RADIUS = 8;
export const DEFAULT_STYLES = {
    width: DEFAULT_TRACK_SIZE,
    height: DEFAULT_TRACK_SIZE,
    borderRadius: DEFAULT_TRACK_BORDER_RADIUS,
    thumbColor: DEFAULT_THUMB_COLOR,
    thumbColorDark: DEFAULT_THUMB_COLOR_DARK,
    thumbHoverColor: DEFAULT_THUMB_HOVER_COLOR,
    thumbHoverColorDark: DEFAULT_THUMB_HOVER_COLOR_DARK,
    trackColor: DEFAULT_TRACK_COLOR,
    trackColorDark: DEFAULT_TRACK_COLOR_DARK,
};
const createScrollbarStyles = (id, styles = {}) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const elementSelector = id ? `[data-tsb-id="${id}"]` : `*`;
    const scopedVariables = `/* Variables */
${elementSelector} {
	--tsb_width: ${(_a = styles.width) !== null && _a !== void 0 ? _a : DEFAULT_TRACK_SIZE}px;
	--tsb_height: ${(_b = styles.height) !== null && _b !== void 0 ? _b : DEFAULT_TRACK_SIZE}px;
	--tsb_trackColor: ${`light-dark(${(_c = styles.trackColor) !== null && _c !== void 0 ? _c : DEFAULT_TRACK_COLOR}, ${(_d = styles.trackColorDark) !== null && _d !== void 0 ? _d : DEFAULT_TRACK_COLOR_DARK})`};
	--tsb_thumbColor: ${`light-dark(${(_e = styles.thumbColor) !== null && _e !== void 0 ? _e : DEFAULT_THUMB_COLOR}, ${(_f = styles.thumbColorDark) !== null && _f !== void 0 ? _f : DEFAULT_THUMB_COLOR_DARK})`};
	--tsb_thumbHoverColor: ${`light-dark(${(_g = styles.thumbHoverColor) !== null && _g !== void 0 ? _g : DEFAULT_THUMB_HOVER_COLOR}, ${(_h = styles.thumbHoverColorDark) !== null && _h !== void 0 ? _h : DEFAULT_THUMB_HOVER_COLOR_DARK})`};
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
	${((_j = styles.borderRadius) !== null && _j !== void 0 ? _j : DEFAULT_TRACK_BORDER_RADIUS) > 0 ? `background: transparent;` : `background: var(--tsb_trackColor);`}
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
            if (thresholdsReachedChanged) {
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

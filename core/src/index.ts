export type ScrollDirection = 'top' | 'bottom' | 'left' | 'right';

export type ScrollbarScrollDetails = Record<ScrollDirection, number>;
export type ScrollbarThresholdsReached = Partial<Record<ScrollDirection, boolean>>;

export type ThavixtScrollbarOptions = Partial<{
  // Callback on scroll
  onScroll?: (details: ScrollbarScrollDetails) => void;
  // Callback when the element is scrolled to it's min/max width/height
  onScrollToEnd?: (thresholds: ScrollbarThresholdsReached) => void;
  // Styles to apply to the element's vertical/horizontal scrollbar
  styles?: Partial<ThavixtScrollbarStyles>;
}>

export interface ThavixtScrollbarStyles {
  // Size in pixels
  width: number;
  // Size in pixels
  height: number;
  // CSS color
  trackColor: string;
  // CSS color
  thumbColor: string;
  // CSS color
  thumbHoverColor: string;
}

const DEFAULT_SIZE = 8;
const DEFAULT_COLOR_TRACK = 'transparent';
const DEFAULT_COLOR_THUMB_LIGHT = 'black';
const DEFAULT_COLOR_THUMB_DARK = 'gray';
const DEFAULT_COLOR_THUMB_HOVER_LIGHT = 'darkgray';
const DEFAULT_COLOR_THUMB_HOVER_DARK = 'white';

const createScrollbarStyles = (id: string, styles: Partial<ThavixtScrollbarStyles> = {}): string => {
  return `/* Variables */
[data-tsb-id="${id}"] {
  --tsb_width: ${styles.width ?? DEFAULT_SIZE}px;
  --tsb_height: ${styles.height ?? DEFAULT_SIZE}px;
  --tsb_trackColor: ${styles.trackColor ?? DEFAULT_COLOR_TRACK};
}
/* Theming */
@media (prefers-color-scheme: light) {
  [data-tsb-id="${id}"] {
    --tsb_thumbColor: ${styles.thumbColor ?? DEFAULT_COLOR_THUMB_LIGHT};
    --tsb_thumbHoverColor: ${styles.thumbHoverColor ?? DEFAULT_COLOR_THUMB_HOVER_LIGHT};
  }
}
@media (prefers-color-scheme: dark) {
  [data-tsb-id="${id}"] {
    --tsb_thumbColor: ${styles.thumbColor ?? DEFAULT_COLOR_THUMB_DARK};
    --tsb_thumbHoverColor: ${styles.thumbHoverColor ?? DEFAULT_COLOR_THUMB_HOVER_DARK};
  }
}
/* Width */
[data-tsb-id="${id}"]::-webkit-scrollbar {
  width: var(--tsb_width);
  height: var(--tsb_height);
}
/* Track */
[data-tsb-id="${id}"]::-webkit-scrollbar-track {
  background: var(--tsb_trackColor);
}
[data-tsb-id="${id}"]::-webkit-scrollbar-corner {
  background: transparent;
}
/* Handle */
[data-tsb-id="${id}"]::-webkit-scrollbar-thumb {
  background: var(--tsb_thumbColor);
  border-radius: 6px;
}
/* Handle on hover */
[data-tsb-id="${id}"]::-webkit-scrollbar-thumb:hover {
  background: var(--tsb_thumbHoverColor);
}
/* Hide corner box */
[data-tsb-id="${id}"]::-webkit-scrollbar-corner {
  background: var(--tsb_trackColor);
}
  
/* Firefox styles */
@supports (-moz-appearance:none) {
  [data-tsb-id="${id}"] {
    scrollbar-color: var(--tsb_thumbColor) var(--tsb_trackColor);
  }
}`;
}

export const DEFAULT_STYLES = createScrollbarStyles('REPLACEME').replace(/=\"REPLACEME\"/g, '');

export class ThavixtScrollbar<T extends HTMLElement> {
  private animationElementId = `thavixt_scrollbar_anim_${crypto.randomUUID().slice(0, 8)}`;
  private styleId = `thavixt_scrollbar_styles_${crypto.randomUUID().slice(0, 8)}`;
  private scrollTop = 0;
  private scrollLeft = 0;
  private prevScrollDetails: null | Partial<ScrollbarScrollDetails> = null;
  private prevThresholdsReached: null | Partial<ScrollbarThresholdsReached> = null;

  constructor(public container: T, public options: ThavixtScrollbarOptions = {}) {
    this.init();
  }

  private init = () => {
    this.addStyleSheet();
    this.addEventListeners();
    this.container.style.overflow = 'auto';
    this.container.dataset["tsbId"] = this.animationElementId;
  }

  destroy = () => {
    this.removeStyleSheet();
    this.removeEventListeners();
  }

  private addStyleSheet = () => {
    const alreadyInjected = !!document.getElementById(this.styleId);
    if (alreadyInjected) {
      this.removeStyleSheet();
    }
    const css = document.createElement('style');
    css.id = this.styleId;
    css.appendChild(document.createTextNode(createScrollbarStyles(this.animationElementId, this.options.styles)));
    this.container.appendChild(css);
  }

  private removeStyleSheet = () => {
    const stylesheet = document.getElementById(this.styleId);
    if (!stylesheet) {
      return;
    }
    stylesheet.remove();
  }

  private addEventListeners = () => {
    this.container.addEventListener('scroll', this.onScroll);
  }

  private removeEventListeners = () => {
    this.container.removeEventListener('scroll', this.onScroll);
  }

  private onClick = () => {
    // @todo
    console.log('Not yet implemented - ThavixtScrollbar::onClick()')
  }

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
    const thresholdsReached = filterTruthyValues(
      { top: topReached, bottom: bottomReached, left: leftReached, right: rightReached }
    );

    this.scrollTop = top;
    this.scrollLeft = left;

    const thresholdsReachedChanged = JSON.stringify(thresholdsReached) !== JSON.stringify(this.prevThresholdsReached);
    if (thresholdsReachedChanged) {
      if (this.prevThresholdsReached && this.options.onScrollToEnd) {
        this.options.onScrollToEnd(thresholdsReached);
      }
      this.prevThresholdsReached = thresholdsReached;
      this.container.dataset.animating = (Object.keys(thresholdsReached) as ScrollDirection[]).join(',');
    } else {
      delete this.container.dataset.animating;
    }

    const scrollValuesChanged = JSON.stringify(scrollValues) !== JSON.stringify(this.prevScrollDetails);
    if (scrollValuesChanged) {
      if (this.prevScrollDetails) {
        this.options.onScroll?.(scrollValues);
      }
      this.prevScrollDetails = scrollValues;
    }
  }
}

function filterTruthyValues<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key]) {
      return {
        ...acc,
        [key]: obj[key],
      }
    }
    return acc;
  }, {} as Partial<T>);
}
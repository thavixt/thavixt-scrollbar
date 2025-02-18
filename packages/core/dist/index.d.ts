export type ScrollDirection = "top" | "bottom" | "left" | "right";
export type ScrollbarScrollDetails = Record<ScrollDirection, number>;
export type ScrollbarThresholdsReached = Partial<Record<ScrollDirection, boolean>>;
export type ScrollbarOptions = Partial<{
    onScroll?: (details: ScrollbarScrollDetails) => void;
    onScrollToEnd?: (thresholds: ScrollbarThresholdsReached) => void;
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
export declare const DEFAULT_STYLES: Required<ScrollbarStyles>;
export declare const DEFAULT_CSS_STYLESHEET: string;
export declare class Scrollbar<T extends HTMLElement = HTMLElement> {
    container: T;
    options: ScrollbarOptions;
    private tsbId;
    private styleId;
    private scrollTop;
    private scrollLeft;
    private prevScrollDetails;
    private prevThresholdsReached;
    constructor(container: T, options?: ScrollbarOptions);
    private init;
    destroy: () => void;
    private addStyleSheet;
    private removeStyleSheet;
    private addEventListeners;
    private removeEventListeners;
    private onClick;
    private onScroll;
}

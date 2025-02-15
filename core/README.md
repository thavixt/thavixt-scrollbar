# thavixt-scrollbar-core

[![npm package][npm-img]][npm-url]

> A basic Javascript package to customize scrollbars of countainers in your website.

## Install

```bash
npm install thavixt-scrollbar
```

## Usage

```ts
class ThavixtScrollbar {
  constructor(container: HTMLDivElement, options?: Partial<ThavixtScrollbarOptions>);
  destroy: () => void;
  container: HTMLDivElement;
  options: Partial<ThavixtScrollbarOptions>;
}

// Example usage:
import { ThavixtScrollbar } from 'thavixt-scrollbar';

new ThavixtScrollbar('id_of_scrollable_html_element', {
  onScrollEnd: () => console.log('you reached a side!'),
  styles: {
    thumbColor: '#999',
    thumbHoverColor: '#ccc',
    trackColor: '#444',
  },
})
```

## API

### ThavixtScrollbar(container, options?)

#### container

Type: `HTMLDivElement`

an HTML element to customize the scrollbar of

#### options

Type: `object`

Customize the styles and callbacks of the scrollbar

```ts
type ThavixtScrollbarOptions = Partial<{
  // Callback on scroll
  onScroll?: (details: ScrollbarScrollDetails) => void;
  // Callback when the element is scrolled to it's min/max width/height
  onScrollToEnd?: (thresholds: ScrollbarThresholdsReached) => void;
  // Styles to apply to the element's vertical/horizontal scrollbar
  styles?: ThavixtScrollbarStyles;
}>

interface ThavixtScrollbarStyles {
  // Size in pixels
  width?: number;
  // Size in pixels
  height?: number;
  // CSS color
  trackColor?: string;
  // CSS color
  thumbColor?: string;
  // CSS color
  thumbHoverColor?: string;
}

type ScrollDirection = 'top' | 'bottom' | 'left' | 'right';
type ScrollbarScrollDetails = Record<ScrollDirection, number>;
type ScrollbarThresholdsReached = Partial<Record<ScrollDirection, boolean>>;
```

## Attributions

[npm-img]:https://img.shields.io/npm/v/thavixt-scrollbar
# thavixt-scrollbar-core

![npm package][npm-img]

A basic Javascript package to customize scrollbars of containers in your website.

# Demo

[demo page](https://demo-thavixt-scrollbar-react.vercel.app/)

## Install

```bash
npm install thavixt-scrollbar-react
```

## Interface

```ts
function useScrollbar<T extends HTMLElement>(
	options: ThavixtScrollbarOptions,
): void;
```

## Usage

```ts
// Example usage:
import { ThavixtScrollbar } from 'thavixt-scrollbar';

function MyCompontent() {
  const ref = useScrollbar<HTMLDivElement>({
    onScrollEnd: () => console.log('you reached a side!'),
    styles: {
      thumbColor: '#999',
      thumbHoverColor: '#ccc',
      trackColor: 'transparent',
    },
  })

  return (
    <div ref={ref} className='h-[300px] overflow-auto whitespace-pre'>
      my very long text that overflows
    </div>
  )
```

## API

### useThavixtScrollbar(options?): ref

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
	styles?: ScrollbarStyles;
}>;

interface ScrollbarStyles {
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

type ScrollDirection = "top" | "bottom" | "left" | "right";
type ScrollbarScrollDetails = Record<ScrollDirection, number>;
type ScrollbarThresholdsReached = Partial<Record<ScrollDirection, boolean>>;
```

#### ref

Type: `React.Ref<HTMLDivElement>`

`ref` of an HTML element to customize the scrollbar of

[npm-img]: https://img.shields.io/npm/v/thavixt-scrollbar-react

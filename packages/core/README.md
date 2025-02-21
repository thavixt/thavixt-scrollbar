# thavixt-scrollbar-core

![npm package](https://img.shields.io/npm/v/thavixt-scrollbar-core)
![NPM Downloads](https://img.shields.io/npm/dm/thavixt-scrollbar-core)
![last update](https://img.shields.io/npm/last-update/thavixt-scrollbar-core)

A basic Javascript package to customize scrollbars on your website.

# Demo

[demo page](https://demo-thavixt-scrollbar-react-oen1yr2bx-thavixts-projects.vercel.app/)

## Install

```bash
npm install thavixt-scrollbar-core
```

or import the source directly:

```js
import Scrollbar from 'https://unpkg.com/thavixt-scrollbar-core/dist/index.js';
```

## Example

```ts
import { ThavixtScrollbar } from "thavixt-scrollbar-core";

new ThavixtScrollbar("id_of_scrollable_html_element", {
	onScrollToEnd: (directions) => {
		console.log(`you reached the ${directions.join(',')} end`);
	},
	styles: {
		thumbColor: "#999",
		thumbHoverColor: "#ccc",
		trackColor: "#444",
	},
});
```

## API

### new ThavixtScrollbar(container, options?)

#### container

Type: `HTMLDivElement`

#### options

Type: `object`

```ts
type ThavixtScrollbarOptions = Partial<{
	// Callback on scroll
	onScroll?: (details: ScrollbarScrollDetails) => void;
	// Callback when the element is scrolled to it's min/max width/height
	onScrollToEnd?: (directions: ScrollDirection[]) => void;
	// Styles to apply to the element's vertical/horizontal scrollbar
	styles?: ScrollbarStyles;
}>;

interface ScrollbarStyles {
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
}

type ScrollDirection = "top" | "bottom" | "left" | "right";
type ScrollbarScrollDetails = Record<ScrollDirection, number>;
```

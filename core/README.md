# thavixt-scrollbar-core

[![npm package][npm-img]][npm-url]

> My awesome module

## Install

```bash
npm install thavixt-scrollbar
```

## Usage

```ts
// class ThavixtScrollbar {
//   container: HTMLDivElement;
//   options: Partial<ThavixtScrollbarOptions>;
//
//   constructor(container: HTMLDivElement, options?: Partial<ThavixtScrollbarOptions>);
//   destroy: () => void;
// }

// Example usage:
import { ThavixtScrollbar } from 'thavixt-scrollbar';

new ThavixtScrollbar('id_of_scrollable_html_element', {thumbColor: 'pink'})
```

## API

### ThavixtScrollbar(container, options?)

#### container

Type: `string`

id of the HTML element to use

#### options

Type: `object`

```ts
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
```

## Attributions

- scaffolded from [ryansonshine's npm package template](https://github.com/ryansonshine/typescript-npm-package-template)

[npm-img]:https://img.shields.io/npm/v/thavixt-scrollbar
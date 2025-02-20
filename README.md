# thavixt-scrollbar

Customize scrollbars on your websites

- in a specific element
- or every scrollbar on the page

# Demo

[demo page](https://thavixt-scrollbar.vercel.app/)

## Packages

[thavixt-scrollbar-core](packages/core/README.md) (use without a framework)

![npm package](https://img.shields.io/npm/v/thavixt-scrollbar-core)
![NPM Downloads](https://img.shields.io/npm/dm/thavixt-scrollbar-core)
![last update](https://img.shields.io/npm/last-update/thavixt-scrollbar-core)

[thavixt-scrollbar-react](packages/react/README.md) (use with React)

![npm package](https://img.shields.io/npm/v/thavixt-scrollbar-react)
![NPM Downloads](https://img.shields.io/npm/dm/thavixt-scrollbar-react)
![last update](https://img.shields.io/npm/last-update/thavixt-scrollbar-react)

# Todo

- [ ] separate vertical and horizontal scrollbar styles
- [ ] animation/transition/shadow/pseudo element on reaching a scroll threshold (top/bottom/left/right)
- [ ] more test coverage
- [ ] lots of code cleanup/refactoring

## Notes

- Monorepo structure based on [wixplosives/sample-monorepo](https://github.com/wixplosives/sample-monorepo)
- using [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces#defining-workspaces) and [Lerna](https://lerna.js.org/docs/features)
- useful articles/docs:
  - [CSS scrollbars styling](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scrollbars_styling)
  - [Scrollbar styling - chrome for developers](https://developer.chrome.com/docs/css-ui/scrollbar-styling)
  - [stackoverflow comment on npm package renaming](https://stackoverflow.com/a/56197360/9964256)


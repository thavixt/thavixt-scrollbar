# thavixt-scrollbar

Customize your scrollbars in websites

# Demo

[demo page](https://thavixt-scrollbar.vercel.app/)

## Packages

| package name | info | npm link | docs |
| - | - | - | - |
| thavixt-scrollbar-core  | ![npm package][npm-img-core]  | module for plain JS | [link][core-readme] |
| thavixt-scrollbar-react | ![npm package][npm-img-react] | module for React | [link][react-readme] |

# Todo

- [ ] separate vertical and horizontal scrollbar styles
- [ ] animation/transitio/shadow/pseudo element on reaching a scroll threshold (top/bottom/left/right)
- [ ] more test coverage
- [ ] lots of code cleanup ..

## Notes

- using [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces#defining-workspaces)
- Monorepo structure based on [wixplosives/sample-monorepo](https://github.com/wixplosives/sample-monorepo)
- useful MDN articles:
  - [CSS scrollbars styling](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scrollbars_styling)
- [Scrollbar styling - chrome for developers](https://developer.chrome.com/docs/css-ui/scrollbar-styling)
- [Lerna docs](https://lerna.js.org/docs/features)
- [stackoverflow comment on npm package renaming](https://stackoverflow.com/a/56197360/9964256)

[npm-img-core]: https://img.shields.io/npm/v/thavixt-scrollbar-core
[core-readme]: packages/core/README.md

[npm-img-react]: https://img.shields.io/npm/v/thavixt-scrollbar-react
[react-readme]: packages/react/README.md

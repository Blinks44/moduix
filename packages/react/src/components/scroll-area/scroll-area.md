# ScrollArea

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/scroll-area
- Chakra UI: https://chakra-ui.com/docs/components/scroll-area

## Purpose

`ScrollArea` is a native scroll viewport with styled overlay scrollbars for bounded panels,
drawers, dialogs, sidebars, and dense content regions.

## Current behavior contract

- The parts are thin Ark wrappers from `@ark-ui/react/scroll-area` that add moduix classes and
  stable `data-slot` values. Ark owns measurement, overflow state, scrollbar and thumb
  interaction, thumb sizing, edge state, `asChild`, and the API returned by `useScrollArea()`.
- `ScrollArea` and `ScrollAreaRootProvider` accept Ark props plus two moduix props:
  - `fade?: boolean` writes `data-fade` and masks the top and bottom of the viewport by the
    measured vertical overflow distance. It is vertical only.
  - `variant?: 'hover' | 'always'` (default `hover`) writes `data-variant`. `hover` shows the
    scrollbar while the pointer is over the root or while scrolling; `always` keeps overflowing
    tracks visible and interactive.
- Nothing is rendered automatically: consumers compose the viewport, content, one scrollbar with a
  thumb per axis, and the corner explicitly.
- `ScrollAreaContent` and `ScrollAreaCorner` add only `data-slot`; Ark positions the corner.
- The barrel re-exports `useScrollArea`, `useScrollAreaContext`, and `ScrollAreaContext` from Ark.
- Types `ScrollAreaRootProps`, `ScrollAreaRootProviderProps`, and `ScrollAreaVariant` are exported.

## Anatomy and exported parts

```text
ScrollArea[fade, variant]
├─ ScrollAreaViewport
│  └─ ScrollAreaContent
├─ ScrollAreaScrollbar[orientation]
│  └─ ScrollAreaThumb
└─ ScrollAreaCorner
```

| Part                     | `data-slot`                 | Notes                                     |
| ------------------------ | --------------------------- | ----------------------------------------- |
| `ScrollArea`             | `scroll-area-root`          | Ark root plus `fade` and `variant`.       |
| `ScrollAreaRootProvider` | `scroll-area-root-provider` | Uses state from `useScrollArea()`.        |
| `ScrollAreaViewport`     | `scroll-area-viewport`      | Native scroll container and focus target. |
| `ScrollAreaContent`      | `scroll-area-content`       | Measured content wrapper.                 |
| `ScrollAreaScrollbar`    | `scroll-area-scrollbar`     | One track; vertical by default.           |
| `ScrollAreaThumb`        | `scroll-area-thumb`         | Draggable thumb.                          |
| `ScrollAreaCorner`       | `scroll-area-corner`        | Filler for two-axis overflow.             |

## Defaults and styling

- The root fills its container (`width` and `height` `100%`, `min-width` and `min-height` `0`) so
  it can shrink inside flex and grid layouts. Give the root or its container a bounded height.
- The viewport inherits the root `border-radius`, hides native scrollbars, and shows the inset
  focus ring. moduix does not set `overscroll-behavior`, so scroll chaining stays native.
- Ark sets the position of the root, scrollbars, and corner inline. The scrollbar CSS only sizes,
  hides (`display: none` without matching `data-overflow-*`), fades, and grows the track by `2px`
  on hover (`@media (hover: hover)`) and drag. A `::before` widens the pointer hit area.
- CSS Modules variables: `--moduix-scroll-area-fade-size`, `--moduix-scroll-area-scrollbar-size`,
  and `--moduix-scroll-area-thumb-bg`. Other values come from foundation tokens; override them
  with a class on the part.
- Transitions use duration tokens, which drop to near zero for reduced motion.
- In forced-colors mode the fade mask is removed and the focus ring and thumb use system colors.

## Agent notes

- Keep the wrapper thin. Do not add automatic structural rendering or legacy props such as
  `scrollbars`, `overflowEdgeThreshold`, `keepMounted`, or `render`.
- Keep `fade` vertical-only and `variant` limited to scrollbar visibility.
- Do not duplicate styles that Ark already sets inline (positions, `touch-action`, `user-select`).
- Docs examples follow Ark's examples: basic, horizontal, both directions, nested, and root
  provider, plus `always-visible` and `fade` for the moduix props.
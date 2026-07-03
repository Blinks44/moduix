# ScrollArea

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/scroll-area
- Chakra UI: https://chakra-ui.com/docs/components/scroll-area

## Purpose

`ScrollArea` provides a native scroll viewport with styled Ark UI scrollbar parts for bounded
panels, drawers, dialogs, sidebars, and dense content regions.

## Upstream model to preserve

The wrapper follows Ark UI React `@ark-ui/react/scroll-area`. Preserve the Ark parts exactly:
`Root`, `RootProvider`, `Viewport`, `Content`, `Scrollbar`, `Thumb`, and `Corner`.

Ark owns measurement, overflow state, scrollbar interaction, thumb sizing, edge state, and the
imperative API returned by `useScrollArea()`. Advanced Ark state access stays available directly
from `@ark-ui/react/scroll-area`. Do not reintroduce legacy props such as
`scrollbars`, `overflowEdgeThreshold`, `keepMounted`, or `render`.

## Current behavior contract

`ScrollArea` is the styled root and is equivalent to `ScrollArea.Root`. It accepts one local sugar
prop, `fade?: boolean`, which adds a top and bottom viewport mask driven by Ark vertical overflow
measurements. It does not render viewport, content, scrollbar, thumb, or corner parts
automatically. Consumers compose the Ark tree explicitly:

```tsx
import { ScrollArea } from '@moduix/react';

export function Example() {
  return (
    <ScrollArea>
      <ScrollArea.Viewport>
        <ScrollArea.Content>Scrollable content</ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  );
}
```

The package exports `ScrollArea` plus the local `fade` root prop types.

## Anatomy and exported parts

```text
ScrollArea / ScrollArea.Root
├─ ScrollArea.Viewport
│  └─ ScrollArea.Content
│     └─ children
├─ ScrollArea.Scrollbar
│  └─ ScrollArea.Thumb
└─ ScrollArea.Corner
```

| Export                           | `data-slot`                 | Notes                                                |
| -------------------------------- | --------------------------- | ---------------------------------------------------- |
| `ScrollArea` / `ScrollArea.Root` | `scroll-area-root`          | Ark root and state owner.                            |
| `ScrollArea.RootProvider`        | `scroll-area-root-provider` | Root for an external Ark `useScrollArea()` instance. |
| `ScrollArea.Viewport`            | `scroll-area-viewport`      | Native scroll container and focus target.            |
| `ScrollArea.Content`             | `scroll-area-content`       | Measured content wrapper.                            |
| `ScrollArea.Scrollbar`           | `scroll-area-scrollbar`     | One scrollbar track; vertical by default.            |
| `ScrollArea.Thumb`               | `scroll-area-thumb`         | Draggable thumb.                                     |
| `ScrollArea.Corner`              | `scroll-area-corner`        | Bottom-end filler for two-axis overflow.             |

No flat part aliases such as `ScrollAreaRoot` or `ScrollAreaViewport` are exported.

## Composition

Render one `ScrollArea.Scrollbar` for each axis consumers need. Horizontal scrolling requires
`orientation="horizontal"` on the horizontal scrollbar.

```tsx
<ScrollArea className="root">
  <ScrollArea.Viewport>
    <ScrollArea.Content>
      <div className="wideContent">Wide content</div>
    </ScrollArea.Content>
  </ScrollArea.Viewport>
  <ScrollArea.Scrollbar>
    <ScrollArea.Thumb />
  </ScrollArea.Scrollbar>
  <ScrollArea.Scrollbar orientation="horizontal">
    <ScrollArea.Thumb />
  </ScrollArea.Scrollbar>
  <ScrollArea.Corner />
</ScrollArea>
```

Use `ScrollArea.RootProvider` with Ark `useScrollArea()` when controls outside the root need to
call methods such as `scrollToEdge`. Do not render `ScrollArea` and `ScrollArea.RootProvider` for
the same state instance.

## Upstream feature coverage

- Basic: supported through explicit `ScrollArea` / `Viewport` / `Content` / `Scrollbar` /
  `Thumb` / `Corner` composition.
- Horizontal: supported by rendering only a horizontal scrollbar.
- Both directions: supported by rendering both vertical and horizontal scrollbars.
- Nested: supported by rendering complete independent scroll area trees.
- Root provider: supported through `ScrollArea.RootProvider` plus Ark `useScrollArea()`.
- Vertical fade mask sugar: supported through `fade` on `ScrollArea` and `ScrollArea.RootProvider`.
- `asChild`: preserved on all Ark parts.
- `ids`: preserved on the root for stable root, viewport, content, scrollbar, and thumb IDs.
- Advanced Ark context reads stay available directly from `@ark-ui/react/scroll-area`.

## Accessibility and state

Ark provides the viewport props, focus behavior, native scrolling behavior, measurement, thumb
dragging, and overflow state. Refs forward to the actual Ark DOM part for every wrapped part.

Relevant Ark attributes and variables:

| Target                                     | Attribute or variable                                                                                                              | Meaning                           |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| Root, viewport, content, scrollbar, corner | `data-overflow-x`, `data-overflow-y`                                                                                               | Axis overflow is present.         |
| Viewport                                   | `data-at-top`, `data-at-bottom`, `data-at-left`, `data-at-right`                                                                   | Current scroll edge state.        |
| Scrollbar                                  | `data-orientation`, `data-hover`, `data-scrolling`, `data-dragging`                                                                | Axis and interaction state.       |
| Thumb                                      | `data-orientation`, `data-hover`, `data-dragging`                                                                                  | Thumb axis and interaction state. |
| Corner                                     | `data-state="hidden" \| "visible"`                                                                                                 | Corner visibility state.          |
| Root                                       | `--corner-width`, `--corner-height`, `--thumb-width`, `--thumb-height`                                                             | Ark measurements consumed by CSS. |
| Viewport                                   | `--scroll-area-overflow-x-start`, `--scroll-area-overflow-x-end`, `--scroll-area-overflow-y-start`, `--scroll-area-overflow-y-end` | Edge overflow distances.          |
| Root, RootProvider                         | `data-fade`                                                                                                                        | Added by Moduix `fade` sugar.     |

The viewport CSS must keep `scrollbar-width: none` and `::-webkit-scrollbar { display: none; }`,
which Ark documents as required styling for hiding native scrollbars.

## Defaults and styling

Moduix adds visual defaults through CSS Modules and public CSS variables, while Ark supplies the
state attributes and measurements.

Primary CSS variables:

| Variable                             | Default                                           |
| ------------------------------------ | ------------------------------------------------- |
| `--scroll-area-width`                | `100%`                                            |
| `--scroll-area-height`               | `100%`                                            |
| `--scroll-area-bg`                   | `transparent`                                     |
| `--scroll-area-color`                | `var(--color-foreground)`                         |
| `--scroll-area-radius`               | `var(--radius-md)`                                |
| `--scroll-area-content-padding`      | `0`                                               |
| `--scroll-area-fade-size`            | `var(--spacing-10)`                               |
| `--scroll-area-fade-start-size`      | `var(--scroll-area-fade-size, var(--spacing-10))` |
| `--scroll-area-fade-end-size`        | `var(--scroll-area-fade-size, var(--spacing-10))` |
| `--scroll-area-scrollbar-size`       | `var(--spacing-1)`                                |
| `--scroll-area-scrollbar-margin`     | `var(--spacing-1)`                                |
| `--scroll-area-scrollbar-bg`         | `transparent`                                     |
| `--scroll-area-thumb-bg`             | `var(--color-border)`                             |
| `--scroll-area-thumb-hover-increase` | `2px`                                             |
| `--scroll-area-thumb-min-size`       | `1.5rem`                                          |
| `--scroll-area-corner-bg`            | `var(--scroll-area-scrollbar-bg, transparent)`    |

Use classes on individual parts for axis-specific customization. The bundled CSS hides each
scrollbar when its matching Ark overflow attribute is absent. The thumb grows by `2px` across the
track on hover and while dragging without changing its default `var(--color-border)` color.

## Intentional sugar and differences from upstream

- Moduix adds default classes, `data-slot` hooks, CSS variables, visual scrollbar styling, and the
  optional vertical `fade` mask sugar.
- Moduix does not copy Ark demo colors; it maps the behavior to Moduix tokens.
- The old legacy high-level conveniences were removed except for the narrower `fade?: boolean`
  contract: `scrollbars`, automatic child wrapping, flat aliases, `overflowEdgeThreshold`,
  `keepMounted`, and `render` remain removed.
- `ScrollArea` remains the short root import for docs ergonomics and has attached Ark parts.

## Agent notes

- Keep the wrapper thin. Do not add automatic structural rendering; examples should teach explicit
  Ark composition instead.
- Keep `fade`, but do not re-export Ark hooks, contexts, or duplicate Ark type aliases from the
  moduix barrel.
- Keep docs examples aligned with Ark's five official React examples: basic, horizontal, both
  directions, nested, and root provider.
- Preserve required viewport native-scrollbar hiding styles.
- Keep `fade` vertical-only. Do not expand it back to horizontal or multi-value modes.
- Keep root and viewport `min-width: 0` / `min-height: 0`; scroll areas are commonly nested in
  flex and grid regions that need shrinkable scroll containers.

## Local changelog

- 2026-07-03: Simplified the public surface to the callable root, `RootProvider`, visible scroll
  parts, and the local `fade` sugar. Advanced Ark hooks and context access now come directly from
  `@ark-ui/react/scroll-area`.
- 2026-07-01: Added a configurable `2px` thumb growth on hover and drag while preserving the
  existing default thumb color.
- 2026-06-19: Migrated `ScrollArea` to Ark UI React, removed legacy convenience props
  and flat aliases, exposed `RootProvider`, `Context`, `useScrollArea`, `useScrollAreaContext`, and
  Ark public types, and updated styling hooks to Ark data attributes and CSS variables.
- 2026-06-19: Restored the narrow `fade?: boolean` Moduix sugar for top and bottom viewport masks
  without bringing back the old legacy convenience surface.
- 2026-06-21: Added defensive min-size reset on root and viewport so ScrollArea can shrink
  correctly inside flex/grid layouts.
- 2026-06-27: Simplified scrollbar defaults to spacing tokens and synced docs examples with the
  current Ark-aligned part composition.
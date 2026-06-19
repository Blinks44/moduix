# ScrollArea

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/scroll-area
- Chakra UI: https://chakra-ui.com/docs/components/scroll-area

## Purpose

`ScrollArea` provides a native scroll viewport with styled Ark UI scrollbar parts for bounded
panels, drawers, dialogs, sidebars, and dense content regions.

## Upstream model to preserve

The wrapper follows Ark UI React `@ark-ui/react/scroll-area`. Preserve the Ark parts exactly:
`Root`, `RootProvider`, `Viewport`, `Content`, `Scrollbar`, `Thumb`, `Corner`, and `Context`.

Ark owns measurement, overflow state, scrollbar interaction, thumb sizing, edge state, and the
imperative API returned by `useScrollArea()`. Do not reintroduce Base UI props such as
`scrollbars`, `overflowEdgeThreshold`, `keepMounted`, or `render`.

## Current behavior contract

`ScrollArea` is the styled root and is equivalent to `ScrollArea.Root`. It accepts one local sugar
prop, `fade?: boolean`, which adds a top and bottom viewport mask driven by Ark vertical overflow
measurements. It does not render viewport, content, scrollbar, thumb, or corner parts
automatically. Consumers compose the Ark tree explicitly:

```tsx
import { ScrollArea } from 'moduix';

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

The package exports `ScrollArea`, `useScrollArea`, `useScrollAreaContext`, and Ark-aligned public
types from `@ark-ui/react/scroll-area`.

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

| Export                           | `data-slot`                 | Notes                                              |
| -------------------------------- | --------------------------- | -------------------------------------------------- |
| `ScrollArea` / `ScrollArea.Root` | `scroll-area-root`          | Ark root and state owner.                          |
| `ScrollArea.RootProvider`        | `scroll-area-root-provider` | Root for an external `useScrollArea()` instance.   |
| `ScrollArea.Viewport`            | `scroll-area-viewport`      | Native scroll container and focus target.          |
| `ScrollArea.Content`             | `scroll-area-content`       | Measured content wrapper.                          |
| `ScrollArea.Scrollbar`           | `scroll-area-scrollbar`     | One scrollbar track; vertical by default.          |
| `ScrollArea.Thumb`               | `scroll-area-thumb`         | Draggable thumb.                                   |
| `ScrollArea.Corner`              | `scroll-area-corner`        | Bottom-end filler for two-axis overflow.           |
| `ScrollArea.Context`             | -                           | Render-prop access to the current scroll area API. |

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

Use `ScrollArea.RootProvider` with `useScrollArea()` when controls outside the root need to call
methods such as `scrollToEdge`. Do not render `ScrollArea` and `ScrollArea.RootProvider` for the
same state instance.

## Upstream feature coverage

- Basic: supported through explicit `ScrollArea` / `Viewport` / `Content` / `Scrollbar` /
  `Thumb` / `Corner` composition.
- Horizontal: supported by rendering only a horizontal scrollbar.
- Both directions: supported by rendering both vertical and horizontal scrollbars.
- Nested: supported by rendering complete independent scroll area trees.
- Root provider: supported through exported `useScrollArea` and `ScrollArea.RootProvider`.
- Vertical fade mask sugar: supported through `fade` on `ScrollArea` and `ScrollArea.RootProvider`.
- `asChild`: preserved on all Ark parts.
- `ids`: preserved on the root for stable root, viewport, content, scrollbar, and thumb IDs.
- `ScrollArea.Context` and `useScrollAreaContext`: exported for state reads inside the tree.

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

| Variable                         | Default                                           |
| -------------------------------- | ------------------------------------------------- |
| `--scroll-area-width`            | `100%`                                            |
| `--scroll-area-height`           | `100%`                                            |
| `--scroll-area-bg`               | `transparent`                                     |
| `--scroll-area-color`            | `var(--color-foreground)`                         |
| `--scroll-area-radius`           | `var(--radius-md)`                                |
| `--scroll-area-content-padding`  | `0`                                               |
| `--scroll-area-fade-size`        | `var(--spacing-10)`                               |
| `--scroll-area-fade-start-size`  | `var(--scroll-area-fade-size, var(--spacing-10))` |
| `--scroll-area-fade-end-size`    | `var(--scroll-area-fade-size, var(--spacing-10))` |
| `--scroll-area-scrollbar-size`   | `0.375rem`                                        |
| `--scroll-area-scrollbar-margin` | `calc(var(--spacing-1) / 2)`                      |
| `--scroll-area-scrollbar-bg`     | `transparent`                                     |
| `--scroll-area-thumb-bg`         | `var(--color-border)`                             |
| `--scroll-area-thumb-min-size`   | `1.5rem`                                          |
| `--scroll-area-corner-bg`        | `var(--scroll-area-scrollbar-bg, transparent)`    |

Use classes on individual parts for axis-specific customization. The bundled CSS hides each
scrollbar when its matching Ark overflow attribute is absent.

## Intentional sugar and differences from upstream

- Moduix adds default classes, `data-slot` hooks, CSS variables, visual scrollbar styling, and the
  optional vertical `fade` mask sugar.
- Moduix does not copy Ark demo colors; it maps the behavior to Moduix tokens.
- The old Base UI high-level conveniences were removed except for the narrower `fade?: boolean`
  contract: `scrollbars`, automatic child wrapping, flat aliases, `overflowEdgeThreshold`,
  `keepMounted`, and `render` remain removed.
- `ScrollArea` remains the short root import for docs ergonomics and has attached Ark parts.

## Agent notes

- Keep the wrapper thin. Do not add automatic structural rendering; examples should teach explicit
  Ark composition instead.
- If Ark adds new public provider/context hooks or types, mirror them through `ScrollArea.tsx` and
  `index.ts`.
- Keep docs examples aligned with Ark's five official React examples: basic, horizontal, both
  directions, nested, and root provider.
- Preserve required viewport native-scrollbar hiding styles.
- Keep `fade` vertical-only. Do not expand it back to horizontal or multi-value modes.

## Local changelog

- 2026-06-19: Migrated `ScrollArea` from Base UI to Ark UI React, removed legacy convenience props
  and flat aliases, exposed `RootProvider`, `Context`, `useScrollArea`, `useScrollAreaContext`, and
  Ark public types, and updated styling hooks to Ark data attributes and CSS variables.
- 2026-06-19: Restored the narrow `fade?: boolean` Moduix sugar for top and bottom viewport masks
  without bringing back the old Base UI convenience surface.
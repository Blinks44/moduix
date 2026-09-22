# ScrollArea

## Upstream review

Reviewed 2026-08-12:

| Source                                                         | Useful reference                                                           | Moduix decision                                                                                                      |
| -------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [Ark UI](https://ark-ui.com/solid/docs/components/scroll-area) | Primitive anatomy, IDs, state attributes, interaction, and `asChild`.      | **Required correctness:** retain the complete Ark part tree and props unchanged.                                     |
| [Chakra UI](https://chakra-ui.com/docs/components/scroll-area) | Explicit composition and `hover` / `always` scrollbar visibility variants. | **Intentional difference:** retain visibility variants, but use CSS variables rather than a `size` prop matrix.      |
| [shadcn/ui](https://ui.shadcn.com/docs/components/scroll-area) | Concise installation and horizontal-scrolling discoverability.             | **Rejected complexity:** keep Moduix's explicit Ark composition instead of automatically rendering structural parts. |

The local focus-ring offset variable intentionally falls back to the shared
`--moduix-focus-ring-inset-offset` token. Keep the CSS variable reference and public CSS-property
table aligned with this behavior.

## Purpose

`ScrollArea` provides a native scroll viewport with styled Ark UI scrollbar parts for bounded
panels, drawers, dialogs, sidebars, and dense content regions.

## Upstream model to preserve

The wrapper follows Ark UI Solid `@ark-ui/solid/scroll-area`. Preserve the Ark parts exactly:
`Root`, `RootProvider`, `Viewport`, `Content`, `Scrollbar`, `Thumb`, and `Corner`.

Ark owns measurement, overflow state, scrollbar interaction, thumb sizing, edge state, and the
reactive store returned by `useScrollArea()`. Do not reintroduce legacy props such as `scrollbars`,
`overflowEdgeThreshold`, `keepMounted`, or `render`.

## Current behavior contract

`ScrollArea` is the styled root. It accepts `fade?: boolean`,
which adds a top and bottom viewport mask driven by Ark vertical overflow measurements, and
`variant?: 'hover' | 'always'`, which controls whether overflowing scrollbar tracks remain visible
at rest. It does not render viewport, content, scrollbar, thumb, or corner parts automatically.
Consumers compose the Ark tree explicitly:

```tsx
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@moduix/solid/scroll-area';

export function Example() {
  return (
    <ScrollArea>
      <ScrollAreaViewport>
        <ScrollAreaContent>Scrollable content</ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  );
}
```

Give the root a bounded block size whenever content should scroll. Moduix does not set
`overscroll-behavior`, so a viewport at its scroll edge keeps normal browser scroll chaining.

The package exports `ScrollArea`, all family-prefixed parts, `ScrollAreaContext`,
`useScrollArea`, `useScrollAreaContext`, and the local root prop types. The root is the only
callable component value; parts are imported directly from the component subpath. `useScrollArea()`
returns a reactive store accessor: read state and call methods through the accessor, for example
`scrollArea().scrollToEdge(...)`.

## Anatomy and exported parts

```text
ScrollArea
├─ ScrollAreaViewport
│  └─ ScrollAreaContent
│     └─ children
├─ ScrollAreaScrollbar
│  └─ ScrollAreaThumb
└─ ScrollAreaCorner
```

| Export                           | `data-slot`                 | Notes                                                       |
| -------------------------------- | --------------------------- | ----------------------------------------------------------- |
| `ScrollArea`                     | `scroll-area-root`          | Ark root and state owner.                                   |
| `ScrollAreaRootProvider`        | `scroll-area-root-provider` | Root for an external `useScrollArea()` instance. |
| `ScrollAreaViewport`            | `scroll-area-viewport`      | Native scroll container and focus target.                   |
| `ScrollAreaContent`             | `scroll-area-content`       | Measured content wrapper.                                   |
| `ScrollAreaScrollbar`           | `scroll-area-scrollbar`     | One scrollbar track; vertical by default.                   |
| `ScrollAreaThumb`               | `scroll-area-thumb`         | Draggable thumb.                                            |
| `ScrollAreaCorner`              | `scroll-area-corner`        | Bottom-end filler for two-axis overflow.                    |
| `ScrollAreaContext`             | -                           | Context component for advanced state reads.                 |
| `useScrollArea`       | -                           | Ark state hook for `ScrollAreaRootProvider` composition.    |

Every public part is exported under its family-prefixed name. Compound properties and duplicate
root aliases are not exported.

## Composition

Render one `ScrollAreaScrollbar` for each axis consumers need. Horizontal scrolling requires
`orientation="horizontal"` on the horizontal scrollbar. Style parts with `class`, merge consumer
classes last, and prefer Ark data attributes for state styling.

```tsx
<ScrollArea class="root">
  <ScrollAreaViewport>
    <ScrollAreaContent>
      <div class="wideContent">Wide content</div>
    </ScrollAreaContent>
  </ScrollAreaViewport>
  <ScrollAreaScrollbar>
    <ScrollAreaThumb />
  </ScrollAreaScrollbar>
  <ScrollAreaScrollbar orientation="horizontal">
    <ScrollAreaThumb />
  </ScrollAreaScrollbar>
  <ScrollAreaCorner />
</ScrollArea>
```

Use `ScrollAreaRootProvider` with `useScrollArea()` when controls outside the root need to call
methods such as `scrollToEdge`. Do not render `ScrollArea` and `ScrollAreaRootProvider` for the
same state instance.

## Upstream feature coverage

- Basic: supported through explicit `ScrollArea` / `ScrollAreaViewport` / `ScrollAreaContent` /
  `ScrollAreaScrollbar` / `ScrollAreaThumb` / `ScrollAreaCorner` composition.
- Horizontal: supported by rendering only a horizontal scrollbar.
- Both directions: supported by rendering both vertical and horizontal scrollbars.
- RTL: supported through Ark's `dir` prop and logical scrollbar positioning.
- Nested: supported by rendering complete independent scroll area trees.
- Root provider: supported through `ScrollAreaRootProvider` plus `useScrollArea()`.
- Vertical fade mask sugar: supported through `fade` on `ScrollArea` and `ScrollAreaRootProvider`.
- Scrollbar visibility sugar: `variant="hover"` is the default and `variant="always"` keeps
  overflowing tracks visible and interactive at rest.
- `asChild`: preserved on all Ark parts; the Solid adapter takes a render function
  `(props) => Element` and spreads the resolved props onto the consumer element.
- `ids`: preserved on the root for stable root, viewport, content, scrollbar, and thumb IDs.
- `ScrollAreaContext` and `useScrollAreaContext()` are available from moduix for advanced state reads.

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
| Root, RootProvider                         | `data-fade`, `data-variant="hover" \| "always"`                                                                                    | Added by Moduix sugar.            |

The viewport CSS must keep `scrollbar-width: none` and `::-webkit-scrollbar { display: none; }`,
which Ark documents as required styling for hiding native scrollbars.

## Defaults and styling

Moduix adds visual defaults through CSS Modules and public CSS variables, while Ark supplies the
state attributes and measurements. The variable contract is identical to the React adapter; see the
React `scroll-area.md` table for the full `--moduix-scroll-area-*` list.

Use `class` on individual parts for axis-specific customization. The bundled CSS hides each
scrollbar when its matching Ark overflow attribute is absent. `variant="always"` keeps matching
overflowing tracks visible and interactive. The thumb grows by `2px` across the track on hover and
while dragging with a fast transition; customize its timing with
`--moduix-scroll-area-thumb-hover-transition`.

In forced-colors mode, the optional fade mask is disabled to preserve content legibility, while the
viewport focus ring and thumb use system colors.

## Solid adapter notes

- `asChild` accepts a render function `(props) => Element`; call `props()` and spread the resolved
  props onto the semantic element. Do not assume static JSX children.
- Ark Solid does not forward component refs through `asChild` composition; a `ref` passed together
  with `asChild` stays undefined. This is native Ark Solid behavior and is covered by tests.
- `useScrollArea()` and `useScrollAreaContext()` return reactive store accessors, not plain objects.

## Intentional sugar and differences from upstream

- Moduix adds default classes, `data-slot` hooks, CSS variables, visual scrollbar styling, optional
  vertical `fade` mask sugar, and `variant="always"` for persistently visible tracks.
- Moduix does not copy Ark demo colors; it maps the behavior to Moduix tokens.
- The old legacy high-level conveniences were removed except for the narrower `fade?: boolean`
  contract: `scrollbars`, automatic child wrapping, `overflowEdgeThreshold`, `keepMounted`, and
  `render` remain removed. Compound properties are not part of the public API.
- `ScrollArea` is the root value; all visible parts and the provider are direct family-prefixed
  exports.

## Agent notes

- Keep the wrapper thin. Do not add automatic structural rendering; examples should teach explicit
  Ark composition instead.
- Keep `fade` vertical-only and `variant` limited to scrollbar visibility.
- Preserve required viewport native-scrollbar hiding styles.
- Keep root and viewport `min-width: 0` / `min-height: 0`; scroll areas are commonly nested in
  flex and grid regions that need shrinkable scroll containers.
- Keep `splitProps` re-application of `asChild`/`children`/`class` before the spread so consumer
  values are not clobbered.

## Local changelog

- 2026-09-19: Added the Solid contract file; parity with the React adapter plus Solid adapter notes
  for `asChild` render functions, refs, and the reactive store accessor.

# ScrollArea

Upstream primitive docs: https://base-ui.com/react/components/scroll-area.md

## Purpose

`ScrollArea` is the moduix wrapper around Base UI `ScrollArea`. It gives the library a ready-to-use
default composition for native scrolling with styled custom scrollbars, while still exporting the
low-level parts for cases where the viewport, content, or scrollbar structure needs to be owned
explicitly.

Use it when content must scroll inside a bounded area such as dialog bodies, drawers, side panels,
tables, or long settings sections.

## Current behavior contract

The convenience component renders this structure automatically:

```text
ScrollArea
├─ ScrollAreaViewport
│  └─ ScrollAreaContent
│     └─ children
├─ ScrollAreaScrollbar (vertical by default)
│  └─ ScrollAreaThumb
└─ ScrollAreaCorner (only when both scrollbars are rendered)
```

Defaults:

- `scrollbars="vertical"`
- `fade={false}`
- all other props are forwarded to `ScrollAreaRoot`
- `ref` on `ScrollArea` points to the underlying root element

Basic usage:

```tsx
import { ScrollArea } from 'moduix';

export function ScrollAreaExample() {
  return (
    <ScrollArea
      style={{
        height: '13rem',
        width: '24rem',
        maxWidth: 'calc(100vw - 2rem)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gap: 'var(--spacing-3)',
          padding: 'var(--spacing-3)',
          paddingInlineEnd: 'var(--spacing-6)',
        }}
      >
        <section>
          <h3>Changes in 0.9</h3>
          <p>Release notes, migration details, and rollout instructions.</p>
        </section>
        <section>
          <h3>Known issues</h3>
          <p>Document limits, caveats, and links to follow-up tickets.</p>
        </section>
      </div>
    </ScrollArea>
  );
}
```

`fade` and `scrollbars` are independent. For example, `fade="horizontal"` can be used together with
`scrollbars="vertical"` or even `scrollbars={false}` when the scrollbar itself is not wanted.

If you need to style or configure the viewport, content, or individual scrollbars directly, use the
exported parts instead of expanding the convenience API.

## Composition

### Convenience component

`ScrollArea` is the simple path for most cases:

```tsx
<ScrollArea fade scrollbars="vertical">
  {children}
</ScrollArea>
```

### Low-level parts

Use the parts when you need different classes per axis, custom viewport props, or a different
layout around the content:

```tsx
import {
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from 'moduix';

export function CustomScrollArea() {
  return (
    <ScrollAreaRoot
      data-fade="both"
      overflowEdgeThreshold={28}
      style={{
        height: '13rem',
        width: '24rem',
        maxWidth: 'calc(100vw - 2rem)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
      }}
    >
      <ScrollAreaViewport
        aria-label="Scrollable metrics grid"
        style={{
          borderRadius: 'var(--radius-lg)',
          outline: '1px solid var(--color-border)',
          outlineOffset: '-1px',
        }}
      >
        <ScrollAreaContent
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(10, 5rem)',
            gridTemplateRows: 'repeat(8, 4rem)',
            width: 'max-content',
            gap: 'var(--spacing-2)',
            padding: 'var(--spacing-3)',
          }}
        >
          {Array.from({ length: 80 }, (_, index) => (
            <div
              key={index}
              style={{
                display: 'grid',
                placeItems: 'center',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-background)',
              }}
            >
              {index + 1}
            </div>
          ))}
        </ScrollAreaContent>
      </ScrollAreaViewport>

      <ScrollAreaScrollbar
        keepMounted
        style={{
          backgroundColor: 'color-mix(in srgb, var(--color-primary) 12%, transparent)',
        }}
      >
        <ScrollAreaThumb style={{ backgroundColor: 'var(--color-primary)' }} />
      </ScrollAreaScrollbar>

      <ScrollAreaScrollbar
        orientation="horizontal"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--color-chart-3) 18%, transparent)',
        }}
      >
        <ScrollAreaThumb style={{ backgroundColor: 'var(--color-chart-3)' }} />
      </ScrollAreaScrollbar>

      <ScrollAreaCorner
        style={{
          borderRadius: 'var(--radius-sm)',
          backgroundColor: 'color-mix(in srgb, var(--color-foreground) 10%, transparent)',
        }}
      />
    </ScrollAreaRoot>
  );
}
```

Public parts:

| Part                  | Primitive / element    | Purpose                                                       |
| --------------------- | ---------------------- | ------------------------------------------------------------- |
| `ScrollArea`          | convenience wrapper    | Renders root + viewport + content + default scrollbars.       |
| `ScrollAreaRoot`      | `ScrollArea.Root`      | State owner and outer positioning box.                        |
| `ScrollAreaViewport`  | `ScrollArea.Viewport`  | Native scroll container and keyboard focus target.            |
| `ScrollAreaContent`   | `ScrollArea.Content`   | Inner content wrapper.                                        |
| `ScrollAreaScrollbar` | `ScrollArea.Scrollbar` | Custom scrollbar track for one axis.                          |
| `ScrollAreaThumb`     | `ScrollArea.Thumb`     | Draggable thumb inside a scrollbar.                           |
| `ScrollAreaCorner`    | `ScrollArea.Corner`    | Fills the bottom-end intersection when both axes are present. |

## Public props

`ScrollArea` keeps the public type surface intentionally small and forwards Base UI
`ScrollArea.Root.Props` instead of exporting a separate prop alias.

### `ScrollArea`

| Prop                    | Type                                                                                | Default      | Notes                                                                                                     |
| ----------------------- | ----------------------------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------- |
| `className`             | `ScrollArea.Root.Props['className']`                                                | -            | Applied to `ScrollAreaRoot`.                                                                              |
| `children`              | `ReactNode`                                                                         | -            | Wrapped in `ScrollAreaViewport` and `ScrollAreaContent`.                                                  |
| `fade`                  | `boolean \| 'vertical' \| 'horizontal' \| 'both'`                                   | `false`      | `true` maps to `'vertical'`. Adds `data-fade` on the root so the bundled CSS can mask the viewport edges. |
| `scrollbars`            | `'vertical' \| 'horizontal' \| 'both' \| false`                                     | `'vertical'` | Controls which default scrollbars are rendered. `false` removes the default scrollbars entirely.          |
| `overflowEdgeThreshold` | `number \| Partial<{ xStart: number; xEnd: number; yStart: number; yEnd: number }>` | `0`          | Forwarded root prop. Useful when the fade should appear only after a larger scroll distance.              |
| `dir`                   | `'ltr' \| 'rtl'`                                                                    | inherited    | Forwarded root prop. Affects horizontal scrolling and inline fade direction.                              |

Other Base UI root props are forwarded unchanged. Reach for `ScrollAreaRoot` when you need the full
primitive surface explicitly in JSX.

### Low-level parts

All exported parts accept `className` on their rendered root and forward the corresponding Base UI
part props unchanged.

| Part                  | Notable props                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------- |
| `ScrollAreaRoot`      | Base UI root props such as `overflowEdgeThreshold`, `dir`, `render`, and `className`.                         |
| `ScrollAreaViewport`  | Base UI viewport props such as `className`, `render`, `aria-*`, and other native scroll container attributes. |
| `ScrollAreaContent`   | Base UI content props.                                                                                        |
| `ScrollAreaScrollbar` | Base UI scrollbar props such as `orientation`, `keepMounted`, and `className`.                                |
| `ScrollAreaThumb`     | Base UI thumb props.                                                                                          |
| `ScrollAreaCorner`    | Base UI corner props.                                                                                         |

## Styling API

### Stable `data-slot` hooks

| Part                            | `data-slot`             |
| ------------------------------- | ----------------------- |
| `ScrollAreaRoot` / `ScrollArea` | `scroll-area-root`      |
| `ScrollAreaViewport`            | `scroll-area-viewport`  |
| `ScrollAreaContent`             | `scroll-area-content`   |
| `ScrollAreaScrollbar`           | `scroll-area-scrollbar` |
| `ScrollAreaThumb`               | `scroll-area-thumb`     |
| `ScrollAreaCorner`              | `scroll-area-corner`    |

### Important state and data attributes

These come from the wrapper or the Base UI primitive and are safe to style against.

| Selector target                                               | Attribute                                                                                      | Meaning                                                                                                |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `ScrollAreaRoot`                                              | `data-fade="vertical" \| "horizontal" \| "both"`                                               | Added by the moduix convenience API or manually in custom composition. Enables the bundled fade masks. |
| `ScrollAreaRoot`, `ScrollAreaViewport`, `ScrollAreaScrollbar` | `data-has-overflow-x`, `data-has-overflow-y`                                                   | Present when content overflows on the corresponding axis.                                              |
| `ScrollAreaRoot`, `ScrollAreaViewport`, `ScrollAreaScrollbar` | `data-overflow-x-start`, `data-overflow-x-end`, `data-overflow-y-start`, `data-overflow-y-end` | Present when there is still overflow on a specific logical edge.                                       |
| `ScrollAreaScrollbar`, `ScrollAreaThumb`                      | `data-orientation="vertical" \| "horizontal"`                                                  | Axis-specific styling hook.                                                                            |
| `ScrollAreaScrollbar`                                         | `data-hovering`                                                                                | Present while the pointer is over the viewport or scrollbar.                                           |
| `ScrollAreaScrollbar`                                         | `data-scrolling`                                                                               | Present while the content is actively scrolling.                                                       |

### CSS variables used by moduix styles

#### Root and viewport

| Variable                               | Default                        | Effect                                          |
| -------------------------------------- | ------------------------------ | ----------------------------------------------- |
| `--scroll-area-width`                  | `100%`                         | Root width.                                     |
| `--scroll-area-height`                 | `100%`                         | Root height.                                    |
| `--scroll-area-color`                  | `var(--color-foreground)`      | Inherited text color from the root.             |
| `--scroll-area-radius`                 | `var(--radius-md)`             | Viewport border radius.                         |
| `--scroll-area-bg`                     | `transparent`                  | Viewport background.                            |
| `--scroll-area-fade-size`              | `var(--spacing-10)`            | Shared fade depth for both edges of an axis.    |
| `--scroll-area-fade-start-size`        | `var(--scroll-area-fade-size)` | Block-start fade depth.                         |
| `--scroll-area-fade-end-size`          | `var(--scroll-area-fade-size)` | Block-end fade depth.                           |
| `--scroll-area-fade-inline-start-size` | `var(--scroll-area-fade-size)` | Inline-start fade depth.                        |
| `--scroll-area-fade-inline-end-size`   | `var(--scroll-area-fade-size)` | Inline-end fade depth.                          |
| `--scroll-area-focus-ring-width`       | `var(--border-width-sm)`       | `:focus-visible` outline width on the viewport. |
| `--scroll-area-focus-ring-color`       | `var(--color-ring)`            | `:focus-visible` outline color.                 |
| `--scroll-area-focus-ring-offset`      | `-1px`                         | Viewport outline offset.                        |

#### Content

| Variable                        | Default | Effect                                  |
| ------------------------------- | ------- | --------------------------------------- |
| `--scroll-area-content-padding` | `0`     | Padding applied to `ScrollAreaContent`. |

#### Scrollbars and corner

| Variable                                  | Default                                        | Effect                                          |
| ----------------------------------------- | ---------------------------------------------- | ----------------------------------------------- |
| `--scroll-area-scrollbar-size`            | `0.375rem`                                     | Thickness of the default scrollbar track.       |
| `--scroll-area-scrollbar-margin`          | `calc(var(--spacing-1) / 2)`                   | Outer gap between track and viewport edges.     |
| `--scroll-area-scrollbar-hit-area-size`   | `1.25rem`                                      | Invisible pointer target size around the track. |
| `--scroll-area-scrollbar-padding`         | `0`                                            | Inner padding inside the track.                 |
| `--scroll-area-scrollbar-radius`          | `var(--radius-md)`                             | Track radius.                                   |
| `--scroll-area-scrollbar-bg`              | `transparent`                                  | Track background.                               |
| `--scroll-area-scrollbar-hidden-opacity`  | `0`                                            | Track opacity when idle.                        |
| `--scroll-area-scrollbar-visible-opacity` | `1`                                            | Track opacity while hovering or scrolling.      |
| `--scroll-area-transition`                | `var(--transition-default)`                    | Track opacity transition.                       |
| `--scroll-area-corner-bg`                 | `var(--scroll-area-scrollbar-bg, transparent)` | Corner fill when both axes are rendered.        |

#### Thumb

| Variable                       | Default               | Effect                                            |
| ------------------------------ | --------------------- | ------------------------------------------------- |
| `--scroll-area-thumb-bg`       | `var(--color-border)` | Thumb background.                                 |
| `--scroll-area-thumb-radius`   | `var(--radius-full)`  | Thumb radius.                                     |
| `--scroll-area-thumb-min-size` | `1.5rem`              | Minimum thumb length on the scrolling axis.       |
| `--scroll-area-thumb-width`    | `100%`                | Cross-axis thickness of the **vertical** thumb.   |
| `--scroll-area-thumb-height`   | `100%`                | Cross-axis thickness of the **horizontal** thumb. |

Runtime variables from Base UI:

| Variable                                                                                                                           | Source  | Notes                                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `--scroll-area-overflow-x-start`, `--scroll-area-overflow-x-end`, `--scroll-area-overflow-y-start`, `--scroll-area-overflow-y-end` | Base UI | Live overflow distances in pixels, used by the fade masks.                                                                                   |
| `--scroll-area-corner-width`, `--scroll-area-corner-height`                                                                        | Base UI | Corner size when both scrollbars are present.                                                                                                |
| `--scroll-area-thumb-width`, `--scroll-area-thumb-height` on the scrolling axis                                                    | Base UI | The primitive computes thumb length along the scroll axis. Do not rely on these to override vertical thumb height or horizontal thumb width. |

## UX and accessibility notes

- Scrolling stays native. Keyboard scrolling, wheel/trackpad interaction, and thumb dragging come
  from the Base UI primitive.
- The viewport receives the bundled `:focus-visible` ring. Do not remove it without replacing it
  with another visible keyboard focus treatment.
- In flex or grid layouts, the parent and the scroll area usually need `min-height: 0` and an
  explicit height (`height: 100%`, fixed height, or max-height) so overflow can actually happen.
- Use `ScrollAreaRoot` + `ScrollAreaViewport` directly when the viewport needs its own `aria-label`,
  `aria-labelledby`, or other viewport-only props.
- `scrollbars={false}` is appropriate only when overflow is already visually obvious or when the
  surface has another strong affordance for scrolling.

## Intentional differences from Base UI

- moduix ships a convenience `ScrollArea` wrapper instead of only the primitive parts.
- The wrapper adds two small DX props: `fade` and `scrollbars`.
- The bundled CSS styles the parts and exposes stable `data-slot` hooks plus a documented CSS
  variable contract.
- Local docs describe the moduix wrapper contract, not the full upstream primitive API.

## Agent notes

- Keep `ScrollArea` thin. Prefer composition over expanding the convenience prop surface.
- Preserve `ref` forwarding on `ScrollArea` to the root element.
- Preserve the current defaults: `scrollbars="vertical"` and `fade={false}`.
- Preserve `data-slot` hooks and the root `data-fade` styling hook.
- If viewport/content/scrollbar customization grows, solve it with the exported parts instead of
  adding `slotProps`, `classNames`, or other parallel customization systems.
- Keep docs, stories, and CSS variables in sync when changing the wrapper contract.

## Local changelog

- 2026-06-03: Rewrote the local docs around the real moduix wrapper API, documented the wrapper
  defaults and styling contract, clarified overflow/fade behavior, and recorded the ref-forwarding
  and RTL inline-fade expectations that future changes must preserve.
# AspectRatio

`AspectRatio` is a local moduix component. It does not wrap a Base UI primitive.

## Purpose

Use `AspectRatio` to constrain content (images, videos, iframes, map embeds) inside a box that
maintains a fixed width-to-height ratio as the container resizes.

## Current behavior contract

- `AspectRatio` renders a single `div` root with `data-slot="aspect-ratio-root"`.
- The `ratio` prop is required and accepts either a positive `number` or a named `RatioPreset`.
- Named presets resolve to their numeric ratio at render time:
  - `square` → `1`
  - `video` → `16 / 9`
  - `portrait` → `9 / 16`
  - `photo` → `4 / 3`
- The resolved ratio is written as an inline `aspectRatio` CSS style; it can be overridden via the
  `style` prop if needed.
- Direct `img`, `video`, `iframe`, `canvas`, and `svg` children are automatically sized to fill the
  box (`display: block; width: 100%; height: 100%`). Consumer is responsible for `object-fit`.
- Root default styles from `AspectRatio.module.css`:
  - `position: relative` — supports Next.js `<Image fill>` and similar absolute-fill patterns.
  - `width: 100%` — fills the parent container width.
  - `overflow: hidden` — clips children that exceed the ratio box.
  - `border-radius: var(--aspect-ratio-radius, var(--radius-md))` — gives the box the same small rounded surface used across the library by default.

## Composition

```text
AspectRatio
└─ root[data-slot="aspect-ratio-root"]
```

Single exported part; no sub-components.

## Basic usage

Image with named preset:

```tsx
import { AspectRatio } from 'moduix';

export function CoverImage() {
  return (
    <AspectRatio ratio="video">
      <img src="/hero.jpg" alt="Hero" style={{ objectFit: 'cover' }} />
    </AspectRatio>
  );
}
```

Numeric ratio for a cinema-style crop:

```tsx
<AspectRatio ratio={2.35}>
  <img src="/banner.jpg" alt="Banner" style={{ objectFit: 'cover' }} />
</AspectRatio>
```

iframe embed (YouTube, maps):

```tsx
<AspectRatio ratio="video">
  <iframe src="https://www.youtube.com/embed/..." title="Video" allowFullScreen />
</AspectRatio>
```

## Public props

`AspectRatio` accepts standard `div` props plus:

| Prop        | Type                    | Default | Notes                                                               |
| ----------- | ----------------------- | ------- | ------------------------------------------------------------------- |
| `ratio`     | `number \| RatioPreset` | —       | Required. Positive number or preset name.                           |
| `className` | `string`                | —       | Merged with the root class for local styling overrides.             |
| `style`     | `React.CSSProperties`   | —       | Applied last; can override the computed `aspectRatio` inline style. |

### RatioPreset values

| Preset     | Resolves to |
| ---------- | ----------- |
| `square`   | `1`         |
| `video`    | `16 / 9`    |
| `portrait` | `9 / 16`    |
| `photo`    | `4 / 3`     |

## Styling API

### Stable hooks

| Hook                            | Purpose                                |
| ------------------------------- | -------------------------------------- |
| `data-slot="aspect-ratio-root"` | Stable selector for the exported root. |

### Public CSS variables

| Variable                | Default            | Effect                           |
| ----------------------- | ------------------ | -------------------------------- |
| `--aspect-ratio-radius` | `var(--radius-md)` | Controls the root border radius. |

### Notes

- `overflow: hidden` is intentional and must stay on the root so media is clipped to the rounded corners.
- If a child needs a visible shadow or focus treatment outside the frame, put that treatment on an
  outer wrapper or use an outline-based treatment on the child instead of removing the clipping.
- Direct media children are filled automatically. For non-media children, apply size styles yourself.
- The default rounded corners are intentional. Override `--aspect-ratio-radius` when the media
  should be sharper, larger, or fully square.

## Intentional differences from Base UI / shadcn

- moduix `AspectRatio` uses the native CSS `aspect-ratio` property instead of the Radix padding-based
  trick. Browser support is universal as of 2023.
- Named preset strings are added on top of the numeric ratio API for common production ratios.
- Media children fill the box automatically; shadcn leaves that entirely to the consumer.
- A small default radius is applied out of the box so images and embeds look like the rest of the moduix surface primitives without extra wrapper CSS.

## Agent notes

- Keep `ratio` required. Do not add a default to avoid silent layout surprises.
- Presets (`square`, `video`, `portrait`, `photo`) are intentional and documented. Add new presets
  only when a common ratio is clearly missing.
- The child auto-fill rule targets `:where(img, video, iframe, canvas, svg)` — direct children only,
  no descendant selectors. Do not expand this to generic elements.
- `position: relative` must be kept to support absolute-fill child patterns like Next.js `<Image fill>`.
- Keep the default `--aspect-ratio-radius` contract in sync with `theme.css`, docs, and examples.
- If the component behavior, presets, or styling hooks change, update this file in the same task.

## Local changelog

- 2026-06-04: Initial implementation. Native CSS `aspect-ratio`, named preset sugar, auto-fill rule
  for direct media children.
- 2026-06-04: Added the default `--aspect-ratio-radius` styling contract and aligned the stable root hook to `data-slot="aspect-ratio-root"`.
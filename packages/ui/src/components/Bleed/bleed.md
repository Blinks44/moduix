# Bleed

`Bleed` lets content extend beyond the inline and/or block bounds of its parent container.

## Parts

- `Bleed` (`data-slot="bleed-root"`)

## Props

- `inline`: `none` | `xs` | `sm` | `md` | `lg` | `xl` | `full` (default: `full`)
- `block`: `none` | `xs` | `sm` | `md` | `lg` | `xl` (default: `none`)
- `as`: root element override (default: `div`)
- `className` and root-element props

## Styling

The component exposes `--bleed-*` CSS variables in `src/styles/theme.css` for consumer overrides.

## Layout Notes

- `inline="full"` is viewport-based. It is meant for full-bleed sections, not for matching the width of a nearby layout container.
- Ancestors with `overflow: hidden` or `overflow: clip` can visually crop the bleed.
- For nested scroll regions, drawers, or layouts that need custom full-bleed math, override `--bleed-inline-full` and `--bleed-inline-full-size` locally.
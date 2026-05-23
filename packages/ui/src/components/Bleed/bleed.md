# Bleed

`Bleed` lets content extend beyond the inline and/or block bounds of its parent container.
It is a standalone moduix component (not a Base UI wrapper).

## Parts

- `Bleed` (`data-slot="bleed-root"`)

## Props

- `inline`: `none` | `xs` | `sm` | `md` | `lg` | `xl` | `full` (default: `full`)
- `block`: `none` | `xs` | `sm` | `md` | `lg` | `xl` (default: `none`)
- `as`: polymorphic root element (default: `div`)
- `className` and root-element props

## Styling

The component exposes `--bleed-*` CSS variables in `src/styles/theme.css` for consumer overrides.
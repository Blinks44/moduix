# Badge

`Badge` is a compact status label primitive for short metadata such as state, category, or count.
It is a standalone moduix component and does not wrap a Base UI primitive.

## Parts

- `Badge` (`data-slot="badge-root"`)
- `BadgeDot` (`data-slot="badge-dot"`)
- Direct child `svg` icons

## Props

- `variant`: `default` | `secondary` | `destructive` | `outline` | `ghost` (default: `default`)
- `size`: `sm` | `md` | `lg` (default: `md`)
- `render`: `ReactElement` for anchor/button/custom-link semantics
- `className` and standard `span` props

## Styling

The component exposes `--badge-*` CSS variables in `src/styles/theme.css` for consumer overrides.
Direct child `svg` icons use `--badge-icon-size` and inherit `currentColor`.
Long labels stay on one line and are truncated by the root; add `title` when the full value should
remain available on hover.
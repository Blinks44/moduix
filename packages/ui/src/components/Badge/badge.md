# Badge

`Badge` is a compact status label primitive for short metadata such as state, category, or count.
It is a standalone moduix component and does not wrap a Base UI primitive.

## Parts

- `Badge` (`data-slot="badge-root"`)
- `BadgeDot` (`data-slot="badge-dot"`)
- direct child `svg` icons

## Props

- `variant`: `default` | `secondary` | `destructive` | `outline` | `ghost` (default: `default`)
- `className` and standard `span` props

## Composition

Place `BadgeDot` or a direct child `svg` icon next to the label when the status needs an extra
visual cue. `BadgeDot` is decorative and hidden from assistive technology, so the visible text
should still carry the meaning.

Long labels stay on one line and are truncated by the root. Add `title` when the full label should
remain available on hover.

## Styling

The component exposes `--badge-*` CSS variables in `src/styles/theme.css` for local overrides.
Direct child `svg` icons use `--badge-icon-size` and inherit `currentColor`.
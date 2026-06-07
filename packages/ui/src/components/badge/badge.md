# Badge

`Badge` is a compact, non-interactive label for short metadata: status, category, version, or a
small count. It is a standalone moduix component built on native `span` elements; it does not wrap a
Base UI primitive and does not inherit Base UI slot APIs.

## Basic Usage

```tsx
import { Badge } from 'moduix';

export function BadgeDemo() {
  return <Badge>New</Badge>;
}
```

Use `variant` for the built-in visual tones:

```tsx
<Badge variant="secondary">Draft</Badge>
<Badge variant="destructive">Failed</Badge>
<Badge variant="outline">Forecast</Badge>
<Badge variant="ghost">Muted</Badge>
```

## Parts

| Part       | Element | Data attributes                                      | Purpose                                                         |
| ---------- | ------- | ---------------------------------------------------- | --------------------------------------------------------------- |
| `Badge`    | `span`  | `data-slot="badge-root"`, `data-variant="<variant>"` | Root label with layout, variant colors, border, and truncation. |
| `BadgeDot` | `span`  | `data-slot="badge-dot"`                              | Optional decorative dot that inherits `currentColor`.           |
| child icon | `svg`   | none                                                 | Direct child SVG icons are sized by Badge CSS.                  |

## Public Props

### `Badge`

`Badge` accepts standard `span` props plus:

| Prop      | Type                                                                | Default     | Notes                                |
| --------- | ------------------------------------------------------------------- | ----------- | ------------------------------------ |
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline' \| 'ghost'` | `'default'` | Sets `data-variant` and visual tone. |

Exported helper types:

- `BadgeProps`
- `BadgeVariant`

### `BadgeDot`

`BadgeDot` accepts standard `span` props, including `className`. It renders `aria-hidden="true"` by
default because it is decorative. Exported helper type: `BadgeDotProps`.

## Composition

Place `BadgeDot` or a direct child icon next to the label when a badge needs an extra visual cue.
The text must still describe the state because dots and colors are not enough for accessibility.

```tsx
import { Badge, BadgeDot, ChevronRightIcon } from 'moduix';

export function StatusBadges() {
  return (
    <>
      <Badge variant="default">
        <BadgeDot />
        Online
      </Badge>

      <Badge variant="outline">
        Release
        <ChevronRightIcon />
      </Badge>
    </>
  );
}
```

`Badge` is not a button or link. If the label must be interactive, compose it inside a real
interactive control or use an interactive component with badge-like styling.

## Styling API

Use `className` on `Badge` or `BadgeDot` for local styling. The root exposes stable selectors through
`data-slot="badge-root"` and `data-variant`; the dot exposes `data-slot="badge-dot"`.

Direct child `svg` icons inherit `currentColor`, do not receive pointer events, and are sized with
`--badge-icon-size`.

Public CSS variables:

| Variable               | Default                                            | Applies to  |
| ---------------------- | -------------------------------------------------- | ----------- |
| `--badge-bg`           | variant-specific background                        | `Badge`     |
| `--badge-border-color` | `transparent`; `var(--color-border)` for `outline` | `Badge`     |
| `--badge-border-width` | `var(--border-width-sm)`                           | `Badge`     |
| `--badge-color`        | variant-specific foreground                        | `Badge`     |
| `--badge-dot-size`     | `0.375rem`                                         | `BadgeDot`  |
| `--badge-font-size`    | `var(--text-xs)`                                   | `Badge`     |
| `--badge-font-weight`  | `var(--weight-medium)`                             | `Badge`     |
| `--badge-gap`          | `0.375rem`                                         | `Badge`     |
| `--badge-height`       | `1.25rem`                                          | `Badge`     |
| `--badge-icon-size`    | `0.75rem`                                          | child `svg` |
| `--badge-line-height`  | `var(--line-height-text-xs)`                       | `Badge`     |
| `--badge-padding-x`    | `0.625rem`                                         | `Badge`     |
| `--badge-padding-y`    | `0`                                                | `Badge`     |
| `--badge-radius`       | `var(--radius-full)`                               | `Badge`     |

Example:

```css
.priorityBadge {
  --badge-bg: color-mix(in oklab, var(--color-primary) 20%, var(--color-background));
  --badge-border-color: color-mix(in oklab, var(--color-primary) 35%, transparent);
  --badge-color: var(--color-primary);
  --badge-dot-size: 0.5rem;
  --badge-height: 1.625rem;
  --badge-padding-x: var(--spacing-3);
  --badge-radius: var(--radius-sm);
}
```

## UX and Accessibility

- Keep labels short and text-based; do not rely on color, icon, or dot alone.
- `BadgeDot` is hidden from assistive technology by default, so the visible text must carry the
  status meaning.
- Long labels stay on one line and are clipped with ellipsis. Add `title` when users need access to
  the full value.
- The component has no keyboard behavior, focus management, disabled state, or controlled state
  because it is presentational.

## Constraints and Recommendations

- Prefer existing variants before custom colors.
- Prefer CSS variables for one-off sizing and tone changes; do not add size props unless a repeated
  product pattern appears.
- Keep badges inline with nearby text or controls. Avoid using them for paragraphs, rich content, or
  actions.
- Do not document or use Base UI-only props with this component.
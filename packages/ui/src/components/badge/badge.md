# Badge

`Badge` is a compact, non-interactive label for short metadata such as status, category, version,
or small counts.

This component does not wrap an Ark primitive. The Ark migration replaces the old flat API with an
Ark-style part surface built on `@ark-ui/react/factory`:

- `Badge.Root`
- `Badge.Dot`

The callable `Badge` export remains the root part itself, but docs and examples should use explicit
part names.

## Basic Usage

```tsx
import { Badge } from 'moduix';

export function BadgeDemo() {
  return <Badge.Root>New</Badge.Root>;
}
```

Use `variant` for the built-in visual tones:

```tsx
<Badge.Root variant="secondary">Draft</Badge.Root>
<Badge.Root variant="destructive">Failed</Badge.Root>
<Badge.Root variant="outline">Forecast</Badge.Root>
<Badge.Root variant="ghost">Muted</Badge.Root>
```

## Parts

| Part         | Element | Data attributes                                                                                | Purpose                                                         |
| ------------ | ------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `Badge.Root` | `span`  | `data-scope="badge"`, `data-part="root"`, `data-slot="badge-root"`, `data-variant="<variant>"` | Root label with layout, variant colors, border, and truncation. |
| `Badge.Dot`  | `span`  | `data-scope="badge"`, `data-part="dot"`, `data-slot="badge-dot"`                               | Optional decorative dot that inherits `currentColor`.           |

Direct child `svg` icons are styled by the root and inherit `currentColor`.

## Public Props

### `Badge.Root`

`Badge.Root` accepts Ark factory span props plus:

| Prop      | Type                                                                | Default     | Notes                                                       |
| --------- | ------------------------------------------------------------------- | ----------- | ----------------------------------------------------------- |
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline' \| 'ghost'` | `'default'` | Sets `data-variant` and visual tone.                        |
| `asChild` | `boolean`                                                           | `false`     | Composes the root onto a child element through Ark factory. |

Exported helper types:

- `BadgeRootProps`
- `BadgeVariant`

### `Badge.Dot`

`Badge.Dot` accepts Ark factory span props, including `className` and `asChild`. It renders
`aria-hidden="true"` by default because it is decorative.

Exported helper type:

- `BadgeDotProps`

## Composition

Place `Badge.Dot` or a direct child icon next to the label when a badge needs an extra visual cue.
The text must still describe the state because dots and colors are not enough for accessibility.

```tsx
import { Badge, ChevronRightIcon } from 'moduix';

export function StatusBadges() {
  return (
    <>
      <Badge.Root variant="default">
        <Badge.Dot />
        Online
      </Badge.Root>

      <Badge.Root variant="outline">
        Release
        <ChevronRightIcon />
      </Badge.Root>
    </>
  );
}
```

`Badge` is not a button or link. If the label must be interactive, compose `Badge.Root asChild`
with a real interactive element or use an interactive component that matches the behavior.

## Styling API

Use `className` on `Badge.Root` or `Badge.Dot` for local styling.

Stable styling hooks:

- `data-slot="badge-root"`
- `data-slot="badge-dot"`
- `data-scope="badge"`
- `data-part="root" | "dot"`
- `data-variant`

Public CSS variables:

| Variable               | Default                                            | Applies to   |
| ---------------------- | -------------------------------------------------- | ------------ |
| `--badge-bg`           | variant-specific background                        | `Badge.Root` |
| `--badge-border-color` | `transparent`; `var(--color-border)` for `outline` | `Badge.Root` |
| `--badge-border-width` | `var(--border-width-sm)`                           | `Badge.Root` |
| `--badge-color`        | variant-specific foreground                        | `Badge.Root` |
| `--badge-dot-size`     | `0.375rem`                                         | `Badge.Dot`  |
| `--badge-font-size`    | `var(--text-xs)`                                   | `Badge.Root` |
| `--badge-font-weight`  | `var(--weight-medium)`                             | `Badge.Root` |
| `--badge-gap`          | `0.375rem`                                         | `Badge.Root` |
| `--badge-height`       | `1.25rem`                                          | `Badge.Root` |
| `--badge-icon-size`    | `0.75rem`                                          | child `svg`  |
| `--badge-line-height`  | `var(--line-height-text-xs)`                       | `Badge.Root` |
| `--badge-padding-x`    | `0.625rem`                                         | `Badge.Root` |
| `--badge-padding-y`    | `0`                                                | `Badge.Root` |
| `--badge-radius`       | `var(--radius-full)`                               | `Badge.Root` |

## Accessibility and Constraints

- Keep labels short and text-based; do not rely on color, icon, or dot alone.
- `Badge.Dot` is hidden from assistive technology by default, so the visible text must carry the
  status meaning.
- Long labels stay on one line and are clipped with ellipsis. Add `title` when users need the full
  value.
- The component has no keyboard behavior, focus management, disabled state, or controlled state
  because it is presentational.

## Changelog

- Migrated the component to an Ark-style wrapper built with `@ark-ui/react/factory`.
- Replaced the legacy flat `BadgeDot` export with `Badge.Dot`.
- Added Ark-style `asChild`, `data-scope`, and `data-part` hooks on exported parts.
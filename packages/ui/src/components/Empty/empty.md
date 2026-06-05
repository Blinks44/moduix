# Empty

`Empty` is a standalone moduix presentational component. It does not wrap a Base UI primitive and does
not add interaction semantics or state management by itself.

## Purpose

Use `Empty` for zero-data, no-results, and first-run screens where the user needs a short explanation
plus one or two next-step actions. It gives those states a consistent surface, centered layout, and
optional icon slot without turning the component into a configurator.

## Current behavior contract

- `Empty` renders one centered surface root with border, background, padding, and text alignment.
- `EmptyIcon` is optional. When present, it renders a rounded visual container for an icon or other
  small visual affordance.
- `EmptyContent` is an optional grouping wrapper that keeps title/description spacing tighter than the
  outer root spacing.
- `EmptyTitle` renders `h3` by default and accepts `as` for document outline control.
- `EmptyDescription` renders a `div`, not a `p`, so it can safely contain paragraphs, links, or short
  list content without invalid nested-paragraph HTML.
- `EmptyActions` is optional and renders a centered wrapping row for buttons or links.
- The component does **not** provide built-in button props, icon props, variants, alignment flags, or
  state logic. Those concerns stay in composition.

## Composition

Recommended anatomy:

```text
Empty
├─ EmptyIcon (optional)
├─ EmptyContent
│  ├─ EmptyTitle
│  └─ EmptyDescription
└─ EmptyActions (optional)
```

Basic usage:

```tsx
import {
  Button,
  Empty,
  EmptyActions,
  EmptyContent,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
  MapIcon,
} from 'moduix';

export function EmptyResults() {
  return (
    <Empty>
      <EmptyIcon>
        <MapIcon />
      </EmptyIcon>
      <EmptyContent>
        <EmptyTitle>No saved places</EmptyTitle>
        <EmptyDescription>
          Save frequently used destinations to keep them close to your workspace.
        </EmptyDescription>
      </EmptyContent>
      <EmptyActions>
        <Button>Add place</Button>
        <Button variant="outline">Import list</Button>
      </EmptyActions>
    </Empty>
  );
}
```

If the state needs no icon or no actions, omit those parts entirely.

## Defaults and styling

Stable hooks:

| Part            | Hook                            |
| --------------- | ------------------------------- |
| root            | `data-slot="empty-root"`        |
| icon container  | `data-slot="empty-icon"`        |
| content wrapper | `data-slot="empty-content"`     |
| title           | `data-slot="empty-title"`       |
| description     | `data-slot="empty-description"` |
| actions row     | `data-slot="empty-actions"`     |

Public CSS variables:

| Variable                          | Default fallback                                                 | Purpose                            |
| --------------------------------- | ---------------------------------------------------------------- | ---------------------------------- |
| `--empty-actions-gap`             | `var(--spacing-2)`                                               | Gap between action items.          |
| `--empty-bg`                      | `color-mix(in oklab, var(--color-card) 92%, var(--color-muted))` | Root background.                   |
| `--empty-border-color`            | `var(--color-border)`                                            | Root border color.                 |
| `--empty-border-width`            | `var(--border-width-sm)`                                         | Root border width.                 |
| `--empty-color`                   | `var(--color-card-foreground)`                                   | Root foreground color.             |
| `--empty-content-gap`             | `var(--spacing-1)`                                               | Gap between title and description. |
| `--empty-content-max-width`       | `28rem`                                                          | Maximum width of the text block.   |
| `--empty-description-color`       | `var(--color-muted-foreground)`                                  | Description color.                 |
| `--empty-description-font-size`   | `var(--text-sm)`                                                 | Description font size.             |
| `--empty-description-line-height` | `var(--line-height-text-sm)`                                     | Description line-height.           |
| `--empty-gap`                     | `var(--spacing-4)`                                               | Gap between major root sections.   |
| `--empty-icon-bg`                 | `var(--color-muted)`                                             | Icon container background.         |
| `--empty-icon-color`              | `var(--color-muted-foreground)`                                  | Icon container color.              |
| `--empty-icon-padding`            | `var(--spacing-3)`                                               | Icon container padding.            |
| `--empty-icon-size`               | `1.5rem`                                                         | Nested SVG icon size.              |
| `--empty-padding`                 | `var(--spacing-8)`                                               | Root padding.                      |
| `--empty-radius`                  | `var(--radius-xl)`                                               | Root border radius.                |
| `--empty-shadow`                  | `none`                                                           | Root shadow.                       |
| `--empty-title-color`             | `currentColor`                                                   | Title color.                       |
| `--empty-title-font-size`         | `var(--text-xl)`                                                 | Title font size.                   |
| `--empty-title-font-weight`       | `var(--weight-semibold)`                                         | Title weight.                      |
| `--empty-title-line-height`       | `var(--line-height-text-xl)`                                     | Title line-height.                 |

## Intentional differences from Base UI

- There is no dedicated Base UI `Empty` primitive. This is a standalone moduix composition component.
- The public API stays composition-first instead of adding workflow props such as `icon`, `title`,
  `description`, `primaryAction`, or `secondaryAction`.

## Agent notes

- Keep `Empty` small. Do not add variants, alignment flags, image-loading helpers, or built-in action
  props unless a concrete user request requires them.
- Preserve `EmptyDescription` as a `div`; replacing it with `p` makes block content composition error-prone.
- If public `--empty-*` variables change, update `theme.css`, stories, and docs in the same task.

## Local changelog

- Added `Empty` as a standalone empty-state surface with optional icon, content, and actions parts.
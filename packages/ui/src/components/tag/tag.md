# Tag

Upstream primitive docs: there is no dedicated Base UI `Tag` primitive. moduix `Tag` composes a
native `span` root with a Base UI `Button` for the optional remove action.

## Purpose

`Tag` is a compact value token for selected items, filters, assignments, and other short values that
may need an inline action.

Use `Badge` for non-interactive metadata. Use `Tag` when the value itself is the object users are
working with and the UI may need an adjacent remove action.

## Basic usage

```tsx
import { Tag, TagLabel, TagRemove } from 'moduix';

export function TagDemo() {
  return (
    <Tag>
      <TagLabel>TypeScript</TagLabel>
      <TagRemove aria-label="Remove TypeScript tag" />
    </Tag>
  );
}
```

## Parts

| Part        | Element        | Data attributes                                     | Purpose                                                  |
| ----------- | -------------- | --------------------------------------------------- | -------------------------------------------------------- |
| `Tag`       | `span`         | `data-slot="tag-root"`, `data-size`, `data-variant` | Root token surface and layout wrapper.                   |
| `TagLabel`  | `span`         | `data-slot="tag-label"`                             | Ellipsized text wrapper for the visible value.           |
| `TagRemove` | Base UI button | `data-slot="tag-remove"`                            | Optional inline remove action with a default close icon. |

## Public props

### `Tag`

`Tag` accepts native `span` props plus:

| Prop      | Type                                                                | Default     | Notes                                        |
| --------- | ------------------------------------------------------------------- | ----------- | -------------------------------------------- |
| `variant` | `'default' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive'` | `'default'` | Sets the visual tone through `data-variant`. |
| `size`    | `'sm' \| 'md'`                                                      | `'md'`      | Sets the compactness through `data-size`.    |

Exported helper types:

- `TagProps`
- `TagSize`
- `TagVariant`

### `TagLabel`

`TagLabel` accepts native `span` props, including `className` and `title`. It exists so long values
can truncate without clipping icons or `TagRemove`.

### `TagRemove`

`TagRemove` accepts Base UI `Button` props. Important defaults:

| Prop         | Default        | Notes                                                                |
| ------------ | -------------- | -------------------------------------------------------------------- |
| `type`       | `'button'`     | Prevents accidental form submission.                                 |
| `children`   | close icon     | Replaced when custom children are passed.                            |
| `aria-label` | `'Remove tag'` | Applied only when no children and no `aria-labelledby` are provided. |

Exported helper type: `TagRemoveProps`.

## Composition

The default composition keeps the root non-interactive and makes the inline action explicit:

```tsx
<Tag variant="outline">
  <TagLabel>Billing</TagLabel>
  <TagRemove aria-label="Remove Billing tag" onClick={() => remove('billing')} />
</Tag>
```

Leading icons can stay as direct children of `Tag`:

```tsx
<Tag>
  <CheckIcon />
  <TagLabel>Selected</TagLabel>
</Tag>
```

`Tag` does not own selection state, list behavior, keyboard navigation, or remove callbacks. Keep
those behaviors in the parent widget.

## Current behavior contract

- `Tag` renders a presentational `span` root and never becomes interactive on its own.
- `TagLabel` is the recommended truncation wrapper for long values.
- `TagRemove` is explicit composition, not a root-level `onRemove` prop.
- `TagRemove` defaults to `type="button"` and renders a close icon when `children` are omitted.
- `TagRemove` only adds the fallback `aria-label="Remove tag"` when no visible children and no
  `aria-labelledby` are provided.

## Styling API

Use `className` on `Tag`, `TagLabel`, or `TagRemove` for local styling. Stable selectors:

- `data-slot="tag-root"`
- `data-slot="tag-label"`
- `data-slot="tag-remove"`
- `data-size="sm" | "md"`
- `data-variant="default" | "secondary" | "outline" | "ghost" | "destructive"`

Direct child `svg` icons on `Tag` use `--tag-icon-size`. `TagRemove` sizes its own icon with
`--tag-remove-icon-size`.

Public CSS variables:

| Variable                               | Default                                                         | Applies to                  |
| -------------------------------------- | --------------------------------------------------------------- | --------------------------- |
| `--tag-bg`                             | `color-mix(in oklab, var(--color-primary) 8%, transparent)`     | `Tag`                       |
| `--tag-border-color`                   | `color-mix(in oklab, var(--color-foreground) 10%, transparent)` | `Tag`                       |
| `--tag-border-width`                   | `var(--border-width-sm)`                                        | `Tag`                       |
| `--tag-color`                          | `var(--color-foreground)`                                       | `Tag`                       |
| `--tag-disabled-opacity`               | `var(--opacity-disabled)`                                       | `TagRemove`                 |
| `--tag-font-size`                      | `var(--text-xs)`                                                | `Tag`                       |
| `--tag-font-weight`                    | `var(--weight-medium)`                                          | `Tag`                       |
| `--tag-gap`                            | `0.375rem`                                                      | `Tag`                       |
| `--tag-gap-sm`                         | `0.25rem`                                                       | `Tag` with `size="sm"`      |
| `--tag-height-md`                      | `1.5rem`                                                        | `Tag` with `size="md"`      |
| `--tag-height-sm`                      | `1.25rem`                                                       | `Tag` with `size="sm"`      |
| `--tag-icon-size`                      | `0.75rem`                                                       | direct child `svg` on `Tag` |
| `--tag-line-height`                    | `var(--line-height-text-xs)`                                    | `Tag`                       |
| `--tag-padding-x-md`                   | `0.5rem`                                                        | `Tag` with `size="md"`      |
| `--tag-padding-x-sm`                   | `0.375rem`                                                      | `Tag` with `size="sm"`      |
| `--tag-padding-y-md`                   | `0.125rem`                                                      | `Tag` with `size="md"`      |
| `--tag-padding-y-sm`                   | `0`                                                             | `Tag` with `size="sm"`      |
| `--tag-radius`                         | `var(--radius-full)`                                            | `Tag`                       |
| `--tag-remove-bg`                      | `transparent`                                                   | `TagRemove`                 |
| `--tag-remove-bg-hover`                | `color-mix(in oklab, currentColor 12%, transparent)`            | `TagRemove`                 |
| `--tag-remove-focus-ring-color`        | `var(--color-ring)`                                             | `TagRemove`                 |
| `--tag-remove-focus-ring-offset`       | `0`                                                             | `TagRemove`                 |
| `--tag-remove-focus-ring-offset-color` | `transparent`                                                   | `TagRemove`                 |
| `--tag-remove-focus-ring-width`        | `var(--border-width-sm)`                                        | `TagRemove`                 |
| `--tag-remove-icon-size`               | `0.625rem`                                                      | `TagRemove`                 |
| `--tag-remove-radius`                  | `var(--radius-full)`                                            | `TagRemove`                 |
| `--tag-remove-size`                    | `1rem`                                                          | `TagRemove`                 |
| `--tag-transition`                     | `var(--transition-default)`                                     | `Tag`, `TagRemove`          |

## UX and accessibility

- Keep the visible value in text, not only in color or icon.
- `TagRemove` should get a specific accessible name when several removable tags are shown together.
- The root `Tag` is presentational. If the whole token needs click semantics, use a real button or
  link wrapper instead of attaching interaction to the `span`.
- `TagLabel` is the recommended truncation point for long values.

## Intentional differences from Base UI

- There is no upstream Base UI `Tag` primitive; this is a moduix composition wrapper.
- moduix ships a dedicated inline remove part so the common dismissible-token path does not require
  manual button styling every time.
- The root stays non-interactive by default even when `TagRemove` is present.

## Agent notes

- Keep `Tag` distinct from `Badge`: tag is for values and selected entities, badge is for metadata.
- Preserve the explicit `TagRemove` composition path instead of adding wrapper-level remove props.
- If variants, sizing, or styling hooks change, update stories and this file together.

## Local changelog

- Added the first `Tag` component with root, label, and remove parts, compact size variants, and
  public CSS variables for token-style customization.
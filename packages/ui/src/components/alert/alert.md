# Alert

Upstream docs:

- Ark UI: https://ark-ui.com/docs/guides/composition
- Chakra UI: https://chakra-ui.com/docs/components/alert

## Purpose

`Alert` is a thin compound wrapper for inline status, validation, and system messages.

Ark UI does not ship a dedicated `Alert` primitive, so moduix models the component with Ark's `ark`
factory and Chakra's Alert part contract.

## Upstream model to preserve

- Uses Ark polymorphic factory primitives instead of a dedicated Ark component primitive.
- Keeps a compound anatomy aligned with Chakra's `Alert` mental model: root, indicator, content,
  title, and description.
- Keeps Ark-style DOM ownership through `asChild` and leaves state management outside the component.

## Current behavior contract

- Public API is compound-only: `Alert.Root`, `Alert.Indicator`, `Alert.Content`, `Alert.Title`,
  `Alert.Description`.
- `Alert.Root` defaults `status` to `'neutral'`.
- `Alert.Root` defaults `role` to `'status'`, and switches to `'alert'` when `status="error"`.
- `Alert.Title` renders an `h3` by default.
- All exported parts accept `className`.
- All exported parts accept Ark `asChild`.
- The component stays presentational and does not add dismiss state, action slots, or focus
  management.

## Anatomy and exported parts

```text
Alert.Root
├─ Alert.Indicator (optional)
└─ Alert.Content
   ├─ Alert.Title
   └─ Alert.Description
```

Every exported part accepts `className` and receives a stable `data-slot`:

| Part                | `data-slot`         | Notes                                                           |
| ------------------- | ------------------- | --------------------------------------------------------------- |
| `Alert.Root`        | `alert-root`        | Exposes `data-status` and auto role behavior.                   |
| `Alert.Indicator`   | `alert-indicator`   | Defaults to `aria-hidden="true"`.                               |
| `Alert.Content`     | `alert-content`     | Expands to full width when no indicator is rendered.            |
| `Alert.Title`       | `alert-title`       | Renders `h3` by default and supports `asChild`.                 |
| `Alert.Description` | `alert-description` | Styled description wrapper with margin resets for child blocks. |

## Composition

```tsx
import { Alert } from 'moduix';

export function AlertDemo() {
  return (
    <Alert.Root status="warning">
      <Alert.Indicator>
        <InfoIcon />
      </Alert.Indicator>
      <Alert.Content>
        <Alert.Title>Storage is almost full</Alert.Title>
        <Alert.Description>Archive old uploads or upgrade the plan.</Alert.Description>
      </Alert.Content>
    </Alert.Root>
  );
}
```

Use `asChild` on `Alert.Title` when the document outline needs a different heading element:

```tsx
<Alert.Title asChild>
  <h2>Billing issue</h2>
</Alert.Title>
```

## Upstream feature coverage

- `Anatomy`: moduix preserves a Chakra-style compound part tree and exposes each part explicitly.
- `Composition`: preserved through Ark factory `asChild` behavior on every exported part.
- `Status semantics`: moduix adds a focused status surface with `neutral`, `info`, `success`,
  `warning`, and `error`.
- `Variants`, `sizes`, and recipe palettes`: intentionally not exposed; moduix keeps one visual
  recipe instead of Chakra's broader styling matrix.
- `Dismiss/action behavior`: intentionally not added; consumers compose actions inside
  `Alert.Content` when needed.

## Accessibility and state

- `Alert.Root` defaults to `role="status"` and switches to `role="alert"` for `status="error"`.
- `status` is exposed as `data-status` on the root for styling and testing.
- `Alert.Indicator` defaults to `aria-hidden="true"`, so essential meaning must stay in title or
  description text.
- All exported parts support Ark `asChild`.

## Defaults and styling

### `Alert.Root`

Extends Ark `div` props and supports `asChild`.

| Prop        | Type                                                       | Default     |
| ----------- | ---------------------------------------------------------- | ----------- |
| `status`    | `'neutral' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'neutral'` |
| `role`      | native `div` `role`                                        | auto        |
| `className` | `string`                                                   | -           |

### Public CSS variables

| Variable                          | Default/fallback                                           |
| --------------------------------- | ---------------------------------------------------------- |
| `--alert-bg`                      | `var(--alert-bg-default, var(--color-card))`               |
| `--alert-border-color`            | `var(--alert-border-color-default, var(--color-border))`   |
| `--alert-border-width`            | `var(--border-width-sm)`                                   |
| `--alert-color`                   | `var(--alert-color-default, var(--color-card-foreground))` |
| `--alert-content-gap`             | `var(--spacing-1)`                                         |
| `--alert-description-color`       | `var(--color-muted-foreground)`                            |
| `--alert-description-font-size`   | `var(--text-sm)`                                           |
| `--alert-description-line-height` | `var(--line-height-text-sm)`                               |
| `--alert-gap`                     | `var(--spacing-3)`                                         |
| `--alert-indicator-color`         | `var(--alert-indicator-color-default, currentColor)`       |
| `--alert-indicator-offset`        | `0.125rem`                                                 |
| `--alert-indicator-size`          | `1rem`                                                     |
| `--alert-padding`                 | `var(--spacing-4)`                                         |
| `--alert-radius`                  | `var(--radius-lg)`                                         |
| `--alert-shadow`                  | `none`                                                     |
| `--alert-title-color`             | `var(--alert-color, var(--alert-color-default))`           |
| `--alert-title-font-size`         | `var(--text-sm)`                                           |
| `--alert-title-font-weight`       | `var(--weight-semibold)`                                   |
| `--alert-title-line-height`       | `var(--line-height-text-sm)`                               |

Built-in statuses derive their accents from shared palette tokens:

- `success` -> `--color-success`
- `warning` -> `--color-warning`
- `error` -> `--color-destructive`

## Intentional sugar and differences from upstream

- There is no dedicated upstream Ark `Alert` primitive here; moduix uses Ark's polymorphic factory
  for the parts.
- moduix keeps one visual recipe instead of Chakra's `variant`, `size`, and palette props.
- moduix introduces the focused `status` API and automatic role defaulting for that status.

## Agent notes

- Breaking changes in this migration are intentional:
  - flat exports like `AlertIcon` and `AlertTitle` were removed
  - `variant` was replaced with Ark-style `status`
  - `destructive` status became `error`
  - `AlertTitle as` was replaced by Ark `asChild`

## Local changelog

- 2026-06: Migrated `Alert` to an Ark-style compound contract based on `Alert.Root`,
  `Alert.Indicator`, `Alert.Content`, `Alert.Title`, and `Alert.Description`; replaced
  `variant` with `status`; renamed `destructive` to `error`; and moved heading polymorphism from
  `as` to `asChild`.
# Alert

Upstream reference docs:

- Ark UI factory: https://ark-ui.com/docs/guides/composition
- Chakra UI Alert: https://chakra-ui.com/docs/components/alert

## Purpose

`Alert` is a thin compound wrapper for inline status, validation, and system messages. Ark UI does
not ship a dedicated `Alert` primitive, so moduix now models the component with Ark's `ark`
factory and Chakra's Alert part contract.

## Current behavior contract

- Public API is compound-only: `Alert.Root`, `Alert.Indicator`, `Alert.Content`, `Alert.Title`,
  `Alert.Description`.
- `Alert.Root` defaults `status` to `'neutral'`.
- `Alert.Root` defaults `role` to `'status'`, and switches to `'alert'` when `status="error"`.
- `Alert.Title` renders an `h3` by default.
- All exported parts accept `className`.
- All exported parts accept Ark `asChild`.

## Composition

Recommended anatomy:

```text
Alert.Root
├─ Alert.Indicator (optional)
└─ Alert.Content
   ├─ Alert.Title
   └─ Alert.Description
```

Basic usage:

```tsx
import { Alert } from 'moduix';

export function AlertDemo() {
  return (
    <Alert.Root>
      <Alert.Content>
        <Alert.Title>Update available</Alert.Title>
        <Alert.Description>
          Install the latest version when your workflow allows it.
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  );
}
```

Add an indicator only when it helps recognition:

```tsx
<Alert.Root status="info">
  <Alert.Indicator>
    <InfoIcon />
  </Alert.Indicator>
  <Alert.Content>
    <Alert.Title>Workspace sync is active</Alert.Title>
    <Alert.Description>Changes are being synced across all connected devices.</Alert.Description>
  </Alert.Content>
</Alert.Root>
```

Keep extra links or controls inside `Alert.Content`:

```tsx
function StorageAlert() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Alert.Root status="warning">
      <Alert.Indicator>
        <InfoIcon />
      </Alert.Indicator>
      <Alert.Content>
        <Alert.Title>Storage is almost full</Alert.Title>
        <Alert.Description>Archive old uploads or upgrade the plan.</Alert.Description>
        <div className={styles.actions}>
          <Button size="sm">Review uploads</Button>
          <Button size="sm" variant="outline" onClick={() => setVisible(false)}>
            Dismiss
          </Button>
        </div>
      </Alert.Content>
    </Alert.Root>
  );
}
```

To change the heading level, use Ark composition instead of the removed `as` prop:

```tsx
<Alert.Title asChild>
  <h2>Billing issue</h2>
</Alert.Title>
```

## Defaults and styling

### `Alert.Root`

Extends Ark `div` props and supports `asChild`.

| Prop        | Type                                                       | Default     |
| ----------- | ---------------------------------------------------------- | ----------- |
| `status`    | `'neutral' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'neutral'` |
| `role`      | native `div` `role`                                        | auto        |
| `className` | `string`                                                   | -           |

`status` is exposed as `data-status` on the root.

### `Alert.Indicator`

Extends Ark `span` props and supports `asChild`. Defaults to `aria-hidden="true"`, so essential
meaning should stay in the title or description. SVG children are sized by
`--alert-indicator-size` and inherit the slot color.

### `Alert.Content`

Extends Ark `div` props and supports `asChild`. If `Alert.Indicator` is omitted, CSS makes the
content span the full alert width.

### `Alert.Title`

Extends Ark `h3` props and supports `asChild`. Use `asChild` when the document outline needs a
different heading element.

### `Alert.Description`

Extends Ark `div` props and supports `asChild`. The styles reset margins for the first and last
direct child, so paragraphs or lists can be composed inside without extra wrapper spacing.

### Styling hooks

- Stable `data-slot` hooks: `alert-root`, `alert-indicator`, `alert-content`, `alert-title`,
  `alert-description`
- Stable state hook: `data-status`

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

## Intentional differences from upstream

- There is no dedicated upstream Ark `Alert` primitive here; moduix uses Ark's polymorphic
  factory for the parts.
- moduix keeps one visual recipe instead of Chakra's extra `variant`, `size`, and palette props.
- The component remains presentational. It does not add dismiss state, focus management, or action
  slots.

## Agent notes

- Breaking changes are intentional in this migration:
  - flat exports like `AlertIcon` and `AlertTitle` were removed
  - `variant` was replaced with Ark-style `status`
  - `destructive` status became `error`
  - `AlertTitle as` was replaced by Ark `asChild`

## Local changelog

- 2026-06: Migrated `Alert` to an Ark-style compound contract based on `Alert.Root`,
  `Alert.Indicator`, `Alert.Content`, `Alert.Title`, and `Alert.Description`; replaced
  `variant` with `status`; renamed `destructive` to `error`; and moved heading polymorphism from
  `as` to `asChild`.
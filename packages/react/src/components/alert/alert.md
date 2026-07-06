# Alert

Upstream docs:

- Ark UI: https://ark-ui.com/docs/guides/composition
- Ark UI styling: https://ark-ui.com/docs/guides/styling
- Ark UI refs: https://ark-ui.com/docs/guides/ref
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

- Public API is part-first: `Alert.Root`, `Alert.Indicator`, `Alert.Content`, `Alert.Title`,
  `Alert.Description`.
- The callable `Alert` export remains the root part itself. Runnable docs/examples use the short
  `<Alert>` root form, while anatomy and API notes may still refer to `Alert.Root`.
- `Alert.Root` defaults `status` to `'neutral'`.
- `Alert.Root` defaults `role` to `'status'`, and switches to `'alert'` when `status="error"`.
- `Alert.Content` is optional for the simple title/description path and stays available for grouped
  text and actions.
- `Alert.Title` renders a `p` by default.
- All exported parts accept `className`.
- All exported parts accept Ark `asChild`.
- Refs forward to each rendered DOM part.
- Props are inferred from the component values with `ComponentProps`; moduix does not re-export
  aliases for the Ark factory props or the `status` union.
- The component stays presentational and does not add dismiss state, controlled state, action slots,
  or focus management.
- Public docs examples should show `Code`, `Styles`, and `Data` tabs, even though Alert has no Ark
  primitive example set to mirror.

## Anatomy and exported parts

```text
Alert / Alert.Root
├─ Alert.Indicator (optional)
├─ Alert.Title
├─ Alert.Description
└─ Alert.Content (optional)
   ├─ Alert.Title
   ├─ Alert.Description
   └─ Extra actions or custom blocks
```

Every exported part accepts `className` and receives stable hooks:

| Part                   | `data-part`   | `data-slot`         | Notes                                                           |
| ---------------------- | ------------- | ------------------- | --------------------------------------------------------------- |
| `Alert` / `Alert.Root` | `root`        | `alert-root`        | Exposes `data-status` and auto role behavior.                   |
| `Alert.Indicator`      | `indicator`   | `alert-indicator`   | Defaults to `aria-hidden="true"`.                               |
| `Alert.Content`        | `content`     | `alert-content`     | Optional content-column wrapper for grouped text and actions.   |
| `Alert.Title`          | `title`       | `alert-title`       | Renders `p` by default and supports `asChild`.                  |
| `Alert.Description`    | `description` | `alert-description` | Styled description wrapper with margin resets for child blocks. |

## Composition

```tsx
import { Alert } from '@moduix/react';

export function AlertDemo() {
  return (
    <Alert status="warning">
      <Alert.Indicator>
        <InfoIcon />
      </Alert.Indicator>
      <Alert.Title>Storage is almost full</Alert.Title>
      <Alert.Description>Archive old uploads or upgrade the plan.</Alert.Description>
    </Alert>
  );
}
```

Use `Alert.Content` when title, description, and extra controls should stay grouped in one content
column beside the indicator. Use `asChild` on `Alert.Title` when the document outline needs a
different heading element:

```tsx
<Alert.Title asChild>
  <h2>Billing issue</h2>
</Alert.Title>
```

## Upstream feature coverage

- `Anatomy`: moduix preserves a Chakra-style compound part tree and exposes each part explicitly.
- `Composition`: preserved through Ark factory `asChild` behavior on every exported part.
- `Refs`: forwarded to the rendered DOM element for every exported part.
- `Styling`: follows Ark `data-scope` / `data-part` targeting and moduix `data-slot` hooks.
- `Status semantics`: moduix adds a focused status surface with `neutral`, `info`, `success`,
  `warning`, and `error`.
- `Heading composition`: preserved through `Alert.Title asChild` for document outline control.
- `Variants`, `sizes`, and recipe palettes`: intentionally not exposed; moduix keeps one visual
  recipe instead of Chakra's broader styling matrix.
- `Dismiss/action behavior`: intentionally not added; consumers compose actions inside
  `Alert.Content` when needed.

## Accessibility and state

- `Alert.Root` writes:
  - `data-scope="alert"`
  - `data-part="root"`
  - `data-slot="alert-root"`
  - `data-status="<status>"`
- `Alert.Indicator` writes `data-part="indicator"`, `data-slot="alert-indicator"`, and defaults to
  `aria-hidden="true"`, so essential meaning must stay in title or description text.
- `Alert.Content`, `Alert.Title`, and `Alert.Description` write matching `data-scope="alert"`,
  `data-part`, and `data-slot` attributes.
- `Alert.Root` defaults to `role="status"` and switches to `role="alert"` for `status="error"`.
- All exported parts support Ark `asChild`.
- `asChild` requires one semantic child; interactive children keep their own native keyboard and
  focus behavior.

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
| `--alert-padding`                 | `var(--spacing-3)`                                         |
| `--alert-radius`                  | `var(--radius-lg)`                                         |
| `--alert-shadow`                  | `none`                                                     |
| `--alert-title-color`             | `var(--alert-color, var(--alert-color-default))`           |
| `--alert-title-font-size`         | `var(--text-sm)`                                           |
| `--alert-title-font-weight`       | `var(--weight-semibold)`                                   |
| `--alert-title-line-height`       | `var(--line-height-text-sm)`                               |

Built-in statuses derive their accents from shared palette tokens:

- `info` -> `--color-primary`
- `success` -> `--color-success`
- `warning` -> `--color-warning`
- `error` -> `--color-destructive`

## Intentional sugar and differences from upstream

- There is no dedicated upstream Ark `Alert` primitive here; moduix uses Ark's polymorphic factory
  for the parts.
- moduix keeps one visual recipe instead of Chakra's `variant`, `size`, and palette props.
- moduix introduces the focused `status` API and automatic role defaulting for that status.
- `Alert.Content` is optional for the simple title/description path and remains the grouping surface
  for actions and dismiss controls; no action slot or close state is built into the component.

## Agent notes

- Use the short `<Alert>` root form in runnable examples; keep `Alert.Root` for anatomy and API
  explanations.
- Do not add local dismiss, keyboard, or focus behavior to the alert wrapper; compose interactive
  controls inside `Alert.Content`.

## Local changelog

- 2026-07-06: Made `Alert.Content` optional for the simple title/description path, changed
  `Alert.Title` to render `p` by default, and tightened the default root padding to
  `var(--spacing-3)`.
- 2026-07-02: Simplified the public type surface by removing Alert prop and status aliases; preserved
  callable-root composition, all visual parts, statuses, automatic roles, refs, `asChild`, and
  styling hooks.
- 2026-07-01: Aligned runnable examples on the short `<Alert>` root form while preserving
  `Alert.Root` as the equivalent anatomy/API alias.
- 2026-06: Migrated `Alert` to an Ark-style compound contract based on `Alert.Root`,
  `Alert.Indicator`, `Alert.Content`, `Alert.Title`, and `Alert.Description`; replaced
  `variant` with `status`; renamed `destructive` to `error`; and moved heading polymorphism from
  `as` to `asChild`.
- 2026-06-18: Updated docs/examples to make every Alert preview reproducible with `Code`,
  `Styles`, and `Data` tabs, and added a dedicated `Alert.Title asChild` example.
- 2026-06-24: Added explicit Ark-style `data-scope` / `data-part` hooks and finalized local/docs
  guidance for the Ark factory implementation.
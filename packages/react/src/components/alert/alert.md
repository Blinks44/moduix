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

- Public API is part-first: `Alert`, `AlertIndicator`, `AlertContent`, `AlertTitle`,
  `AlertDescription`, and `AlertActions`.
- `Alert` is the only public root value.
- `Alert` defaults `status` to `'info'` and uses the card surface for that default status.
- `status` controls visual styling only. `Alert` does not set a `role`; consumers add
  `role="status"` or `role="alert"` when a dynamically added or updated message needs a live region.
- `AlertContent` is required and owns the title, description, actions, and custom message content.
- `AlertActions` provides a stylable wrapped action row for buttons or links inside
  `AlertContent`.
- `AlertTitle` renders a `p` by default.
- All exported parts accept `className`.
- All exported parts accept Ark `asChild`.
- Refs forward to each rendered DOM part.
- Exports the `AlertRootProps` and `AlertStatus` types, like `Badge` and `Tag`.
- The component stays presentational and does not add dismiss state, controlled state, action slots,
  or focus management.
- Public docs examples should show `Code`, `Styles`, and `Data` tabs, even though Alert has no Ark
  primitive example set to mirror.

## Anatomy and exported parts

```text
Alert
├─ AlertIndicator (optional)
└─ AlertContent
   ├─ AlertTitle
   ├─ AlertDescription
   ├─ AlertActions (optional)
   └─ Extra custom blocks
```

Every exported part accepts `className` and receives stable hooks:

| Part               | `data-part`   | `data-slot`         | Notes                                                            |
| ------------------ | ------------- | ------------------- | ---------------------------------------------------------------- |
| `Alert`            | `root`        | `alert-root`        | Exposes `data-status`; `role` is left to the consumer.           |
| `AlertIndicator`   | `indicator`   | `alert-indicator`   | Defaults to `aria-hidden="true"`.                                |
| `AlertContent`     | `content`     | `alert-content`     | Required content-column wrapper for message content and actions. |
| `AlertTitle`       | `title`       | `alert-title`       | Renders `p` by default and supports `asChild`.                   |
| `AlertDescription` | `description` | `alert-description` | Styled description wrapper with margin resets for child blocks.  |
| `AlertActions`     | `actions`     | `alert-actions`     | Optional wrapped action row with default spacing hooks.          |

## Composition

```tsx
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
} from '@moduix/react/alert';

export function AlertDemo() {
  return (
    <Alert status="warning">
      <AlertIndicator>
        <InfoIcon />
      </AlertIndicator>
      <AlertContent>
        <AlertTitle>Storage is almost full</AlertTitle>
        <AlertDescription>Archive old uploads or upgrade the plan.</AlertDescription>
      </AlertContent>
    </Alert>
  );
}
```

Place all message content inside `AlertContent`. Use `AlertActions` when buttons or links should
share the default wrapped action-row layout. Use `asChild` on `AlertTitle` when the document outline needs a
different heading element:

```tsx
<AlertTitle asChild>
  <h2>Billing issue</h2>
</AlertTitle>
```

## Upstream feature coverage

- `Anatomy`: moduix preserves a Chakra-style compound part tree and exposes each part explicitly.
- `Composition`: preserved through Ark factory `asChild` behavior on every exported part.
- `Refs`: forwarded to the rendered DOM element for every exported part.
- `Styling`: follows Ark `data-scope` / `data-part` targeting and moduix `data-slot` hooks.
- `Status semantics`: moduix adds a focused status surface with `info`, `success`, `warning`, and
  `error`.
- `Action-row sugar`: moduix adds `AlertActions` as a thin stylable wrapper for grouped actions.
- `Heading composition`: preserved through `AlertTitle asChild` for document outline control.
- `Variants`, `sizes`, and recipe palettes`: intentionally not exposed; moduix keeps one visual
  recipe instead of Chakra's broader styling matrix.
- `Default status icon`: intentionally not added. It needs a status context in every adapter, a
  client boundary in React, and an icon dependency; consumers pass the icon as a child.
- `Dismiss/action behavior`: intentionally not added; consumers compose actions inside
  `AlertContent` when needed.

## Accessibility and state

- `Alert` writes:
  - `data-scope="alert"`
  - `data-part="root"`
  - `data-slot="alert-root"`
  - `data-status="<status>"`
- `AlertIndicator` writes `data-part="indicator"`, `data-slot="alert-indicator"`, and defaults to
  `aria-hidden="true"`, so essential meaning must stay in title or description text.
- `AlertContent`, `AlertTitle`, and `AlertDescription` write matching `data-scope="alert"`,
  `data-part`, and `data-slot` attributes.
- `AlertActions` writes `data-part="actions"` and `data-slot="alert-actions"` for targeted action
  row styling.
- `Alert` does not set a `role`. `role="status"` and `role="alert"` create live regions: consumers
  add one only when the message is inserted or updated dynamically, and mount the root before
  updating its message; content present on initial page load may not be announced.
- Static supplementary callouts can use a non-live role such as `note`.
- All exported parts support Ark `asChild`.
- `asChild` requires one semantic child; interactive children keep their own native keyboard and
  focus behavior.

## Defaults and styling

### `Alert`

Extends Ark `div` props and supports `asChild`.

| Prop        | Type                                          | Default  |
| ----------- | --------------------------------------------- | -------- |
| `status`    | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` |
| `role`      | native `div` `role`                           | -        |
| `className` | `string`                                      | -        |

### Public CSS variables

| Variable                           | Default/fallback                                                   |
| ---------------------------------- | ------------------------------------------------------------------ |
| `--moduix-alert-bg`                | Status-dependent; info uses `var(--moduix-color-card)`             |
| `--moduix-alert-border-color`      | Status-dependent; info uses `var(--moduix-color-border)`           |
| `--moduix-alert-color`             | Status-dependent; info uses `var(--moduix-color-card-foreground)`  |
| `--moduix-alert-description-color` | `var(--moduix-color-muted-foreground)`                             |
| `--moduix-alert-indicator-color`   | Status-dependent; info uses `var(--moduix-color-muted-foreground)` |

Built-in statuses derive their accents from shared palette tokens:

- `info` -> card surface tokens
- `success` -> `--moduix-color-success`
- `warning` -> `--moduix-color-warning`
- `error` -> `--moduix-color-destructive`

The four color variables override every status. Scope them with `[data-status='success']` and
similar selectors to retheme one status. Spacing, radius, shadow, and typography use foundation
tokens; override them with a class on the part.

`AlertIndicator` sizes itself to its content. Child SVG icons default to 16px, and a size class on
the icon resizes both the icon and the indicator.

## Intentional sugar and differences from upstream

- There is no dedicated upstream Ark `Alert` primitive here; moduix uses Ark's polymorphic factory
  for the parts.
- moduix keeps one visual recipe instead of Chakra's `variant`, `size`, and palette props.
- moduix introduces the focused `status` API. Unlike shadcn's fixed `role="alert"`, the role stays a
  consumer decision, as in Chakra.
- `AlertContent` is required and remains the grouping surface for actions and dismiss controls; no
  action slot or close state is built into the component.
- `AlertActions` is narrow sugar for the common wrapped action row. It does not inject buttons,
  dismissal logic, positioning, or hidden layout behavior outside its own container.

## Agent notes

- Do not add a default status icon or a status context; `AlertIndicator` renders only its children.
- Icon sizing must stay overridable from the icon itself: `:where(svg)` in CSS Modules and
  `[:where(&_svg)]:size-4` in Tailwind. Do not give `AlertIndicator` a fixed size; a larger icon
  would overflow it into the gap.
- Tailwind variants pass the status indicator color from the root to `AlertIndicator` through the
  private `--_alert-indicator-color` property, so a plain color utility on `AlertIndicator` overrides
  it. Do not move it back to `group-data-[status=…]` utilities: they outrank consumer classes.
- Use `AlertContent` for all message content in runnable examples; use `Alert` as the only root
  value in anatomy and API explanations.
- Do not add local dismiss, keyboard, or focus behavior to the alert wrapper; compose interactive
  controls inside `AlertContent`.
- Keep `AlertActions` thin and stylable. Do not grow it into an action API with special button
  props or close behavior.
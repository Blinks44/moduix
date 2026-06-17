# Card

Upstream reference docs:

- Ark UI composition: https://ark-ui.com/react/docs/guides/composition
- Chakra UI Card: https://www.chakra-ui.com/docs/components/card

## Purpose

`Card` is a standalone moduix surface component. Ark UI does not ship a dedicated Card primitive, so
moduix now models it as an Ark-style multipart component built with `@ark-ui/react/factory`.

## Current behavior contract

- Public API is compound-first: `Card.Root`, `Card.Header`, `Card.Body`, `Card.Footer`,
  `Card.Title`, `Card.Description`, `Card.Action`, `Card.Link`.
- The callable `Card` export remains the root part itself, but docs and examples should prefer
  explicit part names.
- `Card.Root` defaults `size` to `'md'`.
- `Card.Title` renders `h3` by default and uses Ark `asChild` for heading-level changes.
- All exported parts accept Ark factory props, including `className` and `asChild`.

## Composition

Recommended anatomy:

```text
Card.Root
├─ Card.Header
│  ├─ Card.Title
│  ├─ Card.Description
│  └─ Card.Action (optional)
├─ Card.Body
└─ Card.Footer (optional)
```

Basic usage:

```tsx
import { Button, Card } from 'moduix';

export function CardDemo() {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Release health</Card.Title>
        <Card.Description>Summary for the current production rollout.</Card.Description>
      </Card.Header>
      <Card.Body>
        <div>
          <strong>98.4%</strong> successful sessions
        </div>
      </Card.Body>
      <Card.Footer>
        <Button variant="outline">View log</Button>
        <Button>Promote release</Button>
      </Card.Footer>
    </Card.Root>
  );
}
```

Use `asChild` on the root when the whole card is one link and there are no nested interactive
controls:

```tsx
<Card.Root asChild>
  <a href="/reports/release-health">
    <Card.Header>
      <Card.Title>Release health</Card.Title>
      <Card.Description>Summary for the current rollout.</Card.Description>
    </Card.Header>
    <Card.Body>98.4% successful sessions</Card.Body>
  </a>
</Card.Root>
```

Use `Card.Link` inside `Card.Title` when the card must navigate and still keep nested actions:

```tsx
<Card.Root>
  <Card.Header>
    <Card.Title>
      <Card.Link href="/incidents/response">Incident response</Card.Link>
    </Card.Title>
    <Card.Description>Owner rotation and escalation readiness.</Card.Description>
    <Card.Action>
      <Button variant="outline" size="sm">
        Acknowledge
      </Button>
    </Card.Action>
  </Card.Header>
  <Card.Body>18 min median response</Card.Body>
</Card.Root>
```

## Parts

| Part               | Element | Data attributes                                                                        | Purpose                                      |
| ------------------ | ------- | -------------------------------------------------------------------------------------- | -------------------------------------------- |
| `Card.Root`        | `div`   | `data-scope="card"`, `data-part="root"`, `data-slot="card-root"`, `data-size="<size>"` | Root surface, border, background, and size.  |
| `Card.Header`      | `div`   | `data-scope="card"`, `data-part="header"`, `data-slot="card-header"`                   | Header grid for title, description, action.  |
| `Card.Body`        | `div`   | `data-scope="card"`, `data-part="body"`, `data-slot="card-body"`                       | Main body area with text styling.            |
| `Card.Footer`      | `div`   | `data-scope="card"`, `data-part="footer"`, `data-slot="card-footer"`                   | Wrapping footer row for actions or metadata. |
| `Card.Title`       | `h3`    | `data-scope="card"`, `data-part="title"`, `data-slot="card-title"`                     | Card heading.                                |
| `Card.Description` | `p`     | `data-scope="card"`, `data-part="description"`, `data-slot="card-description"`         | Supporting text under the title.             |
| `Card.Action`      | `div`   | `data-scope="card"`, `data-part="action"`, `data-slot="card-action"`                   | Optional trailing header slot.               |
| `Card.Link`        | `a`     | `data-scope="card"`, `data-part="link"`, `data-slot="card-link"`                       | Overlay link for cards with nested actions.  |

## Public props

### `Card.Root`

Extends Ark `div` props and supports `asChild`.

| Prop        | Type           | Default |
| ----------- | -------------- | ------- |
| `size`      | `'sm' \| 'md'` | `'md'`  |
| `className` | `string`       | -       |
| `asChild`   | `boolean`      | `false` |

`size` is exposed as `data-size` on the root.

### `Card.Header`, `Card.Body`, `Card.Footer`, `Card.Action`

Extend Ark `div` props and support `asChild`.

- `Card.Header` is a two-column grid: title and description use the first column, `Card.Action`
  occupies the trailing column.
- `Card.Body` resets the first and last direct-child margins and only adds top padding when it
  follows another part.
- `Card.Footer` is a wrapping flex row for actions or secondary metadata.

### `Card.Title`

Extends Ark `h3` props and supports `asChild`.

Use `asChild` when the document outline needs another heading:

```tsx
<Card.Title asChild>
  <h2>Billing plan</h2>
</Card.Title>
```

### `Card.Description`

Extends Ark `p` props and supports `asChild`. Keep the content phrasing/text-like.

### `Card.Link`

Extends Ark `a` props and supports `asChild`. The slot renders the overlay click target and focus
ring, while `Card.Action` stays layered above it.

## Styling API

Stable styling hooks:

- `data-slot="card-root" | "card-header" | "card-body" | "card-footer" | "card-title" | "card-description" | "card-action" | "card-link"`
- `data-scope="card"`
- `data-part="root" | "header" | "body" | "footer" | "title" | "description" | "action" | "link"`
- `data-size="sm" | "md"`

Public CSS variables:

| Variable                         | Default/fallback                | Applies to         |
| -------------------------------- | ------------------------------- | ------------------ |
| `--card-action-gap`              | `var(--spacing-2)`              | `Card.Action`      |
| `--card-bg`                      | `var(--color-card)`             | `Card.Root`        |
| `--card-body-color`              | `var(--color-muted-foreground)` | `Card.Body`        |
| `--card-body-font-size`          | `var(--text-sm)`                | `Card.Body`        |
| `--card-body-line-height`        | `var(--line-height-text-sm)`    | `Card.Body`        |
| `--card-body-padding-top`        | `var(--spacing-4)`              | `Card.Body`        |
| `--card-border-color`            | `var(--color-border)`           | `Card.Root`        |
| `--card-border-width`            | `var(--border-width-sm)`        | `Card.Root`        |
| `--card-color`                   | `var(--color-card-foreground)`  | `Card.Root`        |
| `--card-description-color`       | `var(--color-muted-foreground)` | `Card.Description` |
| `--card-description-font-size`   | `var(--text-sm)`                | `Card.Description` |
| `--card-description-line-height` | `var(--line-height-text-sm)`    | `Card.Description` |
| `--card-footer-gap`              | `var(--spacing-2)`              | `Card.Footer`      |
| `--card-focus-ring-color`        | `var(--color-ring)`             | `Card.Link`        |
| `--card-focus-ring-offset`       | `var(--border-width-sm)`        | `Card.Link`        |
| `--card-focus-ring-width`        | `var(--border-width-md)`        | `Card.Link`        |
| `--card-header-gap`              | `var(--spacing-1)`              | `Card.Header`      |
| `--card-padding`                 | `var(--spacing-6)`              | `Card.Root`        |
| `--card-padding-sm`              | `var(--spacing-4)`              | `Card.Root`        |
| `--card-radius`                  | `var(--radius-lg)`              | `Card.Root`        |
| `--card-shadow`                  | `none`                          | `Card.Root`        |
| `--card-title-color`             | `currentColor`                  | `Card.Title`       |
| `--card-title-font-size`         | `var(--text-lg)`                | `Card.Title`       |
| `--card-title-font-size-sm`      | `var(--text-md)`                | `Card.Title`       |
| `--card-title-font-weight`       | `var(--weight-semibold)`        | `Card.Title`       |
| `--card-title-line-height`       | `var(--line-height-text-lg)`    | `Card.Title`       |
| `--card-title-line-height-sm`    | `var(--line-height-text-md)`    | `Card.Title`       |

## Accessibility and constraints

- `Card.Root` is presentational by default. Choose semantic wrappers outside the component when the
  page structure needs `article`, `section`, or landmark semantics.
- Use `Card.Root asChild` for single-link cards. Do not wrap nested buttons, inputs, menus, or
  links inside a linked root.
- Use `Card.Link` for the overlay-link pattern when the card must still contain nested interactive
  controls.
- `Card.Action` is layout only. It does not create ownership or ARIA relationships.
- Long title, description, and body content wrap to avoid horizontal overflow.

## Intentional differences from upstream

- Ark UI has no dedicated Card primitive here; moduix uses Ark factory parts and Chakra's Card
  anatomy as the contract reference.
- moduix keeps one visual recipe instead of Chakra's broader `variant`, `orientation`, and `size`
  surface.
- `Card.Action` and `Card.Link` remain narrow moduix extensions for header-side actions and the
  overlay-link pattern.

## Local changelog

- 2026-06: Migrated `Card` to an Ark-style multipart API based on `Card.Root`, `Card.Header`,
  `Card.Body`, `Card.Footer`, `Card.Title`, and `Card.Description`; replaced Base UI `render` with
  Ark `asChild`; renamed `CardContent` to `Card.Body`; and added Ark-style `data-scope` /
  `data-part` hooks across all parts.
# Card

Upstream docs:

- Ark UI: https://ark-ui.com/docs/guides/composition
- Chakra UI: https://chakra-ui.com/docs/components/card

## Purpose

`Card` is a standalone moduix surface component.

Ark UI does not ship a dedicated Card primitive, so moduix models it as an Ark-style multipart
component built with `@ark-ui/react/factory` and Chakra's Card anatomy.

## Upstream model to preserve

- Uses Ark factory parts instead of a dedicated Ark primitive.
- Keeps a Chakra-aligned multipart card model centered on root, header, title, description, body,
  and footer.
- Keeps Ark-style DOM ownership through `asChild` while leaving card state and workflow logic
  outside the component.

## Current behavior contract

- Public API is compound-first: `Card.Root`, `Card.Header`, `Card.Body`, `Card.Footer`,
  `Card.Title`, `Card.Description`, `Card.Action`, and `Card.Link`.
- The callable `Card` export is the recommended root form; `Card.Root` is the equivalent
  namespaced form.
- `Card.Root` defaults `size` to `'md'`.
- `Card.Root` defaults `variant` to `'outline'`.
- `Card.Title` renders `h3` by default and uses Ark `asChild` for heading-level changes.
- All exported parts accept Ark factory props, including `className` and `asChild`.

## Anatomy and exported parts

```text
Card.Root
├─ Card.Header
│  ├─ Card.Title
│  ├─ Card.Description
│  └─ Card.Action (optional)
├─ Card.Body
└─ Card.Footer (optional)
```

Every exported part accepts `className` and keeps stable hooks:

| Part               | `data-slot`        | Notes                                            |
| ------------------ | ------------------ | ------------------------------------------------ |
| `Card.Root`        | `card-root`        | Root surface with size, variant, and background. |
| `Card.Header`      | `card-header`      | Header grid for title, description, and action.  |
| `Card.Body`        | `card-body`        | Main body area with content spacing.             |
| `Card.Footer`      | `card-footer`      | Wrapping footer row for actions or metadata.     |
| `Card.Title`       | `card-title`       | Heading part, defaults to `h3`.                  |
| `Card.Description` | `card-description` | Supporting text under the title.                 |
| `Card.Action`      | `card-action`      | Optional trailing header slot.                   |
| `Card.Link`        | `card-link`        | Overlay link for cards with nested actions.      |

## Composition

```tsx
import { Button, Card } from 'moduix';

export function CardDemo() {
  return (
    <Card>
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
    </Card>
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

## Upstream feature coverage

- `Multipart anatomy`: preserved through the exported card parts.
- `Composition`: preserved through Ark factory `asChild` behavior on every part.
- `Dedicated Ark primitive features`: not applicable because Ark has no dedicated `Card` page for
  this wrapper to mirror.
- `Chakra card mental model`: preserved for the root/header/body/footer/title/description surface.
- `Variants`: covered by `elevated`, `outline`, and `subtle`.
- `Sizes`: covered by `sm`, `md`, and `lg`.
- `Within Form`: supported through `Card asChild` with a semantic `form`.
- `With Image`, `Horizontal`, and `With Avatar`: supported through normal child composition and
  consumer layout CSS.
- `Overlay-link pattern`: intentionally added by moduix through `Card.Link` and `Card.Action`.

## Accessibility and state

- Exported parts write Ark-style hooks:
  - `data-scope="card"`
  - `data-part="root" | "header" | "body" | "footer" | "title" | "description" | "action" | "link"`
- `Card.Root` also writes:
  - `data-slot="card-root"`
  - `data-size="sm" | "md" | "lg"`
  - `data-variant="elevated" | "outline" | "subtle"`
- `Card.Root` is presentational by default.
- Every part forwards its ref to the rendered DOM element.
- `asChild` requires one semantic child that can accept the merged props and ref.
- `Card.Action` is layout only and does not create ownership or ARIA relationships.
- `Card.Link` owns the overlay click target and focus ring for the linked-card pattern.
- Card has no managed state, callback details, provider/context API, form context integration,
  `HiddenInput`, or runtime CSS variables because it is not an interactive Ark primitive.

## Defaults and styling

| Part        | Prop      | Default     | Notes                                         |
| ----------- | --------- | ----------- | --------------------------------------------- |
| `Card.Root` | `size`    | `'md'`      | Accepts `'sm' \| 'md' \| 'lg'`                |
| `Card.Root` | `variant` | `'outline'` | Accepts `'elevated' \| 'outline' \| 'subtle'` |

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
| `--card-padding-lg`              | `var(--spacing-8)`              | `Card.Root`        |
| `--card-padding-sm`              | `var(--spacing-4)`              | `Card.Root`        |
| `--card-radius`                  | `var(--radius-lg)`              | `Card.Root`        |
| `--card-shadow`                  | `none`                          | `Card.Root`        |
| `--card-title-color`             | `currentColor`                  | `Card.Title`       |
| `--card-title-font-size`         | `var(--text-lg)`                | `Card.Title`       |
| `--card-title-font-size-lg`      | `var(--text-xl)`                | `Card.Title`       |
| `--card-title-font-size-sm`      | `var(--text-md)`                | `Card.Title`       |
| `--card-title-font-weight`       | `var(--weight-semibold)`        | `Card.Title`       |
| `--card-title-line-height`       | `var(--line-height-text-lg)`    | `Card.Title`       |
| `--card-title-line-height-lg`    | `var(--line-height-text-xl)`    | `Card.Title`       |
| `--card-title-line-height-sm`    | `var(--line-height-text-md)`    | `Card.Title`       |

## Intentional sugar and differences from upstream

- Ark UI has no dedicated Card primitive here; moduix uses Ark factory parts and Chakra's Card
  anatomy as the contract reference.
- moduix preserves Chakra's `sm`, `md`, and `lg` sizes plus the `elevated`, `outline`, and `subtle`
  variants. Horizontal layout remains composition-driven CSS rather than a root prop.
- `Card.Action` and `Card.Link` remain narrow moduix extensions for header-side actions and the
  overlay-link pattern.

## Agent notes

- Keep the exported part names stable and aligned with the card docs page.
- Preserve the distinction between `Card.Root asChild` for single-link cards and `Card.Link` for
  cards that still contain nested actions.
- Keep `Card.Body` margin-reset and spacing behavior aligned with the CSS contract.

## Local changelog

- 2026-06-18: Completed the Ark factory migration audit: removed the stale Base UI registry
  dependency, added Chakra-aligned `lg` sizing and `elevated` / `outline` / `subtle` variants,
  documented all current Chakra Card example categories, and standardized docs previews with
  Code, Styles, and Data tabs.
- 2026-06: Migrated `Card` to an Ark-style multipart API based on `Card.Root`, `Card.Header`,
  `Card.Body`, `Card.Footer`, `Card.Title`, and `Card.Description`; replaced Base UI `render` with
  Ark `asChild`; renamed `CardContent` to `Card.Body`; and added Ark-style `data-scope` /
  `data-part` hooks across all parts.
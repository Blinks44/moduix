# Card

`Card` is a standalone moduix presentational container. It does not wrap a Base UI primitive, has no
state management, and does not add interaction semantics by itself.

## Purpose

Use `Card` to group related content on a visible surface: summaries, settings panels, dashboard
widgets, media previews, and short forms. Keep interaction inside the card with `Button`, links, form
controls, or other focusable components. When the card itself is a navigation target, use either
`Card render={<a />}` for a single-link card or `CardLink` for the overlay-link pattern with nested
actions.

## Basic usage

```tsx
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardLink,
  CardTitle,
} from 'moduix';

export function CardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Release health</CardTitle>
        <CardDescription>Summary for the current production rollout.</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <strong>98.4%</strong> successful sessions
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline">View log</Button>
        <Button>Promote release</Button>
      </CardFooter>
    </Card>
  );
}
```

## Parts

| Part              | Element | Slot data attribute            | Purpose                                     |
| ----------------- | ------- | ------------------------------ | ------------------------------------------- |
| `Card`            | `div`   | `data-slot="card"`             | Root surface, border, background, and size. |
| `CardHeader`      | `div`   | `data-slot="card-header"`      | Grid layout for title, description, action. |
| `CardTitle`       | heading | `data-slot="card-title"`       | Card heading; renders `h3` by default.      |
| `CardDescription` | `p`     | `data-slot="card-description"` | Supporting text under the title.            |
| `CardAction`      | `div`   | `data-slot="card-action"`      | Optional trailing header slot.              |
| `CardLink`        | `a`     | `data-slot="card-link"`        | Link that can stretch over the card.        |
| `CardContent`     | `div`   | `data-slot="card-content"`     | Main body area with body text styling.      |
| `CardFooter`      | `div`   | `data-slot="card-footer"`      | Wrapping action or metadata row.            |

Recommended anatomy:

```text
Card
├─ CardHeader
│  ├─ CardTitle
│  │  └─ CardLink (optional)
│  ├─ CardDescription
│  └─ CardAction (optional)
├─ CardContent
└─ CardFooter
```

`Card` also accepts plain children before or after the standard parts. Use that for media blocks:

```tsx
<Card>
  <img alt="Warehouse shelves" className={styles.image} src="/warehouse.jpg" />
  <CardHeader>
    <CardTitle>Warehouse capacity</CardTitle>
    <CardDescription>North region allocation.</CardDescription>
  </CardHeader>
  <CardContent>72%</CardContent>
</Card>
```

## Public props

### `Card`

Extends native `div` props.

| Prop        | Type                | Default     |
| ----------- | ------------------- | ----------- |
| `render`    | Base UI render prop | -           |
| `size`      | `'default' \| 'sm'` | `'default'` |
| `className` | `string`            | -           |

`size` is written to `data-size` on the root. `size="sm"` reduces padding and title typography for
dense dashboard or sidebar layouts.

Use `render={<a href="..." />}` when the entire card is one link and the card has no nested
interactive controls:

```tsx
<Card render={<a href="/reports/release-health" />}>
  <CardHeader>
    <CardTitle>Release health</CardTitle>
    <CardDescription>Summary for the current rollout.</CardDescription>
  </CardHeader>
  <CardContent>98.4% successful sessions</CardContent>
</Card>
```

Do not use a linked root when children include buttons, menus, links, checkboxes, inputs, or other
focusable controls.

### `CardHeader`, `CardContent`, `CardFooter`, `CardAction`

Extend native `div` props and accept `className`.

`CardHeader` is a two-column grid: title and description occupy the first column, while
`CardAction` occupies the trailing column and spans the header rows. Use `CardAction` for compact
badges, status, menus, or one small control. Put larger actions in `CardFooter`.

`CardContent` resets the margins of its first and last direct child and gets top padding only when it
follows another part. If `CardContent` is the first child, it receives normal card top padding.

`CardFooter` is a wrapping flex row with a small gap. Override `justify-content` through `className`
when actions need spacing such as `space-between`.

### `CardTitle`

Extends heading props and renders `h3` by default.

| Prop | Type                                           | Default |
| ---- | ---------------------------------------------- | ------- |
| `as` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h3'`  |

Use `as` to keep the document outline correct:

```tsx
<CardTitle as="h2">Billing plan</CardTitle>
```

### `CardDescription`

Extends native `p` props. Keep the content phrasing/text-like; if the description needs complex
blocks, compose them in `CardContent` instead.

### `CardLink`

Extends native anchor props and supports Base UI-style `render`.

Use `CardLink` inside `CardTitle` when the card should navigate but also contains nested actions. The
link keeps valid HTML semantics while its `::after` overlay makes the visible card surface clickable.
`CardAction` is layered above the overlay by default.

```tsx
<Card>
  <CardHeader>
    <CardTitle>
      <CardLink href="/incidents/response">Incident response</CardLink>
    </CardTitle>
    <CardDescription>Owner rotation and escalation readiness.</CardDescription>
    <CardAction>
      <Button variant="outline" size="sm">
        Acknowledge
      </Button>
    </CardAction>
  </CardHeader>
  <CardContent>18 min median response</CardContent>
</Card>
```

## Styling API

Every part accepts `className`. The root exposes `data-size`, and all parts expose the `data-slot`
attributes listed above for selectors and tests.

Public CSS variables are registered in `packages/ui/src/styles/theme.css`. Override them on a single
card root or on a parent theme scope.

| Variable                         | Default/fallback                | Affects                    |
| -------------------------------- | ------------------------------- | -------------------------- |
| `--card-action-gap`              | `var(--spacing-2)`              | Gap inside `CardAction`.   |
| `--card-bg`                      | `var(--color-card)`             | Root background.           |
| `--card-border-color`            | `var(--color-border)`           | Root border color.         |
| `--card-border-width`            | `var(--border-width-sm)`        | Root border width.         |
| `--card-color`                   | `var(--color-card-foreground)`  | Root foreground color.     |
| `--card-content-color`           | `var(--color-muted-foreground)` | Body text color.           |
| `--card-content-font-size`       | `var(--text-sm)`                | Body font size.            |
| `--card-content-line-height`     | `var(--line-height-text-sm)`    | Body line-height.          |
| `--card-content-padding-top`     | `var(--spacing-4)`              | Header-to-content spacing. |
| `--card-description-color`       | `var(--color-muted-foreground)` | Description color.         |
| `--card-description-font-size`   | `var(--text-sm)`                | Description font size.     |
| `--card-description-line-height` | `var(--line-height-text-sm)`    | Description line-height.   |
| `--card-footer-gap`              | `var(--spacing-2)`              | Footer item gap.           |
| `--card-focus-ring-color`        | `var(--color-ring)`             | `CardLink` focus color.    |
| `--card-focus-ring-offset`       | `var(--border-width-sm)`        | `CardLink` focus offset.   |
| `--card-focus-ring-width`        | `var(--border-width-md)`        | `CardLink` focus width.    |
| `--card-header-gap`              | `var(--spacing-1)`              | Header row gap.            |
| `--card-padding`                 | `var(--spacing-6)`              | Default card padding.      |
| `--card-padding-sm`              | `var(--spacing-4)`              | Compact card padding.      |
| `--card-radius`                  | `var(--radius-lg)`              | Root border radius.        |
| `--card-shadow`                  | `none`                          | Root shadow.               |
| `--card-title-color`             | `currentColor`                  | Title color.               |
| `--card-title-font-size`         | `var(--text-lg)`                | Default title font size.   |
| `--card-title-font-size-sm`      | `var(--text-md)`                | Compact title font size.   |
| `--card-title-font-weight`       | `var(--weight-semibold)`        | Title weight.              |
| `--card-title-line-height`       | `var(--line-height-text-lg)`    | Default title line-height. |
| `--card-title-line-height-sm`    | `var(--line-height-text-md)`    | Compact title line-height. |

## UX and accessibility

- `Card` is a `div`, not an article, region, link, button, or form landmark. Choose semantic wrappers
  outside the component when a page section needs them. `render` can intentionally replace the root,
  for example with an anchor for a single-link card.
- `CardTitle` defaults to `h3`; set `as` when the page hierarchy requires another heading level.
- The root does not manage focus, keyboard navigation, disabled/read-only states, or ARIA
  relationships.
- Do not put click handlers on the card root unless you also implement correct keyboard and semantic
  behavior. Prefer a linked root for a single-link card or `CardLink` for the overlay-link pattern.
- `CardAction` is layout only. It does not label, own, or connect controls to the title.
- Long title, description, and content text wraps to avoid horizontal overflow.

## Limitations and recommendations

- Use `Card` for static grouping. Use dialog, popover, preview-card, or navigation components when
  content needs overlay, disclosure, or trigger behavior.
- Avoid using `CardAction` for wide button groups; use `CardFooter` so controls can wrap naturally.
- `CardDescription` renders a `p`, so do not place block elements directly inside it.
- Media is plain composition. Add consumer CSS such as `display: block`, sizing, or clipping when an
  image/video should visually align with the card edge.
- The component intentionally has no `asChild`, slot prop bags, class-name maps, variant system, or
  built-in interactive states. Use Base UI-style `render` for element replacement and keep
  customization in composition and CSS variables.

## Intentional differences from Base UI

There is no upstream Base UI primitive for this component. The local contract is the source of truth:
thin React functions, CSS Modules, `data-slot` hooks, one `size` prop, and composition-first layout.

## Agent notes

- Keep the API small. Do not add header/footer/action prop bags when explicit parts already cover the
  composition.
- Preserve `data-slot` values and the root `data-size` contract; docs and tests can depend on them.
- Keep `CardAction` narrow and optional. It is a header-side convenience, not a general action system.
- Preserve the `Card render` and `CardLink` split: linked root for cards without nested interactive
  content, overlay `CardLink` for cards with actions.
- If CSS variables change, update `theme.css`, docs examples, and this file together.
- If docs examples show a rich preview, the code snippet must include the same meaningful structure
  and CSS hooks used by the preview.

## Local changelog

- Rewritten to document the actual standalone moduix `Card` implementation instead of Base UI-derived
  behavior.
- Documented `size`, `CardTitle as`, slots, CSS variables, accessibility boundaries, and composition
  constraints.
- Added Base UI-style `render` support on `Card` and `CardLink` for accessible card-as-link patterns.
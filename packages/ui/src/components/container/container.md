# Container

Upstream primitive docs: none. `Container` is a local layout primitive, not a Base UI wrapper.

## Purpose

`Container` centers a content column, applies responsive inline gutters, and keeps page or section
content from running edge to edge.

Use it for page shells, article bodies, docs sections, settings screens, and any layout where the
main concern is readable inline width. It intentionally does **not** manage vertical spacing,
surface styles, or interactive behavior.

## Current behavior contract

- Renders exactly one root element and forwards regular DOM props to that root.
- Applies `data-slot="container-root"`, `data-size`, and `data-gutter` on the root.
- Defaults to `size="lg"` and `gutter="md"`.
- Centers itself with `margin-inline: auto`, always keeps `width: 100%`, and applies inline padding
  from the selected gutter.
- Uses `max-width: calc(var(--container-max-width) + (var(--container-gutter) * 2))`, so the
  constrained width includes the root's left and right padding.
- `size="full"` removes only the max-width cap. The root still keeps `width: 100%` and the selected
  gutter.
- Does not add inner wrappers, headings, landmarks, spacing stacks, ARIA relationships, focus
  management, or keyboard behavior.

## Composition

```text
Container
└─ children
```

| Part        | Role                                                                       |
| ----------- | -------------------------------------------------------------------------- |
| `Container` | Root layout wrapper. Owns max width, centering, inline gutters, and hooks. |

`Container` is root-only and composition-first. Put headings, text, forms, media, or full section
content inside it.

```tsx
import { Bleed, Container, Heading, Text } from 'moduix';
import styles from './container.module.css';

export function Example() {
  return (
    <Container as="main" className={styles.container}>
      <Heading as="h1" size="xl">
        Pricing
      </Heading>
      <Text tone="muted">
        The main text column stays constrained while gutters adapt to viewport width.
      </Text>

      <Bleed.Root inline="md">
        <div className={styles.bleedSurface}>Charts or media can stretch wider than the text.</div>
      </Bleed.Root>
    </Container>
  );
}
```

## Public props

| Prop     | Default | Values                               |
| -------- | ------- | ------------------------------------ |
| `size`   | `lg`    | `xs`, `sm`, `md`, `lg`, `xl`, `full` |
| `gutter` | `md`    | `none`, `sm`, `md`, `lg`             |
| `as`     | `div`   | Any React element type               |

`className`, `style`, `id`, `aria-*`, event handlers, `children`, and other regular `div` props are
forwarded to the root. `as` is the only composition escape hatch: use semantic HTML such as `main`
or `section` by default, or pass a custom wrapper component when it accepts `className` and regular
DOM attributes.

## Defaults and styling

The root always uses `className={clsx(styles.root, className)}`.

### Data attributes

| Attribute     | Values                               | Purpose                           |
| ------------- | ------------------------------------ | --------------------------------- |
| `data-slot`   | `container-root`                     | Stable styling and test hook.     |
| `data-size`   | `xs`, `sm`, `md`, `lg`, `xl`, `full` | Selects the max-width preset.     |
| `data-gutter` | `none`, `sm`, `md`, `lg`             | Selects the inline gutter preset. |

### CSS variables

These variables are public styling hooks declared in `src/styles/theme.css`.

| Variable                   | Default                       | Used by       |
| -------------------------- | ----------------------------- | ------------- |
| `--container-gutter-sm`    | `clamp(0.75rem, 3vw, 1.5rem)` | `gutter="sm"` |
| `--container-gutter-md`    | `clamp(1rem, 4vw, 2rem)`      | `gutter="md"` |
| `--container-gutter-lg`    | `clamp(1.5rem, 5vw, 3rem)`    | `gutter="lg"` |
| `--container-max-width-xs` | `40rem`                       | `size="xs"`   |
| `--container-max-width-sm` | `48rem`                       | `size="sm"`   |
| `--container-max-width-md` | `64rem`                       | `size="md"`   |
| `--container-max-width-lg` | `72rem`                       | `size="lg"`   |
| `--container-max-width-xl` | `90rem`                       | `size="xl"`   |

There is no dedicated CSS variable for `size="full"` or `gutter="none"`: those states bypass the
max-width cap or zero out the gutter directly. Override variables on the root or a parent scope
when a page shell needs different layout math.

## Intentional differences from Base UI

- There is no upstream Base UI primitive behind `Container` in this repository.
- The local contract is root-only: no slots, parts, `slotProps`, `classNames`, `render`, or `asChild`.
- The only built-in variants are `size` and `gutter`.
- Styling is token and CSS-variable driven, with stable data attributes instead of primitive state
  attributes.

## Accessibility and UX notes

- `Container` has no landmark or document semantics by default. Use `as="main"`, `as="section"`,
  `as="article"`, or ARIA attributes when the wrapper itself should be meaningful to assistive
  technology.
- The component does not manage focus, keyboard navigation, disabled states, or read-only states.
- Keep click handling and interactive semantics on the controls inside the container, not on the
  layout wrapper itself.
- `Container` constrains the root width, but children can still overflow if they opt into fixed or
  oversized widths. Use regular content CSS such as `max-width: 100%` for media, or `Bleed` when a
  child should intentionally escape the text column.
- Add vertical spacing outside the component or on its children. `Container` owns inline layout only.

## Agent notes

- Keep `Container` a thin single-root layout primitive.
- Preserve `data-slot="container-root"`, `data-size`, `data-gutter`, and the `--container-*`
  variable contract.
- Keep `size="full"` as "uncapped width with the current gutter", not as a different layout mode.
- Do not add vertical rhythm props, slot bags, or convenience wrappers around headings/content.
- If stories or docs previews show custom surface styling, the code snippet must include the same
  meaningful class names and CSS needed to understand that preview.

## Local changelog

- Rewritten to document the actual local `Container` contract instead of Base UI-derived behavior.
- Documented the root-only composition model, stable data attributes, public CSS variables, and
  accessibility boundaries.
- Clarified the `size="full"` behavior and aligned `as` with the broader layout-primitive pattern.
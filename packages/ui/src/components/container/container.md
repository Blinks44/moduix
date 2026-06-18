# Container

Upstream docs:

- Ark UI: https://ark-ui.com/docs/guides/composition

## Purpose

`Container` centers a content column, applies responsive inline gutters, and keeps page or section
content from running edge to edge.

Use it for page shells, article bodies, docs sections, settings screens, and any layout where the
main concern is readable inline width. It intentionally does **not** manage vertical spacing,
surface styles, or interactive behavior.

## Upstream model to preserve

Ark UI does not ship a dedicated `Container` primitive. moduix implements this component as an
Ark-aligned factory wrapper with `@ark-ui/react/factory`.

Preserve the Ark composition model: one root part, DOM ownership through `asChild`, and no Base UI
`render` or legacy `as` contract.

## Current behavior contract

- `Container` is the primary root component.
- `Container.Root` is the same component exposed for Ark-style namespace consistency.
- Root accepts Ark factory div props, including `asChild`.
- Applies `data-scope="container"`, `data-part="root"`, `data-slot="container-root"`,
  `data-size`, and `data-gutter` on the root.
- Defaults to `size="lg"` and `gutter="md"`.
- Centers itself with `margin-inline: auto`, always keeps `width: 100%`, and applies inline padding
  from the selected gutter.
- Uses `max-width: calc(var(--container-max-width) + (var(--container-gutter) * 2))`, so the
  constrained width includes the root's left and right padding.
- `size="full"` removes only the max-width cap. The root still keeps `width: 100%` and the selected
  gutter.
- Does not add inner wrappers, headings, landmarks, spacing stacks, ARIA relationships, focus
  management, or keyboard behavior.

## Anatomy and exported parts

```text
Container / Container.Root
└─ children
```

Every exported part accepts `className` and uses the standard hooks below:

| Part                           | Hook                         | Notes                                                  |
| ------------------------------ | ---------------------------- | ------------------------------------------------------ |
| `Container` / `Container.Root` | `data-slot="container-root"` | Root layout wrapper for width, centering, and gutters. |
| `Container` / `Container.Root` | `data-scope="container"`     | Ark-aligned component scope.                           |
| `Container` / `Container.Root` | `data-part="root"`           | Ark-aligned part name.                                 |
| `Container` / `Container.Root` | `data-size`                  | Selects the max-width preset.                          |
| `Container` / `Container.Root` | `data-gutter`                | Selects the inline gutter preset.                      |

## Composition

```tsx
import { Bleed, Container, Heading, Text } from 'moduix';
import styles from './container.module.css';

export function Example() {
  return (
    <Container asChild className={styles.container}>
      <main>
        <Heading as="h1" size="xl">
          Pricing
        </Heading>
        <Text tone="muted">
          The main text column stays constrained while gutters adapt to viewport width.
        </Text>

        <Bleed.Root inline="md">
          <div className={styles.bleedSurface}>
            Charts or media can stretch wider than the text.
          </div>
        </Bleed.Root>
      </main>
    </Container>
  );
}
```

`Container` is root-only and composition-first. Prefer the short `<Container>` form. Use the
equivalent `<Container.Root>` namespace form when consistency with multipart component anatomy is
useful. Put headings, text, forms, media, or full section content inside it. Use `asChild` when a
semantic element such as `main`, `section`, or `article` should own the DOM node.

## Upstream feature coverage

- `Composition`: preserved through Ark factory `asChild` behavior.
- `Dedicated primitive features`: not applicable because Ark has no dedicated `Container`
  component page.
- `Stateful or behavioral patterns`: intentionally unsupported; `Container` remains a single-root
  layout primitive.

## Accessibility and state

- `Container` has no managed state, callbacks, or ARIA behavior.
- Use `asChild` with `main`, `section`, `article`, or ARIA attributes when the wrapper itself should
  be meaningful to assistive technology.
- The root keeps stable hooks for styling and test targeting:
  - `data-scope`
  - `data-part`
  - `data-slot`
  - `data-size`
  - `data-gutter`
- Reading order and focus order follow JSX order.

## Defaults and styling

| Entry       | Default | Values / Notes                       |
| ----------- | ------- | ------------------------------------ |
| `size`      | `lg`    | `xs`, `sm`, `md`, `lg`, `xl`, `full` |
| `gutter`    | `md`    | `none`, `sm`, `md`, `lg`             |
| `asChild`   | `false` | Ark factory composition              |
| `className` | -       | Applied to the root                  |

Public CSS variables:

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

## Intentional sugar and differences from upstream

- There is still no upstream Ark primitive for this component; moduix keeps it as a thin factory
  wrapper rather than inventing a richer primitive surface.
- The old `as` prop was removed in favor of Ark `asChild`.
- moduix adds Ark-style namespace access through `Container.Root`.
- moduix adds Ark-style `data-scope` and `data-part` hooks on the root.
- The only built-in layout variants are `size` and `gutter`.

## Agent notes

- Keep `Container` a thin single-root layout primitive.
- Preserve `data-scope="container"`, `data-part="root"`, `data-slot="container-root"`,
  `data-size`, `data-gutter`, and the `--container-*` variable contract.
- Keep `size="full"` as "uncapped width with the current gutter", not as a different layout mode.
- Do not add vertical rhythm props, slot bags, or convenience wrappers around headings/content.
- If stories or docs previews show custom surface styling, the code snippet must include the same
  meaningful class names and CSS needed to understand that preview.

## Local changelog

- 2026-06-18: Migrated `Container` to an Ark-aligned factory wrapper, added `Container.Root`,
  replaced `as` with `asChild`, added Ark-style root hooks, and aligned docs/examples to the new
  root contract.
- 2026-06-18: Made the short `<Container>` form the recommended consumer path while retaining
  `<Container.Root>` as an equivalent namespace alias.
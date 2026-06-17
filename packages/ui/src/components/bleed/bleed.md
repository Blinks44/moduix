# Bleed

Ark UI does not ship a dedicated `bleed` primitive in `@ark-ui/react`, so moduix implements this
component as an Ark-aligned factory wrapper with `@ark-ui/react/factory`.

## Purpose

`Bleed` lets a child intentionally escape a constrained parent while staying in normal document
flow. Use it for full-width media, section backgrounds, dividers, and panels inside a centered or
padded layout.

The default path is `inline="full"`: the root stretches to the viewport width and is offset with
viewport-based margin math. Use scale values such as `inline="md"` when content only needs to
escape container padding.

```tsx
import { Bleed, Text } from 'moduix';

function Example() {
  return (
    <div className={styles.container}>
      <Text tone="muted">Container content stays constrained.</Text>
      <Bleed.Root className={styles.surface}>
        <Text weight="semibold">This surface reaches the viewport edges.</Text>
      </Bleed.Root>
      <Text tone="muted">Following content returns to the container width.</Text>
    </div>
  );
}
```

```css
.container {
  width: min(28rem, calc(100vw - var(--spacing-8)));
  padding: var(--spacing-4);
}

.surface {
  padding: var(--spacing-4);
  background-color: var(--color-muted);
}
```

## Current behavior contract

- Uses Ark-style root composition: `Bleed.Root`.
- `Bleed` itself is the same root component with `Bleed.Root` attached for namespace consistency.
- Root accepts Ark factory div props, including `asChild`.
- Applies `data-scope="bleed"`, `data-part="root"`, `data-slot="bleed-root"`, `data-inline`, and
  `data-block` on the root.
- Applies negative inline and/or block margins with CSS Modules and `--bleed-*` variables.
- Does not add inner wrappers, state, ARIA, keyboard handling, focus management, or lifecycle
  behavior.
- Preserves normal document flow; it is not positioned and does not portal content.

## Composition

```text
Bleed.Root
└─ children
```

| Part         | Role                                                                    |
| ------------ | ----------------------------------------------------------------------- |
| `Bleed.Root` | Root layout wrapper. Receives Ark factory props, margins, and children. |
| `Bleed`      | Callable alias of `Bleed.Root`.                                         |

`Bleed` is composition-first: put any visual surface, media, text, or semantic content inside it.
Use `asChild` when another element should own the rendered DOM node.

```tsx
<Bleed.Root asChild className={styles.figure}>
  <figure>
    <img src="/hero.png" alt="Map preview" />
    <figcaption>Full-width media inside a constrained article.</figcaption>
  </figure>
</Bleed.Root>
```

## Public props

| Entry       | Default | Values / Notes                               |
| ----------- | ------- | -------------------------------------------- |
| `inline`    | `full`  | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `full` |
| `block`     | `none`  | `none`, `xs`, `sm`, `md`, `lg`, `xl`         |
| `asChild`   | `false` | Ark factory composition                      |
| `className` | -       | Applied to the root                          |

`children`, `style`, event handlers, `id`, `aria-*`, and other Ark `div` props are passed to the
root. The previous `as` prop was removed during the Ark migration; use `asChild` instead.

## Defaults and styling

The root always gets `className={clsx(styles.root, className)}` and `margin: 0`.

### Data attributes

| Attribute     | Values                                       | Purpose                        |
| ------------- | -------------------------------------------- | ------------------------------ |
| `data-scope`  | `bleed`                                      | Ark-aligned component scope.   |
| `data-part`   | `root`                                       | Ark-aligned part name.         |
| `data-slot`   | `bleed-root`                                 | Stable styling/test hook.      |
| `data-inline` | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `full` | Selects inline bleed behavior. |
| `data-block`  | `none`, `xs`, `sm`, `md`, `lg`, `xl`         | Selects block bleed behavior.  |

### CSS variables

These variables are public styling hooks declared in `src/styles/theme.css`.

| Variable                   | Default            | Used by                |
| -------------------------- | ------------------ | ---------------------- |
| `--bleed-block-xs`         | `var(--spacing-1)` | `block="xs"`           |
| `--bleed-block-sm`         | `var(--spacing-2)` | `block="sm"`           |
| `--bleed-block-md`         | `var(--spacing-3)` | `block="md"`           |
| `--bleed-block-lg`         | `var(--spacing-4)` | `block="lg"`           |
| `--bleed-block-xl`         | `var(--spacing-6)` | `block="xl"`           |
| `--bleed-inline-full`      | `calc(50% - 50vw)` | `inline="full"` margin |
| `--bleed-inline-full-size` | `100vw`            | `inline="full"` width  |
| `--bleed-inline-xs`        | `var(--spacing-1)` | `inline="xs"`          |
| `--bleed-inline-sm`        | `var(--spacing-2)` | `inline="sm"`          |
| `--bleed-inline-md`        | `var(--spacing-3)` | `inline="md"`          |
| `--bleed-inline-lg`        | `var(--spacing-4)` | `inline="lg"`          |
| `--bleed-inline-xl`        | `var(--spacing-6)` | `inline="xl"`          |

Override variables on the root with `className` when a page shell, drawer, or nested scroll region
needs different full-bleed math.

```css
.shellBleed {
  --bleed-inline-full: calc(var(--spacing-8) * -1);
  --bleed-inline-full-size: calc(100vw - (var(--spacing-8) * 2));
}
```

## Intentional differences from the previous local contract

- There is still no upstream Ark primitive for this component; moduix keeps it as a thin factory
  wrapper rather than inventing a richer primitive surface.
- The old `as` prop was removed in favor of Ark `asChild`.
- Added Ark-style namespace access through `Bleed.Root`.
- Added Ark-style `data-scope` and `data-part` hooks on the root.

## Accessibility and UX notes

- `Bleed` has no intrinsic accessibility role. Use `asChild` with a semantic child (`section`,
  `figure`, `aside`, etc.) or add ARIA attributes when the content needs semantics.
- Because the root keeps normal document flow, reading order and focus order follow the JSX order.
- Do not use `Bleed` to create interactive behavior. Put interactive controls inside it and let
  those controls own their accessibility states.
- `inline="full"` is viewport-based. It can cause horizontal overflow in custom shells if local
  layout math is not overridden.
- Ancestors with `overflow: hidden` or `overflow: clip` can visually crop the bleed.

## Agent notes

- Keep `Bleed` a thin single-root layout primitive.
- Add sugar only if it removes frequent production boilerplate without hiding the simple
  margin-based model. The current `inline`, `block`, and Ark root props are the intended public
  surface.
- Keep stories, docs examples, and local docs aligned with the same API and CSS variable contract.
- If CSS variables change, update `theme.css`, docs CSS Properties, stories/examples, and this file
  in the same task.

## Local changelog

- 2026-06-17: Migrated `Bleed` to an Ark-aligned factory wrapper, added `Bleed.Root`, replaced
  `as` with `asChild`, and aligned docs/examples to the new root contract.
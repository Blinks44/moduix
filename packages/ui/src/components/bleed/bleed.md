# Bleed

Upstream primitive docs: none. `Bleed` is a local layout primitive, not a Base UI wrapper.

## Purpose

`Bleed` lets a child intentionally escape a constrained parent while staying in normal document
flow. Use it for full-width media, section backgrounds, dividers, and panels inside a centered or
padded layout.

The default path is `inline="full"`: the root stretches to the viewport width and is offset with
viewport-based margin math. Use scale values such as `inline="md"` when content only needs to escape
container padding.

```tsx
import { Bleed, Text } from 'moduix';

function Example() {
  return (
    <div className={styles.container}>
      <Text tone="muted">Container content stays constrained.</Text>
      <Bleed className={styles.surface}>
        <Text weight="semibold">This surface reaches the viewport edges.</Text>
      </Bleed>
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

- Renders exactly one root element and forwards regular DOM props to that root.
- Applies `data-slot="bleed-root"`, `data-inline`, and `data-block` on the root.
- Applies negative inline and/or block margins with CSS Modules and `--bleed-*` variables.
- Does not add inner wrappers, state, ARIA, keyboard handling, focus management, or Base UI
  lifecycle behavior.
- Preserves normal document flow; it is not positioned and does not portal content.

## Composition

```text
Bleed
└─ children
```

| Part    | Role                                                                               |
| ------- | ---------------------------------------------------------------------------------- |
| `Bleed` | Root layout wrapper. Receives `className`, data attributes, margins, and children. |

`Bleed` is composition-first: put any visual surface, media, text, or semantic content inside it.
Use `as` when the wrapper itself should be semantic.

```tsx
<Bleed as="figure" className={styles.figure}>
  <img src="/hero.png" alt="Map preview" />
  <figcaption>Full-width media inside a constrained article.</figcaption>
</Bleed>
```

## Public props

| Prop     | Default | Values                                       |
| -------- | ------- | -------------------------------------------- |
| `inline` | `full`  | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `full` |
| `block`  | `none`  | `none`, `xs`, `sm`, `md`, `lg`, `xl`         |
| `as`     | `div`   | Any React element type                       |

`className`, `children`, `style`, event handlers, `id`, `aria-*`, and other `div` props are passed
to the root. The component intentionally does not export prop aliases; keep the public type surface
small unless a future change needs reusable named types.

## Defaults and styling

The root always gets `className={clsx(styles.root, className)}` and `margin: 0`.

### Data attributes

| Attribute     | Values                                       | Purpose                        |
| ------------- | -------------------------------------------- | ------------------------------ |
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

## Intentional differences from Base UI

- There is no upstream Base UI primitive for this component in our implementation.
- There are no slots beyond the root and no `slotProps`, `classNames`, or compound parts.
- There is no controlled/uncontrolled state, no disabled/readOnly behavior, and no keyboard model.
- Styling is token/CSS-variable driven rather than primitive-state driven.

## Accessibility and UX notes

- `Bleed` has no intrinsic accessibility role. Choose a semantic `as` value (`section`, `figure`,
  `aside`, etc.) or ARIA attributes when the content needs semantics.
- Because the root keeps normal document flow, reading order and focus order follow the JSX order.
- Do not use `Bleed` to create interactive behavior. Put interactive controls inside it and let those
  controls own their accessibility states.
- `inline="full"` is viewport-based. It can cause horizontal overflow in custom shells if local
  layout math is not overridden.
- Ancestors with `overflow: hidden` or `overflow: clip` can visually crop the bleed.

## Agent notes

- Keep `Bleed` a single-root layout primitive. Do not add wrappers or state layers for visual demos.
- Add sugar only if it removes frequent production boilerplate without hiding the simple
  margin-based model. The current `inline`, `block`, and `as` props are the intended public surface.
- Keep stories, docs examples, and local docs aligned with the same API and CSS variable contract.
- If CSS variables change, update `theme.css`, docs CSS Properties, stories/examples, and this file
  in the same task.

## Local changelog

- Synced the local `Bleed` docs with the current docs-page structure and confirmed the public
  `--bleed-*` variables against `src/styles/theme.css`.
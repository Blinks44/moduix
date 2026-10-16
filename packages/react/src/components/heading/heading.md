# Heading

Upstream docs:

- Ark UI: no dedicated Heading primitive; use https://ark-ui.com/docs/guides/composition,
  https://ark-ui.com/docs/guides/styling, and https://ark-ui.com/docs/guides/ref

## Purpose

`Heading` renders a semantic `h1` through `h6` heading with moduix typography sizes and weights.

## Upstream model to preserve

Ark UI does not ship a heading primitive. moduix implements `Heading` as a thin
`@ark-ui/react/factory` wrapper: one root part, `as` for the semantic level, Ark factory `asChild`
for custom host composition, and ref forwarding to the rendered heading.

## Current behavior contract

- `Heading` is the only public component value.
- Exports the `HeadingRootProps`, `HeadingElement`, `HeadingSize`, and `HeadingWeight` types.
- The root renders `h1` by default and accepts `as="h1"` through `as="h6"`.
- `size` controls visual scale independently from the semantic level. Without `size`, `as` selects
  it: `h1` → `2xl`, `h2` → `xl`, `h3` → `lg`, `h4` → `md`, `h5` → `sm`, `h6` → `xs`.
- With `asChild`, the default size still follows `as`, not the child element; pass `size` (or `as`)
  to match the child.
- `weight` defaults to `semibold`.
- The root always emits `data-scope="heading"`, `data-part="root"`, `data-slot="heading-root"`, and
  the resolved `data-size` and `data-weight`. They are set after the consumer props, so colliding
  `data-*` props cannot replace them.
- The component has no managed state, callbacks, keyboard behavior, or ARIA abstraction.

## Composition

```tsx
import { Heading } from '@moduix/react/heading';

export function Example() {
  return (
    <Heading as="h2" size="2xl">
      Page title rendered as h2
    </Heading>
  );
}
```

Use `asChild` only when a custom semantic heading host must own the DOM node:

```tsx
<Heading asChild size="xl">
  <h2>Factory-composed heading</h2>
</Heading>
```

## Accessibility

- The rendered `h1` through `h6` element provides native heading semantics without additional ARIA.
- Choose `as` from the document outline and `size` for visual hierarchy.
- `asChild` must receive exactly one semantic heading child.

## Defaults and styling

| Entry       | Default    | Values / Notes                          |
| ----------- | ---------- | --------------------------------------- |
| `as`        | `h1`       | `h1` through `h6`                       |
| `size`      | from `as`  | `xs`, `sm`, `md`, `lg`, `xl`, `2xl`     |
| `weight`    | `semibold` | `regular`, `medium`, `semibold`, `bold` |
| `asChild`   | `false`    | Ark factory composition                 |
| `className` | -          | Applied to the rendered heading root    |

CSS Modules use foundation typography tokens directly (`--moduix-text-*`,
`--moduix-line-height-text-*`, `--moduix-weight-*`, `--moduix-color-foreground`) and have no
component variables; a consumer class overrides the layered styles. The root sets `margin: 0`,
`letter-spacing: 0`, `text-wrap: balance`, and `overflow-wrap: anywhere`. Tailwind adapters apply the
same values through utilities.

## Agent notes

- Keep this component root-only and stateless.
- Resolve the size in the component, not from the element in CSS, so CSS Modules and Tailwind agree,
  including under `asChild`.
- Do not reintroduce a `--moduix-heading-*` variable family; a class on the root is the override path.
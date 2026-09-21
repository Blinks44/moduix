# Heading (Solid)

## Upstream reference

Ark UI has no dedicated heading primitive. This component uses the Ark Solid factory:

- https://ark-ui.com/docs/guides/composition
- https://ark-ui.com/docs/guides/styling
- https://ark-ui.com/docs/guides/ref

## Purpose

`Heading` provides semantic `h1` through `h6` headings with moduix typography sizes, weights, and
styling tokens.

## Public contract

- `Heading` is the only public component value.
- The root renders `h1` by default and accepts `as="h1"` through `as="h6"` for semantic changes.
- `size` controls visual scale independently from the semantic level.
- `weight` defaults to `semibold`.
- Without an explicit `size`, native `h1` through `h6` elements map to `2xl` through `xs`.
- The root emits `data-scope="heading"`, `data-part="root"`, and `data-slot="heading-root"`.
- Explicit `size` emits `data-size`; the resolved `weight` always emits `data-weight`.
- Consumer data hooks that collide with component-owned hooks are overridden by the component.

```tsx
import { Heading } from '@moduix/solid/heading';

export function Example() {
  return (
    <Heading as="h2" size="2xl">
      Page title rendered as h2
    </Heading>
  );
}
```

## Composition and refs

Use `asChild` with one semantic heading host and a Solid render function:

```tsx
<Heading asChild={(props) => <h2 {...props()}>Factory-composed heading</h2>} size="xl" />
```

Ordinary rendered headings forward Solid refs to the native element. Ark Solid does not forward a
ref through an `asChild` render function, so those two paths remain separate.

## Styling and accessibility

Native heading semantics come from the rendered `h1` through `h6` element; no additional ARIA is
added. Use `as` for document structure and `size` for visual hierarchy.

The root supports these public CSS variables:

- `--moduix-heading-color`
- `--moduix-heading-font-family`
- `--moduix-heading-font-size`
- `--moduix-heading-font-size-{size}`
- `--moduix-heading-font-weight`
- `--moduix-heading-font-weight-{weight}`
- `--moduix-heading-letter-spacing`
- `--moduix-heading-line-height`
- `--moduix-heading-line-height-{size}`
- `--moduix-heading-text-wrap`

The CSS module is intentionally identical to the React component so the same tokens, semantic
level mapping, and `overflow-wrap: anywhere` behavior apply.

## Differences from upstream

- moduix adds `size`, `weight`, `as`, and stable data hooks.
- Solid uses `class` and `asChild={(props) => ...}` rather than React `className` and child syntax.
- The removed `HeadingLevel` type and public React helper type aliases are not preserved.

# Heading (Solid)

Shared contract: [`packages/react/src/components/heading/heading.md`](../../../../react/src/components/heading/heading.md).
This file lists only Solid differences.

## Upstream reference

Ark UI has no dedicated heading primitive. This component uses the Ark Solid factory:

- https://ark-ui.com/docs/guides/composition
- https://ark-ui.com/docs/guides/styling
- https://ark-ui.com/docs/guides/ref

## Solid specifics

- The root renders `ark[as]` through `Dynamic`; `as`, `size`, `weight`, and `class` are split from
  the forwarded props.
- Use `class` instead of `className`.
- `asChild` takes a render function:

```tsx
<Heading asChild={(props) => <h2 {...props()}>Factory-composed heading</h2>} size="xl" />
```

- Ordinary rendered headings forward Solid refs to the native element. Ark Solid does not forward a
  ref through an `asChild` render function.
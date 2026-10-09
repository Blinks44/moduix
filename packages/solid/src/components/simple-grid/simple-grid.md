# Simple Grid (Solid)

`SimpleGrid` preserves the React component's equal-column grid contract: `columns` produces
`repeat(<count>, minmax(0, 1fr))`, `minChildWidth` produces
`repeat(auto-fit, minmax(min(100%, <width>), 1fr))` and takes priority over `columns`, `gap`,
`rowGap`, and `columnGap` accept CSS lengths with numeric values as pixels, invalid numeric
`columns`/`minChildWidth` values throw the same messages, and `SimpleGrid` is the only root
component export. See `packages/react/src/components/simple-grid/simple-grid.md` for the shared behavior
contract, styling hooks, and upstream references.

Solid-specific mechanics:

- Ark Solid uses a render-function `asChild` prop, for example
  `asChild={(props) => <ul {...props()} aria-label="Projects" />}`. The factory does not forward
  `ref` through `asChild`; ordinary root refs use the function form `ref={(element) => ...}`.
- `class` and `style` accept native Solid forms. A string `style` is appended after the generated
  layout declarations; an object `style` is spread last as the per-instance override.
- As in the React package, the root always writes inline `display: grid` and the one-column
  `grid-template-columns` fallback, and inline styles beat consumer classes, so per-instance
  template overrides go through `style` rather than `class`.
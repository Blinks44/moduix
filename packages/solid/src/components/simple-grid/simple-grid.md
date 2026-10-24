# Simple Grid (Solid)

`SimpleGrid` follows the shared contract in `packages/react/src/components/simple-grid/simple-grid.md`:
stylesheet defaults for `display` and the one-column template, inline styles only for the layout
props you pass, and `SimpleGridRootProps` as the exported props type.

Solid-specific mechanics:

- Ark Solid uses a render-function `asChild` prop, for example
  `asChild={(props) => <ul {...props()} aria-label="Projects" />}`. The factory does not forward
  `ref` through `asChild`; ordinary root refs use the function form `ref={(element) => ...}`.
- `class` and `style` accept native Solid forms. A string `style` is appended after the generated
  layout declarations; an object `style` is spread last.
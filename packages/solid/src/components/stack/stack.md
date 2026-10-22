# Stack (Solid)

`Stack` follows the shared contract in `packages/react/src/components/stack/stack.md`: stylesheet
defaults for `display` and direction, mobile-first responsive `direction`, a `fill` class, inline
styles only for the layout props you pass, and `StackRootProps` as the exported props type.

Solid-specific mechanics:

- Ark Solid uses a render-function `asChild` prop, for example
  `asChild={(props) => <section {...props()} aria-label="Project updates" />}`. The factory does not
  forward `ref` through `asChild`; ordinary root refs use the function form `ref={(element) => ...}`.
- `class` and `style` accept native Solid forms. A string `style` is appended after the generated
  layout declarations; an object `style` is spread last.
# Skeleton (Solid)

`Skeleton` reserves space for content that has not loaded yet and preserves the React component's
loading state, sizing props, and styling hooks.

## Ark Solid composition

Ark Solid uses a render-function `asChild` prop, for example
`asChild={(props) => <section {...props()} aria-label="Loading summary" />}`. Its factory does not
forward `ref` through `asChild`, so ordinary refs and custom-host composition are supported as
separate native paths. The Solid tests cover both paths independently.

Numeric `width`, `height`, `boxSize`, and `borderRadius` values are converted to CSS pixels.
`style` is merged last, so explicit inline dimensions override generated values.

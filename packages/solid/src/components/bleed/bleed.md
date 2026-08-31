# Bleed (Solid)

`Bleed` lets a child escape a constrained parent with negative inline and/or block margins while
staying in normal document flow. It preserves the React component's defaults, token-based CSS
variables, stable data hooks, and `Bleed.Root` namespace.

## Ark Solid composition

Ark Solid uses a render-function `asChild` prop, for example
`asChild={(props) => <figure {...props({ class: 'figure' })}>...</figure>}`. The Ark Solid factory
does not forward `ref` through `asChild`, so ordinary refs and custom-host composition are
supported as separate native paths. The Solid tests cover them independently.
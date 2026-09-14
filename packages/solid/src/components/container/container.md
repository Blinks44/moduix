# Container (Solid)

`Container` centers a content column, applies responsive inline gutters, and preserves the React
component's size presets, data hooks, CSS variables, and `Container.Root` namespace.

## Ark Solid composition

Ark Solid uses a render-function `asChild` prop, for example
`asChild={(props) => <main {...props()} />}`. Its factory does not forward `ref` through `asChild`,
so ordinary refs and custom-host composition are supported as separate native paths. The Solid
tests cover both paths independently.
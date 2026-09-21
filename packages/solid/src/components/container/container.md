# Container (Solid)

`Container` is the only public root value. It centers a content column, applies responsive inline
gutters, and preserves the React component's size presets, data hooks, and CSS variables.

## Ark Solid composition

Ark Solid uses a render-function `asChild` prop, for example
`asChild={(props) => <main {...props()} />}`. Its factory does not forward `ref` through `asChild`,
so ordinary refs and custom-host composition are supported as separate native paths. The Solid
tests cover both paths independently.
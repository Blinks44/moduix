# AspectRatio (Solid)

`AspectRatio` preserves the React component's numeric ratio validation, layout-only root, stable
data hooks, and consumer-owned content styling.

## Ark Solid composition

Ark Solid uses a render-function `asChild` prop, for example
`asChild={(props) => <figure {...props({ class: 'figure' })}>...</figure>}`. Its factory does not
forward `ref` through `asChild`, so ordinary refs and custom-host composition are supported as
separate native paths. The Solid tests cover both paths independently.
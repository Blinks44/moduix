# AspectRatio (Solid)

`AspectRatio` constrains media and embedded content inside a responsive box with a fixed numeric
width-to-height ratio. It preserves the React root API, stable data hooks, default media sizing,
iframe border reset, radius variable, and numeric ratio validation.

## Ark Solid composition

Ark Solid uses a render-function `asChild` prop, for example
`asChild={(props) => <figure {...props({ class: 'figure' })}>...</figure>}`. Its factory does not
forward `ref` through `asChild`, so ordinary refs and custom-host composition are supported as
separate native paths. The Solid tests cover them independently.
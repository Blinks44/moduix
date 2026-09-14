# Badge (Solid)

`Badge` preserves the React component's presentational root, explicit `Badge.Label` and
`Badge.Dot` parts, variants, stable data hooks, and consumer-owned interactive presentation.

## Ark Solid composition

Ark Solid uses a render-function `asChild` prop, for example
`asChild={(props) => <a {...props()} href="#badge">Badge</a>}`. Its factory does not forward
`ref` through `asChild`, so ordinary refs and custom-host composition are supported as separate
native paths. The Solid tests cover both paths independently.
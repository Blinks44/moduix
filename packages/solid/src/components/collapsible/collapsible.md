# Collapsible (Solid)

`Collapsible` preserves the React component's compound anatomy, default indicator, `Body` layout
wrapper, Ark state, context hooks, partial-collapse measurements, and CSS-variable contract.

## Ark Solid composition

Ark Solid uses a render-function `asChild` prop, for example
`asChild={(props) => <button {...props()} />}`. Its primitive does not forward `ref` through
`asChild`, so ordinary refs and custom-host composition are supported as separate native paths.
The Solid tests cover both paths independently.
# Card (Solid)

`Card` preserves the React component's flat part anatomy, variants, sizes, data hooks, CSS
variables, and native Ark factory composition.

`CardBody` owns its inset spacing; direct child margins remain consumer-owned.

## Ark Solid composition

Ark Solid uses a render-function `asChild` prop, for example
`asChild={(props) => <a {...props()} href="#docs">Docs</a>}`. Its factory does not forward
`ref` through `asChild`, so refs and custom-host composition are supported as separate native
paths. The Solid tests cover them independently.
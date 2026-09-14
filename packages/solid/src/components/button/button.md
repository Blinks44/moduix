# Button (Solid)

`Button` preserves the React component's root API, visual variants, sizes, loading state, data
hooks, native button defaults, and disabled behavior.

## Ark Solid composition

Ark Solid uses a render-function `asChild` prop, for example
`asChild={(props) => <a {...props()} href="#docs">Docs</a>}`. Its factory does not forward
`ref` through `asChild`, so refs and custom-host composition are supported as separate native
paths. The Solid tests cover them independently.
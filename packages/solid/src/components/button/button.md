# Button (Solid)

`Button` preserves the React component's root API, visual variants, sizes, loading state, data
hooks, native button defaults, and disabled behavior.

Standalone Button roots use a subtle 1px press movement with a 150ms ease-in-out transition.
Link variants, popup triggers
(`aria-haspopup`), composed parts with another `data-slot`, and reduced-motion preferences omit
the movement. This keeps InputGroupButton, SplitButton, and trigger compositions stationary.

## Ark Solid composition

Ark Solid uses a render-function `asChild` prop, for example
`asChild={(props) => <a {...props()} href="#docs">Docs</a>}`. Its factory does not forward
`ref` through `asChild`, so refs and custom-host composition are supported as separate native
paths. The Solid tests cover them independently.
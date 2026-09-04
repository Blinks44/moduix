# Stack (Solid)

`Stack` preserves the React component's single-root flex layout contract, styling hooks, responsive
directions, and `asChild` composition.

Ark Solid uses a render-function `asChild` prop, for example
`asChild={(props) => <section {...props()} aria-label="Project updates" />}`. Its factory does not
forward `ref` through `asChild`, so ordinary root refs and custom-host composition remain separate
native paths.
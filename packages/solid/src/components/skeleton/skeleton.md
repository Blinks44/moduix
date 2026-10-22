# Skeleton (Solid)

Follows the React contract in `packages/react/src/components/skeleton/skeleton.md`.

Ark Solid uses a render-function `asChild` prop, for example
`asChild={(props) => <section {...props()} aria-label="Loading summary" />}`. Its factory does not
forward `ref` through `asChild`, so the Solid tests cover ordinary refs and custom-host composition
separately.

A string `style` keeps its native form and is appended after the generated sizes, so it overrides
them the same way an object `style` does.
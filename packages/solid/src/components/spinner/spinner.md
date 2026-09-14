# Spinner (Solid)

`Spinner` is a supporting dependency for the Solid Button playground's pending-state scenario. It
preserves the React root anatomy, status semantics, sizes, data hooks, and CSS variables.

## Ark Solid composition

Ark Solid uses render-function `asChild` composition and does not forward `ref` through that
path. Ordinary refs and custom-host composition are therefore covered independently.
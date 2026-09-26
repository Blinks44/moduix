# Alert (Solid)

`Alert` preserves the React component's flat part anatomy, statuses, data hooks, and CSS variables.
`AlertContent` is required and owns the title, description, actions, and custom message content.
Public parts are `Alert`, `AlertIndicator`, `AlertContent`, `AlertTitle`, `AlertDescription`, and
`AlertActions`.

## Ark Solid composition

`ref` and `asChild` are supported as separate native Ark Solid paths. Ark Solid's factory does not
forward `ref` through `asChild`, so their combination is intentionally unsupported. The Solid tests
cover ordinary ref forwarding and `asChild` composition independently.

## Local changelog

- 2026-09-21: Replaced the compound `Alert.*` value surface with the shared flat API. `Alert` is now
  the only root value; every other part uses an `Alert`-prefixed named export.
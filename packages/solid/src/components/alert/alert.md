# Alert (Solid)

`Alert` preserves the React component's compound anatomy, statuses, data hooks, and CSS variables.
`Alert.Content` is required and owns the title, description, actions, and custom message content.

## Ark Solid composition

`ref` and `asChild` are supported as separate native Ark Solid paths. Ark Solid's factory does not
forward `ref` through `asChild`, so their combination is intentionally unsupported. The Solid tests
cover ordinary ref forwarding and `asChild` composition independently.
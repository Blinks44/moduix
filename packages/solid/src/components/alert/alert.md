# Alert (Solid)

The React adapter's `alert.md` holds the full shared contract: flat part anatomy, statuses, data
hooks, CSS variables, and the rule that `Alert` never sets a `role`. This file records the Solid
specifics. The Solid Tailwind adapter shares this behavior contract.

Public parts are `Alert`, `AlertIndicator`, `AlertContent`, `AlertTitle`, `AlertDescription`, and
`AlertActions`. `AlertContent` is required and owns the title, description, actions, and custom
message content.

## Ark Solid composition

`ref` and `asChild` are supported as separate native Ark Solid paths. Ark Solid's factory does not
forward `ref` through `asChild`, so their combination is intentionally unsupported. The Solid tests
cover ordinary ref forwarding and `asChild` composition independently.
# Spinner (Solid)

Follows the React contract in `packages/react/src/components/spinner/spinner.md`.

Ark Solid uses a render-function `asChild` prop. `props()` includes the built-in indicator as
`children`, so `asChild={(props) => <span {...props()} />}` keeps the default ring; pass your own
children to replace it. The factory does not forward `ref` through `asChild`, so the Solid tests
cover ordinary refs and custom-host composition separately.
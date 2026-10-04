# CloseButton (Solid)

`CloseButton` preserves the React component's native button defaults, fallback close icon,
accessible-name fallback, stable data hooks, and disabled behavior as the only public root.

`onClick` supports Solid callbacks and bound `[handler, data]` pairs. Neither is invoked
while the button is disabled, including disabled custom hosts.

## Ark Solid composition

Ark Solid uses a render-function `asChild` prop:
`asChild={(props) => <button {...props()} type="button" />}`. Its factory does not forward `ref`
through `asChild`, so ordinary refs and custom-host composition are supported as separate native
paths. The component tests cover both paths independently.
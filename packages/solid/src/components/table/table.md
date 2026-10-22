# Table (Solid)

Follows the React contract in `packages/react/src/components/table/table.md`: the same parts,
props, data hooks, CSS variables, and `TableEmpty` sugar.

## Ark Solid composition

Ark Solid uses a render-function `asChild`, for example
`asChild={(props) => <table {...props()} aria-label="Invoices" />}`. Its factory does not forward
`ref` through `asChild`, so ordinary refs and custom hosts are tested separately.

Boolean root props and `numeric` drop the matching consumer `data-*` attribute, because Solid keeps
a consumer value when the component passes `undefined` for an unset state.
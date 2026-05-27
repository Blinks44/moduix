# Card

`Card` is a standalone presentational container with a small compositional API.

Default path:

- `Card`
- `CardHeader`
- `CardTitle`
- `CardDescription`
- `CardContent`
- `CardFooter`

`CardAction` is an optional header-side slot for badges, status, or compact actions.

The root keeps a minimal surface: native `div` props, `className`, and optional `size="sm"` for
denser layouts. `CardTitle` defaults to `h3` and supports `as` when the surrounding heading level
needs to change.

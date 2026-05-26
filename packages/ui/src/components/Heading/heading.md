# Heading

`Heading` is a thin styled wrapper around native heading elements.

Base UI does not provide a standalone heading primitive, so `Heading` keeps the API
small and styles the rendered `h1`-`h6` directly. Use `as` for semantics, `size` for
visual scale when it should differ from semantics, and `weight` for emphasis.

## Defaults

| Prop     | Default    | Values                                  |
| -------- | ---------- | --------------------------------------- |
| `as`     | `h1`       | `h1`, `h2`, `h3`, `h4`, `h5`, `h6`      |
| `size`   | by `as`    | `xs`, `sm`, `md`, `lg`, `xl`, `2xl`     |
| `weight` | `semibold` | `regular`, `medium`, `semibold`, `bold` |

Default `size` mapping by `as`: `h1 -> 2xl`, `h2 -> xl`, `h3 -> lg`, `h4 -> md`,
`h5 -> sm`, `h6 -> xs`.
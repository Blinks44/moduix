# Heading

`Heading` is a moduix typography primitive. It does not wrap a Base UI primitive.

Use it to render semantic heading levels (`h1`-`h6`) with independent visual styling.
The component keeps semantics and presentation separate: `as` controls the rendered
element, while `size`, `weight`, and `align` control appearance.

## Defaults

| Prop     | Default     | Values                                  |
| -------- | ----------- | --------------------------------------- |
| `as`     | `h1`        | `h1`, `h2`, `h3`, `h4`, `h5`, `h6`      |
| `size`   | by `as`     | `xs`, `sm`, `md`, `lg`, `xl`, `2xl`     |
| `weight` | `semibold`  | `regular`, `medium`, `semibold`, `bold` |
| `align`  | `start` CSS | `left`, `center`, `right`               |

Default `size` mapping by `as`: `h1 -> 2xl`, `h2 -> xl`, `h3 -> lg`, `h4 -> md`,
`h5 -> sm`, `h6 -> xs`.
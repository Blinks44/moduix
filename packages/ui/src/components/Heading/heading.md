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

## Anatomy

`Heading` renders a single styled heading element.

- root: semantic `h1`-`h6` element with `data-slot="heading-root"`

## Composition

Keep semantics and presentation separate:

- use `as` for document outline
- use `size` when visual scale should differ from the semantic level
- use `weight` for the built-in emphasis presets
- use `className` or CSS variables for one-off styling overrides

There are no internal slots or helper wrappers. `Heading` is already the full structure.

# Container

`Container` is a simple layout primitive for a centered content column with responsive inline gutters.

Use `size` to pick the content width and `gutter` to control the edge padding.
`size="full"` keeps the gutter padding but drops the max-width constraint.
Use `className` for custom alignment or local variable overrides.

## Defaults

| Prop     | Default | Values                               |
| -------- | ------- | ------------------------------------ |
| `size`   | `lg`    | `xs`, `sm`, `md`, `lg`, `xl`, `full` |
| `gutter` | `md`    | `none`, `sm`, `md`, `lg`             |
| `as`     | `div`   | Any React element type               |
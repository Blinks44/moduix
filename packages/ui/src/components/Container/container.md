# Container

`Container` is a moduix layout primitive. It does not wrap a Base UI primitive.

Use it to create a centered responsive content column with consistent inline gutters.
The component keeps the declared `size` as the content width on large viewports and adds
gutters outside that width, so padding does not shrink the intended content column.

## Defaults

| Prop     | Default  | Values                               |
| -------- | -------- | ------------------------------------ |
| `size`   | `lg`     | `xs`, `sm`, `md`, `lg`, `xl`, `full` |
| `gutter` | `md`     | `none`, `sm`, `md`, `lg`             |
| `align`  | `center` | `start`, `center`, `end`             |
| `as`     | `div`    | Any valid React element or component |
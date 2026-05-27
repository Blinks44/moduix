# Skeleton

`Skeleton` is a moduix loading placeholder block. It does not wrap a Base UI primitive.

Use it as a thin styled `div` for text lines, cards, avatars, and custom loading layouts. Pair it
with `Stack` for quick flex composition. For the common case, use `width`, `height`, `radius`,
`size`, and `shape`. For anything custom, keep using `style` or `className`.

`Skeleton` accepts standard `div` props plus `animated`. The root is `aria-hidden`, since it
represents a loading surface rather than readable content.

## Defaults

| Prop       | Default | Values                                     |
| ---------- | ------- | ------------------------------------------ |
| `height`   | `1rem`  | CSS length (`number` is converted to `px`) |
| `width`    | -       | CSS length (`number` is converted to `px`) |
| `radius`   | -       | CSS length (`number` is converted to `px`) |
| `size`     | -       | Sets `width` and `height` together         |
| `shape`    | `rect`  | `rect`, `circle`                           |
| `animated` | `true`  | `true`, `false`                            |

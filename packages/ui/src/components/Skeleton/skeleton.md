# Skeleton

`Skeleton` is a moduix loading placeholder block. It does not wrap a Base UI primitive.

Use it as a thin styled `div` for text lines, cards, avatars, and custom loading layouts. Pair it
with `Stack` for the common flex path. Use `width`, `height`, `radius`, `size`, and `shape` for
quick setup, then use `className` or `style` for local overrides.

`Skeleton` accepts standard `div` props plus `animated`. The root is `aria-hidden`, since it
represents a loading surface rather than readable content.

## Anatomy

```text
Stack
├─ Skeleton
├─ Skeleton
└─ Skeleton
```

`Skeleton` is a single visual block. Layout stays in the surrounding markup.

## Composition

- Use line skeletons for text and list placeholders.
- Use `size` with `shape="circle"` for avatar-style placeholders.
- Use `animated={false}` when motion is unnecessary or too visually dense.
- Style the surface with `className` and the public `--skeleton-*` CSS variables.

## Defaults

| Prop       | Default | Values                                     |
| ---------- | ------- | ------------------------------------------ |
| `height`   | `1rem`  | CSS length (`number` is converted to `px`) |
| `width`    | -       | CSS length (`number` is converted to `px`) |
| `radius`   | -       | CSS length (`number` is converted to `px`) |
| `size`     | -       | Sets `width` and `height` together         |
| `shape`    | `rect`  | `rect`, `circle`                           |
| `animated` | `true`  | `true`, `false`                            |

## CSS Variables

- `--skeleton-animation`
- `--skeleton-bg`
- `--skeleton-radius`
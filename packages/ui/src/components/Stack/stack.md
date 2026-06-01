# Stack

`Stack` is a small flex layout primitive for vertical and horizontal composition.

Use it when you want a predictable flex wrapper without repeating `display: flex`,
`flex-direction`, `gap`, or common alignment styles. Use `fill` when a stack should take the
remaining flex space, and use responsive `direction` when the layout only needs a mobile/desktop
switch without a dedicated CSS file.

`Stack` does not wrap a Base UI primitive. It is a thin styled flex container for common layout
composition.

## Anatomy

```text
Stack
└─ children
```

`Stack` is a single root flex wrapper. It owns direction, gap, and common alignment.

## Composition

- Use `direction`, `gap`, `align`, `justify`, and `wrap` for common flex layout.
- Use `fill` when a stack should take the remaining space as a flex item.
- Use `direction={{ mobile, desktop }}` when only a simple responsive direction switch is needed.
- Use `as` when the layout wrapper should also render a semantic element.

## Defaults

| Prop        | Default      | Values                                                |
| ----------- | ------------ | ----------------------------------------------------- |
| `direction` | `column`     | `column`, `row`, or `{ mobile?: ..., desktop?: ... }` |
| `gap`       | -            | CSS length (`number` becomes `px`)                    |
| `align`     | `stretch`    | Any valid `align-items` value                         |
| `justify`   | `flex-start` | Any valid `justify-content` value                     |
| `wrap`      | `nowrap`     | Any valid `flex-wrap` value                           |
| `fill`      | `false`      | `true`, `false` (`true` = `flex: 1 1 0`)              |
| `as`        | `div`        | Any React element type                                |

Responsive `direction` switches at `640px`. For broader responsive layout rules, keep using
`className` or `style`.
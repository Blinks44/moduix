# List

`List` is a moduix typography primitive for semantic unordered and ordered lists.

Use it to keep marker style, spacing, and typography on the design-system scale while
preserving native `ul`/`ol` semantics. `ListItem` stays optional: you can use native
`li` elements when wrapper composition is unnecessary.

## Defaults

| Prop     | Default   | Values                                                 |
| -------- | --------- | ------------------------------------------------------ |
| `as`     | `ul`      | `ul`, `ol`                                             |
| `marker` | by `as`   | `disc`, `decimal`, `bullet`, `none`                    |
| `gap`    | `sm`      | `xs`, `sm`, `md`, `lg`, `xl`, `2xl`                    |
| `size`   | `md`      | `xs`, `sm`, `md`, `lg`, `xl`                           |
| `tone`   | `default` | `default`, `muted`, `subtle`, `primary`, `destructive` |
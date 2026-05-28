# List

`List` is a semantic typography primitive for unordered and ordered lists.

It keeps native `ul` and `ol` behavior while standardizing marker style, spacing, and
text tokens. Use `ListItem` when you want the exported item slot; plain `li` elements
work the same when extra composition is unnecessary.

When `as="ol"` is used, native ordered-list props such as `start`, `reversed`, and
`type` continue to pass through to the underlying `ol`.

## Defaults

| Prop     | Default   | Values                                                 |
| -------- | --------- | ------------------------------------------------------ |
| `as`     | `ul`      | `ul`, `ol`                                             |
| `marker` | by `as`   | `disc`, `decimal`, `none`                              |
| `gap`    | `sm`      | `xs`, `sm`, `md`, `lg`, `xl`, `2xl`                    |
| `size`   | `md`      | `xs`, `sm`, `md`, `lg`, `xl`                           |
| `tone`   | `default` | `default`, `muted`, `subtle`, `primary`, `destructive` |

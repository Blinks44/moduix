# List

`List` is a semantic typography primitive for unordered and ordered lists.

It preserves native `ul`/`ol` behavior while standardizing marker style, spacing, and
text tokens. Use `ListItem` when you need the exported item slot; plain `li` elements
work the same when extra composition is unnecessary.

## Defaults

| Prop     | Default   | Values                                                 |
| -------- | --------- | ------------------------------------------------------ |
| `as`     | `ul`      | `ul`, `ol`                                             |
| `marker` | by `as`   | `disc`, `decimal`, `bullet`, `none`                    |
| `gap`    | `sm`      | `xs`, `sm`, `md`, `lg`, `xl`, `2xl`                    |
| `size`   | `md`      | `xs`, `sm`, `md`, `lg`, `xl`                           |
| `tone`   | `default` | `default`, `muted`, `subtle`, `primary`, `destructive` |
# Container

`Container` is a simple layout primitive for a centered content column with responsive inline gutters.

Use `size` to choose the content width and `gutter` to control inline padding at the viewport edge.
`size="full"` keeps the chosen gutter but removes the max-width cap.
Use `as` when the wrapper should also carry page semantics such as `main` or `section`.
Use `className` for local layout styling or CSS variable overrides.

## Defaults

| Prop     | Default | Values                                                                  |
| -------- | ------- | ----------------------------------------------------------------------- |
| `size`   | `lg`    | `xs`, `sm`, `md`, `lg`, `xl`, `full`                                    |
| `gutter` | `md`    | `none`, `sm`, `md`, `lg`                                                |
| `as`     | `div`   | `div`, `main`, `section`, `article`, `aside`, `header`, `footer`, `nav` |

## Notes

- `Container` controls inline layout only. Add vertical spacing outside it.
- Use `Bleed` inside `Container` when a child should escape the constrained column.
- Override `--container-*` variables on the root when a page needs local layout tuning.
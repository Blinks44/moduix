# Bleed

`Bleed` is a small layout primitive for content that should intentionally escape a constrained
parent while staying in normal document flow.

Use `inline` to control horizontal bleed, add `block` when content also needs to escape vertical
padding, and use `as` when the root should render a different element.
`inline="full"` is the default path for full-bleed sections and media.

## Parts

- `Bleed` (`data-slot="bleed-root"`) root layout wrapper

## Defaults

| Prop     | Default | Values                                       |
| -------- | ------- | -------------------------------------------- |
| `inline` | `full`  | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `full` |
| `block`  | `none`  | `none`, `xs`, `sm`, `md`, `lg`, `xl`         |
| `as`     | `div`   | Any React element type                       |

## Styling

Customize the root with `className` and override `--bleed-*` CSS variables in
`src/styles/theme.css` when layout math needs to change locally.

## Layout Notes

- `inline="full"` is viewport-based. It is meant for full-bleed sections, not for matching the width of a nearby layout container.
- Ancestors with `overflow: hidden` or `overflow: clip` can visually crop the bleed.
- For nested scroll regions, drawers, or layouts that need custom full-bleed math, override `--bleed-inline-full` and `--bleed-inline-full-size` locally.

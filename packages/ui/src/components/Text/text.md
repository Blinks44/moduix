# Text

Typography primitive for body copy, inline text, and supporting descriptions.

## API

- `as`: `p` | `span` | `small` | `strong` | `em` | `div`
- `render`: Base UI render prop for replacing the default `p` element
- `size`: `xs` | `sm` | `md` | `lg` | `xl`
- `weight`: `regular` | `medium` | `semibold` | `bold`
- `tone`: `default` | `muted` | `subtle` | `primary` | `destructive`
- `align`: `left` | `center` | `right`
- `className`: root class override

## Defaults

Use `as` for common intrinsic elements and `render` for custom components.

When `size` and `weight` are omitted:

- default root (`p`) -> `size="md"`, `weight="regular"`
- `as="small"` or `render={<small />}` -> `size="sm"`, `weight="regular"`
- `as="strong"` or `render={<strong />}` -> `size="md"`, `weight="semibold"`
- other rendered elements and custom components -> `size="md"`, `weight="regular"`

## Styling

`Text` renders a single root slot: `data-slot="text-root"`.
Variants are applied via `data-size`, `data-weight`, `data-tone`, and `data-align`.
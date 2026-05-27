# Text

Typography primitive for body copy, inline text, and supporting descriptions.

## API

- `render`: Base UI render prop for replacing the default `p` element
- `size`: `xs` | `sm` | `md` | `lg` | `xl`
- `weight`: `regular` | `medium` | `semibold` | `bold`
- `tone`: `default` | `muted` | `subtle` | `primary` | `destructive`
- `align`: `left` | `center` | `right`
- `className`: root class override

## Defaults

When `size` and `weight` are omitted:

- default root (`p`) -> `size="md"`, `weight="regular"`
- `render={<small />}` -> `size="sm"`, `weight="regular"`
- `render={<strong />}` -> `size="md"`, `weight="semibold"`
- other rendered elements and custom components -> `size="md"`, `weight="regular"`

## Styling

`Text` renders a single root slot: `data-slot="text-root"`.
Variants are applied via `data-size`, `data-weight`, `data-tone`, and `data-align`.

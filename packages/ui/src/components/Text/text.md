# Text

Typography primitive for body copy, inline text, and supporting descriptions.

## API

- `as`: semantic element or custom component (defaults to `p`)
- `size`: `xs` | `sm` | `md` | `lg` | `xl`
- `weight`: `regular` | `medium` | `semibold` | `bold`
- `tone`: `default` | `muted` | `subtle` | `primary` | `destructive`
- `align`: `left` | `center` | `right`
- `className`: root class override

## Defaults

Element-based defaults when `size` and `weight` are not provided:

- `small` -> `size="sm"`, `weight="regular"`
- `strong` -> `size="md"`, `weight="semibold"`
- `p`, `span`, `em`, `div`, and custom components -> `size="md"`, `weight="regular"`

## Styling

The component renders a single root slot: `data-slot="text-root"`.
Style variants are applied via `data-size`, `data-weight`, `data-tone`, and `data-align`.
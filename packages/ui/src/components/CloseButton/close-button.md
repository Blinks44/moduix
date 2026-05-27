# CloseButton

Icon-only dismiss button built on Base UI `Button`.

## Usage

```tsx
import { CloseButton } from 'moduix';

export function Example() {
  return <CloseButton aria-label="Close dialog" />;
}
```

Use `CloseButton` for dismiss actions in dialogs, toasts, cards, and other closeable surfaces.
The wrapper keeps the Base UI `Button` contract and adds only three defaults:

- `type="button"`
- default `CloseIcon` when `children` are omitted
- fallback `aria-label="Close"` when `children` are omitted

Pass `children` to replace the default icon with other icon-sized content. When you do that, keep
the control labeled with `aria-label`.

Use `className` or CSS variables to style the root button. `CloseButton` has a single public slot,
so it does not expose `classNames` or extra structural parts.

## Composition

| Prop         | Default                             |
| ------------ | ----------------------------------- |
| `type`       | `button`                            |
| `aria-label` | `Close` when `children` are omitted |
| `children`   | `CloseIcon`                         |

Everything else passes through directly to Base UI `Button`, including props such as `render`,
`disabled`, and `focusableWhenDisabled`.

## CSS Variables

- `--close-button-bg`
- `--close-button-bg-hover`
- `--close-button-color`
- `--close-button-color-hover`
- `--close-button-disabled-opacity`
- `--close-button-focus-ring-color`
- `--close-button-focus-ring-offset`
- `--close-button-focus-ring-width`
- `--close-button-icon-size`
- `--close-button-radius`
- `--close-button-size`
- `--close-button-transition`

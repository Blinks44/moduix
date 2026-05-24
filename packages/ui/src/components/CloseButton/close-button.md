# CloseButton

Icon-only button for dismissing overlays, notifications, and other closeable surfaces.

## Usage

```tsx
import { CloseButton } from 'moduix';

export function Example() {
  return <CloseButton aria-label="Close dialog" />;
}
```

Pass children to replace the default icon. The component is built on Base UI Button, so it
supports button behavior such as `disabled`, `focusableWhenDisabled`, and `render`.

When `children` are omitted, `CloseButton` renders `CloseIcon` and applies the default
accessible name `Close`. If you pass a custom icon, keep the button labeled with `aria-label`.
If you pass visible text, that text can provide the accessible name.

Use `className` to style the root button. `CloseButton` has no hidden service slots, so it does
not expose a `classNames` object.

## Defaults

| Prop         | Default                             |
| ------------ | ----------------------------------- |
| `type`       | `button`                            |
| `aria-label` | `Close` when `children` are omitted |
| `children`   | `CloseIcon`                         |

## CSS variables

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
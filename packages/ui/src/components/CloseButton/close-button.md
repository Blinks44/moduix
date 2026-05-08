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
supports button behavior such as `disabled` and `focusableWhenDisabled`.

## CSS variables

- `--close-button-size`
- `--close-button-icon-size`
- `--close-button-radius`
- `--close-button-bg`
- `--close-button-bg-hover`
- `--close-button-color`
- `--close-button-color-hover`
- `--close-button-focus-ring-color`
- `--close-button-disabled-opacity`
- `--close-button-transition`
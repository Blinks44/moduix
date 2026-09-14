# Toggle (Solid)

`Toggle` is the moduix Solid wrapper around Ark UI Toggle. It preserves the React wrapper's
two-state button behavior, `Toggle.Indicator`, context access, visual variants, sizes, and stable
data hooks.

## Composition

```tsx
import { Toggle } from '@moduix/solid/toggle';

export function ToggleDemo() {
  return (
    <Toggle defaultPressed>
      Favorite
      <Toggle.Indicator fallback={<span>☆</span>}>✓</Toggle.Indicator>
    </Toggle>
  );
}
```

`Toggle` is the short form of `Toggle.Root`. `Toggle.Indicator` renders its children while pressed
and its `fallback` while not pressed. `Toggle.Context` and `useToggleContext()` expose Ark's
accessor-based state API.

## Ark Solid behavior

Solid uses a render-function `asChild` prop:

```tsx
<Toggle
  asChild={(props) => (
    <button {...props()} type="button">
      Custom toggle
    </button>
  )}
/>
```

The installed Ark Solid primitive does not forward `ref` through `asChild`; ordinary refs and
custom-host composition are therefore supported as separate native paths.

## API and styling

The root supports Ark's `pressed`, `defaultPressed`, `onPressedChange`, `disabled`, and `asChild`
props plus moduix `variant` (`default`, `outline`, `ghost`) and `size` (`xs`, `sm`, `md`, `lg`,
`icon-sm`, `icon-md`, `icon-lg`). The barrel exports `Toggle`, `useToggleContext`,
`ToggleRootProps`, `ToggleSize`, and `ToggleVariant`.

The root emits `data-slot="toggle-root"`, `data-variant`, and `data-size`; the indicator emits
`data-slot="toggle-indicator"`. Ark state attributes such as `data-scope="toggle"`,
`data-part`, `data-state`, `data-pressed`, and `data-disabled` remain available for styling.
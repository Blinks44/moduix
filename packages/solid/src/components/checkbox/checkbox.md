# Checkbox (Solid)

`Checkbox` is the moduix Solid wrapper around Ark UI Checkbox. It preserves the React wrapper's
compound anatomy, state attributes, native form behavior, default indicators, and `size` styling
hook.

## Composition

```tsx
import { Checkbox } from '@moduix/solid/checkbox';

export function CheckboxDemo() {
  return (
    <Checkbox.Root defaultChecked>
      <Checkbox.Control />
      <Checkbox.Label>Enable notifications</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  );
}
```

Compose `Checkbox.HiddenInput` explicitly inside `Root` or `RootProvider`. `Control` renders the default
checked and indeterminate indicators when it has no children, and `Indicator` renders the moduix
check or indeterminate icon when its children are omitted.

## Ark Solid behavior

Solid uses a render-function `asChild` prop:

```tsx
<Checkbox.Root asChild={(props) => <label {...props()} />}>
  <Checkbox.Control />
  <Checkbox.Label>Accept terms</Checkbox.Label>
  <Checkbox.HiddenInput />
</Checkbox.Root>
```

The installed Ark Solid primitive does not forward `ref` through `asChild`; ordinary refs and
custom-host composition are therefore supported as separate native paths. The Solid hooks expose
Ark's accessor-based API, so provider state is passed as `value={checkbox}` and read as
`checkbox().checked`.

The public parts are `Root`, `RootProvider`, `Control`, `Indicator`, `Label`, and `Group`. The
barrel also re-exports `useCheckbox`, `useCheckboxContext`, `useCheckboxGroup`, and
`useCheckboxGroupContext`.
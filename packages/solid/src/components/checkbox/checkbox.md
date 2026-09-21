# Checkbox (Solid)

`Checkbox` is the moduix Solid wrapper around Ark UI Checkbox. It preserves the React wrapper's flat
part surface, state attributes, native form behavior, default indicators, and `size` styling hook.

## Composition

```tsx
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/solid/checkbox';

export function CheckboxDemo() {
  return (
    <Checkbox defaultChecked>
      <CheckboxControl />
      <CheckboxLabel>Enable notifications</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
  );
}
```

Compose `CheckboxHiddenInput` explicitly inside the root or `CheckboxRootProvider`. `CheckboxControl`
renders the default checked and indeterminate indicators when it has no children, and
`CheckboxIndicator` renders the moduix check or indeterminate icon when its children are omitted.

## Ark Solid behavior

Solid uses a render-function `asChild` prop:

```tsx
<Checkbox asChild={(props) => <label {...props()} />}>
  <CheckboxControl />
  <CheckboxLabel>Accept terms</CheckboxLabel>
  <CheckboxHiddenInput />
</Checkbox>
```

The installed Ark Solid primitive does not forward `ref` through `asChild`; ordinary refs and
custom-host composition are therefore supported as separate native paths. The Solid hooks expose
Ark's accessor-based API, so provider state is passed as `value={checkbox}` and read as
`checkbox().checked`.

The public flat parts are `Checkbox` (root), `CheckboxRootProvider`, `CheckboxContext`,
`CheckboxHiddenInput`, `CheckboxControl`, `CheckboxIndicator`, `CheckboxLabel`, and
`CheckboxGroup`. The barrel also re-exports `useCheckbox`, `useCheckboxContext`, `useCheckboxGroup`,
and `useCheckboxGroupContext`.

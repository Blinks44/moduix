# Switch (Solid)

`Switch` is the moduix Solid wrapper around Ark UI Switch. It preserves the React wrapper's
flat anatomy, native form behavior, state attributes, default thumb, and `size` styling hook.

## Composition

```tsx
import {
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
} from '@moduix/solid/switch';

export function SwitchDemo() {
  return (
    <Switch defaultChecked>
      <SwitchControl />
      <SwitchLabel>Enable notifications</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
  );
}
```

Compose `SwitchHiddenInput` explicitly inside `Switch` or `SwitchRootProvider`. `SwitchControl`
renders a default `SwitchThumb` when it has no children. The public parts are `Switch`,
`SwitchRootProvider`, `SwitchControl`, `SwitchThumb`, `SwitchLabel`, and `SwitchContext`; the barrel
also re-exports `useSwitch` and `useSwitchContext`.

## Ark Solid behavior

Solid uses a render-function `asChild` prop:

```tsx
<Switch asChild={(props) => <label {...props()} />}>
  <SwitchControl />
  <SwitchLabel>Enable reminders</SwitchLabel>
  <SwitchHiddenInput />
</Switch>
```

The installed Ark Solid primitive does not forward `ref` through an `asChild` render function.
Ordinary refs and custom-host composition are therefore supported as separate native paths. The
Solid hooks expose Ark's accessor-based API, so provider state is passed as `value={switchApi}` and
read as `switchApi().checked`.

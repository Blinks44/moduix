# NumberInput (Solid)

`NumberInput` preserves the React wrapper's Ark parts, string value state, callback details,
formatting, native form behavior, and default stepper icons.

## Composition

```tsx
import { NumberInput } from '@moduix/solid/number-input';

export function QuantityInput() {
  return (
    <NumberInput defaultValue="10" min={0} max={20} step={2}>
      <NumberInput.Label>Quantity</NumberInput.Label>
      <NumberInput.Field />
    </NumberInput>
  );
}
```

`NumberInput.Field` is the standard control shortcut. Use `Control`, `Input`, and trigger parts
directly when their order, icons, or styling need to differ. The public state helpers
`useNumberInput`, `useNumberInputContext`, and `NumberInput.Context` expose Ark's accessor-based
Solid API; read numeric state through `context().valueAsNumber`.

Ark Solid uses a render-function `asChild` prop:

```tsx
<NumberInput asChild={(props) => <section {...props()} />}>
  <NumberInput.Label>Amount</NumberInput.Label>
  <NumberInput.Field />
</NumberInput>
```

The installed Ark Solid factory does not forward refs through an `asChild` render function.
Ordinary refs and custom-host composition are supported as separate native paths.
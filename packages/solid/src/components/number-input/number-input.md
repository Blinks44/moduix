# NumberInput (Solid)

`NumberInput` preserves the React wrapper's Ark parts, string value state, callback details,
formatting, native form behavior, and default stepper icons. Its public values are flat and match
the React package: `NumberInput`, `NumberInputRootProvider`, `NumberInputContext`,
`NumberInputLabel`, `NumberInputScrubber`, `NumberInputControl`, `NumberInputField`,
`NumberInputDecrementTrigger`, `NumberInputInput`, `NumberInputIncrementTrigger`,
`NumberInputValueText`, `useNumberInput`, and `useNumberInputContext`.

## Composition

```tsx
import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/solid/number-input';

export function QuantityInput() {
  return (
    <NumberInput defaultValue="10" min={0} max={20} step={2}>
      <NumberInputLabel>Quantity</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
  );
}
```

`NumberInputField` is the standard control shortcut. Use `NumberInputControl`, `NumberInputInput`,
and trigger parts directly when their order, icons, or styling need to differ. The public state helpers
`useNumberInput`, `useNumberInputContext`, and `NumberInputContext` expose Ark's accessor-based
Solid API; read numeric state through `context().valueAsNumber`.

Ark Solid uses a render-function `asChild` prop:

```tsx
<NumberInput asChild={(props) => <section {...props()} />}>
  <NumberInputLabel>Amount</NumberInputLabel>
  <NumberInputField />
</NumberInput>
```

The installed Ark Solid factory does not forward refs through an `asChild` render function.
Ordinary refs and custom-host composition are supported as separate native paths.

## Local changelog

- 2026-09-22: Replaced the compound `NumberInput.*` value surface with the flat named exports
  across React, Solid, and both Tailwind packages.
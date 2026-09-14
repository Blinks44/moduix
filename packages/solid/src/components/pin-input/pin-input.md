# PinInput (Solid)

`PinInput` preserves the React wrapper's Ark parts, string-array value state, callback details,
native form behavior, and explicit `HiddenInput` composition.

## Composition

```tsx
import { PinInput } from '@moduix/solid/pin-input';

export function VerificationCodeField() {
  return (
    <PinInput count={6} name="verificationCode" otp>
      <PinInput.Label>Verification code</PinInput.Label>
      <PinInput.Control>
        <PinInput.Inputs />
      </PinInput.Control>
    </PinInput>
  );
}
```

`PinInput.Inputs` renders one indexed input for every item in the Ark context. Use explicit
`PinInput.Input` parts and `PinInput.Separator` for grouped layouts.

Compose Ark's `PinInput.HiddenInput` explicitly. Ark synchronizes it with native form resets.

`usePinInput`, `usePinInputContext`, and `PinInput.Context` expose Ark's accessor-based Solid API:

```tsx
const pinInput = usePinInput({ count: 6 });

<PinInput.RootProvider value={pinInput}>
  <PinInput.Control>
    <PinInput.Inputs />
  </PinInput.Control>
</PinInput.RootProvider>;

pinInput().clearValue();
```

Ark Solid uses a render-function `asChild` prop:

```tsx
<PinInput asChild={(props) => <section {...props()} />}>
  <PinInput.Label>Verification code</PinInput.Label>
  <PinInput.Control>
    <PinInput.Inputs />
  </PinInput.Control>
</PinInput>
```

The installed Ark Solid factory does not forward refs through an `asChild` render function.
Ordinary refs and custom-host composition are supported as separate native paths.
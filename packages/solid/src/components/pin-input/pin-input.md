# PinInput (Solid)

`PinInput` preserves the React wrapper's Ark parts, string-array value state, callback details,
native form behavior, and explicit `HiddenInput` composition.

## Composition

```tsx
import {
  PinInput,
  PinInputRootProvider,
  PinInputContext,
  PinInputHiddenInput,
  PinInputLabel,
  PinInputControl,
  PinInputInput,
  PinInputInputs,
  PinInputSeparator,
  usePinInput,
  usePinInputContext,
} from '@moduix/solid/pin-input';

export function VerificationCodeField() {
  return (
    <PinInput count={6} name="verificationCode" otp>
      <PinInputLabel>Verification code</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
    </PinInput>
  );
}
```

`PinInputInputs` renders one indexed input for every item in the Ark context. Use explicit
`PinInputInput` parts and `PinInputSeparator` for grouped layouts.

Compose Ark's `PinInputHiddenInput` explicitly. Ark synchronizes it with native form resets.

`usePinInput`, `usePinInputContext`, and `PinInputContext` expose Ark's accessor-based Solid API:

```tsx
const pinInput = usePinInput({ count: 6 });

<PinInputRootProvider value={pinInput}>
  <PinInputControl>
    <PinInputInputs />
  </PinInputControl>
</PinInputRootProvider>;

pinInput().clearValue();
```

Ark Solid uses a render-function `asChild` prop:

```tsx
<PinInput asChild={(props) => <section {...props()} />}>
  <PinInputLabel>Verification code</PinInputLabel>
  <PinInputControl>
    <PinInputInputs />
  </PinInputControl>
</PinInput>
```

The installed Ark Solid factory does not forward refs through an `asChild` render function.
Ordinary refs and custom-host composition are supported as separate native paths.
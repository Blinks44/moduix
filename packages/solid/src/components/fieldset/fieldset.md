# Fieldset (Solid)

`Fieldset` is the native Solid wrapper around Ark UI's `Fieldset`. It preserves the React
component's callable root, compound parts, fieldset state, ARIA wiring, CSS variables, and
`RootProvider` composition.

## Composition

```tsx
import { Field } from '@moduix/solid/field';
import { Fieldset } from '@moduix/solid/fieldset';

export function ContactDetails() {
  return (
    <Fieldset>
      <Fieldset.Legend>Contact details</Fieldset.Legend>
      <Field>
        <Field.Label>Email</Field.Label>
        <Field.Input type="email" />
      </Field>
      <Fieldset.HelperText>Use an address you check regularly.</Fieldset.HelperText>
    </Fieldset>
  );
}
```

The public parts are `Root`, `RootProvider`, `Context`, `Legend`, `HelperText`, and `ErrorText`.
The barrel also re-exports `useFieldset` and `useFieldsetContext`.

Ark Solid uses a render-function `asChild` prop:

```tsx
<Fieldset asChild={(props) => <section {...props()} aria-label="Project details" />}>
  <Fieldset.Legend>Project details</Fieldset.Legend>
</Fieldset>
```

The installed Ark Solid factory does not forward `ref` through an `asChild` render function.
Ordinary refs and custom-host composition are therefore supported as separate native paths.
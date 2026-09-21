# Fieldset (Solid)

`Fieldset` is the native Solid wrapper around Ark UI's `Fieldset`. It preserves the React
component's root, fieldset state, ARIA wiring, CSS variables, and `FieldsetRootProvider` composition.

## Composition

```tsx
import { Field } from '@moduix/solid/field';
import {
  Fieldset,
  FieldsetHelperText,
  FieldsetLegend,
} from '@moduix/solid/fieldset';

export function ContactDetails() {
  return (
    <Fieldset>
      <FieldsetLegend>Contact details</FieldsetLegend>
      <Field>
        <FieldLabel>Email</FieldLabel>
        <FieldInput type="email" />
      </Field>
      <FieldsetHelperText>Use an address you check regularly.</FieldsetHelperText>
    </Fieldset>
  );
}
```

The public parts are `Fieldset`, `FieldsetRootProvider`, `FieldsetContext`, `FieldsetLegend`,
`FieldsetHelperText`, and `FieldsetErrorText`. The barrel also re-exports `useFieldset` and
`useFieldsetContext`.

Ark Solid uses a render-function `asChild` prop:

```tsx
<Fieldset asChild={(props) => <section {...props()} aria-label="Project details" />}>
  <FieldsetLegend>Project details</FieldsetLegend>
</Fieldset>
```

The installed Ark Solid factory does not forward `ref` through an `asChild` render function.
Ordinary refs and custom-host composition are therefore supported as separate native paths.

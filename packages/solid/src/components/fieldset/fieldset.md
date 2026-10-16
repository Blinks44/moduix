# Fieldset (Solid)

`Fieldset` is the native Solid wrapper around Ark UI's `Fieldset`. It keeps the React contract:
the same parts, `data-slot` hooks, ARIA wiring, Ark type re-exports, and `FieldsetRootProvider`
composition through `useFieldset`. CSS Modules have no `--moduix-fieldset-*` variables.

## Composition

```tsx
import { Field, FieldLabel } from '@moduix/solid/field';
import { Fieldset, FieldsetHelperText, FieldsetLegend } from '@moduix/solid/fieldset';
import { Input } from '@moduix/solid/input';

export function ContactDetails() {
  return (
    <Fieldset>
      <FieldsetLegend>Contact details</FieldsetLegend>
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input type="email" />
      </Field>
      <FieldsetHelperText>Use an address you check regularly.</FieldsetHelperText>
    </Fieldset>
  );
}
```

Ark Solid uses a render-function `asChild` prop:

```tsx
<Fieldset asChild={(props) => <section {...props()} aria-label="Project details" />}>
  <FieldsetLegend>Project details</FieldsetLegend>
</Fieldset>
```

The installed Ark Solid factory does not forward `ref` through an `asChild` render function.
Ordinary refs and custom-host composition are therefore supported as separate native paths.
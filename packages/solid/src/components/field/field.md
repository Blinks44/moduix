# Field (Solid)

`Field` is the native Solid wrapper around Ark UI's `Field`. It preserves the React component's
flat root and part exports, field state, ARIA wiring, and `FieldRootProvider` composition. See the
React `field.md` for the full contract.

## Composition

```tsx
import { Field, FieldHelperText, FieldLabel, FieldRequiredIndicator } from '@moduix/solid/field';
import { Input } from '@moduix/solid/input';

export function NameField() {
  return (
    <Field required>
      <FieldLabel>
        Name
        <FieldRequiredIndicator />
      </FieldLabel>
      <Input placeholder="Enter your name" />
      <FieldHelperText>Visible on your public profile.</FieldHelperText>
    </Field>
  );
}
```

The public parts are `FieldRootProvider`, `FieldContext`, `FieldItem`, `FieldLabel`,
`FieldHelperText`, `FieldErrorText`, and `FieldRequiredIndicator`. The barrel also re-exports
`useField`, `useFieldContext`, and the Ark prop, context, and hook types. `Field` renders no control
of its own; use `Input`, `Textarea`, `NativeSelect`, or another moduix control inside it.

`FieldItem` adds the same local `div[data-slot="field-item"]` row wrapper as the React component;
its ref targets that wrapper.

## Ark Solid behavior

Solid Ark components use a render-function `asChild` prop:

```tsx
<Field asChild={(props) => <section {...props()} aria-label="Project field" />}>
  <FieldLabel>Project</FieldLabel>
  <Input />
</Field>
```

The installed Ark Solid factory does not forward `ref` through an `asChild` render function.
Ordinary refs and custom-host composition are therefore separate native paths, and the Solid tests
cover them independently.

## Styling

A disabled root dims the whole field once; nested fields and controls do not dim again. CSS Modules
have no `--moduix-field-*` variables.
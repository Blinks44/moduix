# Field (Solid)

`Field` is the native Solid wrapper around Ark UI's `Field`. It preserves the React component's
callable root, compound parts, field state, ARIA wiring, CSS variables, and `RootProvider`
composition.

## Composition

```tsx
import { Field } from '@moduix/solid/field';

export function NameField() {
  return (
    <Field required>
      <Field.Label>
        Name
        <Field.RequiredIndicator />
      </Field.Label>
      <Field.Input placeholder="Enter your name" />
      <Field.HelperText>Visible on your public profile.</Field.HelperText>
    </Field>
  );
}
```

The public parts are `Root`, `RootProvider`, `Context`, `Item`, `Label`, `Input`, `Textarea`,
`Select`, `HelperText`, `ErrorText`, and `RequiredIndicator`. The barrel also re-exports
`useField` and `useFieldContext`.

`Field.Item` adds the same local `div[data-slot="field-item"]` row wrapper as the React component;
its ref targets that wrapper. Ark owns ids, labels, descriptions, error wiring, and field state.

## Ark Solid behavior

Solid Ark components use a render-function `asChild` prop:

```tsx
<Field asChild={(props) => <section {...props()} aria-label="Project field" />}>
  <Field.Label>Project</Field.Label>
  <Field.Input />
</Field>
```

The installed Ark Solid factory does not forward `ref` through an `asChild` render function.
Ordinary refs and custom-host composition are therefore supported as separate native paths, and
the Solid tests cover them independently.
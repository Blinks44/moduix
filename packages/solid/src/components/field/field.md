# Field (Solid)

`Field` is the native Solid wrapper around Ark UI's `Field`. It preserves the React component's
flat root and part exports, field state, ARIA wiring, CSS variables, and `FieldRootProvider`
composition.

## Defaults and styling

`FieldInput` matches the default `Input size="md"` appearance, including inline padding,
file chooser button, focus and invalid styles. It retains the native numeric `size` and
`--moduix-field-control-*` customization; `Input` adds visual sizes and `htmlSize`.
`FieldInput` uses `--moduix-spacing-3` inline padding; `FieldTextarea` and `FieldSelect`
keep `--moduix-spacing-3-5`. A disabled moduix field root owns opacity for either input;
standalone disabled inputs apply their own opacity.

## Composition

```tsx
import {
  Field,
  FieldHelperText,
  FieldInput,
  FieldLabel,
  FieldRequiredIndicator,
} from '@moduix/solid/field';

export function NameField() {
  return (
    <Field required>
      <FieldLabel>
        Name
        <FieldRequiredIndicator />
      </FieldLabel>
      <FieldInput placeholder="Enter your name" />
      <FieldHelperText>Visible on your public profile.</FieldHelperText>
    </Field>
  );
}
```

The public parts are `FieldRootProvider`, `FieldContext`, `FieldItem`, `FieldLabel`, `FieldInput`,
`FieldTextarea`, `FieldSelect`, `FieldHelperText`, `FieldErrorText`, and
`FieldRequiredIndicator`. The barrel also re-exports `useField` and `useFieldContext`.

`FieldItem` adds the same local `div[data-slot="field-item"]` row wrapper as the React component;
its ref targets that wrapper. Ark owns ids, labels, descriptions, error wiring, and field state.

## Ark Solid behavior

Solid Ark components use a render-function `asChild` prop:

```tsx
<Field asChild={(props) => <section {...props()} aria-label="Project field" />}>
  <FieldLabel>Project</FieldLabel>
  <FieldInput />
</Field>
```

The installed Ark Solid factory does not forward `ref` through an `asChild` render function.
Ordinary refs and custom-host composition are therefore supported as separate native paths, and
the Solid tests cover them independently.

## Style contract (2026-10-03)

Disabled Field/Fieldset owns the outer opacity. Nested Field, InputGroup and input controls avoid applying the same opacity twice.
# Field

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/field
- Chakra UI: https://chakra-ui.com/docs/components/field

## Purpose

`Field` provides Ark UI field context for one form control, its label, helper text, error text,
required marker, and shared `disabled`, `invalid`, `required`, and `readOnly` state.

## Upstream model to preserve

The wrapper follows `@ark-ui/react/field`. Preserve Ark part names (`Root`, `RootProvider`,
`Label`, `HelperText`, `ErrorText`, `RequiredIndicator`, `Item`), `ids`, `target`, `asChild`, and
root state props.

Ark Field does not own validation. It exposes `invalid` state and ARIA wiring; form libraries or app
state decide when the field is invalid.

## Current behavior contract

`Field` is the root export. Every DOM part is a thin Ark wrapper with moduix styling, `className`,
and a stable `data-slot` hook. `FieldItem` wraps Ark's provider-only `Item` with a
`<div data-slot="field-item">` so grouped rows keep a style hook. `FieldContext`, `useField`, and
`useFieldContext` are exported for state access, and the barrel re-exports the Ark prop, context,
and hook types for the exported parts.

`Field` renders no control of its own. Moduix controls (`Input`, `Textarea`, `NativeSelect`,
`Checkbox`, `Select`, and others) read the field context. Ark's `Field.Input`, `Field.Textarea`, and
`Field.Select` are not re-exported as styled parts: `Input`, `Textarea`, and `NativeSelect` are
those parts with moduix styling.

## Anatomy and exported parts

```tsx
<Field required invalid>
  <FieldLabel>
    Label
    <FieldRequiredIndicator />
  </FieldLabel>
  <Input />
  <FieldHelperText />
  <FieldErrorText />
</Field>
```

| Export                   | Ark part            | `data-slot`                |
| ------------------------ | ------------------- | -------------------------- |
| `Field`                  | `Root`              | `field-root`               |
| `FieldRootProvider`      | `RootProvider`      | `field-root-provider`      |
| `FieldContext`           | `Context`           | renderless                 |
| `FieldItem`              | `Item` + local div  | `field-item`               |
| `FieldLabel`             | `Label`             | `field-label`              |
| `FieldHelperText`        | `HelperText`        | `field-helper-text`        |
| `FieldErrorText`         | `ErrorText`         | `field-error-text`         |
| `FieldRequiredIndicator` | `RequiredIndicator` | `field-required-indicator` |

## Composition

```tsx
import { Field, FieldHelperText, FieldLabel, FieldRequiredIndicator } from '@moduix/react/field';
import { Input } from '@moduix/react/input';

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

Use `FieldRootProvider` with `useField()` when state must be created outside the rendered tree. Do
not render `Field` and `FieldRootProvider` for the same field instance.

## Upstream feature coverage

- native input, textarea, and select via `Input`, `Textarea` (including `autoresize`), and
  `NativeSelect`
- checkbox, radio group, and select composition
- read-only, disabled, invalid, and required root state
- root provider via `useField` and `FieldRootProvider`
- context access via `FieldContext` or `useFieldContext`
- item-target label wiring via `FieldItem value` and root `target`

## Accessibility and state

Ark owns ids and ARIA links. `FieldLabel` points to the current control id, and helper text and the
active error text are included in `aria-describedby`. `FieldErrorText` renders only while the field
is invalid. State is exposed through `data-disabled`, `data-invalid`, `data-readonly`, and
`data-required`.

`Field` and `FieldRootProvider` forward refs to the root `div`; `FieldItem` forwards its ref to the
row wrapper.

## Defaults and styling

The root is a vertical flex column that fills its container. Label, helper text, and error text use
foundation typography tokens; long text wraps without overflowing. CSS Modules have no
`--moduix-field-*` variables: a class on a part overrides the layered component styles.

A disabled root dims the whole field once. A `Field` inside a disabled `Field` or `Fieldset` does
not dim again, and moduix controls inside a disabled `Field` do not apply their own disabled
opacity.

## Agent notes

Do not add validation props or styled control parts back to `Field`; controls belong to their own
components. Keep validation examples controlled through `invalid`.

## Local changelog

- 2026-10-16: Removed the styled `FieldInput`, `FieldTextarea`, and `FieldSelect` parts (use
  `Input`, `Textarea`, and `NativeSelect`) and all `--moduix-field-*` variables; re-exported Ark
  types.
- 2026-10-02: Prevented repeated disabled opacity under Fieldset and through InputGroup.
- 2026-09-21: Replaced the compound public API with flat `Field`-prefixed values.
- 2026-06-19: Migrated `Field` to Ark UI and removed the legacy validation API.
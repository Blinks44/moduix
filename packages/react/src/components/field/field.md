# Field

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/field
- Chakra UI: https://chakra-ui.com/docs/components/field

## Purpose

`Field` provides Ark UI field context for one form control, its label, helper text, error text,
required marker, and shared `disabled`, `invalid`, `required`, and `readOnly` state.

## Upstream model to preserve

The wrapper follows `@ark-ui/react/field`. Preserve Ark part names (`Root`, `RootProvider`,
`Label`, `Input`, `Textarea`, `Select`, `HelperText`, `ErrorText`, `RequiredIndicator`, `Item`,
`Context`), `useField`, `useFieldContext`, `ids`, `target`, `asChild`, and root state props.

Ark Field does not own legacy validation. It exposes `invalid` state and ARIA wiring; form
libraries or app state decide when the field is invalid.

## Current behavior contract

`Field` is the default root and also exposes the Ark namespace as static properties. Every DOM part
is a thin Ark wrapper with moduix styling, `className`, and stable `data-slot` hooks. `Field.Item`
wraps Ark's provider-only `Item` with a small `<div data-slot="field-item">` so grouped rows keep a
style hook.

## Anatomy and exported parts

```tsx
<Field required invalid>
  <Field.Label>
    Label
    <Field.RequiredIndicator />
  </Field.Label>
  <Field.Input />
  <Field.HelperText />
  <Field.ErrorText />
</Field>
```

| Export                    | Ark part                  | `data-slot`                |
| ------------------------- | ------------------------- | -------------------------- |
| `Field` / `Field.Root`    | `Field.Root`              | `field-root`               |
| `Field.RootProvider`      | `Field.RootProvider`      | `field-root-provider`      |
| `Field.Item`              | `Field.Item` + local div  | `field-item`               |
| `Field.Label`             | `Field.Label`             | `field-label`              |
| `Field.Input`             | `Field.Input`             | `field-input`              |
| `Field.Textarea`          | `Field.Textarea`          | `field-textarea`           |
| `Field.Select`            | `Field.Select`            | `field-select`             |
| `Field.HelperText`        | `Field.HelperText`        | `field-helper-text`        |
| `Field.ErrorText`         | `Field.ErrorText`         | `field-error-text`         |
| `Field.RequiredIndicator` | `Field.RequiredIndicator` | `field-required-indicator` |
| `Field.Context`           | `Field.Context`           | none                       |

The barrel also exports `useField`, `useFieldContext`, `UseFieldProps`, `UseFieldReturn`, and
`UseFieldContext`.

## Composition

```tsx
import { Field } from '@moduix/react';

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

Use `Field.RootProvider` with `useField()` when state must be created outside the rendered tree.
Do not render `Field.Root` and `Field.RootProvider` for the same field instance.

## Upstream feature coverage

Covered Ark examples:

- native input via `Field.Input`
- native textarea via `Field.Textarea`
- textarea autoresize via `Field.Textarea autoresize`
- native select via `Field.Select`
- checkbox composition via `Field` + `Checkbox`
- radio group composition via `Field` + `RadioGroup`
- root provider via `useField` and `Field.RootProvider`
- custom control via `useFieldContext`
- item-target label wiring via `Field.Item value` and root `target`

Moduix does not implement legacy `validate`, `validationMode`, `match`, `dirty`, `touched`, or
`FieldValidity`; those were removed during the Ark migration.

## Accessibility and state

Ark owns ids and ARIA links. `Field.Label` points to the current control id, helper and error text
ids are included in `aria-describedby` when present, `Field.ErrorText` renders only when the field is
invalid, and state is exposed through `data-disabled`, `data-invalid`, `data-readonly`, and
`data-required`.

Forwarded refs target the Ark DOM part. `Field.Root` and `Field.RootProvider` forward to the root
`div`; control parts forward to their native control elements.

## Defaults and styling

The wrapper preserves moduix visual defaults: compact vertical layout, tokenized control chrome,
focus ring, disabled opacity, invalid border color, helper text, and destructive error text.

Styles use Ark `data-scope="field"` / `data-part="..."` attributes where Ark provides state and
moduix `data-slot` hooks for consumer overrides. Public CSS variables remain under `--field-*`;
`--field-required-indicator-color` and `--field-textarea-min-height` are part of the Ark-aligned
contract.

## Intentional sugar and differences from upstream

`Field` is callable as the root for brevity and exposes `.Root` for Ark namespace parity.
`Field.Item` adds a local wrapper div because Ark's `Item` only provides nested field context and
does not render a styleable row.

No legacy compatibility aliases are exported. Consumers must use Ark names:
`Field.Input`, `Field.HelperText`, `Field.ErrorText`, `Field.Textarea`, and `Field.Select`.

## Agent notes

Do not add validation props back to `Field`. Keep validation examples controlled through `invalid`
or delegated to form-specific components. If future controls need native form submission, preserve
their own `HiddenInput`; Field itself has no hidden input.

## Local changelog

- 2026-06-19: Migrated `Field` to Ark UI, replaced legacy validation API with Ark
  field context, renamed public parts to Ark names, exposed provider/context hooks, and updated
  styling hooks.
- 2026-06-19: Replaced legacy `type="radio"` field examples with Ark-style `Checkbox` and
  `RadioGroup` compositions in stories and docs.
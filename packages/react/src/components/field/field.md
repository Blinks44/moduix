# Field

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/field
- Chakra UI: https://chakra-ui.com/docs/components/field

## Purpose

`Field` provides Ark UI field context for one form control, its label, helper text, error text,
required marker, and shared `disabled`, `invalid`, `required`, and `readOnly` state.

## Upstream model to preserve

The wrapper follows `@ark-ui/react/field`. Preserve Ark part names (`Root`, `RootProvider`,
`Label`, `Input`, `Textarea`, `Select`, `HelperText`, `ErrorText`, `RequiredIndicator`, `Item`),
`ids`, `target`, `asChild`, and root state props.

Ark Field does not own legacy validation. It exposes `invalid` state and ARIA wiring; form
libraries or app state decide when the field is invalid.

## Current behavior contract

`Field` is the root export. Every DOM part is a thin Ark wrapper with moduix styling, `className`,
and stable `data-slot` hooks. `FieldItem` wraps Ark's provider-only `Item` with a small
`<div data-slot="field-item">` so grouped rows keep a style hook. `FieldContext`, `useField`, and
`useFieldContext` are exported for normal state access.

## Anatomy and exported parts

```tsx
<Field required invalid>
  <FieldLabel>
    Label
    <FieldRequiredIndicator />
  </FieldLabel>
  <FieldInput />
  <FieldHelperText />
  <FieldErrorText />
</Field>
```

| Export                   | Ark part                  | `data-slot`                |
| ------------------------ | ------------------------- | -------------------------- |
| `Field`                  | `Root`                    | `field-root`               |
| `FieldRootProvider`      | `RootProvider`            | `field-root-provider`      |
| `FieldContext`           | `Context`                 | renderless                 |
| `FieldItem`              | `Item` + local div        | `field-item`               |
| `FieldLabel`             | `Label`                   | `field-label`              |
| `FieldInput`             | `Input`                   | `field-input`              |
| `FieldTextarea`          | `Textarea`                | `field-textarea`           |
| `FieldSelect`            | `Select`                  | `field-select`             |
| `FieldHelperText`        | `HelperText`              | `field-helper-text`        |
| `FieldErrorText`         | `ErrorText`               | `field-error-text`         |
| `FieldRequiredIndicator` | `RequiredIndicator`       | `field-required-indicator` |

## Composition

```tsx
import { Field, FieldHelperText, FieldInput, FieldLabel, FieldRequiredIndicator } from '@moduix/react/field';

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

Use `FieldRootProvider` with `useField()` from `@moduix/react` when state must be created outside
the rendered tree. Do not render `Field` and `FieldRootProvider` for the same field instance.

## Upstream feature coverage

Covered Ark examples:

- native input via `FieldInput`
- native textarea via `FieldTextarea`
- textarea autoresize via `FieldTextarea autoresize`
- native select via `FieldSelect`
- checkbox composition via `Field` + `Checkbox`
- radio group composition via `Field` + `RadioGroup`
- read-only root state via `readOnly`
- root provider via moduix `useField` and `FieldRootProvider`
- context access via `FieldContext` or moduix `useFieldContext`
- item-target label wiring via `FieldItem value` and root `target`

Moduix does not implement legacy `validate`, `validationMode`, `match`, `dirty`, `touched`, or
`FieldValidity`; those were removed during the Ark migration.

## Accessibility and state

Ark owns ids and ARIA links. `FieldLabel` points to the current control id, helper text is included
in `aria-describedby`, and active error text is included in `aria-errormessage`. `FieldErrorText`
renders only when the field is invalid, and state is exposed through `data-disabled`, `data-invalid`,
`data-readonly`, and `data-required`.

Forwarded refs target the rendered DOM part. `Field` and `FieldRootProvider` forward to the
root `div`; control parts forward to their native control elements; `FieldItem` forwards to its
moduix row wrapper.

## Defaults and styling

`FieldInput`, `FieldTextarea`, and `FieldSelect` default to `--moduix-size-md` with
`--moduix-spacing-1` block padding. Their `--moduix-field-control-*` variables continue to override
that baseline.

The wrapper preserves moduix visual defaults: compact vertical layout, tokenized control chrome,
focus ring, disabled opacity, invalid border color, helper text, and destructive error text. Long labels,
helper text, and errors wrap without overflowing their container.

Styles use Ark `data-scope="field"` / `data-part="..."` attributes where Ark provides state and
moduix `data-slot` hooks for consumer overrides. Public CSS variables remain under `--moduix-field-*`;
`--moduix-field-required-indicator-color`, `--moduix-field-error-font-weight`, and
`--moduix-field-textarea-min-height` are part of the Ark-aligned contract.
`--moduix-field-label-gap` defaults to `var(--moduix-spacing-2)`.

## Intentional sugar and differences from upstream

`Field` is the root export. `FieldItem` adds a local wrapper div because Ark's `Item` only provides
nested field context and does not render a styleable row. Its ref targets that wrapper. `FieldContext`,
`useField`, and `useFieldContext` are re-exported without changing their Ark state contracts.

No legacy compatibility aliases are exported. `useField` is available from `@moduix/react` for
`FieldRootProvider`, while `FieldContext` and `useFieldContext` cover state inside the tree.
The public component values use the flat names `FieldInput`, `FieldHelperText`, `FieldErrorText`,
`FieldTextarea`, and `FieldSelect`.

## Agent notes

Do not add validation props back to `Field`. Keep validation examples controlled through `invalid`
or delegated to form-specific components. If future controls need native form submission, preserve
their own `HiddenInput`; Field itself has no hidden input.

## Local changelog

- 2026-09-21: Replaced the compound public API with flat `Field`-prefixed values across packages,
  tests, stories, registries, and documentation without compatibility aliases.
- 2026-08-10: Added a dedicated error-text weight token and resilient wrapping for long field text.

- 2026-07-27: Removed compounded disabled opacity from nested field parts and made `FieldItem`'s
  row wrapper ref-forwarding.
- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-21: Reduced the default control to `--moduix-size-md` and compacted its block padding.

- 2026-07-12: Added moduix `FieldContext` and `useFieldContext` exports alongside `useField`, and
  made the component-local index a re-export-only barrel.
- 2026-07-10: Re-exported `useField` for the supported `RootProvider` composition path and restored
  the native select affordance by leaving browser appearance intact.
- 2026-07-02: Simplified the public surface to match other Ark-backed wrappers; kept callable root,
  `RootProvider`, and visual parts while removing re-exported Ark hooks, context parts, and type
  aliases from `moduix`.
- 2026-06-25: Exported Ark part prop types through the field barrel, aligned
  `--moduix-field-label-gap` fallback with the documented theme default, and refreshed docs coverage for
  `FieldItem`, `readOnly`, and `RootProvider`.
- 2026-06-19: Migrated `Field` to Ark UI, replaced legacy validation API with Ark
  field context, renamed public parts to Ark names, exposed provider/context hooks, and updated
  styling hooks.
- 2026-06-19: Replaced legacy `type="radio"` field examples with Ark-style `Checkbox` and
  `RadioGroup` compositions in stories and docs.

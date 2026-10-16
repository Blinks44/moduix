# Fieldset

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/fieldset
- Chakra UI: https://chakra-ui.com/docs/components/fieldset

## Purpose

`Fieldset` groups related form controls under one accessible legend, exposes group invalid state,
and provides shared disabled state to compatible descendants.

## Public contract

- `Fieldset`, `FieldsetRootProvider`, `FieldsetLegend`, `FieldsetHelperText`, and
  `FieldsetErrorText` are thin styled wrappers over the Ark parts. `disabled`, `invalid`, `id`,
  refs, and `asChild` pass straight to Ark.
- `useFieldset` creates state for `FieldsetRootProvider`; `FieldsetContext` and
  `useFieldsetContext` read it in a descendant. Do not render `Fieldset` around the same state.
- The barrel re-exports the Ark prop, context, and hook types.

```text
Fieldset | FieldsetRootProvider
├─ FieldsetLegend
├─ grouped controls
├─ FieldsetHelperText (optional)
└─ FieldsetErrorText (optional)
```

| Part                   | `data-slot`              | Element                            |
| ---------------------- | ------------------------ | ---------------------------------- |
| `Fieldset`             | `fieldset-root`          | Native `fieldset`; owns state.     |
| `FieldsetRootProvider` | `fieldset-root-provider` | Native `fieldset`; external state. |
| `FieldsetLegend`       | `fieldset-legend`        | Native `legend`.                   |
| `FieldsetHelperText`   | `fieldset-helper-text`   | `span`.                            |
| `FieldsetErrorText`    | `fieldset-error-text`    | `span`, only while invalid.        |

## Composition

```tsx
import { Field, FieldLabel } from '@moduix/react/field';
import { Fieldset, FieldsetHelperText, FieldsetLegend } from '@moduix/react/fieldset';
import { Input } from '@moduix/react/input';

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

## Accessibility and state

- Ark links the legend with `aria-labelledby`, and mounted helper text and active error text with
  `aria-describedby`. `FieldsetErrorText` has `aria-live="polite"`.
- Native `disabled` disables descendant native controls; Ark controls read the disabled state from
  context. Set `invalid` on nested `Field` components when individual controls need invalid state.
- The root and legend carry `data-disabled` and `data-invalid`.

## Styling

- The root resets the native fieldset border, margin, and padding, fills its container, and stacks
  children with a gap. The rendered legend sits outside the flex gap, so it carries its own bottom
  padding.
- A disabled root dims once; `Field`, `Input`, and other moduix controls that know `fieldset-root`
  do not dim again.
- `invalid` draws no group border; the group error is `FieldsetErrorText`.
- CSS Modules have no `--moduix-fieldset-*` variables; Tailwind uses utilities and consumer classes.

## Agent notes

- Keep `FieldsetErrorText` conditional through Ark; do not duplicate its visibility logic.
- Do not add a Chakra-style content wrapper or a `render` prop; composition uses `asChild`.
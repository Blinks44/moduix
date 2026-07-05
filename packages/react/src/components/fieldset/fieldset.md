# Fieldset

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/fieldset
- Chakra UI: https://chakra-ui.com/docs/components/fieldset

## Purpose

`Fieldset` groups related form controls under one accessible legend, exposes group invalid state,
and provides shared disabled state to compatible descendants.

## Upstream model to preserve

- Preserve Ark UI `Root`, `RootProvider`, `Legend`, `HelperText`, and `ErrorText`.
- Preserve Ark IDs, refs, and root state without remapping.
- Keep the native `fieldset` and `legend` semantics.

## Current behavior contract

- `Fieldset` and `Fieldset.Root` are the same styled Ark root.
- `disabled`, `invalid`, and `id` pass directly to Ark.
- `Fieldset.ErrorText` renders only while the root is invalid.
- `Fieldset.HelperText` and active error text are connected through `aria-describedby`.
- legacy `render`, callback class names, flat part aliases, and compatibility adapters are removed.

## Anatomy and exported parts

```text
Fieldset.Root | Fieldset.RootProvider
├─ Fieldset.Legend
├─ grouped controls
├─ Fieldset.HelperText (optional)
└─ Fieldset.ErrorText (optional)
```

| Part                    | `data-slot`              | Element/role                       |
| ----------------------- | ------------------------ | ---------------------------------- |
| `Fieldset.Root`         | `fieldset-root`          | Native `fieldset`; owns state.     |
| `Fieldset.RootProvider` | `fieldset-root-provider` | Native `fieldset`; external state. |
| `Fieldset.Legend`       | `fieldset-legend`        | Native `legend`.                   |
| `Fieldset.HelperText`   | `fieldset-helper-text`   | Descriptive `span`.                |
| `Fieldset.ErrorText`    | `fieldset-error-text`    | Conditional polite-live `span`.    |

## Composition

```tsx
import { Field, Fieldset } from '@moduix/react';

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

Use `asChild` with one semantic child when replacing a part's host. Use `useFieldset` from
`@ark-ui/react/fieldset` with `Fieldset.RootProvider`; do not render `Fieldset.Root` around the
same state instance.

## Upstream feature coverage

- Basic grouped fields and native controls are supported.
- Ark `Field`, checkbox, radio-group, and select compositions work as nested controls.
- Root Provider is exposed through Ark `useFieldset` and `Fieldset.RootProvider`.
- `id`, `disabled`, `invalid`, refs, and `asChild` are passed through unchanged.

## Accessibility and state

- `Legend` is a native `legend` and Ark links it with `aria-labelledby`.
- Ark links mounted helper text and active error text with `aria-describedby`.
- `ErrorText` has `aria-live="polite"` and is absent when `invalid` is false.
- Root/provider refs target `HTMLFieldSetElement`; legend refs target `HTMLLegendElement`.
- Ark state hooks are `data-scope="fieldset"`, `data-part="root" | "legend" | "helper-text" |
"error-text"`, with `data-disabled` and `data-invalid` on the root and legend.
- Native fieldset disabled behavior applies to descendant native controls. Ark controls nested inside
  the fieldset can consume disabled state where supported. Set `invalid` on nested `Field`
  components when individual controls need invalid styling or ARIA state.
- Fieldset has no value and therefore no `HiddenInput`, controlled value, callback, or keyboard
  navigation contract of its own.

## Defaults and styling

All DOM parts accept `className`; wrappers add stable `data-slot` hooks. Root and provider share the
same visual defaults. Public variables cover root layout/borders, legend spacing and typography,
disabled and invalid state, and helper/error text typography and color.

## Intentional sugar and differences from upstream

- moduix supplies CSS Module defaults, design-token fallbacks, CSS variables, and `data-slot`.
- The short `<Fieldset>` form is equivalent to `<Fieldset.Root>`.
- No Chakra-only content wrapper or legacy flat aliases are added.

## Agent notes

- Keep the visual parts and `RootProvider`; do not re-export Ark hooks, context parts, or types.
- Keep `ErrorText` conditional; do not duplicate its visibility logic.
- Do not restore `render`; Ark composition uses `asChild`.
- Keep docs examples on the namespace API.

## Local changelog

- 2026-07-02: Simplified the public surface to match other Ark-backed wrappers; preserved
  `RootProvider` and visual parts while removing re-exported Ark hooks, context parts, and type
  aliases from `moduix`.
- 2026-06-25: Audited the Ark UI fieldset migration against upstream docs and runtime behavior;
  clarified disabled versus invalid propagation and synchronized docs examples with the short root
  component form.
- 2026-06-19: Migrated to Ark UI 5.37.2; added the complete anatomy, provider/context
  surface, invalid/helper/error semantics, Ark state styling, and namespace-first exports; removed
  legacy flat aliases and `render`.
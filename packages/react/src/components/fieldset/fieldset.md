# Fieldset

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/fieldset
- Chakra UI: https://chakra-ui.com/docs/components/fieldset

## Purpose

`Fieldset` groups related form controls under one accessible legend, exposes group invalid state,
and provides shared disabled state to compatible descendants.

## Upstream model to preserve

- Preserve Ark UI `Root`, `RootProvider`, `Legend`, `HelperText`, and `ErrorText` through the flat
  moduix names `Fieldset`, `FieldsetRootProvider`, `FieldsetLegend`, `FieldsetHelperText`, and
  `FieldsetErrorText`.
- Preserve Ark IDs, refs, and root state without remapping.
- Keep the native `fieldset` and `legend` semantics.

## Current behavior contract

- `Fieldset` is the styled Ark root.
- `disabled`, `invalid`, and `id` pass directly to Ark.
- `useFieldset` is re-exported from `@moduix/react` for the supported `RootProvider` path.
- `FieldsetContext` and `useFieldsetContext` are re-exported for descendants that read fieldset
  state.
- `FieldsetErrorText` renders only while the root is invalid.
- `FieldsetHelperText` and active error text are connected through `aria-describedby`.
- legacy `render`, callback class names, flat part aliases, and compatibility adapters are removed.

## Anatomy and exported parts

```text
Fieldset | FieldsetRootProvider
├─ FieldsetLegend
├─ grouped controls
├─ FieldsetHelperText (optional)
└─ FieldsetErrorText (optional)
```

| Part                   | `data-slot`              | Element/role                       |
| ---------------------- | ------------------------ | ---------------------------------- |
| `Fieldset`             | `fieldset-root`          | Native `fieldset`; owns state.     |
| `FieldsetRootProvider` | `fieldset-root-provider` | Native `fieldset`; external state. |
| `FieldsetLegend`       | `fieldset-legend`        | Native `legend`.                   |
| `FieldsetHelperText`   | `fieldset-helper-text`   | Descriptive `span`.                |
| `FieldsetErrorText`    | `fieldset-error-text`    | Conditional polite-live `span`.    |

`FieldsetContext` and `useFieldsetContext` expose the state returned by `useFieldset`; they do not
render an additional DOM part.

## Composition

```tsx
import { Field } from '@moduix/react/field';
import { Fieldset, FieldsetHelperText, FieldsetLegend } from '@moduix/react/fieldset';

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

Use `asChild` with one semantic child when replacing a part's host. Use `useFieldset` from
`@moduix/react` with `FieldsetRootProvider`; use `FieldsetContext` or `useFieldsetContext` in a
descendant that reads its state. Do not render `Fieldset` around the same state instance.

## Upstream feature coverage

- Basic grouped fields and native controls are supported.
- Ark `Field`, checkbox, radio-group, and select compositions work as nested controls.
- Root Provider is exposed through moduix `useFieldset` and `FieldsetRootProvider`.
- `FieldsetContext` and `useFieldsetContext` are available from `@moduix/react` for Ark-shaped
  state reads.
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
- `FieldsetContext` accepts a render function; `useFieldsetContext` returns the same context in a
  descendant.

## Defaults and styling

All DOM parts accept `className`; wrappers add stable `data-slot` hooks. Root and provider share the
same visual defaults. Long legends, helper text, and errors wrap without overflowing their container.
Public variables cover root layout/borders, legend spacing and typography, disabled and invalid state,
and helper/error text typography and color.

## Intentional sugar and differences from upstream

- moduix supplies CSS Module defaults, design-token fallbacks, CSS variables, and `data-slot`.
- The root is exposed as the flat `<Fieldset>` component.
- No Chakra-only content wrapper or legacy flat aliases are added.

## Agent notes

- Keep the visual parts, `RootProvider`, `useFieldset`, `Context`, and `useFieldsetContext` aligned
  with Ark's fieldset state contract.
- Keep `ErrorText` conditional; do not duplicate its visibility logic.
- Do not restore `render`; Ark composition uses `asChild`.
- Keep docs examples on the flat API.

## Local changelog

- 2026-08-10: Added a dedicated error-text weight token and resilient wrapping for long fieldset text.

- 2026-07-27: Documented the existing `Context` and `useFieldsetContext` exports.

- 2026-07-10: Re-exported `useFieldset` for the supported `RootProvider` composition path.

- 2026-07-02: Simplified the public surface to match other Ark-backed wrappers; preserved
  `RootProvider` and visual parts while removing re-exported Ark hooks, context parts, and type
  aliases from `moduix`.
- 2026-06-25: Audited the Ark UI fieldset migration against upstream docs and runtime behavior;
  clarified disabled versus invalid propagation and synchronized docs examples with the short root
  component form.
- 2026-06-19: Migrated to Ark UI 5.37.2; added the complete anatomy, provider/context
  surface, invalid/helper/error semantics, Ark state styling, and namespace-first exports; removed
  legacy flat aliases and `render`.
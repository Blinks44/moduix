# Checkbox

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/checkbox
- Chakra UI: https://chakra-ui.com/docs/components/checkbox

## Purpose

`Checkbox` is the moduix wrapper around Ark UI Checkbox for standalone boolean or indeterminate
selection and grouped multi-select state.

## Upstream model to preserve

- Use Ark React primitives from `@ark-ui/react/checkbox`.
- Preserve Ark namespace parts needed for ordinary composition: `Root`, `RootProvider`, `Control`,
  `Indicator`, `Label`, and `Group`. The native form input is internal to `Root` and `RootProvider`.
- Preserve Ark callback shapes:
  - `Checkbox.Root` uses `onCheckedChange(details)` and `details.checked`
  - `Checkbox.Group` uses `onValueChange(value)`
- Preserve Ark native input for form submission, native validation, and form reset.
- Preserve Ark `asChild` behavior. `Checkbox.Root` renders a `label`; an `asChild` replacement must
  also be a direct semantic `label`.

## Current behavior contract

- `Checkbox` is `Checkbox.Root` with namespace parts attached.
- `Checkbox.Root` accepts Ark root props plus the moduix-only `size` prop.
- `Checkbox.RootProvider` accepts Ark provider props plus the same moduix-only `size` prop.
- `Checkbox.Control`, `Checkbox.Label`, and `Checkbox.Group` are thin styled Ark part wrappers.
- `Checkbox.Root` and `Checkbox.RootProvider` append Ark's native form input automatically. It is
  not a public moduix part.
- `Checkbox.Control` renders the default checked and indeterminate indicators when `children` is
  omitted.
- `Checkbox.Indicator` renders default moduix icons when `children` is omitted.
- `size` defaults to `md` and writes `data-size` on `Root` and `RootProvider`.
- `Checkbox` re-exports `useCheckbox()` and `useCheckboxGroup()` through the moduix barrel for
  state ownership flows that pair naturally with `RootProvider` and `Group`.
- Ark context parts, provider helpers beyond `RootProvider`, and Ark duplicate type aliases are not
  re-exported from moduix.

## Anatomy and exported parts

Standalone checkbox:

```text
Checkbox.Root
├─ Checkbox.Control
│  ├─ Checkbox.Indicator
│  └─ Checkbox.Indicator[indeterminate] (optional)
├─ Checkbox.Label
└─ native input (automatic)
```

External checkbox state:

```text
Checkbox.RootProvider[value]
└─ same child parts connected to useCheckbox()
```

Grouped checkboxes:

```text
Checkbox.Group
└─ Checkbox.Root[value]
   ├─ Checkbox.Control
   ├─ Checkbox.Label
   └─ native input (automatic)
```

| Part                    | `data-slot`                             | Notes                                                |
| ----------------------- | --------------------------------------- | ---------------------------------------------------- |
| `Checkbox.Root`         | `checkbox-root`                         | Styled Ark root. Accepts Ark root props plus `size`. |
| `Checkbox.RootProvider` | `checkbox-root-provider`                | Styled Ark provider. Accepts Ark props plus `size`.  |
| `Checkbox.Control`      | `checkbox-control`                      | Styled Ark control with state styles.                |
| `Checkbox.Indicator`    | `checkbox-indicator`                    | Defaults to moduix icons when children are omitted.  |
| checked icon            | `checkbox-indicator-checked-icon`       | Default check icon wrapper.                          |
| indeterminate icon      | `checkbox-indicator-indeterminate-icon` | Default indeterminate icon wrapper.                  |
| `Checkbox.Label`        | `checkbox-label`                        | Styled Ark label.                                    |
| `Checkbox.Group`        | `checkbox-group`                        | Styled Ark group root for shared value state.        |

## Composition

Standalone checkbox:

```tsx
import { Checkbox } from '@moduix/react';

export function CheckboxDemo() {
  return (
    <Checkbox.Root defaultChecked>
      <Checkbox.Control />
      <Checkbox.Label>Enable notifications</Checkbox.Label>
    </Checkbox.Root>
  );
}
```

Grouped selection:

```tsx
import { Checkbox } from '@moduix/react';

const options = [
  { value: 'email', label: 'Email updates' },
  { value: 'push', label: 'Push notifications' },
  { value: 'sms', label: 'SMS alerts' },
];

export function CheckboxGroupDemo() {
  return (
    <Checkbox.Group defaultValue={['email']} name="notifications">
      {options.map((option) => (
        <Checkbox.Root key={option.value} value={option.value}>
          <Checkbox.Control />
          <Checkbox.Label>{option.label}</Checkbox.Label>
        </Checkbox.Root>
      ))}
    </Checkbox.Group>
  );
}
```

Provider state:

```tsx
import { Checkbox, useCheckbox } from '@moduix/react';

export function CheckboxProviderDemo() {
  const checkbox = useCheckbox({ defaultChecked: true });

  return (
    <Checkbox.RootProvider value={checkbox}>
      <Checkbox.Control />
      <Checkbox.Label>Managed outside the tree</Checkbox.Label>
    </Checkbox.RootProvider>
  );
}
```

## Upstream feature coverage

- Basic/default checked: supported through Ark `Root`, `Control`, `Indicator`, and `Label`.
- Controlled standalone state: supported with `checked` and `onCheckedChange(details)`.
- Root provider: supported with Ark `useCheckbox` and `Checkbox.RootProvider`.
- Disabled/read-only/invalid/required state: passed through to Ark and styled through Ark data
  attributes.
- Indeterminate state: supported with `checked="indeterminate"` and the default `Checkbox.Control`
  sugar. Render `Checkbox.Indicator indeterminate` explicitly only for custom icon composition.
- Field/form integration: pass `name`, `form`, and validation props to `Root` or `RootProvider`;
  the native form input is rendered automatically.
- Group state: supported with `Checkbox.Group`, controlled `value`, `onValueChange(value)`,
  `maxSelectedValues`, invalid state, native form submission, and `Fieldset` composition.
- Select-all composition: regular controlled composition; no custom local select-all prop remains.
- Ark `asChild` and `ids`: passed through unchanged by the wrapped parts.

## Accessibility and state

- Ark owns keyboard interaction, label semantics, hidden input synchronization, form reset, form
  submission, and state data attributes.
- Forwarded refs target the underlying Ark DOM part for every wrapped part.
- `Checkbox.Root` and `Checkbox.RootProvider` render a `label` by default.
- `Checkbox.Root` and `Checkbox.RootProvider` always render the native form input. `name` and
  related root props opt it into native form participation.
- `Checkbox.RootProvider` pairs with moduix `useCheckbox()` for external state ownership.
- `Checkbox.Group` also pairs with moduix `useCheckboxGroup()` when group state needs to live
  outside the rendered subtree.
- State attributes exposed by Ark include `data-active`, `data-focus`, `data-focus-visible`,
  `data-hover`, `data-disabled`, `data-readonly`, `data-invalid`, `data-required`, and
  `data-state="checked" | "indeterminate" | "unchecked"` on the relevant root/control/indicator/label
  parts.
- `Checkbox.Group` propagates group state to nested checkbox roots through Ark group context.

## Defaults and styling

- moduix ships styled defaults; Ark is unstyled.
- Public CSS variables are declared in `packages/react/src/styles/theme.css` and
  documented in `apps/docs/docs/en/docs/checkbox.mdx`.
- Styling uses local classes plus Ark state data attributes. No legacy state selectors are used in
  `Checkbox.module.css`.
- `Checkbox.Control` owns visual state styles for checked, indeterminate, invalid, disabled, hover,
  and focus-visible states.
- `Checkbox.Root` and `Checkbox.RootProvider` write `data-size` so size tokens can scale the control
  and default icon.
- `Checkbox.Indicator` default icon wrappers expose stable checked/indeterminate `data-slot` values.

## Intentional sugar and differences from upstream

- `Checkbox.Root` and `Checkbox.RootProvider` add `size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'`.
- `Checkbox.Control` renders the default checked and indeterminate indicator pair when it has no
  children.
- `Checkbox.Indicator` renders `CheckIcon` or `IndeterminateIcon` when no children are provided.
- The wrapper adds stable `data-slot` hooks for moduix styling.
- moduix keeps `RootProvider` and re-exports `useCheckbox()` plus `useCheckboxGroup()` for the
  common external-state path.
- Ark render-prop context, group provider helpers, and Ark duplicate type aliases still stay on the
  Ark package when needed.
- Removed legacy API and compatibility props: flat `CheckboxIndicator`, `CheckboxField`,
  `CheckboxLabel`, separate `CheckboxGroup`, `render`, `nativeButton`, `uncheckedValue`, `inputRef`,
  `allValues`, and `parent`.

## Agent notes

- Keep `Checkbox` Ark-shaped. Do not reintroduce a second public group component.
- Keep the common path on `Checkbox.Control` sugar and reserve explicit `Checkbox.Indicator` usage
  for custom indicator composition.
- Keep the moduix-owned advanced surface narrow: `RootProvider`, `useCheckbox()`, and
  `useCheckboxGroup()` are enough.
- If data-slot names, CSS variables, or provider support changes, update stories, docs, local
  markdown, theme tokens, and registry artifacts in the same task.

## Local changelog

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-13: Native form controls are now rendered automatically; the former public form-control part was removed.

- 2026-07-09: Re-exported `useCheckbox()` and `useCheckboxGroup()` from the moduix checkbox barrel
  so documented provider flows stay on `@moduix/react`; reordered public docs examples for easier
  scanning.
- 2026-07-07: Added `Checkbox.Control` default indicator sugar so common usage no longer needs
  explicit checked and indeterminate indicator parts; updated recommended docs/examples accordingly.
- 2026-07-02: Simplified the public checkbox surface to keep visual parts, `Group`,
  `RootProvider`, `size`, and default indicator sugar while removing moduix re-exports for Ark
  hooks, `Context`, `GroupProvider`, and Ark duplicate type aliases.
- 2026-06-24: Finalized Ark migration audit by mirroring missing Ark part prop types, typing
  `RootProvider.size`, aligning disabled/hover styles to Ark data attributes, and fixing docs form
  examples to pass `name`.
- 2026-06-18: Completed Ark parity audit by exposing `RootProvider`, `GroupProvider`, `Context`,
  `useCheckbox`, `useCheckboxContext`, `useCheckboxGroup`, `useCheckboxGroupContext`, and related
  types from the public checkbox barrel.
- 2026-06-18: Expanded docs and stories to cover Ark standalone, provider, context, form, field,
  group, group provider, max-selected, select-all, invalid, and fieldset patterns.
- 2026-06-18: Migrated `Checkbox` to Ark UI, adopted the Ark namespace API
  (`Checkbox.Root`, `Checkbox.Control`, `Checkbox.Indicator`, `Checkbox.Label`,
  the native form input, `Checkbox.Group`), and removed the standalone `CheckboxGroup` component.
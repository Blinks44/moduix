# Checkbox

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/checkbox
- Chakra UI: https://chakra-ui.com/docs/components/checkbox

## Purpose

`Checkbox` is the moduix wrapper around Ark UI Checkbox for standalone boolean or indeterminate
selection and grouped multi-select state.

## Upstream model to preserve

- Use Ark React primitives from `@ark-ui/react/checkbox`.
- Preserve Ark namespace parts needed for ordinary composition as flat exports: `Control`,
  `Indicator`, `Label`, `Group`, `HiddenInput`, and `RootProvider`.
- Preserve Ark callback shapes:
  - the root uses `onCheckedChange(details)` and `details.checked`
  - `CheckboxGroup` uses `onValueChange(value)`
- Preserve Ark native input for form submission, native validation, and form reset.
- Preserve Ark `asChild` behavior. The root renders a `label`; an `asChild` replacement must also be
  a direct semantic `label`.

## Current behavior contract

- `Checkbox` is the only public root value.
- The root accepts Ark root props plus the moduix-only `size` prop.
- `CheckboxRootProvider` accepts Ark provider props plus the same moduix-only `size` prop.
- `CheckboxControl`, `CheckboxLabel`, and `CheckboxGroup` are thin styled Ark part wrappers.
- `CheckboxHiddenInput` exposes Ark's native checkbox. Compose it explicitly inside the root or
  `CheckboxRootProvider`; it is required for native interaction and form participation.
- `CheckboxControl` renders the default checked and indeterminate indicators when `children` is
  omitted.
- `CheckboxIndicator` renders default moduix icons when `children` are omitted.
- `size` defaults to `md` and writes `data-size` on the root and `CheckboxRootProvider`.
- The barrel re-exports `useCheckbox()` and `useCheckboxGroup()` for advanced state ownership flows.
  Pair `useCheckboxGroup()` with Ark's `GroupProvider` when that escape hatch is needed.
- `CheckboxContext`, `useCheckboxContext()`, and `useCheckboxGroupContext()` preserve Ark state
  reads through the moduix barrel. `GroupProvider` remains an Ark-only escape hatch.

## Anatomy and exported parts

Standalone checkbox:

```text
Checkbox
├─ CheckboxControl
│  ├─ CheckboxIndicator
│  └─ CheckboxIndicator[indeterminate] (optional)
├─ CheckboxLabel
└─ CheckboxHiddenInput (explicit)
```

External checkbox state:

```text
CheckboxRootProvider[value]
└─ same child parts connected to useCheckbox()
```

Grouped checkboxes:

```text
CheckboxGroup
└─ Checkbox[value]
   ├─ CheckboxControl
   ├─ CheckboxLabel
   └─ CheckboxHiddenInput (explicit)
```

| Part                        | `data-slot`                             | Notes                                                |
| --------------------------- | --------------------------------------- | ---------------------------------------------------- |
| `Checkbox`                  | `checkbox-root`                         | Styled Ark root. Accepts Ark root props plus `size`. |
| `CheckboxRootProvider`      | `checkbox-root-provider`                | Styled Ark provider. Accepts Ark props plus `size`.  |
| `CheckboxControl`           | `checkbox-control`                      | Styled Ark control with state styles.                |
| `CheckboxIndicator`         | `checkbox-indicator`                    | Defaults to moduix icons when children are omitted.  |
| checked icon                | `checkbox-indicator-checked-icon`       | Default check icon wrapper.                          |
| indeterminate icon          | `checkbox-indicator-indeterminate-icon` | Default indeterminate icon wrapper.                  |
| `CheckboxLabel`             | `checkbox-label`                        | Styled Ark label.                                    |
| `CheckboxGroup`             | `checkbox-group`                        | Styled Ark group root for shared value state.        |
| `CheckboxContext`           | -                                       | Render-prop access to current checkbox state.        |
| `useCheckboxContext()`      | -                                       | Hook access to current checkbox state.               |
| `useCheckboxGroup()`        | -                                       | Creates group state for Ark `GroupProvider`.         |
| `useCheckboxGroupContext()` | -                                       | Hook access to the nearest checkbox group state.     |

## Composition

Standalone checkbox:

```tsx
import {
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/react/checkbox';

export function CheckboxDemo() {
  return (
    <Checkbox defaultChecked>
      <CheckboxControl />
      <CheckboxLabel>Enable notifications</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
  );
}
```

Grouped selection:

```tsx
import {
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/react/checkbox';

const options = [
  { value: 'email', label: 'Email updates' },
  { value: 'push', label: 'Push notifications' },
  { value: 'sms', label: 'SMS alerts' },
];

export function CheckboxGroupDemo() {
  return (
    <CheckboxGroup defaultValue={['email']} name="notifications">
      {options.map((option) => (
        <Checkbox key={option.value} value={option.value}>
          <CheckboxControl />
          <CheckboxLabel>{option.label}</CheckboxLabel>
          <CheckboxHiddenInput />
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
```

Provider state:

```tsx
import {
  Checkbox,
  CheckboxControl,
  CheckboxLabel,
  CheckboxHiddenInput,
  useCheckbox,
} from '@moduix/react/checkbox';

export function CheckboxProviderDemo() {
  const checkbox = useCheckbox({ defaultChecked: true });

  return (
    <CheckboxRootProvider value={checkbox}>
      <CheckboxControl />
      <CheckboxLabel>Managed outside the tree</CheckboxLabel>
      <CheckboxHiddenInput />
    </CheckboxRootProvider>
  );
}
```

## Upstream feature coverage

- Basic/default checked: supported through the Ark-shaped root, `CheckboxControl`,
  `CheckboxIndicator`, and `CheckboxLabel`.
- Controlled standalone state: supported with `checked` and `onCheckedChange(details)`.
- Root provider: supported with Ark `useCheckbox` and `CheckboxRootProvider`.
- Context state: supported with `CheckboxContext`, `useCheckboxContext()`, and
  `useCheckboxGroupContext()` from moduix.
- Disabled/read-only/invalid/required state: passed through to Ark and styled through Ark data
  attributes.
- Indeterminate state: supported with `checked="indeterminate"` and the default `CheckboxControl`
  sugar. Render `CheckboxIndicator indeterminate` explicitly only for custom icon composition.
- Field/form integration: pass `name`, `form`, and validation props to the root or
  `CheckboxRootProvider`, and render `CheckboxHiddenInput` explicitly.
- Group state: supported with `CheckboxGroup`, controlled `value`, `onValueChange(value)`,
  `maxSelectedValues`, invalid state, native form submission, and `Fieldset` composition.
- Select-all composition: regular controlled composition; no custom local select-all prop remains.
- Ark `asChild` and `ids`: passed through unchanged by the wrapped parts.

## Accessibility and state

- Ark owns keyboard interaction, label semantics, hidden input synchronization, form reset, form
  submission, and state data attributes.
- Forwarded refs target the matching Ark DOM part: the root/root provider renders a `label`, the
  control and indicator render `div`s, the label renders a `span`, and the group renders a `div`.
- Pressing <kbd>Space</kbd> toggles the focused checkbox; Ark preserves this keyboard behavior.
- The root and `CheckboxRootProvider` render a `label` by default.
- `CheckboxHiddenInput` renders the native form input. `name` and related root props opt it into
  native form participation.
- Ark's native input owns interaction prevention and state synchronization.
- `CheckboxRootProvider` pairs with moduix `useCheckbox()` for external state ownership.
- `CheckboxGroup` also pairs with moduix `useCheckboxGroup()` when group state needs to live
  outside the rendered subtree.
- State attributes exposed by Ark include `data-active`, `data-focus`, `data-focus-visible`,
  `data-hover`, `data-disabled`, `data-readonly`, `data-invalid`, `data-required`, and
  `data-state="checked" | "indeterminate" | "unchecked"` on the relevant root/control/indicator/label
  parts.
- `CheckboxGroup` propagates group state to nested checkbox roots through Ark group context.

## Defaults and styling

- moduix ships styled defaults; Ark is unstyled.
- Public CSS variables are declared in `packages/foundation/src/styles/variables-moduix.css` and
  documented in `website/docs/en/docs/checkbox.mdx`.
- Styling uses local classes plus Ark state data attributes. No legacy state selectors are used in
  `Checkbox.module.css`.
- `CheckboxControl` owns visual state styles for checked, indeterminate, invalid, disabled, hover,
  and focus-visible states.
- Checked and invalid hover backgrounds and the invalid focus ring have independent public
  variables with fallbacks to their broader checked, invalid, and border variables.
- `--moduix-checkbox-group-color` cascades to nested labels unless an individual
  `--moduix-checkbox-label-color` overrides it.
- The root and `CheckboxRootProvider` write `data-size` so size tokens can scale the control
  and default icon.
- `CheckboxIndicator` default icon wrappers expose stable checked/indeterminate `data-slot` values.

## Intentional sugar and differences from upstream

- The root and `CheckboxRootProvider` add `size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'`.
- `CheckboxControl` renders the default checked and indeterminate indicator pair when it has no
  children.
- `CheckboxIndicator` renders `CheckIcon` or `IndeterminateIcon` when no children are provided.
- The wrapper adds stable `data-slot` hooks for moduix styling.
- moduix keeps `CheckboxRootProvider` and re-exports `useCheckbox()` plus `useCheckboxGroup()`
  for the common external-state path.
- moduix also re-exports `CheckboxContext`, `useCheckboxContext()`, and
  `useCheckboxGroupContext()` without translating their Ark contracts. `GroupProvider` and Ark
  duplicate type aliases stay on the Ark package when needed.
- Removed legacy API and compatibility props: flat `CheckboxIndicator`, `CheckboxField`,
  `CheckboxLabel`, separate `CheckboxGroup`, `render`, `nativeButton`, `uncheckedValue`, `inputRef`,
  `allValues`, and `parent`.

## Agent notes

- Keep `Checkbox` Ark-shaped. Do not reintroduce a second public group component.
- Keep the common path on `CheckboxControl` sugar and reserve explicit `CheckboxIndicator` usage
  for custom indicator composition.
- Keep the moduix-owned advanced surface Ark-shaped: `CheckboxRootProvider`, `CheckboxContext`,
  `useCheckbox()`, `useCheckboxContext()`, `useCheckboxGroup()`, and `useCheckboxGroupContext()`.
- If data-slot names, CSS variables, or provider support changes, update stories, docs, local
  markdown, theme tokens, and registry artifacts in the same task.

## Local changelog

- 2026-09-21: Replaced the compound `Checkbox.*` value surface with the shared flat API across
  React, React Tailwind, Solid, and Solid Tailwind. The root is the only public `Checkbox`
  value; `CheckboxRootProvider`, `CheckboxContext`, `CheckboxHiddenInput`, `CheckboxControl`,
  `CheckboxIndicator`, `CheckboxLabel`, and `CheckboxGroup` are flat exports, and hooks stay
  top-level `use*` exports. Removed `Object.assign` namespace assembly and `Checkbox` and
  other dotted aliases without compatibility shims.
- 2026-08-09: Added read-only accessibility semantics, independent checked/invalid hover and invalid
  focus-ring theming hooks, group label color inheritance, and release-gate coverage for refs, form
  reset, states, and realistic content.
- 2026-09-04: Exposed Ark `HiddenInput` explicitly and removed root child mutation.
- 2026-07-26: Documented the shipped context and state-hook exports, hidden input, and
  ref/keyboard contract.
- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-13: Native form controls were rendered automatically at this point in the wrapper history.

- 2026-07-09: Re-exported `useCheckbox()` and `useCheckboxGroup()` from the moduix checkbox barrel
  so documented provider flows stay on `@moduix/react`; reordered public docs examples for easier
  scanning.
- 2026-07-07: Added `CheckboxControl` default indicator sugar so common usage no longer needs
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
  (`Checkbox`, `CheckboxControl`, `CheckboxIndicator`, `CheckboxLabel`,
  the native form input, `CheckboxGroup`), and removed the standalone `CheckboxGroup` component.
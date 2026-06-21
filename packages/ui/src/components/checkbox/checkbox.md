# Checkbox

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/checkbox
- Chakra UI: https://chakra-ui.com/docs/components/checkbox

## Purpose

`Checkbox` is the moduix wrapper around Ark UI Checkbox for standalone boolean or indeterminate
selection and grouped multi-select state.

## Upstream model to preserve

- Use Ark React primitives from `@ark-ui/react/checkbox`.
- Preserve Ark namespace parts: `Root`, `RootProvider`, `Control`, `Indicator`, `HiddenInput`,
  `Label`, `Context`, `Group`, and `GroupProvider`.
- Preserve Ark hooks and state access exports: `useCheckbox`, `useCheckboxContext`,
  `useCheckboxGroup`, and `useCheckboxGroupContext`.
- Preserve Ark callback shapes:
  - `Checkbox.Root` uses `onCheckedChange(details)` and `details.checked`
  - `Checkbox.Group` uses `onValueChange(value)`
- Preserve Ark `HiddenInput` for form submission, native validation, and form reset.
- Preserve Ark `asChild` behavior. `Checkbox.Root` renders a `label`; an `asChild` replacement must
  also be a direct semantic `label`.

## Current behavior contract

- `Checkbox` is `Checkbox.Root` with namespace parts attached.
- `Checkbox.Root` accepts Ark root props plus the moduix-only `size` prop.
- `Checkbox.RootProvider` accepts Ark provider props plus the same moduix-only `size` prop.
- `Checkbox.Control`, `Checkbox.HiddenInput`, `Checkbox.Label`, `Checkbox.Group`, and
  `Checkbox.GroupProvider` are thin styled Ark part wrappers.
- `Checkbox.Indicator` renders default moduix icons when `children` is omitted.
- `Checkbox.Context` is the direct Ark render-prop context part.
- `size` defaults to `md` and writes `data-size` on `Root` and `RootProvider`.

## Anatomy and exported parts

Standalone checkbox:

```text
Checkbox.Root
├─ Checkbox.Control
│  ├─ Checkbox.Indicator
│  └─ Checkbox.Indicator[indeterminate] (optional)
├─ Checkbox.Label
├─ Checkbox.HiddenInput
└─ Checkbox.Context (optional)
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
   └─ Checkbox.HiddenInput
```

External group state:

```text
Checkbox.GroupProvider[value]
└─ Checkbox.Root[value] items connected to useCheckboxGroup()
```

| Part                     | `data-slot`                             | Notes                                                |
| ------------------------ | --------------------------------------- | ---------------------------------------------------- |
| `Checkbox.Root`          | `checkbox-root`                         | Styled Ark root. Accepts Ark root props plus `size`. |
| `Checkbox.RootProvider`  | `checkbox-root-provider`                | Styled Ark provider. Accepts `size`.                 |
| `Checkbox.Control`       | `checkbox-control`                      | Styled Ark control with state styles.                |
| `Checkbox.Indicator`     | `checkbox-indicator`                    | Defaults to moduix icons when children are omitted.  |
| checked icon             | `checkbox-indicator-checked-icon`       | Default check icon wrapper.                          |
| indeterminate icon       | `checkbox-indicator-indeterminate-icon` | Default indeterminate icon wrapper.                  |
| `Checkbox.Label`         | `checkbox-label`                        | Styled Ark label.                                    |
| `Checkbox.HiddenInput`   | `checkbox-hidden-input`                 | Ark hidden input for forms.                          |
| `Checkbox.Context`       | none                                    | Ark render-prop state reader; no DOM part.           |
| `Checkbox.Group`         | `checkbox-group`                        | Styled Ark group root for shared value state.        |
| `Checkbox.GroupProvider` | `checkbox-group-provider`               | Styled Ark group provider.                           |

## Composition

Standalone checkbox:

```tsx
import { Checkbox } from 'moduix';

export function CheckboxDemo() {
  return (
    <Checkbox.Root defaultChecked>
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label>Enable notifications</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  );
}
```

Grouped selection:

```tsx
import { Checkbox } from 'moduix';

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
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>{option.label}</Checkbox.Label>
          <Checkbox.HiddenInput />
        </Checkbox.Root>
      ))}
    </Checkbox.Group>
  );
}
```

Provider state:

```tsx
import { Checkbox, useCheckbox } from 'moduix';

export function CheckboxProviderDemo() {
  const checkbox = useCheckbox({ defaultChecked: true });

  return (
    <Checkbox.RootProvider value={checkbox}>
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label>Managed outside the tree</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.RootProvider>
  );
}
```

## Upstream feature coverage

- Basic/default checked: supported through Ark `Root`, `Control`, `Indicator`, `Label`, and
  `HiddenInput`.
- Controlled standalone state: supported with `checked` and `onCheckedChange(details)`.
- Root provider: supported with `useCheckbox` and `Checkbox.RootProvider`.
- Disabled/read-only/invalid/required state: passed through to Ark and styled through Ark data
  attributes.
- Indeterminate state: supported with `checked="indeterminate"` and an explicit
  `Checkbox.Indicator indeterminate` part.
- Field/form integration: supported with `HiddenInput`; examples use moduix `Field`/`Fieldset`
  wrappers until those wrappers migrate from legacy.
- Context access: supported with `Checkbox.Context` and `useCheckboxContext`.
- Group state: supported with `Checkbox.Group`, controlled `value`, `onValueChange(value)`,
  `maxSelectedValues`, invalid state, native form submission, and `Fieldset` composition.
- Group provider: supported with `useCheckboxGroup` and `Checkbox.GroupProvider`.
- Select-all composition: regular controlled composition; no custom local select-all prop remains.
- Ark `asChild` and `ids`: passed through unchanged by the wrapped parts.

## Accessibility and state

- Ark owns keyboard interaction, label semantics, hidden input synchronization, form reset, form
  submission, and state data attributes.
- Forwarded refs target the underlying Ark DOM part for every wrapped part.
- `Checkbox.Root` and `Checkbox.RootProvider` render a `label` by default.
- `Checkbox.HiddenInput` renders the input that participates in native forms. Keep it in examples
  and production usage when form behavior matters.
- State attributes exposed by Ark include `data-active`, `data-focus`, `data-focus-visible`,
  `data-hover`, `data-disabled`, `data-readonly`, `data-invalid`, `data-required`, and
  `data-state="checked" | "indeterminate" | "unchecked"` on the relevant root/control/indicator/label
  parts.
- `Checkbox.Group` propagates group state to nested checkbox roots through Ark group context.

## Defaults and styling

- moduix ships styled defaults; Ark is unstyled.
- Public CSS variables are declared in `packages/ui/src/styles/theme.css` and documented in
  `apps/docs/content/docs/checkbox.mdx`.
- Styling uses local classes plus Ark state data attributes. No legacy state selectors are used in
  `Checkbox.module.css`.
- `Checkbox.Control` owns visual state styles for checked, indeterminate, invalid, disabled, hover,
  and focus-visible states.
- `Checkbox.Root` and `Checkbox.RootProvider` write `data-size` so size tokens can scale the control
  and default icon.
- `Checkbox.Indicator` default icon wrappers expose stable checked/indeterminate `data-slot` values.

## Intentional sugar and differences from upstream

- `Checkbox.Root` and `Checkbox.RootProvider` add `size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'`.
- `Checkbox.Indicator` renders `CheckIcon` or `IndeterminateIcon` when no children are provided.
- The wrapper adds stable `data-slot` hooks for moduix styling.
- Removed legacy API and compatibility props: flat `CheckboxIndicator`, `CheckboxField`,
  `CheckboxLabel`, separate `CheckboxGroup`, `render`, `nativeButton`, `uncheckedValue`, `inputRef`,
  `allValues`, and `parent`.

## Agent notes

- Keep `Checkbox` Ark-shaped. Do not reintroduce a second public group component.
- Keep checked and indeterminate indicators explicit in docs/examples.
- Keep provider/context/hooks exported from both `Checkbox.tsx` and `index.ts`.
- If data-slot names, CSS variables, or provider support changes, update stories, docs, local markdown,
  theme tokens, and registry artifacts in the same task.

## Local changelog

- 2026-06-18: Completed Ark parity audit by exposing `RootProvider`, `GroupProvider`, `Context`,
  `useCheckbox`, `useCheckboxContext`, `useCheckboxGroup`, `useCheckboxGroupContext`, and related
  types from the public checkbox barrel.
- 2026-06-18: Expanded docs and stories to cover Ark standalone, provider, context, form, field,
  group, group provider, max-selected, select-all, invalid, and fieldset patterns.
- 2026-06-18: Migrated `Checkbox` to Ark UI, adopted the Ark namespace API
  (`Checkbox.Root`, `Checkbox.Control`, `Checkbox.Indicator`, `Checkbox.Label`,
  `Checkbox.HiddenInput`, `Checkbox.Group`), and removed the standalone `CheckboxGroup` component.
# Checkbox

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/checkbox

## Purpose

`Checkbox` is the moduix wrapper around Ark UI Checkbox for standalone selection and grouped
multi-select state.

The wrapper keeps Ark state, hidden input behavior, and keyboard accessibility intact while adding
moduix default styles, CSS variables, stable `data-slot` hooks, and one DX prop: `size` on
`Checkbox.Root`.

## Upstream model to preserve

- Use Ark parts directly: `Root`, `Control`, `Indicator`, `Label`, `HiddenInput`, and `Group`.
- Keep Ark callback shapes unchanged:
  - `Checkbox.Root` uses `onCheckedChange(details)` and `details.checked`
  - `Checkbox.Group` uses `onValueChange(value)`
- Keep grouped selection on `Checkbox.Group` instead of inventing a second public component.
- Keep checked and indeterminate indicator composition explicit.

## Current behavior contract

- `Checkbox.Root` is the primary export surface and forwards Ark root behavior plus `size`.
- `Checkbox.Control` is the visual control surface and owns state styling.
- `Checkbox.Indicator` renders a default moduix icon when `children` is omitted:
  - checked indicator: `CheckIcon`
  - indeterminate indicator: `IndeterminateIcon` when `indeterminate` is set
- `Checkbox.HiddenInput` forwards the Ark hidden input for form integration.
- `Checkbox.Label` is the styled Ark label part.
- `Checkbox.Group` is the Ark group root with moduix layout styling.
- `size` defaults to `md` and writes `data-size` on `Checkbox.Root`.

## Anatomy and exported parts

Standalone checkbox:

```text
Checkbox.Root
├─ Checkbox.Control
│  └─ Checkbox.Indicator
├─ Checkbox.Label
└─ Checkbox.HiddenInput
```

Grouped checkboxes:

```text
Checkbox.Group
└─ Checkbox.Root[value]
   ├─ Checkbox.Control
   ├─ Checkbox.Label
   └─ Checkbox.HiddenInput
```

| Part                   | `data-slot`                             | Notes                                                |
| ---------------------- | --------------------------------------- | ---------------------------------------------------- |
| `Checkbox.Root`        | `checkbox-root`                         | Styled Ark root. Accepts Ark root props plus `size`. |
| `Checkbox.Control`     | `checkbox-control`                      | Styled Ark control with state styles.                |
| `Checkbox.Indicator`   | `checkbox-indicator`                    | Defaults to moduix icons when children are omitted.  |
| checked icon           | `checkbox-indicator-checked-icon`       | Default check icon wrapper.                          |
| indeterminate icon     | `checkbox-indicator-indeterminate-icon` | Default indeterminate icon wrapper.                  |
| `Checkbox.Label`       | `checkbox-label`                        | Styled Ark label.                                    |
| `Checkbox.HiddenInput` | `checkbox-hidden-input`                 | Ark hidden input for forms.                          |
| `Checkbox.Group`       | `checkbox-group`                        | Styled Ark group root for shared value state.        |

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

Indeterminate checkbox:

```tsx
<Checkbox.Root checked="indeterminate">
  <Checkbox.Control>
    <Checkbox.Indicator />
    <Checkbox.Indicator indeterminate />
  </Checkbox.Control>
  <Checkbox.Label>Select all</Checkbox.Label>
  <Checkbox.HiddenInput />
</Checkbox.Root>
```

## Public props

`Checkbox.Root` accepts Ark checkbox root props plus:

| Prop   | Type                                   | Default | Notes                                                           |
| ------ | -------------------------------------- | ------- | --------------------------------------------------------------- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md`    | Scales the control and default indicator through CSS variables. |

Common `Checkbox.Root` props:

| Prop              | Notes                                                              |
| ----------------- | ------------------------------------------------------------------ |
| `checked`         | Controlled checked state. Use `boolean` or `'indeterminate'`.      |
| `defaultChecked`  | Initial uncontrolled checked state.                                |
| `onCheckedChange` | Ark callback. Read the next state from `details.checked`.          |
| `disabled`        | Prevents interaction and applies disabled state attributes/styles. |
| `readOnly`        | Keeps the value visible while preventing user changes.             |
| `invalid`         | Applies invalid state attributes/styles.                           |
| `required`        | Participates in native validation.                                 |
| `name`, `value`   | Hidden input form submission props.                                |
| `form`            | Associates the hidden input with a specific form.                  |
| `ids`             | Ark element id overrides for composition.                          |
| `asChild`         | Ark polymorphic ownership escape hatch.                            |

`Checkbox.Group` accepts Ark group props. Common public props:

| Prop                | Notes                                                            |
| ------------------- | ---------------------------------------------------------------- |
| `value`             | Controlled selected values.                                      |
| `defaultValue`      | Initial uncontrolled selected values.                            |
| `onValueChange`     | Ark callback. Receives the next `string[]` directly.             |
| `disabled`          | Disables all checkboxes in the group.                            |
| `readOnly`          | Makes the group read-only.                                       |
| `invalid`           | Marks the group invalid.                                         |
| `maxSelectedValues` | Limits how many values can be selected.                          |
| `name`              | Name used by hidden inputs inside the group for form submission. |

## Styling API

Ark state attributes come from the real Ark parts. The component styles rely on:

- `Checkbox.Root`: `data-size`, `data-disabled`, `data-readonly`, `data-invalid`
- `Checkbox.Control`: `data-state="checked" | "indeterminate" | "unchecked"`,
  `data-disabled`, `data-readonly`, `data-invalid`, `data-focus-visible`
- `Checkbox.Label`: Ark label state attributes
- `Checkbox.Group`: Ark group state attributes when present

Public CSS variables:

| Variable                          | Default fallback                  | Purpose                                 |
| --------------------------------- | --------------------------------- | --------------------------------------- |
| `--checkbox-bg`                   | `var(--color-background)`         | Unchecked background.                   |
| `--checkbox-bg-checked`           | `var(--color-primary)`            | Checked and indeterminate background.   |
| `--checkbox-bg-hover`             | `var(--color-accent)`             | Unchecked hover background.             |
| `--checkbox-bg-invalid`           | `var(--color-destructive)`        | Checked invalid background.             |
| `--checkbox-border-color`         | `var(--color-border)`             | Unchecked border color.                 |
| `--checkbox-border-color-checked` | `var(--color-primary)`            | Checked and indeterminate border color. |
| `--checkbox-border-color-invalid` | `var(--color-destructive)`        | Invalid border and focus ring color.    |
| `--checkbox-border-width`         | `var(--border-width-sm)`          | Control border width.                   |
| `--checkbox-color`                | `var(--color-primary-foreground)` | Built-in indicator icon color.          |
| `--checkbox-color-invalid`        | `var(--color-primary-foreground)` | Checked invalid indicator icon color.   |
| `--checkbox-disabled-opacity`     | `var(--opacity-disabled)`         | Disabled opacity.                       |
| `--checkbox-focus-ring-color`     | `var(--color-ring)`               | Focus ring color.                       |
| `--checkbox-focus-ring-offset`    | `var(--border-width-sm)`          | Focus ring offset.                      |
| `--checkbox-focus-ring-width`     | `var(--border-width-sm)`          | Focus ring width.                       |
| `--checkbox-gap`                  | `var(--spacing-2)`                | Gap between control and label.          |
| `--checkbox-group-color`          | `var(--color-foreground)`         | Text color for grouped content.         |
| `--checkbox-group-gap`            | `var(--spacing-2)`                | Gap between checkbox rows in a group.   |
| `--checkbox-icon-size-xs`         | `0.5rem`                          | Default icon size for `size="xs"`.      |
| `--checkbox-icon-size-sm`         | `0.625rem`                        | Default icon size for `size="sm"`.      |
| `--checkbox-icon-size-md`         | `0.75rem`                         | Default icon size for `size="md"`.      |
| `--checkbox-icon-size-lg`         | `0.875rem`                        | Default icon size for `size="lg"`.      |
| `--checkbox-icon-size-xl`         | `1rem`                            | Default icon size for `size="xl"`.      |
| `--checkbox-label-color`          | `var(--color-foreground)`         | Label text color.                       |
| `--checkbox-label-font-size`      | `var(--text-sm)`                  | Label font size.                        |
| `--checkbox-label-font-weight`    | `var(--weight-medium)`            | Label font weight.                      |
| `--checkbox-label-line-height`    | `var(--line-height-text-sm)`      | Label line height.                      |
| `--checkbox-radius`               | `var(--radius-xs)`                | Control border radius.                  |
| `--checkbox-size-xs`              | `0.875rem`                        | Control size for `size="xs"`.           |
| `--checkbox-size-sm`              | `1rem`                            | Control size for `size="sm"`.           |
| `--checkbox-size-md`              | `1.25rem`                         | Control size for `size="md"`.           |
| `--checkbox-size-lg`              | `1.5rem`                          | Control size for `size="lg"`.           |
| `--checkbox-size-xl`              | `1.75rem`                         | Control size for `size="xl"`.           |
| `--checkbox-transition`           | `var(--transition-default)`       | State transition timing.                |

## Intentional sugar and differences from upstream

- moduix ships pre-styled defaults; Ark is intentionally unstyled.
- `Checkbox.Root` accepts a moduix-only `size` prop.
- `Checkbox.Indicator` renders default icons when `children` are omitted.

## Breaking changes from the Base UI surface

- Removed flat exports such as `CheckboxIndicator`, `CheckboxField`, and `CheckboxLabel`.
- Removed the separate `CheckboxGroup` component and its helper parts. Use `Checkbox.Group`.
- Removed Base UI-only escape hatches and props that no longer match Ark, including `render`,
  `nativeButton`, `uncheckedValue`, `inputRef`, `allValues`, and `parent`.
- Group select-all is now regular controlled composition instead of a custom group prop pair.

## Agent notes

- Keep `Checkbox` Ark-shaped. Do not reintroduce a second `CheckboxGroup` wrapper.
- Keep checked and indeterminate indicators explicit in docs/examples.
- Keep Ark callback/state shapes unchanged.
- If `data-slot` names or CSS variables change, update docs, stories, theme tokens, and registry in
  the same task.

## Local changelog

- 2026-06-18: Migrated `Checkbox` from Base UI to Ark UI, adopted the Ark namespace API
  (`Checkbox.Root`, `Checkbox.Control`, `Checkbox.Indicator`, `Checkbox.Label`,
  `Checkbox.HiddenInput`, `Checkbox.Group`), and removed the standalone `CheckboxGroup` component.
- 2026-06-18: Rewrote local docs and examples around the Ark mental model, including grouped
  selection, fieldset composition, and explicit indeterminate/select-all composition.
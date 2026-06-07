# Checkbox

Upstream primitive docs: https://base-ui.com/react/components/checkbox

## Purpose

`Checkbox` is the moduix checkbox control for boolean and mixed selection states. It is a thin
styled wrapper over the Base UI checkbox root with moduix defaults, CSS Modules styling, exported
composition parts, and one small DX prop: `size`.

Use it for standalone options, form checkboxes, and checkbox controls inside `CheckboxGroup`.

## Current behavior contract

- `Checkbox` forwards Base UI root behavior and props, including controlled/uncontrolled state,
  `indeterminate`, form props, `disabled`, `readOnly`, `required`, `inputRef`, `nativeButton`, and
  `render`.
- `Checkbox` renders a default `CheckboxIndicator` when `children` is omitted.
- `CheckboxIndicator` renders a default `CheckboxIndicatorIcon` when `children` is omitted.
- `CheckboxIndicatorIcon` renders both built-in icons and CSS switches between checked and
  indeterminate visuals using state attributes from `CheckboxIndicator`.
- `size` defaults to `md` and writes `data-size` on the root. Supported values are `xs`, `sm`,
  `md`, `lg`, and `xl`.
- `className` on `Checkbox` is merged with the root class via `mergeClassName`, so state callback
  class names from Base UI continue to work.
- `CheckboxField` is a wrapping `<label>` for the common clickable-label layout.
- `CheckboxLabel` is a styled `<span>` for label text; it does not create labeling by itself unless
  it is inside a real label or paired through native label semantics.

## Composition

Default standalone checkbox:

```tsx
import { Checkbox, CheckboxField, CheckboxLabel } from 'moduix';

export function CheckboxDemo() {
  return (
    <CheckboxField>
      <Checkbox defaultChecked />
      <CheckboxLabel>Enable notifications</CheckboxLabel>
    </CheckboxField>
  );
}
```

Manual indicator composition:

```tsx
import {
  Checkbox,
  CheckboxField,
  CheckboxIndicator,
  CheckboxIndicatorIcon,
  CheckboxLabel,
} from 'moduix';

export function CustomCheckboxDemo() {
  return (
    <CheckboxField>
      <Checkbox defaultChecked>
        <CheckboxIndicator keepMounted>
          <CheckboxIndicatorIcon />
        </CheckboxIndicator>
      </Checkbox>
      <CheckboxLabel>Compose the indicator tree manually</CheckboxLabel>
    </CheckboxField>
  );
}
```

Sibling-label layouts should render the root as a native button and connect it with `id`/`htmlFor`:

```tsx
import { Checkbox } from 'moduix';
import { useId } from 'react';

export function SiblingLabelCheckboxDemo() {
  const id = useId();

  return (
    <div>
      <Checkbox id={id} nativeButton render={<button />} defaultChecked />
      <label htmlFor={id}>Keep me signed in</label>
    </div>
  );
}
```

Inside `CheckboxGroup`, prefer `CheckboxGroupItemControl`. It composes `Checkbox` and keeps group
state ownership clear.

## Exported parts

| Part                    | Element/primitive             | Purpose                                                                 |
| ----------------------- | ----------------------------- | ----------------------------------------------------------------------- |
| `Checkbox`              | `CheckboxPrimitive.Root`      | Interactive root, hidden input/form integration, state, and `size`.     |
| `CheckboxIndicator`     | `CheckboxPrimitive.Indicator` | Optional checked/mixed-state visual container.                          |
| `CheckboxIndicatorIcon` | `span`                        | Default icon wrapper for the built-in checked and indeterminate icons.  |
| `CheckboxField`         | `label`                       | Optional inline field wrapper that makes the label text clickable.      |
| `CheckboxLabel`         | `span`                        | Optional text wrapper that applies checkbox label typography variables. |

## Public props

`Checkbox` accepts `CheckboxPrimitive.Root.Props` plus:

| Prop   | Type                                   | Default | Notes                                                   |
| ------ | -------------------------------------- | ------- | ------------------------------------------------------- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md`    | Scales the root and default icon through CSS variables. |

Common forwarded root props:

| Prop              | Notes                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------- |
| `defaultChecked`  | Initial uncontrolled checked state.                                                   |
| `checked`         | Controlled checked state. Use with `onCheckedChange`.                                 |
| `onCheckedChange` | Called by Base UI when the checked state changes.                                     |
| `indeterminate`   | Mixed visual/state for parent-selection scenarios.                                    |
| `name`, `value`   | Hidden input form submission props.                                                   |
| `uncheckedValue`  | Value submitted when unchecked, if non-native unchecked submission is needed.         |
| `disabled`        | Prevents interaction and applies disabled state attributes/styles.                    |
| `readOnly`        | Keeps the current state visible while preventing user changes.                        |
| `required`        | Participates in native/Base UI validation.                                            |
| `inputRef`        | Ref for the hidden input managed by Base UI.                                          |
| `nativeButton`    | Use with `render={<button />}` for sibling labels.                                    |
| `render`          | Base UI render replacement/callback escape hatch.                                     |
| `className`       | Root class name or Base UI state callback class name; merged with moduix root styles. |
| `children`        | Replaces the default indicator composition.                                           |

`CheckboxIndicator` accepts Base UI indicator props, including `className`, state callback
`className`, `keepMounted`, `render`, and `children`.

`CheckboxIndicatorIcon`, `CheckboxField`, and `CheckboxLabel` accept native props for their rendered
elements.

## Styling API

Public `data-slot` values:

| Part                    | `data-slot`                             |
| ----------------------- | --------------------------------------- |
| `Checkbox`              | `checkbox-root`                         |
| `CheckboxIndicator`     | `checkbox-indicator`                    |
| `CheckboxIndicatorIcon` | `checkbox-indicator-icon`               |
| checked icon span       | `checkbox-indicator-checked-icon`       |
| indeterminate icon span | `checkbox-indicator-indeterminate-icon` |
| `CheckboxField`         | `checkbox-field`                        |
| `CheckboxLabel`         | `checkbox-label`                        |

State and validation attributes come from Base UI. The component styles rely on:

- root: `data-checked`, `data-unchecked`, `data-indeterminate`, `data-disabled`, `data-readonly`,
  and `data-size`;
- indicator: `data-checked`, `data-unchecked`, and `data-indeterminate`.

Public CSS variables:

| Variable                          | Default fallback                  | Purpose                                 |
| --------------------------------- | --------------------------------- | --------------------------------------- |
| `--checkbox-bg`                   | `var(--color-background)`         | Unchecked background.                   |
| `--checkbox-bg-checked`           | `var(--color-primary)`            | Checked and indeterminate background.   |
| `--checkbox-bg-hover`             | `var(--color-accent)`             | Unchecked hover background.             |
| `--checkbox-border-color`         | `var(--color-border)`             | Unchecked border color.                 |
| `--checkbox-border-color-checked` | `var(--color-primary)`            | Checked and indeterminate border color. |
| `--checkbox-border-width`         | `var(--border-width-sm)`          | Root border width.                      |
| `--checkbox-color`                | `var(--color-primary-foreground)` | Built-in indicator icon color.          |
| `--checkbox-disabled-opacity`     | `var(--opacity-disabled)`         | Disabled opacity.                       |
| `--checkbox-focus-ring-color`     | `var(--color-ring)`               | Focus ring color.                       |
| `--checkbox-focus-ring-offset`    | `var(--border-width-sm)`          | Focus ring offset.                      |
| `--checkbox-focus-ring-width`     | `var(--border-width-sm)`          | Focus ring width.                       |
| `--checkbox-gap`                  | `var(--spacing-2)`                | Gap between `CheckboxField` children.   |
| `--checkbox-icon-size-xs`         | `0.5rem`                          | Default icon size for `size="xs"`.      |
| `--checkbox-icon-size-sm`         | `0.625rem`                        | Default icon size for `size="sm"`.      |
| `--checkbox-icon-size-md`         | `0.75rem`                         | Default icon size for `size="md"`.      |
| `--checkbox-icon-size-lg`         | `0.875rem`                        | Default icon size for `size="lg"`.      |
| `--checkbox-icon-size-xl`         | `1rem`                            | Default icon size for `size="xl"`.      |
| `--checkbox-label-color`          | `var(--color-foreground)`         | `CheckboxLabel` text color.             |
| `--checkbox-label-font-size`      | `var(--text-sm)`                  | `CheckboxLabel` font size.              |
| `--checkbox-label-font-weight`    | `var(--weight-medium)`            | `CheckboxLabel` font weight.            |
| `--checkbox-label-line-height`    | `var(--line-height-text-sm)`      | `CheckboxLabel` line height.            |
| `--checkbox-radius`               | `var(--radius-xs)`                | Root border radius.                     |
| `--checkbox-size-xs`              | `0.875rem`                        | Root size for `size="xs"`.              |
| `--checkbox-size-sm`              | `1rem`                            | Root size for `size="sm"`.              |
| `--checkbox-size-md`              | `1.25rem`                         | Root size for `size="md"`.              |
| `--checkbox-size-lg`              | `1.5rem`                          | Root size for `size="lg"`.              |
| `--checkbox-size-xl`              | `1.75rem`                         | Root size for `size="xl"`.              |
| `--checkbox-transition`           | `var(--transition-default)`       | Root state transition timing.           |

Use `className` on the part that owns the visual concern. For root shape/colors, style `Checkbox`.
For icon-specific styling or animation, compose and style `CheckboxIndicator` or
`CheckboxIndicatorIcon`.

## UX and accessibility

- Every checkbox must have an accessible name. The recommended default is
  `CheckboxField` + `CheckboxLabel`.
- Use `nativeButton render={<button />}` for sibling `label htmlFor` layouts. The default Base UI
  element is intended to work well inside wrapping labels.
- Use `readOnly` when the value is visible but user changes are not allowed; use `disabled` when the
  control is unavailable.
- `disabled` also disables pointer events on the visual root; the wrapping label cursor is neutralized
  through `:has()`.
- Keyboard interaction, focus management, validation attributes, hidden input behavior, and ARIA
  state are owned by Base UI and should not be reimplemented in the wrapper.
- `indeterminate` is a mixed state, not a third submitted value. Keep submitted form values explicit
  with `checked`/`value`/group state when the distinction matters.

## Intentional differences from Base UI

- moduix exports flat parts (`Checkbox`, `CheckboxIndicator`, etc.) instead of the upstream
  namespaced `Checkbox.Root` API.
- The default indicator and built-in checked/indeterminate icons are rendered automatically.
- Styling is not unstyled: CSS Modules, `data-slot`, `data-size`, and `--checkbox-*` variables are
  part of the public styling contract.
- `size` is a moduix-only convenience prop.
- The local docs should not mirror the upstream API reference. Link to Base UI for full primitive
  details and keep this file focused on the moduix wrapper contract.

## Agent notes

- Keep `Checkbox`, `Radio`, and `Switch` aligned: thin root wrappers, default internal visual part,
  explicit composition parts, `size` values, `CheckboxField`/`RadioField`/`SwitchField`, and
  `CheckboxLabel`/`RadioLabel`/`SwitchLabel`.
- Do not add `classNames`, `slotProps`, render helpers, or icon props unless a real repeated moduix
  use case appears. Composition already covers custom indicators.
- Do not export prop aliases that only restate Base UI primitive props.
- Preserve `mergeClassName` on primitive parts so Base UI state callback class names keep working.
- If CSS variables or data-slot names change, update `theme.css`, Storybook, docs examples, and this
  file in the same task.

## Local changelog

- Rewrote the local documentation to describe the actual moduix Checkbox wrapper, styling contract,
  composition model, and current DX sugar instead of the upstream Base UI documentation.
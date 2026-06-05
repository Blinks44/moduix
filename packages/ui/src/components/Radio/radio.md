# Radio

Upstream primitive docs: https://base-ui.com/react/components/radio

## Purpose

`Radio` is the moduix single-choice control. It is a thin styled wrapper over Base UI radio and
radio-group primitives with moduix defaults, exported composition parts, CSS Modules styling, and
one small DX prop: `size`.

Use it when the user must choose exactly one option from a set.

## Current behavior contract

- `Radio` is intended to be used inside `RadioGroup`. `RadioGroup` owns group semantics, roving
  focus, keyboard navigation, value state, and form submission behavior.
- `Radio` renders a default `RadioIndicator` when `children` is omitted.
- `RadioIndicator` renders a default `RadioIndicatorIcon` when `children` is omitted.
- `RadioIndicatorIcon` renders the dot itself via CSS. To replace the visual entirely, compose
  custom children through `RadioIndicator`, not through `RadioIndicatorIcon`.
- `size` defaults to `md` and writes `data-size` on `Radio`. Supported values are `xs`, `sm`, `md`,
  `lg`, and `xl`.
- `className` on `Radio`, `RadioIndicator`, and `RadioGroup` is merged with moduix classes via
  `mergeClassName`, so Base UI state callback class names continue to work.
- `RadioField` is the default clickable-label wrapper for one radio item.
- `RadioLabel` is a styled text span only. It does not create labeling unless it is inside a real
  `<label>` or connected with native label semantics.
- `RadioGroupLabel` and `RadioGroupList` are optional layout helpers. They do not add group
  semantics by themselves.
- `RadioIndicator keepMounted={false}` is the default Base UI behavior. When `keepMounted` is
  `true`, the indicator stays in the DOM and moduix hides the unchecked state with
  `[data-unchecked]`, which is useful for CSS transitions.

## Composition

Basic group:

```tsx
import { useId } from 'react';
import { Radio, RadioField, RadioGroup, RadioGroupLabel, RadioGroupList, RadioLabel } from 'moduix';

export function RadioDemo() {
  const labelId = useId();

  return (
    <RadioGroup aria-labelledby={labelId} defaultValue="team">
      <RadioGroupLabel id={labelId}>Account type</RadioGroupLabel>
      <RadioGroupList>
        <RadioField>
          <Radio value="personal" />
          <RadioLabel>Personal</RadioLabel>
        </RadioField>
        <RadioField>
          <Radio value="team" />
          <RadioLabel>Team</RadioLabel>
        </RadioField>
      </RadioGroupList>
    </RadioGroup>
  );
}
```

Sibling label pattern with a native button:

```tsx
import { useId } from 'react';
import { Radio, RadioGroup } from 'moduix';

export function SiblingLabelRadioDemo() {
  const id = useId();
  const labelId = useId();

  return (
    <div>
      <div id={labelId}>Delivery method</div>
      <RadioGroup aria-labelledby={labelId} defaultValue="email">
        <Radio id={id} nativeButton render={<button />} value="email" />
      </RadioGroup>
      <label htmlFor={id}>Email</label>
    </div>
  );
}
```

Custom indicator composition:

```tsx
import { type ComponentProps, useId } from 'react';
import {
  Radio,
  RadioField,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupList,
  RadioIndicator,
  RadioLabel,
} from 'moduix';

function DiamondIcon(props: ComponentProps<'svg'>) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 12 12" {...props}>
      <path d="M6 1.5L10.5 6L6 10.5L1.5 6L6 1.5Z" fill="currentColor" />
    </svg>
  );
}

export function CustomRadioDemo() {
  const labelId = useId();

  return (
    <RadioGroup aria-labelledby={labelId} defaultValue="team">
      <RadioGroupLabel id={labelId}>Account type</RadioGroupLabel>
      <RadioGroupList>
        <RadioField>
          <Radio value="personal">
            <RadioIndicator>
              <DiamondIcon />
            </RadioIndicator>
          </Radio>
          <RadioLabel>Personal</RadioLabel>
        </RadioField>
        <RadioField>
          <Radio value="team" />
          <RadioLabel>Team</RadioLabel>
        </RadioField>
      </RadioGroupList>
    </RadioGroup>
  );
}
```

Form integration:

```tsx
import {
  Field,
  FieldItem,
  Fieldset,
  FieldsetLegend,
  Radio,
  RadioField,
  RadioGroup,
  RadioLabel,
} from 'moduix';

export function RadioFieldsetDemo() {
  return (
    <Field name="storageType">
      <Fieldset render={<RadioGroup defaultValue="ssd" />}>
        <FieldsetLegend>Storage type</FieldsetLegend>
        <FieldItem>
          <RadioField>
            <Radio value="ssd" />
            <RadioLabel>SSD</RadioLabel>
          </RadioField>
        </FieldItem>
        <FieldItem>
          <RadioField>
            <Radio value="hdd" />
            <RadioLabel>HDD</RadioLabel>
          </RadioField>
        </FieldItem>
      </Fieldset>
    </Field>
  );
}
```

## Exported parts

| Part                 | Element/primitive          | Purpose                                                                   |
| -------------------- | -------------------------- | ------------------------------------------------------------------------- |
| `Radio`              | `RadioPrimitive.Root`      | Interactive radio root, hidden input/form integration, state, and `size`. |
| `RadioIndicator`     | `RadioPrimitive.Indicator` | Optional checked-state visual container.                                  |
| `RadioIndicatorIcon` | `span`                     | Built-in dot visual rendered by CSS.                                      |
| `RadioField`         | `label`                    | Optional clickable wrapper for one radio and its text.                    |
| `RadioLabel`         | `span`                     | Optional text wrapper with radio label typography.                        |
| `RadioGroup`         | `RadioGroupPrimitive`      | Shared value state, keyboard navigation, and form submission.             |
| `RadioGroupLabel`    | `div`                      | Optional group heading. Must be wired to `RadioGroup` manually.           |
| `RadioGroupList`     | `div`                      | Optional layout wrapper for radio items.                                  |

## Public props

`Radio` accepts `RadioPrimitive.Root.Props<Value>` plus:

| Prop   | Type                                   | Default | Notes                                               |
| ------ | -------------------------------------- | ------- | --------------------------------------------------- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md`    | Scales the root and default dot through CSS values. |

Common forwarded `Radio` props:

| Prop           | Notes                                                                                 |
| -------------- | ------------------------------------------------------------------------------------- |
| `value`        | Required. The unique identifying value of the radio inside its `RadioGroup`.          |
| `disabled`     | Prevents interaction and applies disabled state attributes/styles.                    |
| `readOnly`     | Keeps the current selection visible while preventing user changes.                    |
| `required`     | Participates in native/Base UI validation.                                            |
| `inputRef`     | Ref for the hidden input managed by Base UI.                                          |
| `nativeButton` | Use with `render={<button />}` for sibling labels.                                    |
| `render`       | Base UI element replacement/callback escape hatch.                                    |
| `className`    | Root class name or Base UI state callback class name; merged with moduix root styles. |
| `children`     | Replaces the default `RadioIndicator` composition.                                    |

`RadioGroup` accepts `RadioGroupPrimitive.Props<Value>`, including:

| Prop              | Notes                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------- |
| `value`           | Controlled selected value. Use with `onValueChange`.                                    |
| `defaultValue`    | Initial uncontrolled selected value.                                                    |
| `onValueChange`   | Called as `(value, details)` when the selected item changes.                            |
| `name`, `form`    | Hidden input form submission props applied across the group.                            |
| `disabled`        | Disables the whole group.                                                               |
| `readOnly`        | Keeps the current selection visible while blocking changes across the group.            |
| `required`        | Marks the group as required for validation.                                             |
| `inputRef`        | Ref for the hidden input managed by Base UI.                                            |
| `className`       | Group class name or Base UI state callback class name; merged with moduix group styles. |
| `aria-labelledby` | Recommended way to give the group an accessible name when using `RadioGroupLabel`.      |

`RadioIndicator` accepts Base UI indicator props, including `className`, `keepMounted`,
`render`, and `children`.

`RadioIndicatorIcon`, `RadioField`, `RadioLabel`, `RadioGroupLabel`, and `RadioGroupList`
accept native props for their rendered elements.

## Styling API

Public `data-slot` values:

| Part                 | `data-slot`            |
| -------------------- | ---------------------- |
| `Radio`              | `radio-root`           |
| `RadioIndicator`     | `radio-indicator`      |
| `RadioIndicatorIcon` | `radio-indicator-icon` |
| `RadioField`         | `radio-field`          |
| `RadioLabel`         | `radio-label`          |
| `RadioGroup`         | `radio-group-root`     |
| `RadioGroupLabel`    | `radio-group-label`    |
| `RadioGroupList`     | `radio-group-list`     |

Important state attributes from Base UI:

- `Radio`: `data-checked`, `data-unchecked`, `data-disabled`, `data-readonly`, `data-required`,
  `data-valid`, `data-invalid`, `data-dirty`, `data-touched`, `data-filled`, `data-focused`, and
  moduix `data-size`.
- `RadioIndicator`: `data-checked`, `data-unchecked`, `data-starting-style`, and
  `data-ending-style`.
- `RadioGroup`: at minimum `data-disabled`; additional group state is available through Base UI
  state callbacks on `className` and `style`.

Public CSS variables:

| Variable                          | Default fallback                  | Purpose                                      |
| --------------------------------- | --------------------------------- | -------------------------------------------- |
| `--radio-bg`                      | `var(--color-background)`         | Unchecked background.                        |
| `--radio-bg-checked`              | `var(--color-primary)`            | Checked background.                          |
| `--radio-bg-hover`                | `var(--color-accent)`             | Unchecked hover background.                  |
| `--radio-border-color`            | `var(--color-border)`             | Unchecked border color.                      |
| `--radio-border-color-checked`    | `var(--color-primary)`            | Checked border color.                        |
| `--radio-border-width`            | `var(--border-width-sm)`          | Root border width.                           |
| `--radio-disabled-opacity`        | `var(--opacity-disabled)`         | Disabled opacity.                            |
| `--radio-focus-ring-color`        | `var(--color-ring)`               | Focus ring color.                            |
| `--radio-focus-ring-offset`       | `var(--border-width-sm)`          | Focus ring offset.                           |
| `--radio-focus-ring-width`        | `var(--border-width-sm)`          | Focus ring width.                            |
| `--radio-gap`                     | `var(--spacing-2)`                | Gap between `RadioField` children.           |
| `--radio-group-color`             | `var(--color-foreground)`         | Group text color.                            |
| `--radio-group-gap`               | `var(--spacing-2)`                | Gap between group label and list.            |
| `--radio-group-label-color`       | `var(--radio-group-color)`        | `RadioGroupLabel` text color.                |
| `--radio-group-label-font-size`   | `var(--text-sm)`                  | `RadioGroupLabel` font size.                 |
| `--radio-group-label-font-weight` | `var(--weight-semibold)`          | `RadioGroupLabel` font weight.               |
| `--radio-group-label-line-height` | `var(--line-height-text-sm)`      | `RadioGroupLabel` line height.               |
| `--radio-group-list-gap`          | `var(--spacing-2)`                | Gap between radio items in `RadioGroupList`. |
| `--radio-indicator-border-color`  | `currentColor`                    | Built-in dot border color.                   |
| `--radio-indicator-border-width`  | `0`                               | Built-in dot border width.                   |
| `--radio-indicator-color`         | `var(--color-primary-foreground)` | Built-in dot color.                          |
| `--radio-indicator-radius`        | `var(--radius-full)`              | Built-in dot radius.                         |
| `--radio-indicator-size-xs`       | `0.25rem`                         | Dot size for `size="xs"`.                    |
| `--radio-indicator-size-sm`       | `0.375rem`                        | Dot size for `size="sm"`.                    |
| `--radio-indicator-size-md`       | `0.5rem`                          | Dot size for `size="md"`.                    |
| `--radio-indicator-size-lg`       | `0.625rem`                        | Dot size for `size="lg"`.                    |
| `--radio-indicator-size-xl`       | `0.75rem`                         | Dot size for `size="xl"`.                    |
| `--radio-label-color`             | `var(--color-foreground)`         | `RadioLabel` text color.                     |
| `--radio-label-font-size`         | `var(--text-sm)`                  | `RadioLabel` font size.                      |
| `--radio-label-font-weight`       | `var(--weight-medium)`            | `RadioLabel` font weight.                    |
| `--radio-label-line-height`       | `var(--line-height-text-sm)`      | `RadioLabel` line height.                    |
| `--radio-size-xs`                 | `0.875rem`                        | Root size for `size="xs"`.                   |
| `--radio-size-sm`                 | `1rem`                            | Root size for `size="sm"`.                   |
| `--radio-size-md`                 | `1.25rem`                         | Root size for `size="md"`.                   |
| `--radio-size-lg`                 | `1.5rem`                          | Root size for `size="lg"`.                   |
| `--radio-size-xl`                 | `1.75rem`                         | Root size for `size="xl"`.                   |
| `--radio-transition`              | `var(--transition-default)`       | Root state transition timing.                |

`size` works by setting internal underscored CSS variables on `Radio` and letting the default
indicator inherit them. Keep `RadioIndicator` and `RadioIndicatorIcon` inside the `Radio` tree if
you want built-in size scaling for custom composition.

Use `className` on the part that owns the visual concern:

- style `Radio` for shape, border, background, focus ring, and size-driven states;
- style `RadioIndicator` when replacing or animating the checked-state container;
- style `RadioIndicatorIcon` only when keeping the built-in dot shape;
- style `RadioField`, `RadioLabel`, `RadioGroupLabel`, and `RadioGroupList` for layout and
  typography adjustments.

## UX and accessibility

- Every `RadioGroup` needs an accessible name.
- `RadioGroupLabel` is a plain `<div>` and does **not** label the group automatically. Pair
  `RadioGroupLabel id={labelId}` with `RadioGroup aria-labelledby={labelId}`.
- The simplest per-item labeling pattern is `RadioField` + `RadioLabel`, because the radio sits
  inside a real `<label>`.
- Use `nativeButton render={<button />}` only for sibling `label htmlFor` layouts. The default root
  works best inside wrapping labels.
- `RadioGroupList` is layout-only. It does not replace `RadioGroup`.
- `readOnly` keeps the current selection visible while preventing changes. `disabled` makes the
  control unavailable and applies disabled styling.
- Keyboard navigation, roving focus, hidden input management, ARIA state, and validation behavior
  are owned by Base UI and should stay delegated to the primitive.
- In `Field`/`Fieldset` integration, keep `RadioGroup` as the semantic group root and use
  `FieldsetLegend` for the group label.

## Intentional differences from Base UI

- moduix exports flat parts (`Radio`, `RadioGroup`, `RadioIndicator`, etc.) instead of namespaced
  `Radio.Root` / `RadioGroup` composition.
- Styling is not unstyled: CSS Modules, `data-slot`, `data-size`, and `--radio-*` variables are
  part of the public wrapper contract.
- `Radio` auto-renders a default indicator tree.
- `size` is a moduix-only convenience prop.
- `RadioField`, `RadioLabel`, `RadioGroupLabel`, and `RadioGroupList` are wrapper-level helper
  parts for common layouts.
- The local docs describe the moduix wrapper contract, not the full upstream API reference.

## Agent notes

- Keep `Radio`, `Checkbox`, and `Switch` aligned as thin wrappers with explicit parts, a single
  `size` prop, and no parallel slot-prop/class-map customization APIs.
- Preserve `mergeClassName` on primitive-backed parts so Base UI state callback class names keep
  working.
- Keep `RadioIndicatorIcon` as the CSS dot implementation. If a task needs a different checked
  visual, compose it through `RadioIndicator`.
- If `data-slot` names, CSS variables, stories, or recommended labeling patterns change, update this
  file in the same task.

## Local changelog

- Rewrote the local documentation to describe the actual moduix `Radio` and `RadioGroup`
  composition, styling contract, accessibility requirements, and current wrapper-specific behavior.
- Added a button-appearance reset on `Radio` so the documented `nativeButton render={<button />}`
  pattern stays visually consistent across browsers.
- Simplified the form integration story to use `RadioField`/`RadioLabel`, matching the default
  composition shown in the docs and preview.
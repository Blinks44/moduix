# CheckboxGroup

Upstream primitive docs: https://base-ui.com/react/components/checkbox-group

## Purpose

`CheckboxGroup` is the moduix wrapper for a set of checkboxes that share one selected-value array.
It keeps Base UI group behavior intact and adds moduix composition parts, CSS Modules styling, and
`data-slot` hooks for the common label/list/item layout.

Use it when several checkboxes represent one logical field, including controlled selections,
disabled groups, read-only item controls, form fieldsets, and select-all parent checkbox patterns.

## Current behavior contract

- `CheckboxGroup` forwards Base UI checkbox group props, including `value`, `defaultValue`,
  `onValueChange`, `allValues`, `disabled`, `required`, `name`, `form`, `aria-labelledby`,
  `className`, `style`, and `render`.
- `CheckboxGroup` does not render a visible label by itself. Pair `CheckboxGroupLabel` with
  `aria-labelledby`, or use `Field`/`Fieldset` for form labeling.
- `CheckboxGroupItemControl` composes `Checkbox`, so it inherits the checkbox default indicator,
  `size`, form props, `parent`, `nativeButton`, `inputRef`, `render`, and custom indicator
  composition.
- `CheckboxGroupItem` is a styled wrapping `<label>` based on `CheckboxField`. It makes the default
  row clickable when the control and label are children of the item.
- Group-level `disabled` is owned by Base UI and flows to item controls. `CheckboxGroup` does not
  support a group-level `readOnly` prop in the current primitive version; use `readOnly` on
  `CheckboxGroupItemControl` for item-level read-only behavior.
- Select-all behavior uses the Base UI `allValues` prop on `CheckboxGroup` and the `parent` prop on
  a `CheckboxGroupItemControl`.

## Composition

Recommended default path:

```tsx
import {
  CheckboxGroup,
  CheckboxGroupItem,
  CheckboxGroupItemControl,
  CheckboxGroupItemLabel,
  CheckboxGroupLabel,
  CheckboxGroupList,
} from 'moduix';
import { useId } from 'react';

const options = [
  { value: 'email', label: 'Email updates' },
  { value: 'push', label: 'Push notifications' },
  { value: 'sms', label: 'SMS alerts' },
];

export function CheckboxGroupDemo() {
  const labelId = useId();

  return (
    <CheckboxGroup defaultValue={['email']} aria-labelledby={labelId}>
      <CheckboxGroupLabel id={labelId}>Notification Channels</CheckboxGroupLabel>
      <CheckboxGroupList>
        {options.map((option) => (
          <CheckboxGroupItem key={option.value}>
            <CheckboxGroupItemControl value={option.value} name="notifications" />
            <CheckboxGroupItemLabel>{option.label}</CheckboxGroupItemLabel>
          </CheckboxGroupItem>
        ))}
      </CheckboxGroupList>
    </CheckboxGroup>
  );
}
```

Use the lower-level checkbox parts when the row structure should not be the default
`CheckboxGroupItem` layout:

```tsx
import {
  Checkbox,
  CheckboxField,
  CheckboxGroup,
  CheckboxGroupLabel,
  CheckboxGroupList,
  CheckboxLabel,
} from 'moduix';
import { useId } from 'react';

export function FieldCompositionDemo() {
  const labelId = useId();

  return (
    <CheckboxGroup defaultValue={['email']} aria-labelledby={labelId}>
      <CheckboxGroupLabel id={labelId}>Channels</CheckboxGroupLabel>
      <CheckboxGroupList>
        <CheckboxField>
          <Checkbox value="email" name="channels" />
          <CheckboxLabel>Email updates</CheckboxLabel>
        </CheckboxField>
      </CheckboxGroupList>
    </CheckboxGroup>
  );
}
```

Select-all parent checkbox:

```tsx
import {
  CheckboxGroup,
  CheckboxGroupItem,
  CheckboxGroupItemControl,
  CheckboxGroupItemLabel,
  CheckboxGroupLabel,
  CheckboxGroupList,
} from 'moduix';
import { useId, useState } from 'react';

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'orange', label: 'Orange' },
  { value: 'pear', label: 'Pear' },
];

export function ParentCheckboxGroupDemo() {
  const labelId = useId();
  const [value, setValue] = useState([] as string[]);

  return (
    <CheckboxGroup
      value={value}
      onValueChange={setValue}
      allValues={fruitOptions.map((option) => option.value)}
      aria-labelledby={labelId}
    >
      <CheckboxGroupLabel id={labelId}>Fruits</CheckboxGroupLabel>
      <CheckboxGroupList>
        <CheckboxGroupItem>
          <CheckboxGroupItemControl parent />
          <CheckboxGroupItemLabel>Select all</CheckboxGroupItemLabel>
        </CheckboxGroupItem>

        {fruitOptions.map((option) => (
          <CheckboxGroupItem key={option.value}>
            <CheckboxGroupItemControl value={option.value} />
            <CheckboxGroupItemLabel>{option.label}</CheckboxGroupItemLabel>
          </CheckboxGroupItem>
        ))}
      </CheckboxGroupList>
    </CheckboxGroup>
  );
}
```

## Exported parts

| Part                       | Element/primitive         | Purpose                                                               |
| -------------------------- | ------------------------- | --------------------------------------------------------------------- |
| `CheckboxGroup`            | `CheckboxGroupPrimitive`  | Shared selected-value state and group-level form/disabled behavior.   |
| `CheckboxGroupLabel`       | `div`                     | Optional visible group heading. Pair its `id` with `aria-labelledby`. |
| `CheckboxGroupList`        | `div`                     | Optional vertical layout wrapper for rows.                            |
| `CheckboxGroupItem`        | `CheckboxField` / `label` | Default clickable row wrapper for one control and one item label.     |
| `CheckboxGroupItemControl` | `Checkbox`                | Interactive checkbox control for an item or parent checkbox.          |
| `CheckboxGroupItemLabel`   | `CheckboxLabel` / `span`  | Styled item label text.                                               |

## Public props

`CheckboxGroup` accepts Base UI checkbox group props. Common public props:

| Prop            | Notes                                                                         |
| --------------- | ----------------------------------------------------------------------------- |
| `defaultValue`  | Initial uncontrolled selected values.                                         |
| `value`         | Controlled selected values. Use with `onValueChange`.                         |
| `onValueChange` | Called by Base UI with the next selected values.                              |
| `allValues`     | Values controlled by a `parent` checkbox. Required for select-all behavior.   |
| `disabled`      | Prevents interaction for all controls in the group.                           |
| `required`      | Participates in Base UI/native validation when used with form infrastructure. |
| `name`, `form`  | Hidden input form integration props forwarded to Base UI.                     |
| `className`     | Root class name or Base UI state callback class name.                         |
| `render`        | Base UI render escape hatch for replacing/composing the root element.         |

`CheckboxGroupItemControl` accepts the public `Checkbox` props. Common props inside a group:

| Prop                     | Notes                                                                            |
| ------------------------ | -------------------------------------------------------------------------------- |
| `value`                  | Item value managed by the surrounding group. Omit it only for `parent` controls. |
| `name`                   | Native form field name for submitted checkbox values.                            |
| `size`                   | `xs`, `sm`, `md`, `lg`, or `xl`; defaults to the `Checkbox` default `md`.        |
| `parent`                 | Turns the control into the select-all parent for `allValues`.                    |
| `disabled`, `readOnly`   | Per-item disabled/read-only behavior from `Checkbox`.                            |
| `nativeButton`, `render` | Use for sibling `label htmlFor` layouts or custom root composition.              |
| `children`               | Replaces the default checkbox indicator composition.                             |

The label/list/item wrappers accept native props for their rendered elements plus `className`.

## Styling API

Public `data-slot` values:

| Part                       | `data-slot`                   |
| -------------------------- | ----------------------------- |
| `CheckboxGroup`            | `checkbox-group-root`         |
| `CheckboxGroupLabel`       | `checkbox-group-label`        |
| `CheckboxGroupList`        | `checkbox-group-list`         |
| `CheckboxGroupItem`        | `checkbox-group-item`         |
| `CheckboxGroupItemControl` | `checkbox-group-item-control` |
| `CheckboxGroupItemLabel`   | `checkbox-group-item-label`   |

`CheckboxGroupItemControl` is also a `Checkbox`, so checkbox state attributes such as
`data-checked`, `data-unchecked`, `data-indeterminate`, `data-disabled`, `data-readonly`, and
`data-size` are available on the control. The group root receives Base UI group state/validation
attributes when applicable.

Public group CSS variables:

| Variable                                  | Default fallback                                                | Purpose                                  |
| ----------------------------------------- | --------------------------------------------------------------- | ---------------------------------------- |
| `--checkbox-group-color`                  | `var(--color-foreground)`                                       | Root text color.                         |
| `--checkbox-group-gap`                    | `var(--spacing-2)`                                              | Gap between group label and list.        |
| `--checkbox-group-item-gap`               | `var(--checkbox-gap, var(--spacing-2))`                         | Gap between item control and item label. |
| `--checkbox-group-item-label-color`       | `var(--checkbox-label-color, var(--color-foreground))`          | Item label color.                        |
| `--checkbox-group-item-label-font-size`   | `var(--checkbox-label-font-size, var(--text-sm))`               | Item label font size.                    |
| `--checkbox-group-item-label-font-weight` | `var(--checkbox-label-font-weight, var(--weight-medium))`       | Item label font weight.                  |
| `--checkbox-group-item-label-line-height` | `var(--checkbox-label-line-height, var(--line-height-text-sm))` | Item label line height.                  |
| `--checkbox-group-label-color`            | `var(--checkbox-group-color, var(--color-foreground))`          | Group label color.                       |
| `--checkbox-group-label-font-size`        | `var(--text-sm)`                                                | Group label font size.                   |
| `--checkbox-group-label-font-weight`      | `var(--weight-semibold)`                                        | Group label font weight.                 |
| `--checkbox-group-label-line-height`      | `var(--line-height-text-sm)`                                    | Group label line height.                 |
| `--checkbox-group-list-gap`               | `var(--spacing-2)`                                              | Gap between checkbox rows.               |

Checkbox control and checkbox label variables from `Checkbox` also apply to
`CheckboxGroupItemControl` and `CheckboxGroupItemLabel`.

Use `className` on the part that owns the visual concern: group spacing on `CheckboxGroup`, row
spacing on `CheckboxGroupItem`/`CheckboxGroupList`, control shape/colors on
`CheckboxGroupItemControl`, and text styles on labels. Compose `CheckboxIndicator` inside
`CheckboxGroupItemControl` when the indicator itself needs custom styling or markup.

## UX and accessibility

- The group needs an accessible name. Use `CheckboxGroupLabel` + `aria-labelledby`, or
  `Field`/`Fieldset` with `FieldsetLegend`.
- Each checkbox also needs a label. The default `CheckboxGroupItem` + `CheckboxGroupItemLabel`
  composition creates a wrapping-label row.
- Use `disabled` when the whole group is unavailable. Use `readOnly` on
  `CheckboxGroupItemControl` when a specific item should remain focusable and visible but not
  editable.
- Use `nativeButton render={<button />}` on `CheckboxGroupItemControl` when the label must be a
  sibling connected with `id`/`htmlFor`.
- Keep item checked state on the group (`value`/`defaultValue`), not on individual child controls,
  unless intentionally building a custom composition that still follows Base UI rules.
- Keyboard interaction, focus management, validation state, hidden inputs, parent indeterminate
  state, and ARIA behavior are owned by Base UI and should not be reimplemented in this wrapper.

## Intentional differences from Base UI

- moduix exports flat parts (`CheckboxGroup`, `CheckboxGroupItemControl`, etc.) instead of teaching
  the upstream namespaced primitives in local docs.
- The component is styled by default through CSS Modules, `data-slot` hooks, and public
  `--checkbox-group-*` variables.
- `CheckboxGroupItemControl` uses the moduix `Checkbox`, including the default indicator and `size`
  prop, instead of requiring consumers to compose the upstream checkbox indicator every time.
- The local docs describe only the moduix wrapper contract. Link to upstream Base UI docs for the
  complete primitive reference.

## Agent notes

- Keep `CheckboxGroup` aligned with the existing `RadioGroup` shape: thin group root, separate group
  label/list parts, lower-level field/control/label composition for rows, and no large slot-prop or
  class-name-map API.
- Do not add group-level `size` inheritance unless the same pattern is intentionally introduced
  across checkbox/radio-style form groups. Per-control `size` is the current public API.
- Preserve `mergeClassName` on the group root and on checkbox primitive parts so Base UI state
  callback class names keep working.
- If `data-slot` values or `--checkbox-group-*` variables change, update `theme.css`, Storybook,
  docs examples, CSS Properties docs, and this file in the same task.

## Local changelog

- Clarified the recommended split between styling-only customization on the default wrapper parts and
  lower-level composition when the row structure itself needs to change.
- Rewrote the local documentation to describe the actual moduix `CheckboxGroup` wrapper, exported
  parts, styling contract, accessibility guidance, and implementation constraints instead of the
  upstream Base UI documentation.
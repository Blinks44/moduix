# Fieldset

Upstream primitive docs: https://base-ui.com/react/components/fieldset

## Purpose

`Fieldset` is the moduix wrapper for grouping related form controls under one shared visible label.
It keeps the Base UI fieldset behavior, adds moduix styling hooks, and exposes only two public parts:
`Fieldset` and `FieldsetLegend`.

Use it when several controls belong to one question or section:

- a cluster of text fields such as billing details
- a radio or checkbox group that should share one accessible legend
- a disabled form section that should dim and disable together

## Current behavior contract

- `Fieldset` renders a native `<fieldset>` by default and forwards `FieldsetPrimitive.Root.Props`
  directly to Base UI.
- `FieldsetLegend` renders a Base UI legend part that is a `<div>` by default, not a native
  `<legend>`. Base UI associates it to the root with a generated `id` + `aria-labelledby`.
- `disabled` is the only wrapper-level state. It is available to Base UI state callbacks and exposed
  as `data-disabled` for styling.
- `className` on both parts is merged with the moduix CSS Module class via `mergeClassName`, so
  callback class names such as `className={(state) => ...}` keep working.
- `render` stays available on both parts. The main advanced use case is composing `Fieldset` with
  `RadioGroup` or `CheckboxGroup` while preserving the shared legend and disabled state.
- The wrapper does not add variants, slot prop bags, helper props, or extra structure beyond the two
  visible parts.

## Composition

Basic grouped fields:

```tsx
import { Field, FieldControl, FieldError, FieldLabel, Fieldset, FieldsetLegend } from 'moduix';

export function BillingDetailsFieldset() {
  return (
    <Fieldset>
      <FieldsetLegend>Billing details</FieldsetLegend>

      <Field validationMode="onBlur">
        <FieldLabel>Company</FieldLabel>
        <FieldControl required placeholder="Enter company name" />
        <FieldError match="valueMissing">Please enter company name.</FieldError>
      </Field>

      <Field validationMode="onBlur">
        <FieldLabel>Tax ID</FieldLabel>
        <FieldControl required placeholder="Enter tax ID" />
        <FieldError match="valueMissing">Please enter tax ID.</FieldError>
      </Field>
    </Fieldset>
  );
}
```

Disabled section:

```tsx
import { Field, FieldControl, FieldLabel, Fieldset, FieldsetLegend } from 'moduix';

export function DisabledAccountFieldset() {
  return (
    <Fieldset disabled>
      <FieldsetLegend>Disabled account details</FieldsetLegend>

      <Field>
        <FieldLabel>Email</FieldLabel>
        <FieldControl defaultValue="team@example.com" />
      </Field>

      <Field>
        <FieldLabel>Phone</FieldLabel>
        <FieldControl defaultValue="+1 (555) 123-45-67" />
      </Field>
    </Fieldset>
  );
}
```

Form integration with `RadioGroup` via `render`:

```tsx
import {
  Field,
  FieldItem,
  FieldLabel,
  Fieldset,
  FieldsetLegend,
  Radio,
  RadioGroup,
  RadioLabel,
} from 'moduix';

export function StorageTypeFieldset() {
  return (
    <Field name="storageType">
      <Fieldset render={<RadioGroup defaultValue="ssd" />}>
        <FieldsetLegend>Storage type</FieldsetLegend>

        <FieldItem>
          <FieldLabel>
            <Radio value="ssd" />
            <RadioLabel>SSD</RadioLabel>
          </FieldLabel>
        </FieldItem>

        <FieldItem>
          <FieldLabel>
            <Radio value="hdd" />
            <RadioLabel>HDD</RadioLabel>
          </FieldLabel>
        </FieldItem>
      </Fieldset>
    </Field>
  );
}
```

Custom styling:

```tsx
import { Field, FieldControl, FieldError, FieldLabel, Fieldset, FieldsetLegend } from 'moduix';
import styles from './fieldset.module.css';

export function StyledFieldset() {
  return (
    <Fieldset className={styles.customFieldset}>
      <FieldsetLegend className={styles.customLegend}>Styled fieldset</FieldsetLegend>

      <Field validationMode="onBlur" className={styles.customField}>
        <FieldLabel className={styles.customLabel}>Project name</FieldLabel>
        <FieldControl required placeholder="Maps Platform" className={styles.customControl} />
        <FieldError className={styles.customError} match="valueMissing">
          Please enter a project name.
        </FieldError>
      </Field>
    </Fieldset>
  );
}
```

```css
.customFieldset {
  max-width: 20rem;
  gap: var(--spacing-3);
  padding: var(--spacing-4);
  border: var(--border-width-sm) solid color-mix(in srgb, var(--color-primary) 30%, transparent);
  border-radius: var(--radius-lg);
}

.customLegend {
  border-color: color-mix(in srgb, var(--color-primary) 40%, transparent);
  color: var(--color-primary);
}

.customField {
  gap: var(--spacing-2);
}

.customLabel,
.customError {
  color: var(--color-primary);
}

.customControl {
  border-color: color-mix(in srgb, var(--color-primary) 40%, transparent);
}

.customControl:focus-visible {
  outline-color: var(--color-primary);
}
```

## Exported parts

| Part             | Element/primitive          | Purpose                                                                                        |
| ---------------- | -------------------------- | ---------------------------------------------------------------------------------------------- |
| `Fieldset`       | `FieldsetPrimitive.Root`   | Root group. Native `<fieldset>` by default; can be composed with another root via `render`.    |
| `FieldsetLegend` | `FieldsetPrimitive.Legend` | Visible group label. Renders a `<div>` by default and is associated through `aria-labelledby`. |

## Public props

`Fieldset` accepts `FieldsetPrimitive.Root.Props`. Key props:

| Prop        | Type                                                                       | Default    | Notes                                                       |
| ----------- | -------------------------------------------------------------------------- | ---------- | ----------------------------------------------------------- |
| `disabled`  | `boolean`                                                                  | `false`    | Disables the grouped controls and exposes `data-disabled`.  |
| `render`    | `ReactElement \| ((props, state) => ReactElement)`                         | `fieldset` | Advanced composition escape hatch for another root element. |
| `className` | `string \| ((state: FieldsetPrimitive.Root.State) => string \| undefined)` | —          | Merged with the moduix root class.                          |
| `style`     | `React.CSSProperties \| ((state) => React.CSSProperties \| undefined)`     | —          | Forwarded directly to Base UI.                              |

`FieldsetLegend` accepts `FieldsetPrimitive.Legend.Props`. Key props:

| Prop        | Type                                                                         | Default | Notes                                                             |
| ----------- | ---------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------- |
| `id`        | `string`                                                                     | auto    | Overrides the generated label id that Base UI wires to the root.  |
| `render`    | `ReactElement \| ((props, state) => ReactElement)`                           | `div`   | Replaces the default legend element when composition requires it. |
| `className` | `string \| ((state: FieldsetPrimitive.Legend.State) => string \| undefined)` | —       | Merged with the moduix legend class.                              |
| `style`     | `React.CSSProperties \| ((state) => React.CSSProperties \| undefined)`       | —       | Forwarded directly to Base UI.                                    |

All other native fieldset or div props supported by Base UI pass through unchanged.

## Styling API

Public `data-slot` values:

| Part             | `data-slot`       |
| ---------------- | ----------------- |
| `Fieldset`       | `fieldset-root`   |
| `FieldsetLegend` | `fieldset-legend` |

Relevant state attributes:

| Part             | Attributes      |
| ---------------- | --------------- |
| `Fieldset`       | `data-disabled` |
| `FieldsetLegend` | `data-disabled` |

Public CSS variables:

| Variable                         | Default fallback             | Purpose                       |
| -------------------------------- | ---------------------------- | ----------------------------- |
| `--fieldset-gap`                 | `var(--spacing-4)`           | Gap between grouped children. |
| `--fieldset-width`               | `100%`                       | Root width.                   |
| `--fieldset-max-width`           | `none`                       | Root max width.               |
| `--fieldset-margin`              | `0`                          | Root margin.                  |
| `--fieldset-padding`             | `0`                          | Root padding.                 |
| `--fieldset-border-width`        | `0`                          | Root border width.            |
| `--fieldset-border-style`        | `solid`                      | Root border style.            |
| `--fieldset-border-color`        | `transparent`                | Root border color.            |
| `--fieldset-radius`              | `var(--radius-none)`         | Root border radius.           |
| `--fieldset-disabled-opacity`    | `var(--opacity-disabled)`    | Disabled root opacity.        |
| `--fieldset-legend-margin`       | `0`                          | Legend margin.                |
| `--fieldset-legend-padding`      | `0 0 var(--spacing-3)`       | Legend padding.               |
| `--fieldset-legend-border-width` | `var(--border-width-sm)`     | Legend bottom border width.   |
| `--fieldset-legend-border-style` | `solid`                      | Legend bottom border style.   |
| `--fieldset-legend-border-color` | `var(--color-border)`        | Legend bottom border color.   |
| `--fieldset-legend-color`        | `var(--color-foreground)`    | Legend text color.            |
| `--fieldset-legend-font-size`    | `var(--text-lg)`             | Legend font size.             |
| `--fieldset-legend-font-weight`  | `var(--weight-semibold)`     | Legend font weight.           |
| `--fieldset-legend-line-height`  | `var(--line-height-text-lg)` | Legend line height.           |

There are no built-in visual variants. Customize appearance through `className`, `data-slot`,
state attributes, and the `--fieldset-*` variables.

## UX and accessibility

- Always render one visible `FieldsetLegend` so the grouped controls have a shared accessible label.
- Prefer the default native `<fieldset>` root for standard grouped forms. Use `render` only when the
  root must also be a Base UI selection group such as `RadioGroup` or `CheckboxGroup`.
- `disabled` is the right way to disable the whole section. Do not manually dim nested controls one
  by one unless the group is intentionally mixed-state.
- Because the legend is a `<div>`, do not rely on native `<legend>` layout quirks. The accessibility
  relationship comes from Base UI's generated `id` and `aria-labelledby`.
- Keyboard navigation, form participation, group labelling for composed radio/checkbox controls, and
  disabled propagation are owned by Base UI and should not be reimplemented in the wrapper.

## Intentional differences from Base UI

- moduix exports flat parts (`Fieldset`, `FieldsetLegend`) instead of teaching the namespaced
  `Fieldset.Root` / `Fieldset.Legend` API in local docs.
- The component is styled by default through CSS Modules, `data-slot`, and `--fieldset-*` variables.
- Local docs document only the moduix wrapper contract and the library's recommended composition
  patterns, not the full upstream primitive reference.

## Agent notes

- Keep `Fieldset` thin. Do not add convenience props that duplicate Base UI primitive props under
  different names.
- Do not introduce slot prop bags, class-name maps, or wrapper-owned layout helpers. The public API
  should stay the current two-part composition.
- Preserve the current `render` escape hatch because it is the established integration path for
  `RadioGroup` and `CheckboxGroup` inside `Field`.
- If `data-slot` values, CSS variables, or example composition change, update stories, docs/examples,
  and this file in the same task.
- Keep `Field`, `Fieldset`, and `Form` aligned as the library's form-structure primitives: `Form`
  owns the form element, `Fieldset` owns grouped section semantics, and `Field` owns per-control
  validation and descriptions.

## Local changelog

- Rewrote the local documentation to describe the shipped moduix `Fieldset` wrapper, including the
  real two-part API, styling contract, `render` composition path, and the important detail that
  `FieldsetLegend` renders a `<div>` associated through `aria-labelledby`.
- Simplified the grouped radio examples and docs snippets by inlining the two option rows instead of
  routing them through a temporary array and `map`.
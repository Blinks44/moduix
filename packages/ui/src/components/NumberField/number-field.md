# NumberField

Upstream primitive docs: https://base-ui.com/react/components/number-field

## Purpose

`NumberField` is the moduix numeric input for bounded quantities, prices, counters, and similar
number-only values. It is a styled wrapper over the Base UI number field primitive with:

- flat moduix exports instead of namespaced parts;
- a high-level `NumberField` sugar component that renders the standard stepper UI for you;
- default decrement, increment, and scrub cursor icons;
- a public styling contract based on `className`, `data-slot`, and `--number-field-*` CSS variables.

Use `Input` when the value is not truly numeric or when you need free-form text. Use
`NumberFieldRoot` only when the default stepper composition is not sufficient.

## Current behavior contract

- `NumberField` renders `NumberFieldRoot` and always appends the default
  `NumberFieldGroup > NumberFieldDecrement + NumberFieldInput + NumberFieldIncrement` composition.
- `children` passed to `NumberField` render **before** that default group. In practice this is mainly
  for `NumberFieldScrubArea` or extra visible content above the control.
- `id` on `NumberField` or `NumberFieldRoot` becomes the **input id**, so `FieldLabel htmlFor={id}`
  works with the wrapped input.
- `decrementLabel` and `incrementLabel` only affect the built-in icon buttons rendered by
  `NumberField`. They do not affect manually composed `NumberFieldDecrement` or
  `NumberFieldIncrement`.
- `NumberFieldRoot` owns the value state, formatting, min/max, step behavior, validation, hidden
  input/form integration, locale, and the imperative `inputRef`.
- `NumberFieldDecrement`, `NumberFieldIncrement`, and `NumberFieldScrubAreaCursor` render built-in
  icons when `children` is omitted.
- The moduix wrapper does not add variants, size props, slot prop bags, prefix/suffix props, unit
  props, or validation UI.

## Composition

Recommended default composition:

```text
Field
├─ FieldLabel
└─ NumberField
   ├─ NumberFieldScrubArea (optional)
   │  ├─ label or helper text
   │  └─ NumberFieldScrubAreaCursor
   └─ NumberFieldGroup
      ├─ NumberFieldDecrement
      ├─ NumberFieldInput
      └─ NumberFieldIncrement
```

Default usage:

```tsx
import { Field, FieldLabel, NumberField } from 'moduix';
import { useId } from 'react';

export function QuantityField() {
  const id = useId();

  return (
    <Field>
      <FieldLabel htmlFor={id}>Amount</FieldLabel>
      <NumberField id={id} defaultValue={100} min={0} />
    </Field>
  );
}
```

Custom composition when you need custom icons or layout control:

```tsx
import {
  Field,
  FieldLabel,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
} from 'moduix';
import { ChevronDownIcon, ChevronUpIcon } from '@/icons/ui';
import { useId } from 'react';

export function FloorsField() {
  const id = useId();

  return (
    <Field>
      <FieldLabel htmlFor={id}>Floors</FieldLabel>
      <NumberFieldRoot id={id} defaultValue={8}>
        <NumberFieldGroup>
          <NumberFieldDecrement aria-label="Decrease floor count">
            <ChevronDownIcon />
          </NumberFieldDecrement>
          <NumberFieldInput />
          <NumberFieldIncrement aria-label="Increase floor count">
            <ChevronUpIcon />
          </NumberFieldIncrement>
        </NumberFieldGroup>
      </NumberFieldRoot>
    </Field>
  );
}
```

Scrub area composition:

```tsx
import {
  Field,
  FieldLabel,
  NumberField,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
} from 'moduix';
import { useId } from 'react';

export function ScrubAmountField() {
  const id = useId();

  return (
    <Field>
      <NumberField id={id} defaultValue={250}>
        <NumberFieldScrubArea>
          <FieldLabel htmlFor={id}>Drag to scrub</FieldLabel>
          <NumberFieldScrubAreaCursor />
        </NumberFieldScrubArea>
      </NumberField>
    </Field>
  );
}
```

## Public parts

| Part                         | Element/primitive                      | Slot                                         | Notes                                            |
| ---------------------------- | -------------------------------------- | -------------------------------------------- | ------------------------------------------------ |
| `NumberField`                | sugar wrapper over `NumberFieldRoot`   | `data-slot="number-field-root"`              | Renders the default stepper group automatically. |
| `NumberFieldRoot`            | `NumberFieldPrimitive.Root`            | `data-slot="number-field-root"`              | Low-level root state and form integration.       |
| `NumberFieldScrubArea`       | `NumberFieldPrimitive.ScrubArea`       | `data-slot="number-field-scrub-area"`        | Optional drag-to-change affordance.              |
| `NumberFieldScrubAreaCursor` | `NumberFieldPrimitive.ScrubAreaCursor` | `data-slot="number-field-scrub-area-cursor"` | Optional scrub cursor; renders a default icon.   |
| `NumberFieldGroup`           | `NumberFieldPrimitive.Group`           | `data-slot="number-field-group"`             | Visual group wrapper for buttons and input.      |
| `NumberFieldDecrement`       | `NumberFieldPrimitive.Decrement`       | `data-slot="number-field-decrement"`         | Decrement button; renders a default minus icon.  |
| `NumberFieldInput`           | `NumberFieldPrimitive.Input`           | `data-slot="number-field-input"`             | Editable numeric input.                          |
| `NumberFieldIncrement`       | `NumberFieldPrimitive.Increment`       | `data-slot="number-field-increment"`         | Increment button; renders a default plus icon.   |

## Public props

### `NumberField`

`NumberField` accepts all `NumberFieldRoot` props plus:

| Prop             | Type     | Default            | Notes                                               |
| ---------------- | -------- | ------------------ | --------------------------------------------------- |
| `decrementLabel` | `string` | `"Decrease value"` | Accessible label for the built-in decrement button. |
| `incrementLabel` | `string` | `"Increase value"` | Accessible label for the built-in increment button. |

Exported helper type:

- `NumberFieldProps`

### Important root props

These props work on both `NumberField` and `NumberFieldRoot` because the sugar component forwards
them to the root:

| Prop                                 | Type                          | Default        | Notes                                                                                                          |
| ------------------------------------ | ----------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------- |
| `id`                                 | `string`                      | —              | Sets the input id used by labels such as `FieldLabel htmlFor={id}`.                                            |
| `value` / `defaultValue`             | `number \| null`              | —              | Controlled or uncontrolled numeric value. Empty state is `null`.                                               |
| `onValueChange`                      | `(value, details) => void`    | —              | Fires for typing, buttons, keyboard, wheel scrub, and drag scrub changes.                                      |
| `onValueCommitted`                   | `(value, details) => void`    | —              | Fires when the value is committed, e.g. after blur or pointer release. Prefer this for expensive side effects. |
| `min` / `max`                        | `number`                      | —              | Bounds the value for step-based interactions and validation.                                                   |
| `allowOutOfRange`                    | `boolean`                     | `false`        | Allows direct text entry outside `min`/`max` until blur/validation.                                            |
| `step`                               | `number \| 'any'`             | `1`            | Step used by buttons, keyboard arrows, wheel, and scrub interactions.                                          |
| `smallStep` / `largeStep`            | `number`                      | `0.1` / `10`   | Modifier-key step sizes.                                                                                       |
| `snapOnStep`                         | `boolean`                     | `false`        | Snaps increment/decrement operations to the nearest step.                                                      |
| `format`                             | `Intl.NumberFormatOptions`    | —              | Formats the displayed text while keeping the internal value numeric.                                           |
| `locale`                             | `Intl.LocalesArgument`        | runtime locale | Controls number formatting and parsing locale.                                                                 |
| `allowWheelScrub`                    | `boolean`                     | `false`        | Opts into mouse-wheel scrubbing while the input is focused and hovered.                                        |
| `required` / `disabled` / `readOnly` | `boolean`                     | `false`        | Standard form states handled by the primitive.                                                                 |
| `name` / `form`                      | `string`                      | —              | Hidden input submission props.                                                                                 |
| `inputRef`                           | `React.Ref<HTMLInputElement>` | —              | Imperative access to the managed input element from the root.                                                  |
| `className`                          | primitive `className`         | —              | Merged with the moduix class for the visual root.                                                              |

### Part-specific notes

- `NumberFieldDecrement` and `NumberFieldIncrement` accept the primitive button props, including
  `aria-label`, `disabled`, `className`, and `children`.
- `NumberFieldInput` accepts the primitive input props. For external imperative access, prefer
  `inputRef` on the root instead of trying to reach into the composed tree.
- `NumberFieldScrubArea` and `NumberFieldScrubAreaCursor` are optional. They are only needed when a
  visible drag target improves the interaction.

## Styling API

### Slot hooks

Stable `data-slot` values:

| Part                              | `data-slot`                      |
| --------------------------------- | -------------------------------- |
| `NumberField` / `NumberFieldRoot` | `number-field-root`              |
| `NumberFieldScrubArea`            | `number-field-scrub-area`        |
| `NumberFieldScrubAreaCursor`      | `number-field-scrub-area-cursor` |
| `NumberFieldGroup`                | `number-field-group`             |
| `NumberFieldDecrement`            | `number-field-decrement`         |
| `NumberFieldInput`                | `number-field-input`             |
| `NumberFieldIncrement`            | `number-field-increment`         |

### Styled state attributes

These state attributes are used by the shipped moduix styles:

| Part(s)                         | Attributes                       | Effect                                            |
| ------------------------------- | -------------------------------- | ------------------------------------------------- |
| scrub area, input, step buttons | `data-disabled`, `data-readonly` | Neutral cursor or disabled opacity / interaction. |
| input, step buttons             | `data-invalid`                   | Switches border and focus-ring colors to invalid. |

Base UI may also expose additional field-state attributes such as `data-valid`, `data-dirty`,
`data-touched`, `data-filled`, `data-focused`, or interaction-specific attributes on relevant parts.
moduix does **not** style those by default; they are available only if you intentionally target them
in consumer CSS.

### CSS variables

Public `--number-field-*` variables from `theme.css` and the component stylesheet:

| Group        | Variables                                                                                                                                                                                                |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Layout       | `--number-field-gap`, `--number-field-width`, `--number-field-max-width`, `--number-field-control-height`, `--number-field-input-width`, `--number-field-radius`                                         |
| Border/focus | `--number-field-border-width`, `--number-field-border-style`, `--number-field-border-color`, `--number-field-border-color-invalid`, `--number-field-focus-ring-width`, `--number-field-focus-ring-color` |
| Buttons      | `--number-field-button-bg`, `--number-field-button-bg-hover`, `--number-field-button-bg-active`, `--number-field-button-color`, `--number-field-icon-size`                                               |
| Input        | `--number-field-input-bg`, `--number-field-input-color`, `--number-field-input-font-size`, `--number-field-input-line-height`, `--number-field-input-padding-x`, `--number-field-input-padding-y`        |
| Scrub area   | `--number-field-scrub-area-gap`, `--number-field-scrub-area-color`, `--number-field-scrub-area-cursor-size`                                                                                              |
| Disabled     | `--number-field-disabled-opacity`                                                                                                                                                                        |

Example:

```css
.priceField {
  --number-field-input-width: 7rem;
  --number-field-button-bg: var(--color-muted);
  --number-field-button-bg-hover: var(--color-accent);
  --number-field-focus-ring-color: var(--color-primary);
  --number-field-radius: var(--radius-lg);
}
```

There are no built-in variants, size props, slot prop bags, or class name maps. Style the specific
part directly with `className` or override the public CSS variables.

## UX and accessibility

- Every number field needs an accessible name. Use `FieldLabel htmlFor={id}`, a native `<label>`, or
  `aria-label` for compact demo-only layouts.
- `decrementLabel` and `incrementLabel` exist primarily for localization and clearer screen-reader
  text on the built-in icon buttons.
- `disabled` removes interaction; `readOnly` keeps the value available and focusable while blocking
  edits.
- Keep the stepper buttons or direct input editing available even when you add a scrub area. Scrub is
  a pointer affordance, not a complete replacement for the base input interaction.
- Use `onValueCommitted` rather than `onValueChange` for expensive side effects such as server sync or
  analytics, because typing and scrubbing can emit many change events.
- If you use `format`, treat the displayed string as presentation. The real value is still numeric and
  should flow through `value`, `defaultValue`, `onValueChange`, and form submission.

## Limitations and recommendations

- `NumberField` always renders the standard horizontal stepper composition and centers the input text.
  If you need a different layout or custom button content, use `NumberFieldRoot` and compose the
  parts manually.
- Do not add units, prefixes, or suffixes through undocumented props. Compose them outside the
  control or build a dedicated wrapper.
- There is no moduix size prop. Adjust scale through CSS variables instead of introducing one-off
  classes on every part.
- When step validation matters on submit, define `min` together with `step`. Use `step="any"` only
  when browser step validation should be disabled.
- `allowWheelScrub` and scrub areas are powerful but easy to overuse. Reserve them for interfaces
  where fast numeric adjustment is genuinely helpful.

## Intentional differences from Base UI

- moduix exports flat parts (`NumberField`, `NumberFieldRoot`, `NumberFieldInput`, etc.) instead of
  the upstream namespaced API.
- The high-level `NumberField` sugar component is part of the local contract; upstream Base UI only
  provides the low-level parts.
- Default icons, built-in button labels, CSS Modules styling, `data-slot` hooks, and
  `--number-field-*` variables are part of the moduix contract.
- This file documents the shipped moduix wrapper contract, not the full upstream primitive reference.

## Agent notes

- Keep the high-level `NumberField` minimal: only behavior that removes repeated boilerplate without
  hiding composition belongs there.
- Preserve the existing `decrementLabel` / `incrementLabel` sugar. New sugar should only be added when
  it clearly reduces common call-site duplication and matches adjacent component patterns.
- If `data-slot` values or public CSS variables change, update `theme.css`, stories, docs examples,
  and this file in the same task.
- If the visual structure changes, keep `apps/docs/content/docs/number-field.mdx`,
  `apps/docs/src/components/examples/number-field.tsx`, and `NumberField.stories.tsx` aligned so the
  example code matches the rendered preview.

## Local changelog

- Rewrote the local documentation so it describes the shipped moduix `NumberField` API instead of the
  upstream Base UI reference.
- Documented the actual sugar component contract, flat exports, styling hooks, accessibility notes,
  and composition limits.
- Exported `NumberFieldProps` for consumer-side typing of the moduix-only `decrementLabel` and
  `incrementLabel` props.
# NumberInput

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/number-input
- Chakra UI: https://chakra-ui.com/docs/components/number-input

## Purpose

`NumberInput` is the moduix wrapper around Ark UI's number input primitive for bounded numeric
entry, prices, counters, quantities, formatting, stepping, and scrubbing.

## Upstream reference

Ark UI Number Input: https://ark-ui.com/react/docs/components/number-input

## Upstream model to preserve

Preserve Ark's root composition, string value state, details-object callbacks, parser
and formatter behavior, `Field` / `Fieldset` context integration, `RootProvider`, `Context`, state
hooks, and `asChild` support.

The public styled values are `NumberInput`, `NumberInputRootProvider`, `NumberInputContext`,
`NumberInputLabel`, `NumberInputScrubber`, `NumberInputControl`, `NumberInputField`,
`NumberInputDecrementTrigger`, `NumberInputInput`, `NumberInputIncrementTrigger`, and
`NumberInputValueText`. moduix also exports `useNumberInput` and `useNumberInputContext`.

## Current behavior contract

- `NumberInput` is the public root value.
- `value` and `defaultValue` are strings. Use `details.valueAsNumber` when numeric state is needed.
- `onValueChange`, `onValueCommit`, `onValueInvalid`, and `onFocusChange` keep Ark details objects.
- Formatting uses `formatOptions`; accessible labels use Ark `translations`.
- The wrapper adds visual styling, stable `data-slot` hooks, and default plus/minus icons for the
  trigger parts.
- `NumberInputField` renders the default control, input, and trigger group. Use the lower-level
  parts when their order, icons, or styles need to differ.
- `useNumberInput`, `useNumberInputContext`, and `NumberInputContext` keep Ark state access on the
  moduix public surface.
- `name` and `form` are forwarded to the visible text spinbutton for native form submission. Render a
  hidden `<input>` through `NumberInputContext` with `context.valueAsNumber` only when the form
  needs the parsed numeric representation instead of the displayed string.
- No legacy aliases, numeric/null value adapters, `format` alias, `allowWheelScrub`,
  `NumberField*` flat exports, or automatic stepper group are preserved.

## Anatomy and exported parts

```text
NumberInput
├─ NumberInputLabel
├─ NumberInputScrubber (optional)
├─ NumberInputField (recommended)
├─ NumberInputControl
│  ├─ NumberInputDecrementTrigger
│  ├─ NumberInputInput
│  └─ NumberInputIncrementTrigger
└─ NumberInputValueText (optional)

NumberInputRootProvider
└─ same part tree connected to state created with `useNumberInput()`
```

| Part                               | `data-slot`                      | Notes                                           |
| ---------------------------------- | -------------------------------- | ----------------------------------------------- |
| `NumberInput`                  | `number-input-root`              | Root state, parsing, formatting, and a11y.      |
| `NumberInputRootProvider`         | `number-input-root-provider`     | Connects to Ark `useNumberInput()` state.       |
| `NumberInputContext`              | -                                | Renders access to the current Ark state.        |
| `NumberInputLabel`                | `number-input-label`             | Accessible label for the input.                 |
| `NumberInputScrubber`             | `number-input-scrubber`          | Optional drag-to-change affordance.             |
| `NumberInputControl`              | `number-input-control`           | Wrapper around triggers and input.              |
| `NumberInputField`                | `number-input-control`           | Default control, input, and trigger group.      |
| `NumberInputDecrementTrigger`     | `number-input-decrement-trigger` | Renders a minus icon when children are omitted. |
| `NumberInputInput`                | `number-input-input`             | Managed editable numeric input.                 |
| `NumberInputIncrementTrigger`     | `number-input-increment-trigger` | Renders a plus icon when children are omitted.  |
| `NumberInputValueText`            | `number-input-value-text`        | Read-only formatted value text.                 |

Exported values: `NumberInput`, `NumberInputRootProvider`, `NumberInputContext`,
`NumberInputLabel`, `NumberInputScrubber`, `NumberInputControl`, `NumberInputField`,
`NumberInputDecrementTrigger`, `NumberInputInput`, `NumberInputIncrementTrigger`,
`NumberInputValueText`, `useNumberInput`, and `useNumberInputContext`.

## Composition

```tsx
import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/react/number-input';

export function QuantityInput() {
  return (
    <NumberInput defaultValue="10" min={0} max={20} step={2}>
      <NumberInputLabel>Quantity</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
  );
}
```

Controlled usage keeps string state:

```tsx
import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/react/number-input';
import { useState } from 'react';

export function ControlledQuantityInput() {
  const [value, setValue] = useState('10');

  return (
    <NumberInput value={value} onValueChange={(details) => setValue(details.value)}>
      <NumberInputLabel>Quantity</NumberInputLabel>
      <NumberInputField />
    </NumberInput>
  );
}
```

Use `NumberInputRootProvider` only with state created by moduix `useNumberInput()`; do not also
render `NumberInput` for the same state instance. Use `NumberInputContext` or
`useNumberInputContext()` to read `valueAsNumber` without importing Ark directly.

## Upstream feature coverage

- Basic composition: supported through `NumberInput`, `NumberInputLabel`, `NumberInputControl`,
  `NumberInputInput`, and trigger parts.
- Default field composition: supported through `NumberInputField`.
- Min/max/step: forwarded directly to Ark.
- Precision and formatting: supported through `formatOptions`.
- Scrubbing: supported through `NumberInputScrubber`.
- Value text: supported through `NumberInputValueText`.
- Mouse wheel: supported through `allowMouseWheel`.
- Field integration: preserved through Ark field context and the moduix `Field` wrapper.
- Root provider: supported through moduix `useNumberInput()` and `NumberInputRootProvider`.
- Controlled state: Ark string values and details-object callbacks are preserved.

## Accessibility and state

Every number input needs an accessible name; prefer `NumberInputLabel` in the root tree. Trigger
labels are managed by Ark and can be localized with `translations.incrementLabel` and
`translations.decrementLabel`.

Important Ark root props include `ids`, `name`, `form`, `disabled`, `readOnly`, `invalid`,
`required`, `min`, `max`, `step`, `allowMouseWheel`, `allowOverflow`, `clampValueOnBlur`,
`spinOnPress`, `inputMode`, `formatOptions`, `translations`, `onValueChange`, `onValueCommit`,
`onValueInvalid`, and `onFocusChange`. Keep controlled values as strings, especially with
locale-specific `formatOptions`.

`name` and `form` submit the visible spinbutton through a native form. Use `NumberInputContext` to
render a hidden input whose value is `context.valueAsNumber` only when the form needs the parsed
numeric representation instead of the visible string.

The shipped CSS uses `data-disabled`, `data-invalid`, and `data-focus`. Ark also exposes
`data-scrubbing`, `data-scope="number-input"`, and `data-part` attributes for part-level selectors.

## Defaults and styling

The input and increment/decrement controls share the `--moduix-size-md` baseline; the text input uses `--moduix-spacing-1` block padding.

All visual parts accept `className`; Ark parts also support `asChild`. `NumberInputField` accepts
the structural props of `NumberInputControl`, including `className`, but intentionally does not
support `asChild`. Use the lower-level parts to customize its input or triggers. Trigger parts render
the moduix minus or plus icon when `children` is omitted.

The control group uses logical inline borders and corner radii, so decrement and increment controls
follow the surrounding text direction.

Public CSS variables:

- Layout: `--moduix-number-input-gap`, `--moduix-number-input-width`, `--moduix-number-input-max-width`,
  `--moduix-number-input-control-height`, `--moduix-number-input-input-width`, `--moduix-number-input-radius`.
- Label/value: `--moduix-number-input-label-color`, `--moduix-number-input-label-font-size`,
  `--moduix-number-input-label-line-height`, `--moduix-number-input-label-font-weight`,
  `--moduix-number-input-value-text-color`, `--moduix-number-input-value-text-font-size`,
  `--moduix-number-input-value-text-line-height`.
- Border/focus: `--moduix-number-input-border-width`, `--moduix-number-input-border-style`,
  `--moduix-number-input-border-color`, `--moduix-number-input-border-color-invalid`,
  `--moduix-number-input-focus-ring-width`, `--moduix-number-input-focus-ring-color`.
- Buttons: `--moduix-number-input-button-bg`, `--moduix-number-input-button-bg-hover`,
  `--moduix-number-input-button-bg-active`, `--moduix-number-input-button-color`, `--moduix-number-input-icon-size`.
- Input: `--moduix-number-input-input-bg`, `--moduix-number-input-input-color`,
  `--moduix-number-input-input-font-size`, `--moduix-number-input-input-line-height`,
  `--moduix-number-input-input-padding-x`, `--moduix-number-input-input-padding-y`.
- Scrubber and state: `--moduix-number-input-scrubber-gap`, `--moduix-number-input-scrubber-color`,
  `--moduix-number-input-disabled-opacity`.

## Intentional sugar and differences from upstream

moduix adds visual defaults, stable `data-slot` hooks, default trigger icons, and `NumberInputField`
for the repeated standard control structure. It does not add variants, sizes, class-name maps, or
high-level props over Ark behavior.

Breaking migration differences from the old previous wrapper:

- `NumberField` and all `NumberField*` flat aliases are removed.
- `NumberInput` no longer auto-renders the control group; compose Ark parts explicitly.
- `value` / `defaultValue` are strings instead of `number | null`.
- `onValueChange` receives Ark details instead of a bare numeric value.
- `format` is replaced by `formatOptions`.
- `allowWheelScrub` is replaced by Ark `allowMouseWheel`.
- `decrementLabel` / `incrementLabel` are replaced by `translations`.
- `--moduix-number-field-*` variables are replaced by `--moduix-number-input-*`.

## Agent notes

Keep `Field` a narrow shortcut over the existing visible parts; advanced state helpers remain Ark
behavior re-exported by moduix rather than locally adapted. Registry source paths are under
`packages/react/src/components/number-input`.

## Local changelog

- 2026-09-22: Replaced the compound `NumberInput.*` value surface with the flat named exports across
  React, Solid, and both Tailwind packages.
- 2026-08-11: Restored Ark's native `name` and `form` submission contract in consumer guidance and
  added coverage for external form ownership. `Context` remains the documented path for submitting
  the parsed numeric representation.

- 2026-07-29: Added focused keyboard, Field-state, provider, `asChild`, and native form-submission
  coverage; documented the required `Context` hidden-input composition and expanded state examples.

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-21: Aligned the field and square stepper controls to `--moduix-size-md` and compacted input padding.

- 2026-07-19: Switched control borders and corner radii to logical inline properties for RTL.
- 2026-07-10: Added `NumberInputField` and moduix exports for Ark state access; corrected disabled
  opacity so it is applied only once by the root.
- 2026-07-03: Removed moduix re-exports of Ark number-input state helpers and the renderless
  `Context` part from the public surface; `RootProvider` remains for Ark-owned external state.
- 2026-06-26: Aligned scrubber composition, context/value-text coverage, Ark state docs, and CSS
  variable references with the official Ark UI number input documentation.
- 2026-06-19: Migrated from legacy `NumberField` to Ark UI `NumberInput`; renamed source, docs,
  registry item, slots, CSS variables, examples, and public exports to `number-input`.

# NumberInput

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/number-input
- Chakra UI: https://chakra-ui.com/docs/components/number-input

## Purpose

`NumberInput` is the moduix wrapper around Ark UI's number input primitive for bounded numeric
entry, prices, counters, quantities, formatting, stepping, and scrubbing.

## Upstream model to preserve

Preserve Ark's `NumberInput.Root` composition, string value state, details-object callbacks, parser
and formatter behavior, `Field` / `Fieldset` context integration, `RootProvider`, and `asChild`
support.

Ark parts exposed by moduix are `Root`, `RootProvider`, `Label`, `Scrubber`, `Control`,
`DecrementTrigger`, `Input`, `IncrementTrigger`, and `ValueText`.

## Current behavior contract

- `NumberInput` is the short root form and maps to `NumberInput.Root`.
- `value` and `defaultValue` are strings. Use `details.valueAsNumber` when numeric state is needed.
- `onValueChange`, `onValueCommit`, `onValueInvalid`, and `onFocusChange` keep Ark details objects.
- Formatting uses `formatOptions`; accessible labels use Ark `translations`.
- The wrapper adds visual styling, stable `data-slot` hooks, and default plus/minus icons for the
  trigger parts.
- Advanced state helpers stay upstream. Import Ark `useNumberInput()` directly when pairing
  external state with `NumberInput.RootProvider`.
- No legacy aliases, numeric/null value adapters, `format` alias, `allowWheelScrub`,
  `NumberField*` flat exports, or automatic stepper group are preserved.

## Anatomy and exported parts

```text
NumberInput.Root
├─ NumberInput.Label
├─ NumberInput.Control
│  ├─ NumberInput.Scrubber (optional)
│  ├─ NumberInput.DecrementTrigger
│  ├─ NumberInput.Input
│  └─ NumberInput.IncrementTrigger
└─ NumberInput.ValueText (optional)

NumberInput.RootProvider
└─ same part tree connected to state created with Ark `useNumberInput()`
```

| Part                               | `data-slot`                      | Notes                                           |
| ---------------------------------- | -------------------------------- | ----------------------------------------------- |
| `NumberInput` / `NumberInput.Root` | `number-input-root`              | Root state, parsing, formatting, and a11y.      |
| `NumberInput.RootProvider`         | `number-input-root-provider`     | Connects to Ark `useNumberInput()` state.       |
| `NumberInput.Label`                | `number-input-label`             | Accessible label for the input.                 |
| `NumberInput.Scrubber`             | `number-input-scrubber`          | Optional drag-to-change affordance.             |
| `NumberInput.Control`              | `number-input-control`           | Wrapper around triggers and input.              |
| `NumberInput.DecrementTrigger`     | `number-input-decrement-trigger` | Renders a minus icon when children are omitted. |
| `NumberInput.Input`                | `number-input-input`             | Managed editable numeric input.                 |
| `NumberInput.IncrementTrigger`     | `number-input-increment-trigger` | Renders a plus icon when children are omitted.  |
| `NumberInput.ValueText`            | `number-input-value-text`        | Read-only formatted value text.                 |

Exported values: `NumberInput`.

## Composition

```tsx
import { NumberInput } from '@moduix/react';

export function QuantityInput() {
  return (
    <NumberInput defaultValue="10" min={0} max={20} step={2}>
      <NumberInput.Label>Quantity</NumberInput.Label>
      <NumberInput.Control>
        <NumberInput.DecrementTrigger />
        <NumberInput.Input />
        <NumberInput.IncrementTrigger />
      </NumberInput.Control>
    </NumberInput>
  );
}
```

Controlled usage keeps string state:

```tsx
import { NumberInput } from '@moduix/react';
import { useState } from 'react';

export function ControlledQuantityInput() {
  const [value, setValue] = useState('10');

  return (
    <NumberInput value={value} onValueChange={(details) => setValue(details.value)}>
      <NumberInput.Label>Quantity</NumberInput.Label>
      <NumberInput.Control>
        <NumberInput.DecrementTrigger />
        <NumberInput.Input />
        <NumberInput.IncrementTrigger />
      </NumberInput.Control>
    </NumberInput>
  );
}
```

Use `NumberInput.RootProvider` only with state created by Ark `useNumberInput()`; do not also
render `NumberInput.Root` for the same state instance.

## Upstream feature coverage

- Basic composition: supported through `NumberInput`, `Label`, `Control`, `Input`, and trigger parts.
- Min/max/step: forwarded directly to Ark.
- Precision and formatting: supported through `formatOptions`.
- Scrubbing: supported through `NumberInput.Scrubber`.
- Value text: supported through `NumberInput.ValueText`.
- Mouse wheel: supported through `allowMouseWheel`.
- Field integration: preserved through Ark field context and the moduix `Field` wrapper.
- Root provider: supported through Ark `useNumberInput()` and `NumberInput.RootProvider`.
- Controlled state: Ark string values and details-object callbacks are preserved.

## Accessibility and state

Every number input needs an accessible name; prefer `NumberInput.Label` in the root tree. Trigger
labels are managed by Ark and can be localized with `translations.incrementLabel` and
`translations.decrementLabel`.

Important Ark root props include `ids`, `name`, `form`, `disabled`, `readOnly`, `invalid`,
`required`, `min`, `max`, `step`, `allowMouseWheel`, `allowOverflow`, `clampValueOnBlur`,
`spinOnPress`, `inputMode`, `formatOptions`, `translations`, `onValueChange`, `onValueCommit`,
`onValueInvalid`, and `onFocusChange`. Keep controlled values as strings, especially with
locale-specific `formatOptions`.

The shipped CSS uses `data-disabled`, `data-invalid`, and `data-focus`. Ark also exposes
`data-scrubbing`, `data-scope="number-input"`, and `data-part` attributes for part-level selectors.

## Defaults and styling

All exported parts accept `className`; Ark parts also support `asChild`. Trigger parts render the
moduix minus or plus icon when `children` is omitted.

Public CSS variables:

- Layout: `--number-input-gap`, `--number-input-width`, `--number-input-max-width`,
  `--number-input-control-height`, `--number-input-input-width`, `--number-input-radius`.
- Label/value: `--number-input-label-color`, `--number-input-label-font-size`,
  `--number-input-label-line-height`, `--number-input-label-font-weight`,
  `--number-input-value-text-color`, `--number-input-value-text-font-size`,
  `--number-input-value-text-line-height`.
- Border/focus: `--number-input-border-width`, `--number-input-border-style`,
  `--number-input-border-color`, `--number-input-border-color-invalid`,
  `--number-input-focus-ring-width`, `--number-input-focus-ring-color`.
- Buttons: `--number-input-button-bg`, `--number-input-button-bg-hover`,
  `--number-input-button-bg-active`, `--number-input-button-color`, `--number-input-icon-size`.
- Input: `--number-input-input-bg`, `--number-input-input-color`,
  `--number-input-input-font-size`, `--number-input-input-line-height`,
  `--number-input-input-padding-x`, `--number-input-input-padding-y`.
- Scrubber and state: `--number-input-scrubber-gap`, `--number-input-scrubber-color`,
  `--number-input-disabled-opacity`.

## Intentional sugar and differences from upstream

moduix adds visual defaults, stable `data-slot` hooks, and default trigger icons. It does not add
variants, sizes, slot prop bags, class-name maps, or high-level props over Ark behavior.

Breaking migration differences from the old previous wrapper:

- `NumberField` and all `NumberField*` flat aliases are removed.
- `NumberInput` no longer auto-renders the control group; compose Ark parts explicitly.
- `value` / `defaultValue` are strings instead of `number | null`.
- `onValueChange` receives Ark details instead of a bare numeric value.
- `format` is replaced by `formatOptions`.
- `allowWheelScrub` is replaced by Ark `allowMouseWheel`.
- `decrementLabel` / `incrementLabel` are replaced by `translations`.
- `--number-field-*` variables are replaced by `--number-input-*`.

## Agent notes

Keep the public barrel limited to the styled visual parts plus `RootProvider`. Advanced state
helpers come from Ark directly. Registry source paths are under
`packages/react/src/components/number-input`.

## Local changelog

- 2026-07-03: Removed moduix re-exports of Ark number-input state helpers and the renderless
  `Context` part from the public surface; `RootProvider` remains for Ark-owned external state.
- 2026-06-26: Aligned scrubber composition, context/value-text coverage, Ark state docs, and CSS
  variable references with the official Ark UI number input documentation.
- 2026-06-19: Migrated from legacy `NumberField` to Ark UI `NumberInput`; renamed source, docs,
  registry item, slots, CSS variables, examples, and public exports to `number-input`.
# NumberInput

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/number-input
- Chakra UI: https://chakra-ui.com/docs/components/number-input

## Purpose

`NumberInput` is the moduix wrapper around Ark UI's number input primitive for bounded numeric
entry: prices, counters, quantities, formatting, stepping, and scrubbing.

## Contract

- Ark's root composition, string `value` / `defaultValue`, details-object callbacks
  (`onValueChange`, `onValueCommit`, `onValueInvalid`, `onFocusChange`), parser and formatter,
  `translations`, `Field` / `Fieldset` context, `RootProvider`, `Context`, hooks, and `asChild` are
  preserved as-is. Use `details.valueAsNumber` when numeric state is needed.
- The wrapper adds styles, stable `data-slot` hooks, default minus/plus icons in the trigger parts,
  the `NumberInputField` shortcut, and a `size` prop (`xs`–`xl`, default `md`) on `NumberInput` and
  `NumberInputRootProvider`, mirrored as `data-size`. It adds no other props over Ark behavior.
- `name` and `form` submit the visible text spinbutton. Render a hidden `<input>` through
  `NumberInputContext` with `context.valueAsNumber` only when the form needs the parsed number.
- Every package exports `NumberInputRootProps`, `NumberInputRootProviderProps` (with `size`), and
  `NumberInputSize`, plus the Ark part, details, and hook types under their `NumberInput*` names.

## Anatomy

```text
NumberInput
├─ NumberInputLabel
├─ NumberInputScrubber (optional)
├─ NumberInputField (shortcut)
│  └─ NumberInputControl
│     ├─ NumberInputDecrementTrigger
│     ├─ NumberInputInput
│     └─ NumberInputIncrementTrigger
└─ NumberInputValueText (optional)

NumberInputRootProvider
└─ same part tree connected to state created with `useNumberInput()`
```

| Part                          | `data-slot`                      | Notes                                           |
| ----------------------------- | -------------------------------- | ----------------------------------------------- |
| `NumberInput`                 | `number-input-root`              | Root state, parsing, formatting, and a11y.      |
| `NumberInputRootProvider`     | `number-input-root-provider`     | Connects to Ark `useNumberInput()` state.       |
| `NumberInputContext`          | -                                | Renders access to the current Ark state.        |
| `NumberInputLabel`            | `number-input-label`             | Accessible label for the input.                 |
| `NumberInputScrubber`         | `number-input-scrubber`          | Optional drag-to-change affordance.             |
| `NumberInputControl`          | `number-input-control`           | Wrapper around triggers and input.              |
| `NumberInputField`            | `number-input-control`           | Default control, input, and trigger group.      |
| `NumberInputDecrementTrigger` | `number-input-decrement-trigger` | Renders a minus icon when children are omitted. |
| `NumberInputInput`            | `number-input-input`             | Managed editable numeric input.                 |
| `NumberInputIncrementTrigger` | `number-input-increment-trigger` | Renders a plus icon when children are omitted.  |
| `NumberInputValueText`        | `number-input-value-text`        | Read-only formatted value text.                 |

`useNumberInput` and `useNumberInputContext` are exported as top-level hooks.

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

`NumberInputField` accepts the props of `NumberInputControl` except `asChild` and `children`. Compose
`NumberInputControl` with the trigger and input parts when their order, icons, or styles must differ;
pass `translations` when custom trigger content needs localized accessible labels.

Use `NumberInputRootProvider` only with state created by `useNumberInput()`, and do not also render
`NumberInput` for the same state.

## Styling

- `size` sets the control height (`--moduix-size-*`), input padding and text size like `Input`, and
  the trigger icon size; triggers are square. The label keeps one size. The control uses logical
  borders and radii, so it follows the text direction.
- A disabled root uses `--moduix-opacity-disabled`, except inside a disabled `Field` or `Fieldset`,
  which already dims its content.
- Ark disables a trigger at the `min` or `max` value and in read-only mode; such a trigger shows a
  muted icon and ignores the pointer.
- Invalid state (`invalid` prop, out-of-range value, or an invalid `Field`) colors the borders and
  the focus ring with `--moduix-color-destructive`.

CSS Modules variables: `--moduix-number-input-control-height` (input height and trigger size for
every `size`),
`--moduix-number-input-input-width` (default `6rem`), and `--moduix-number-input-radius` (outer
corners). Everything else comes from foundation tokens; override a part through its class.
Tailwind packages use utilities and consumer classes instead.

## Agent notes

Keep `NumberInputField` a narrow shortcut over the visible parts; state helpers stay Ark behavior
re-exported by moduix. Registry source paths are under `packages/react/src/components/number-input`.
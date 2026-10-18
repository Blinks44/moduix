# PinInput

Upstream (accessed 2026-10-18):

- Ark UI: https://ark-ui.com/docs/components/pin-input
- Chakra UI: https://chakra-ui.com/docs/components/pin-input
- shadcn/ui Input OTP: https://ui.shadcn.com/docs/components/input-otp

| Source    | Useful difference                                                         | moduix decision                                                                                                               |
| --------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Ark UI    | Root, Label, Control, indexed Input, HiddenInput; default placeholder `○` | **Required correctness:** keep every part, string-array values, and callback details. Placeholder defaults to `''`.           |
| Chakra UI | `size` (2xs–2xl), `variant` (outline, subtle, flushed), `attached`        | **Adopted:** `size` with the moduix control scale (xs–xl). **Rejected:** variants and `attached` until a use case needs them. |
| shadcn/ui | Grouped slots with a separator; different primitive (`input-otp`)         | **Adopted:** `PinInputSeparator` for groups. `PinInputInputs` covers the ungrouped sequence.                                  |

## Purpose

`PinInput` collects short fixed-length codes through separate one-character inputs.

## Current behavior contract

- Ark owns value state (`value`, `defaultValue`, `onValueChange`, `onValueComplete`,
  `onValueInvalid`), `type`, `pattern`, `otp`, `mask`, `blurOnComplete`, `autoSubmit`, focus transfer,
  paste distribution, keyboard editing, and `Field` / `Fieldset` state.
- The placeholder defaults to `''` instead of Ark's `○` on `PinInput` and in `usePinInput`; pass
  `placeholder` to show one.
- `PinInput` and `PinInputRootProvider` accept `size="xs" | "sm" | "md" | "lg" | "xl"`, default `md`,
  mirrored as `data-size`. It sets the square cell size to `--moduix-size-*` and scales the cell text.
- Compose `PinInputHiddenInput` explicitly for native form submission, reset, and `autoSubmit`.
- `PinInputInputs` is fixed sugar: one `PinInputInput` per Ark context item. Its `className` (`class`)
  goes to every generated input. Use explicit `PinInputInput` parts with continuous indexes for groups
  or per-input props.
- `PinInputSeparator` is a decorative `span` with `aria-hidden` and `SeparatorMarkIcon` by default;
  `children` replace the icon.
- Exports `PinInputRootProps`, `PinInputRootProviderProps`, `PinInputSize`, and the Ark part, details,
  and hook types.

## Anatomy

```text
PinInput / PinInputRootProvider  data-slot="pin-input-root[-provider]" data-size
├─ PinInputLabel                 data-slot="pin-input-label"
├─ PinInputControl               data-slot="pin-input-control"
│  ├─ PinInputInputs → PinInputInput[index]  data-slot="pin-input-input"
│  └─ PinInputSeparator          data-slot="pin-input-separator"
└─ PinInputHiddenInput           (explicit, Ark)
```

`PinInputContext` gives render-prop access to the root state; `usePinInputContext` reads it.

## Defaults and styling

- The root is an `inline-flex` column; the cells keep their size and do not stretch.
- CSS Modules expose `--moduix-pin-input-input-size` (applies to every size), `--moduix-pin-input-gap`,
  and `--moduix-pin-input-radius`. Everything else comes from foundation tokens; override it with a
  class on the part. Per-size values are private `--_pin-input-*` properties.
- A disabled `Field`, `FieldRootProvider`, `Fieldset`, or `FieldsetRootProvider` owns the opacity; the
  pin input is not dimmed a second time. A standalone disabled pin input dims its root.
- State hooks come from Ark: root and label `data-disabled`, `data-invalid`, `data-complete`,
  `data-readonly`; input `data-disabled`, `data-invalid`, `data-complete`, `data-filled`, `data-index`.

## Agent notes

- Keep callbacks and values Ark-shaped; do not adapt arrays to strings or add `OTPField*` aliases.
- Keep `PinInputInputs` fixed; do not turn it into a prop bag.
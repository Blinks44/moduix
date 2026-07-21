# PinInput

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/pin-input
- Chakra UI: https://chakra-ui.com/docs/components/pin-input

## Purpose

`PinInput` collects short fixed-length codes through separate one-character inputs.

## Upstream model to preserve

The wrapper follows Ark UI `PinInput`: `Root`, `Label`, `Control`, indexed `Input`, `RootProvider`,
and `usePinInput`. `Root` and `RootProvider` render the native form input internally. `PinInput.Inputs`
is moduix sugar for the standard sequence of indexed inputs.

The official MDX content was reviewed from the task attachment `component-documentation.mdx` and
checked against the installed Ark UI 5.37.2 props and examples.

## Current behavior contract

`PinInput` is the short root form and is equivalent to `PinInput.Root`. It accepts Ark root props:
`count`, `value`, `defaultValue`, `type`, `pattern`, `placeholder`, `otp`, `mask`,
`blurOnComplete`, `selectOnFocus`, `onValueChange(details)`, `onValueComplete(details)`, and
`onValueInvalid(details)`.

moduix overrides Ark's default placeholder behavior by using an empty placeholder string unless the
consumer passes `placeholder` explicitly.

## Anatomy and exported parts

```tsx
<PinInput count={6}>
  <PinInput.Label />
  <PinInput.Control>
    <PinInput.Inputs />
  </PinInput.Control>
</PinInput>
```

| Export                  | Slot / behavior                                           |
| ----------------------- | --------------------------------------------------------- |
| `PinInput` / `.Root`    | `data-slot="pin-input-root"`; Ark root state machine.     |
| `PinInput.RootProvider` | `data-slot="pin-input-root-provider"`; external state.    |
| `PinInput.Label`        | `data-slot="pin-input-label"`; Ark label part.            |
| `PinInput.Control`      | `data-slot="pin-input-control"`; wraps visible inputs.    |
| `PinInput.Input`        | `data-slot="pin-input-input"`; requires `index`.          |
| `PinInput.Inputs`       | Renders one indexed `Input` per Ark context item.         |
| `PinInput.Separator`    | `data-slot="pin-input-separator"`; decorative moduix aid. |
| `usePinInput`           | Ark state hook for `RootProvider`.                        |

## Composition

```tsx
import { PinInput } from '@moduix/react';

export function VerificationCodeField() {
  return (
    <PinInput count={6} name="verificationCode" otp>
      <PinInput.Label>Verification code</PinInput.Label>
      <PinInput.Control>
        <PinInput.Inputs />
      </PinInput.Control>
    </PinInput>
  );
}
```

## Upstream feature coverage

- Basic composition maps directly to Ark `Root` / `Label` / `Control` / `Input`. `PinInput.Inputs`
  removes only the repeated indexed-input loop.
- Placeholder, blur-on-complete, OTP mode, masking, controlled values, field integration, and
  RootProvider examples are represented in Storybook and docs.
- Controlled and uncontrolled values use Ark string arrays.
- `type` and `pattern` replace the old legacy `validationType` contract.
- `PinInput.Separator` is moduix sugar only; it is not an Ark primitive part.

## Accessibility and state

Ark owns input labels, focus transfer, paste distribution, keyboard editing, invalid events, and
hidden input form data. The root renders its native form input automatically; configure form participation with root props such as `name` and `form`.

`Field.Root` and `Fieldset.Root` context can provide disabled, invalid, required, and read-only
state. The internal native form input reads Ark field context for described-by wiring.

State callbacks keep Ark detail shapes:

- `onValueChange(details)` and `onValueComplete(details)` expose `details.value` and
  `details.valueAsString`.
- `onValueInvalid(details)` exposes `details.value` and `details.index`.

## Defaults and styling

Each PIN cell is square and defaults to `--size-md`; `--pin-input-input-size` remains the shared override.

Styling targets Ark `data-scope="pin-input"` / `data-part` attributes plus stable moduix
`data-slot` hooks. Public CSS variables are `--pin-input-*` and live in `theme.css`.

Important hooks:

- root: `data-disabled`, `data-invalid`, `data-complete`, `data-readonly`
- label: `data-disabled`, `data-invalid`, `data-complete`, `data-required`, `data-readonly`
- input: `data-disabled`, `data-invalid`, `data-complete`, `data-filled`, `data-index`
- separator: `data-slot="pin-input-separator"`

## Intentional sugar and differences from upstream

- `PinInput.Separator` provides a decorative grouping helper with the default separator icon.
- `PinInput.Inputs` renders the standard indexed input sequence from Ark context. Its `className`
  is applied to each generated input; use explicit `Input` parts for grouping or per-input props.
- The default placeholder is `''` instead of Ark's `○`. Use `placeholder` when visible placeholders
  are desired.
- No legacy compatibility remains: `OTPField`, `OTPFieldInput`, `OTPFieldSeparator`, `length`,
  `validationType`, string `value`, string `defaultValue`, string callbacks, and `normalizeValue`
  were removed.

## Agent notes

- Preserve namespace-first exports. Do not add flat `PinInputInput` or old `OTPField*` aliases.
- Keep callbacks and value state Ark-shaped; do not adapt arrays back to strings.
- Keep `Inputs` as fixed convenience sugar; do not turn it into a prop bag or replace explicit
  `Input` composition for grouped layouts.
- `Root` and `RootProvider` render the native form input automatically for form submission, reset,
  and autofill behavior.
- When adding grouped layouts, input indexes must stay continuous across separators.

## Local changelog

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-21: Reduced default square PIN cells to `--size-md`.

- 2026-07-13: Native form controls are now rendered automatically; the former public form-control part was removed.

- 2026-07-10: Added `PinInput.Inputs` as the recommended fixed renderer for the standard indexed
  input sequence; explicit `Input` composition remains the advanced path.
- 2026-07-03: Simplified the public surface to match `Combobox`: removed moduix re-exports for Ark
  context APIs and duplicate type aliases, and stopped auto-rendering hidden `Control`/`Input`/
  the native form input structure inside `PinInput.Root`.
- 2026-06-20: Renamed `otp-field` to `pin-input`, replaced legacy OTPField with Ark UI
  `PinInput`, adopted Ark parts/callbacks/value arrays, exposed RootProvider/context hooks, updated
  styling hooks and tokens, and removed legacy API compatibility.
- 2026-06-26: Audited the Ark migration against the official PinInput MDX, removed stale submit
  and sanitize guidance, and aligned CSS/docs state hooks with Ark data attributes.
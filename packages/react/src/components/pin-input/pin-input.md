# PinInput

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/pin-input
- Chakra UI: https://chakra-ui.com/docs/components/pin-input

## Purpose

`PinInput` collects short fixed-length codes through separate one-character inputs.

## Upstream model to preserve

The wrapper follows Ark UI `PinInput`: `Root`, `Label`, `Control`, indexed `Input`,
`HiddenInput`, `Context`, `RootProvider`, `usePinInput`, and `usePinInputContext`.

The official MDX content was reviewed from the task attachment `component-documentation.mdx` and
checked against the installed Ark UI 5.37.2 props and examples.

## Current behavior contract

`PinInput` is the short root form and is equivalent to `PinInput.Root`. It accepts Ark root props:
`count`, `value`, `defaultValue`, `type`, `pattern`, `placeholder`, `otp`, `mask`,
`blurOnComplete`, `selectOnFocus`, `onValueChange(details)`, `onValueComplete(details)`, and
`onValueInvalid(details)`.

moduix overrides Ark's default placeholder behavior by using an empty placeholder string unless the
consumer passes `placeholder` explicitly.

When `children` are omitted and `count` is a number, moduix renders a default `Control`, indexed
`Input` parts, and `HiddenInput`. Manual Ark composition remains the primary documented path.

## Anatomy and exported parts

```tsx
<PinInput count={6}>
  <PinInput.Label />
  <PinInput.Control>
    <PinInput.Input index={0} />
    <PinInput.Input index={1} />
  </PinInput.Control>
  <PinInput.HiddenInput />
</PinInput>
```

| Export                  | Slot / behavior                                           |
| ----------------------- | --------------------------------------------------------- |
| `PinInput` / `.Root`    | `data-slot="pin-input-root"`; Ark root state machine.     |
| `PinInput.RootProvider` | `data-slot="pin-input-root-provider"`; external state.    |
| `PinInput.Label`        | `data-slot="pin-input-label"`; Ark label part.            |
| `PinInput.Control`      | `data-slot="pin-input-control"`; wraps visible inputs.    |
| `PinInput.Input`        | `data-slot="pin-input-input"`; requires `index`.          |
| `PinInput.HiddenInput`  | `data-slot="pin-input-hidden-input"`; native form input.  |
| `PinInput.Separator`    | `data-slot="pin-input-separator"`; decorative moduix aid. |
| `PinInput.Context`      | Ark render-prop context.                                  |
| `usePinInput`           | Ark state hook for `RootProvider`.                        |
| `usePinInputContext`    | Ark context hook for custom child parts.                  |

## Composition

```tsx
import { PinInput } from '@moduix/react';

export function VerificationCodeField() {
  return (
    <PinInput count={6} name="verificationCode" otp>
      <PinInput.Label>Verification code</PinInput.Label>
      <PinInput.Control>
        {Array.from({ length: 6 }, (_, index) => (
          <PinInput.Input key={index} index={index} />
        ))}
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput>
  );
}
```

## Upstream feature coverage

- Basic composition maps directly to Ark `Root` / `Label` / `Control` / `Input` / `HiddenInput`.
- Placeholder, blur-on-complete, OTP mode, masking, controlled values, field integration, and
  RootProvider examples are represented in Storybook and docs.
- Moduix default composition and grouped-separator composition are documented as local sugar after
  the core Ark examples.
- Controlled and uncontrolled values use Ark string arrays.
- `type` and `pattern` replace the old legacy `validationType` contract.
- `PinInput.Separator` is moduix sugar only; it is not an Ark primitive part.

## Accessibility and state

Ark owns input labels, focus transfer, paste distribution, keyboard editing, invalid events, and
hidden input form data. Keep `HiddenInput` mounted for native forms, autofill, and reset behavior.

`Field.Root` and `Fieldset.Root` context can provide disabled, invalid, required, and read-only
state. `HiddenInput` reads Ark field context for described-by wiring.

State callbacks keep Ark detail shapes:

- `onValueChange(details)` and `onValueComplete(details)` expose `details.value` and
  `details.valueAsString`.
- `onValueInvalid(details)` exposes `details.value` and `details.index`.

## Defaults and styling

Styling targets Ark `data-scope="pin-input"` / `data-part` attributes plus stable moduix
`data-slot` hooks. Public CSS variables are `--pin-input-*` and live in `theme.css`.

Important hooks:

- root: `data-disabled`, `data-invalid`, `data-complete`, `data-readonly`
- label: `data-disabled`, `data-invalid`, `data-complete`, `data-required`, `data-readonly`
- input: `data-disabled`, `data-invalid`, `data-complete`, `data-filled`, `data-index`
- separator: `data-slot="pin-input-separator"`

## Intentional sugar and differences from upstream

- `PinInput` renders default visible inputs when `children` are omitted and `count` is provided.
- `PinInput.Separator` provides a decorative grouping helper with the default separator icon.
- The default placeholder is `''` instead of Ark's `○`. Use `placeholder` when visible placeholders
  are desired.
- No legacy compatibility remains: `OTPField`, `OTPFieldInput`, `OTPFieldSeparator`, `length`,
  `validationType`, string `value`, string `defaultValue`, string callbacks, and `normalizeValue`
  were removed.

## Agent notes

- Preserve namespace-first exports. Do not add flat `PinInputInput` or old `OTPField*` aliases.
- Keep callbacks and value state Ark-shaped; do not adapt arrays back to strings.
- Keep `HiddenInput` in examples that submit forms or need reset/autofill behavior.
- When adding grouped layouts, input indexes must stay continuous across separators.

## Local changelog

- 2026-06-20: Renamed `otp-field` to `pin-input`, replaced legacy OTPField with Ark UI
  `PinInput`, adopted Ark parts/callbacks/value arrays, exposed RootProvider/context hooks, updated
  styling hooks and tokens, and removed legacy API compatibility.
- 2026-06-26: Audited the Ark migration against the official PinInput MDX, removed stale submit
  and sanitize guidance, and aligned CSS/docs state hooks with Ark data attributes.
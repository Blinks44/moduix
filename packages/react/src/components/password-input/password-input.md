# PasswordInput

Upstream (accessed 2026-10-18):

- Ark UI: https://ark-ui.com/docs/components/password-input
- Chakra UI: https://chakra-ui.com/docs/components/password-input

| Source    | Useful difference                                          | moduix decision                                                                                             |
| --------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Ark UI    | Root, Label, Control, Input, VisibilityTrigger, Indicator  | **Required correctness:** keep every part and the Ark state contract.                                       |
| Chakra UI | One `PasswordInput` element; `size` follows `Input` sizes  | **Adopted:** `size` on the root with the `Input` scale.                                                     |
| Chakra UI | `visibilityIcon={{ on, off }}` and `PasswordStrengthMeter` | **Rejected:** `PasswordInputIndicator` children/fallback cover icons; the strength meter is a docs example. |
| shadcn/ui | No password input                                          | -                                                                                                           |

## Purpose

`PasswordInput` is a secure text input whose value can be shown or hidden with an accessible
visibility trigger.

## Current behavior contract

- Ark owns visibility (`visible`, `defaultVisible`, `onVisibilityChange(details)`), the input `type`,
  trigger labels (`translations.visibilityTrigger`), ARIA wiring, and `Field` / `Fieldset` state.
- `PasswordInput` and `PasswordInputRootProvider` accept `size="xs" | "sm" | "md" | "lg" | "xl"`,
  default `md`, mirrored as `data-size`. It sets the control height, input padding and text size like
  `Input`, plus the trigger and icon size.
- `PasswordInputField` is fixed sugar for control + input + visibility trigger + indicator. Its
  `className` and ref target the control. Use the explicit parts for input props such as
  `placeholder`, `value`, or `defaultValue`.
- `PasswordInputIndicator` defaults to `EyeIcon` (visible) and `EyeClosedIcon` (hidden fallback);
  `children` and `fallback` replace them.
- The native input takes part in form submission and reset; there is no `HiddenInput` part.
- Exports `PasswordInputRootProps`, `PasswordInputRootProviderProps`, `PasswordInputSize`, and the Ark
  part, details, and hook types.

## Anatomy

```text
PasswordInput / PasswordInputRootProvider  data-slot="password-input-root[-provider]" data-size
├─ PasswordInputLabel                      data-slot="password-input-label"
└─ PasswordInputField → PasswordInputControl  data-slot="password-input-control"
   ├─ PasswordInputInput                   data-slot="password-input-input"
   └─ PasswordInputVisibilityTrigger       data-slot="password-input-visibility-trigger"
      └─ PasswordInputIndicator            data-slot="password-input-indicator"
```

`PasswordInputContext` gives render-prop access to the root state.

## Defaults and styling

- The root fills its container (`--moduix-password-input-width: 100%`).
- The bordered shell lives on `PasswordInputControl`, so the input stops before the trigger.
- The trigger is a larger transparent hit area; the indicator inside it is the hover and focus
  surface, aligned with the input padding.
- CSS Modules expose `--moduix-password-input-width`, `--moduix-password-input-height` (applies to
  every size), and `--moduix-password-input-radius`. Everything else comes from foundation tokens;
  override it with a class on the part. Per-size values are private `--_password-input-*` properties.
- A disabled `Field`, `FieldRootProvider`, `Fieldset`, or `FieldsetRootProvider` owns the opacity; the
  password input is not dimmed a second time. A standalone disabled password input dims its root.

## Agent notes

- Keep the wrapper thin: no local visibility state, no `InputGroup` implementation.
- Mirror new Ark parts with the flat naming style.
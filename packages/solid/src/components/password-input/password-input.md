# PasswordInput

## Upstream reference

- Ark UI: https://ark-ui.com/docs/components/password-input

## Purpose

`PasswordInput` reveals or hides a secure text input through an accessible visibility control.

## Public contract

The flat API includes `PasswordInput`, `PasswordInputRootProvider`, `PasswordInputLabel`, `PasswordInputControl`, `PasswordInputInput`, `PasswordInputVisibilityTrigger`, `PasswordInputIndicator`, `PasswordInputField`, `PasswordInputContext`, `usePasswordInput`, and `usePasswordInputContext`. Visibility uses Ark's `visible`, `defaultVisible`, and `onVisibilityChange(details)` contract. The root and root provider accept `size` (`xs`–`xl`, default `md`) mirrored as `data-size`; see the React `password-input.md` for the shared styling contract.

## Preservation notes

- Keep input type, visibility state, and trigger labeling owned by Ark.
- `PasswordInputField` is fixed composition sugar; retain the lower-level parts for customized native input props.
- Preserve Solid form props, reactive children, and `class`. `PasswordInputInput` applies `defaultValue` as a DOM property so form reset restores it.

## Styling and accessibility

The input remains a native form control. Keep label wiring, trigger translations, state attributes, and `data-slot` hooks.
---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

PasswordInput: `PasswordInput` and `PasswordInputRootProvider` accept `size` (`xs`, `sm`, `md`, `lg`, `xl`; default `md`), mirrored as `data-size`. It sets the control height, input padding and text size the same way as `Input`, and scales the visibility trigger and icon; `--moduix-password-input-height` still overrides the height for every size. Every package exports `PasswordInputSize`, `PasswordInputRootProps`, and `PasswordInputRootProviderProps` (Vue exports the moduix props under these names instead of the Ark ones), and React and Solid now re-export the Ark part, details, and hook types, like Vue.
A disabled password input inside a disabled `Field` or `Fieldset` is no longer dimmed twice; the root keeps full opacity there, as `Input` and `NumberInput` do.
CSS Modules keep three variables, `--moduix-password-input-width`, `--moduix-password-input-height`, and `--moduix-password-input-radius`; the other 30 `--moduix-password-input-*` variables are removed, including `--moduix-password-input-max-width` and the fallback to `--moduix-button-icon-size`. Colors, borders, focus ring, typography, spacing, and disabled opacity come from foundation tokens, so override them with a plain class on the part. The no-op read-only, disabled-input, and `opacity` transition rules are gone; default visuals at `md` are unchanged.
Tailwind drops the no-op `max-w-none`, `w-full` (control), `min-h-0`, `min-w-control-sm`, `data-readonly:*`, and `disabled:*` utilities, and the control uses the logical `pe-2` instead of `pr-2`, so the trigger keeps its inset in RTL. Vue `PasswordInputContext` reads the Ark context directly instead of passing a placeholder `value` to the Ark component, and the empty `PasswordInputContextProps` type is no longer exported from Vue.
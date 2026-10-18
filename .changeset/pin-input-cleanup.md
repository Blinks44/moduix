---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

PinInput: `PinInput` and `PinInputRootProvider` accept `size` (`xs`, `sm`, `md`, `lg`, `xl`; default `md`), mirrored as `data-size`. It sets the square cell size to the control height scale (24–48px) and scales the cell text; `--moduix-pin-input-input-size` still overrides the cell size for every size. Every package exports `PinInputSize`, `PinInputRootProps`, and `PinInputRootProviderProps` (Vue exports the moduix props under these names instead of the Ark ones and drops the `PinInputEmits` alias of `PinInputRootEmits`), and React and Solid now re-export the Ark part, details, and hook types, like Vue.
A disabled pin input inside a disabled `Field` or `Fieldset` is no longer dimmed twice; the root keeps full opacity there, as `Input`, `NumberInput`, and `PasswordInput` do.
CSS Modules keep three variables, `--moduix-pin-input-input-size`, `--moduix-pin-input-gap`, and `--moduix-pin-input-radius`; the other 30 `--moduix-pin-input-*` variables are removed, including `--moduix-pin-input-input-width`/`-height`, `--moduix-pin-input-width`/`-max-width`, `--moduix-pin-input-root-gap`, and the separator and label variables. Colors, borders, focus ring, typography, and disabled opacity come from foundation tokens, so override them with a plain class on the part. The no-op complete-state border, disabled `pointer-events`, and `background-color` transition rules are gone; default visuals at `md` are unchanged.
Tailwind drops the no-op `w-auto`, `max-w-none`, `disabled:pointer-events-none`, `data-disabled:pointer-events-none`, and separator `items-center justify-center leading-none pointer-events-none` utilities, and uses `p-0` instead of `px-0 py-0`. `PinInputSeparator` no longer adds `role="presentation"` next to `aria-hidden`. React and Solid `PinInput` no longer split `count` (and Solid `children`) out of the props only to pass them back.
---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

NumberInput: `NumberInput` and `NumberInputRootProvider` accept `size` (`xs`, `sm`, `md`, `lg`, `xl`; default `md`), mirrored as `data-size`. It sets the control height, input padding and text size the same way as `Input`, and the trigger icon size; `--moduix-number-input-control-height` still overrides the height for every size. Every package exports `NumberInputSize`, and `NumberInputRootProps` / `NumberInputRootProviderProps` now include `size` (Vue exports the moduix props under these names instead of the Ark ones).
A disabled number input inside a disabled `Field` or `Fieldset` is no longer dimmed twice; the root keeps full opacity there, as `Input` and `DateInput` do. A trigger that Ark disables at the `min` or `max` value or in read-only mode now shows a muted icon instead of looking clickable.
CSS Modules keep three variables, `--moduix-number-input-control-height`, `--moduix-number-input-input-width`, and `--moduix-number-input-radius`; the other 30 `--moduix-number-input-*` variables are removed. Colors, borders, focus ring, typography, spacing, and disabled opacity come from foundation tokens, so override them with a plain class on the part. The invalid focus ring is now destructive on the triggers as well as the input, matching the Tailwind packages. Dead `opacity` transitions are removed; default visuals are otherwise unchanged.
Tailwind drops the no-op `w-auto`, `max-w-none`, and `items-stretch` utilities and the duplicate `data-invalid:` input classes, and uses `shrink-0` instead of `min-w-control-md` on the triggers. Solid Tailwind no longer splits `value` out of the root props only to pass it back. Vue `NumberInputInput` no longer declares a default slot on the void `<input>`. React and Solid now re-export the Ark `NumberInput*` part, details, and hook types, like Vue.
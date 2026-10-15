---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

DateInput: the root is now sized to its content (like `NumberInput`) instead of stretching to `100%`; set `--moduix-date-input-width: 100%` or add `w-full` to stretch it in a form. A disabled date input inside a disabled `Field` or `Fieldset` is no longer dimmed twice, and in Tailwind a focused placeholder segment now uses the foreground color like CSS Modules. The control sets its own font size and line height to match `Input`.
CSS Modules keep three variables: `--moduix-date-input-width`, `--moduix-date-input-control-height`, and `--moduix-date-input-radius`; the other 30 are removed, override colors and spacing with a plain class instead. `DateInputSeparator` no longer adds `role="presentation"` (it stays `aria-hidden`). React and Solid now re-export the Ark DateInput part props, callback details, and hook types.
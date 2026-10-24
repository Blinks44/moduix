---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Input: The input now has `min-width: 0` (`min-w-0` in Tailwind), so an input with `htmlSize` shrinks in a narrow flex row instead of overflowing it. CSS Modules keep three variables, `--moduix-input-width`, `--moduix-input-height`, and `--moduix-input-radius`; the other 44 `--moduix-input-*` variables, including the per-size `-xs`…`-xl` ones, are removed. Colors, padding, typography, focus ring, transition, and disabled opacity come from foundation tokens, so override them with a plain class on `Input`. `--moduix-input-height` now applies to every size instead of only `md`. The no-op read-only rules and the file-button reads of `--moduix-button-*` variables are gone; default visuals are unchanged.
The `data-html-size` attribute is removed: with `htmlSize` the native `size` attribute is rendered and CSS Modules select `[size]` for the `auto` width. Tailwind drops the redundant `max-w-none`.
TagsInput and PasswordInput no longer fall back to `--moduix-input-*` variables, and Vue `InputGroupInput` no longer overrides them; `InputGroup` now removes the Input border, background, and height with a more specific selector in every CSS Modules package, so it no longer depends on stylesheet order. `InputGroupButton` no longer makes the group taller: it kept the Button `min-height` inside the group border, so a group with a button was 2px taller than one without. The grouped-button `padding-inline`, `font-size`, `line-height`, and `color` rules always lost to Button and are removed together with the `--moduix-input-group-button-color` variable; the button keeps its Button size and variant styles as before. Every package exports `InputRootProps` and `InputSize`; Vue drops the `FieldInputProps` re-export, import it from `@ark-ui/vue/field` instead.
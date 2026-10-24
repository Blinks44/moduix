---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

TagsInput: In the Tailwind packages a disabled root no longer dims the clear trigger a second time; before, the shared close button applied its own disabled opacity inside the already dimmed root.
The CSS Modules packages keep 3 `--moduix-tags-input-*` variables instead of 63: `width`, `min-height`, and `radius`. Color, spacing, typography, focus-ring, transition, tag, trigger, and `clear-trigger` variables are removed in favor of foundation tokens; override those with a class on the part. Default visuals are unchanged.
`--moduix-tags-input-width` now defaults to `24rem` with `max-width: 100%` (Tailwind `w-96 max-w-full`), so a larger width is no longer capped at 24rem; `--moduix-tags-input-max-width` is removed.
`TagsInputClearTrigger` passes `aria-label`, `aria-labelledby`, and Ark's translated label straight to the shared close button; the accessible name and attributes are unchanged.
React and Solid export the Ark tags-input prop and detail types, like Vue. Vue re-exports Ark `TagsInputHiddenInput` directly and adds the `TagsInputLabelProps` types.
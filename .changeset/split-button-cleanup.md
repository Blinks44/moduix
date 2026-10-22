---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

SplitButton: the CSS Modules packages keep 1 `--moduix-split-button-*` variable instead of 10. `--moduix-split-button-separator-color` now holds the full separator color (default `color-mix(in srgb, currentColor 16%, transparent)`) and replaces `--moduix-split-button-separator-opacity`. The separator `inset`, `offset`, and `width` variables and the per-size `trigger-padding-x-*` variables are removed; change them with a class on `SplitButtonTrigger`. Outline variants now hide the separator with `display: none` instead of `opacity: 0`.
Remove the press-effect reset and `min-width: 0` from the action and trigger: Button already skips its press offset for parts with their own `data-slot`, and the inline-flex group never shrinks them.
Export the `SplitButtonRootProps`, `SplitButtonActionProps`, `SplitButtonTriggerProps`, `SplitButtonPositionerProps`, `SplitButtonContentProps`, `SplitButtonSize`, and `SplitButtonVariant` types.
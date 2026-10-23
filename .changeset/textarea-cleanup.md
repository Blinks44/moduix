---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Textarea: add `size="xs" | "sm" | "md" | "lg" | "xl"` (default `md`, mirrored as `data-size`) and the `TextareaSize` type. Inline padding and font size match `Input` of the same size, so stacked controls line up; at the default `md` size the inline padding changes from `--moduix-spacing-3-5` to `--moduix-spacing-3` (`px-3` in Tailwind). The fixed `6rem` minimum height is removed: height now comes from the native `rows` attribute (2 by default) and scales with the size, so set `rows` or a class for a taller field.
`InputGroupTextarea` inherits the group size unless it gets its own `size`, like `InputGroupInput`, and takes its font from that size instead of inheriting it.
Inside a disabled `Field`, `FieldRootProvider`, or `Fieldset` the textarea is no longer dimmed a second time on top of the field opacity.
CSS Modules keep two variables, `--moduix-textarea-width` and `--moduix-textarea-radius`; the other 21 `--moduix-textarea-*` variables, including `--moduix-textarea-min-height`, `--moduix-textarea-resize`, and the no-op read-only ones, are removed. Colors, padding, typography, focus ring, transition, and disabled opacity come from foundation tokens, so override them with a plain class on `Textarea`. Tailwind drops the redundant `max-w-none`.
The `data-autoresize` attribute and its `overflow-y: hidden` rule are removed: Ark already sets inline `resize` and `overflow` while `autoresize` is on. Solid sets `defaultValue` through `prop:defaultValue` on every path instead of a ref callback, and the unused `applyDefaultValue` and `applyDefaultSelected` helpers are removed from the Solid `defaultValue` internal file. Every package exports `TextareaRootProps`; Vue drops the `FieldTextareaProps` re-export, import it from `@ark-ui/vue/field` instead.
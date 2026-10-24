---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Tag: In the Tailwind packages the `TagCloseTrigger` icon is 12px like in the CSS Modules packages; before, the shared close button rule made it 16px inside the 16px trigger.
`TagCloseTrigger` is now named `Remove tag` unless it receives `aria-label` or `aria-labelledby`, also with custom children or `asChild`. Before, custom children and `asChild` fell back to the generic `Close` name.
The CSS Modules packages keep 3 `--moduix-tag-*` variables instead of 42: `bg`, `border-color`, and `color`, which override every variant. Per-variant color, size, gap, padding, radius, border-width, typography, icon-size, transition, disabled-opacity, and `--moduix-tag-close-trigger-*` variables are removed in favor of foundation tokens; override those with a class on the part. Default visuals are unchanged.
A `Tag` rendered as a `button` or `a` through `asChild` shows a pointer cursor, so the render-as-button example no longer needs its own styles.
New: `size="lg"` (28px minimum height, 14px text), like `Badge`.
Every framework exports the types `TagRootProps`, `TagSize`, and `TagVariant`.
---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Alert: `AlertIndicator` now sizes itself to its content instead of a fixed 16px box, so a size class on the icon (for example `size-6`) resizes the indicator too; before, a larger icon overflowed into the gap and sat off-center next to the title.
The CSS Modules packages keep 5 `--moduix-alert-*` variables instead of 37: `bg`, `border-color`, `color`, and `indicator-color`, which override every status (scope them with `[data-status='success']` and similar selectors to theme one status), and `description-color`. The per-status, spacing, radius, shadow, border-width, indicator size and offset, title, and description typography variables are removed in favor of foundation tokens; override those with a class on the part. Default visuals are unchanged.
Removed the no-op title `color: inherit` and, in the Tailwind packages, the unused `group/alert` class. The private indicator color property is renamed to `--_alert-indicator-color`.
Export the `AlertRootProps` and `AlertStatus` types.
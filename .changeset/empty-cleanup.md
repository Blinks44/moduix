---
'@moduix/react': minor
'@moduix/react-tailwind': patch
'@moduix/solid': minor
'@moduix/solid-tailwind': patch
'@moduix/vue': minor
'@moduix/vue-tailwind': patch
---

Empty: CSS Modules keep only the six root-surface variables (`--moduix-empty-bg`, `-border-color`, `-border-width`, `-color`, `-padding`, `-radius`) and drop the other 17 (`gap`, `shadow`, and the per-part `icon-*`, `content-*`, `title-*`, `description-*`, `actions-gap`); style those parts with a class instead.
`EmptyActions` now outranks the Button root class when wrapping long button and link labels, so the result no longer depends on stylesheet order. Redundant `min-width` and `max-width` rules are removed from the icon, title, description, and actions in every package.
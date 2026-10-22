---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Skeleton: loaded content is no longer clipped. `overflow: hidden` now applies only while loading, so focus rings, shadows, and badges of revealed content stay visible.
The Tailwind packages take the pulse from the `--moduix-animation-pulse` foundation token, as the CSS Modules packages do, so overriding the token in a theme applies to both tracks; reduced motion still disables it.
CSS Modules drop `--moduix-skeleton-animation`. Use `variant="none"` to turn the pulse off, override `--moduix-animation-pulse` to change it globally, or set `animation` in a class for one placeholder.
Export the `SkeletonRootProps` and `SkeletonVariant` types.
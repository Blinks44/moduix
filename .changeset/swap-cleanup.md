---
'@moduix/react': minor
'@moduix/react-tailwind': patch
'@moduix/solid': minor
'@moduix/solid-tailwind': patch
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Swap: the CSS Modules packages keep only `--moduix-swap-transition`. The nine keyframe variables (`--moduix-swap-enter-starting-*`, `--moduix-swap-exit-ending-*`, `--moduix-swap-rotate-*`, `--moduix-swap-flip-*`) are removed; use a custom `animation` name for a different motion, as the Tailwind packages already do.
Removed no-op styles: `grid-template-areas` (Ark pins each indicator to `grid-area: 1 / 1`) and `color: inherit` / `text-inherit` on indicators.
The Vue packages export `SwapRootProps`, `SwapRootProviderProps`, and `SwapIndicatorProps` from the moduix components, so `SwapRootProps` now includes `animation`.
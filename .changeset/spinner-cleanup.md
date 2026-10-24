---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Spinner: `decorative` now always sets `aria-hidden="true"` on the root and no longer adds `role="presentation"`, which `aria-hidden` made redundant. A decorative `asChild` host is now hidden too instead of keeping its own semantics; the host must stay non-interactive.
The CSS Modules packages keep 3 `--moduix-spinner-*` variables instead of 11: `size`, `ring-border-width`, and `ring-track-color`. `size` still overrides every size except `inherit`; the per-size `size-xs`…`size-xl` variables are removed. `--moduix-spinner-color` is removed in favor of `color`, `--moduix-spinner-radius` in favor of the full radius, and `--moduix-spinner-animation` in favor of the `--moduix-animation-spin` token or `animation` on `[data-slot='spinner-indicator']`.
Tailwind indicators drop `motion-reduce:animate-none`; the spin token already resolves to `none` under reduced motion.
Export the `SpinnerRootProps` and `SpinnerSize` types.
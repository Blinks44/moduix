---
'@moduix/react': patch
'@moduix/react-tailwind': minor
'@moduix/solid': patch
'@moduix/solid-tailwind': minor
'@moduix/vue': patch
'@moduix/vue-tailwind': minor
---

Tailwind transitions now follow the motion tokens. The foundation theme (`styles/style.css`, shipped in every package) adds `duration-fast`, `duration-normal`, `duration-slow`, and `duration-slower`, which read `--moduix-duration-*`, and every Tailwind component uses them instead of numeric `duration-150`, `duration-200`, and `duration-350` (same timings by default). A changed `--moduix-duration-*` token now retimes the Tailwind packages the same way as the CSS Modules packages, and reduced motion works through the tokens, so the redundant `motion-reduce:transition-none` utilities are removed. The package `cn` helpers register the new durations with `tailwind-merge`, so a consumer `duration-500` still replaces the default.
Solid and Vue components import icons from the `@/lib/moduix/icons/ui` barrel, as React does, and the Vue CSS Modules registry `icons` item now ships `icons/ui/index.ts`.
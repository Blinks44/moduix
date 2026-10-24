---
'@moduix/react': patch
'@moduix/react-tailwind': patch
'@moduix/solid': patch
'@moduix/solid-tailwind': patch
'@moduix/vue': patch
'@moduix/vue-tailwind': patch
---

Components no longer set `box-sizing: border-box` themselves: the CSS Modules packages removed it from every module and the Tailwind packages dropped the `box-border` class. The required global reset (the moduix reset or an equivalent one in CSS Modules apps, Tailwind Preflight in Tailwind apps) already applies `border-box` to every element and pseudo-element, so layouts are unchanged.
Card, Chart, and Splitter read `--moduix-focus-ring-width` without the unreachable `--moduix-border-width-md` fallback; the token is always defined by the foundation.
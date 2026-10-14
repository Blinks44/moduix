---
'@moduix/react': minor
'@moduix/solid': minor
'@moduix/vue': minor
---

Bleed: Remove the 12 public `--moduix-bleed-*` variables from the CSS Modules packages; the `xs` to `xl` amounts now use the spacing tokens directly, matching the Tailwind packages.
To customize an amount or the `inline="full"` width, set `margin-inline`, `margin-block`, or `inline-size` in your own class; it wins over the layered defaults.
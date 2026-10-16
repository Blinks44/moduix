---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Heading: CSS Modules drop all 23 `--moduix-heading-*` variables; styles come from foundation typography tokens, so override them with a plain class on `Heading`.
The default size now always comes from `as` (`h1` → `2xl` through `h6` → `xs`) and `data-size` is always present. Before, CSS Modules read it from the rendered element and Tailwind from `as`, so an `asChild` heading without `size` differed between packages; with `asChild`, pass `size` to match the child.
Export the `HeadingRootProps`, `HeadingElement`, `HeadingSize`, and `HeadingWeight` types.
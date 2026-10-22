---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

SimpleGrid: in the CSS Modules packages, the default `display: grid` and one-column template now come from a component stylesheet instead of inline styles, so your own classes can replace them, including responsive templates in media queries. Before, the inline fallback beat every consumer class and only the `style` prop could change the template. Inline styles are now written only for the layout props you pass, as in the Tailwind packages.
`columns` and `minChildWidth` are no longer validated at render time. An invalid value no longer throws; the browser drops the invalid declaration and the default one-column template applies.
Export the `SimpleGridRootProps` type.
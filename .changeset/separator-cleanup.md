---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Separator: CSS Modules drop 7 of 9 `--moduix-separator-*` variables: `border-style`, `length-horizontal`, `length-vertical`, and `thickness-xs` through `thickness-lg`. Keep `--moduix-separator-color` and `--moduix-separator-thickness`; to theme one size, set the thickness on `[data-slot='separator-root'][data-size='<size>']`, and change the length or border style with a plain class. Default visuals are unchanged.
Export the `SeparatorRootProps`, `SeparatorOrientation`, `SeparatorSize`, and `SeparatorVariant` types.
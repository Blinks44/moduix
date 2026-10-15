---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Container: Tailwind gutters now follow the spacing tokens like CSS Modules, so presets such as `dense` change them in both styling tracks. The Tailwind variants drop 15 compound size and gutter classes in favor of two private custom properties; the rendered widths are unchanged.
Export the `ContainerRootProps`, `ContainerSize`, and `ContainerGutter` types.
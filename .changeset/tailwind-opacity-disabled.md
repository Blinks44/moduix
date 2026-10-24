---
'@moduix/react-tailwind': patch
'@moduix/solid-tailwind': patch
'@moduix/vue-tailwind': patch
---

Tailwind packages: disabled and read-only states use the new `opacity-disabled` theme utility instead of a fixed `opacity-50`. It reads `--moduix-opacity-disabled`, the same token the CSS Modules packages use, so overriding that token now dims both styling tracks. The default stays 0.5. `cn` knows the new utility, so a consumer class such as `disabled:opacity-75` still replaces the default.
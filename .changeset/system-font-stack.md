---
'@moduix/react': patch
'@moduix/react-tailwind': patch
'@moduix/solid': patch
'@moduix/solid-tailwind': patch
'@moduix/vue': patch
'@moduix/vue-tailwind': patch
---

Use the system font stack for `--moduix-font-sans` by default. Noto Sans was listed first without being loaded, so components looked different on systems that ship it.
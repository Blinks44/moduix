---
'@moduix/solid': patch
'@moduix/solid-tailwind': patch
---

Split Button: Fix the `solid` export condition build, which lost the `Menu` root import, so bundlers using that condition, such as `vite-plugin-solid`, rendered the menu without its root and threw a missing `PresenceProvider` error.
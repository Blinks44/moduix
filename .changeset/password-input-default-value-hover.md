---
'@moduix/react': patch
'@moduix/solid': patch
'@moduix/react-tailwind': patch
'@moduix/solid-tailwind': patch
---

PasswordInput: Route Solid `defaultValue` through a single force-prop mechanism and gate hover styles behind pointer-capable media while keyboard focus highlighting stays intact.
Also exposes `PasswordInput`, `usePasswordInput`, and `usePasswordInputContext` as named exports from the React adapter and removes redundant line-height utilities from Tailwind variants.
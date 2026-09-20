---
'@moduix/react': patch
'@moduix/solid': patch
'@moduix/react-tailwind': patch
'@moduix/solid-tailwind': patch
---

Toast: Bake the closed-state easing into Tailwind transition shorthands, add reduced-motion parity, gate the action trigger hover behind pointer-capable media, and remove the never-functional close transition and z-index hooks along with stale documented defaults.
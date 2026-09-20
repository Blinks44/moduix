---
'@moduix/react': patch
'@moduix/solid': patch
'@moduix/react-tailwind': patch
'@moduix/solid-tailwind': patch
---

JsonTreeView: Extract the duplicated Tailwind root class string into a shared constant, map `theme()` colors to CSS variables, and gate the row hover highlight behind pointer-capable media.
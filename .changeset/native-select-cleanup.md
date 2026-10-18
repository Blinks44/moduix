---
'@moduix/react': patch
'@moduix/react-tailwind': patch
'@moduix/solid': patch
'@moduix/solid-tailwind': patch
'@moduix/vue': patch
'@moduix/vue-tailwind': patch
---

NativeSelect: The Tailwind packages now use the same spacing as the CSS Modules packages and `Select`: 14px text padding at the start and 46px at the end (it was 12px and 44px), 14px inline padding in list mode, and 14px end padding in forced-colors mode.
Dead styles are removed in every package: the background-color transition on a select whose background never changes, `line-height` and `display` rules on the indicator icon, the disabled check on the indicator hover (a disabled select already has `pointer-events: none`), and in Tailwind the duplicate invalid focus outline and `bg-transparent`. Default visuals are otherwise unchanged.
---
'@moduix/react': patch
'@moduix/react-tailwind': patch
'@moduix/solid': patch
'@moduix/solid-tailwind': patch
'@moduix/vue': patch
'@moduix/vue-tailwind': patch
---

Popup content now shares one pair of foundation keyframes, `moduix-popup-in` and `moduix-popup-out`, which read the `--moduix-popup-motion-*` variables. In the Tailwind packages, Popover, Menu, Select, Combobox, Date Picker, Color Picker, Tooltip, Hover Card, Navigation Menu, Tour, Floating Panel, and Dialog use the new `animate-moduix-popup-in` and `animate-moduix-popup-out` utilities, so the shared popup motion variables now apply there as documented. Content scales with the `scale` property instead of `transform`, and the exit keeps its last frame until unmount. The `animate-moduix-menu-open`, `animate-moduix-menu-closed`, `animate-moduix-dialog-content-in`, and `animate-moduix-dialog-content-out` utilities and their keyframes are removed.
In the CSS Modules packages, Dialog, Floating Panel, Combobox, Date Picker, and Color Picker use the shared keyframes instead of local copies; Floating Panel motion now uses the same 200ms ease-in-out default as the other pickers and menus.
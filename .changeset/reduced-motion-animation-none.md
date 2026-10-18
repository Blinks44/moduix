---
'@moduix/react': patch
'@moduix/react-tailwind': patch
'@moduix/solid': patch
'@moduix/solid-tailwind': patch
'@moduix/vue': patch
'@moduix/vue-tailwind': patch
---

Reduced motion now uses one strategy across the library: presence-driven enter and exit animations are disabled with `animation: none` (Tailwind: `motion-reduce:…:animate-none` with the same state variants) instead of being shortened to 1ms. Ark presence unmounts at once when the animation is `none`, so closing behavior is unchanged. This applies to Accordion, Collapsible, Color Picker, Combobox, Command Palette, Date Picker, Dialog, Drawer, Lightbox, Menu, Navigation Menu, Swap, and Tour, which now match Popover, Hover Card, and the other components that already disabled their animations. Drawer swipe transitions still take 1ms under reduced motion.
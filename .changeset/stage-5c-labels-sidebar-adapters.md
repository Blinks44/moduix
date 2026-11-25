---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
'@moduix/svelte': minor
'@moduix/svelte-tailwind': minor
---

Add `ModuixProvider`, `LabelsProvider`, and `useA11yLabels` for localizing built-in accessibility labels across all components, add configurable `minSize`/`maxSize`/`collapsedSize`/`collapsible` bounds, `data-slot` hooks on `SidebarInput`/`SidebarSeparator`, and an opt-in responsive `mobileBreakpoint` `Drawer` fallback to `Sidebar`, and ship adapter refinements (lazy Chart renderer initialization, reactive Solid `asChild` branches and direct `OverlayPortal` props, hoisted Vue `VNodeOutlet`, and `useForwardExpose()` on core Vue inputs and buttons).
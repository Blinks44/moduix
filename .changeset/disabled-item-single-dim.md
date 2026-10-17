---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Listbox, Combobox, Select, and TreeView: disabled items now dim once, through the shared disabled opacity, and keep their regular text color instead of also switching to the muted foreground color. The `--moduix-select-item-disabled-color` and `--moduix-tree-view-item-disabled-color` variables are removed from the CSS Modules packages; set a disabled item color with a class on the part if you need one.
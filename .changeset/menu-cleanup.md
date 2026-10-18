---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Menu: The CSS Modules packages keep 3 of the 93 `--moduix-menu-*` variables, `popup-min-width`, `popup-max-width`, and `popup-max-height`. Colors, spacing, typography, radius, shadow, the arrow, and the checkbox indicator decoration now come from foundation tokens; override them with a class on the part. Items, check rows, highlight, separators, group labels, and the list padding still follow the shared `--moduix-popup-*` variables, and content motion now uses the shared `moduix-popup-in` and `moduix-popup-out` keyframes with `--moduix-popup-motion-*`, keeping its last frame until unmount as the other popups do. Reduced motion shortens the animation to 1ms in every package.
`MenuTrigger` and `MenuContextTrigger` are unstyled in every package, like the Dialog and Drawer triggers; compose the trigger with `asChild` and `Button`, and style a context area with a class. `MenuTriggerIcon` is removed; use `MenuIndicator`, which renders the same chevron and also carries the open state. A disabled `tone="destructive"` item is now muted in the CSS Modules packages too instead of staying red, and a trigger item with an open submenu uses the accent text color with its accent background.
React and Solid export `MenuRootProps`, `MenuRootProviderProps`, `MenuItemProps`, `MenuCheckboxItemProps`, `MenuRadioItemProps`, `MenuIndicatorPosition`, `MenuItemTone`, and the Ark Menu part prop, detail, and hook types. Vue exports the same moduix types from its components instead of the bare Ark ones, plus the Vue emits types, and no longer re-exports the Ark `*BaseProps` types.
---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Combobox: A `ComboboxClearTrigger` rendered without `ComboboxTrigger` now sits at the inline end instead of leaving an empty gap, and the input reserves room for one action instead of two. `ComboboxTrigger` and `ComboboxClearTrigger` share the library focus ring. Items no longer compute their width, so absolutely positioned virtual rows fit the list. React and Solid re-export the Ark Combobox prop and detail types, plus `ComboboxRootProps`, `ComboboxRootProviderProps`, and `ComboboxOptionProps`; Vue adds the detail types.
The CSS Modules packages keep 5 of the 71 `--moduix-combobox-*` variables (`width`, `radius`, `control-height`, `action-size`, `content-max-height`). Colors, spacing, typography, focus rings, disabled opacity, and motion now come from foundation tokens; override them with a class on the part. Popup motion still follows `--moduix-popup-motion-*`. The input space for the actions now follows `--moduix-combobox-action-size`.
Disabled items now dim once, through the shared disabled opacity, and keep their regular text color instead of also switching to the muted foreground color.
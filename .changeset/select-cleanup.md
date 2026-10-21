---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Select: Add `SelectOption`, a row helper like `ComboboxOption` that renders `SelectItem` with `SelectItemText` and `SelectItemIndicator`; pass `indicator={false}` to hide the check or a node to replace it.
The CSS Modules packages keep 5 of the 67 `--moduix-select-*` variables (`width`, `radius`, `control-height`, `action-size`, `content-max-height`). Colors, borders, spacing, typography, focus rings, disabled opacity, and motion now come from foundation tokens; override them with a class on the part. Items, group labels, and list padding still follow the shared `--moduix-popup-*` variables, and content motion now uses the shared `moduix-popup-in` and `moduix-popup-out` keyframes with `--moduix-popup-motion-*` instead of `--moduix-select-transition` and `--moduix-select-content-closed-*`. The trigger space reserved for the clear action now follows `--moduix-select-action-size`. `NativeSelect` reads the same `width`, `radius`, `control-height`, and `action-size` variables and drops the others.
In the Tailwind packages the indicator hover no longer sticks after a tap on touch devices, and `SelectClearTrigger` keeps the `CloseButton` focus ring as in the CSS Modules packages. Items no longer compute their width, and dead styles are removed in every package. React and Solid re-export the Ark Select part prop, detail, and hook types, plus `SelectRootProps`, `SelectRootProviderProps`, `SelectFieldProps`, and `SelectOptionProps`. Vue re-exports Ark `SelectHiddenSelect` directly.
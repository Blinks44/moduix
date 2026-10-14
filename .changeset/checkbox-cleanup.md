---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Checkbox: a custom icon passed to `CheckboxIndicator` now gets the icon size of the current `size` instead of stretching over the whole control. The default icons render as a direct `svg` child of `CheckboxIndicator`, so the extra span and its `checkbox-indicator-checked-icon` and `checkbox-indicator-indeterminate-icon` slots are gone.
The CSS Modules packages keep 8 `--moduix-checkbox-*` variables instead of 36: `bg`, `bg-checked`, `border-color`, `color`, `radius`, `gap`, `size`, and `icon-size`. `size` and `icon-size` replace the per-size `-xs`…`-xl` variables and apply to every size. Invalid, hover, focus-ring, transition, disabled, and label typography variables are removed in favor of foundation tokens, and `--moduix-checkbox-group-color` and `--moduix-checkbox-group-gap` are removed; set those with a class on the part. `CheckboxGroup` no longer sets a text color.
`CheckboxRootProps`, `CheckboxRootProviderProps`, and `CheckboxSize` are exported from every package.
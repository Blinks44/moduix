---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Switch: the thumb is now sized and placed from the control box, so a `width` or `height` override on `SwitchControl` (a class in CSS Modules, `w-*` and `h-*` utilities in Tailwind) keeps it square and flush with both ends. Previously the thumb kept its size-preset dimensions and travel and ended up misplaced. Default visuals are unchanged.
An invalid switch now draws its focus ring in the destructive color, like Checkbox and RadioGroup.
The checked thumb now follows Ark's `dir` attribute on the thumb instead of `:dir(rtl)`, so right-to-left placement also works when a bundler lowers `:dir()` to `:lang()`.
The CSS Modules packages keep 5 `--moduix-switch-*` variables instead of 48: `bg`, `bg-checked` (now also the checked border color), `border-color`, `gap`, and `thumb-bg` (both states). Per-size width, height, and thumb size, thumb translate, hover, invalid, focus-ring, transition, disabled-opacity, padding, radius, thumb border, color, shadow, icon-size, and label typography variables are removed in favor of foundation tokens; override those with a class on the part. The root now sets the text color and `SwitchLabel` inherits it.
React and Solid export the Ark types `SwitchCheckedChangeDetails`, `SwitchContextProps`, `SwitchControlProps`, `SwitchHiddenInputProps`, `SwitchLabelProps`, `SwitchThumbProps`, `UseSwitchContext`, `UseSwitchProps`, and `UseSwitchReturn`, as Vue already did; Vue adds `SwitchThumbProps`.
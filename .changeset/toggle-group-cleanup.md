---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
---

ToggleGroup: The CSS Modules packages keep 2 `--moduix-toggle-group-*` variables instead of 12: `bg` and `border-color`, which now apply to every variant (`outline` and `ghost` defaults stay private). Removed: `border-width`, `color`, `gap`, `ghost-bg`, `ghost-border-color`, `ghost-padding`, `item-radius`, `outline-bg`, `padding`, and `radius`. Set gap, padding, and radius with a class on the group or item, and recolor unpressed items with `--moduix-toggle-color` on the group. Default visuals are unchanged.
React and Solid export the Ark types `ToggleGroupContextProps`, `ToggleGroupValueChangeDetails`, `UseToggleGroupContext`, `UseToggleGroupProps`, and `UseToggleGroupReturn`, as Vue already does.
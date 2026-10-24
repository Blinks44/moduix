---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

RadioGroup: `size` moves from `RadioGroupItemControl` and `RadioGroupOption` to `RadioGroup` and `RadioGroupRootProvider` and sizes every control in the group, like `Checkbox` and Chakra UI. Replace `<RadioGroupOption size="sm">` on each option with `<RadioGroup size="sm">`. Types `RadioGroupRootProps`, `RadioGroupRootProviderProps`, and `RadioGroupSize` replace `RadioGroupItemControlProps` and `RadioGroupItemControlSize`.
The control hover background now follows Ark `data-hover`, so it also appears while the item text is hovered. In the Tailwind packages a checked invalid control keeps the destructive border, as in the CSS Modules packages. In the CSS Modules packages a read-only item shows the default cursor, as in Tailwind.
`RadioGroupIndicator` has `--moduix-radius-md` corners instead of a full pill and uses the moduix ease-in-out timing.
The CSS Modules packages keep 7 `--moduix-radio-*` variables instead of 39: `bg`, `bg-checked` (now also the checked border), `border-color`, `gap`, `indicator-color`, `indicator-size`, and `size`. `size` and `indicator-size` replace the per-size `-xs`…`-xl` variables and apply to every size. Hover, invalid, focus-ring, transition, disabled, label typography, and all `--moduix-radio-group-*` variables are removed in favor of foundation tokens; set those with a class on the part.
Remove no-op styles (`position: relative` that Ark sets inline, `outline: 0`, unused transitions) and the `text-inherit` utilities in Tailwind. Vue re-exports `RadioGroupContext`, `RadioGroupItemContext`, and `RadioGroupItemHiddenInput` from Ark directly instead of wrapping them.
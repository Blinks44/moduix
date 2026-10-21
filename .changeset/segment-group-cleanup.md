---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

SegmentGroup: `SegmentGroup` and `useSegmentGroup` no longer inherit `disabled`, `invalid`, `readOnly`, and `required` from `Field` or `Fieldset`. Ark SegmentGroup does not read them either, and `RadioGroup` already works this way, so pass those props to the group itself.
`SegmentGroupItemControl` is removed. It was a visual-only Ark radio control that moduix hid with `display: none`; `SegmentGroupItems` no longer renders it, so delete it from custom item trees.
In the Tailwind packages the indicator no longer animates on the first render and on resize, and it follows `--moduix-duration-normal` (including reduced motion), as in the CSS Modules packages. Hovering a checked item no longer overrides a custom checked text color.
The CSS Modules packages keep 5 `--moduix-segment-group-*` variables instead of 35: `bg`, `border-color`, `indicator-bg`, `item-color`, and `item-color-checked`. Set indicator motion with Ark `--transition-duration` and `--transition-timing-function` on `SegmentGroupIndicator`; other values come from foundation tokens.
The indicator sits behind the items with `z-index: -1`, so the label, items, and item text no longer set `position` and `z-index`. Remove no-op styles and the `text-inherit` utility in Tailwind. Vue re-exports `SegmentGroupContext`, `SegmentGroupItemContext`, and `SegmentGroupItemHiddenInput` from Ark directly.
New: `size` (`sm`, `md`, `lg`, default `md`) on `SegmentGroup` and `SegmentGroupRootProvider` makes the whole group as tall as a `Button` or `Input` of the same size. The default group is now 36px tall instead of 42px. `SegmentGroupItems` also accepts strings, so `items={['React', 'Vue']}` works like `{ value, label }` objects. Types `SegmentGroupRootProps`, `SegmentGroupRootProviderProps`, `SegmentGroupSize`, `SegmentGroupItemOption`, and `SegmentGroupItemsProps` are exported.
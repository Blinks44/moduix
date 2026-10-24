---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

TreeView: long names in `TreeViewBranchText` and `TreeViewItemText` now truncate with an ellipsis; before, the text was cut off because `text-overflow` does not apply to a flex container. Icons inside the text are inline and centered on the text line, with the same size and spacing as before.
The row highlight now starts `--moduix-spacing-1` before the row content, so the branch indicator no longer touches the edge of the hover, selected, and focus highlight, and a nested row's highlight stays clear of its parent's indent guide. Content and guide positions are unchanged.
The CSS Modules packages keep 2 of the 53 `--moduix-tree-view-*` variables, `width` and `indent`; `indent` now defaults to `var(--moduix-spacing-4)` (16px, as before) instead of `1rem`. Colors, spacing, typography, focus rings, disabled opacity, checkbox, rename input, and transition values now come from foundation tokens; override them with a class or a `data-slot` selector.
Branch content opens and closes with the shared `moduix-collapsible-content-*` keyframes and `--moduix-transition-default` in both styling tracks instead of a fixed 150ms, so duration presets apply to it. The Tailwind packages use spacing and size tokens for the row height, indentation, and indent guide instead of fixed `rem` values, so presets such as `dense` apply to them like in the CSS Modules packages.
Removed dead disabled styles on the root (Ark's tree root has no disabled state; disable nodes with `isNodeDisabled`) and other no-op styles.
React `TreeViewNodeCheckboxIndicator` forwards its ref to the wrapper `span`. React and Solid export the Ark TreeView part props, callback detail, and hook types, as Vue already did.
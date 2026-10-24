---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

SignaturePad: In read-only mode, `SignaturePadClearTrigger` is now hidden instead of disabled, the same way Ark hides it while the pad is empty. Before, the CSS Modules packages showed it at full opacity, so it looked clickable but did nothing.
Tailwind packages no longer dim the clear trigger a second time inside a disabled pad, which matches CSS Modules. The clear trigger now uses the standard `CloseButton` focus ring.
The CSS Modules packages keep 7 `--moduix-signature-pad-*` variables: `width`, `height`, `bg`, `border-color`, `radius`, `stroke-color`, and `guide-color`. The other 33 are removed: `max-width`, `gap`, `color`, `disabled-opacity`, `label-*`, `control-*`, `border-width`, `shadow`, `transition`, `focus-*`, `guide-inset-x`, `guide-bottom`, `guide-border-width`, and all `clear-trigger-*`. To change those styles, add your own class to the part. For the clear trigger, the `--moduix-close-button-*` variables also work.
`SignaturePadLabel` and `SignaturePadControl` now inherit the root text color, and the control no longer sets a `min-height` that duplicated its height.
---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Dialog: CSS Modules keep one variable, `--moduix-dialog-width`; the other 44 `--moduix-dialog-*` variables are removed. Colors, borders, spacing, and typography come from foundation tokens, so override them with a plain class on the part. The backdrop reads the shared `--moduix-backdrop-bg` and `--moduix-backdrop-filter`, and content motion reads the shared `--moduix-popup-motion-*` variables, which also work as a local exception when set on `DialogContent`.
`DialogHeader` is now a simple vertical stack; it no longer places a `DialogCloseTrigger` in a second column. The Tailwind `DialogCloseIcon` now uses the same focus ring as `CloseButton` and the CSS Modules variant. Vue now exports `DialogRootProps`, `DialogRootProviderProps`, and `DialogContentProps` with the moduix props (`portalled`, `portalRef`, `size`, `placement`, `scrollBehavior`) instead of the bare Ark types, as React and Solid do.
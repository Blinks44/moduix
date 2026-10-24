---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

CloseButton: A disabled button is blocked by one capture-phase handler, as in `Button`, so the extra `onClick` wrapper is gone and `onClick` reaches Ark unchanged (Solid bound `[handler, data]` pairs still work). `CloseButtonProps` is now exported from every package. Vue adapters take the default `Close` label from the shared `a11yLabels` like React and Solid.
`--moduix-close-button-transition` is removed in favor of `--moduix-transition-default`, and the barely visible 0.94 press opacity is gone. Tailwind packages no longer duplicate the root icon sizing on the default `CloseIcon`.
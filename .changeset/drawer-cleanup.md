---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Drawer: CSS Modules keep one variable, `--moduix-drawer-island-inset`; the other 70 `--moduix-drawer-*` variables are removed. Colors, borders, spacing, radius, and typography come from foundation tokens, so override them with a plain class on the part (for example `max-height` on `DrawerContent`). The backdrop reads the shared `--moduix-backdrop-bg` and `--moduix-backdrop-filter`.
`variant="island"` now lives only on `DrawerContent`; the `Drawer` root no longer accepts `variant`, and Ark's default full snap point already gives an island the same behavior. `DrawerTrigger` and `DrawerCloseTrigger` are unstyled, like the Dialog triggers, so compose them with `asChild` and a `Button`. `DrawerBody` inherits the content color instead of the muted description color, and `DrawerFooter` wraps its actions on narrow screens. In the Tailwind packages, side drawers and `DrawerSwipeArea` keep the right corners and edges in RTL, drawer motion follows the foundation easing tokens, and `DrawerCloseIcon` uses the same focus ring as `CloseButton`. React and Solid now export `DrawerRootProps`, `DrawerRootProviderProps`, `DrawerContentProps`, and `DrawerVariant`; Vue exports the moduix component props under the same names.
`DrawerContent` accepts `size` (`sm`, `md`, `lg`, `xl`; default `md`) that sets the width of `start` and `end` drawers to 18rem, 22rem, 28rem, or 36rem, still capped at `100vw - 2rem`. It is mirrored as `data-size`. Top and bottom drawers are unchanged. The `DrawerSize` type is exported.
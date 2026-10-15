# Drawer (Vue)

The Vue adapter follows the React contract in `packages/react/src/components/drawer/drawer.md`:
the same parts, slots, defaults (`lazyMount` and `unmountOnExit` are `true`), the `DrawerContent`
`variant="island"` prop, and the single `--moduix-drawer-island-inset` variable.

## Vue notes

- Each part is a single-file component that forwards Ark props, emits, and `v-model` bindings
  through `attrs`. `Drawer` declares only the moduix props (`lazyMount`, `portalled`, `portalRef`,
  `unmountOnExit`).
- Use the `as-child` attribute with a single child element for custom trigger and close hosts.
- `DrawerCloseIcon` takes `aria-label` and falls back to `Close drawer`.
- `DrawerRootProps`, `DrawerRootProviderProps`, and `DrawerContentProps` are the moduix component
  props; `DrawerVariant` is exported from `DrawerContent.vue`. Other types come from Ark.
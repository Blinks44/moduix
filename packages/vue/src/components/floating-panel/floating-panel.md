# FloatingPanel (Vue)

The Vue adapter follows the React contract in `packages/react/src/components/floating-panel/floating-panel.md`:
the same parts, `data-slot` hooks, root defaults (`closeOnEscape`, `persistRect`, `lazyMount`,
`unmountOnExit`), portalling, sugar parts, and Ark type re-exports.

## Vue notes

- `open`, `position`, and `size` support `v-model` through Ark emits.
- `FloatingPanelRootProps` and `FloatingPanelRootProviderProps` are the moduix component props with
  `portalled` and `portalRef`.
- `FloatingPanelStageTrigger` renders the stage icon as default-slot fallback unless `asChild` is set.
- `FloatingPanelCloseIcon` keeps attrs and listeners on the Ark close trigger and puts `class` and
  `ariaLabel` (default `Close panel`) on `CloseButton`. An explicit empty label is kept, and a slot
  replaces the default icon.
- `FloatingPanelPositioner` forwards its ref through the portal with `useForwardExpose`.
# FloatingPanel (Solid)

The Solid adapter follows the React contract in `packages/react/src/components/floating-panel/floating-panel.md`:
the same parts, `data-slot` hooks, root defaults (`closeOnEscape`, `persistRect`, `lazyMount`,
`unmountOnExit`), portalling, sugar parts, and Ark type re-exports.

## Solid notes

- Ark Solid uses a render-function `asChild`:
  `<FloatingPanelTrigger asChild={(props) => <Button {...props()}>Open panel</Button>} />`.
- `useFloatingPanel()` returns an accessor; pass it to `FloatingPanelRootProvider value={panel}` and
  read state as `panel().open`. `FloatingPanelContext` and `useFloatingPanelContext()` also expose
  accessors.
- `FloatingPanelStageTrigger` resolves its children once and renders the stage icon only when there
  are none and no `asChild`.
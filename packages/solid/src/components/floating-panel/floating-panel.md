# FloatingPanel (Solid)

`FloatingPanel` is a non-modal, detachable window for inspector and utility content. The Solid
adapter preserves the React wrapper's Ark anatomy, state, focus behavior, lifecycle, and styling
hooks.

## Composition

```tsx
<FloatingPanel>
  <FloatingPanel.Trigger asChild={(props) => <button {...props()}>Open panel</button>} />
  <FloatingPanel.Positioner>
    <FloatingPanel.Content>
      <FloatingPanel.DragTrigger>
        <FloatingPanel.Header>
          <FloatingPanel.Title>
            <FloatingPanel.DragIndicator />
            Inspector
          </FloatingPanel.Title>
          <FloatingPanel.Control>
            <FloatingPanel.StageTrigger stage="minimized" />
            <FloatingPanel.StageTrigger stage="maximized" />
            <FloatingPanel.StageTrigger stage="default" />
            <FloatingPanel.CloseIcon />
          </FloatingPanel.Control>
        </FloatingPanel.Header>
      </FloatingPanel.DragTrigger>
      <FloatingPanel.Body>Panel content</FloatingPanel.Body>
      <FloatingPanel.Footer>Status: synced</FloatingPanel.Footer>
      <FloatingPanel.ResizeTriggerGroup />
    </FloatingPanel.Content>
  </FloatingPanel.Positioner>
</FloatingPanel>
```

`FloatingPanel` and `FloatingPanel.Root` are equivalent roots. `Positioner` is portalled by default;
use `portalled={false}` or `portalRef` on the root to control placement. `lazyMount`,
`unmountOnExit`, `closeOnEscape`, and `persistRect` default to `true` on the root.

## API surface

The adapter exports `FloatingPanel`, `useFloatingPanel`, and `useFloatingPanelContext`.
`FloatingPanel` exposes `Root`, `RootProvider`, `Context`, `Trigger`, `Positioner`, `Content`,
`DragTrigger`, `Header`, `Title`, `Control`, `StageTrigger`, `CloseTrigger`, `CloseIcon`, `Body`,
`Footer`, `ResizeTrigger`, `ResizeTriggerGroup`, and `DragIndicator`.

`FloatingPanel.RootProvider` receives the accessor returned by `useFloatingPanel()`:

```tsx
const panel = useFloatingPanel({ defaultSize: { width: 360, height: 260 } });

<FloatingPanel.RootProvider value={panel}>
  <FloatingPanel.Positioner>
    <FloatingPanel.Content>
      <FloatingPanel.Title>Inspector</FloatingPanel.Title>
    </FloatingPanel.Content>
  </FloatingPanel.Positioner>
</FloatingPanel.RootProvider>;
```

Ark owns open, position, size, stage, drag, resize, focus, IDs, and presence behavior. Callback
handlers receive Ark detail objects unchanged. `Context` and `useFloatingPanelContext()` expose the
current API as accessors, so read values as `panel().open`.

## Solid composition notes

Ark Solid uses a render-function `asChild` prop:
`asChild={(props) => <button {...props()}>Open panel</button>}`. Ordinary refs and custom-host
composition are separate native paths because Ark Solid does not forward refs through `asChild`.
`StageTrigger` supplies the default minimize, maximize, and restore icons only on its default button
host. `CloseIcon`, `DragIndicator`, `Footer`, and `ResizeTriggerGroup` are moduix helpers layered
over the explicit Ark parts.
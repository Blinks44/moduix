# FloatingPanel (Solid)

`FloatingPanel` is a non-modal, detachable window for inspector and utility content. The Solid
adapter preserves the React wrapper's Ark anatomy, state, focus behavior, lifecycle, and styling
hooks.

## Composition

```tsx
<FloatingPanel>
  <FloatingPanelTrigger asChild={(props) => <button {...props()}>Open panel</button>} />
  <FloatingPanelPositioner>
    <FloatingPanelContent>
      <FloatingPanelDragTrigger>
        <FloatingPanelHeader>
          <FloatingPanelTitle>
            <FloatingPanelDragIndicator />
            Inspector
          </FloatingPanelTitle>
          <FloatingPanelControl>
            <FloatingPanelStageTrigger stage="minimized" />
            <FloatingPanelStageTrigger stage="maximized" />
            <FloatingPanelStageTrigger stage="default" />
            <FloatingPanelCloseIcon />
          </FloatingPanelControl>
        </FloatingPanelHeader>
      </FloatingPanelDragTrigger>
      <FloatingPanelBody>Panel content</FloatingPanelBody>
      <FloatingPanelFooter>Status: synced</FloatingPanelFooter>
      <FloatingPanelResizeTriggerGroup />
    </FloatingPanelContent>
  </FloatingPanelPositioner>
</FloatingPanel>
```

`FloatingPanel` is the root component. `FloatingPanelPositioner` is portalled by default; use `portalled={false}`
or `portalRef` on the root to control placement. `lazyMount`,
`unmountOnExit`, `closeOnEscape`, and `persistRect` default to `true` on the root.

## API surface

The adapter exports `FloatingPanel`, `useFloatingPanel`, and `useFloatingPanelContext`.
`FloatingPanel` exposes `FloatingPanelContext`, `FloatingPanelRootProvider`, `FloatingPanelTrigger`,
`FloatingPanelPositioner`, `FloatingPanelContent`, `FloatingPanelDragTrigger`, `FloatingPanelHeader`,
`FloatingPanelTitle`, `FloatingPanelControl`, `FloatingPanelStageTrigger`,
`FloatingPanelCloseTrigger`, `FloatingPanelCloseIcon`, `FloatingPanelBody`, `FloatingPanelFooter`,
`FloatingPanelResizeTrigger`, `FloatingPanelResizeTriggerGroup`, and `FloatingPanelDragIndicator`.

`FloatingPanelRootProvider` receives the accessor returned by `useFloatingPanel()`:

```tsx
const panel = useFloatingPanel({ defaultSize: { width: 360, height: 260 } });

<FloatingPanelRootProvider value={panel}>
  <FloatingPanelPositioner>
    <FloatingPanelContent>
      <FloatingPanelTitle>Inspector</FloatingPanelTitle>
    </FloatingPanelContent>
  </FloatingPanelPositioner>
</FloatingPanelRootProvider>;
```

Ark owns open, position, size, stage, drag, resize, focus, IDs, and presence behavior. Callback
handlers receive Ark detail objects unchanged. `FloatingPanelContext` and `useFloatingPanelContext()` expose the
current API as accessors, so read values as `panel().open`.

## Solid composition notes

Ark Solid uses a render-function `asChild` prop:
`asChild={(props) => <button {...props()}>Open panel</button>}`. Ordinary refs and custom-host
composition are separate native paths because Ark Solid does not forward refs through `asChild`.
`FloatingPanelStageTrigger` supplies the default minimize, maximize, and restore icons only on its default button
host. `FloatingPanelCloseIcon`, `FloatingPanelDragIndicator`, `FloatingPanelFooter`, and
`FloatingPanelResizeTriggerGroup` are moduix helpers layered
over the explicit Ark parts.

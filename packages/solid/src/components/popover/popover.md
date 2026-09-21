# Popover (Solid)

`Popover` is a styled Ark UI overlay for compact interactive content anchored to a trigger or a
separate reference element. The Solid adapter preserves the React component's explicit anatomy,
callbacks, focus behavior, lifecycle, portal placement, runtime state, and CSS hooks.

## Composition

```tsx
<Popover positioning={{ gutter: 8 }}>
  <Popover.Trigger asChild={(props) => <Button {...props()}>Open</Button>} />
  <Popover.Positioner>
    <Popover.Content>
      <Popover.CloseIcon />
      <Popover.Header>
        <Popover.Title>Project status</Popover.Title>
        <Popover.Description>Everything is on schedule.</Popover.Description>
      </Popover.Header>
      <Popover.Footer>
        <Popover.CloseTrigger>Close</Popover.CloseTrigger>
      </Popover.Footer>
    </Popover.Content>
  </Popover.Positioner>
</Popover>
```

`Popover` and `Popover.Root` are equivalent roots. `Positioner` is portalled by default; use
`portalled={false}` or `portalRef` on the root to control overlay placement. Modal popovers remain
portalled even when `portalled={false}`. `lazyMount` and `unmountOnExit` default to `true`.

## API surface

The adapter exports `Popover`, `usePopover`, and `usePopoverContext`. `Popover` exposes `Root`,
`RootProvider`, `Context`, `Anchor`, `Trigger`, `Indicator`, `Positioner`, `Content`, `Arrow`,
`ArrowTip`, `Title`, `Description`, `CloseTrigger`, `CloseIcon`, `Header`, `Body`, and `Footer`.

`Popover.RootProvider` receives the accessor returned by `usePopover`. Configure `portalled` in
the hook because the provider accepts only `portalRef` for portal placement:

```tsx
const popover = usePopover({ portalled: false });

<Popover.RootProvider value={popover}>
  <Popover.Trigger>Open</Popover.Trigger>
  <Popover.Positioner>
    <Popover.Content>
      <Popover.Title>Preferences</Popover.Title>
    </Popover.Content>
  </Popover.Positioner>
</Popover.RootProvider>;
```

Ark owns open state, focus management, dismissal, IDs, state attributes, positioning, and runtime
CSS variables. Callback handlers receive Ark detail objects, including `details.open`.

## Solid composition notes

Ark Solid uses render-function `asChild`:
`asChild={(props) => <button {...props()} type="button" />}`. Its factory does not forward `ref`
through `asChild`, so ordinary refs and custom-host composition are supported as separate native
paths. `Popover.CloseIcon` composes `CloseButton` through the same native render-function
contract and defaults its accessible label to `Close popover`.

`Popover.Arrow` renders `Popover.ArrowTip` when no child is supplied. `Header`, `Body`, and `Footer`
are plain layout helpers. When `Body` is a direct child of `Content`, it becomes the scroll region
when the popup reaches its available height.
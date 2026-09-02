# Drawer (Solid)

`Drawer` is a styled Ark UI edge panel for navigation, forms, bottom sheets, snap points, and
swipe-driven workflows. The Solid adapter preserves the React component's explicit Ark anatomy,
callbacks, focus behavior, lifecycle, stack coordination, runtime variables, and CSS hooks.

## Composition

```tsx
<Drawer>
  <Drawer.Trigger asChild={(props) => <Button {...props()}>Open drawer</Button>} />
  <Drawer.Backdrop />
  <Drawer.Positioner>
    <Drawer.Content>
      <Drawer.Grabber>
        <Drawer.GrabberIndicator />
      </Drawer.Grabber>
      <Drawer.Header>
        <Drawer.Title>Notifications</Drawer.Title>
        <Drawer.CloseIcon />
        <Drawer.Description>You are all caught up.</Drawer.Description>
      </Drawer.Header>
      <Drawer.Body>Content</Drawer.Body>
      <Drawer.Footer>
        <Drawer.CloseTrigger asChild={(props) => <Button {...props()}>Close</Button>} />
      </Drawer.Footer>
    </Drawer.Content>
  </Drawer.Positioner>
</Drawer>
```

`Drawer` and `Drawer.Root` are equivalent roots. `Backdrop` and `Positioner` are portalled by
default; use `portalled={false}` or `portalRef` on the root to control overlay placement.
`lazyMount` and `unmountOnExit` default to `true`.

## API surface

The adapter exports `Drawer`, `useDrawer`, `useDrawerContext`, and `useDrawerStackContext`.
`Drawer` exposes `Root`, `RootProvider`, `Context`, `Stack`, `Trigger`, `Backdrop`, `Positioner`,
`Content`, `Grabber`, `GrabberIndicator`, `Title`, `Description`, `CloseTrigger`, `CloseIcon`,
`SwipeArea`, `Indent`, `IndentBackground`, `Header`, `Body`, and `Footer`.

`Drawer.RootProvider` receives the accessor returned by `useDrawer()`:

```tsx
const drawer = useDrawer();

<Drawer.RootProvider value={drawer}>
  <Drawer.Positioner>
    <Drawer.Content>
      <Drawer.Title>Preferences</Drawer.Title>
    </Drawer.Content>
  </Drawer.Positioner>
</Drawer.RootProvider>;
```

Ark owns open state, snap points, swipe gestures, focus management, dismissal, IDs, state
attributes, and runtime CSS variables. Callback handlers receive Ark detail objects, including
`details.open`, `details.snapPoint`, and `details.value`.

## Solid composition notes

Ark Solid uses render-function `asChild`:
`asChild={(props) => <button {...props()} type="button" />}`. Ordinary refs and custom-host
composition are supported as separate native paths because Ark Solid does not forward refs through
`asChild`. `Drawer.CloseIcon` composes `CloseButton.Root` through the same native render-function
contract and defaults its accessible label to `Close drawer`.

`Content variant="island"` adds the detached, safe-area-aware surface styling from the React
component. `Header`, `Body`, and `Footer` are layout helpers only; all Ark structural parts remain
explicit and independently styleable.
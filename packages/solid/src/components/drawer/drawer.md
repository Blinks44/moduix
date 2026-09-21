# Drawer (Solid)

`Drawer` is a styled Ark UI edge panel for navigation, forms, bottom sheets, snap points, and
swipe-driven workflows. The Solid adapter preserves the React component's explicit Ark anatomy,
callbacks, focus behavior, lifecycle, stack coordination, runtime variables, and CSS hooks.

## Composition

```tsx
<Drawer>
  <DrawerTrigger asChild={(props) => <Button {...props()}>Open drawer</Button>} />
  <DrawerBackdrop />
  <DrawerPositioner>
    <DrawerContent>
      <DrawerGrabber>
        <DrawerGrabberIndicator />
      </DrawerGrabber>
      <DrawerHeader>
        <DrawerTitle>Notifications</DrawerTitle>
        <DrawerCloseIcon />
        <DrawerDescription>You are all caught up.</DrawerDescription>
      </DrawerHeader>
      <DrawerBody>Content</DrawerBody>
      <DrawerFooter>
        <DrawerCloseTrigger asChild={(props) => <Button {...props()}>Close</Button>} />
      </DrawerFooter>
    </DrawerContent>
  </DrawerPositioner>
</Drawer>
```

`Drawer` is the root component. `DrawerBackdrop` and `DrawerPositioner` are portalled by
default; use `portalled={false}` or `portalRef` on the root to control overlay placement.
`lazyMount` and `unmountOnExit` default to `true`.
`variant="island"` uses the full default snap point (`[1]`), passes the island presentation to
`DrawerContent`, and keeps `swipeDirection` controlled by the caller. The surface is inset from the
viewport, rounded on all sides, and has no directional overdrag bleed. `DrawerContent variant="island"`
remains supported when the presentation needs to be selected on the content part.

## API surface

The adapter exports `Drawer`, `DrawerRootProvider`, `DrawerContext`, `DrawerStack`, `DrawerTrigger`,
`DrawerBackdrop`, `DrawerPositioner`, `DrawerContent`, `DrawerGrabber`, `DrawerGrabberIndicator`,
`DrawerTitle`, `DrawerDescription`, `DrawerCloseTrigger`, `DrawerCloseIcon`, `DrawerSwipeArea`,
`DrawerIndent`, `DrawerIndentBackground`, `DrawerHeader`, `DrawerBody`, `DrawerFooter`,
`useDrawer`, `useDrawerContext`, and `useDrawerStackContext`.

`DrawerRootProvider` receives the accessor returned by `useDrawer()`:

```tsx
const drawer = useDrawer();

<DrawerRootProvider value={drawer}>
  <DrawerPositioner>
    <DrawerContent>
      <DrawerTitle>Preferences</DrawerTitle>
    </DrawerContent>
  </DrawerPositioner>
</DrawerRootProvider>;
```

Ark owns open state, snap points, swipe gestures, focus management, dismissal, IDs, state
attributes, and runtime CSS variables. Callback handlers receive Ark detail objects, including
`details.open`, `details.snapPoint`, and `details.value`.

## Solid composition notes

Ark Solid uses render-function `asChild`:
`asChild={(props) => <button {...props()} type="button" />}`. Ordinary refs and custom-host
composition are supported as separate native paths because Ark Solid does not forward refs through
`asChild`. `DrawerCloseIcon` composes `CloseButton` through the same native render-function
contract and defaults its accessible label to `Close drawer`.

`Drawer variant="island"` adds the detached, safe-area-aware surface styling from the React
component and defaults to the full snap point. `DrawerContent variant="island"` remains supported for
explicit presentation selection. `DrawerHeader`, `DrawerBody`, and `DrawerFooter` are layout helpers
only; all Ark
structural parts remain explicit and independently styleable.
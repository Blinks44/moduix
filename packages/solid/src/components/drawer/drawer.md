# Drawer (Solid)

The Solid adapter follows the React contract in `packages/react/src/components/drawer/drawer.md`:
the same parts, slots, defaults (`lazyMount` and `unmountOnExit` are `true`), the `DrawerContent`
`variant="island"` prop, and the single `--moduix-drawer-island-inset` variable.

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

`DrawerRootProvider` receives the accessor returned by `useDrawer()`.

## Solid notes

- Ark Solid uses render-function `asChild`. Refs and custom hosts are separate paths because Ark
  Solid does not forward refs through `asChild`.
- `DrawerContent` passes `draggable` to Ark as `true` unless the caller sets it.
- `variant` on `DrawerContent` stays reactive; changing it does not remount open content.
- Types `DrawerRootProps`, `DrawerRootProviderProps`, `DrawerContentProps`, and `DrawerVariant` are
  exported.
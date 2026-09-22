# Popover (Solid)

`Popover` is a styled Ark UI overlay for compact interactive content anchored to a trigger or a
separate reference element. The Solid adapter preserves the React component's explicit anatomy,
callbacks, focus behavior, lifecycle, portal placement, runtime state, and CSS hooks.

## Composition

```tsx
<Popover positioning={{ gutter: 8 }}>
  <PopoverTrigger asChild={(props) => <Button {...props()}>Open</Button>} />
  <PopoverPositioner>
    <PopoverContent>
      <PopoverCloseIcon />
      <PopoverHeader>
        <PopoverTitle>Project status</PopoverTitle>
        <PopoverDescription>Everything is on schedule.</PopoverDescription>
      </PopoverHeader>
      <PopoverFooter>
        <PopoverCloseTrigger>Close</PopoverCloseTrigger>
      </PopoverFooter>
    </PopoverContent>
  </PopoverPositioner>
</Popover>
```

`Popover` is the root component. `PopoverPositioner` is portalled by default; use
`portalled={false}` or `portalRef` on the root to control overlay placement. Modal popovers remain
portalled even when `portalled={false}`. `lazyMount` and `unmountOnExit` default to `true`.

## API surface

The adapter exports `Popover`, `PopoverRootProvider`, `PopoverContext`, all `Popover*` parts,
`usePopover`, and `usePopoverContext`. Every part is a direct flat export; there is no compound
`Popover` namespace.

`PopoverRootProvider` receives the accessor returned by `usePopover`. Configure `portalled` in
the hook because the provider accepts only `portalRef` for portal placement:

```tsx
const popover = usePopover({ portalled: false });

<PopoverRootProvider value={popover}>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverPositioner>
    <PopoverContent>
      <PopoverTitle>Preferences</PopoverTitle>
    </PopoverContent>
  </PopoverPositioner>
</PopoverRootProvider>;
```

Ark owns open state, focus management, dismissal, IDs, state attributes, positioning, and runtime
CSS variables. Callback handlers receive Ark detail objects, including `details.open`.

## Solid composition notes

Ark Solid uses render-function `asChild`:
`asChild={(props) => <button {...props()} type="button" />}`. Its factory does not forward `ref`
through `asChild`, so ordinary refs and custom-host composition are supported as separate native
paths. `PopoverCloseIcon` composes `CloseButton` through the same native render-function
contract and defaults its accessible label to `Close popover`.

`PopoverArrow` renders `PopoverArrowTip` when no child is supplied. `PopoverHeader`, `PopoverBody`, and `PopoverFooter`
are plain layout helpers. When `PopoverBody` is a direct child of `PopoverContent`, it becomes the scroll region
when the popup reaches its available height.

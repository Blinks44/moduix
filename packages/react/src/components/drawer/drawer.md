# Drawer

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/drawer
- Chakra UI: https://chakra-ui.com/docs/components/drawer
- shadcn/ui: https://ui.shadcn.com/docs/components/drawer

These sources were compared on 2026-10-15.

## Purpose

`Drawer` is a styled Ark UI edge panel for navigation, forms, bottom sheets, snap points, and
swipe-driven workflows.

## Upstream model to preserve

The wrapper follows `@ark-ui/react/drawer` directly. Preserve Ark part names, logical
`swipeDirection` values (`up`, `down`, `start`, `end`), detail-object callbacks, focus management,
drag behavior, render strategy props, stack coordination, and runtime CSS variables.

## Current behavior contract

`Drawer` and `DrawerRootProvider` portal `DrawerBackdrop` and `DrawerPositioner` automatically by
default. Set `portalled={false}` to render them inline, or pass `portalRef` to target a custom
container. All other Ark root props pass through unchanged, including snap points, `modal`,
`preventScroll`, `triggerValue`, and focus targets.

`lazyMount` and `unmountOnExit` default to `true` (Ark uses `false`), so the overlay is absent until
the first open and is removed after its exit animation.

`DrawerContent` adds one moduix prop, mirrored as a data attribute:

| Prop      | Values                         | Default     | Attribute      |
| --------- | ------------------------------ | ----------- | -------------- |
| `size`    | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`      | `data-size`    |
| `variant` | `'island'`                     | `undefined` | `data-variant` |

`size` sets the width of `start` and `end` drawers to 18rem, 22rem, 28rem, or 36rem, capped at
`100vw - 2rem`. Top and bottom drawers take the full width; their height comes from snap points.
There is no `full` size: a side drawer always leaves a gap at the opposite edge, and a class on
`DrawerContent` covers the rare full-screen case.

`island` insets the surface from the viewport by `--moduix-drawer-island-inset` (safe-area insets
still apply), rounds every corner, and removes the overdrag bleed. The types are exported as `DrawerSize` and
`DrawerVariant`; `DrawerRootProps`, `DrawerRootProviderProps`, and `DrawerContentProps` are exported
too.

`DrawerRootProvider` must receive a value from the moduix `useDrawer` export; do not render `Drawer`
for the same state instance. `useDrawerContext`, `useDrawerStackContext`, and `DrawerContext` are
exported from moduix. Other Ark APIs and detail types stay direct imports from `@ark-ui/react/drawer`.

## Anatomy and exported parts

```text
Drawer
├─ DrawerTrigger
├─ DrawerSwipeArea (optional)
├─ DrawerBackdrop
└─ DrawerPositioner
   └─ DrawerContent
      ├─ DrawerGrabber
      │  └─ DrawerGrabberIndicator
      ├─ DrawerHeader (layout helper)
      │  ├─ DrawerTitle
      │  ├─ DrawerCloseIcon (optional)
      │  └─ DrawerDescription
      ├─ DrawerBody (layout helper)
      └─ DrawerFooter (layout helper)
         └─ DrawerCloseTrigger

DrawerStack
├─ DrawerIndentBackground
└─ DrawerIndent
```

Stable slots use the kebab-case part name: `drawer-trigger`, `drawer-backdrop`,
`drawer-positioner`, `drawer-content`, `drawer-grabber`, `drawer-grabber-indicator`,
`drawer-title`, `drawer-description`, `drawer-close-trigger`, `drawer-close-icon`,
`drawer-swipe-area`, `drawer-indent`, `drawer-indent-background`, `drawer-header`, `drawer-body`,
and `drawer-footer`.

## Composition

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button>Open drawer</Button>
  </DrawerTrigger>
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
        <DrawerCloseTrigger asChild>
          <Button variant="outline">Close</Button>
        </DrawerCloseTrigger>
      </DrawerFooter>
    </DrawerContent>
  </DrawerPositioner>
</Drawer>
```

`DrawerTrigger` and `DrawerCloseTrigger` are unstyled, like the Dialog triggers. Compose them with
`asChild` and a `Button`, or style the native button with a class.

Nested drawers use separate `useDrawer()` states, each with its own `DrawerRootProvider`.

## Accessibility and state

Ark implements the dialog pattern: title and description wiring, focus trap and restoration, and
Escape dismissal. `DrawerContent` has the dialog role and is the ref target.

State hooks: `data-state`, `data-swipe-direction` (the resolved physical direction), `data-swiping`,
`data-dragging`, `data-expanded`, `data-nested-drawer-open`, `data-nested-drawer-swiping`, and
`data-variant`. Ark runtime variables include `--drawer-swipe-progress`, `--drawer-swipe-strength`,
`--nested-drawers`, and `--layer-index`.

## Defaults and styling

- Colors, borders, spacing, radius, and typography come from foundation tokens. Change them for one
  drawer with a class on the part. The only component variable is `--moduix-drawer-island-inset`,
  because the positioner padding and the island exit travel both read it.
- The backdrop reads the shared `--moduix-backdrop-bg` and `--moduix-backdrop-filter`. Drawer motion
  uses `--moduix-transition-spring`; Ark's drag owns the content transform, so the drawer does not use
  the popup motion recipes.
- Top and bottom drawers have `height: 100%` and `max-height: 80dvh`. Ark measures this stable height
  for snap points and drag release; do not switch it to `height: auto`. Override `max-height` with a
  class when a drawer needs another cap.
- `DrawerContent::after` is the overdrag bleed recommended by Ark (`--_drawer-bleed`); the top-drawer
  exit keyframe also travels through it. `--_drawer-island-offset` adds the island inset to the
  enter and exit travel. Both are private.
- Nested drawers move the parent with the `scale` and `translate` properties so Ark's inline
  `transform` stays intact. Direction-specific `transform-origin` is set outside the nested state so
  the parent does not jump when the front drawer closes.
- Do not toggle `animation: none` on `DrawerContent` while swiping; Ark would replay the open keyframe
  when it removes `data-swiping`. The closed keyframe stays active during a swipe so drag-to-dismiss
  animates from the release point.
- Closed `DrawerBackdrop` and `DrawerContent` stay displayed only while the positioner is still
  present for the exit animation, without `!important`.
- `DrawerSwipeArea` and the side corners use physical edges because `data-swipe-direction` is
  physical; logical utilities would flip them a second time in RTL.
- Under `prefers-reduced-motion: reduce`, animations and transitions take 1ms so Ark still sees the
  exit animation end.
- `DrawerBody` inherits the content color; only `DrawerDescription` is muted. `DrawerFooter` wraps
  its actions on narrow screens.

## Intentional sugar

- `DrawerCloseIcon` composes `CloseButton` through `DrawerCloseTrigger asChild` and defaults its
  accessible label to `Close drawer`. It only adds a radius and hover colors to `CloseButton`.
- `DrawerHeader`, `DrawerBody`, and `DrawerFooter` are plain layout helpers with no state.
  `DrawerHeader` places the title and `DrawerCloseIcon` in one row and lets the description span it.
- `DrawerContent size` follows the Dialog `size` pattern and the Chakra UI drawer sizes.
- The "Advanced customization" docs example builds the drawer without any of these helpers.

## Agent notes

- Keep the explicit Ark structural tree visible in stories and docs.
- Keep portal transport on the root.
- Do not convert Ark callback detail objects to scalar values.
- Use `start` and `end` in public props; physical `left` and `right` are styling attributes only.
- Keep `DrawerGrabber` and `DrawerGrabberIndicator` as separate parts.
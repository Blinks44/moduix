# Drawer

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/drawer
- Chakra UI: https://chakra-ui.com/docs/components/drawer

## Purpose

`Drawer` is a styled Ark UI edge panel for navigation, forms, bottom sheets, snap points, and
swipe-driven workflows.

## Upstream model to preserve

The wrapper follows `@ark-ui/react/drawer` directly. Preserve Ark part names, logical
`swipeDirection` values (`up`, `down`, `start`, `end`), detail-object callbacks, focus management,
drag behavior, render strategy props, stack coordination, and runtime CSS variables.

`Drawer.RootProvider` must receive a value from `useDrawer`; do not render `Drawer.Root` for the
same state instance. `Drawer.Context`, `useDrawerContext`, and `useDrawerStackContext` expose Ark
state without remapping.

## Current behavior contract

`Drawer` and `Drawer.Root` are equivalent root components. All Ark root props pass through,
including controlled/uncontrolled open and snap-point state, multiple trigger values, focus
lifecycle, dismissal controls, `ids`, `present`, `lazyMount`, and `unmountOnExit`.
`lazyMount` and `unmountOnExit` default to `true` so Ark can keep closed content mounted only while
exit animations finish.

The wrapper adds visual defaults and four narrow layout helpers: `CloseIcon`, `Header`, `Body`, and
`Footer`. It does not hide structural parts.

## Anatomy and exported parts

```text
Drawer.Root
├─ Drawer.Trigger
├─ Drawer.SwipeArea (optional)
├─ Drawer.Backdrop
└─ Drawer.Positioner
   └─ Drawer.Content
      ├─ Drawer.Grabber
      │  └─ Drawer.GrabberIndicator
      ├─ Drawer.Header (moduix layout helper)
      │  ├─ Drawer.Title
      │  ├─ Drawer.Description
      │  └─ Drawer.CloseIcon (optional moduix helper)
      ├─ Drawer.Body (optional moduix layout helper)
      ├─ Drawer.Footer (optional moduix layout helper)
      │  └─ Drawer.CloseTrigger
      └─ consumer content
```

Ark-aligned exports are `Root`, `RootProvider`, `Stack`, `Trigger`, `Backdrop`, `Positioner`,
`Content`, `Grabber`, `GrabberIndicator`, `Title`, `Description`, `CloseTrigger`, `SwipeArea`,
`Indent`, `IndentBackground`, and `Context`.

Stable moduix hooks use matching kebab-case `data-slot` values, for example `drawer-content`,
`drawer-grabber`, and `drawer-close-trigger`.

## Composition

```tsx
<Drawer.Root>
  <Drawer.Trigger asChild>
    <Button>Open drawer</Button>
  </Drawer.Trigger>
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
    </Drawer.Content>
  </Drawer.Positioner>
</Drawer.Root>
```

Use `asChild` for custom trigger and close-trigger hosts. The child must be a single semantic,
focusable element that preserves button behavior.

## Upstream feature coverage

- Swipe directions: all Ark logical directions are passed through and styled using the resolved
  physical `data-swipe-direction`.
- Edge opening: `SwipeArea` receives a default edge size and follows Ark's resolved opening
  direction.
- Snap points: `snapPoints`, `defaultSnapPoint`, `snapPoint`, `onSnapPointChange(details)`, and
  `snapToSequentialPoints` pass through.
- Modal and controlled modes: Ark `modal`, `open`, and `onOpenChange(details)` behavior is unchanged.
- Scroll and drag controls: `preventDragOnScroll`, `data-no-drag`, and `Content draggable={false}`
  are supported.
- Multiple triggers: `Trigger value`, `triggerValue`, and
  `onTriggerValueChange(details)` are supported.
- External state: `useDrawer` and `RootProvider` are exported from the package barrel.
- Stack visuals: `Stack`, `Indent`, and `IndentBackground` use Ark stack context.
- Render strategy and focus props: `present`, `lazyMount`, `unmountOnExit`, `initialFocusEl`,
  `finalFocusEl`, `restoreFocus`, and dismissal callbacks pass through.

## Accessibility and state

Ark implements the WAI-ARIA dialog pattern, title/description wiring, focus trapping, focus
restoration, Escape dismissal, and trigger focus return. `Content` receives the dialog role and is
the consumer ref target for measurement or imperative focus.

Callbacks retain Ark detail objects:

- `onOpenChange(details)` reads `details.open`.
- `onSnapPointChange(details)` reads `details.snapPoint`.
- `onTriggerValueChange(details)` reads `details.value` and `details.triggerElement`.

State styling uses `data-scope="drawer"`, Ark part attributes, `data-state`, `data-swiping`,
`data-dragging`, `data-expanded`, `data-nested-drawer-open`,
`data-nested-drawer-swiping`, and `data-swipe-direction`.

Runtime variables include `--drawer-translate-x`, `--drawer-translate-y`,
`--drawer-snap-point-offset-x`, `--drawer-snap-point-offset-y`,
`--drawer-swipe-movement-x`, `--drawer-swipe-movement-y`, `--drawer-swipe-progress`,
`--drawer-swipe-strength`, `--drawer-height`, `--drawer-frontmost-height`,
`--nested-drawers`, `--nested-layer-count`, and `--layer-index`.

## Defaults and styling

Every visual part accepts `className`; Ark polymorphic parts also retain `asChild`. The component
uses moduix colors, spacing, radii, shadows, and motion tokens.

Backdrop and content enter/exit animations target Ark `data-state`. During open drag, CSS must not
toggle `animation: none` on `Content`; otherwise the open keyframe is recreated when Ark removes
`data-swiping`, causing bottom drawers to jump. Drag release and snap-point settling follow Ark's
inline `transform` variables with a CSS transition. The closed keyframe stays active while
`data-swiping` is still present so drag-to-dismiss can animate from the release offset to the
viewport edge before Ark reports `ANIMATION_END`.

Closed `Backdrop` and `Content` override the native `hidden` display behavior only while the
`Positioner` is still present for exit animation. This uses normal scoped author CSS, avoids
`!important`, and lets fully closed drawers remain hidden when `unmountOnExit={false}`. Active open
dragging disables transition duration and follows Ark's inline transform variables; closed dragging
must remain animatable for drag-to-dismiss. Direction-specific styles target `data-swipe-direction`.
`Content::after` provides the overdrag bleed recommended by Ark.

`Drawer.Content` uses `height: var(--drawer-size, 100%)` with `max-height:
var(--drawer-max-height, 80dvh)` for top/bottom drawers so Ark measures a stable content size for
drag release and snap points. Do not change this back to `height: auto`; snap points will collapse
to the height of the visible content.

Public theme variables are declared in `packages/ui/src/styles/theme.css`.

## Intentional sugar and differences from upstream

- `Drawer.CloseIcon` composes `CloseButton.Root` through Ark `CloseTrigger asChild` and defaults its
  accessible label to `Close drawer`.
- `Drawer.Header`, `Drawer.Body`, and `Drawer.Footer` are native layout helpers only; they add no
  state or hidden structure.
- `Drawer.Trigger` and `Drawer.CloseTrigger` receive moduix button visuals only when `asChild` is
  not used.
- The removed Base UI API is intentionally unsupported: `DrawerProvider`, `createDrawerHandle`,
  `DrawerPortal`, `DrawerViewport`, `DrawerPopup`, `DrawerContentInner`, `DrawerHandle`, and the
  former high-level `DrawerContent` composition wrapper.

## Agent notes

- Keep the explicit Ark structural tree visible in stories and public docs.
- Do not add a portal or recreate the removed Base UI popup/viewport split.
- Do not convert Ark callback detail objects to scalar values.
- Use `start` and `end` in public props; physical `left` and `right` are styling attributes only.
- Keep `Grabber` and `GrabberIndicator` as separate parts.

## Local changelog

- 2026-06-18: Removed conflicting content open keyframes, kept closed drag-to-dismiss animations
  active while `data-swiping` is present, removed `!important` hidden overrides, and updated demo
  defaults to use compact bottom snap points where the example is not about full-height drawers.
- 2026-06-18: Replaced the Base UI implementation with Ark UI 5.37.2, adopted Ark anatomy and
  callbacks, exposed provider/context/stack APIs, rewrote state styling, and removed all Base UI
  compatibility layers.
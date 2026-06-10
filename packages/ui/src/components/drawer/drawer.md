# Drawer

`Drawer` is the moduix swipeable edge panel and bottom-sheet wrapper. It keeps Base UI drawer
state, focus management, gestures, snap points, and nested-drawer behavior, then adds styled parts,
`data-slot` hooks, a high-level `DrawerContent` composition helper, and a small close-icon helper for
side-panel workflows.

Use `Drawer` when the panel should feel draggable or should support snap points, nested sheets, or
edge-open gestures. If you only need a simple popup without swipe behavior, prefer `Dialog`.

Upstream primitive docs: https://base-ui.com/react/components/drawer.md

## Basic usage

```tsx
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from 'moduix';

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button />}>Open bottom drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>You are all caught up. Good job!</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>Bottom drawer with the default moduix composition.</DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
```

`DrawerContent` is the default path. It renders the portal, optional backdrop, viewport, popup,
decorative handle, and `DrawerContentInner` for you:

```text
DrawerContent
└─ DrawerPortal
   ├─ DrawerBackdrop          (only when modal={true})
   └─ DrawerViewport
      └─ DrawerPopup
         ├─ DrawerHandle
         └─ DrawerContentInner
            └─ children
```

## Composition

### Parts

| Part                     | Element / role | `data-slot`                | Purpose                                                                                     |
| ------------------------ | -------------- | -------------------------- | ------------------------------------------------------------------------------------------- |
| `DrawerProvider`         | none           | -                          | Enables Base UI indent coordination for page-indent effects.                                |
| `DrawerIndentBackground` | `div`          | `drawer-indent-background` | Background overlay used with `DrawerProvider` + `DrawerIndent`.                             |
| `DrawerIndent`           | `div`          | `drawer-indent`            | Surface wrapper that scales/translates while a nested drawer is open.                       |
| `Drawer`                 | none           | -                          | Root state container. Also shares `modal` mode with `DrawerContent`.                        |
| `DrawerTrigger`          | `button`       | `drawer-trigger`           | Opens the drawer.                                                                           |
| `DrawerSwipeArea`        | `div`          | `drawer-swipe-area`        | Invisible edge area for opening with a swipe gesture.                                       |
| `DrawerContent`          | composition    | -                          | Convenience wrapper around portal + viewport + popup + handle.                              |
| `DrawerPortal`           | portal         | `drawer-portal`            | Moves overlay content out of normal flow.                                                   |
| `DrawerBackdrop`         | `div`          | `drawer-backdrop`          | Modal scrim under the drawer.                                                               |
| `DrawerViewport`         | `div`          | `drawer-viewport`          | Fixed positioning container that aligns the popup by swipe direction.                       |
| `DrawerPopup`            | `div`          | `drawer-popup`             | Visual drawer surface.                                                                      |
| `DrawerHandle`           | `div`          | `drawer-handle`            | Decorative grab handle for top and bottom sheets.                                           |
| `DrawerContentInner`     | `div`          | `drawer-content`           | Actual content container inside the popup.                                                  |
| `DrawerHeader`           | `div`          | `drawer-header`            | Title and description group; close controls placed directly inside auto-align to the right. |
| `DrawerTitle`            | heading        | `drawer-title`             | Accessible drawer label.                                                                    |
| `DrawerDescription`      | `p`            | `drawer-description`       | Accessible supporting description.                                                          |
| `DrawerBody`             | `div`          | `drawer-body`              | Optional scroll/content area.                                                               |
| `DrawerFooter`           | `div`          | `drawer-footer`            | Action row.                                                                                 |
| `DrawerClose`            | button         | `drawer-close`             | Generic close control.                                                                      |
| `DrawerCloseIcon`        | button         | `drawer-close-icon`        | Close icon helper backed by `CloseButton`.                                                  |
| `createDrawerHandle()`   | imperative API | -                          | Detached trigger / imperative open-close handle from Base UI.                               |

Recommended anatomy:

```tsx
<Drawer swipeDirection="right">
  <DrawerTrigger render={<Button />}>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle />
      <DrawerCloseIcon aria-label="Close drawer" />
      <DrawerDescription />
    </DrawerHeader>
    <DrawerBody />
    <DrawerFooter>
      <DrawerClose />
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

Use low-level parts when you need portal props (`keepMounted`), different structure, or custom
surface composition:

```tsx
<Drawer swipeDirection="right">
  <DrawerTrigger render={<Button />}>Open custom drawer</DrawerTrigger>
  <DrawerPortal keepMounted>
    <DrawerBackdrop forceRender />
    <DrawerViewport>
      <DrawerPopup>
        <DrawerHandle />
        <DrawerContentInner>{/* content */}</DrawerContentInner>
      </DrawerPopup>
    </DrawerViewport>
  </DrawerPortal>
</Drawer>
```

## Public props

The wrapper intentionally stays thin. It does not redefine every Base UI prop locally; the tables
below cover the props that shape the moduix API or are commonly needed in app code.

### `Drawer`

`Drawer` renders no DOM element. It wraps `DrawerPrimitive.Root` and passes `modal` to
`DrawerContent` through context so the convenience wrapper can decide whether to render the backdrop
and whether the viewport should block outside pointer interaction.

| Prop                      | Type                                        | Default  | Notes                                                                                                                                         |
| ------------------------- | ------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `modal`                   | `true \| false \| "trap-focus"`             | `true`   | `true` renders a backdrop and blocks outside pointer interaction. `"trap-focus"` keeps keyboard focus trapped but does not render a backdrop. |
| `swipeDirection`          | `"down" \| "up" \| "left" \| "right"`       | `"down"` | Controls which edge the drawer is attached to.                                                                                                |
| `defaultOpen`             | `boolean`                                   | `false`  | Uncontrolled open state.                                                                                                                      |
| `open`                    | `boolean`                                   | -        | Controlled open state.                                                                                                                        |
| `onOpenChange`            | `(open, eventDetails) => void`              | -        | Controlled state callback.                                                                                                                    |
| `onOpenChangeComplete`    | `(open: boolean) => void`                   | -        | Runs after the open/close transition completes.                                                                                               |
| `snapPoints`              | `(number \| string)[]`                      | -        | Enables snap-point behavior. Most useful for `down` and `up` drawers.                                                                         |
| `snapPoint`               | `number \| string \| null`                  | -        | Controlled active snap point.                                                                                                                 |
| `onSnapPointChange`       | `(snapPoint) => void`                       | -        | Called when the active snap point changes.                                                                                                    |
| `disablePointerDismissal` | `boolean`                                   | `false`  | Useful for persistent drawers managed entirely from app state.                                                                                |
| `handle`                  | `Drawer.Handle<Payload>`                    | -        | Connects a detached trigger or imperative actions.                                                                                            |
| `children`                | `ReactNode` or `({ payload }) => ReactNode` | -        | Base UI payload pattern is preserved.                                                                                                         |

Controlled snap-point example:

```tsx
import { useState } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from 'moduix';

const snapPoints = [0.35, 0.65, 1] as const;

export function DrawerWithSnapPoints() {
  const [snapPoint, setSnapPoint] = useState<number | string | null>(snapPoints[1]);

  return (
    <Drawer snapPoints={[...snapPoints]} snapPoint={snapPoint} onSnapPointChange={setSnapPoint}>
      <DrawerTrigger render={<Button />}>Open drawer with snap points</DrawerTrigger>
      <DrawerContent snapLayout>
        <DrawerHeader>
          <DrawerTitle>Snap points</DrawerTitle>
          <DrawerDescription>Current snap point: {String(snapPoint)}</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>{/* scrollable content */}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
```

### `DrawerTrigger`

`DrawerTrigger` extends Base UI trigger props. Without `render`, it renders a styled native button.
When `render` is provided, moduix skips the default trigger styles.

| Prop        | Type                                   | Default |
| ----------- | -------------------------------------- | ------- |
| `className` | string or state callback               | -       |
| `style`     | style object or state callback         | -       |
| `render`    | replacement element or render function | -       |
| `disabled`  | `boolean`                              | `false` |
| `handle`    | `Drawer.Handle<Payload>`               | -       |
| `payload`   | `Payload`                              | -       |

### `DrawerContent`

`DrawerContent` applies popup props to `DrawerPopup`, then injects the standard portal/viewport
structure and a default handle.

`className` styles the popup surface, not `DrawerContentInner`.

| Prop                      | Type                                       | Default     | Notes                                                                          |
| ------------------------- | ------------------------------------------ | ----------- | ------------------------------------------------------------------------------ |
| `className`               | string or state callback                   | -           | Applied to `DrawerPopup`.                                                      |
| `style`                   | style object or state callback             | -           | Applied to `DrawerPopup`.                                                      |
| `render`                  | replacement element or render function     | -           | Applied to `DrawerPopup`.                                                      |
| `initialFocus`            | focus target, callback, `true`, or `false` | -           | Forwarded to the popup primitive.                                              |
| `finalFocus`              | focus target, callback, `true`, or `false` | -           | Forwarded to the popup primitive.                                              |
| `snapLayout`              | `boolean`                                  | `false`     | Enables the snap-layout height treatment for top and bottom drawers.           |
| `disableInitialAnimation` | `boolean`                                  | `false`     | Disables the first mount animation; useful for drawers rendered open on mount. |
| `variant`                 | `"default" \| "island"`                    | `"default"` | `island` removes the hidden bleed tail and adds viewport padding.              |

### Low-level parts

- `DrawerPortal`, `DrawerBackdrop`, `DrawerViewport`, and `DrawerPopup` expose the corresponding Base
  UI part props and are already used internally by `DrawerContent`.
- `DrawerContentInner` exposes Base UI `Drawer.Content` props. Use it when you need selection-safe
  content in a custom popup composition.
- `DrawerTitle` and `DrawerDescription` expose the Base UI title/description props.
- `DrawerHeader`, `DrawerBody`, and `DrawerFooter` extend native `div` props.
- `DrawerIndent`, `DrawerIndentBackground`, and `DrawerSwipeArea` preserve the Base UI parts for
  indent and edge-open flows.

### `DrawerClose` and `DrawerCloseIcon`

`DrawerClose` is the styled generic close button. Use the `render` prop for a composed button:

```tsx
<DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
```

`DrawerCloseIcon` is the narrow DX helper added for panel headers. It renders a `CloseButton`
through the drawer close primitive, keeps the close semantics, and defaults `aria-label` to
`"Close drawer"`.

```tsx
<DrawerHeader>
  <DrawerTitle>Details</DrawerTitle>
  <DrawerCloseIcon aria-label="Close details drawer" />
  <DrawerDescription>Right drawers can close from the header.</DrawerDescription>
</DrawerHeader>
```

`DrawerHeader` now auto-places `DrawerClose` and `DrawerCloseIcon` in the second column, matching the
overlay header pattern used elsewhere in the library.

### `createDrawerHandle()`

Use `createDrawerHandle()` for detached triggers or imperative opening:

```tsx
import { useMemo } from 'react';
import { Button, createDrawerHandle, Drawer, DrawerContent, DrawerTrigger } from 'moduix';

export function DetachedDrawerTrigger() {
  const drawerHandle = useMemo(() => createDrawerHandle(), []);

  return (
    <>
      <DrawerTrigger handle={drawerHandle} render={<Button variant="outline" />}>
        Open from detached trigger
      </DrawerTrigger>
      <Button type="button" onClick={() => drawerHandle.open(null)}>
        Open programmatically
      </Button>

      <Drawer handle={drawerHandle}>
        <DrawerContent>{/* ... */}</DrawerContent>
      </Drawer>
    </>
  );
}
```

## Styling API

### `className` targets

Every exported visual part accepts `className`. The most important targets are:

| Part / wrapper                            | Styles which element                          |
| ----------------------------------------- | --------------------------------------------- |
| `DrawerTrigger`                           | trigger button                                |
| `DrawerSwipeArea`                         | gesture hit area                              |
| `DrawerBackdrop`                          | modal backdrop                                |
| `DrawerViewport`                          | fixed alignment container                     |
| `DrawerPopup`                             | popup surface                                 |
| `DrawerContent`                           | popup surface (same element as `DrawerPopup`) |
| `DrawerHandle`                            | decorative grab handle                        |
| `DrawerContentInner`                      | inner content wrapper                         |
| `DrawerHeader` / `Body` / `Footer`        | layout wrappers                               |
| `DrawerTitle` / `Description`             | text parts                                    |
| `DrawerClose` / `DrawerCloseIcon`         | close controls                                |
| `DrawerIndent` / `DrawerIndentBackground` | indent effect surfaces                        |

For side widths, heights, padding, and visual tokens, prefer CSS variables on `DrawerContent` or
`DrawerPopup` instead of replacing structure.

### Wrapper-specific data attributes

`DrawerContent` adds a small wrapper contract on top of Base UI state:

| Target        | Attribute                               | Meaning                                                     |
| ------------- | --------------------------------------- | ----------------------------------------------------------- |
| `DrawerPopup` | `data-variant="default" \| "island"`    | Selects the moduix popup variant.                           |
| `DrawerPopup` | `data-snap-layout`                      | Enables snap-layout CSS for top and bottom drawers.         |
| `DrawerPopup` | `data-disable-initial-animation="true"` | Flags the no-first-animation path.                          |
| `DrawerPopup` | `data-mount-ready="true" \| "false"`    | Internal coordination flag for the initial-animation guard. |

Base UI also drives the stateful attributes that moduix styles:

| Parts                                             | Attributes used by moduix CSS                              |
| ------------------------------------------------- | ---------------------------------------------------------- |
| `DrawerIndent`, `DrawerIndentBackground`          | `data-active`                                              |
| `DrawerTrigger`, `DrawerClose`, `DrawerSwipeArea` | `data-disabled`                                            |
| `DrawerSwipeArea`, `DrawerPopup`                  | `data-swipe-direction="down" \| "up" \| "left" \| "right"` |
| `DrawerBackdrop`, `DrawerPopup`                   | `data-starting-style`, `data-ending-style`, `data-swiping` |
| `DrawerPopup`                                     | `data-nested-drawer-open`                                  |

### CSS variables

Most consumers only need a small subset of the Drawer contract:

| Group                     | Variables                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Surface and layout        | `--drawer-bg`, `--drawer-color`, `--drawer-border-color`, `--drawer-shadow`, `--drawer-radius`, `--drawer-width`, `--drawer-max-height`, `--drawer-side-width`, `--drawer-side-height`, `--drawer-side-max-height`, `--drawer-padding-x`, `--drawer-padding-y`, `--drawer-bleed-size`, `--drawer-transition`, `--drawer-island-padding`                                                                                                                                                                                                    |
| Viewport and backdrop     | `--drawer-backdrop-bg`, `--drawer-backdrop-blur`, `--drawer-backdrop-pointer-events`, `--drawer-backdrop-transition`, `--drawer-viewport-top`, `--drawer-viewport-right`, `--drawer-viewport-bottom`, `--drawer-viewport-left`, `--drawer-viewport-padding`, `--drawer-viewport-pointer-events`                                                                                                                                                                                                                                            |
| Controls                  | `--drawer-control-bg`, `--drawer-control-bg-hover`, `--drawer-control-border-color`, `--drawer-control-border-width`, `--drawer-control-color`, `--drawer-control-font-size`, `--drawer-control-height`, `--drawer-control-line-height`, `--drawer-control-padding-x`, `--drawer-control-padding-y`, `--drawer-control-radius`, `--drawer-focus-ring-color`, `--drawer-focus-ring-width`                                                                                                                                                   |
| Close icon                | `--drawer-close-icon-bg`, `--drawer-close-icon-bg-hover`, `--drawer-close-icon-color`, `--drawer-close-icon-color-hover`, `--drawer-close-icon-focus-ring-color`, `--drawer-close-icon-glyph-size`, `--drawer-close-icon-radius`, `--drawer-close-icon-size`                                                                                                                                                                                                                                                                               |
| Handle and text           | `--drawer-handle-bg`, `--drawer-handle-height`, `--drawer-handle-offset`, `--drawer-handle-opacity`, `--drawer-handle-radius`, `--drawer-handle-width`, `--drawer-title-color`, `--drawer-title-font-size`, `--drawer-title-font-weight`, `--drawer-title-line-height`, `--drawer-description-color`, `--drawer-description-font-size`, `--drawer-description-line-height`, `--drawer-body-font-size`, `--drawer-body-line-height`, `--drawer-body-margin-top`, `--drawer-header-gap`, `--drawer-footer-gap`, `--drawer-footer-margin-top` |
| Gestures, indent, nesting | `--drawer-swipe-area-size`, `--drawer-indent-background-bg`, `--drawer-indent-background-opacity`, `--drawer-indent-background-opacity-active`, `--drawer-indent-radius-active`, `--drawer-indent-radius-transition`, `--drawer-indent-scale-active`, `--drawer-indent-transition`, `--drawer-indent-translate-y-active`, `--drawer-nested-peek`, `--drawer-nested-scale-step`                                                                                                                                                             |

Base UI runtime variables are also present in the theme and are read by the styles:
`--drawer-swipe-progress`, `--drawer-swipe-movement-x`, `--drawer-swipe-movement-y`,
`--drawer-swipe-strength`, `--drawer-snap-point-offset`, `--drawer-height`,
`--drawer-frontmost-height`, and `--nested-drawers`. Treat those as runtime state, not design
tokens to hard-code globally.

## Accessibility and UX

- Base UI provides focus trapping, focus return, escape-key dismissal, swipe gestures, and nested
  drawer coordination. moduix preserves that behavior.
- `DrawerTitle` and `DrawerDescription` should be present for most drawers so the popup gets an
  accessible label and description.
- `modal={true}` is the default and renders a backdrop. Use `modal={false}` for persistent side
  panels that should not block the page. Use `modal="trap-focus"` when keyboard focus should stay in
  the drawer but pointer interaction outside should remain available.
- `DrawerContentInner` is the correct place for selectable or scrollable content. Base UI uses this
  split so swipe gestures do not interfere with mouse text selection inside the content area.
- Add `data-base-ui-swipe-ignore` to a descendant when that element must opt out of swipe dismissal
  for all input types.
- `DrawerHandle` is decorative. It is hidden automatically for left and right drawers.
- Disabled trigger and close controls now block pointer interaction and use the shared disabled
  opacity treatment, matching other overlay controls in the library.

## Limitations and recommendations

- `DrawerContent` always inserts the default portal, popup, handle, and `DrawerContentInner`. If you
  need `keepMounted`, no handle, or a different element order, switch to low-level composition.
- `className` on `DrawerContent` styles the popup surface. It does not style `DrawerContentInner`.
- `snapLayout` is intended for `down` and `up` drawers with snap points. It is not useful for left
  and right side panels.
- `variant="island"` removes the hidden bleed tail and adds outer viewport padding. Use it for
  inset, floating drawers rather than edge-flush sheets.
- The default handle is always rendered by `DrawerContent`; for a fully custom header or handle-free
  composition, use `DrawerPopup` + `DrawerContentInner` directly.
- `DrawerProvider`, `DrawerIndent`, and `DrawerIndentBackground` are only needed for the indent
  effect. Do not add them to ordinary drawers.

## Intentional differences from Base UI

- moduix ships a styled wrapper with `data-slot` hooks and a documented CSS-variable contract.
- `DrawerContent` is a convenience composition helper that also adds `variant`, `snapLayout`, and
  `disableInitialAnimation`.
- `DrawerCloseIcon` is a moduix helper for common side-panel headers; Base UI only gives the generic
  close primitive.
- `DrawerHeader` auto-places `DrawerClose` and `DrawerCloseIcon` to keep overlay headers consistent
  with `Dialog`.
- Local docs describe the moduix wrapper contract only. Base UI remains the reference for primitive
  lifecycle details that are not wrapped or changed here.

## Agent notes

- Keep `Drawer` a thin wrapper over Base UI. Do not add slot prop bags, class maps, variants beyond
  the existing `variant="island"`, or structure-driving booleans.
- Preserve the `DrawerContent` composition contract and its wrapper-specific data attributes:
  `data-variant`, `data-snap-layout`, `data-disable-initial-animation`, and `data-mount-ready`.
- Preserve `DrawerContentInner` as the selection-safe content area inside the popup.
- If drawer header layout, close-icon behavior, or CSS variables change, update stories and this file
  in the same task.

## Local changelog

- 2026-06-10: Moved drawer motion defaults onto shared transition tokens so docs previews and shipped
  CSS resolve the same fallback chain for popup, backdrop, and indent transitions.
- Added `DrawerCloseIcon` and header auto-placement for close controls so side drawers match the
  overlay patterns already used by `Dialog` and `Lightbox`.
- Aligned `DrawerTrigger` and `DrawerClose` disabled styling with the shared control pattern by
  blocking pointer interaction and applying disabled opacity.
- Rewrote the local documentation so it describes the actual moduix wrapper contract instead of the
  upstream Base UI docs.
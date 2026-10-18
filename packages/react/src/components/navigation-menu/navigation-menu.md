## Upstream reference

This wrapper follows Ark UI's Navigation Menu documentation and React source:

- https://ark-ui.com/docs/components/navigation-menu
- https://github.com/chakra-ui/ark/tree/main/packages/react/src/components/navigation-menu
  (accessed 2026-09-01)

## Purpose

`NavigationMenu` provides a styled, composable site-navigation bar with links and disclosure panels.

## Public contract

`NavigationMenu` is the only public root. `NavigationMenuRootProvider` connects a state store made
with `useNavigationMenu()`.

```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem value="products">
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/products">All products</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

The public parts are `NavigationMenuRootProvider`, `NavigationMenuContext`, `NavigationMenuList`,
`NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink`,
`NavigationMenuIndicator`, `NavigationMenuItemIndicator`, `NavigationMenuArrow`,
`NavigationMenuViewportPositioner`, and `NavigationMenuViewport`. All visible parts accept `className`
and expose stable `data-slot="navigation-menu-*"` hooks.
Every adapter also re-exports the Ark part prop types, `NavigationMenuValueChangeDetails`, and the
`useNavigationMenu` types.

## Preservation notes

Ark owns controlled and uncontrolled `value`, `defaultValue`, `onValueChange(details)`, hover and click
delays, roving focus, `orientation`, `ids`, `asChild`, lazy mount behavior, and ARIA relationships. Keep
the callback detail object unchanged. `NavigationMenuTrigger` requires an enclosing `NavigationMenuItem`;
`NavigationMenuItem`, `NavigationMenuTrigger`, and `NavigationMenuContent` connect through the item's
`value`.

`NavigationMenuViewport` is opt-in. Render it inside `NavigationMenuViewportPositioner`; Ark then moves
matching `NavigationMenuContent` nodes into the viewport while keeping their item relationships intact.
An optional `NavigationMenuIndicator` belongs inside `NavigationMenuList`. Use its
`NavigationMenuArrow` only with a shared viewport, following Ark's viewport composition.
`NavigationMenuViewportPositioner`
accepts Ark's `align` prop (`"start" | "center" | "end"`, default `"center"`) to align the shared viewport.
`NavigationMenuContent` preserves its
children unchanged. The recommended basic composition does not render an arrow.
Navigation menu panels intentionally stay in the root instead of using `OverlayPortal`: Ark measures trigger,
indicator, and viewport coordinates in that shared local coordinate system.
Use `NavigationMenuRootProvider` with `useNavigationMenu()`
only when the state store must be created outside the rendered tree.

## Styling and accessibility

The root renders a `nav`; the default list is horizontal and uses Ark's vertical orientation when requested.
Useful Ark hooks are `data-scope="navigation-menu"`, `data-part`, `data-state`, `data-current`,
`data-disabled`, `data-orientation`, directional `data-motion` values, and Ark's `--trigger-x`,
`--trigger-y`, `--trigger-width`, `--trigger-height`, `--viewport-x`, `--viewport-y`,
`--viewport-width`, and `--viewport-height` runtime variables.

The root shrink-wraps its list up to the available inline size. Viewport content keeps the same size
limits as standalone content, so Ark measures the actual panel and the viewport follows it through
`--viewport-width` and `--viewport-height`. Ark measures `--trigger-x` and `--viewport-x` from the
left edge, so the indicator and the horizontal viewport positioner use physical `left` placement and
stay aligned in RTL. Content and viewport motion use the shared `moduix-popup-*` and
`moduix-navigation-menu-content-*` foundation keyframes with `--moduix-popup-motion-*`; reduced motion
shortens animations to 1ms. CSS Modules expose only the panel and viewport size limits as
`--moduix-navigation-menu-*` variables; other styles come from foundation tokens.

## Differences from upstream

The wrapper adds default CSS-module styling and stable `data-slot` values. It does not defer Ark parts,
add trigger icons or arrows, alter state, portal ordinary content, or translate Ark props and callbacks.
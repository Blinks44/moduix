## Upstream reference

Ark UI has no dedicated Navigation Menu page yet. This wrapper follows the Ark React source:

- https://github.com/chakra-ui/ark/tree/main/packages/react/src/components/navigation-menu
  (accessed 2026-08-23)
- https://github.com/chakra-ui/zag/blob/main/shared/src/css/navigation-menu-viewport.css
- https://github.com/chakra-ui/zag/blob/main/shared/src/css/navigation-menu-keyframes.css
  (accessed 2026-08-23)

## Purpose

`NavigationMenu` provides a styled, composable site-navigation bar with links and disclosure panels.

## Public contract

`NavigationMenu` is the short root form. `NavigationMenu.Root` is an alias; `RootProvider` connects a
state store made with `useNavigationMenu()`.

```tsx
<NavigationMenu>
  <NavigationMenu.List>
    <NavigationMenu.Item value="products">
      <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <NavigationMenu.Link href="/products">All products</NavigationMenu.Link>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu>
```

The public parts are `Root`, `RootProvider`, `Context`, `List`, `Item`, `Trigger`, `Content`, `Link`,
`Indicator`, `ItemIndicator`, `Arrow`, `ViewportPositioner`, and `Viewport`. All visible parts accept
`className` and expose stable `data-slot="navigation-menu-*"` hooks.

## Preservation notes

Ark owns controlled and uncontrolled `value`, `defaultValue`, `onValueChange(details)`, hover and click
delays, roving focus, `orientation`, `ids`, `asChild`, lazy mount behavior, and ARIA relationships. Keep
the callback detail object unchanged. `Trigger` requires an enclosing `Item`; `Item`, `Trigger`, and
`Content` connect through the item's `value`.

`Viewport` is opt-in. Render it inside `ViewportPositioner`; Ark then moves matching `Content` nodes into
the viewport while keeping their item relationships intact. An optional shared `Indicator` with an `Arrow`
belongs inside `List` for this composition. Without a viewport, an optional indicator instead belongs inside
its `Content`. The recommended basic composition does not render an arrow.
Navigation menu panels intentionally stay in the root instead of using `OverlayPortal`: Ark measures trigger,
indicator, and viewport coordinates in that shared local coordinate system.
Use `RootProvider` with `useNavigationMenu()`
only when the state store must be created outside the rendered tree.

## Styling and accessibility

The root renders a `nav`; the default list is horizontal and uses Ark's vertical orientation when requested.
Useful Ark hooks are `data-scope="navigation-menu"`, `data-part`, `data-state`, `data-current`,
`data-disabled`, `data-orientation`, directional `data-motion` values, and Ark's `--trigger-x`,
`--trigger-y`, `--trigger-width`, `--trigger-height`, `--viewport-x`, `--viewport-y`,
`--viewport-width`, and `--viewport-height` runtime variables. Default styles animate measured viewport
dimensions and incoming or outgoing content and disable motion when the user prefers reduced motion.
The root shrink-wraps its list up to the available inline size. Viewport content keeps the same minimum
and maximum size constraints as standalone content, so Ark measures the actual panel and the viewport
follows that element through `--viewport-width` and `--viewport-height`. Its size, entrance, and directional
content motion follow Zag's viewport recipe; the surface and arrow use the moduix `Menu` tokens. The default
arrow overlaps only the popup outline, not its first item.

## Differences from upstream

The wrapper adds default CSS-module styling and stable `data-slot` values. It does not defer Ark parts,
add trigger icons or arrows, alter state, portal ordinary content, or translate Ark props and callbacks.
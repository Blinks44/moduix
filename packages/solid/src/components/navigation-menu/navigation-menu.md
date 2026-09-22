# NavigationMenu

NavigationMenu provides accessible navigation with trigger-controlled content panels and an optional viewport.

## Anatomy

```tsx
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuViewportPositioner,
  NavigationMenuViewport,
  NavigationMenuRootProvider,
  NavigationMenuContext,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuItemIndicator,
  NavigationMenuArrow,
} from '@moduix/solid/navigation-menu';

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem value="products">
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>Product links</NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
  <NavigationMenuViewportPositioner>
    <NavigationMenuViewport />
  </NavigationMenuViewportPositioner>
</NavigationMenu>;
```

## Parts

- `NavigationMenu` and `NavigationMenuRootProvider`
- `NavigationMenuContext`
- `NavigationMenuList`
- `NavigationMenuItem`
- `NavigationMenuTrigger`
- `NavigationMenuContent`
- `NavigationMenuLink`
- `NavigationMenuIndicator`
- `NavigationMenuItemIndicator`
- `NavigationMenuArrow`
- `NavigationMenuViewportPositioner`
- `NavigationMenuViewport`

All parts preserve the corresponding Ark UI Solid props and can receive a `class` override.
`NavigationMenuTrigger` and `NavigationMenuLink` support Solid's `asChild` render function:

```tsx
<NavigationMenuLink asChild={(props) => <a {...props()} href="/docs" />}>
  Documentation
</NavigationMenuLink>
```

`NavigationMenuViewportPositioner` accepts Ark's `align` prop (`"start" | "center" | "end"`, default `"center"`) to align the shared viewport.

Use `useNavigationMenu()` for a controlled state object and pass it to `NavigationMenuRootProvider`. Use
`useNavigationMenuContext()` inside `NavigationMenuContext` to read the current state.

The component uses the same CSS variables and state selectors as the React implementation.

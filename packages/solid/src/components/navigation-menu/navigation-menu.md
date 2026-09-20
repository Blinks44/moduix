# NavigationMenu

NavigationMenu provides accessible navigation with trigger-controlled content panels and an optional viewport.

## Anatomy

```tsx
import { NavigationMenu } from '@moduix/solid/navigation-menu';

<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item value="products">
      <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
      <NavigationMenu.Content>Product links</NavigationMenu.Content>
    </NavigationMenu.Item>
  </NavigationMenu.List>
  <NavigationMenu.ViewportPositioner>
    <NavigationMenu.Viewport />
  </NavigationMenu.ViewportPositioner>
</NavigationMenu.Root>;
```

## Parts

- `NavigationMenu.Root` and `NavigationMenu.RootProvider`
- `NavigationMenu.Context`
- `NavigationMenu.List`
- `NavigationMenu.Item`
- `NavigationMenu.Trigger`
- `NavigationMenu.Content`
- `NavigationMenu.Link`
- `NavigationMenu.Indicator`
- `NavigationMenu.ItemIndicator`
- `NavigationMenu.Arrow`
- `NavigationMenu.ViewportPositioner`
- `NavigationMenu.Viewport`

All parts preserve the corresponding Ark UI Solid props and can receive a `class` override. `Trigger` and `Link`
support Solid's `asChild` render function:

```tsx
<NavigationMenu.Link asChild={(props) => <a {...props()} href="/docs" />}>
  Documentation
</NavigationMenu.Link>
```

`ViewportPositioner` accepts Ark's `align` prop (`"start" | "center" | "end"`, default `"center"`) to align the shared viewport.

Use `useNavigationMenu()` for a controlled state object and pass it to `RootProvider`. Use
`useNavigationMenuContext()` inside `NavigationMenu.Context` to read the current state.

The component uses the same CSS variables and state selectors as the React implementation.
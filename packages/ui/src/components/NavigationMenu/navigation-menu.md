---
title: Navigation Menu
subtitle: A collection of links and menus for website navigation.
description: Thin styled wrapper around the Base UI Navigation Menu primitive.
---

# Navigation Menu

`NavigationMenu` is a styled wrapper around `@base-ui/react/navigation-menu`.

## Default usage

The default path keeps popup infrastructure internal:

```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from 'moduix';

export function Example() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Product</NavigationMenuTrigger>
          <NavigationMenuContent>{/* links */}</NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="#">Releases</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
```

The root renders `Portal`, `Positioner`, `Popup`, `Arrow`, and `Viewport` automatically.

## Small sugar

- `showPopup` disables the built-in popup composition.
- `showArrow` toggles the built-in popup arrow.
- `side`, `sideOffset`, `align`, `alignOffset`, `arrowPadding`, `anchor`, `collisionAvoidance`,
  `collisionBoundary`, `collisionPadding`, `sticky`, `positionMethod`, and
  `disableAnchorTracking` are forwarded to the built-in `Positioner`.
- `NavigationMenuTrigger` accepts `icon` and `hideIcon` for the common trigger-icon cases.

## Custom composition

For backdrops, inline viewports, or custom popup layout, disable the default popup and compose the
low-level parts directly:

```tsx
import {
  NavigationMenu,
  NavigationMenuArrow,
  NavigationMenuBackdrop,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from 'moduix';

export function CustomExample() {
  return (
    <NavigationMenu showPopup={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>{/* content */}</NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuPortal>
        <NavigationMenuBackdrop />
        <NavigationMenuPositioner sideOffset={16}>
          <NavigationMenuPopup>
            <NavigationMenuArrow />
            <NavigationMenuViewport />
          </NavigationMenuPopup>
        </NavigationMenuPositioner>
      </NavigationMenuPortal>
    </NavigationMenu>
  );
}
```

<script lang="ts">
  import {
    NavigationMenu,
    NavigationMenuArrow,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuItemIndicator,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    NavigationMenuViewportPositioner,
  } from '@/components/navigation-menu';
</script>

<NavigationMenu defaultValue="products">
  <NavigationMenuList>
    <NavigationMenuItem value="products">
      <NavigationMenuTrigger>
        Products
        <svg aria-hidden="true" data-testid="trigger-icon"></svg>
      </NavigationMenuTrigger>
      <NavigationMenuContent data-testid="products-content">
        <div data-testid="content-heading">Products</div>
        <NavigationMenuLink href="/docs">Documentation</NavigationMenuLink>
      </NavigationMenuContent>
      <NavigationMenuItemIndicator data-testid="item-indicator" />
    </NavigationMenuItem>
    <NavigationMenuIndicator data-testid="indicator">
      <NavigationMenuArrow data-testid="arrow" />
    </NavigationMenuIndicator>
  </NavigationMenuList>
  <NavigationMenuViewportPositioner>
    <NavigationMenuViewport data-testid="viewport" />
  </NavigationMenuViewportPositioner>
</NavigationMenu>
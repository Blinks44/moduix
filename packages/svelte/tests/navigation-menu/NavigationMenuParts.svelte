<script lang="ts">
  import {
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
  } from '@/components/navigation-menu';
</script>

<NavigationMenuList>
  <NavigationMenuItem value="home">
    <NavigationMenuLink current href="#home">Home</NavigationMenuLink>
  </NavigationMenuItem>
  <NavigationMenuItem value="products">
    <NavigationMenuTrigger>Products</NavigationMenuTrigger>
    <NavigationMenuContent>
      <NavigationMenuLink href="#analytics">Analytics</NavigationMenuLink>
    </NavigationMenuContent>
  </NavigationMenuItem>
  <NavigationMenuItem value="docs">
    <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
    <NavigationMenuContent>
      <NavigationMenuLink href="#guides">Guides</NavigationMenuLink>
    </NavigationMenuContent>
  </NavigationMenuItem>
  <NavigationMenuIndicator />
</NavigationMenuList>
<script lang="ts">
  import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
  } from '@/components/navigation-menu';
</script>

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem value="products">
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="#analytics">Analytics</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
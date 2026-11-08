<script lang="ts">
  import {
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
  } from '@/components/navigation-menu';
  import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
</script>

<NavigationMenuList>
  <NavigationMenuItem value="home">
    <NavigationMenuLink href="#home">Home</NavigationMenuLink>
  </NavigationMenuItem>
  <NavigationMenuItem value="products">
    <NavigationMenuTrigger>
      Products
      <ChevronDownIcon />
    </NavigationMenuTrigger>
    <NavigationMenuContent>
      <NavigationMenuLink href="#analytics">Analytics</NavigationMenuLink>
      <NavigationMenuLink href="#automation">Automation</NavigationMenuLink>
    </NavigationMenuContent>
  </NavigationMenuItem>
  <NavigationMenuItem value="docs">
    <NavigationMenuTrigger>
      Docs
      <ChevronDownIcon />
    </NavigationMenuTrigger>
    <NavigationMenuContent>
      <NavigationMenuLink href="#guides">Guides</NavigationMenuLink>
      <NavigationMenuLink href="#api">API reference</NavigationMenuLink>
    </NavigationMenuContent>
  </NavigationMenuItem>
</NavigationMenuList>
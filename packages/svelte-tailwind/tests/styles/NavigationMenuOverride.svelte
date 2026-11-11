<script lang="ts">
  import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
  } from '@/components/navigation-menu';
</script>

<NavigationMenu class="w-1/2 text-primary">
  <NavigationMenuList class="gap-4 p-2">
    <NavigationMenuItem value="products">
      <NavigationMenuTrigger class="min-h-0 rounded-lg px-6 text-lg">Products</NavigationMenuTrigger
      >
      <NavigationMenuContent class="max-w-md py-0">Product links</NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
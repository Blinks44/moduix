<script lang="ts">
  import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
  } from '@/components/navigation-menu';

  let rootRef: Element | null = $state(null);
  let triggerRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, triggerRef });
</script>

<NavigationMenu bind:ref={rootRef}>
  <NavigationMenuList>
    <NavigationMenuItem value="products">
      <NavigationMenuTrigger bind:ref={triggerRef}>Products</NavigationMenuTrigger>
      <NavigationMenuContent>Product links</NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
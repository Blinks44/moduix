<script lang="ts">
  import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
  } from '@/components/navigation-menu';
</script>

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem value="home">
      <NavigationMenuLink current>
        {#snippet asChild(props)}
          <a {...props()} data-testid="home-link" href="#home">Home</a>
        {/snippet}
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem value="products">
      <NavigationMenuTrigger>
        {#snippet asChild(props)}
          <button {...props()} type="button">Products</button>
        {/snippet}
      </NavigationMenuTrigger>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
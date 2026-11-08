<script lang="ts">
  import {
    NavigationMenuContext,
    NavigationMenuRootProvider,
    NavigationMenuViewport,
    NavigationMenuViewportPositioner,
    useNavigationMenu,
  } from '@/components/navigation-menu';
  import ContextHookValue from './ContextHookValue.svelte';
  import NavigationMenuParts from './NavigationMenuParts.svelte';

  const navigationMenu = useNavigationMenu({
    id: 'provider-navigation-menu',
    defaultValue: 'products',
  });
</script>

<NavigationMenuRootProvider value={navigationMenu}>
  <NavigationMenuParts />
  <NavigationMenuContext>
    {#snippet render(context)}
      <output data-testid="navigation-menu-value">{context().value || 'none'}</output>
    {/snippet}
  </NavigationMenuContext>
  <ContextHookValue />
  <NavigationMenuViewportPositioner align="center">
    <NavigationMenuViewport />
  </NavigationMenuViewportPositioner>
</NavigationMenuRootProvider>
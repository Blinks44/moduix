<script lang="ts">
  import { NavigationMenu, type NavigationMenuRootProps } from '@/components/navigation-menu';
  import NavigationMenuParts from './NavigationMenuParts.svelte';

  let { value = $bindable(), ...props }: NavigationMenuRootProps = $props();
</script>

<NavigationMenu {...props} bind:value>
  <NavigationMenuParts />
</NavigationMenu>
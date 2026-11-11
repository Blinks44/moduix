<script lang="ts">
  import { ChevronDown as ChevronDownIcon } from '@lucide/svelte';
  import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
  } from '@moduix/svelte/navigation-menu';
  import styles from '@/components/examples/navigation-menu/navigation-menu-controlled-value.module.css';

  let value = $state<string | undefined>();
</script>

<div class={styles.root}>
  <NavigationMenu bind:value>
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
          <NavigationMenuLink href="#integrations">Integrations</NavigationMenuLink>
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
          <NavigationMenuLink href="#examples">Examples</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
  <output>Open: {value ?? 'none'}</output>
</div>
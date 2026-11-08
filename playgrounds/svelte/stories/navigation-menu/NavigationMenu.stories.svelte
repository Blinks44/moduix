<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    NavigationMenu,
    NavigationMenuArrow,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuRootProvider,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    NavigationMenuViewportPositioner,
    useNavigationMenu,
  } from '@/components/navigation-menu';
  import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
  import styles from './NavigationMenu.stories.module.css';
  import NavigationMenuParts from './NavigationMenuParts.svelte';

  const { Story } = defineMeta({
    title: 'Components/NavigationMenu',
    component: NavigationMenu,
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let value: string | undefined = $state();
  const navigationMenu = useNavigationMenu({
    id: 'navigation-menu-root-provider',
    defaultValue: 'products',
  });
</script>

<Story name="Basic" asChild>
  <NavigationMenu>
    <NavigationMenuParts />
  </NavigationMenu>
</Story>

<Story name="Controlled" asChild>
  <div class={styles.stack}>
    <NavigationMenu bind:value>
      <NavigationMenuParts />
    </NavigationMenu>
    <output>open: {value || 'none'}</output>
  </div>
</Story>

<Story name="Viewport" asChild>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem value="products">
        <NavigationMenuTrigger>
          Products
          <ChevronDownIcon />
        </NavigationMenuTrigger>
        <NavigationMenuContent style="width: 20rem">
          <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr))">
            <NavigationMenuLink href="#analytics">Analytics</NavigationMenuLink>
            <NavigationMenuLink href="#automation">Automation</NavigationMenuLink>
            <NavigationMenuLink href="#integrations">Integrations</NavigationMenuLink>
            <NavigationMenuLink href="#reports">Reports</NavigationMenuLink>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem value="company">
        <NavigationMenuTrigger>
          Company
          <ChevronDownIcon />
        </NavigationMenuTrigger>
        <NavigationMenuContent style="width: 14rem">
          <NavigationMenuLink href="#about">About</NavigationMenuLink>
          <NavigationMenuLink href="#careers">Careers</NavigationMenuLink>
          <NavigationMenuLink href="#contact">Contact</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem value="resources">
        <NavigationMenuTrigger>
          Resources
          <ChevronDownIcon />
        </NavigationMenuTrigger>
        <NavigationMenuContent style="width: 18rem">
          <NavigationMenuLink href="#blog">Blog</NavigationMenuLink>
          <NavigationMenuLink href="#customers">Customer stories</NavigationMenuLink>
          <NavigationMenuLink href="#support">Support</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuIndicator>
        <NavigationMenuArrow />
      </NavigationMenuIndicator>
    </NavigationMenuList>
    <NavigationMenuViewportPositioner>
      <NavigationMenuViewport />
    </NavigationMenuViewportPositioner>
  </NavigationMenu>
</Story>

<Story name="Root Provider" asChild>
  <div class={styles.stack}>
    <output>open: {navigationMenu().value || 'none'}</output>
    <NavigationMenuRootProvider value={navigationMenu}>
      <NavigationMenuParts />
    </NavigationMenuRootProvider>
  </div>
</Story>
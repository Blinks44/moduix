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
  <div class="grid w-[30rem] gap-3">
    <NavigationMenu bind:value>
      <NavigationMenuParts />
    </NavigationMenu>
    <output class="text-sm text-muted-foreground">open: {value || 'none'}</output>
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
        <NavigationMenuContent class="w-80">
          <div class="grid grid-cols-2">
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
        <NavigationMenuContent class="w-56">
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
        <NavigationMenuContent class="w-72">
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
  <div class="grid w-[30rem] gap-3">
    <output class="text-sm text-muted-foreground">open: {navigationMenu().value || 'none'}</output>
    <NavigationMenuRootProvider value={navigationMenu}>
      <NavigationMenuParts />
    </NavigationMenuRootProvider>
  </div>
</Story>
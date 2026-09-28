<script setup lang="ts">
import { ChevronDown as ChevronDownIcon } from '@lucide/vue';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@moduix/vue/navigation-menu';
import styles from '@/components/examples/navigation-menu/navigation-menu-basic.module.css';
</script>

<template>
  <div :class="styles.root">
    <NavigationMenu>
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
  </div>
</template>
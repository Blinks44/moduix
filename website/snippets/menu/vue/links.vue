<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Menu,
  MenuContent,
  MenuIndicator,
  MenuItem,
  MenuPositioner,
  MenuTrigger,
  MenuViewport,
} from '@moduix/vue/menu';
import styles from '@/components/examples/menu/menu-links.module.css';
</script>

<template>
  <Menu>
    <MenuTrigger as-child>
      <Button>Help <MenuIndicator /></Button>
    </MenuTrigger>
    <MenuPositioner>
      <MenuContent :class="styles.content">
        <MenuViewport>
          <MenuItem as-child value="docs"><a href="#menu-docs">Documentation</a></MenuItem>
          <MenuItem as-child value="github"
            ><a href="https://github.com/Blinks44/moduix">GitHub</a></MenuItem
          >
          <MenuItem as-child value="changelog"><a href="#menu-changelog">Changelog</a></MenuItem>
          <MenuItem as-child value="support"><a href="#menu-support">Support</a></MenuItem>
        </MenuViewport>
      </MenuContent>
    </MenuPositioner>
  </Menu>
</template>
<script setup lang="ts">
import {
  Menu,
  MenuContent,
  MenuContextTrigger,
  MenuItem,
  MenuPositioner,
  MenuViewport,
} from '@moduix/vue/menu';
import styles from '@/components/examples/menu/menu-context-menu.module.css';
</script>

<template>
  <Menu>
    <MenuContextTrigger :class="styles.contextTrigger">Right click here</MenuContextTrigger>
    <MenuPositioner>
      <MenuContent :class="styles.content">
        <MenuViewport>
          <MenuItem value="cut">Cut</MenuItem>
          <MenuItem value="copy">Copy</MenuItem>
          <MenuItem value="paste">Paste</MenuItem>
          <MenuItem value="select-all">Select All</MenuItem>
        </MenuViewport>
      </MenuContent>
    </MenuPositioner>
  </Menu>
</template>
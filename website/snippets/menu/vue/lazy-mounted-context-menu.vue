<script setup lang="ts">
import {
  Menu,
  MenuContent,
  MenuContextTrigger,
  MenuItem,
  MenuPositioner,
  MenuViewport,
} from '@moduix/vue/menu';
import styles from '@/components/examples/menu/menu-lazy-mounted-context-menu.module.css';
</script>

<template>
  <Menu lazy-mount unmount-on-exit>
    <MenuContextTrigger :class="styles.contextTrigger">
      Right click lazy mounted content
    </MenuContextTrigger>
    <MenuPositioner>
      <MenuContent :class="styles.content">
        <MenuViewport>
          <MenuItem value="cut">Cut</MenuItem>
          <MenuItem value="copy">Copy</MenuItem>
          <MenuItem value="paste">Paste</MenuItem>
          <MenuItem value="delete" tone="destructive">Delete</MenuItem>
        </MenuViewport>
      </MenuContent>
    </MenuPositioner>
  </Menu>
</template>
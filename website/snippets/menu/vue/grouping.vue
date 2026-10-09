<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Menu,
  MenuContent,
  MenuIndicator,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
  MenuViewport,
} from '@moduix/vue/menu';
import styles from '@/components/examples/menu/menu-grouping.module.css';
</script>

<template>
  <Menu>
    <MenuTrigger as-child>
      <Button>Edit <MenuIndicator /></Button>
    </MenuTrigger>
    <MenuPositioner>
      <MenuContent :class="styles.content">
        <MenuViewport>
          <MenuItemGroup>
            <MenuItemGroupLabel>Clipboard</MenuItemGroupLabel>
            <MenuItem value="cut">Cut</MenuItem>
            <MenuItem value="copy">Copy</MenuItem>
            <MenuItem value="paste">Paste</MenuItem>
          </MenuItemGroup>
          <MenuSeparator />
          <MenuItemGroup>
            <MenuItemGroupLabel>Selection</MenuItemGroupLabel>
            <MenuItem value="select-all">Select All</MenuItem>
          </MenuItemGroup>
        </MenuViewport>
      </MenuContent>
    </MenuPositioner>
  </Menu>
</template>
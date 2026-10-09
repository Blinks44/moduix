<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuItemShortcut,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
  MenuViewport,
} from '@moduix/vue/menu';
</script>

<template>
  <Menu :positioning="{ placement: 'bottom-end', gutter: 12 }">
    <MenuTrigger as-child>
      <Button variant="outline">Project</Button>
    </MenuTrigger>
    <MenuPositioner>
      <MenuContent>
        <MenuViewport>
          <MenuItemGroup>
            <MenuItemGroupLabel>Project</MenuItemGroupLabel>
            <MenuItem as-child value="overview"><a href="#overview">Open overview</a></MenuItem>
            <MenuItem value="duplicate">
              <span>Duplicate project</span>
              <MenuItemShortcut>⌘D</MenuItemShortcut>
            </MenuItem>
            <MenuItem value="settings">Project settings</MenuItem>
          </MenuItemGroup>
          <MenuSeparator />
          <MenuItem value="archive" tone="destructive">Archive project</MenuItem>
        </MenuViewport>
      </MenuContent>
    </MenuPositioner>
  </Menu>
</template>
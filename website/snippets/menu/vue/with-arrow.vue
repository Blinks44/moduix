<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Menu,
  MenuArrow,
  MenuArrowTip,
  MenuContent,
  MenuIndicator,
  MenuItem,
  MenuPositioner,
  MenuTrigger,
  MenuViewport,
} from '@moduix/vue/menu';
</script>

<template>
  <Menu :positioning="{ placement: 'bottom-start', gutter: 12 }">
    <MenuTrigger as-child>
      <Button>File <MenuIndicator /></Button>
    </MenuTrigger>
    <MenuPositioner>
      <MenuContent>
        <MenuArrow><MenuArrowTip /></MenuArrow>
        <MenuViewport>
          <MenuItem value="new-file">New File</MenuItem>
          <MenuItem value="open">Open...</MenuItem>
          <MenuItem value="save">Save</MenuItem>
          <MenuItem value="save-as">Save As...</MenuItem>
        </MenuViewport>
      </MenuContent>
    </MenuPositioner>
  </Menu>
</template>
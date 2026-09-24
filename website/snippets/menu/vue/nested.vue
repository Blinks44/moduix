<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Menu,
  MenuContent,
  MenuIndicator,
  MenuItem,
  MenuPositioner,
  MenuTrigger,
  MenuTriggerItem,
  MenuTriggerItemIcon,
  MenuViewport,
} from '@moduix/vue/menu';
import styles from '@/components/examples/menu/menu-nested.module.css';
</script>

<template>
  <Menu>
    <MenuTrigger as-child>
      <Button>File <MenuIndicator /></Button>
    </MenuTrigger>
    <MenuPositioner>
      <MenuContent :class="styles.content">
        <MenuViewport>
          <MenuItem value="open">Open...</MenuItem>
          <MenuItem value="save">Save</MenuItem>
          <Menu>
            <MenuTriggerItem>Share <MenuTriggerItemIcon /></MenuTriggerItem>
            <MenuPositioner>
              <MenuContent :class="styles.content">
                <MenuViewport>
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="message">Message</MenuItem>
                  <MenuItem value="copy-link">Copy Link</MenuItem>
                  <MenuItem value="invite">Invite people</MenuItem>
                </MenuViewport>
              </MenuContent>
            </MenuPositioner>
          </Menu>
          <MenuItem value="print">Print</MenuItem>
        </MenuViewport>
      </MenuContent>
    </MenuPositioner>
  </Menu>
</template>
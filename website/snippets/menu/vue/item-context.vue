<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Menu,
  MenuContent,
  MenuIndicator,
  MenuItem,
  MenuItemContext,
  MenuPositioner,
  MenuTrigger,
  MenuViewport,
} from '@moduix/vue/menu';
import styles from '@/components/examples/menu/menu-item-context.module.css';
</script>

<template>
  <Menu>
    <MenuTrigger as-child>
      <Button>Settings <MenuIndicator /></Button>
    </MenuTrigger>
    <MenuPositioner>
      <MenuContent :class="styles.content">
        <MenuViewport>
          <MenuItem
            v-for="item in ['profile', 'notifications', 'appearance', 'security']"
            :key="item"
            :value="item"
          >
            <MenuItemContext v-slot="context">
              <span :data-highlighted="context.highlighted ? '' : undefined">
                {{ item[0].toUpperCase() + item.slice(1)
                }}{{ item === 'profile' ? ' Settings' : '' }}
              </span>
            </MenuItemContext>
          </MenuItem>
        </MenuViewport>
      </MenuContent>
    </MenuPositioner>
  </Menu>
</template>
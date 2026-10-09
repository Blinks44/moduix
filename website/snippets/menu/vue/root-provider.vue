<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  MenuContext,
  MenuContent,
  MenuIndicator,
  MenuItem,
  MenuPositioner,
  MenuRootProvider,
  MenuTrigger,
  MenuViewport,
  useMenu,
} from '@moduix/vue/menu';
import styles from '@/components/examples/menu/menu-root-provider.module.css';

const menu = useMenu({ defaultOpen: true });
function highlightCopy() {
  menu.api.value.setHighlightedValue('copy');
}
</script>

<template>
  <div>
    <div :class="styles.triggerRow">
      <MenuRootProvider :value="menu">
        <MenuTrigger as-child>
          <Button>Edit <MenuIndicator /></Button>
        </MenuTrigger>
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
        <MenuContext v-slot="context">
          <output>{{ context.open ? 'Open' : 'Closed' }}</output>
        </MenuContext>
      </MenuRootProvider>
    </div>
    <Button size="sm" @click="highlightCopy">Highlight Copy</Button>
  </div>
</template>
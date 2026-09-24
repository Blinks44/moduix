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
import { ref } from 'vue';
import styles from '@/components/examples/menu/menu-controlled.module.css';

const open = ref(false);
function handleOpenChange(details: { open: boolean }) {
  open.value = details.open;
}
</script>

<template>
  <div>
    <Menu v-model:open="open" :class="styles.root" @open-change="handleOpenChange">
      <MenuTrigger as-child>
        <Button>Actions <MenuIndicator /></Button>
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent :class="styles.content">
          <MenuViewport>
            <MenuItem value="edit">Edit</MenuItem>
            <MenuItem value="duplicate">Duplicate</MenuItem>
            <MenuItem value="archive">Archive</MenuItem>
            <MenuItem value="delete" tone="destructive">Delete</MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
    <output>Open: {{ open ? 'Yes' : 'No' }}</output>
    <Button size="sm" @click="open = !open">Toggle</Button>
  </div>
</template>
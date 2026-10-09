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
import styles from '@/components/examples/menu/menu-select-event.module.css';

const selected = ref('Nothing selected');
function handleSelect(details: { value: string }) {
  selected.value = details.value;
}
</script>

<template>
  <div>
    <div :class="styles.triggerRow">
      <Menu @select="handleSelect">
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
    </div>
    <output>Selected: {{ selected }}</output>
  </div>
</template>
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
import { Stack } from '@moduix/vue/stack';
import { ref } from 'vue';

const selected = ref('Nothing selected');
function handleSelect(details: { value: string }) {
  selected.value = details.value;
}
</script>

<template>
  <div>
    <Stack direction="row" justify="center">
      <Menu @select="handleSelect">
        <MenuTrigger as-child>
          <Button>Actions <MenuIndicator /></Button>
        </MenuTrigger>
        <MenuPositioner>
          <MenuContent>
            <MenuViewport>
              <MenuItem value="edit">Edit</MenuItem>
              <MenuItem value="duplicate">Duplicate</MenuItem>
              <MenuItem value="archive">Archive</MenuItem>
              <MenuItem value="delete" tone="destructive">Delete</MenuItem>
            </MenuViewport>
          </MenuContent>
        </MenuPositioner>
      </Menu>
    </Stack>
    <output>Selected: {{ selected }}</output>
  </div>
</template>
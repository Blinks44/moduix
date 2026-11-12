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
import { Stack } from '@moduix/vue/stack';

const menu = useMenu({ defaultOpen: true });
function highlightCopy() {
  menu.api.value.setHighlightedValue('copy');
}
</script>

<template>
  <div>
    <Stack direction="row" justify="center">
      <MenuRootProvider :value="menu">
        <MenuTrigger as-child>
          <Button>Edit <MenuIndicator /></Button>
        </MenuTrigger>
        <MenuPositioner>
          <MenuContent>
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
    </Stack>
    <div data-preview-meta>
      <Button size="sm" @click="highlightCopy">Highlight Copy</Button>
    </div>
  </div>
</template>
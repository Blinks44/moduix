<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogPositioner,
  DialogTitle,
} from '@moduix/vue/dialog';
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

const open = ref(false);
</script>

<template>
  <Menu @select="(details) => details.value === 'delete' && (open = true)">
    <MenuTrigger as-child>
      <Button variant="outline">Actions <MenuIndicator /></Button>
    </MenuTrigger>
    <MenuPositioner>
      <MenuContent>
        <MenuViewport>
          <MenuItem value="edit">Edit</MenuItem>
          <MenuItem value="duplicate">Duplicate</MenuItem>
          <MenuItem value="delete" tone="destructive">Delete...</MenuItem>
        </MenuViewport>
      </MenuContent>
    </MenuPositioner>
  </Menu>

  <Dialog v-model:open="open" role="alertdialog">
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent>
        <DialogTitle>Confirm delete</DialogTitle>
        <DialogDescription>This action cannot be undone.</DialogDescription>
        <DialogFooter>
          <DialogCloseTrigger as-child
            ><Button variant="outline">Cancel</Button></DialogCloseTrigger
          >
          <Button @click="open = false">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </DialogPositioner>
  </Dialog>
</template>
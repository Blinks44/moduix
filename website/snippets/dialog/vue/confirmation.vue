<script setup lang="ts">
import { FieldLabel, FieldRoot } from '@ark-ui/vue/field';
import { Button } from '@moduix/vue/button';
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseIcon,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogPositioner,
  DialogRootProvider,
  DialogTitle,
  useDialog,
} from '@moduix/vue/dialog';
import { computed, ref } from 'vue';

const formContent = ref('');
const open = ref(false);
const confirmDialog = useDialog();
const parentDialog = useDialog(
  computed(() => ({
    open: open.value,
    onOpenChange(details: { open: boolean }) {
      if (!details.open && formContent.value.trim()) {
        confirmDialog.value.setOpen(true);
        return;
      }
      open.value = details.open;
    },
  })),
);

const handleDiscard = () => {
  formContent.value = '';
  confirmDialog.value.setOpen(false);
  open.value = false;
};
</script>

<template>
  <Button @click="open = true">Open form</Button>

  <DialogRootProvider :value="parentDialog">
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent>
        <DialogTitle>Edit content</DialogTitle>
        <DialogCloseIcon />
        <DialogDescription>Unsaved changes ask for confirmation before closing.</DialogDescription>
        <DialogBody>
          <FieldRoot>
            <FieldLabel>Content</FieldLabel>
            <textarea v-model="formContent" placeholder="Enter some text..." rows="4" />
          </FieldRoot>
        </DialogBody>
      </DialogContent>
    </DialogPositioner>
  </DialogRootProvider>

  <DialogRootProvider :value="confirmDialog">
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent>
        <DialogTitle>Discard changes?</DialogTitle>
        <DialogDescription>You have unsaved changes.</DialogDescription>
        <DialogFooter>
          <DialogCloseTrigger as-child
            ><Button variant="outline">Keep editing</Button></DialogCloseTrigger
          >
          <Button @click="handleDiscard">Discard</Button>
        </DialogFooter>
      </DialogContent>
    </DialogPositioner>
  </DialogRootProvider>
</template>
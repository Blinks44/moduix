<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  DialogBackdrop,
  DialogCloseIcon,
  DialogContext,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogRootProvider,
  DialogTitle,
  useDialog,
} from '@moduix/vue/dialog';

const dialog = useDialog();
</script>

<template>
  <Button @click="dialog.setOpen(true)"> Dialog is {{ dialog.open ? 'open' : 'closed' }} </Button>
  <DialogRootProvider :value="dialog">
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent>
        <DialogTitle>Status</DialogTitle>
        <DialogDescription>
          <DialogContext v-slot="context">
            Dialog is {{ context.open ? 'open' : 'closed' }}
          </DialogContext>
        </DialogDescription>
        <DialogCloseIcon />
      </DialogContent>
    </DialogPositioner>
  </DialogRootProvider>
</template>
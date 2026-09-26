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
  DialogTrigger,
} from '@moduix/vue/dialog';
</script>

<template>
  <Dialog role="alertdialog">
    <DialogTrigger as-child><Button>Delete account</Button></DialogTrigger>
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>This action cannot be undone.</DialogDescription>
        <DialogFooter>
          <DialogCloseTrigger as-child>
            <Button id="cancel-delete-account" variant="outline">Cancel</Button>
          </DialogCloseTrigger>
          <DialogCloseTrigger as-child>
            <Button id="confirm-delete-account">Delete account</Button>
          </DialogCloseTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogPositioner>
  </Dialog>
</template>
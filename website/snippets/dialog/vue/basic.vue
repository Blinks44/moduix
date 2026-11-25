<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Dialog,
  DialogCloseIcon,
  DialogDescription,
  DialogHeader,
  DialogPanel,
  DialogTitle,
  DialogTrigger,
} from '@moduix/vue/dialog';
</script>

<template>
  <Dialog>
    <DialogTrigger as-child><Button>View notifications</Button></DialogTrigger>
    <DialogPanel>
      <DialogHeader>
        <DialogTitle>Notifications</DialogTitle>
        <DialogCloseIcon />
        <DialogDescription>You are all caught up. Good job!</DialogDescription>
      </DialogHeader>
    </DialogPanel>
  </Dialog>
</template>
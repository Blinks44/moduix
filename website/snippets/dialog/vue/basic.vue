<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Dialog,
  DialogBackdrop,
  DialogCloseIcon,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/vue/dialog';
</script>

<template>
  <Dialog>
    <DialogTrigger as-child><Button>View notifications</Button></DialogTrigger>
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogCloseIcon />
          <DialogDescription>You are all caught up. Good job!</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </DialogPositioner>
  </Dialog>
</template>
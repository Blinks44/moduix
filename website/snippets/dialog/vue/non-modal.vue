<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Dialog,
  DialogCloseIcon,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/vue/dialog';
</script>

<template>
  <Dialog :modal="false">
    <DialogTrigger as-child><Button>Open non-modal dialog</Button></DialogTrigger>
    <DialogPositioner>
      <DialogContent>
        <DialogTitle>Non-modal dialog</DialogTitle>
        <DialogDescription>The page remains interactive.</DialogDescription>
        <DialogCloseIcon />
      </DialogContent>
    </DialogPositioner>
  </Dialog>
</template>
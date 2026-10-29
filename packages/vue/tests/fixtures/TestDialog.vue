<script setup lang="ts">
import {
  Dialog,
  DialogTrigger,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogCloseIcon,
} from '@/index';
</script>

<template>
  <Dialog default-open :portalled="false">
    <DialogTrigger>Open dialog</DialogTrigger>
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent>
        <DialogTitle>Preferences</DialogTitle>
        <DialogDescription>Description</DialogDescription>
        <DialogCloseIcon />
      </DialogContent>
    </DialogPositioner>
  </Dialog>
</template>
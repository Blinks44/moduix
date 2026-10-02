<script setup lang="ts">
import {
  DialogBackdrop,
  DialogContent,
  DialogPositioner,
  DialogRootProvider,
  DialogTrigger,
  useDialog,
} from '@moduix/vue/dialog';
const dialog = useDialog();
</script>
<template>
  <DialogRootProvider :value="dialog">
    <DialogTrigger>Open dialog</DialogTrigger>
    <DialogBackdrop />
    <DialogPositioner
      ><DialogContent>State is owned by useDialog().</DialogContent></DialogPositioner
    >
  </DialogRootProvider>
</template>
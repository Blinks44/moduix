<script setup lang="ts">
import { Button } from '@moduix/vue/button';
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
    <DialogTrigger as-child><Button>Open dialog</Button></DialogTrigger>
    <DialogBackdrop />
    <DialogPositioner
      ><DialogContent>State is owned by useDialog().</DialogContent></DialogPositioner
    >
  </DialogRootProvider>
</template>
<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Dialog,
  DialogBackdrop,
  DialogCloseIcon,
  DialogContent,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/vue/dialog';
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child><Button>Open controlled dialog</Button></DialogTrigger>
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent>
        <DialogTitle>Publish changes?</DialogTitle>
        <DialogCloseIcon />
      </DialogContent>
    </DialogPositioner>
  </Dialog>
</template>
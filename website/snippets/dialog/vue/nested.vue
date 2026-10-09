<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  DialogBackdrop,
  DialogCloseIcon,
  DialogContent,
  DialogPositioner,
  DialogRootProvider,
  DialogTitle,
  useDialog,
} from '@moduix/vue/dialog';
import styles from '@/components/examples/dialog/dialog-nested.module.css';

const parent = useDialog();
const child = useDialog();
</script>

<template>
  <Button @click="parent.setOpen(true)">Open parent</Button>
  <DialogRootProvider :value="parent">
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent>
        <DialogTitle>Parent dialog</DialogTitle>
        <Button :class="styles.openNestedButton" @click="child.setOpen(true)">Open nested</Button>
      </DialogContent>
    </DialogPositioner>
  </DialogRootProvider>
  <DialogRootProvider :value="child">
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent>
        <DialogTitle>Nested dialog</DialogTitle>
        <DialogCloseIcon />
      </DialogContent>
    </DialogPositioner>
  </DialogRootProvider>
</template>
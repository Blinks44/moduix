<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogCloseIcon,
  DialogContent,
  DialogHeader,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
  type DialogSize,
} from '@moduix/vue/dialog';
import styles from '@/components/examples/dialog/dialog-sizes.module.css';

const sizes: DialogSize[] = ['sm', 'md', 'lg', 'xl', 'full'];
</script>

<template>
  <div :class="styles.row">
    <Dialog v-for="size in sizes" :key="size">
      <DialogTrigger as-child
        ><Button variant="outline">Open {{ size }}</Button></DialogTrigger
      >
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent :size="size">
          <DialogHeader>
            <DialogTitle>Size {{ size }}</DialogTitle>
            <DialogCloseIcon />
          </DialogHeader>
          <DialogBody>
            The size prop picks a width preset. The full size covers the viewport.
          </DialogBody>
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/vue/dialog';
import styles from '@/components/examples/dialog/dialog-advanced-customization.module.css';
</script>

<template>
  <Dialog>
    <DialogTrigger as-child><Button>Open custom dialog</Button></DialogTrigger>
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent>
        <DialogTitle>Custom content layout</DialogTitle>
        <DialogDescription>
          Compose the Ark parts directly when the layout helpers do not fit.
        </DialogDescription>
        <DialogCloseTrigger as-child>
          <Button :class="styles.closeButton" variant="outline">Close</Button>
        </DialogCloseTrigger>
      </DialogContent>
    </DialogPositioner>
  </Dialog>
</template>
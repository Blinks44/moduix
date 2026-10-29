<script setup lang="ts">
import { X as XIcon } from '@lucide/vue';
import { Button } from '@moduix/vue/button';
import { CloseButton } from '@moduix/vue/close-button';
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
import styles from '@/components/examples/dialog/dialog-build-from-parts.module.css';
</script>

<template>
  <Dialog>
    <DialogTrigger as-child><Button>View notifications</Button></DialogTrigger>
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent>
        <div :class="styles.header">
          <DialogTitle :class="styles.title">Notifications</DialogTitle>
          <DialogCloseTrigger as-child>
            <CloseButton aria-label="Close dialog" :class="styles.closeButton">
              <XIcon :stroke-width="3" />
            </CloseButton>
          </DialogCloseTrigger>
          <DialogDescription>You are all caught up. Good job!</DialogDescription>
        </div>
      </DialogContent>
    </DialogPositioner>
  </Dialog>
</template>
<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogCloseIcon,
  DialogContent,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/vue/dialog';
import { Field, FieldLabel } from '@moduix/vue/field';
import { ref } from 'vue';

const inputRef = ref<HTMLInputElement | null>(null);
const finalFocusRef = ref<HTMLElement | null>(null);
</script>

<template>
  <Button ref="finalFocusRef">Final focus target</Button>
  <Dialog
    lazy-mount
    unmount-on-exit
    :initial-focus-el="() => inputRef"
    :final-focus-el="() => finalFocusRef"
  >
    <DialogTrigger as-child><Button>Edit profile</Button></DialogTrigger>
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogBody>
          <Field>
            <FieldLabel>Name</FieldLabel>
            <input ref="inputRef" />
          </Field>
        </DialogBody>
        <DialogCloseIcon />
      </DialogContent>
    </DialogPositioner>
  </Dialog>
</template>
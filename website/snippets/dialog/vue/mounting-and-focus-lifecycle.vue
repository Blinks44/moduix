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
import { Input } from '@moduix/vue/input';
import { useTemplateRef } from 'vue';
import type { ComponentPublicInstance } from 'vue';

const input = useTemplateRef<ComponentPublicInstance>('input');
const finalFocus = useTemplateRef<ComponentPublicInstance>('finalFocus');
</script>

<template>
  <Button ref="finalFocus">Final focus target</Button>
  <Dialog
    lazy-mount
    unmount-on-exit
    :initial-focus-el="() => input?.$el"
    :final-focus-el="() => finalFocus?.$el"
  >
    <DialogTrigger as-child><Button>Edit profile</Button></DialogTrigger>
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogBody>
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input ref="input" />
          </Field>
        </DialogBody>
        <DialogCloseIcon />
      </DialogContent>
    </DialogPositioner>
  </Dialog>
</template>
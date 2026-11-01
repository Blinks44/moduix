<script setup lang="ts">
import { X as XIcon } from '@lucide/vue';
import { Button } from '@moduix/vue/button';
import { Stack } from '@moduix/vue/stack';
import {
  Toast,
  ToastCloseTrigger,
  ToastDescription,
  ToastTitle,
  ToastToaster,
  createToaster,
} from '@moduix/vue/toast';

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });
</script>

<template>
  <Stack align="center" gap="3">
    <ToastToaster :toaster="toaster">
      <template #default>
        <Toast>
          <ToastTitle />
          <ToastDescription />
          <ToastCloseTrigger><XIcon :stroke-width="3" /></ToastCloseTrigger>
        </Toast>
      </template>
    </ToastToaster>
    <Button
      @click="
        toaster.create({
          title: 'Scheduled for tomorrow',
          description: 'Your meeting has been scheduled for tomorrow at 10am.',
          type: 'info',
        })
      "
    >
      Schedule meeting
    </Button>
  </Stack>
</template>
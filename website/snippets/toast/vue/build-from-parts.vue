<script setup lang="ts">
import { X as XIcon } from '@lucide/vue';
import { Button } from '@moduix/vue/button';
import {
  Toast,
  ToastCloseTrigger,
  ToastDescription,
  ToastTitle,
  ToastToaster,
  createToaster,
} from '@moduix/vue/toast';
import styles from '@/components/examples/toast/toast-basic.module.css';

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });
</script>

<template>
  <div :class="styles.root">
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
  </div>
</template>
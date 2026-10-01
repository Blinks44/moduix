<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Toast,
  ToastCloseTrigger,
  ToastDescription,
  ToastTitle,
  ToastToaster,
  createToaster,
} from '@moduix/vue/toast';
import styles from '@/components/examples/toast/toast-custom-composition.module.css';

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });
</script>

<template>
  <div :class="styles.root">
    <ToastToaster :toaster="toaster">
      <template #default>
        <Toast :class="styles.toast">
          <div :class="styles.content">
            <span aria-hidden="true">ⓘ</span>
            <div>
              <ToastTitle />
              <ToastDescription />
            </div>
          </div>
          <ToastCloseTrigger aria-label="Close custom toast">×</ToastCloseTrigger>
        </Toast>
      </template>
    </ToastToaster>
    <Button
      @click="
        toaster.success({
          title: 'Workspace synced',
          description: 'Map edits are available to everyone.',
        })
      "
    >
      Create custom toast
    </Button>
  </div>
</template>
<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { ToastToaster, createToaster } from '@moduix/vue/toast';
import styles from '@/components/examples/toast/toast-basic.module.css';

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });
</script>

<template>
  <div :class="styles.root">
    <ToastToaster :toaster="toaster" />
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
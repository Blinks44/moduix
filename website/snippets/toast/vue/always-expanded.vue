<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { ToastToaster, createToaster } from '@moduix/vue/toast';
import styles from '@/components/examples/toast/toast-always-expanded.module.css';

const toaster = createToaster({ placement: 'bottom-end', overlap: false, gap: 16 });
</script>

<template>
  <div :class="styles.root">
    <ToastToaster :toaster="toaster" />
    <Button
      @click="
        toaster.info({
          title: 'Expanded toast',
          description: 'Each notification remains fully visible in the stack.',
        })
      "
    >
      Create expanded toast
    </Button>
  </div>
</template>
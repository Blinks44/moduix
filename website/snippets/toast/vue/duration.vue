<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { ToastToaster, createToaster } from '@moduix/vue/toast';
import styles from '@/components/examples/toast/toast-duration.module.css';

const durations = [
  { label: '1s', value: 1000 },
  { label: '3s', value: 3000 },
  { label: '5s', value: 5000 },
  { label: 'Permanent', value: Infinity },
];
const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 });
</script>

<template>
  <div :class="styles.root">
    <ToastToaster :toaster="toaster" />
    <Button
      v-for="duration in durations"
      :key="duration.label"
      @click="
        toaster.info({
          title: 'Reminder set',
          description:
            duration.value === Infinity
              ? 'This notification will stay until dismissed.'
              : `This notification will disappear in ${duration.label}.`,
          duration: duration.value,
        })
      "
    >
      {{ duration.label }}
    </Button>
  </div>
</template>
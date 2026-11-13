<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { ToastToaster, createToaster } from '@moduix/vue/toast';
import { ref } from 'vue';
import styles from '@/components/examples/toast/toast-options.module.css';

const durations = [
  { label: '1s', value: 1000 },
  { label: '3s', value: 3000 },
  { label: '5s', value: 5000 },
  { label: 'Permanent', value: Infinity },
];

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 });
const duration = ref(durations[2]!);
const showToast = () =>
  toaster.info({
    title: 'Reminder set',
    description:
      duration.value.value === Infinity
        ? 'This notification will stay until dismissed.'
        : `This notification will disappear in ${duration.value.label}.`,
    duration: duration.value.value,
  });
</script>

<template>
  <div :class="styles.root">
    <ToastToaster :toaster="toaster" />
    <div data-preview-meta>
      <output>Duration: {{ duration.label }}</output>
      <Button
        v-for="item in durations"
        :key="item.label"
        :variant="item.label === duration.label ? 'default' : 'outline'"
        @click="duration = item"
      >
        {{ item.label }}
      </Button>
      <Button @click="showToast">Show toast</Button>
    </div>
  </div>
</template>
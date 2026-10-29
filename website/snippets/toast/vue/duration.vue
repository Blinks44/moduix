<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Stack } from '@moduix/vue/stack';
import { ToastToaster, createToaster } from '@moduix/vue/toast';

const durations = [
  { label: '1s', value: 1000 },
  { label: '3s', value: 3000 },
  { label: '5s', value: 5000 },
  { label: 'Permanent', value: Infinity },
];
const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 });
</script>

<template>
  <Stack align="center" gap="3">
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
  </Stack>
</template>
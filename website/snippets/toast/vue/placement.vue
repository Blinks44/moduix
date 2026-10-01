<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { ToastToaster, createToaster } from '@moduix/vue/toast';
import { ref } from 'vue';
import styles from '@/components/examples/toast/toast-placement.module.css';

const placements = ['top-start', 'top', 'top-end', 'bottom-start', 'bottom', 'bottom-end'] as const;
type Placement = (typeof placements)[number];

const toasters: Record<Placement, ReturnType<typeof createToaster>> = {
  'top-start': createToaster({ placement: 'top-start', overlap: true, gap: 16 }),
  top: createToaster({ placement: 'top', overlap: true, gap: 16 }),
  'top-end': createToaster({ placement: 'top-end', overlap: true, gap: 16 }),
  'bottom-start': createToaster({ placement: 'bottom-start', overlap: true, gap: 16 }),
  bottom: createToaster({ placement: 'bottom', overlap: true, gap: 16 }),
  'bottom-end': createToaster({ placement: 'bottom-end', overlap: true, gap: 16 }),
};
const placement = ref<Placement>('bottom-end');
const showToast = () => {
  const currentPlacement = placement.value;
  toasters[currentPlacement].info({
    title: 'Notification',
    description: `This toast appears at ${currentPlacement}.`,
  });
};
</script>

<template>
  <div :class="styles.root">
    <ToastToaster v-for="item in placements" :key="item" :toaster="toasters[item]" />
    <Button
      v-for="item in placements"
      :key="item"
      :variant="item === placement ? 'default' : 'outline'"
      @click="placement = item"
    >
      {{ item }}
    </Button>
    <Button @click="showToast">Show toast</Button>
  </div>
</template>
<script setup lang="ts">
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import ColorPickerChannelSlider from './ColorPickerChannelSlider.vue';

defineOptions({ inheritAttrs: false });

export interface Props {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <div
    v-bind="attrs"
    :class="cn('flex min-w-0 flex-1 flex-col gap-2', className)"
    data-slot="color-picker-sliders"
  >
    <ColorPickerChannelSlider channel="hue" />
    <ColorPickerChannelSlider channel="alpha" />
  </div>
</template>
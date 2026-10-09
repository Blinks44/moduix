<script setup lang="ts">
import { SegmentGroupIndicator as ArkSegmentGroupIndicator } from '@ark-ui/vue/segment-group';
import type { SegmentGroupIndicatorProps } from '@ark-ui/vue/segment-group';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SegmentGroupIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const indicatorClass =
  'pointer-events-none absolute top-[var(--top)] left-[var(--left)] z-0 h-[var(--height)] w-[var(--width)] rounded-md bg-background shadow-sm !duration-200 !ease-in-out';
</script>

<template>
  <ArkSegmentGroupIndicator
    v-bind="attrs"
    :class="cn(indicatorClass, className)"
    data-slot="segment-group-indicator"
  >
    <slot />
  </ArkSegmentGroupIndicator>
</template>
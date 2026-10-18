<script setup lang="ts">
import { ProgressCircleRange as ArkProgressCircleRange } from '@ark-ui/vue/progress';
import type { ProgressCircleRangeProps } from '@ark-ui/vue/progress';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ProgressCircleRangeProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkProgressCircleRange
    v-bind="attrs"
    :class="
      cn(
        'stroke-primary transition-[stroke-dashoffset] duration-normal ease-in-out [stroke-linecap:round] data-[state=indeterminate]:animate-moduix-progress-circular-indeterminate data-[state=indeterminate]:[stroke-dasharray:calc(var(--circumference)/4)_var(--circumference)] motion-reduce:data-[state=indeterminate]:animate-none',
        className,
      )
    "
    data-slot="progress-circular-circle-range"
  >
    <slot />
  </ArkProgressCircleRange>
</template>
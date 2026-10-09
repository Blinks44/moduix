<script setup lang="ts">
import { SliderRange as ArkSliderRange } from '@ark-ui/vue/slider';
import type { SliderRangeProps } from '@ark-ui/vue/slider';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SliderRangeProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSliderRange
    v-bind="attrs"
    :class="
      cn(
        'h-full rounded-[inherit] bg-primary data-invalid:bg-destructive data-[orientation=vertical]:w-full',
        className,
      )
    "
    data-slot="slider-range"
  >
    <slot />
  </ArkSliderRange>
</template>
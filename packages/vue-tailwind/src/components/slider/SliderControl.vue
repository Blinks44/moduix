<script setup lang="ts">
import { SliderControl as ArkSliderControl } from '@ark-ui/vue/slider';
import type { SliderControlProps } from '@ark-ui/vue/slider';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SliderControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSliderControl
    v-bind="attrs"
    :class="
      cn(
        'relative flex min-h-5 w-full cursor-pointer touch-none items-center select-none group-data-readonly:cursor-default group-data-[orientation=vertical]:[grid-area:control] data-disabled:cursor-default data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-0 data-[orientation=vertical]:w-5 data-[orientation=vertical]:flex-col',
        className,
      )
    "
    data-slot="slider-control"
  >
    <slot />
  </ArkSliderControl>
</template>
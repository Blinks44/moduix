<script setup lang="ts">
import { SliderLabel as ArkSliderLabel } from '@ark-ui/vue/slider';
import type { SliderLabelProps } from '@ark-ui/vue/slider';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SliderLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSliderLabel
    v-bind="attrs"
    :class="
      cn(
        'text-sm leading-5 font-normal text-foreground select-none group-data-[orientation=vertical]:[grid-area:label]',
        className,
      )
    "
    data-slot="slider-label"
  >
    <slot />
  </ArkSliderLabel>
</template>
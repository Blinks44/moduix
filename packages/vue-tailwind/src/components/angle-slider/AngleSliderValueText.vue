<script setup lang="ts">
import {
  AngleSliderValueText as ArkAngleSliderValueText,
  useAngleSliderContext,
} from '@ark-ui/vue/angle-slider';
import type { AngleSliderValueTextProps } from '@ark-ui/vue/angle-slider';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AngleSliderValueTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const angleSlider = useAngleSliderContext();
</script>

<template>
  <ArkAngleSliderValueText
    v-bind="attrs"
    :class="
      cn(
        'text-center text-lg font-medium text-foreground tabular-nums [[data-slot=angle-slider-control]_&]:absolute [[data-slot=angle-slider-control]_&]:inset-0 [[data-slot=angle-slider-control]_&]:z-1 [[data-slot=angle-slider-control]_&]:grid [[data-slot=angle-slider-control]_&]:place-items-center',
        className,
      )
    "
    data-slot="angle-slider-value-text"
  >
    <slot>{{ angleSlider.value }}°</slot>
  </ArkAngleSliderValueText>
</template>
<script setup lang="ts">
import { AngleSliderThumb as ArkAngleSliderThumb } from '@ark-ui/vue/angle-slider';
import type { AngleSliderThumbProps } from '@ark-ui/vue/angle-slider';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AngleSliderThumbProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const thumbClass =
  "absolute inset-y-0 left-1/2 z-2 w-0 outline-0 before:absolute before:top-1 before:left-0 before:box-border before:size-4 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:border before:border-border before:bg-background before:shadow-sm before:transition-[border-color,background-color,box-shadow] before:duration-200 before:ease-in-out before:content-[''] focus-visible:before:border-ring focus-visible:before:ring-1 focus-visible:before:ring-ring data-disabled:pointer-events-none data-invalid:before:border-destructive motion-reduce:before:transition-none [[data-slot=angle-slider-control]:active:not([data-disabled]):not([data-readonly])_&]:before:border-ring [[data-slot=angle-slider-control]:active:not([data-disabled]):not([data-readonly])_&]:before:shadow-md [[data-slot=angle-slider-control]:active:not([data-disabled]):not([data-readonly])_&]:before:ring-1 [[data-slot=angle-slider-control]:active:not([data-disabled]):not([data-readonly])_&]:before:ring-ring";
</script>

<template>
  <ArkAngleSliderThumb
    v-bind="attrs"
    :class="cn(thumbClass, className)"
    data-slot="angle-slider-thumb"
  >
    <slot />
  </ArkAngleSliderThumb>
</template>
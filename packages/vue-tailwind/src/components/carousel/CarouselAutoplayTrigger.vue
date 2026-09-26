<script setup lang="ts">
import { CarouselAutoplayTrigger as ArkCarouselAutoplayTrigger } from '@ark-ui/vue/carousel';
import type { CarouselAutoplayTriggerProps } from '@ark-ui/vue/carousel';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CarouselAutoplayTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const autoplayTriggerClass =
  'focus-visible:outline-offset-0.5 inline-flex size-control-md min-w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm outline-0 transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-in-out focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-pressed:border-ring data-pressed:bg-accent data-pressed:text-accent-foreground motion-reduce:transition-none [&_svg]:size-4 [&:not(:disabled):not([data-disabled]):hover]:border-ring [&:not(:disabled):not([data-disabled]):hover]:bg-accent [&:not(:disabled):not([data-disabled]):hover]:text-accent-foreground [&:not(:disabled):not([data-disabled]):hover]:shadow-md';
</script>

<template>
  <ArkCarouselAutoplayTrigger
    v-bind="attrs"
    :class="cn(autoplayTriggerClass, className)"
    data-slot="carousel-autoplay-trigger"
  >
    <slot />
  </ArkCarouselAutoplayTrigger>
</template>
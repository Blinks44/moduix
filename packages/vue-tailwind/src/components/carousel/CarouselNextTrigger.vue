<script setup lang="ts">
import { CarouselNextTrigger as ArkCarouselNextTrigger } from '@ark-ui/vue/carousel';
import type { CarouselNextTriggerProps } from '@ark-ui/vue/carousel';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CarouselNextTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const nextTriggerClass =
  'focus-visible:outline-offset-0.5 inline-flex size-control-md shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm outline-0 transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-in-out focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-pressed:border-ring data-pressed:bg-accent data-pressed:text-accent-foreground motion-reduce:transition-none [&_svg]:size-4 [&:not(:disabled):not([data-disabled]):hover]:border-ring [&:not(:disabled):not([data-disabled]):hover]:bg-accent [&:not(:disabled):not([data-disabled]):hover]:text-accent-foreground [&:not(:disabled):not([data-disabled]):hover]:shadow-md';
const defaultIconClass = 'inline-flex items-center justify-center';
const chevronClass =
  'group-data-[orientation=vertical]/carousel:rotate-90 group-data-[orientation=horizontal]/carousel:rtl:rotate-180';
</script>

<template>
  <ArkCarouselNextTrigger
    v-bind="attrs"
    :class="cn(nextTriggerClass, className)"
    data-slot="carousel-next-trigger"
  >
    <slot>
      <span :class="defaultIconClass"><ChevronRightIcon :class="chevronClass" /></span>
    </slot>
  </ArkCarouselNextTrigger>
</template>
<script setup lang="ts">
import { CarouselIndicator as ArkCarouselIndicator } from '@ark-ui/vue/carousel';
import type { CarouselIndicatorProps } from '@ark-ui/vue/carousel';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CarouselIndicatorProps {
  class?: HTMLAttributes['class'];
  index: number;
}

const { class: className, index } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const indicatorClass =
  'focus-visible:outline-offset-0.5 size-2 cursor-pointer rounded-full border-0 bg-muted p-0 opacity-90 transition-[width,height,background-color,opacity] duration-150 focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 data-current:w-6 data-current:bg-primary data-current:opacity-100 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-readonly:cursor-not-allowed data-readonly:opacity-50 data-[orientation=vertical]:data-current:h-6 data-[orientation=vertical]:data-current:w-2 motion-reduce:transition-none forced-colors:bg-[ButtonText] forced-colors:data-current:bg-[Highlight] [&:not(:disabled):not([data-disabled]):not([data-readonly]):not([data-current]):hover]:bg-muted-foreground';
</script>

<template>
  <ArkCarouselIndicator
    v-bind="attrs"
    :class="cn(indicatorClass, className)"
    :index="index"
    data-slot="carousel-indicator"
  >
    <slot />
  </ArkCarouselIndicator>
</template>
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
  'size-2 cursor-pointer rounded-full border-0 bg-muted-foreground/50 p-0 transition-[width,height,background-color] duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-disabled data-current:w-6 data-current:bg-primary data-disabled:cursor-not-allowed data-disabled:opacity-disabled data-readonly:cursor-not-allowed data-readonly:opacity-disabled data-[orientation=vertical]:data-current:h-6 data-[orientation=vertical]:data-current:w-2 forced-colors:bg-[ButtonText] forced-colors:data-current:bg-[Highlight] [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):not([data-readonly]):not([data-current]):hover]:bg-muted-foreground';
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
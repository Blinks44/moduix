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
const triggerClass =
  'group/carousel-trigger inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm outline-0 transition-[background-color,color] duration-150 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-pressed:bg-accent data-pressed:text-accent-foreground motion-reduce:transition-none [&_svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:text-accent-foreground';
const iconClass =
  'group-data-[orientation=vertical]/carousel-trigger:rotate-90 group-data-[orientation=horizontal]/carousel-trigger:rtl:rotate-180';
</script>

<template>
  <ArkCarouselNextTrigger
    v-bind="attrs"
    :class="cn(triggerClass, 'size-control-md', className)"
    data-slot="carousel-next-trigger"
  >
    <slot>
      <ChevronRightIcon :class="iconClass" />
    </slot>
  </ArkCarouselNextTrigger>
</template>
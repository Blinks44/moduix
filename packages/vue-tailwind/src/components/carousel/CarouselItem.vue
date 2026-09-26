<script setup lang="ts">
import { CarouselItem as ArkCarouselItem } from '@ark-ui/vue/carousel';
import type { CarouselItemProps } from '@ark-ui/vue/carousel';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CarouselItemProps {
  class?: HTMLAttributes['class'];
  index: number;
}

const { class: className, index } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const itemClass = 'box-border min-h-0 min-w-0';
</script>

<template>
  <ArkCarouselItem
    v-bind="attrs"
    :class="cn(itemClass, className)"
    :index="index"
    data-slot="carousel-item"
  >
    <slot />
  </ArkCarouselItem>
</template>
<script setup lang="ts">
import { CarouselItemGroup as ArkCarouselItemGroup } from '@ark-ui/vue/carousel';
import type { CarouselItemGroupProps } from '@ark-ui/vue/carousel';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CarouselItemGroupProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const itemGroupClass =
  'min-h-0 min-w-0 flex-1 rounded-xl outline-0 focus-visible:outline-focus-inset focus-visible:outline-offset-focus-inset focus-visible:outline-ring data-dragging:cursor-grabbing data-dragging:select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:overscroll-y-contain';
</script>

<template>
  <ArkCarouselItemGroup
    v-bind="attrs"
    :class="cn(itemGroupClass, className)"
    data-slot="carousel-item-group"
  >
    <slot />
  </ArkCarouselItemGroup>
</template>
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
  'flex min-h-0 min-w-0 flex-1 [scrollbar-width:none] overscroll-x-contain overscroll-y-auto scroll-smooth rounded-xl outline-0 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring data-dragging:cursor-grabbing data-dragging:select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:overscroll-x-auto data-[orientation=vertical]:overscroll-y-contain motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden';
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
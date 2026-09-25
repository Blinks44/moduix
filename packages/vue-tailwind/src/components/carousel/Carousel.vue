<script setup lang="ts">
import { CarouselRoot as ArkCarouselRoot } from '@ark-ui/vue/carousel';
import type { CarouselRootEmits, CarouselRootProps } from '@ark-ui/vue/carousel';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CarouselRootProps {
  class?: HTMLAttributes['class'];
  slideCount: number;
}

export interface Emits extends /* @vue-ignore */ CarouselRootEmits {}

const { class: className, slideCount } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  'group/carousel flex w-full min-w-0 flex-col gap-3 data-[orientation=vertical]:h-96 data-[orientation=vertical]:flex-row data-[orientation=vertical]:items-stretch';
</script>

<template>
  <ArkCarouselRoot
    v-bind="attrs"
    :class="cn(rootClass, className)"
    :slide-count="slideCount"
    data-slot="carousel-root"
  >
    <slot />
  </ArkCarouselRoot>
</template>
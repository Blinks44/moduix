<script setup lang="ts">
import { CarouselAutoplayIndicator as ArkCarouselAutoplayIndicator } from '@ark-ui/vue/carousel';
import type { CarouselAutoplayIndicatorProps } from '@ark-ui/vue/carousel';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CarouselAutoplayIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const autoplayIndicatorClass =
  'inline-flex min-w-4 items-center justify-center text-xs font-medium uppercase';
</script>

<template>
  <ArkCarouselAutoplayIndicator
    v-bind="attrs"
    :class="cn(autoplayIndicatorClass, className)"
    data-slot="carousel-autoplay-indicator"
  >
    <slot />
  </ArkCarouselAutoplayIndicator>
</template>
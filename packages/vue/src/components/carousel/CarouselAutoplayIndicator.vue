<script setup lang="ts">
import { CarouselAutoplayIndicator as ArkCarouselAutoplayIndicator } from '@ark-ui/vue/carousel';
import type { CarouselAutoplayIndicatorProps } from '@ark-ui/vue/carousel';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Carousel.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CarouselAutoplayIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCarouselAutoplayIndicator
    v-bind="attrs"
    :class="clsx(styles.autoplayIndicator, className)"
    data-slot="carousel-autoplay-indicator"
  >
    <slot />
  </ArkCarouselAutoplayIndicator>
</template>
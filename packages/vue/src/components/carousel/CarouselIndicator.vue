<script setup lang="ts">
import { CarouselIndicator as ArkCarouselIndicator } from '@ark-ui/vue/carousel';
import type { CarouselIndicatorProps } from '@ark-ui/vue/carousel';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Carousel.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CarouselIndicatorProps {
  class?: HTMLAttributes['class'];
  index: number;
}

const { class: className, index } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCarouselIndicator
    v-bind="attrs"
    :class="clsx(styles.indicator, className)"
    :index="index"
    data-slot="carousel-indicator"
  >
    <slot />
  </ArkCarouselIndicator>
</template>
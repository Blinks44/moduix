<script setup lang="ts">
import { CarouselControl as ArkCarouselControl } from '@ark-ui/vue/carousel';
import type { CarouselControlProps } from '@ark-ui/vue/carousel';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Carousel.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CarouselControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCarouselControl
    v-bind="attrs"
    :class="clsx(styles.control, className)"
    data-slot="carousel-control"
  >
    <slot />
  </ArkCarouselControl>
</template>
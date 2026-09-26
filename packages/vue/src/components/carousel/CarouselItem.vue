<script setup lang="ts">
import { CarouselItem as ArkCarouselItem } from '@ark-ui/vue/carousel';
import type { CarouselItemProps } from '@ark-ui/vue/carousel';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Carousel.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CarouselItemProps {
  class?: HTMLAttributes['class'];
  index: number;
}

const { class: className, index } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCarouselItem
    v-bind="attrs"
    :class="clsx(styles.item, className)"
    :index="index"
    data-slot="carousel-item"
  >
    <slot />
  </ArkCarouselItem>
</template>
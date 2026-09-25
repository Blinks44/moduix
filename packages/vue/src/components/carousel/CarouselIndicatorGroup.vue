<script setup lang="ts">
import { CarouselIndicatorGroup as ArkCarouselIndicatorGroup } from '@ark-ui/vue/carousel';
import type { CarouselIndicatorGroupProps } from '@ark-ui/vue/carousel';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Carousel.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CarouselIndicatorGroupProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCarouselIndicatorGroup
    v-bind="attrs"
    :class="clsx(styles.indicatorGroup, className)"
    data-slot="carousel-indicator-group"
  >
    <slot />
  </ArkCarouselIndicatorGroup>
</template>
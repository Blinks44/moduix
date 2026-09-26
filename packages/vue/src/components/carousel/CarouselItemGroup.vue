<script setup lang="ts">
import { CarouselItemGroup as ArkCarouselItemGroup } from '@ark-ui/vue/carousel';
import type { CarouselItemGroupProps } from '@ark-ui/vue/carousel';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Carousel.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CarouselItemGroupProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCarouselItemGroup
    v-bind="attrs"
    :class="clsx(styles.itemGroup, className)"
    data-slot="carousel-item-group"
  >
    <slot />
  </ArkCarouselItemGroup>
</template>
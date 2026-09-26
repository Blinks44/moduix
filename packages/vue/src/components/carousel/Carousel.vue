<script setup lang="ts">
import { CarouselRoot as ArkCarouselRoot } from '@ark-ui/vue/carousel';
import type { CarouselRootEmits, CarouselRootProps } from '@ark-ui/vue/carousel';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Carousel.module.css';

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
</script>

<template>
  <ArkCarouselRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :slide-count="slideCount"
    data-slot="carousel-root"
  >
    <slot />
  </ArkCarouselRoot>
</template>
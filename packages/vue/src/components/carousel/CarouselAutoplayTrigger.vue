<script setup lang="ts">
import { CarouselAutoplayTrigger as ArkCarouselAutoplayTrigger } from '@ark-ui/vue/carousel';
import type { CarouselAutoplayTriggerProps } from '@ark-ui/vue/carousel';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Carousel.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CarouselAutoplayTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCarouselAutoplayTrigger
    v-bind="attrs"
    :class="clsx(styles.autoplayTrigger, className)"
    data-slot="carousel-autoplay-trigger"
  >
    <slot />
  </ArkCarouselAutoplayTrigger>
</template>
<script setup lang="ts">
import { CarouselProgressText as ArkCarouselProgressText } from '@ark-ui/vue/carousel';
import type { CarouselProgressTextProps } from '@ark-ui/vue/carousel';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Carousel.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CarouselProgressTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCarouselProgressText
    v-bind="attrs"
    :class="clsx(styles.progressText, className)"
    data-slot="carousel-progress-text"
  >
    <slot />
  </ArkCarouselProgressText>
</template>
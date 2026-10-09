<script setup lang="ts">
import { CarouselPrevTrigger as ArkCarouselPrevTrigger } from '@ark-ui/vue/carousel';
import type { CarouselPrevTriggerProps } from '@ark-ui/vue/carousel';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { ChevronLeftIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Carousel.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CarouselPrevTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCarouselPrevTrigger
    v-bind="attrs"
    :class="clsx(styles.prevTrigger, className)"
    data-slot="carousel-prev-trigger"
  >
    <slot>
      <span :class="styles.defaultIcon"><ChevronLeftIcon /></span>
    </slot>
  </ArkCarouselPrevTrigger>
</template>
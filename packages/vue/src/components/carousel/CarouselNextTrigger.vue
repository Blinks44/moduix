<script setup lang="ts">
import { CarouselNextTrigger as ArkCarouselNextTrigger } from '@ark-ui/vue/carousel';
import type { CarouselNextTriggerProps } from '@ark-ui/vue/carousel';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Carousel.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CarouselNextTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCarouselNextTrigger
    v-bind="attrs"
    :class="clsx(styles.nextTrigger, className)"
    data-slot="carousel-next-trigger"
  >
    <slot>
      <span :class="styles.defaultIcon"><ChevronRightIcon /></span>
    </slot>
  </ArkCarouselNextTrigger>
</template>
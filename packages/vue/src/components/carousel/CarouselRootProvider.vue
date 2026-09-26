<script setup lang="ts">
import { CarouselRootProvider as ArkCarouselRootProvider } from '@ark-ui/vue/carousel';
import type { CarouselRootProviderProps } from '@ark-ui/vue/carousel';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Carousel.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CarouselRootProviderProps {
  class?: HTMLAttributes['class'];
  value: CarouselRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCarouselRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="carousel-root-provider"
  >
    <slot />
  </ArkCarouselRootProvider>
</template>
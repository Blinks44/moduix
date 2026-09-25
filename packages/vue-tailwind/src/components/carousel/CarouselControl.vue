<script setup lang="ts">
import { CarouselControl as ArkCarouselControl } from '@ark-ui/vue/carousel';
import type { CarouselControlProps } from '@ark-ui/vue/carousel';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CarouselControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const controlClass =
  'flex min-w-0 items-center gap-3 data-[orientation=vertical]:flex-col data-[orientation=vertical]:justify-between';
</script>

<template>
  <ArkCarouselControl
    v-bind="attrs"
    :class="cn(controlClass, className)"
    data-slot="carousel-control"
  >
    <slot />
  </ArkCarouselControl>
</template>
<script setup lang="ts">
import { CarouselIndicatorGroup as ArkCarouselIndicatorGroup } from '@ark-ui/vue/carousel';
import type { CarouselIndicatorGroupProps } from '@ark-ui/vue/carousel';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CarouselIndicatorGroupProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const indicatorGroupClass =
  'flex items-center justify-center gap-2 data-[orientation=vertical]:flex-col';
</script>

<template>
  <ArkCarouselIndicatorGroup
    v-bind="attrs"
    :class="cn(indicatorGroupClass, className)"
    data-slot="carousel-indicator-group"
  >
    <slot />
  </ArkCarouselIndicatorGroup>
</template>
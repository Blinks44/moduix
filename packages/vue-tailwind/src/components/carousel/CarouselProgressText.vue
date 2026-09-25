<script setup lang="ts">
import { CarouselProgressText as ArkCarouselProgressText } from '@ark-ui/vue/carousel';
import type { CarouselProgressTextProps } from '@ark-ui/vue/carousel';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CarouselProgressTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const progressTextClass = 'text-sm text-muted-foreground tabular-nums [unicode-bidi:isolate]';
</script>

<template>
  <ArkCarouselProgressText
    dir="ltr"
    v-bind="attrs"
    :class="cn(progressTextClass, className)"
    data-slot="carousel-progress-text"
  >
    <slot />
  </ArkCarouselProgressText>
</template>
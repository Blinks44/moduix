<script setup lang="ts">
import { MarqueeEdge as ArkMarqueeEdge } from '@ark-ui/vue/marquee';
import type { MarqueeEdgeProps } from '@ark-ui/vue/marquee';
import { cva } from 'class-variance-authority';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ MarqueeEdgeProps {
  class?: HTMLAttributes['class'];
  side: MarqueeEdgeProps['side'];
}

const { class: className, side } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const marqueeEdgeVariants = cva('pointer-events-none z-1', {
  variants: {
    side: {
      start: 'w-1/5 bg-linear-to-r from-background to-transparent rtl:bg-linear-to-l',
      end: 'w-1/5 bg-linear-to-l from-background to-transparent rtl:bg-linear-to-r',
      top: 'h-1/5 bg-linear-to-b from-background to-transparent',
      bottom: 'h-1/5 bg-linear-to-t from-background to-transparent',
    },
  },
});
</script>

<template>
  <ArkMarqueeEdge
    v-bind="attrs"
    :class="cn(marqueeEdgeVariants({ side }), className)"
    :side="side"
    data-slot="marquee-edge"
  >
    <slot />
  </ArkMarqueeEdge>
</template>
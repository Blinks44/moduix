<script setup lang="ts">
import { MarqueeRoot as ArkMarqueeRoot } from '@ark-ui/vue/marquee';
import type { MarqueeRootProps } from '@ark-ui/vue/marquee';
import { cva } from 'class-variance-authority';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ MarqueeRootProps {
  class?: HTMLAttributes['class'];
  side?: MarqueeRootProps['side'];
}

const { class: className, side } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const marqueeRootVariants = cva('group relative w-full overflow-hidden text-foreground', {
  variants: {
    orientation: {
      horizontal: '',
      vertical: 'h-60',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});
</script>

<template>
  <ArkMarqueeRoot
    v-bind="attrs"
    :class="
      cn(
        marqueeRootVariants({
          orientation: side === 'top' || side === 'bottom' ? 'vertical' : 'horizontal',
        }),
        className,
      )
    "
    :side="side"
    data-slot="marquee-root"
  >
    <slot />
  </ArkMarqueeRoot>
</template>
<script setup lang="ts">
import { TocIndicator as ArkTocIndicator } from '@ark-ui/vue/toc';
import type { TocIndicatorProps } from '@ark-ui/vue/toc';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TocIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTocIndicator
    v-bind="attrs"
    :class="
      cn(
        'pointer-events-none start-0 top-[calc(var(--_toc-indicator-top)+var(--moduix-spacing-0-5))] z-1 h-[calc(var(--_toc-indicator-height)-var(--moduix-spacing-1))] w-0.5 rounded-full bg-muted-foreground opacity-70 transition-[top,height] duration-normal',
        className,
      )
    "
    data-slot="toc-indicator"
  >
    <slot />
  </ArkTocIndicator>
</template>
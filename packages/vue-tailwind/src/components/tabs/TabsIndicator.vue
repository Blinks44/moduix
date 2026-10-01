<script setup lang="ts">
import { TabIndicator as ArkTabIndicator } from '@ark-ui/vue/tabs';
import type { TabIndicatorProps } from '@ark-ui/vue/tabs';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TabIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTabIndicator
    v-bind="attrs"
    :class="
      cn(
        'pointer-events-none absolute top-1/2 left-[var(--left,0)] z-0 h-8 w-[var(--width,0)] -translate-y-1/2 rounded-md bg-background shadow-sm transition-[var(--transition-property,translate)] [--transition-duration:var(--moduix-duration-normal)] [--transition-timing-function:var(--moduix-ease-in-out)] group-data-[orientation=vertical]/tabs:top-[var(--top,0)] group-data-[orientation=vertical]/tabs:left-1/2 group-data-[orientation=vertical]/tabs:h-[var(--height,0)] group-data-[orientation=vertical]/tabs:w-[calc(100%-0.5rem)] group-data-[orientation=vertical]/tabs:-translate-x-1/2 group-data-[orientation=vertical]/tabs:translate-y-0 group-data-[variant=line]/tabs:top-auto group-data-[variant=line]/tabs:bottom-0 group-data-[variant=line]/tabs:h-0.5 group-data-[variant=line]/tabs:[translate:none] group-data-[variant=line]/tabs:rounded-full group-data-[variant=line]/tabs:bg-foreground group-data-[variant=line]/tabs:shadow-none motion-reduce:transition-none',
        className,
      )
    "
    data-slot="tabs-indicator"
  >
    <slot />
  </ArkTabIndicator>
</template>
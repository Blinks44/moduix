<script setup lang="ts">
import { TourContent as ArkTourContent } from '@ark-ui/vue/tour';
import type { TourContentProps } from '@ark-ui/vue/tour';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TourContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTourContent
    v-bind="attrs"
    :class="
      cn(
        'relative z-60 flex max-h-[min(24rem,var(--available-height,100dvh))] w-80 max-w-[min(calc(100vw-2rem),var(--available-width,100vw))] origin-[var(--transform-origin)] flex-col gap-1 overflow-visible rounded-lg border border-border bg-popover p-5 text-popover-foreground shadow-lg outline-0 has-[>[data-slot=tour-body]]:grid has-[>[data-slot=tour-body]]:grid-rows-[minmax(0,1fr)_auto] data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open data-[type=dialog]:w-[min(26rem,calc(100vw-2rem))] data-[type=floating]:w-[min(22rem,calc(100vw-2rem))] motion-reduce:animate-none',
        className,
      )
    "
    data-slot="tour-content"
  >
    <slot />
  </ArkTourContent>
</template>
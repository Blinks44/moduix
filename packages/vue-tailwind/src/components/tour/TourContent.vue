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
        'relative flex max-h-[min(24rem,var(--available-height,100dvh))] w-[20rem] max-w-[min(calc(100vw-var(--moduix-spacing-8)),var(--available-width,100vw))] origin-(--transform-origin) flex-col gap-1 rounded-lg border border-border bg-popover p-5 text-popover-foreground shadow-lg outline-0 data-[state=closed]:animate-moduix-popup-out data-[state=open]:pointer-events-auto data-[state=open]:animate-moduix-popup-in data-[type=dialog]:w-[26rem] data-[type=floating]:w-[22rem] motion-reduce:data-[state]:animate-none',
        className,
      )
    "
    data-slot="tour-content"
  >
    <slot />
  </ArkTourContent>
</template>
<script setup lang="ts">
import { TooltipContent as ArkTooltipContent } from '@ark-ui/vue/tooltip';
import type { TooltipContentProps } from '@ark-ui/vue/tooltip';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TooltipContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTooltipContent
    v-bind="attrs"
    :class="
      cn(
        'relative max-w-[min(20rem,var(--available-width))] origin-(--transform-origin) rounded-md border border-transparent bg-foreground px-2.5 py-1 text-center text-xs wrap-anywhere text-background shadow-md data-instant:data-[state]:animate-none data-[state=closed]:animate-moduix-popup-out data-[state=open]:animate-moduix-popup-in motion-reduce:data-[state]:animate-none',
        className,
      )
    "
    data-slot="tooltip-content"
  >
    <slot />
  </ArkTooltipContent>
</template>
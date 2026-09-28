<script setup lang="ts">
import { HoverCardContent as ArkHoverCardContent } from '@ark-ui/vue/hover-card';
import type { HoverCardContentProps } from '@ark-ui/vue/hover-card';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HoverCardContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const contentClass =
  'relative z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] max-h-[min(24rem,var(--available-height,100dvh))] max-w-[min(24rem,var(--available-width))] min-w-[min(14rem,var(--available-width))] origin-[var(--transform-origin)] overflow-visible rounded-lg border border-border bg-popover p-2 wrap-anywhere text-popover-foreground shadow-lg outline-0 has-[>[data-slot=hover-card-body]]:flex has-[>[data-slot=hover-card-body]]:flex-col data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:animate-none has-[>[data-slot=hover-card-body]]:[&>[data-slot=hover-card-body]]:overflow-auto';
</script>

<template>
  <ArkHoverCardContent
    v-bind="attrs"
    :class="cn(contentClass, className)"
    data-slot="hover-card-content"
  >
    <slot />
  </ArkHoverCardContent>
</template>
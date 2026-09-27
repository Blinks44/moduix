<script setup lang="ts">
import { SelectContent as ArkSelectContent } from '@ark-ui/vue/select';
import type { SelectContentProps } from '@ark-ui/vue/select';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSelectContent
    v-bind="attrs"
    :class="
      cn(
        'z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] flex max-h-[min(24rem,var(--available-height))] max-w-[var(--available-width)] min-w-[var(--reference-width)] origin-[var(--transform-origin)] scroll-py-1 flex-col overflow-auto overscroll-contain rounded-md border border-border bg-popover py-1 text-popover-foreground shadow-lg outline-0 data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:animate-none',
        className,
      )
    "
    data-slot="select-content"
  >
    <slot />
  </ArkSelectContent>
</template>
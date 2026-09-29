<script setup lang="ts">
import { PopoverContent as ArkPopoverContent } from '@ark-ui/vue/popover';
import type { PopoverContentProps } from '@ark-ui/vue/popover';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '../../internal/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PopoverContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPopoverContent
    v-bind="attrs"
    :class="
      cn(
        'group/popover-content relative z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] max-h-[min(24rem,var(--available-height,100dvh))] max-w-[min(28rem,var(--available-width))] min-w-[min(16rem,var(--available-width))] origin-[var(--transform-origin)] overflow-visible rounded-md bg-popover p-4 wrap-anywhere text-popover-foreground shadow-lg outline-1 outline-border has-[>[data-slot=popover-body]]:flex has-[>[data-slot=popover-body]]:flex-col data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:animate-none has-[>[data-slot=popover-body]]:[&>[data-slot=popover-body]]:overflow-auto',
        className,
      )
    "
    data-slot="popover-content"
  >
    <slot />
  </ArkPopoverContent>
</template>
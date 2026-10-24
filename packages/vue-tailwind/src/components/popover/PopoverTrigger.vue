<script setup lang="ts">
import { PopoverTrigger as ArkPopoverTrigger } from '@ark-ui/vue/popover';
import type { PopoverTriggerProps } from '@ark-ui/vue/popover';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PopoverTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPopoverTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="
      cn(
        !asChild &&
          'inline-flex min-h-control-md cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3.5 py-1 text-md text-foreground outline-0 transition-[background-color,border-color,color] duration-normal ease-in-out select-none focus-visible:outline-focus-inset focus-visible:outline-offset-focus-inset focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:opacity-disabled data-[state=open]:not-data-[value]:bg-accent data-[current]:data-[state=open]:bg-accent [@media(hover:hover)]:hover:bg-accent',
        className,
      )
    "
    data-slot="popover-trigger"
  >
    <slot />
  </ArkPopoverTrigger>
</template>
<script setup lang="ts">
import { TourActionTrigger as ArkTourActionTrigger } from '@ark-ui/vue/tour';
import type { TourActionTriggerProps } from '@ark-ui/vue/tour';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TourActionTriggerProps {
  action: TourActionTriggerProps['action'];
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { action, asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTourActionTrigger
    v-bind="attrs"
    :action="action"
    :as-child="asChild"
    :class="
      cn(
        !asChild &&
          `inline-flex min-h-control-sm cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm leading-5 font-medium whitespace-nowrap text-foreground no-underline outline-0 transition-[background-color,border-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 data-[type=close]:border-primary data-[type=close]:bg-primary data-[type=close]:text-primary-foreground data-[type=next]:border-primary data-[type=next]:bg-primary data-[type=next]:text-primary-foreground motion-reduce:transition-none [@media(hover:hover)]:[&:is([data-type='next'],[data-type='close']):not(:disabled):not([data-disabled]):hover]:border-[color-mix(in_oklab,var(--color-primary),black_12%)] [@media(hover:hover)]:[&:is([data-type='next'],[data-type='close']):not(:disabled):not([data-disabled]):hover]:bg-[color-mix(in_oklab,var(--color-primary),black_12%)] [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-accent`,
        className,
      )
    "
    data-slot="tour-action-trigger"
  >
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </ArkTourActionTrigger>
</template>
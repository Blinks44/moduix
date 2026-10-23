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
          `inline-flex min-h-control-sm cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium whitespace-nowrap text-foreground outline-0 transition-[background-color,color] duration-normal ease-in-out focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[type=close]:border-transparent data-[type=close]:bg-primary data-[type=close]:text-primary-foreground data-[type=next]:border-transparent data-[type=next]:bg-primary data-[type=next]:text-primary-foreground [@media(hover:hover)]:[&:is([data-type='next'],[data-type='close']):not(:disabled):hover]:bg-[color-mix(in_oklab,var(--color-primary),black_12%)] [@media(hover:hover)]:[&:not(:disabled):hover]:bg-accent`,
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
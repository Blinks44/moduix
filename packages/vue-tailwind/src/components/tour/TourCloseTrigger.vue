<script setup lang="ts">
import { TourCloseTrigger as ArkTourCloseTrigger } from '@ark-ui/vue/tour';
import type { TourCloseTriggerProps } from '@ark-ui/vue/tour';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TourCloseTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTourCloseTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="
      cn(
        !asChild &&
          'absolute end-4 top-4 inline-flex size-7 cursor-pointer items-center justify-center rounded-md leading-none text-muted-foreground outline-0 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring [&>svg]:size-4 [@media(hover:hover)]:hover:bg-accent [@media(hover:hover)]:hover:text-popover-foreground',
        className,
      )
    "
    data-slot="tour-close-trigger"
  >
    <slot />
  </ArkTourCloseTrigger>
</template>
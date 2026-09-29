<script setup lang="ts">
import { PaginationFirstTrigger as ArkPaginationFirstTrigger } from '@ark-ui/vue/pagination';
import type { PaginationFirstTriggerProps } from '@ark-ui/vue/pagination';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { ChevronLeftIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PaginationFirstTriggerProps {
  asChild?: PaginationFirstTriggerProps['asChild'];
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPaginationFirstTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="
      cn(
        'inline-flex h-control-md min-w-control-md items-center justify-center rounded-md text-sm font-medium tabular-nums',
        'cursor-pointer gap-2 border border-border bg-background px-3 whitespace-nowrap text-foreground no-underline select-none',
        'focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50',
        '[&_svg]:size-4 [&_svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent',
        !$slots.default && 'w-control-md p-0 rtl:[&_svg]:-scale-x-100',
        className,
      )
    "
    data-slot="pagination-first-trigger"
  >
    <slot v-if="$slots.default" />
    <span
      v-else-if="!asChild"
      class="inline-flex items-center justify-center [&_svg+svg]:-ms-2"
      aria-hidden="true"
    >
      <ChevronLeftIcon />
      <ChevronLeftIcon />
    </span>
  </ArkPaginationFirstTrigger>
</template>
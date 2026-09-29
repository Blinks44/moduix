<script setup lang="ts">
import { PaginationPrevTrigger as ArkPaginationPrevTrigger } from '@ark-ui/vue/pagination';
import type { PaginationPrevTriggerProps } from '@ark-ui/vue/pagination';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { ChevronLeftIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PaginationPrevTriggerProps {
  asChild?: PaginationPrevTriggerProps['asChild'];
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPaginationPrevTrigger
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
    data-slot="pagination-prev-trigger"
  >
    <slot v-if="$slots.default" />
    <ChevronLeftIcon v-else-if="!asChild" />
  </ArkPaginationPrevTrigger>
</template>
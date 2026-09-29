<script setup lang="ts">
import { PaginationItem as ArkPaginationItem } from '@ark-ui/vue/pagination';
import type { PaginationItemProps } from '@ark-ui/vue/pagination';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PaginationItemProps {
  asChild?: PaginationItemProps['asChild'];
  class?: HTMLAttributes['class'];
  type: PaginationItemProps['type'];
  value: PaginationItemProps['value'];
}

const { asChild = false, class: className, type, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPaginationItem
    v-bind="attrs"
    :as-child="asChild"
    :class="
      cn(
        'inline-flex h-control-md min-w-control-md items-center justify-center rounded-md text-sm font-medium tabular-nums',
        'cursor-pointer gap-2 border border-border bg-background px-2 whitespace-nowrap text-foreground no-underline select-none',
        'focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50',
        'data-selected:border-foreground data-selected:bg-foreground data-selected:text-background [@media(hover:hover)]:hover:bg-accent [@media(hover:hover)]:data-selected:hover:bg-foreground',
        '[&_svg]:size-4 [&_svg]:shrink-0',
        className,
      )
    "
    :type="type"
    :value="value"
    data-slot="pagination-item"
  >
    <slot />
  </ArkPaginationItem>
</template>
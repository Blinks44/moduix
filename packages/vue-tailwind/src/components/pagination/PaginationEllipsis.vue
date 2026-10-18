<script setup lang="ts">
import { PaginationEllipsis as ArkPaginationEllipsis } from '@ark-ui/vue/pagination';
import type { PaginationEllipsisProps } from '@ark-ui/vue/pagination';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { EllipsisIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PaginationEllipsisProps {
  asChild?: PaginationEllipsisProps['asChild'];
  class?: HTMLAttributes['class'];
  index: PaginationEllipsisProps['index'];
}

const { asChild = false, class: className, index } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPaginationEllipsis
    v-bind="attrs"
    :as-child="asChild"
    :class="
      cn(
        'inline-flex h-control-md min-w-control-md items-center justify-center rounded-md text-sm font-medium text-muted-foreground tabular-nums select-none [&_svg]:size-4 [&_svg]:shrink-0',
        className,
      )
    "
    :index="index"
    data-slot="pagination-ellipsis"
    aria-hidden="true"
  >
    <slot v-if="$slots.default" />
    <EllipsisIcon v-else-if="!asChild" />
  </ArkPaginationEllipsis>
</template>
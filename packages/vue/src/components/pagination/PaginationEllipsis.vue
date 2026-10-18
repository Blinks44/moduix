<script setup lang="ts">
import { PaginationEllipsis as ArkPaginationEllipsis } from '@ark-ui/vue/pagination';
import type { PaginationEllipsisProps } from '@ark-ui/vue/pagination';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { EllipsisIcon } from '@/lib/moduix/icons/ui';
import styles from './Pagination.module.css';

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
    :class="clsx(styles.ellipsis, className)"
    :index="index"
    data-slot="pagination-ellipsis"
    aria-hidden="true"
  >
    <slot v-if="$slots.default" />
    <EllipsisIcon v-else-if="!asChild" />
  </ArkPaginationEllipsis>
</template>
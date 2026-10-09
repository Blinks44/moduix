<script setup lang="ts">
import { PaginationNextTrigger as ArkPaginationNextTrigger } from '@ark-ui/vue/pagination';
import type { PaginationNextTriggerProps } from '@ark-ui/vue/pagination';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Pagination.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PaginationNextTriggerProps {
  asChild?: PaginationNextTriggerProps['asChild'];
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPaginationNextTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(styles.trigger, !$slots.default && styles.iconTrigger, className)"
    data-slot="pagination-next-trigger"
  >
    <slot v-if="$slots.default" />
    <ChevronRightIcon v-else-if="!asChild" />
  </ArkPaginationNextTrigger>
</template>
<script setup lang="ts">
import { PaginationLastTrigger as ArkPaginationLastTrigger } from '@ark-ui/vue/pagination';
import type { PaginationLastTriggerProps } from '@ark-ui/vue/pagination';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Pagination.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PaginationLastTriggerProps {
  asChild?: PaginationLastTriggerProps['asChild'];
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPaginationLastTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(styles.trigger, !$slots.default && styles.iconTrigger, className)"
    data-slot="pagination-last-trigger"
  >
    <slot v-if="$slots.default" />
    <span v-else-if="!asChild" :class="styles.edgeIcon" aria-hidden="true">
      <ChevronRightIcon />
      <ChevronRightIcon />
    </span>
  </ArkPaginationLastTrigger>
</template>
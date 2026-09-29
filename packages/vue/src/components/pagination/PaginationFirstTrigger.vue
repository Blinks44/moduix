<script setup lang="ts">
import { PaginationFirstTrigger as ArkPaginationFirstTrigger } from '@ark-ui/vue/pagination';
import type { PaginationFirstTriggerProps } from '@ark-ui/vue/pagination';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { ChevronLeftIcon } from '@/internal/icons/ui/Icons';
import styles from './Pagination.module.css';

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
    :class="clsx(styles.trigger, !$slots.default && styles.iconTrigger, className)"
    data-slot="pagination-first-trigger"
  >
    <slot v-if="$slots.default" />
    <span v-else-if="!asChild" :class="styles.edgeIcon" aria-hidden="true">
      <ChevronLeftIcon />
      <ChevronLeftIcon />
    </span>
  </ArkPaginationFirstTrigger>
</template>
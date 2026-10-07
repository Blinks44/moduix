<script setup lang="ts">
import { PaginationPrevTrigger as ArkPaginationPrevTrigger } from '@ark-ui/vue/pagination';
import type { PaginationPrevTriggerProps } from '@ark-ui/vue/pagination';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { ChevronLeftIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Pagination.module.css';

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
    :class="clsx(styles.trigger, !$slots.default && styles.iconTrigger, className)"
    data-slot="pagination-prev-trigger"
  >
    <slot v-if="$slots.default" />
    <ChevronLeftIcon v-else-if="!asChild" />
  </ArkPaginationPrevTrigger>
</template>
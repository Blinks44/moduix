<script setup lang="ts">
import { PaginationItem as ArkPaginationItem } from '@ark-ui/vue/pagination';
import type { PaginationItemProps } from '@ark-ui/vue/pagination';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Pagination.module.css';

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
    :class="clsx(styles.item, className)"
    :type="type"
    :value="value"
    data-slot="pagination-item"
  >
    <slot />
  </ArkPaginationItem>
</template>
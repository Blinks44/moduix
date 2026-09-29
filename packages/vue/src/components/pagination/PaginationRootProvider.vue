<script setup lang="ts">
import { PaginationRootProvider as ArkPaginationRootProvider } from '@ark-ui/vue/pagination';
import type { PaginationRootProviderProps } from '@ark-ui/vue/pagination';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Pagination.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PaginationRootProviderProps {
  class?: HTMLAttributes['class'];
  value: PaginationRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPaginationRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="pagination-root-provider"
  >
    <slot />
  </ArkPaginationRootProvider>
</template>
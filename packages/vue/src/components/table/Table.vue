<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Table.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'table'> {
  class?: HTMLAttributes['class'];
  interactive?: boolean;
  showColumnBorder?: boolean;
  size?: 'sm' | 'md' | 'lg';
  stickyHeader?: boolean;
  striped?: boolean;
  variant?: 'line' | 'outline';
}

const {
  class: className,
  interactive = false,
  showColumnBorder = false,
  size = 'md',
  stickyHeader = false,
  striped = false,
  variant = 'line',
} = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.table
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    data-scope="table"
    data-part="root"
    :data-interactive="interactive || undefined"
    :data-show-column-border="showColumnBorder || undefined"
    :data-size="size"
    :data-sticky-header="stickyHeader || undefined"
    :data-striped="striped || undefined"
    :data-variant="variant"
    data-slot="table-root"
  >
    <slot />
  </ark.table>
</template>
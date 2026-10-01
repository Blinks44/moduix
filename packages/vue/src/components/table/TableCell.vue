<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Table.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'td'> {
  class?: HTMLAttributes['class'];
  numeric?: boolean;
}

const { class: className, numeric = false } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.td
    v-bind="attrs"
    :class="clsx(styles.cell, numeric && styles.numeric, className)"
    data-scope="table"
    data-part="cell"
    :data-numeric="numeric || undefined"
    data-slot="table-cell"
  >
    <slot />
  </ark.td>
</template>
<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { computed, ref, useAttrs } from 'vue';
import type { ComponentPublicInstance, HTMLAttributes } from 'vue';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import styles from './Table.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'td'> {
  class?: HTMLAttributes['class'];
  colSpan: number;
}

const { class: className, colSpan } = defineProps<Props>();
const slots = defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const cellRef = ref<ComponentPublicInstance | null>(null);
const cellElement = computed(() => cellRef.value?.$el ?? null);

defineExpose({ $el: cellElement });
</script>

<template>
  <ark.tr :class="styles.row" data-scope="table" data-part="row" data-empty data-slot="table-row">
    <ark.td
      ref="cellRef"
      v-bind="attrs"
      :class="clsx(styles.cell, styles.empty, className)"
      :colspan="colSpan"
      data-scope="table"
      data-part="empty"
      data-slot="table-empty"
    >
      <slot v-if="slots.default" />
      <template v-else>{{ a11yLabels.noResults }}</template>
    </ark.td>
  </ark.tr>
</template>
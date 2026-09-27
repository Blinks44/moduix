<script setup lang="ts">
import { DatePickerTable as ArkDatePickerTable } from '@ark-ui/vue/date-picker';
import type { DatePickerTableProps } from '@ark-ui/vue/date-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './DatePicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerTableProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerTable
    v-bind="attrs"
    :class="clsx(styles.table, className)"
    data-slot="date-picker-table"
  >
    <slot />
  </ArkDatePickerTable>
</template>
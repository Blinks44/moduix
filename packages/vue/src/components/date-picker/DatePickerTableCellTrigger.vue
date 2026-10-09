<script setup lang="ts">
import { DatePickerTableCellTrigger as ArkDatePickerTableCellTrigger } from '@ark-ui/vue/date-picker';
import type { DatePickerTableCellTriggerProps } from '@ark-ui/vue/date-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './DatePicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerTableCellTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerTableCellTrigger
    v-bind="attrs"
    :class="clsx(styles.tableCellTrigger, className)"
    data-slot="date-picker-table-cell-trigger"
  >
    <slot />
  </ArkDatePickerTableCellTrigger>
</template>
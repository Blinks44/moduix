<script setup lang="ts">
import { DatePickerWeekNumberHeaderCell as ArkDatePickerWeekNumberHeaderCell } from '@ark-ui/vue/date-picker';
import type { DatePickerWeekNumberHeaderCellProps } from '@ark-ui/vue/date-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './DatePicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerWeekNumberHeaderCellProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerWeekNumberHeaderCell
    v-bind="attrs"
    :class="clsx(styles.tableHeader, styles.weekNumberCell, className)"
    data-slot="date-picker-week-number-header-cell"
  >
    <slot />
  </ArkDatePickerWeekNumberHeaderCell>
</template>
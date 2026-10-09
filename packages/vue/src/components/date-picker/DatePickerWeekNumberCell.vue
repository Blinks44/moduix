<script setup lang="ts">
import { DatePickerWeekNumberCell as ArkDatePickerWeekNumberCell } from '@ark-ui/vue/date-picker';
import type { DatePickerWeekNumberCellProps } from '@ark-ui/vue/date-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './DatePicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerWeekNumberCellProps {
  class?: HTMLAttributes['class'];
  weekIndex: number;
  week: DatePickerWeekNumberCellProps['week'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDatePickerWeekNumberCell
    v-bind="attrs"
    :week-index="props.weekIndex"
    :week="props.week"
    :class="clsx(styles.weekNumberCell, props.class)"
    data-slot="date-picker-week-number-cell"
  >
    <slot />
  </ArkDatePickerWeekNumberCell>
</template>